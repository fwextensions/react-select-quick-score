import React, {
	useState,
	useCallback,
	useEffect,
	forwardRef,
	ForwardedRef,
} from "react";
import Select, {
	GetOptionLabel,
	GetOptionValue,
	GroupBase,
	InputActionMeta,
	OnChangeValue,
	Props,
	PropsValue,
	SelectInstance
} from "react-select";
import { Options, QuickScore, ScoredObject, ScoredResult } from "quick-score";

interface QSGroup<T> {
	qs: QuickScore<T>,
	label: string
}

interface QSInstances<T> {
	optionsQS?: QuickScore<T>,
	groups?: QSGroup<T>[]
}

interface BaseOption {
	label: string,
	value: string
}

const defaultGetOptionLabel = ({ item: { label } }: ScoredResult<BaseOption>) => label;
const defaultGetOptionValue = ({ item: { value } }: ScoredResult<BaseOption>) => value;

function extractOptions<T>(
	results: PropsValue<ScoredObject<T>>)
{
	if (results instanceof Array) {
		return results.map(({ item }) => item);
	} else if (results) {
		return results.item;
	}
}

function createQSInstances<T>(
	items: T,
	qsOptions: Options = { keys: ["label"] })
{
	const regularOptions: T[] = [];
	const groups: QSGroup<T>[] = [];
	const result: QSInstances<T> = {};

		// it's not really clear how items wouldn't be undefined but also wouldn't
		// be an array here, but TypeScript complains that items might not have an
		// iterator if we don't do this check
	if (items instanceof Array) {
		for (const item of items) {
			const { label, options } = item;

			if (options) {
				groups.push({ label, qs: new QuickScore(options, qsOptions) });
			} else {
				regularOptions.push(item);
			}
		}
	}

	if (regularOptions.length) {
		result.optionsQS = new QuickScore(regularOptions, qsOptions);
	}

	if (groups.length) {
		result.groups = groups;
	}

	return result;
}

function searchQSInstances<T>(
	instances: QSInstances<T>,
	query: string)
{
	const { optionsQS, groups } = instances;
	const result = [];

	if (optionsQS) {
		result.push(...optionsQS.search(query));
	}

	if (groups?.length) {
		result.push(...groups.map(({ label, qs }) =>
			({ label, options: qs.search(query) })));
	}

	return result;
}

export default forwardRef(function SelectQS<
	Option = { label: string, value: string },
	IsMulti extends boolean = false,
	Group extends GroupBase<Option> = GroupBase<Option>
>(
	props: Props,
	ref: ForwardedRef<SelectInstance>)
{
	const {
		options,
		onInputChange,
		defaultInputValue = "",
		...restProps
	} = props;
	const [query, setQuery] = useState(defaultInputValue);
	const [qsInstances, setQSInstances] =
		useState(() => createQSInstances(options));
	const [matchingOptions, setMatchingOptions] =
		useState(() => searchQSInstances(qsInstances, defaultInputValue));

	const handleInputChange = useCallback((newValue: string, actionMeta: InputActionMeta) => {
			// store the query in case the options are updated while there's text in
			// the input, so that the useEffect below can apply it to the new options
		setQuery(newValue);
		setMatchingOptions(searchQSInstances(qsInstances, newValue));

		if (typeof onInputChange === "function") {
				// trigger the onInputChange prop the caller supplied, since we use
				// our own in the Select below
			onInputChange(newValue, actionMeta);
		}
	}, []);

	useEffect(() => {
		const qsInstances = createQSInstances(options);

		setQSInstances(qsInstances);
		setMatchingOptions(searchQSInstances(qsInstances, query));
	}, [options]);

	if (typeof restProps.onChange === "function") {
		const handler = restProps.onChange;

		restProps.onChange = (newValue: OnChangeValue<ScoredObject<Option>, IsMulti>, actionMeta) =>
			handler(extractOptions(newValue), actionMeta);
	}

	return (
		<Select
			{...restProps}
			ref={ref}
			options={matchingOptions}
				// getOptionLabel/Value expects the option will have an unknown type,
				// despite being typed as GetOptionLabel<Option>
			getOptionLabel={defaultGetOptionLabel as GetOptionLabel<unknown>}
			getOptionValue={defaultGetOptionValue as GetOptionValue<unknown>}
			defaultInputValue={defaultInputValue}
				// we don't want react-select to further filter the list of options based
				// on the input, since QuickScore has already filtered the list to just
				// the options that match
			filterOption={null}
			onInputChange={handleInputChange}
		/>
	);
});
