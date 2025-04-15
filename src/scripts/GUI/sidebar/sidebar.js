export const generateSidebar = (parentElement, pubsub) => {
    let id, title, list, searchBarContainerId, buttonInfo;

    const sidebar = {
        build: (inputId, inputTitle, inputList, inputSearchBarContainerId, inputButtonInfo) => {
            id = inputId;
            title = inputTitle;
            list = inputList;
            searchBarContainerId = inputSearchBarContainerId;
            buttonInfo = inputButtonInfo;
        },
        render: () => {
            let html = (buttonInfo)
                        ?
                    `<aside class="menu" id="$ID">
                        <div class="columns">
                            <div class="column is-three-quarter" id="$SID"></div>
                            <div class="column is-one-quarter" id="$IDButtonContainer">
                                <button class="button is-link" id="$IDButton">
                                    <span class="icon">
                                        $BICON
                                    </span>
                                    <span>$BTEXT</span>
                                </button>
                            </div>
                        </div>
                        <p class="menu-label">$TITLE</p>
                        <ul class="menu-list" id="$IDList">`.replaceAll("$ID", id).replace("$SID", searchBarContainerId).replace("$TITLE", title).replace("$BICON",  buttonInfo.icon).replace("$BTEXT",  buttonInfo.text)
                        :
                    `<aside class="menu" id="$ID">
                        <div class="container" id="$SID"></div>
                        <p class="menu-label">$TITLE</p>
                        <ul class="menu-list" id="$IDList">`.replaceAll("$ID", id).replace("$SID", searchBarContainerId).replace("$TITLE", title);
            
            Object.keys(list).forEach(e => {
                html += '<li class="$IDitem"><a'.replace("$ID", id) + ((list[e]) ? (' href="'.replace("$ID", id) + list[e] + '"') : "") + '>' + e + '</a></li>';
            });
            html += "</ul></aside>";
            parentElement.innerHTML = html;
            
            document.querySelectorAll("." + id + "item").forEach(e => {
                e.onclick = () => {
                    pubsub.publish(id + "-item-clicked");
                }
            });

            if (buttonInfo) {
                document.getElementById(id + "Button").onclick = () => {
                    pubsub.publish(id + "Button-clicked");
                };
            }
        },
        search: (inputSearch) => {
            let newHtml = "";
            
            Object.keys(list).forEach(e => {
                if (e.toLowerCase().includes(inputSearch.toLowerCase())) {
                    newHtml += '<li class="$IDitem"><a'.replace("$ID", id) + ((list[e]) ? (' href="'.replace("$ID", id) + list[e] + '"') : "") + '>' + e + '</a></li>';
                }
            });
            document.getElementById(id + "List").innerHTML = newHtml;
        },
        reset: () => {
            let newHtml = "";
            
            Object.keys(list).forEach(e => {
                newHtml += '<li class="$IDitem"><a'.replace("$ID", id) + ((list[e]) ? (' href="'.replace("$ID", id) + list[e] + '"') : "") + '>' + e + '</a></li>';
            });
            document.getElementById(id + "List").innerHTML = newHtml;
        },
        changeVisibility: (visibility) => {
            if (visibility) {
                parentElement.classList.remove("is-hidden");
            }
            else {
                parentElement.classList.add("is-hidden");
            }
        },
        changeButtonState: (state) => {
            const button = document.getElementById(id + "Button");
            
            if (state) {
                button.disabled = false;
                button.classList.remove("is-hidden");
            }
            else {
                button.disabled = true;
                button.classList.add("is-hidden");
            }
        }
    };

    return sidebar;
};