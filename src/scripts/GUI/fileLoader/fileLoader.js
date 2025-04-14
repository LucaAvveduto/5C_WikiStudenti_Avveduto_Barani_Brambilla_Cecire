export const generateFileLoader = (parentElement, pubsub) => {
    let id, config, files;
    
    const fileLoader = {
        build: (inputId, inputConfig) => {
            id = inputId;
            config = inputConfig;
            files = null;
        },
        render: () => {
            const html = `<div class="file has-name is-fullwidth">
                            <label class="file-label">
                                <input id="$ID" class="file-input" type="file" name="resume" $MULT>
                                <span class="file-cta">
                                    <span class="file-icon">
                                        $ICON
                                    </span>
                                    <span class="file-label">$TEXT</span>
                                </span>
                                <span class="file-name" id="$IDFilename">Nessun file selezionato</span>
                                
                            </label>
                        </div>`.replaceAll("$ID", id).replace("$ICON", config.icon).replace("$TEXT", config.text).replace("$MULT", config.multiple ? "multiple" : "");
            parentElement.innerHTML = html;

            const fileInput = document.getElementById(id);
            
            fileInput.onchange = () => {
                files = fileInput.files;
                document.getElementById(id + "Filename").innerText = fileInput.files.length > 0 ? Object.values(files).map(e => e.name).join(", ") : "Nessun file selezionato";
            };
        },
        getContent: () => {
            return config.multiple ? files : files ? files[0] : null;  
        },
        clear: () => {
            fileInput.files = null;
            files = fileInput.files;
            document.getElementById(id + "Filename").innerText = "Nessun file selezionato";
        }
    };

    return fileLoader;
};