"use client";
"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const reactStore = require("@tanstack/react-store");
const formCore = require("@tanstack/form-core");
const useIsomorphicLayoutEffect = require("./useIsomorphicLayoutEffect.cjs");
function useField(opts) {
  const [prevOptions, setPrevOptions] = React.useState(() => ({
    form: opts.form,
    name: opts.name
  }));
  const [fieldApi, setFieldApi] = React.useState(() => {
    return new formCore.FieldApi({
      ...opts
    });
  });
  if (prevOptions.form !== opts.form || prevOptions.name !== opts.name) {
    setFieldApi(
      new formCore.FieldApi({
        ...opts
      })
    );
    setPrevOptions({ form: opts.form, name: opts.name });
  }
  const reactiveStateValue = reactStore.useStore(fieldApi.store, (state) => state.value);
  const reactiveMetaIsTouched = reactStore.useStore(
    fieldApi.store,
    (state) => state.meta.isTouched
  );
  const reactiveMetaIsBlurred = reactStore.useStore(
    fieldApi.store,
    (state) => state.meta.isBlurred
  );
  const reactiveMetaIsDirty = reactStore.useStore(
    fieldApi.store,
    (state) => state.meta.isDirty
  );
  const reactiveMetaErrorMap = reactStore.useStore(
    fieldApi.store,
    (state) => state.meta.errorMap
  );
  const reactiveMetaErrorSourceMap = reactStore.useStore(
    fieldApi.store,
    (state) => state.meta.errorSourceMap
  );
  const reactiveMetaIsValidating = reactStore.useStore(
    fieldApi.store,
    (state) => state.meta.isValidating
  );
  const extendedFieldApi = React.useMemo(() => {
    const reactiveFieldApi = {
      ...fieldApi,
      get state() {
        return {
          value: reactiveStateValue,
          get meta() {
            return {
              ...fieldApi.state.meta,
              isTouched: reactiveMetaIsTouched,
              isBlurred: reactiveMetaIsBlurred,
              isDirty: reactiveMetaIsDirty,
              errorMap: reactiveMetaErrorMap,
              errorSourceMap: reactiveMetaErrorSourceMap,
              isValidating: reactiveMetaIsValidating
            };
          }
        };
      }
    };
    const extendedApi = reactiveFieldApi;
    extendedApi.Field = Field;
    return extendedApi;
  }, [
    fieldApi,
    reactiveStateValue,
    reactiveMetaIsTouched,
    reactiveMetaIsBlurred,
    reactiveMetaIsDirty,
    reactiveMetaErrorMap,
    reactiveMetaErrorSourceMap,
    reactiveMetaIsValidating
  ]);
  useIsomorphicLayoutEffect.useIsomorphicLayoutEffect(fieldApi.mount, [fieldApi]);
  useIsomorphicLayoutEffect.useIsomorphicLayoutEffect(() => {
    fieldApi.update(opts);
  });
  reactStore.useStore(
    fieldApi.store,
    opts.mode === "array" ? (state) => {
      return [
        state.meta,
        Object.keys(state.value ?? []).length
      ];
    } : void 0
  );
  return extendedFieldApi;
}
const Field = (({
  children,
  ...fieldOptions
}) => {
  const fieldApi = useField(fieldOptions);
  const jsxToDisplay = React.useMemo(
    () => formCore.functionalUpdate(children, fieldApi),
    [children, fieldApi]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxToDisplay });
});
exports.Field = Field;
exports.useField = useField;
//# sourceMappingURL=useField.cjs.map
