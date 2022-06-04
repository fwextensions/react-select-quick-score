# `react-select` + `quick-score`

> `react-select-quick-score` adds smart autocomplete to [`react-select`](https://react-select.com/home) using [QuickScore](https://github.com/fwextensions/quick-score).

Instead of the limited type-ahead available in `react-select` components, where the user has to type an exact substring to match a menu item, QuickScore lets users type just a few letters to quickly display a list of sensible results, sorted by how well the query matches.  [See a demo](https://fwextensions.github.io/quick-score-demo/)

<img src="https://user-images.githubusercontent.com/61631/172030812-b0b564ed-4c3e-4bc7-9b64-d0f795ae8ff2.png" alt="screenshot" width="719">

QuickScore is fast, dependency-free, and is just 2KB when minified and gzipped, so it adds only a little weight to `react-select`.


## Install

```sh
npm install react-select-quick-score
```

The project must also include `react-select` v5 and React v16.8 or later.


## Usage

To create a select element with smart autocomplete, import the `SelectQS` component from the package:

```javascript
import React from 'react';
import { SelectQS } from 'react-select-quick-score';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

const MyComponent = () => (
  <SelectQS options={options} />
);
```

`SelectQS` is a drop-in replacement for [`Select`](https://react-select.com/home#getting-started) from `react-select`, and it supports all of the same [props](https://react-select.com/props).  The difference comes when the user starts typing to find an item in the menu.

Unlike the default `react-select` behavior, the `SelectQS` items are sorted by how well they match the user's query, making it easier to find the desired item.  The query also doesn't have to be an exact substring of an item.  Matches against capital letters and the beginnings of words score higher, so the user could type `gh`, for example, to match items that include `GitHub`.  That query would not match the same items in the `Select` element.

If the select options are organized into groups, each group is sorted and filtered independently, separated by the group labels.  Groups with no matching items are hidden.


## Differences with `react-select`

When the query is empty, QuickScore sorts its list of items alphabetically and case-insensitively.  So the options displayed in a `SelectQS` component will be listed alphabetically by default, regardless of their order in the `options` prop.

The `filterOption` prop is ignored, since QuickScore manages the sorting and filtering of options.

If the options list includes both grouped and ungrouped items (which is not a typical use case), the ungrouped items will all appear before the first group, regardless of where they appear in the `options` prop.  This is done so the ungrouped options can be filtered and sorted together.  (In the default `Select` component, ungrouped options can appear between or after grouped ones.)


## License

[MIT](./LICENSE) © [John Dunning](https://github.com/fwextensions)
