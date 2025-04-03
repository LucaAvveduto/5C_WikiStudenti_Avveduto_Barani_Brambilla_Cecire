export function createForm(parentElement) {
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
                        <div id="errorDiv"></div>
                        <div class="columns">
                            <div class="column">
                                <button class="form-submit-btn" type="submit">Submit</button>
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
        }
    }
}