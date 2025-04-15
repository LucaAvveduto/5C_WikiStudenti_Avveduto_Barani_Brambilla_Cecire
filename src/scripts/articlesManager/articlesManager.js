import { generateFileLoader } from "../GUI/fileLoader/fileLoader.js";

export const generateArticlesManager = (parentElement, pubsub) => {
    let id, mdFileLoader, mainImageLoader, imagesLoader;

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
                            <h1 class="title">Aggiungi articolo</h1>
                            <p>Carica file in formato MarkDown (.md) o scrivi i contenuti.</p>
                            <div class="field" id="mdFileContainer"></div>
                            <h2>Testo</h2>
                            <div class="field">
                                <p class="control has-icons-left">
                                    <input class="input" type="text" placeholder="Titolo" id="title">
                                    <span class="icon is-left">
                                        <i class="fa-solid fa-heading"></i>
                                    </span>
                                </p>
                            </div>
                            <div class="field">
                                <textarea class="textarea" placeholder="Abstract" rows="2" id="abstract"></textarea>
                            </div>
                            <div class="field">
                                <textarea class="textarea" placeholder="Contenuto" rows="20" id="content"></textarea>
                            </div>
                            <div class="field">
                                <textarea class="textarea" placeholder="Links" rows="3" id="links"></textarea>
                            </div>
                            <h2>Immagini</h2>
                            <div class="field" id="mainImageLoaderContainer"></div>
                            <div class="field">
                                <p class="control has-icons-left">
                                    <input class="input" type="text" placeholder="Link immagine principale" id="mainImageLink">
                                    <span class="icon is-left">
                                        <i class="fa-solid fa-image"></i>
                                    </span>
                                </p>
                            </div>
                            <div class="field" id="imagesLoaderContainer"></div>
                            <div class="field">
                                <textarea class="textarea" placeholder="Link per altre immagini" rows="3" id="imagesLinks"></textarea>
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
                                <span>Elimina articolo</span>
                            </button>
                        </div>`.replaceAll("$ID", id);
            parentElement.innerHTML = html;
            
            const mdFileContainer = document.getElementById("mdFileContainer");
            const mainImageLoaderContainer = document.getElementById("mainImageLoaderContainer");
            const imagesLoaderContainer = document.getElementById("imagesLoaderContainer");

            mdFileLoader = generateFileLoader(mdFileContainer, pubsub);
            mdFileLoader.build("mdFileLoader", {icon: '<i class="fa-solid fa-file-arrow-up"></i>', text: "Scegli il file MarkDown (.md)", multiple: false});
            mdFileLoader.render();

            mainImageLoader = generateFileLoader(mainImageLoaderContainer, pubsub);
            mainImageLoader.build("mainImageLoader", {icon: '<i class="fa-solid fa-image"></i>', text: "Scegli l'immagine principale", multiple: false});
            mainImageLoader.render();

            imagesLoader = generateFileLoader(imagesLoaderContainer, pubsub);
            imagesLoader.build("imageLoader", {icon: '<i class="fa-solid fa-images"></i>', text: "Scegli le altre immagini", multiple: true});
            imagesLoader.render();
            
            document.getElementById(id + "SaveButton").onclick = () => {
                pubsub.publish(id + "-save-pressed", manager.getContent());
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