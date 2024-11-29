export const showGlobalLoader = () => {
  const event = new CustomEvent("app-loader", {
    detail: { isLoading: true, isGlobal: true },
  });
  window.dispatchEvent(event);
};

export const hideGlobalLoader = () => {
  const event = new CustomEvent("app-loader", {
    detail: { isLoading: false, isGlobal: true },
  });
  window.dispatchEvent(event);
};
