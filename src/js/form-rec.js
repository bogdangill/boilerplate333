import Swiper from "swiper";

const recruitersBanner = document.querySelectorAll('.banner-recruiters');
const formRec = document.getElementById('formRec');
const formTitles = formRec.querySelectorAll('[data-rec-form-title]');
let formTitlesArr = [];
const formTitleSlot = formRec.querySelector('#recruitersFormTitleM');
const formStepButtons = formRec.querySelectorAll('[data-rec-form-step]');
const formPrevButton = formRec.querySelector('[data-rec-slide-prev]');
const btnSubmit = formRec.querySelector('button[type="submit"]');

const inputRegion = formRec.querySelector("select[name='regionId']"),
    inputSpecialization = formRec.querySelector("select[name='specialization']"),
    inputTariff = formRec.querySelectorAll("input[name='tariff']"),
    inputSalary = formRec.querySelector("input[name='salary']"),
    inputPhone = formRec.querySelector("input[name='phoneNumber']"),
    inputName = formRec.querySelector("input[name='name']"),
    inputComment = formRec.querySelector("textarea"),
    inputCheckbox = formRec.querySelector("input[type='checkbox']");

let isSalaryValid = false;
let isPhoneValid = false;
let isNameValid = false;
let selectedTariff = 0;

formTitles.forEach(title => formTitlesArr.push(title.dataset.recFormTitle));

if (window.matchMedia("(max-width: 767px)").matches) {
    let swiperForm = new Swiper("#formRec", {
        slidesPerView: 1,
        allowTouchMove: false,
        pagination: {
            el: '.r-f-progressbar',
            bulletClass: 'r-f-progressbar__bar',
            bulletActiveClass: 'r-f-progressbar__bar--active',
            renderBullet: function(index, className) {
                return `
                    <div class="${className}"></div>
                `;
            }
        },
        on: {
            init: function() {
                formTitleSlot.textContent = formTitlesArr[0];
                formStepButtons.forEach((btn, i) => {
                    if(i !== 1) btn.disabled = true
                });
            },
            slideChange: function() {
                formTitleSlot.textContent = formTitlesArr[this.activeIndex];
            }
        }
    });

    formStepButtons.forEach((btn) => btn.addEventListener('click', () => swiperForm.slideNext()));
    formPrevButton.addEventListener('click', () => swiperForm.slidePrev());

} else {
    const swiperWrapper = formRec.querySelector('.swiper-wrapper');
    const swiperSlides = formRec.querySelectorAll('.swiper-slide');

    swiperWrapper.classList.remove('swiper-wrapper');
    swiperSlides.forEach(slide => slide.classList.remove('swiper-slide'));
    btnSubmit.disabled = true;
}

inputSalary.addEventListener('input', function() {
    let val = inputSalary.value;
    isSalaryValid = val > 0 && val < 1000000;
    toggleErrorBorder(inputSalary, isSalaryValid);
});

inputPhone.addEventListener('keydown', function(e) {
    if (!(e.key == 'ArrowLeft' || e.key == 'ArrowRight' || e.key == 'Backspace' || e.key == 'Tab')) { e.preventDefault() }
    let phoneMask = "+7 (000) 000-00-00";
    let symbolValid = /[0-9\+\ \-\(\)]/;
    let regexpMobileRU = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10}$/;

    if (symbolValid.test(e.key)) {
        let currentString = this.value;
        let currentLength = currentString.length;

        if (/[0-9]/.test(e.key)) {
            if (phoneMask[currentLength] == '0') {
                this.value = currentString + e.key;
            } else {
                for (let i = currentLength; i < phoneMask.length; i++) {
                    if (phoneMask[i] == '0') {
                        this.value = currentString + e.key;
                        break;
                    }

                    currentString += phoneMask[i];
                }
            }
        }
    }

    isPhoneValid = this.value.match(regexpMobileRU);
    toggleErrorBorder(inputPhone, isPhoneValid);
});

inputName.addEventListener('input', function() {
    let val = inputName.value;
    let inputNameMask = /^[?!,.а-яА-ЯёЁa-zA-Z\s]+$/;
    isNameValid = val.match(inputNameMask) && val.length > 0;
    toggleErrorBorder(inputName, isNameValid);
});

inputTariff.forEach(tariff => {
    if (tariff.checked) selectedTariff = tariff.value; 

    tariff.addEventListener('change', function() {
        if (tariff.checked) selectedTariff = tariff.value;
    })
})

//слушатель для проверки доступности кнопок. слушает всю форму
formRec.addEventListener('input', function() {
    formStepButtons[0].disabled = !(isSalaryValid);
    formStepButtons[2].disabled = !(isSalaryValid && isPhoneValid && isNameValid && inputCheckbox.checked);
}); 

formRec.addEventListener('submit', function(e) {
    e.preventDefault();
    recruitersBanner.forEach(banner => banner.classList.add('banner-recruiters--submitted'));

    const body = {
        identifier: inputPhone.value,
        specialization: inputSpecialization.value,
        regionId: inputRegion.value,
        address: '',
        salary: inputSalary.value,
        tariff: selectedTariff,
        name: inputName.value,
        phoneNumber: inputPhone.value,
        comment: inputComment.value
    }
    sendRequest(`${location.protocol}//api3.${location.host}/recruiters/requests`, 'post', body, 'application/json');
})

function toggleErrorBorder(currentInput, validationFlag) {
    if (validationFlag) {
        currentInput.parentElement.classList.remove('r-form-item__input--error');
    } else {
        currentInput.parentElement.classList.add('r-form-item__input--error');
    }
}