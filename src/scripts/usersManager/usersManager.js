export const generateUsersManager = (parentElement, pubsub) => {
    let id;

    const manager = {
        build: (inputId) => {
            id = inputId;
        },
        render: () => {
            const html = `<div class="content" id="$ID">
                            <button class="button is-link" id="$IDBackButton">
                                <span class="icon">
                                    <i class="fa-solid fa-arrow-left"></i>
                                </span>
                                <span>Indietro</span>
                            </button>
                            <h1 class="title">Gestisci </h1>
                            <p>Carica file in formato MarkDown (.md) o scrivi i contenuti.</p>
                            <div class="field">
                                <p class="control has-icons-left">
                                    <input class="input" type="text" placeholder="Nome" id="name">
                                    <span class="icon is-left">
                                        <i class="fa-solid fa-user"></i>
                                    </span>
                                </p>
                            </div>
                            <div class="field">
                                <p class="control has-icons-left">
                                    <input class="input" type="text" placeholder="Cognome" id="surname">
                                    <span class="icon is-left">
                                        <i class="fa-solid fa-user"></i>
                                    </span>
                                </p>
                            </div>
                            <div class="field">
                                <p class="control has-icons-left">
                                    <input class="input" type="text" placeholder="Classe" id="class">
                                    <span class="icon is-left">
                                        <i class="fa-solid fa-chalkboard"></i>
                                    </span>
                                </p>
                            </div>
                            <div class="field">
                                <p class="control has-icons-left">
                                    <input class="input" type="number" placeholder="Anno di nascita">
                                    <span class="icon is-small is-left">
                                        <i class="fa-solid fa-calendar"></i>
                                    </span>
                                </p>
                            </div>
                            <div class="field">
                                <p class="control has-icons-left">
                                    <input class="input" type="email" placeholder="Email" disabled>
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-envelope"></i>
                                    </span>
                                </p>
                            </div>
                            <div class="field">
                                <p class="control has-icons-left">
                                    <input class="input" type="password" placeholder="Password">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-lock"></i>
                                    </span>
                                </p>
                            </div>
                            <div class="field">
                                <p>Desidero essere:</p>
                                <div class="checkboxes">
                                    <label class="checkbox has-icons-left">
                                        <input type="checkbox">
                                        <span class="icon is-small is-left">
                                            <i class="fa-solid fa-user-pen"></i>
                                        </span>
                                        <span>Scrittore</span>
                                    </label>
                                    <label class="checkbox has-icons-left">
                                        <input type="checkbox">
                                        <span class="icon is-small is-left">
                                            <i class="fa-solid fa-user-shield"></i>
                                        </span>
                                        <span>Moderatore</span>
                                    </label>
                                </div>
                            </div>
                            
                            <button class="button is-link" id="$IDSaveButton">
                                <span class="icon">
                                    <i class="fas fa-save"></i>
                                </span>
                                <span>Salva</span>
                            </button>
                            <button class="button is-danger" id="$IDDeleteButton">
                                <span class="icon">
                                    <i class="fa-solid fa-trash-can"></i>
                                </span>
                                <span>Elimina utente</span>
                            </button>
                        </div>`.replaceAll("$ID", id);
            parentElement.innerHTML = html;
            
            document.getElementById(id + "SaveButton").onclick = () => {
                pubsub.publish(id + "save-pressed", manager.getContent());
            };
            document.getElementById(id + "BackButton").onclick = () => {
                pubsub.publish(id + "-back-pressed");
            };
            document.getElementById(id + "DeleteButton").onclick = () => {
                pubsub.publish(id + "-delete-pressed");
            };
        },
        getContent: () => {
            return {
                title: document.getElementById("title").value,
                abstract: document.getElementById("abstract").value,
                content: document.getElementById("content").value,
                links: document.getElementById("links").value,
                mainImageLink: document.getElementById("mainImageLink").value,
                imagesLinks: document.getElementById("imagesLinks").value,
                mdFile: mdFileLoader.getContent(),
                mainImage: mainImageLoader.getContent(),
                images: imagesLoader.getContent()
            };
        },
        setContent: (article) => {
            document.getElementById("title").value = article.title;
            document.getElementById("abstract").value = article.abstract;
            document.getElementById("content").value = article.content;
            document.getElementById("links").value = article.links;
            document.getElementById("mainImageLink").value = article.mainImageLink;
            document.getElementById("imagesLinks").value = article.imagesLinks;
            mdFileLoader.clear();
            mainImageLoader.clear();
            imagesLoader.clear();
        }
    };
    
    return manager;
};