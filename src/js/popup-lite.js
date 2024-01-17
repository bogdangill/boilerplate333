export class PopupLite {
    constructor(
        triggerSelector = '[data-popup-lite-call]',
    ) {
        this.trigger = triggerSelector;
        this.documentBody = document.querySelector('body');
        this.init();
    }

    init() {
        const popupName = this.trigger.dataset.popupLiteCall;
        const popupBody = document.querySelector(`[data-popup-lite-name="${popupName}"]`);

        this.trigger.addEventListener('click', () => this._toggle('open', popupBody));

        const btnClose = popupBody.querySelector('.popup__close');
        const btnCloseCustom = popupBody.querySelector('[data-popup-lite-close]');

        if (btnCloseCustom) {
            btnCloseCustom.addEventListener('click', () => this._toggle('close', popupBody));
        };

        btnClose.addEventListener('click', () => this._toggle('close', popupBody));
    }

    _toggle(action, popup) {
        let values = {};

        values.bodyOverflow = action === 'open' ? 'hidden' : 'auto';
        values.classToRemove = action === 'open' ? 'popup--hidden' : 'popup--visible';
        values.classToAdd = action === 'open' ? 'popup--visible' : 'popup--hidden';

        this.documentBody.style.overflowY = values.bodyOverflow;
        popup.classList.remove(values.classToRemove);
        popup.classList.add(values.classToAdd);
    }
}