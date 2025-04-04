export const generateSidebar = (parentElement, pubsub) => {
    let id, title, list, searchBarContainerId;

    const sidebar = {
        build: (inputId, inputTitle, inputList, inputSearchBarContainerId) => {
            id = inputId;
            title = inputTitle;
            list = inputList;
            searchBarContainerId = inputSearchBarContainerId;
        },
        render: () => {
            let html = `<aside class="menu" id="$ID">
                            <div class="container" id="$SID"></div>
					        <p class="menu-label">$TITLE</p>
					        <ul class="menu-list" id="$IDList">`.replaceAll("$ID", id).replace("$SID", searchBarContainerId).replace("$TITLE", title);
            
            Object.keys(list).forEach(e => {
                html += '<li><a href="' + list[e] + '">' + e + '</a></li>';
            });
            html += "</ul></aside>";
            parentElement.innerHTML = html;
        },
        search: (inputSearch) => {
            let newHtml = "";
            
            Object.keys(list).forEach(e => {
                if (e.toLowerCase().includes(inputSearch.toLowerCase())) {
                    newHtml += '<li><a href="' + list[e] + '">' + e + '</a></li>';
                }
            });
            document.getElementById(id + "List").innerHTML = newHtml;
        },
        reset: () => {
            let newHtml = "";
            
            Object.keys(list).forEach(e => {
                newHtml += '<li><a href="' + list[e] + '">' + e + '</a></li>';
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
        }
    };

    return sidebar;
};