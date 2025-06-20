import { toast } from "sonner";

export const useToast = () => {
  const showSuccess = (message: string, description?: string) => {
    toast.success(message, { description });
  };

  const showError = (message: string, description?: string) => {
    toast.error(message, { description });
  };

  const showInfo = (message: string, description?: string) => {
    toast(message, { description });
  };

  const showDismiss = (message: string) => {
    toast.dismiss(message);
  };

  return { showSuccess, showError, showInfo, showDismiss };
};
