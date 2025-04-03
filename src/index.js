import { generatePubSub } from "./scripts/pubsub/pubsub.js";
import { generateSearchbar } from "./scripts/GUI/searchbar/searchbar.js";
import { generateSidebar } from "./scripts/GUI/sidebar/sidebar.js";
import { generateNavigator } from "./scripts/GUI/navigator/navigator.js";
import { navbar } from "./scripts/GUI/navbar/navbar.js";

const pubsub = generatePubSub();

const articleContainer = document.getElementById("articleContainer");
generateNavigator(articleContainer);

const articleSidebarContainer = document.getElementById("articleSidebarContainer");
const articleSidebar = generateSidebar(articleSidebarContainer, pubsub);

const navbarEl = document.getElementById("navbar-container");
const nav = navbar(navbarEl);
nav.render();

articleSidebar.build("articleSidebar", "Articoli", {"ciao": "#ciao", "bene": "#b"}, "articleSearchbarContainer");
articleSidebar.render();

const articleSearchbarContainer = document.getElementById("articleSearchbarContainer");
const articleSearchbar = generateSearchbar(articleSearchbarContainer, pubsub);

articleSearchbar.build("articleSearchbar", "Cerca articolo...");
articleSearchbar.render();

pubsub.subscribe("articleSearchbar-onsearch", searchText => {
    articleSidebar.search(searchText);
});
pubsub.subscribe("articleSearchbar-oncancel", () => {
    articleSidebar.reset();
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