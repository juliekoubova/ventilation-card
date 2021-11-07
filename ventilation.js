(function () {
    const Mapping = {
        freshIn: 'fresh-in',
        power: 'power',
        preheater: 'preheater',
    };

    const PreheaterThreshold = 10;

    const FanRotationRateMin = .2;
    const FanRotationRateMax = 1;

    function onDomContentLoaded() {

        /** @type {Animation?} */
        let fanAnimation;

        /** @param {keyof Mapping} name */
        function getValue(name) {
            const el = document.getElementById(Mapping[name]);
            return el ? parseInt(el.textContent, 10) : 0;
        }

        function updateFanAnimation() {
            const power = getValue('power');
            const fan = document.getElementById('fan').firstElementChild;

            const playbackRate = FanRotationRateMin + (power / 100) * (FanRotationRateMax - FanRotationRateMin);

            if (power > 0) {
                if (fanAnimation) {
                    fanAnimation.updatePlaybackRate(playbackRate);
                } else {
                    fanAnimation = fan.animate(
                        [{ transform: 'rotate(360deg)' }],
                        { duration: 1_000, iterations: Infinity, playbackRate }
                    );
                }
            } else {
                fanAnimation?.updatePlaybackRate(0);
            }
        }

        function updatePreheater() {
            document.documentElement.classList.toggle(
                'preheater',
                getValue('preheater') - getValue('freshIn') > PreheaterThreshold
            );
        }

        const observer = new MutationObserver(() => {
            updatePreheater();
            updateFanAnimation();
        });

        observer.observe(document.documentElement, { characterData: true, childList: true, subtree: true })
    }

    if ('MutationObserver' in window) {
        document.addEventListener('DOMContentLoaded', onDomContentLoaded);
    }
})();