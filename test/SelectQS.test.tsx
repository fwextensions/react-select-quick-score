import { fireEvent, render } from "@testing-library/react";
import Select from "react-select";
import { SelectQS } from "../src";
import { options } from "./assets/bookmarks";

const TestProps = {
	name: "bookmark",
	className: "react-select",
	classNamePrefix: "react-select"
};

const BaseTestProps = {
	name: "base-bookmark",
	className: "base-react-select",
	classNamePrefix: "base-react-select"
};

describe("SelectQS", () => {
	test("First option is sorted alphabetically", () => {
		const formID = "form";
		const { name, classNamePrefix } = TestProps;
		const { name: baseName, classNamePrefix: basePrefix } = BaseTestProps;
		const { container, getByTestId } = render(
			<form data-testid={formID}>
				<label htmlFor={baseName}>{baseName}:</label>
				<SelectQS
					{...TestProps}
					options={options}
				/>
				<Select
					{...BaseTestProps}
					options={options}
				/>
				<label htmlFor={name}>{name}:</label>
			</form>
		);
		const form = getByTestId(formID);
		const input = container.querySelector(`.${classNamePrefix}__input`);
		const baseInput = container.querySelector(`.${basePrefix}__input`);

		expect(form).toHaveFormValues({
			[name]: "",
			[baseName]: ""
		});

			// select the first item in each select component
		fireEvent.keyDown(input, { key: "ArrowDown" });
		fireEvent.keyDown(input, { key: "Enter" });
		fireEvent.keyDown(baseInput, { key: "ArrowDown" });
		fireEvent.keyDown(baseInput, { key: "Enter" });

		expect(form).toHaveFormValues({
			[name]: "https://24ways.org/2006/flickr-photos-on-demand",
			[baseName]: options[0].value
		});
	});

	test("Typing `zom` finds `jQuery Zoom`", () => {
		const formID = "form";
		const { name, classNamePrefix } = TestProps;
		const { container, getByTestId } = render(
			<form data-testid={formID}>
				<label htmlFor={name}>{name}:</label>
				<SelectQS
					{...TestProps}
					options={options}
				/>
			</form>
		);
		const form = getByTestId(formID);
		const input = container.querySelector(`.${classNamePrefix}__input`);

		expect(form).toHaveFormValues({ [name]: "" });
		fireEvent.change(input, { target: { value: "zom" } });
		fireEvent.keyDown(input, { key: "Enter" });
		expect(form).toHaveFormValues({ [name]: "https://www.jacklmoore.com/zoom" });
	});
});
