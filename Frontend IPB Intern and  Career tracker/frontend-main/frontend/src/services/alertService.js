export const APP_ALERT_EVENT = "app-alert";

export const showAlert = (message, options = {}) => {
  window.dispatchEvent(
    new CustomEvent(APP_ALERT_EVENT, {
      detail: {
        title: options.title || "Pemberitahuan",
        description:
          message || "Terjadi kesalahan.",
      },
    })
  );
};
