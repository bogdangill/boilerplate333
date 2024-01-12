import { Ripple } from "./ripple.js";
import Swiper from "swiper";
import { Pagination, A11y } from "swiper/modules";

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

let workerTabs = document.querySelectorAll('[data-tab]');
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