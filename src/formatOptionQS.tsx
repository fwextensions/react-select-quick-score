import React from "react";
import { MatchedString } from "./MatchedString";

export function formatOptionQS<T>(
	option: T)
{
	const { label, _qs: { matches } } = option;

	return (
		<MatchedString
			string={label}
			matches={matches.label}
		/>
	);
}
