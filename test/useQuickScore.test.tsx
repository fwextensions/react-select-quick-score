import { render } from "@testing-library/react";
import { useQuickScore } from "../src";
import { options } from "./assets/bookmarks";

function HookTest({
	options,
	count = 5})
{
	const search = useQuickScore(options);

	return (
		<ul>
			{search("")
				.slice(0, count)
				.map(({ label }, i) => (<li key={i}>{label}</li>))
			}
		</ul>
	);
}

describe("useQuickScore", () => {
	test("First search result for empty query is alphabetically first", () => {
		const { getByText } = render(
			<HookTest
				options={options}
				count={1}
			/>
		);

			// make sure the test options aren't accidentally alphabetized
		expect(getByText(/24 /)!.textContent).not.toEqual(options[0].label);
		expect(getByText(/24 /)).toBeInstanceOf(HTMLLIElement);
	});
});
