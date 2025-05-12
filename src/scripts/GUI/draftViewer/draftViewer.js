export const generateDraftViewer = (parentElement, pubsub) => {
    let id;

    const draftViewer = {
        build: (inputId) => {
            id = inputId;
        },
        render: (inputDraft) => {
            let html = `<button class="button is-link" id="$IDBackButton">
                            <span class="icon">
                                <i class="fa-solid fa-arrow-left"></i>
                            </span>
                            <span>Indietro</span>
                        </button>
                        <h1>Bozza: $TITLE di $AUTHOR</h1>
                        <button class="button is-danger" id="$IDDiscard">
                            <span class="icon">
                                <i class="fa-solid fa-thumbs-down"></i>
                            </span>
                            <span>Scarta</span>
                        </button>
                        <button class="button is-success" id="$IDApprove">
                            <span class="icon">
                                <i class="fa-solid fa-thumbs-up"></i>
                            </span>
                            <span>Approva</span>
                        </button>
                        <div id="$IDContent"></div>`.replaceAll("$ID", id).replace("$TITLE", inputDraft.title).replace("$AUTHOR", inputDraft.author);
            parentElement.innerHTML = html;

            document.getElementById(id + "Content").innerHTML = inputDraft.text;
            
            document.getElementById(id + "BackButton").onclick = () => {
                pubsub.publish(id + "-back-clicked");
            };
            document.getElementById(id + "Discard").onclick = () => {
                pubsub.publish(id + "-discard-clicked");
            };
            document.getElementById(id + "Approve").onclick = () => {
                pubsub.publish(id + "-approve-clicked");
            };
        }
    };

    return draftViewer;
};