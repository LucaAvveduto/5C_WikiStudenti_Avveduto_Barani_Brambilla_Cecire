export const generateUsersManager = (parentElement, pubsub) => {
    let id;

    const manager = {
        build: (inputId) => {
            id = inputId;
        },
        render: (inputUser) => {
            const user = inputUser;

            const html = `<div class="content" id="$ID">
                            <button class="button is-link" id="$IDBackButton">
                                <span class="icon">
                                    <i class="fa-solid fa-arrow-left"></i>
                                </span>
                                <span>Indietro</span>
                            </button>
                            <h1 class="title">Gestisci </h1>
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
                                    <input class="input" type="number" placeholder="Anno di nascita" id="birthYear">
                                    <span class="icon is-small is-left">
                                        <i class="fa-solid fa-calendar"></i>
                                    </span>
                                </p>
                            </div>
                            <div class="field">
                                <p class="control has-icons-left">
                                    <input class="input" type="email" placeholder="Email" id="email" disabled>
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-envelope"></i>
                                    </span>
                                </p>
                            </div>
                            <div class="field">
                                <p class="control has-icons-left">
                                    <input class="input" type="password" placeholder="Password" id="password">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-lock"></i>
                                    </span>
                                </p>
                            </div>
                            <div class="field">
                                <p>Ruoli:</p>
                                <div class="checkboxes">
                                    <label class="checkbox has-icons-left">
                                        <input type="checkbox" id="isWriter">
                                        <span class="icon is-small is-left">
                                            <i class="fa-solid fa-user-pen"></i>
                                        </span>
                                        <span>Scrittore</span>
                                    </label>
                                    <label class="checkbox has-icons-left">
                                        <input type="checkbox" id="isModerator">
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

            document.getElementById("name").value = user.name;
            document.getElementById("surname").value = user.surname;
            document.getElementById("class").value = user.class;
            document.getElementById("birthYear").value = user.birthYear;
            document.getElementById("email").value = user.email;
            document.getElementById("password").value = user.password;
            document.getElementById("isWriter").checked = user.isWriter;
            document.getElementById("isModerator").checked = user.isModerator;
        },
        getContent: () => {
            return {
                name: document.getElementById("name").value,
                surname: document.getElementById("surname").value,
                class: document.getElementById("class").value,
                birthYear: document.getElementById("birthYear").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
                isWriter: document.getElementById("isWriter").checked,
                isModerator: document.getElementById("isModerator").checked
            };
        }
    };
    
    return manager;
};