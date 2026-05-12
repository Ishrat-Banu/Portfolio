'use strict';

// --- Sidebar Toggle ---
// Handles opening/closing the sidebar via data attributes
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }


// --- Testimonials Modal ---
// Opens a modal populated from a clicked testimonial item
const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const testimonialsModalFunc = function () {
    if (!modalContainer || !overlay) return;
    modalContainer.classList.toggle('active');
    overlay.classList.toggle('active');
}

if (testimonialsItem.length > 0 && modalContainer && modalImg && modalTitle && modalText && overlay) {
    for (let i = 0; i < testimonialsItem.length; i++) {
        testimonialsItem[i].addEventListener('click', function () {
            const avatar = this.querySelector('[data-testimonials-avatar]');
            const title = this.querySelector('[data-testimonials-title]');
            const text = this.querySelector('[data-testimonials-text]');
            if (avatar) {
                modalImg.src = avatar.src || '';
                modalImg.alt = avatar.alt || '';
            }
            if (title) modalTitle.innerHTML = title.innerHTML;
            if (text) modalText.innerHTML = text.innerHTML;

            testimonialsModalFunc();
        });
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', testimonialsModalFunc);
    overlay.addEventListener('click', testimonialsModalFunc);
}

// --- Filter Select & Filtering ---
// Custom select that filters items by category (data attributes)
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

if (select) {
    select.addEventListener('click', function () { elementToggleFunc(this); });

    for (let i = 0; i < selectItems.length; i++) {
        selectItems[i].addEventListener('click', function () {
            let selectedValue = this.innerText.toLowerCase();
            if (selectValue) selectValue.innerText = this.innerText;
            elementToggleFunc(select);
            filterFunc(selectedValue);
        });
    }
}

const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = function (selectedValue) {
    for (let i = 0; i < filterItems.length; i++) {
        if (selectedValue == "all") {
            filterItems[i].classList.add('active');
        } else if (selectedValue == filterItems[i].dataset.category) {
            filterItems[i].classList.add('active');
        } else {
            filterItems[i].classList.remove('active');
        }
    }
}

// --- Filter Buttons (wide screens) ---
// Buttons that mirror the select for larger viewports
if (filterBtn.length > 0) {
    let lastClickedBtn = filterBtn[0];
    for (let i = 0; i < filterBtn.length; i++) {
        filterBtn[i].addEventListener('click', function () {
            let selectedValue = this.innerText.toLowerCase();
            if (selectValue) selectValue.innerText = this.innerText;
            filterFunc(selectedValue);

            if (lastClickedBtn) lastClickedBtn.classList.remove('active');
            this.classList.add('active');
            lastClickedBtn = this;
        });
    }
}

// --- Contact Form Validation ---
// Enable submit button only when the form is valid
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

if (form && formInputs.length > 0 && formBtn) {
    for (let i = 0; i < formInputs.length; i++) {
        formInputs[i].addEventListener('input', function () {
            if (form.checkValidity()) {
                formBtn.removeAttribute('disabled');
            } else {
                formBtn.setAttribute('disabled', '');
            }
        });
    }
}

// --- Single-Page Navigation ---
// Switches visible page based on clicked navigation link
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener('click', function () {
        const target = this.innerHTML.toLowerCase();
        // Deactivate all pages and nav links
        for (let p = 0; p < pages.length; p++) pages[p].classList.remove('active');
        for (let n = 0; n < navigationLinks.length; n++) navigationLinks[n].classList.remove('active');

        // Activate matching page and corresponding nav links
        for (let j = 0; j < pages.length; j++) {
            if (pages[j].dataset.page === target) {
                pages[j].classList.add('active');
                for (let k = 0; k < navigationLinks.length; k++) {
                    if (navigationLinks[k].innerHTML.toLowerCase() === target) navigationLinks[k].classList.add('active');
                }
                window.scrollTo(0, 0);
                break;
            }
        }
    });
}



