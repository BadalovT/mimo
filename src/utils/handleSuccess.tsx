import { FormInstance } from "antd";
import { showInfo, showSuccess } from "./showMessage";
type Types = {
  controller: string;
  statusCode: number;
  mode: string;
  form: FormInstance<any>;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setAccountKey: React.Dispatch<React.SetStateAction<number | null>>;
  setIsPasswordModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setComponentDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
};
export const handleSuccess = ({
  controller,
  statusCode,
  mode,
  form,
  setIsModalVisible,
  setAccountKey,
  setIsPasswordModalOpen,
  setComponentDisabled,
  setCurrent,
}: Types) => {
  if (statusCode === 200 || statusCode === 201) {
    switch (mode) {
      case "new":
        showSuccess(`${controller} əlavə olundu!`);
        break;

      case "update":
        showInfo(`${controller} məlumatları yeniləndi!`);
        break;

      case "delete":
        showSuccess(`${controller} silindi!`);
        break;

      default:
        showSuccess(`Əməliyyat tamamlandı`);
        break;
    }
    form.resetFields();
    setIsModalVisible(false);
    setAccountKey(null);
    setIsPasswordModalOpen(false);
    setComponentDisabled(false);
    setCurrent(1);
  }
};
