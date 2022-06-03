import { useRef, useCallback, useEffect } from "react";
import { Options, QuickScore } from "quick-score";

export function useQuickScore<T>(
	items: readonly T[] = [],
	options: Options = { keys: ["label"] }
) {
	const initializedRef = useRef(false);
	const qsRef = useRef(new QuickScore(items, options));

	const search = useCallback(
		(query = "") => {
			let result: T[] = [];

			if (qsRef.current) {
				result = qsRef.current.search(query).map(({ item }) => item);
			}

			return result;
		},
		[]
	);

	useEffect(() => {
		if (initializedRef.current) {
			qsRef.current = new QuickScore(items, options);
		} else {
				// we want to skip the instantiation of QuickScore on the first use of
				// this hook, as we've already created one in useRef() above
			initializedRef.current = true;
		}
	}, [items, options]);

	return search;
}
