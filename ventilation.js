if ('MutationObserver' in window) {
    document.addEventListener('DOMContentLoaded', () => {

        const Mapping = {
            freshIn: 'fresh-in',
            preheater: 'preheater',
        };
        const PreheaterThreshold = 10;

        /** @param {keyof Mapping} name */
        function getValue(name) {
            const el = document.getElementById(Mapping[name]);
            return el ? parseInt(el.textContent, 10) : 0;
        }

        const observer = new MutationObserver((mutations, observer) => {
            document.documentElement.classList.toggle(
                'preheater',
                getValue('preheater') - getValue('freshIn') > PreheaterThreshold
            );
        });

        observer.observe(document.documentElement, { characterData: true, childList: true, subtree: true })
    });
}