class TotoroVentilationCardElement extends HTMLElement {
    set hass(value) {
        if (!this.content) {
            this.innerHTML = `
                <ha-card header="Ventilation">
                    <div class="card-content">Hello darkness</div>
                </ha-card>
            `;
            this.content = this.querySelector('div');
        }
        console.log({ value });
    }

    setConfig(config) {
        console.log({ config });
    }

    getCardSize() { return 3; }
}

customElements.define('totoro-ventilation-card', TotoroVentilationCardElement);