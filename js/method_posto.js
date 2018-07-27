window.onload = () => {
    let Scripts = new Method_Scripts();
    let Styles = new Method_Styles();
    Styles.AppendStyles();
    Files = Files.map(Scripts.RemoveScripts, Scripts);
    Files = Files.filter(value => value);
    Scripts.AppendScripts();
};
//--Testessss
class Method_Scripts {
    constructor() {
        this.scripts = [

        //-- Exclusão de arquivos
        //-- Para rejeitar os arquivos indesejados, utilizar a syntax "nome_arquivo",

        ];
    }

    RemoveScripts(value) {
        let achou = false;
        console.log(value);
        for (let i = 0; i < this.scripts.length; i++) {
            console.log("filtro");
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

        for (let i = 0; i < Files.length; i++) {
            let scriptTag = document.createElement("script");
            scriptTag.type = "text/javascript";
            scriptTag.src = `shared/method/js/${Files[i]}.js`;

            document.body.lastElementChild.appendChild(scriptTag);
        }
    }
}

class Method_Styles {
    constructor() {
        this.styles = [
            "shared/method/css/method_custom.css",
            "shared/method/css/teste.css"
        ];
    }

    AppendStyles() {
        for (let i = 0; i < this.styles.length; i++) {
            let style = document.createElement("link");
            style.href = this.styles[i];
            style.type = "text/css";
            style.rel = "stylesheet";
            document.head.appendChild(style);
        }
    }
}
