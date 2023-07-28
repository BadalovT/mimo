import { message } from "antd";

export const showSuccess = (successMessage: string) => {
  message.success(successMessage);
};
export const showInfo = (infoMessage: string) => {
  message.info(infoMessage);
};
export const showWarning = (warningMessage: string) => {
  message.warning(warningMessage);
};

export const showError = (errorMessage: string) => {
  message.error(errorMessage);
};
