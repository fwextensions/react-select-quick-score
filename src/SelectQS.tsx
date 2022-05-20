import React, {
	useState,
	useCallback,
	forwardRef,
	ForwardedRef,
} from "react";
import Select, {GroupBase, Props, SelectInstance} from "react-select";
import { useQuickScore } from "./useQuickScore";

export default forwardRef(function SelectQS<
	Option,
	IsMulti extends boolean = false,
	Group extends GroupBase<Option> = GroupBase<Option>
>(
	props: Props,
	ref: ForwardedRef<SelectInstance>)
{
	const { options, ...restProps } = props;
	const search = useQuickScore(options);
	const [matchingOptions, setMatchingOptions] = useState(() => search(""));

	const handleInputChange = useCallback(
		(input: string) => setMatchingOptions(search(input)),
		[setMatchingOptions, search]
	);

	return (
		<Select
			{...restProps}
			ref={ref}
			options={matchingOptions}
				// we don't want react-select to further filter the list of options based
				// on the input, since QuickScore has already filtered the list to just
				// the options that match
			filterOption={null}
			onInputChange={handleInputChange}
		/>
	);
});
