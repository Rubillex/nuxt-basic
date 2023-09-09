import { defineStore } from 'pinia';
import { DefineComponent } from 'vue';

interface IModalStore {
    component: DefineComponent | null;
}

export const useModalStore = defineStore('modal', {
    state: () =>
        ({
            component: null,
        } as IModalStore),
    getters: {
        getComponent: (state) => state.component,
    },
    actions: {
        setComponent(component: DefineComponent | any) {
            // Открытие модального окна
            this.component = component;

            // Отключение скролла в момент открытия модального окна
            document.body.style.overflow = 'hidden';
        },
        closeModal() {
            this.component = null;
        },
    },
});
