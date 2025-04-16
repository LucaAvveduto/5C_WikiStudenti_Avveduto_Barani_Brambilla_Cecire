export const generateVersionsTable = (parentElement, pubsub) => {
    let id;

    const table = {
        build: (inputId) => {
            id = inputId;
        },
        render: (inputArticle) => {
            let article = inputArticle;

            let html = `<button class="button is-link" id="$IDBackButton">
                            <span class="icon">
                                <i class="fa-solid fa-arrow-left"></i>
                            </span>
                            <span>Indietro</span>
                        </button>
                        <h1>Gestisci versioni: "$NAME"</h1>
                        <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" id="$ID">
                            <tbody>
                                <tr>
                                    <th>ID versione</th><th>Visualizza</th><th>Azione</th>
                                </tr>`.replaceAll("$ID", id).replace("$NAME", article.name);
            html += article.versions.map(e => "<tr><td>" + e.id + '</td><td><button class="button is-link openButton" id="openButton' + e.id + '"><span class="icon"><i class="fa-solid fa-up-right-from-square"></i></span><span>Apri</span></button></td><td>' + (e.current ? '<strong class="has-text-success">Versione corrente</strong>' : '<button class="button is-warning useThisButton" id="useThisButton' + e.id +'"><span class="icon"><i class="fa-solid fa-rotate-left"></i></span><span>Usa questa versione</span></button>') + "</td></tr>").join("") + "</tbody></table>";
            parentElement.innerHTML = html;
            
            document.getElementById(id + "BackButton").onclick = () => {
                pubsub.publish(id + "-back-pressed");
            };
            document.querySelectorAll(".openButton").forEach(e => {
                e.onclick = () => {
                    pubsub.publish(id + "-open-pressed", parseInt(e.id.replace("openButton", "")));
                }
            });
            document.querySelectorAll(".useThisButton").forEach(e => {
                e.onclick = () => {
                    pubsub.publish(id + "-usethis-pressed", parseInt(e.id.replace("useThisButton", "")));
                }
            });
        }
    };

    return table;
};