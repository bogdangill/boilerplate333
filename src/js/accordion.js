export function toggleAcc(acc, isOpened) {
    if (isOpened) {
        acc.classList.remove('accordion--visible');
        acc.classList.add('accordion--hidden');
        acc.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
    } else {
        acc.classList.remove('accordion--hidden');
        acc.classList.add('accordion--visible');
        acc.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'true');
    }
}