import { useRef, useCallback } from "react";
import { Options, QuickScore } from "quick-score";

export default function useQuickScore<T>(
	items: readonly T[],
	options: Options = { keys: ["label"] }
) {
	const qsRef = useRef(new QuickScore(items, options));

	const search = useCallback(
		(query = "") => qsRef.current.search(query).map(({item}) => item),
		[qsRef.current]
	);

	const setItems = useCallback(
		(items: T[]) => qsRef.current.setItems(items),
		[qsRef.current]
	);

	return {
		search,
		setItems
	};
}
