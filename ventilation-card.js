class TotoroVentilationCardElement extends HTMLElement {
    set hass(value) {
        if (!this.content) {
            this.innerHTML = `
                <ha-card header="Ventilation">
                    <div class="card-content">Hello darkness</div>
                </ha-card>
            `;
            this.content = this.querySelector(div);
        }
    }

    setConfig(config) {

    }

    getCardSize() { return 3; }
}

customElements.define('totoro-ventilation-card', TotoroVentilationCardElement);