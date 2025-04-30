import { generatePubSub } from "./scripts/pubsub/pubsub.js";
import { generateNavigator } from "./scripts/GUI/navigator/navigator.js";
import { generateTabs } from "./scripts/GUI/tabs/tabs.js";
import { generateSidebar } from "./scripts/GUI/sidebar/sidebar.js";
import { generateSearchbar } from "./scripts/GUI/searchbar/searchbar.js";
import { generateArticlesManager } from "./scripts/GUI/articlesManager/articlesManager.js";
import { generateUsersManager } from "./scripts/GUI/usersManager/usersManager.js";
import { generateVersionsTable } from "./scripts/GUI/versionsTable/versionsTable.js";
import { generateDraftViewer } from "./scripts/GUI/draftViewer/draftViewer.js";
import { createForm } from "./scripts/GUI/form/form.js";

const pubsub = generatePubSub();

const pageContainer = document.getElementById("pageContainer");
generateNavigator(pageContainer);
const prova = {name: "articolo", versions:[{id: 1, current: true}, {id: 2}, {id: 3}]};

const versionsTableContainer = document.getElementById("manage-versions");
const versionsTable = generateVersionsTable(versionsTableContainer, pubsub);
versionsTable.build("versionsTable");
pubsub.subscribe("usersManager-save-clicked", user => {
    console.log(user);
});
pubsub.subscribe("versionsTable-back-clicked", () => {
    location.href = "#dashboard";
});
pubsub.subscribe("versionsTable-open-clicked", id => {
    console.log(id)
});
pubsub.subscribe("versionsTable-delete-clicked", name => {
    console.log(name)
});
pubsub.subscribe("versionsTable-usethis-clicked", id => {
    prova.versions.map(e => {
        if (e.id === id) {
            e.current = true;
        }
        else {
            e.current = false;
        }
    })
    versionsTable.render(prova);
    console.log(prova)
});

const draftViewerContainer = document.getElementById("manage-draft");
const draftViewer = generateDraftViewer(draftViewerContainer, pubsub);
draftViewer.build("draftViewer");
pubsub.subscribe("draftViewer-discard-clicked", () => {
    alert("scarta")
});
pubsub.subscribe("draftViewer-approve-clicked", () => {
    alert("approvo")
});
pubsub.subscribe("draftViewer-back-clicked", () => {
    location.href = "#dashboard";
});

const tabsContainer = document.getElementById("tabsContainer");
const articleSidebarContainer = document.getElementById("articleSidebarContainer");
const draftSidebarContainer = document.getElementById("draftSidebarContainer");
const usersSidebarContainer = document.getElementById("usersSidebarContainer");

const tabs = generateTabs(tabsContainer, pubsub);
const articleSidebar = generateSidebar(articleSidebarContainer, pubsub);
const draftSidebar = generateSidebar(draftSidebarContainer, pubsub);
const usersSidebar = generateSidebar(usersSidebarContainer, pubsub);

articleSidebar.build("articleSidebar", "Articoli", {"Ciao": ""}, "articleSearchbarContainer", {icon: '<i class="fa-solid fa-plus"></i>', text: "Crea"});
articleSidebar.render();
pubsub.subscribe("articleSidebar-item-clicked", () => {
    versionsTable.render(prova)
    location.href = "#manage-versions";
});

draftSidebar.build("draftSidebar", "Bozze", {"Ciao": ""}, "draftSearchbarContainer");
draftSidebar.render();
draftSidebar.changeVisibility(false);
pubsub.subscribe("draftSidebar-item-clicked", () => {
    draftViewer.render({title: "bozza1", author:"Pinangelo Mostarda", content:"<h2>cacca</h2><p>sium</p>"});
    location.href = "#manage-draft";
});

usersSidebar.build("usersSidebar", "Utenti", {"Utente1": ""}, "usersSearchbarContainer");
usersSidebar.render();
usersSidebar.changeVisibility(false);
pubsub.subscribe("usersSidebar-item-clicked", () => {
    location.href = "#manage-users";
});

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
    location.href = "#manage-articles";
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
        articleSidebar.changeButtonState(true);
    }
    else if (tabId === "Moderatore") {
        articleSidebar.changeVisibility(true);
        articleSearchbar.changeVisibility(true);
        draftSidebar.changeVisibility(true);
        draftSearchbar.changeVisibility(true);
        usersSidebar.changeVisibility(false);
        usersSearchbar.changeVisibility(false);
        articleSidebar.changeButtonState(false);
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

const articlesMangerContainer = document.getElementById("manage-articles");
const articlesManager = generateArticlesManager(articlesMangerContainer, pubsub);
articlesManager.build("articlesManager");
articlesManager.render();
pubsub.subscribe("articlesManager-save-clicked", article => {
    console.log(article);
});
pubsub.subscribe("articlesManager-back-clicked", () => {
    location.href = "#dashboard";
});

const usersMangerContainer = document.getElementById("manage-users");
const usersManager = generateUsersManager(usersMangerContainer, pubsub);
usersManager.build("usersManager");
usersManager.render({name: "ciao", surname: "ciao", class: "qintac", birthYear: 2006, email: "aaa@itis.eu", password: "aaa", isWriter:"true", isModerator: false});
pubsub.subscribe("usersManager-save-clicked", user => {
    console.log(user);
});
pubsub.subscribe("usersManager-back-clicked", () => {
    location.href = "#dashboard";
});

const personalInfoContainer = document.getElementById("personalInfoContainer");
const personalInfo = createForm(personalInfoContainer, pubsub);
personalInfo.build([[
    {
        "id": "email",
        "type": "mail"
    },
    {
        "id": "password",
        "type": "password"
    },
]]);
personalInfo.render();

// gestione modali di Bulma
document.addEventListener("DOMContentLoaded", () => {
    // Functions to open and close a modal
    function openModal() {
        personalInfoContainer.classList.add("is-active");
    }

    function closeModal() {
        personalInfoContainer.classList.remove("is-active");
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