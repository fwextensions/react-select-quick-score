import React from "react";
import MatchedString from "./MatchedString";

export function formatOptionQS<T>(
	option: T)
{
	const { item: { label }, matches } = option;

	return (
		<MatchedString
			string={label}
			matches={matches.label}
		/>
	);
}
