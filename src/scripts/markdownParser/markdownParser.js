export const generateParser = () => {
    return {
        parse: (string) => {
            const bold = /\*\*(.*)\*\*/gim;
            const italics = /_{1}(.*)_{1}/gim;
            const boldItalics = /\*\*\*(.*)\*\*\*/gim;
            const h1 = /^# (.*$)/gim;
            const h2 = /^## (.*$)/gim;
            const h3 = /^### (.*$)/gim;
            const h4 = /^#### (.*$)/gim;
            const h5 = /^##### (.*$)/gim;
            const h6 = /^###### (.*$)/gim;
            const blockquote = /^> (.*$)/gim;
            const ol = /^\d.*\. (.*$)/gim;
            const ul = /^- (.*$)/gim;
            
            let html = string.replaceAll(bold, `<strong>$1</strong>`)
                            .replaceAll(italics, `<em>$1</em>`)
                            .replaceAll(boldItalics, `<em><strong>$1</strong></em>`)
                            .replaceAll(h1, `<h1>$1</h1>`)
                            .replaceAll(h2, `<h2>$1</h2>`)
                            .replaceAll(h3, `<h3>$1</h3>`)
                            .replaceAll(h4, `<h4>$1</h4>`)
                            .replaceAll(h5, `<h5>$1</h5>`)
                            .replaceAll(h6, `<h6>$1</h6>`)
                            .replaceAll(blockquote, `<blockquote>$1</blockquote>`)
                            .replaceAll(ol, `<li>$1</li>`);
            
            return html;
        }
    };
};