import { fireEvent, render } from "@testing-library/react";
import { useRef } from "react";
import Select from "react-select";
import { SelectQS } from "../src";
import { options, githubOptions, reactOptions } from "./assets/bookmarks";

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

const GroupedOptions = [
	{
		label: "GitHub",
		options: githubOptions
	},
	{
		label: "React",
		options: reactOptions
	}
];

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
			// make sure the test options aren't accidentally alphabetized
		expect(form).not.toHaveFormValues({
			[name]: options[0].value
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

	test("Getting a ref to the <SelectQS> and calling `.focus()` focuses the input", () => {
		const FocusComponent = () => {
			const selectRef = useRef(null);

			return (
				<>
					<SelectQS
						ref={selectRef}
						{...TestProps}
						options={options}
					/>
					<button
						data-testid="Focus"
						onClick={() => selectRef!.current.focus()}
					/>
				</>
			)
		};
		const { getByTestId } = render(<FocusComponent />);
		const button = getByTestId("Focus");

		expect(document.activeElement).toBe(document.body);
		fireEvent.click(button);
		expect(document.activeElement.tagName).toBe("INPUT");
	});

	test("Empty groups should be hidden", () => {
		const formID = "form";
		const { name, classNamePrefix } = TestProps;
		const { container } = render(
			<form data-testid={formID}>
				<label htmlFor={name}>{name}:</label>
				<SelectQS
					{...TestProps}
					autoFocus
					menuIsOpen
					options={GroupedOptions}
				/>
			</form>
		);

			// when the menu is first opened, there should be 2 groups.  after typing
			// a query that only matches items in the first group, the other group
			// header should be hidden.
		expect(container.querySelectorAll(`.${classNamePrefix}__group`).length).toBe(2);
		fireEvent.change(document.activeElement, { target: { value: "ghub" } });
		expect(container.querySelectorAll(`.${classNamePrefix}__group`).length).toBe(1);
	});

	test("Smart search should work within each group independently", () => {
		const formID = "form";
		const { name, classNamePrefix } = TestProps;
		const { container } = render(
			<form data-testid={formID}>
				<label htmlFor={name}>{name}:</label>
				<SelectQS
					{...TestProps}
					autoFocus
					menuIsOpen
					options={GroupedOptions}
				/>
			</form>
		);

			// a query that matches 1 item in each group should show 2 groups, with a
			// total of 2 items visible
		fireEvent.change(document.activeElement, { target: { value: "style-" } });
		expect(container.querySelectorAll(`.${classNamePrefix}__group`).length).toBe(2);
		expect(container.querySelectorAll(`.${classNamePrefix}__option`).length).toBe(2);
	});
});
