import { Ripple } from "./ripple.js";
import Swiper from "swiper";
import { Pagination, A11y } from "swiper/modules";
import { toggleAcc } from "./accordion.js";
import { PopupLite } from "./popup-lite.js";

const rippleTargetsPrimary = document.querySelectorAll(".pmgt-button--primary[data-ripple='btn']");
const rippleTargetsOutline = document.querySelectorAll(".pmgt-button--outline[data-ripple='btn']");

for (let target of rippleTargetsPrimary) {
    new Ripple(target, {
        circleTag: 'span',
        circleColor: 'default',
        enableForDesktop: true
    });
};
for (let target of rippleTargetsOutline) {
    new Ripple(target, {
        circleTag: 'span',
        circleColor: 'primary',
        enableForDesktop: true
    });
};

// const recruiterPopupForm = new PopupLite("data-popup-lite='recruiters_form'", {documentBodySelector: '.index__body'});
const popupLiteFormTriggers = document.querySelectorAll("[data-popup-lite-call='recruiters_form']");

for (let trigger of popupLiteFormTriggers) {
    new PopupLite(trigger, {
        documentBodySelector: '.index__body'
    });
}

const workerTabs = document.querySelectorAll('[data-tab]');
let workerTabsArr = [];

workerTabs.forEach(tab => workerTabsArr.push(tab.dataset.tab));

const workerTabSlider = new Swiper('.workers-carousel', {
    modules: [Pagination, A11y],
    slidesPerView: 1,
    allowTouchMove: false,
    pagination: {
        el: '.workers-carousel__pagination',
        bulletClass: 'workers-carousel__tab',
        bulletActiveClass: 'workers-carousel__tab--active',
        clickable: true,
        renderBullet: function(index, className) {
            return `
                <li class="${className}">
                    ${workerTabsArr[index]}
                </li>
            `;
        }
    }
});

const nannySlider = new Swiper('.workers-slider--nanny', {
    modules: [A11y],
    slidesPerView: 'auto',
    initialSlide: 0
});
const housekeeperSlider = new Swiper('.workers-slider--housekeeper', {
    modules: [A11y],
    slidesPerView: 'auto',
    initialSlide: 0
});

const reviewsSlider = new Swiper('.reviews__slider', {
    modules: [A11y],
    slidesPerView: 'auto',
    initialSlide: 0
});

workerTabSlider.init();
nannySlider.init();
housekeeperSlider.init();
reviewsSlider.init();

const accordions = document.querySelectorAll('.accordion');
//добавяю дефолтный модификатор таким способом, чтобы контент был визуально доступен даже если js выключен в браузере
accordions.forEach(acc => acc.classList.add('accordion--hidden'));

if (accordions.length > 0) {
    accordions.forEach(accordion => {
        accordion.addEventListener("click", () => {
            if (accordion.classList.contains('accordion--visible')) {
                toggleAcc(accordion, true);
                return
            }

            accordions.forEach(acc => toggleAcc(acc, true));

            if (accordion.classList.contains('accordion--hidden')) {
                toggleAcc(accordion)
            }
        })
    })
}