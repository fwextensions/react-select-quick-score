import React from "react";
import { ScoredObject } from "quick-score";
import MatchedString from "./MatchedString";

function isScoredObject<T>(
	object: any): object is ScoredObject<T>
{
	return object && typeof object === "object" && typeof object.item === "object";
}

export function formatOptionQS<T>(
	option: unknown)
{
	if (!isScoredObject<T>(option)) {
		return "";
	}

	const { item: { label = "" }, matches } = option;

	return (
		<MatchedString
			string={label}
			matches={matches.label}
		/>
	);
}
