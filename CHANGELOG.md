# Changelog

## [0.0.5](https://github.com/fwextensions/react-select-quick-score/compare/react-select-quick-score-v0.0.4...react-select-quick-score-v0.0.5) (2022-06-05)


### Features

* Add support for passing an `onInputChange` prop to `SelectQS` ([3ed252c](https://github.com/fwextensions/react-select-quick-score/commit/3ed252c3ea46b68c709c8f63d54cf30cc0ba563a))
* **ci:** Add build and test steps to `release-please.yml` ([2437e61](https://github.com/fwextensions/react-select-quick-score/commit/2437e61c62b56c7954ec26283378d8e665f400f3))
* Flesh out README.md ([3ed252c](https://github.com/fwextensions/react-select-quick-score/commit/3ed252c3ea46b68c709c8f63d54cf30cc0ba563a))


### Bug Fixes

* **ci:** Turn off prerelease ([487a39a](https://github.com/fwextensions/react-select-quick-score/commit/487a39a2df591a584d6e6786b48a915955d5e1c5))
* Remove optimizeDeps from vite.config.ts ([3ed252c](https://github.com/fwextensions/react-select-quick-score/commit/3ed252c3ea46b68c709c8f63d54cf30cc0ba563a))

## [0.0.4](https://github.com/fwextensions/react-select-quick-score/compare/react-select-quick-score-v0.0.3...react-select-quick-score-v0.0.4) (2022-06-03)


### Features

* **ci:** Add custom changelog section headers ([fa8b251](https://github.com/fwextensions/react-select-quick-score/commit/fa8b251ba5118700ba4417e43b15c14fd087f76c))
* Support `defaultInputValue` to show correct options on mount ([b6a8f8a](https://github.com/fwextensions/react-select-quick-score/commit/b6a8f8a017dbeff4e78c3932536c50419ad69020))
* Support searching within option groups ([b6a8f8a](https://github.com/fwextensions/react-select-quick-score/commit/b6a8f8a017dbeff4e78c3932536c50419ad69020))
* **test:** Add tests for calling `ref.focus()` and groups ([b6a8f8a](https://github.com/fwextensions/react-select-quick-score/commit/b6a8f8a017dbeff4e78c3932536c50419ad69020))


### Bug Fixes

* **ci:** Remove unneeded config keys ([fa8b251](https://github.com/fwextensions/react-select-quick-score/commit/fa8b251ba5118700ba4417e43b15c14fd087f76c))

### [0.0.3](https://github.com/fwextensions/react-select-quick-score/compare/react-select-quick-score-v0.0.2...react-select-quick-score-v0.0.3) (2022-05-25)


### Features

* Add `useQuickScore.test.tsx` ([5ef23a8](https://github.com/fwextensions/react-select-quick-score/commit/5ef23a87e07d21566391fce337ee890b5f8f0e8b))
* Add test comparing default menu sort with base `Select` ([5ef23a8](https://github.com/fwextensions/react-select-quick-score/commit/5ef23a87e07d21566391fce337ee890b5f8f0e8b))
* Add vitest for testing ([5ef23a8](https://github.com/fwextensions/react-select-quick-score/commit/5ef23a87e07d21566391fce337ee890b5f8f0e8b))


### Bug Fixes

* Add `coverage/` to `.gitignore` ([5ef23a8](https://github.com/fwextensions/react-select-quick-score/commit/5ef23a87e07d21566391fce337ee890b5f8f0e8b))
* Export named options from `assets/bookmarks.ts` ([5ef23a8](https://github.com/fwextensions/react-select-quick-score/commit/5ef23a87e07d21566391fce337ee890b5f8f0e8b))

### [0.0.2](https://github.com/fwextensions/react-select-quick-score/compare/react-select-quick-score-v0.0.1...react-select-quick-score-v0.0.2) (2022-05-25)


### Features

* Add index.d.ts to built package ([f3c3331](https://github.com/fwextensions/react-select-quick-score/commit/f3c33312b11d892d5a22ea8dde007c264b18e27d))
* Forward the ref to the wrapped `Select` ([f3c3331](https://github.com/fwextensions/react-select-quick-score/commit/f3c33312b11d892d5a22ea8dde007c264b18e27d))
* Use Vite library mode for the package ([f3c3331](https://github.com/fwextensions/react-select-quick-score/commit/f3c33312b11d892d5a22ea8dde007c264b18e27d))


### Bug Fixes

* Add same generic type params from Select to SelectQS component ([f3c3331](https://github.com/fwextensions/react-select-quick-score/commit/f3c33312b11d892d5a22ea8dde007c264b18e27d))
* Always use `noFilter` as `filterOption` prop on the component ([f3c3331](https://github.com/fwextensions/react-select-quick-score/commit/f3c33312b11d892d5a22ea8dde007c264b18e27d))
* **ci:** Remove bootstrap fields from release-please-config.json ([f3c3331](https://github.com/fwextensions/react-select-quick-score/commit/f3c33312b11d892d5a22ea8dde007c264b18e27d))
* Include sourcemaps ([f3c3331](https://github.com/fwextensions/react-select-quick-score/commit/f3c33312b11d892d5a22ea8dde007c264b18e27d))
* Indent with spaces in package.json ([f3c3331](https://github.com/fwextensions/react-select-quick-score/commit/f3c33312b11d892d5a22ea8dde007c264b18e27d))
* Make hook and component typings compatible with Select ([f3c3331](https://github.com/fwextensions/react-select-quick-score/commit/f3c33312b11d892d5a22ea8dde007c264b18e27d))
* Remove setItems() from useQuickScore ([f3c3331](https://github.com/fwextensions/react-select-quick-score/commit/f3c33312b11d892d5a22ea8dde007c264b18e27d))
* Rename QuickScoreSelect to SelectQS ([f3c3331](https://github.com/fwextensions/react-select-quick-score/commit/f3c33312b11d892d5a22ea8dde007c264b18e27d))
* Set `filterOption` to `null` instead of using a noop function ([f3c3331](https://github.com/fwextensions/react-select-quick-score/commit/f3c33312b11d892d5a22ea8dde007c264b18e27d))

### [0.0.1](https://github.com/fwextensions/react-select-quick-score/compare/react-select-quick-score-v0.0.1...react-select-quick-score-v0.0.1) (2022-05-25)


### Features

* **ci:** Add release-please.yml workflow ([daedf52](https://github.com/fwextensions/react-select-quick-score/commit/daedf52ed9717c91c50003d5a8fdc14c0562f6d0))
