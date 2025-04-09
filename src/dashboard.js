import { generatePubSub } from "./scripts/pubsub/pubsub.js";
import { generateNavigator } from "./scripts/GUI/navigator/navigator.js";
import { generateTabs } from "./scripts/GUI/tabs/tabs.js";
import { generateSidebar } from "./scripts/GUI/sidebar/sidebar.js";
import { generateSearchbar } from "./scripts/GUI/searchbar/searchbar.js";
import { generateFileLoader } from "./scripts/GUI/fileLoader/fileLoader.js";

const pubsub = generatePubSub();

const pageContainer = document.getElementById("pageContainer");
generateNavigator(pageContainer);

const tabsContainer = document.getElementById("tabsContainer");
const articleSidebarContainer = document.getElementById("articleSidebarContainer");
const draftSidebarContainer = document.getElementById("draftSidebarContainer");
const usersSidebarContainer = document.getElementById("usersSidebarContainer");

const tabs = generateTabs(tabsContainer, pubsub);
const articleSidebar = generateSidebar(articleSidebarContainer, pubsub);
const draftSidebar = generateSidebar(draftSidebarContainer, pubsub);
const usersSidebar = generateSidebar(usersSidebarContainer, pubsub);

articleSidebar.build("articleSidebar", "Articoli", {"Ciao": "#ciao"}, "articleSearchbarContainer", {icon: '<i class="fa-solid fa-plus"></i>', text: "Crea"});
articleSidebar.render();

draftSidebar.build("draftSidebar", "Bozze", {"Ciao": "#ciao"}, "draftSearchbarContainer");
draftSidebar.render();
draftSidebar.changeVisibility(false);

usersSidebar.build("usersSidebar", "Utenti", {"Utente1": "#1"}, "usersSearchbarContainer");
usersSidebar.render();
usersSidebar.changeVisibility(false);

const articleSearchbarContainer = document.getElementById("articleSearchbarContainer");
const articleSearchbar = generateSearchbar(articleSearchbarContainer, pubsub);
const draftSearchbarContainer = document.getElementById("draftSearchbarContainer");
const draftSearchbar = generateSearchbar(draftSearchbarContainer, pubsub);
const usersSearchbarContainer = document.getElementById("usersSearchbarContainer");
const usersSearchbar = generateSearchbar(usersSearchbarContainer, pubsub);

articleSearchbar.build("articleSearchbar", "Cerca articolo...");
articleSearchbar.render();

pubsub.subscribe("articleSearchbar-onsearch", searchText => {
    articleSidebar.search(searchText);
});
pubsub.subscribe("articleSearchbar-oncancel", () => {
    articleSidebar.reset();
});
pubsub.subscribe("articleSidebarButton-clicked", () => {
    location.href = "#create";
});

draftSearchbar.build("draftSearchbar", "Cerca bozza...");
draftSearchbar.render();

pubsub.subscribe("draftSearchbar-onsearch", searchText => {
    draftSidebar.search(searchText);
});
pubsub.subscribe("draftSearchbar-oncancel", () => {
    draftSidebar.reset();
});

usersSearchbar.build("usersSearchbar", "Cerca utente...");
usersSearchbar.render();

pubsub.subscribe("usersSearchbar-onsearch", searchText => {
    usersSidebar.search(searchText);
});
pubsub.subscribe("usersSearchbar-oncancel", () => {
    usersSidebar.reset();
});

tabs.build("userTab", {"Scrittore": '<i class="fa-solid fa-user-pen"></i>', "Moderatore": '<i class="fa-solid fa-user-shield"></i>', "Amministratore": '<i class="fa-solid fa-user-tie"></i>'});
tabs.render();

pubsub.subscribe("userTab-tab-changed", tabId => {
    if (tabId === "Scrittore") {
        articleSidebar.changeVisibility(true);
        articleSearchbar.changeVisibility(true);
        draftSidebar.changeVisibility(false);
        draftSearchbar.changeVisibility(false);
        usersSidebar.changeVisibility(false);
        usersSearchbar.changeVisibility(false);
    }
    else if (tabId === "Moderatore") {
        articleSidebar.changeVisibility(true);
        articleSearchbar.changeVisibility(true);
        draftSidebar.changeVisibility(true);
        draftSearchbar.changeVisibility(true);
        usersSidebar.changeVisibility(false);
        usersSearchbar.changeVisibility(false);
    }
    else {
        articleSidebar.changeVisibility(false);
        articleSearchbar.changeVisibility(false);
        draftSidebar.changeVisibility(false);
        draftSearchbar.changeVisibility(false);
        usersSidebar.changeVisibility(true);
        usersSearchbar.changeVisibility(true);
    }
});

const mdFileContainer = document.getElementById("mdFileContainer");
const file = generateFileLoader(mdFileContainer);
file.build("mdFile", {icon: '<i class="fa-solid fa-file-arrow-up"></i>', text: "Scegli il file MarkDown (.md)", multiple: true});
file.render();

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