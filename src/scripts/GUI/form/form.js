export function createForm(parentElement, pubsub) {
    let data = [];
    let isLightBg = false;
    
    return {
        build: (elements) => {
            data = elements;
            isLightBg = !document.querySelector("html[data-theme='dark']");
        },
        render: () => {
            parentElement.innerHTML = '';
            let html = `
                    <div class="form-container ${isLightBg ? 'lightbg': 'darkbg'}">
                        <form class="form">
            `;
            html += data[0].map(e => {
                return `
                    <div class="form-group">
                        <label for="${e.id}">${e.id}</label>
                        <input type="${e.type}" id="${e.id}" name="${e.id}">
                    </div>
                `;
            }).join("");
            html += `
                        ${data[1]}
                        <div class="d-inline" id="radios">
                            ${
                                data[2]?.map(e => {
                                    return `
                                    <label class="checkbox">
                                        <input type="checkbox" id="${e}" />
                                            ${e}
                                    </label>
                                    `
                                }).join("") || ""
                            }
                        </div>
                        <div id="errorDiv"></div>
                        <div class="columns">
                            <div class="column">
                                <button class="form-submit-btn" id="sub" type="submit">Submit</button>
                            </div>
                            <div class="column">
                                <button class="form-submit-btn form-cancel-btn">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
           `;
            parentElement.innerHTML = html;
            if(isLightBg) document.querySelectorAll(".form-submit-btn").forEach(e => e.style.backgroundColor = "#fff");
            document.getElementById("sub").onclick = (event) => {
                event.preventDefault();
                const values = {};
                const forms = document.querySelectorAll("div.form-group");
                const keys = data[0].map(e => e["id"]);
                forms.forEach((e,index) => {
                    const node = e.querySelector(`input`);
                    values[keys[index]] = node.value;
                    node.value = "";
                });
                
                document.querySelectorAll("#radios > *").forEach((e,index) => {
                    const node = e.querySelector("input");
                    values[`radio${index}`] = node.value;
                    node.checked = false;
                });
                
                pubsub.publish(data[2] ? "reg" : "log", values);
            }
        }
    }
}