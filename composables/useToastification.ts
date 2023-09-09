import { useToast } from 'vue-toastification';

export const useToastification = () => {
    const toast = useToast();

    const defaultToast = (text: string) => toast(text, {});
    const infoToast = (text: string) => toast.info(text, {});
    const successToast = (text: string) => toast.success(text, {});
    const errorToast = (text: string) => toast.error(text, {});
    const warningToast = (text: string) => toast.warning(text, {});

    const clearToasts = () => toast.clear();

    return { defaultToast, infoToast, successToast, errorToast, warningToast, clearToasts };
};
