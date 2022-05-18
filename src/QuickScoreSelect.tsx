import React, { useState, useEffect, useCallback } from "react";
import Select, { Props } from "react-select";
import useQuickScore from "./useQuickScore";

	// we don"t want react-select to further filter the list of options based
	// on the input, since QuickScore has already found the matching options
const noFilter = () => true;

export default function QuickScoreSelect({
	options,
	filterOption = noFilter,
	...props}: Props)
{
	const { search, setItems } = useQuickScore(options);
	const [matchingOptions, setMatchingOptions] = useState(() => search(""));

	const handleInputChange = useCallback(
		(input: string) => setMatchingOptions(search(input)),
		[setMatchingOptions, search]
	);

	useEffect(() => setItems(options), [options]);

	return (
		<Select
			{...props}
			options={matchingOptions}
			filterOption={filterOption}
			onInputChange={handleInputChange}
		/>
	);
}
