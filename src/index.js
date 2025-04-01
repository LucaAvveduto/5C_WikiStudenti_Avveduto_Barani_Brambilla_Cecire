import { generatePubSub } from "./scripts/pubsub/pubsub.js";
import { generateSearchbar } from "./scripts/GUI/searchbar/searchbar.js";

const pubsub = generatePubSub();

const articleSearchbarContainer = document.getElementById("articleSearchbarContainer");

const articleSearchbar = generateSearchbar(articleSearchbarContainer, pubsub);

articleSearchbar.build("articleSearchbar", "Cerca articolo...");
articleSearchbar.render();

pubsub.subscribe("articleSearchbar-onsearch", searchText => {
    console.log(searchText)
});
pubsub.subscribe("articleSearchbar-oncancel", () => {
    console.log("cancellato")
});

// gestione modali di Bulma
document.addEventListener("DOMContentLoaded", () => {
    // Functions to open and close a modal
    function openModal(el) {
        el.classList.add("is-active");
    }

    function closeModal(el) {
        el.classList.remove("is-active");
    }

    function closeAllModals() {
        (document.querySelectorAll(".modal") || []).forEach((modal) => {
            closeModal(modal);
        });
    }

    const navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Add a click event on each of them
    navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
            // Get the target from the "data-target" attribute
            const target = document.getElementById(el.dataset.target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            target.classList.toggle('is-active');
        });
    });

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll(".js-modal-trigger") || []).forEach((trigger) => {
        const modal = trigger.dataset.target;
        const target = document.getElementById(modal);

        trigger.addEventListener("click", () => {
            openModal(target);
        });
    });

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll(".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button, .modal-card-body .button") || []).forEach((close) => {
        const target = close.closest(".modal");

        close.addEventListener("click", () => {
            closeModal(target);
        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeAllModals();
        }
    });
});