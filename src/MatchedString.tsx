import React from "react";
import { RangeTuple } from "quick-score";

function wrapMatches(
	string: string,
	matches: readonly RangeTuple[])
{
	const substrings = [];
	let previousEnd = 0;

	for (const [start, end] of matches) {
		const prefix = string.substring(previousEnd, start);
		const match = <b>{string.substring(start, end)}</b>;

		substrings.push(prefix, match);
		previousEnd = end;
	}

		// add the part of the string after the final match, which will be the
		// whole string if there are no matches
	substrings.push(string.substring(previousEnd));

		// toArray() automatically adds keys to the array items
	return React.Children.toArray(substrings);
}

interface MatchedStringProps {
	string: string,
	matches: readonly RangeTuple[]
}

export function MatchedString({
	string,
	matches
}: MatchedStringProps)
{
	return (
		<>
			{wrapMatches(string, matches)}
		</>
	);
}
