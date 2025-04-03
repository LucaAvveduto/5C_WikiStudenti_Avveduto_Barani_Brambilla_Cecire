import { generatePubSub } from "./scripts/pubsub/pubsub.js";
import { generateNavigator } from "./scripts/GUI/navigator/navigator.js";
import { generateTabs } from "./scripts/GUI/tabs/tabs.js";
import { generateSidebar } from "./scripts/GUI/sidebar/sidebar.js";
import { generateSearchbar } from "./scripts/GUI/searchbar/searchbar.js";

const pubsub = generatePubSub();

const pageContainer = document.getElementById("pageContainer");
generateNavigator(pageContainer);

const tabsContainer = document.getElementById("tabsContainer");
const sidebarContainer = document.getElementById("sidebarContainer");

const articleSidebar = generateSidebar(sidebarContainer, pubsub);
const tabs = generateTabs(tabsContainer, pubsub);

articleSidebar.build("articleSidebar", "Articoli", {"Ciao": "#ciao"}, "articleSearchbarContainer");

const articleSearchbarContainer = document.getElementById("articleSearchbarContainer");
const articleSearchbar = generateSearchbar(articleSearchbarContainer, pubsub);

articleSearchbar.build("articleSearchbar", "Cerca articolo...");

pubsub.subscribe("articleSearchbar-onsearch", searchText => {
    articleSidebar.search(searchText);
});
pubsub.subscribe("articleSearchbar-oncancel", () => {
    articleSidebar.reset();
});

tabs.build("userTab", {"Scrittore": '<i class="fa-solid fa-user-pen"></i>', "Moderatore": '<i class="fa-solid fa-user-shield"></i>', "Amministratore": '<i class="fa-solid fa-user-tie"></i>'});
tabs.render();

pubsub.subscribe("userTab-tab-changed", tabId => {
    if (tabId === "Scrittore") {
        articleSearchbar.render();
        articleSidebar.render();
    }
});
