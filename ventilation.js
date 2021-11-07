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

        /** @type {SVGAnimateElement?} */
        const beginBypassAnimation = document.getElementById('beginBypass');

        /** @type {SVGAnimateElement?} */
        const stopBypassAnimation = document.getElementById('stopBypass');


        /** @param {keyof Mapping} name */
        function getValue(name) {
            const el = document.getElementById(Mapping[name]);
            return el ? parseInt(el.textContent, 10) : 0;
        }

        function isBypassed() {
            return document.documentElement.classList.contains('bypass');
        }

        let bypass = false;

        function updateBypass() {
            if (isBypassed() !== bypass) {
                bypass = isBypassed();
                if (bypass) {
                    beginBypassAnimation.beginElement();
                } else {
                    stopBypassAnimation.beginElement();
                }
            }
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

        function update() {
            document.documentElement.classList.toggle('stopped', getValue('power') < 1)
            updateBypass();
            updatePreheater();
            updateFanAnimation();
        }

        new MutationObserver(update).observe(document.documentElement, { attributeFilter: ['class'] });
        new MutationObserver(update).observe(document.documentElement, { characterData: true, childList: true, subtree: true });
    }

    if ('MutationObserver' in window) {
        document.addEventListener('DOMContentLoaded', onDomContentLoaded);
    }
})();