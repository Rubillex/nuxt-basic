export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('tilt', {
        mounted(el) {
            const setTransition = () => {
                clearTimeout(el.timeout);
                el.style.transition = 'transform .5s cubic-bezier(.03, .98, .52, .99)'

                el.timeout = setTimeout(() => {
                    el.style.transition = ''
                }, 500);
            }

            const startTilt = () => {
                setTransition();
            };

            const tiltCard = (e: MouseEvent) => {
                const elWidth = el.offsetWidth;
                const elHeight = el.offsetHeight;

                const centerX = el.offsetLeft + elWidth / 2;
                const centerY = el.offsetTop + elHeight / 2;

                const mouseX = e.clientX - centerX;
                const mouseY = e.clientY - centerY;

                const rotateX = ((1) * 5 * mouseY / (elHeight / 2)).toFixed(2);
                const rotateY = ((-1) * 5 * mouseX / (elWidth / 2)).toFixed(2);

                el.style.transformStyle = 'preserve-3d';
                el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }

            const endTilt = () => {
                el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
                setTransition();
            };

            el.addEventListener('mouseenter', startTilt);
            el.addEventListener('mousemove', tiltCard);
            el.addEventListener('mouseleave', endTilt);
        },
    })
})
