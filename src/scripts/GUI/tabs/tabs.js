export const generateTabs = (parentElement, pubsub) => {
    let id, tabsDict;
    
    const tabs =  {
        build: (inputId, inputTabsDict) => {
            id = inputId;
            tabsDict = inputTabsDict;
        },
        render: () => {
            let html = `<div class="tabs is-boxed" id="$ID">
                            <ul>`.replace("$ID", id);
            let keys = Object.keys(tabsDict);

            for (let i = 0; i < keys.length; i++) {
                html += '<li class="tab' + (i === 0 ? ' is-active"' : '"') + 'id="' + keys[i] + '"><a><span class="icon is-small">' + tabsDict[keys[i]] + '</span><span>' + keys[i] + '</span></a></li>';
            }
            html += "</ul></div>";

            parentElement.innerHTML = html;

            document.querySelectorAll(".tab").forEach(e => {
                e.onclick = () => {
                    pubsub.publish(id + "-tab-changed", e.id);

                    document.querySelectorAll(".tab").forEach(tab => {
                        if (e === tab) {
                            tab.classList.add("is-active");
                        }
                        else {
                            tab.classList.remove("is-active");
                        }
                    });
                }
            });
        }
    };

    return tabs;
};