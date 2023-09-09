import { useModalStore } from '../index';
import './modal.scss';

export default {
    setup() {
        const modal = useModalStore();
        const handleCloseModal = () => modal.closeModal();

        return () =>
            h('div', { class: modal.getComponent ? 'modal' : 'modal hide' }, [
                h('div', { class: 'modal__overlay', onClick: handleCloseModal }),
                h('div', { class: 'modal__content' }, [h(modal.getComponent ? modal.getComponent : '')]),
            ]);
    },
};
