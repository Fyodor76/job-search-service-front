export const emitToast = (
  message: string,
  type: "success" | "error" | "primary" = "primary",
  duration: number = 3000,
  position:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left" = "bottom-right",
) => {
  const event = new CustomEvent("app-toast", {
    detail: { message, type, duration, position },
  });
  window.dispatchEvent(event);
};
