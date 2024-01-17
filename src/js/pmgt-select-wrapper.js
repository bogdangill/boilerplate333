class PmgtSelectWrapper extends HTMLElement {

    _dataProviderName;
    /**
     * {value: string, id: string|number, sourceValue: Object}
     */
    _data;

    constructor() {
        super();
    }
    connectedCallback() {
        this._dataProviderName = this.getAttribute("data-provider");
        document.dispatchEvent(new CustomEvent(`get-data-${this._dataProviderName}`, { detail: { element: this } }));
        this._initProviderListener();

    }
    _initProviderListener() {
        this.addEventListener(this._dataProviderName, this._onDataRecievedCB.bind(this));
    }
    _onDataRecievedCB(event) {
        const wrappedData = window.pmgtSelectDecorators[this.getAttribute('data-decorator')](event.detail.data);
        console.log({ wrappedData });
        this._renderOptions(wrappedData);
    }
    _renderOptions(data) {
        const optionsHtml = data.reduce((options, dataItem) => {
            return `${options}<option value="${dataItem.id}">${dataItem.name}</option>`
        }, '');
        this.querySelector('select').innerHTML = optionsHtml;
    }

}
customElements.define('pmgt-select-wrapper', PmgtSelectWrapper);