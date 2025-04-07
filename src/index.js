import { generatePubSub } from "./scripts/pubsub/pubsub.js";
import { generateSearchbar } from "./scripts/GUI/searchbar/searchbar.js";
import { generateSidebar } from "./scripts/GUI/sidebar/sidebar.js";
import { generateNavigator } from "./scripts/GUI/navigator/navigator.js";
import { navbar } from "./scripts/GUI/navbar/navbar.js";
import { createForm } from "./scripts/GUI/form/form.js";

const pubsub = generatePubSub();
window.pubsub = pubsub;

const articleContainer = document.getElementById("articleContainer");
generateNavigator(articleContainer);

const articleSidebarContainer = document.getElementById("articleSidebarContainer");
const articleSidebar = generateSidebar(articleSidebarContainer, pubsub);

const navbarEl = document.getElementById("navbar-container");
const nav = navbar(navbarEl,pubsub);
nav.render();

const modalContainer = document.getElementById("modal-container");
const form = createForm(modalContainer,pubsub);

const loginComponents = [
    [
        {
            "id": "username",
            "type": "text"
        },
        {
            "id": "password",
            "type": "password"
        },
    ],
    `<button type="button" onclick="pubsub.publish('register')">
        <a class="js-modal-trigger">
            <span>Vuoi diventare uno dei nostri?</span>
        </a>
    </button>`
];

const registerComponents = [
    [
        {
            "id": "nome",
            "type": "text"
        },
        {
            "id": "cognome",
            "type": "text"
        },
        {
            "id": "classe",
            "type": "text"
        },
        {
            "id": "anno_nascita",
            "type": "text"
        },
        {
            "id": "email",
            "type": "email"
        },
        {
            "id": "password",
            "type": "password"
        },
    ],
    `<button type="button" onclick="pubsub.publish('login')">
        <a class="js-modal-trigger">
            <span>Torna alla login</span>
        </a>
    </button>`,
    ["Editor","Moderator"]
];

form.build(loginComponents);
form.render();

pubsub.subscribe("register", () => {
    form.build(registerComponents);
    form.render();
});

pubsub.subscribe("login", () => {
    form.build(loginComponents);
    form.render();
});


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
    function openModal() {
        modalContainer.classList.add("is-active");
    }

    function closeModal() {
        modalContainer.classList.remove("is-active");
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
    document.querySelector("button#personal").onclick = () => openModal();
    
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll(".form-cancel-btn, .modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button, .modal-card-body .button") || []).forEach((close) => {
        close.addEventListener("click", () => {
            closeModal();
        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    });
});