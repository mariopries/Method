import { Files } from "./method_files.js";

window.onload = () => {
    let Scripts = new Method_Scripts();
    let Styles = new Method_Styles();
    Files[1] = Files[1].map(Styles.RemoveStyles, Styles);
    Files[1] = Files[1].filter(value => value);
    Styles.AppendStyles();
    Files[0] = Files[0].map(Scripts.RemoveScripts, Scripts);
    Files[0] = Files[0].filter(value => value);
    Scripts.AppendScripts();
};

class Method_Scripts {
    constructor() {
        this.scripts = [
            //-- Exclusão de arquivos
            //-- Para rejeitar os arquivos indesejados, utilizar a syntax "nome_arquivo",
        ];
    }

    RemoveScripts(value) {
        let achou = false;
        for (let i = 0; i < this.scripts.length; i++) {
            if (this.scripts[i] === value) {
                achou = true;
                break;
            }
        }

        if (!achou) {
            return value;
        }
    }

    AppendScripts() {
        let footer = document.createElement("footer");

        footer.id = "MethodFooter";

        document.body.appendChild(footer);

        for (let i = 0; i < Files[0].length; i++) {
            let scriptTag = document.createElement("script");
            scriptTag.type = "text/javascript";
            scriptTag.src = `shared/method/js/${Files[0][i]}.js`;
            document.body.lastElementChild.appendChild(scriptTag);
        }
    }
};

class Method_Styles {
    constructor() {
        this.styles = [
            //-- Inserir os styles que não devem ser inclusos
        ];
    }

    RemoveStyles(value) {
        let achou = false;
        for (let i = 0; i < this.styles.length; i++) {
            if (this.styles[i] === value) {
                achou = true;
                break;
            }
        }

        if (!achou) {
            return value;
        }
    }

    AppendStyles() {
        for (let i = 0; i < Files[1].length; i++) {
            let style = document.createElement("link");
            style.href = Files[1][i];
            style.type = "text/css";
            style.rel = "stylesheet";
            document.head.appendChild(style);
        }
    }
};
