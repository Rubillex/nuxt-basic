import { DirectiveBinding } from 'vue';

interface ITiltOptions {
    perspective?: number;
    scale?: number;
    transition?: string;
    delay?: number;
}

const defaultOptions: ITiltOptions = {
    perspective: 1000,
    scale: 1.05,
    transition: 'transform .5s cubic-bezier(.03, .98, .52, .99)',
    delay: 500,
};

export default defineNuxtPlugin((nuxtApp) => {
    const setTransition = (el: any, options?: ITiltOptions) => {
        clearTimeout(el.timeout);
        el.style.transition = options?.transition;

        el.timeout = setTimeout(() => {
            el.style.transition = '';
        }, options?.delay);
    };

    const startTilt = (el: any, options?: ITiltOptions) => {
        setTransition(el, options);
    };

    const tiltCard = (el: any, e: MouseEvent, options?: ITiltOptions) => {
        const elWidth = el.offsetWidth;
        const elHeight = el.offsetHeight;

        const centerX = el.offsetLeft + elWidth / 2;
        const centerY = el.offsetTop + elHeight / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const rotateX = ((1 * 10 * mouseY) / (elHeight / 2)).toFixed(2);
        const rotateY = ((-1 * 10 * mouseX) / (elWidth / 2)).toFixed(2);

        el.style.transformStyle = 'preserve-3d';
        el.style.transform = `perspective(${options?.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${options?.scale}, ${options?.scale}, ${options?.scale})`;
    };

    const endTilt = (el: any, options?: ITiltOptions) => {
        el.style.transform = `perspective(${options?.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        setTransition(el, options);
    };

    nuxtApp.vueApp.directive('tilt', {
        mounted(el, opts: DirectiveBinding<ITiltOptions>) {
            const options = { ...defaultOptions, ...opts.value };

            el.addEventListener('mouseenter', () => startTilt(el, options));
            el.addEventListener('mousemove', (e: MouseEvent) => tiltCard(el, e, options));
            el.addEventListener('mouseleave', () => endTilt(el, options));
        },
        unmounted(el) {
            el.removeEventListener('mouseenter', () => startTilt(el));
            el.removeEventListener('mousemove', (e: MouseEvent) => tiltCard(el, e));
            el.removeEventListener('mouseleave', () => endTilt(el));
        },
    });
});
