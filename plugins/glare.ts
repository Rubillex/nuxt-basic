export default defineNuxtPlugin((nuxtApp) => {
    const onStart = (el: any, glare: HTMLElement) => {
        el.style.position = 'relative';
        el.style.overflow = 'hidden';
        el.appendChild(glare);
    };

    const onGlare = (el: any, e: MouseEvent, glare: HTMLElement) => {
        const mouseX = e.clientX - el.offsetLeft;
        const mouseY = e.clientY - el.offsetTop;

        glare.style.top = `${mouseY - glare.offsetHeight / 2}px`;
        glare.style.left = `${mouseX - glare.offsetWidth / 2}px`;
    };

    const onEnd = (el: any, glare: HTMLElement) => el.removeChild(glare);

    nuxtApp.vueApp.directive('glare', {
        mounted(el) {
            const glare = document.createElement('div');
            glare.style.height = '50px';
            glare.style.width = '50px';
            glare.style.position = 'absolute';
            glare.style.pointerEvents = 'none';
            glare.style.background = 'green';
            glare.style.borderRadius = '100%';
            glare.style.filter = 'blur(100px)';
            glare.style.transform = 'translate3d(0, 0, 0)';

            el.addEventListener('mouseenter', () => onStart(el, glare));
            el.addEventListener('mousemove', (e: MouseEvent) => onGlare(el, e, glare));
            el.addEventListener('mouseleave', () => onEnd(el, glare));
        },
    });
});
