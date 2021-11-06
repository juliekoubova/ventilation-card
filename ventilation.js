(function () {
    const Mapping = {
        freshIn: 'fresh-in',
        power: 'power',
        preheater: 'preheater',
    };

    const PreheaterThreshold = 10;

    const FanRotationDurationMax = 10; // seconds
    const FanRotationDurationMin = 2; // seconds

    function onDomContentLoaded() {

        /** @param {keyof Mapping} name */
        function getValue(name) {
            const el = document.getElementById(Mapping[name]);
            return el ? parseInt(el.textContent, 10) : 0;
        }

        function updateFanAnimation() {
            const power = getValue('power');
            const anim = document.getElementById('fan').querySelector('animateTransform');

            if (power < 1) {
                anim.endElement();
            } else {
                const currentDuration = anim.getSimpleDuration();
                const newDuration = FanRotationDurationMax -
                    (power / 100) * (FanRotationDurationMax - FanRotationDurationMin);

                try {
                    const currentTime = anim.getCurrentTime();
                    const t = currentTime / currentDuration;
                    const newTime = t * newDuration;

                    anim.setAttribute('dur', `${newDuration}s`);
                    anim.setCurrentTime(newTime);
                } catch (e) {
                    anim.beginElement();
                }
            }
        }

        function updatePreheater() {
            document.documentElement.classList.toggle(
                'preheater',
                getValue('preheater') - getValue('freshIn') > PreheaterThreshold
            );
        }

        const observer = new MutationObserver((mutations, observer) => {
            updatePreheater();
            updateFanAnimation();
        });

        observer.observe(document.documentElement, { characterData: true, childList: true, subtree: true })
    }

    if ('MutationObserver' in window) {
        document.addEventListener('DOMContentLoaded', onDomContentLoaded);
    }
})();