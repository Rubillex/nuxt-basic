import type { DirectiveBinding } from 'vue';

interface ITiltOptions {
    perspective?: number;
    scale?: number;
    transition?: string;
    delay?: number;
    strength?: number;
}

const defaultOptions: ITiltOptions = {
    perspective: 1000,
    scale: 1.05,
    transition: 'transform .5s cubic-bezier(.03, .98, .52, .99)',
    delay: 500,
    strength: 6,
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

        const node = document.createElement('div');
        node.setAttribute('id', 'tilt-glare');
        el.appendChild(node);

        el.style.position = 'relative';
        node.style.position = 'absolute';
        node.style.zIndex = '10';

        el.addEventListener('mousemove', (e: MouseEvent) => tiltCard(el, e, options));
    };

    const tiltCard = (el: any, e: MouseEvent, options?: ITiltOptions) => {
        const elWidth = el.offsetWidth;
        const elHeight = el.offsetHeight;

        const centerX = el.offsetLeft + elWidth / 2;
        const centerY = el.offsetTop + elHeight / 2;

        const mouseX = e.pageX - centerX;
        const mouseY = e.pageY - centerY;

        const rotateX = ((-1 * Number(options?.strength) * mouseY) / (elHeight / 2)).toFixed(2);
        const rotateY = ((1 * Number(options?.strength) * mouseX) / (elWidth / 2)).toFixed(2);

        for (const child of el.children) {
            child.style.outline = '1px solid transparent';
        }
        el.style.outline = '1px solid transparent';

        const glare = document.getElementById('tilt-glare');

        if (glare) {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const glareOnCursorY = y + rect.height / 2;
            const glareOnCursorX = x + rect.width / 2;

            let glareCoordsX = glareOnCursorX + x - 50;
            let glareCoordsY = glareOnCursorY + y - 50;

            glareCoordsX = glareCoordsX > rect.width - 100 ? rect.width - 100 : glareCoordsX;
            glareCoordsX = glareCoordsX < -1 * (rect.width / 2) + 200 ? -1 * (rect.width / 2) + 200 : glareCoordsX;

            glareCoordsY = glareCoordsY > rect.height - 100 ? rect.height - 100 : glareCoordsY;
            glareCoordsY = glareCoordsY < -1 * (rect.height / 2) + 300 ? -1 * (rect.height / 2) + 300 : glareCoordsY;

            glare.style.top = `${glareCoordsY}px`;
            glare.style.left = `${glareCoordsX}px`;
            glare.style.background = 'white';
            glare.style.filter = 'blur(3rem)';
            glare.style.width = '100px';
            glare.style.height = '100px';
            glare.classList.add('tilt-glare');
        }

        el.style.transformStyle = 'preserve-3d';
        el.style.transform = `perspective(${options?.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${options?.scale}, ${options?.scale}, ${options?.scale})`;
        el.style[
            '-moz-transform'
        ] = `perspective(${options?.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${options?.scale}, ${options?.scale}, ${options?.scale})`;
        el.style.willChange = 'transform';
    };

    const endTilt = (el: any, options?: ITiltOptions) => {
        el.style.transform = `perspective(${options?.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        setTransition(el, options);

        document.getElementById('tilt-glare')?.remove();

        el.removeEventListener('mousemove', (e: MouseEvent) => tiltCard(el, e));
    };

    nuxtApp.vueApp.directive('tilt', {
        mounted(el, opts: DirectiveBinding<ITiltOptions>) {
            if (window.innerWidth < 1000) {
                return;
            }

            const options = { ...defaultOptions, ...opts.value };

            el.addEventListener('mouseenter', () => startTilt(el, options));
            el.addEventListener('mouseleave', () => endTilt(el, options));
        },
        unmounted(el) {
            if (window.innerWidth < 1000) {
                return;
            }

            el.removeEventListener('mouseenter', () => startTilt(el));
            el.removeEventListener('mouseleave', () => endTilt(el));
        },
    });
});
