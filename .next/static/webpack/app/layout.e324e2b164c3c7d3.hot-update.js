"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/layout",{

/***/ "(app-pages-browser)/./src/app/globals.css":
/*!*****************************!*\
  !*** ./src/app/globals.css ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"07caac678917\");\nif (true) { module.hot.accept() }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvZ2xvYmFscy5jc3MiLCJtYXBwaW5ncyI6IjtBQUFBLCtEQUFlLGNBQWM7QUFDN0IsSUFBSSxJQUFVLElBQUksaUJBQWlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvZ2xvYmFscy5jc3M/ZDAyMiJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBcIjA3Y2FhYzY3ODkxN1wiXG5pZiAobW9kdWxlLmhvdCkgeyBtb2R1bGUuaG90LmFjY2VwdCgpIH1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/globals.css\n"));

/***/ }),

/***/ "(app-pages-browser)/./src/components/Navigation.tsx":
/*!***************************************!*\
  !*** ./src/components/Navigation.tsx ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_themes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-themes */ \"(app-pages-browser)/./node_modules/next-themes/dist/index.module.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/dist/api/link.js\");\n/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! framer-motion */ \"(app-pages-browser)/./node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nconst Navigation = ()=>{\n    _s();\n    const [mounted, setMounted] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const { theme, setTheme } = (0,next_themes__WEBPACK_IMPORTED_MODULE_2__.useTheme)();\n    const [isMenuOpen, setIsMenuOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        setMounted(true);\n    }, []);\n    const navItems = [\n        {\n            name: \"Features\",\n            href: \"#features\"\n        },\n        {\n            name: \"Map\",\n            href: \"#map\"\n        },\n        {\n            name: \"Team\",\n            href: \"#team\"\n        },\n        {\n            name: \"Contact\",\n            href: \"#contact\"\n        }\n    ];\n    const menuVariants = {\n        open: {\n            opacity: 1,\n            x: 0\n        },\n        closed: {\n            opacity: 0,\n            x: \"100%\"\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n        className: \"fixed w-full z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex items-center justify-between h-16\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.div, {\n                            initial: {\n                                opacity: 0,\n                                x: -20\n                            },\n                            animate: {\n                                opacity: 1,\n                                x: 0\n                            },\n                            transition: {\n                                duration: 0.5\n                            },\n                            className: \"flex-shrink-0\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                                href: \"/\",\n                                className: \"text-2xl font-bold text-primary-dark dark:text-primary-light\",\n                                children: \"SoJourn\"\n                            }, void 0, false, {\n                                fileName: \"/Users/chahelpaatur/Sojourn-Website/src/components/Navigation.tsx\",\n                                lineNumber: 39,\n                                columnNumber: 13\n                            }, undefined)\n                        }, void 0, false, {\n                            fileName: \"/Users/chahelpaatur/Sojourn-Website/src/components/Navigation.tsx\",\n                            lineNumber: 33,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"hidden md:block\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"ml-10 flex items-center space-x-8\",\n                                children: [\n                                    navItems.map((item, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.div, {\n                                            initial: {\n                                                opacity: 0,\n                                                y: -20\n                                            },\n                                            animate: {\n                                                opacity: 1,\n                                                y: 0\n                                            },\n                                            transition: {\n                                                duration: 0.5,\n                                                delay: index * 0.1\n                                            },\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                                                href: item.href,\n                                                className: \"text-gray-700 hover:text-primary-light dark:text-gray-300 dark:hover:text-primary-light transition-colors duration-200\",\n                                                children: item.name\n                                            }, void 0, false, {\n                                                fileName: \"/Users/chahelpaatur/Sojourn-Website/src/components/Navigation.tsx\",\n                                                lineNumber: 54,\n                                                columnNumber: 19\n                                            }, undefined)\n                                        }, item.name, false, {\n                                            fileName: \"/Users/chahelpaatur/Sojourn-Website/src/components/Navigation.tsx\",\n                                            lineNumber: 48,\n                                            columnNumber: 17\n                                        }, undefined)),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                        onClick: ()=>setTheme(theme === \"dark\" ? \"light\" : \"dark\"),\n                                        className: \"p-2 rounded-lg bg-gray-200 dark:bg-gray-800 transition-colors duration-200\",\n                                        children: mounted && (theme === \"dark\" ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"svg\", {\n                                            className: \"w-5 h-5\",\n                                            fill: \"currentColor\",\n                                            viewBox: \"0 0 20 20\",\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"path\", {\n                                                fillRule: \"evenodd\",\n                                                d: \"M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z\",\n                                                clipRule: \"evenodd\"\n                                            }, void 0, false, {\n                                                fileName: \"/Users/chahelpaatur/Sojourn-Website/src/components/Navigation.tsx\",\n                                                lineNumber: 71,\n                                                columnNumber: 23\n                                            }, undefined)\n                                        }, void 0, false, {\n                                            fileName: \"/Users/chahelpaatur/Sojourn-Website/src/components/Navigation.tsx\",\n                                            lineNumber: 70,\n                                            columnNumber: 21\n                                        }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"svg\", {\n                                            className: \"w-5 h-5\",\n                                            fill: \"currentColor\",\n                                            viewBox: \"0 0 20 20\",\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"path\", {\n                                                d: \"M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z\"\n                                            }, void 0, false, {\n                                                fileName: \"/Users/chahelpaatur/Sojourn-Website/src/components/Navigation.tsx\",\n                                                lineNumber: 79,\n                                                columnNumber: 23\n                                            }, undefined)\n                                        }, void 0, false, {\n                                            fileName: \"/Users/chahelpaatur/Sojourn-Website/src/components/Navigation.tsx\",\n                                            lineNumber: 78,\n                                            columnNumber: 21\n                                        }, undefined))\n                                    }, void 0, false, {\n                                        fileName: \"/Users/chahelpaatur/Sojourn-Website/src/components/Navigation.tsx\",\n                                        lineNumber: 64,\n                                        columnNumber: 15\n                                    }, undefined)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/chahelpaatur/Sojourn-Website/src/components/Navigation.tsx\",\n                                lineNumber: 46,\n                                columnNumber: 13\n                            }, undefined)\n                        }, void 0, false, {\n                            fileName: \"/Users/chahelpaatur/Sojourn-Website/src/components/Navigation.tsx\",\n                            lineNumber: 45,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"md:hidden\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                onClick: ()=>setIsMenuOpen(!isMenuOpen),\n                                className: \"inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-light focus:outline-none\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"svg\", {\n                                    className: \"h-6 w-6\",\n                                    fill: \"none\",\n                                    viewBox: \"0 0 24 24\",\n                                    stroke: \"currentColor\",\n                                    children: isMenuOpen ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"path\", {\n                                        strokeLinecap: \"round\",\n                                        strokeLinejoin: \"round\",\n                                        strokeWidth: 2,\n                                        d: \"M6 18L18 6M6 6l12 12\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/chahelpaatur/Sojourn-Website/src/components/Navigation.tsx\",\n                                        lineNumber: 101,\n                                        columnNumber: 19\n                                    }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"path\", {\n                                        strokeLinecap: \"round\",\n                                        strokeLinejoin: \"round\",\n                                        strokeWidth: 2,\n                                        d: \"M4 6h16M4 12h16M4 18h16\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/chahelpaatur/Sojourn-Website/src/components/Navigation.tsx\",\n                                        lineNumber: 108,\n                                        columnNumber: 19\n                                    }, undefined)\n                                }, void 0, false, {\n                                    fileName: \"/Users/chahelpaatur/Sojourn-Website/src/components/Navigation.tsx\",\n                                    lineNumber: 94,\n                                    columnNumber: 15\n                                }, undefined)\n                            }, void 0, false, {\n                                fileName: \"/Users/chahelpaatur/Sojourn-Website/src/components/Navigation.tsx\",\n                                lineNumber: 89,\n                                columnNumber: 13\n                            }, undefined)\n                        }, void 0, false, {\n                            fileName: \"/Users/chahelpaatur/Sojourn-Website/src/components/Navigation.tsx\",\n                            lineNumber: 88,\n                            columnNumber: 11\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/chahelpaatur/Sojourn-Website/src/components/Navigation.tsx\",\n                    lineNumber: 32,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/chahelpaatur/Sojourn-Website/src/components/Navigation.tsx\",\n                lineNumber: 31,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.div, {\n                className: \"md:hidden\",\n                initial: \"closed\",\n                animate: isMenuOpen ? \"open\" : \"closed\",\n                variants: menuVariants,\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"px-2 pt-2 pb-3 space-y-1 sm:px-3\",\n                    children: navItems.map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                            href: item.href,\n                            className: \"block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-light transition-colors duration-200\",\n                            onClick: ()=>setIsMenuOpen(false),\n                            children: item.name\n                        }, item.name, false, {\n                            fileName: \"/Users/chahelpaatur/Sojourn-Website/src/components/Navigation.tsx\",\n                            lineNumber: 130,\n                            columnNumber: 13\n                        }, undefined))\n                }, void 0, false, {\n                    fileName: \"/Users/chahelpaatur/Sojourn-Website/src/components/Navigation.tsx\",\n                    lineNumber: 128,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/chahelpaatur/Sojourn-Website/src/components/Navigation.tsx\",\n                lineNumber: 122,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/chahelpaatur/Sojourn-Website/src/components/Navigation.tsx\",\n        lineNumber: 30,\n        columnNumber: 5\n    }, undefined);\n};\n_s(Navigation, \"7Tsh2kgHpNI5IcRcDN9+0CnDGhw=\", false, function() {\n    return [\n        next_themes__WEBPACK_IMPORTED_MODULE_2__.useTheme\n    ];\n});\n_c = Navigation;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Navigation);\nvar _c;\n$RefreshReg$(_c, \"Navigation\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL05hdmlnYXRpb24udHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUUyQztBQUNMO0FBQ1Y7QUFDVTtBQUV0QyxNQUFNSyxhQUFhOztJQUNqQixNQUFNLENBQUNDLFNBQVNDLFdBQVcsR0FBR1AsK0NBQVFBLENBQUM7SUFDdkMsTUFBTSxFQUFFUSxLQUFLLEVBQUVDLFFBQVEsRUFBRSxHQUFHUCxxREFBUUE7SUFDcEMsTUFBTSxDQUFDUSxZQUFZQyxjQUFjLEdBQUdYLCtDQUFRQSxDQUFDO0lBRTdDQyxnREFBU0EsQ0FBQztRQUNSTSxXQUFXO0lBQ2IsR0FBRyxFQUFFO0lBRUwsTUFBTUssV0FBVztRQUNmO1lBQUVDLE1BQU07WUFBWUMsTUFBTTtRQUFZO1FBQ3RDO1lBQUVELE1BQU07WUFBT0MsTUFBTTtRQUFPO1FBQzVCO1lBQUVELE1BQU07WUFBUUMsTUFBTTtRQUFRO1FBQzlCO1lBQUVELE1BQU07WUFBV0MsTUFBTTtRQUFXO0tBQ3JDO0lBRUQsTUFBTUMsZUFBZTtRQUNuQkMsTUFBTTtZQUFFQyxTQUFTO1lBQUdDLEdBQUc7UUFBRTtRQUN6QkMsUUFBUTtZQUFFRixTQUFTO1lBQUdDLEdBQUc7UUFBTztJQUNsQztJQUVBLHFCQUNFLDhEQUFDRTtRQUFJQyxXQUFVOzswQkFDYiw4REFBQ0M7Z0JBQUlELFdBQVU7MEJBQ2IsNEVBQUNDO29CQUFJRCxXQUFVOztzQ0FDYiw4REFBQ2pCLGlEQUFNQSxDQUFDa0IsR0FBRzs0QkFDVEMsU0FBUztnQ0FBRU4sU0FBUztnQ0FBR0MsR0FBRyxDQUFDOzRCQUFHOzRCQUM5Qk0sU0FBUztnQ0FBRVAsU0FBUztnQ0FBR0MsR0FBRzs0QkFBRTs0QkFDNUJPLFlBQVk7Z0NBQUVDLFVBQVU7NEJBQUk7NEJBQzVCTCxXQUFVO3NDQUVWLDRFQUFDbEIsaURBQUlBO2dDQUFDVyxNQUFLO2dDQUFJTyxXQUFVOzBDQUErRDs7Ozs7Ozs7Ozs7c0NBTTFGLDhEQUFDQzs0QkFBSUQsV0FBVTtzQ0FDYiw0RUFBQ0M7Z0NBQUlELFdBQVU7O29DQUNaVCxTQUFTZSxHQUFHLENBQUMsQ0FBQ0MsTUFBTUMsc0JBQ25CLDhEQUFDekIsaURBQU1BLENBQUNrQixHQUFHOzRDQUVUQyxTQUFTO2dEQUFFTixTQUFTO2dEQUFHYSxHQUFHLENBQUM7NENBQUc7NENBQzlCTixTQUFTO2dEQUFFUCxTQUFTO2dEQUFHYSxHQUFHOzRDQUFFOzRDQUM1QkwsWUFBWTtnREFBRUMsVUFBVTtnREFBS0ssT0FBT0YsUUFBUTs0Q0FBSTtzREFFaEQsNEVBQUMxQixpREFBSUE7Z0RBQ0hXLE1BQU1jLEtBQUtkLElBQUk7Z0RBQ2ZPLFdBQVU7MERBR1RPLEtBQUtmLElBQUk7Ozs7OzsyQ0FWUGUsS0FBS2YsSUFBSTs7Ozs7a0RBZWxCLDhEQUFDbUI7d0NBQ0NDLFNBQVMsSUFBTXhCLFNBQVNELFVBQVUsU0FBUyxVQUFVO3dDQUNyRGEsV0FBVTtrREFFVGYsV0FDQ0UsQ0FBQUEsVUFBVSx1QkFDUiw4REFBQzBCOzRDQUFJYixXQUFVOzRDQUFVYyxNQUFLOzRDQUFlQyxTQUFRO3NEQUNuRCw0RUFBQ0M7Z0RBQ0NDLFVBQVM7Z0RBQ1RDLEdBQUU7Z0RBQ0ZDLFVBQVM7Ozs7Ozs7Ozs7c0VBSWIsOERBQUNOOzRDQUFJYixXQUFVOzRDQUFVYyxNQUFLOzRDQUFlQyxTQUFRO3NEQUNuRCw0RUFBQ0M7Z0RBQUtFLEdBQUU7Ozs7Ozs7Ozs7cURBRVo7Ozs7Ozs7Ozs7Ozs7Ozs7O3NDQU9SLDhEQUFDakI7NEJBQUlELFdBQVU7c0NBQ2IsNEVBQUNXO2dDQUNDQyxTQUFTLElBQU10QixjQUFjLENBQUNEO2dDQUM5QlcsV0FBVTswQ0FHViw0RUFBQ2E7b0NBQ0NiLFdBQVU7b0NBQ1ZjLE1BQUs7b0NBQ0xDLFNBQVE7b0NBQ1JLLFFBQU87OENBRU4vQiwyQkFDQyw4REFBQzJCO3dDQUNDSyxlQUFjO3dDQUNkQyxnQkFBZTt3Q0FDZkMsYUFBYTt3Q0FDYkwsR0FBRTs7Ozs7a0VBR0osOERBQUNGO3dDQUNDSyxlQUFjO3dDQUNkQyxnQkFBZTt3Q0FDZkMsYUFBYTt3Q0FDYkwsR0FBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBVWhCLDhEQUFDbkMsaURBQU1BLENBQUNrQixHQUFHO2dCQUNURCxXQUFVO2dCQUNWRSxTQUFRO2dCQUNSQyxTQUFTZCxhQUFhLFNBQVM7Z0JBQy9CbUMsVUFBVTlCOzBCQUVWLDRFQUFDTztvQkFBSUQsV0FBVTs4QkFDWlQsU0FBU2UsR0FBRyxDQUFDLENBQUNDLHFCQUNiLDhEQUFDekIsaURBQUlBOzRCQUVIVyxNQUFNYyxLQUFLZCxJQUFJOzRCQUNmTyxXQUFVOzRCQUVWWSxTQUFTLElBQU10QixjQUFjO3NDQUU1QmlCLEtBQUtmLElBQUk7MkJBTkxlLEtBQUtmLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWE1QjtHQXhJTVI7O1FBRXdCSCxpREFBUUE7OztLQUZoQ0c7QUEwSU4sK0RBQWVBLFVBQVVBLEVBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvTmF2aWdhdGlvbi50c3g/MDFkZCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIlxuXG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyB1c2VUaGVtZSB9IGZyb20gJ25leHQtdGhlbWVzJ1xuaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJ1xuaW1wb3J0IHsgbW90aW9uIH0gZnJvbSAnZnJhbWVyLW1vdGlvbidcblxuY29uc3QgTmF2aWdhdGlvbiA9ICgpID0+IHtcbiAgY29uc3QgW21vdW50ZWQsIHNldE1vdW50ZWRdID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IHsgdGhlbWUsIHNldFRoZW1lIH0gPSB1c2VUaGVtZSgpXG4gIGNvbnN0IFtpc01lbnVPcGVuLCBzZXRJc01lbnVPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0TW91bnRlZCh0cnVlKVxuICB9LCBbXSlcblxuICBjb25zdCBuYXZJdGVtcyA9IFtcbiAgICB7IG5hbWU6ICdGZWF0dXJlcycsIGhyZWY6ICcjZmVhdHVyZXMnIH0sXG4gICAgeyBuYW1lOiAnTWFwJywgaHJlZjogJyNtYXAnIH0sXG4gICAgeyBuYW1lOiAnVGVhbScsIGhyZWY6ICcjdGVhbScgfSxcbiAgICB7IG5hbWU6ICdDb250YWN0JywgaHJlZjogJyNjb250YWN0JyB9LFxuICBdXG5cbiAgY29uc3QgbWVudVZhcmlhbnRzID0ge1xuICAgIG9wZW46IHsgb3BhY2l0eTogMSwgeDogMCB9LFxuICAgIGNsb3NlZDogeyBvcGFjaXR5OiAwLCB4OiBcIjEwMCVcIiB9LFxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8bmF2IGNsYXNzTmFtZT1cImZpeGVkIHctZnVsbCB6LTUwIGJnLXdoaXRlLzgwIGRhcms6YmctYmFja2dyb3VuZC1kYXJrLzgwIGJhY2tkcm9wLWJsdXItbWRcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LThcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gaC0xNlwiPlxuICAgICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgICBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHg6IC0yMCB9fVxuICAgICAgICAgICAgYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCB4OiAwIH19XG4gICAgICAgICAgICB0cmFuc2l0aW9uPXt7IGR1cmF0aW9uOiAwLjUgfX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtc2hyaW5rLTBcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvXCIgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtcHJpbWFyeS1kYXJrIGRhcms6dGV4dC1wcmltYXJ5LWxpZ2h0XCI+XG4gICAgICAgICAgICAgIFNvSm91cm5cbiAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICA8L21vdGlvbi5kaXY+XG5cbiAgICAgICAgICB7LyogRGVza3RvcCBOYXZpZ2F0aW9uICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGlkZGVuIG1kOmJsb2NrXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1sLTEwIGZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtOFwiPlxuICAgICAgICAgICAgICB7bmF2SXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0ubmFtZX1cbiAgICAgICAgICAgICAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgeTogLTIwIH19XG4gICAgICAgICAgICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHk6IDAgfX1cbiAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb249e3sgZHVyYXRpb246IDAuNSwgZGVsYXk6IGluZGV4ICogMC4xIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPExpbmtcbiAgICAgICAgICAgICAgICAgICAgaHJlZj17aXRlbS5ocmVmfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNzAwIGhvdmVyOnRleHQtcHJpbWFyeS1saWdodCBkYXJrOnRleHQtZ3JheS0zMDAgZGFyazpob3Zlcjp0ZXh0LXByaW1hcnktbGlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMjAwXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge2l0ZW0ubmFtZX1cbiAgICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFRoZW1lKHRoZW1lID09PSAnZGFyaycgPyAnbGlnaHQnIDogJ2RhcmsnKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC1sZyBiZy1ncmF5LTIwMCBkYXJrOmJnLWdyYXktODAwIHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTIwMFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7bW91bnRlZCAmJiAoXG4gICAgICAgICAgICAgICAgICB0aGVtZSA9PT0gJ2RhcmsnID8gKFxuICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctNSBoLTVcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxsUnVsZT1cImV2ZW5vZGRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgZD1cIk0xMCAyYTEgMSAwIDAxMSAxdjFhMSAxIDAgMTEtMiAwVjNhMSAxIDAgMDExLTF6bTQgOGE0IDQgMCAxMS04IDAgNCA0IDAgMDE4IDB6bS0uNDY0IDQuOTVsLjcwNy43MDdhMSAxIDAgMDAxLjQxNC0xLjQxNGwtLjcwNy0uNzA3YTEgMSAwIDAwLTEuNDE0IDEuNDE0em0yLjEyLTEwLjYwN2ExIDEgMCAwMTAgMS40MTRsLS43MDYuNzA3YTEgMSAwIDExLTEuNDE0LTEuNDE0bC43MDctLjcwN2ExIDEgMCAwMTEuNDE0IDB6TTE3IDExYTEgMSAwIDEwMC0yaC0xYTEgMSAwIDEwMCAyaDF6bS03IDRhMSAxIDAgMDExIDF2MWExIDEgMCAxMS0yIDB2LTFhMSAxIDAgMDExLTF6TTUuMDUgNi40NjRBMSAxIDAgMTA2LjQ2NSA1LjA1bC0uNzA4LS43MDdhMSAxIDAgMDAtMS40MTQgMS40MTRsLjcwNy43MDd6bTEuNDE0IDguNDg2bC0uNzA3LjcwN2ExIDEgMCAwMS0xLjQxNC0xLjQxNGwuNzA3LS43MDdhMSAxIDAgMDExLjQxNCAxLjQxNHpNNCAxMWExIDEgMCAxMDAtMkgzYTEgMSAwIDAwMCAyaDF6XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaXBSdWxlPVwiZXZlbm9kZFwiXG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctNSBoLTVcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTcuMjkzIDEzLjI5M0E4IDggMCAwMTYuNzA3IDIuNzA3YTguMDAxIDguMDAxIDAgMTAxMC41ODYgMTAuNTg2elwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogTW9iaWxlIG1lbnUgYnV0dG9uICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWQ6aGlkZGVuXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzTWVudU9wZW4oIWlzTWVudU9wZW4pfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC0yIHJvdW5kZWQtbWQgdGV4dC1ncmF5LTcwMCBkYXJrOnRleHQtZ3JheS0zMDBcbiAgICAgICAgICAgICAgICAgICAgICAgICBob3Zlcjp0ZXh0LXByaW1hcnktbGlnaHQgZGFyazpob3Zlcjp0ZXh0LXByaW1hcnktbGlnaHQgZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImgtNiB3LTZcIlxuICAgICAgICAgICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcbiAgICAgICAgICAgICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2lzTWVudU9wZW4gPyAoXG4gICAgICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxuICAgICAgICAgICAgICAgICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9ezJ9XG4gICAgICAgICAgICAgICAgICAgIGQ9XCJNNiAxOEwxOCA2TTYgNmwxMiAxMlwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxuICAgICAgICAgICAgICAgICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9ezJ9XG4gICAgICAgICAgICAgICAgICAgIGQ9XCJNNCA2aDE2TTQgMTJoMTZNNCAxOGgxNlwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBNb2JpbGUgbWVudSAqL31cbiAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cIm1kOmhpZGRlblwiXG4gICAgICAgIGluaXRpYWw9XCJjbG9zZWRcIlxuICAgICAgICBhbmltYXRlPXtpc01lbnVPcGVuID8gXCJvcGVuXCIgOiBcImNsb3NlZFwifVxuICAgICAgICB2YXJpYW50cz17bWVudVZhcmlhbnRzfVxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTIgcHQtMiBwYi0zIHNwYWNlLXktMSBzbTpweC0zXCI+XG4gICAgICAgICAge25hdkl0ZW1zLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgPExpbmtcbiAgICAgICAgICAgICAga2V5PXtpdGVtLm5hbWV9XG4gICAgICAgICAgICAgIGhyZWY9e2l0ZW0uaHJlZn1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmxvY2sgcHgtMyBweS0yIHJvdW5kZWQtbWQgdGV4dC1iYXNlIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgZGFyazp0ZXh0LWdyYXktMzAwXG4gICAgICAgICAgICAgICAgICAgICAgIGhvdmVyOnRleHQtcHJpbWFyeS1saWdodCBkYXJrOmhvdmVyOnRleHQtcHJpbWFyeS1saWdodCB0cmFuc2l0aW9uLWNvbG9ycyBkdXJhdGlvbi0yMDBcIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc01lbnVPcGVuKGZhbHNlKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2l0ZW0ubmFtZX1cbiAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L21vdGlvbi5kaXY+XG4gICAgPC9uYXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgTmF2aWdhdGlvbiAiXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VUaGVtZSIsIkxpbmsiLCJtb3Rpb24iLCJOYXZpZ2F0aW9uIiwibW91bnRlZCIsInNldE1vdW50ZWQiLCJ0aGVtZSIsInNldFRoZW1lIiwiaXNNZW51T3BlbiIsInNldElzTWVudU9wZW4iLCJuYXZJdGVtcyIsIm5hbWUiLCJocmVmIiwibWVudVZhcmlhbnRzIiwib3BlbiIsIm9wYWNpdHkiLCJ4IiwiY2xvc2VkIiwibmF2IiwiY2xhc3NOYW1lIiwiZGl2IiwiaW5pdGlhbCIsImFuaW1hdGUiLCJ0cmFuc2l0aW9uIiwiZHVyYXRpb24iLCJtYXAiLCJpdGVtIiwiaW5kZXgiLCJ5IiwiZGVsYXkiLCJidXR0b24iLCJvbkNsaWNrIiwic3ZnIiwiZmlsbCIsInZpZXdCb3giLCJwYXRoIiwiZmlsbFJ1bGUiLCJkIiwiY2xpcFJ1bGUiLCJzdHJva2UiLCJzdHJva2VMaW5lY2FwIiwic3Ryb2tlTGluZWpvaW4iLCJzdHJva2VXaWR0aCIsInZhcmlhbnRzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/Navigation.tsx\n"));

/***/ })

});