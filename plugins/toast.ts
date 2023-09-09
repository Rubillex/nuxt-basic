// https://vue-toastification.maronato.dev
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Toast, {
        showCloseButtonOnHover: true,
        maxToasts: 20,
        newestOnTop: true,
        hideProgressBar: true,
        closeButton: false,
    });
});
