import { Files } from "./method_files.js";

export function insertCode(version) {

    let Scripts = new Method_Scripts();
    let Styles = new Method_Styles();

    //Remove os styles que estão na lista
    Files[1] = Files[1].map(Styles.RemoveStyles, Styles);
    //Filtra apenas os valores que não são nulos
    Files[1] = Files[1].filter(value => value);

    Styles.AppendStyles();

    //Remove os scripts que estão na lista
    Files[0] = Files[0].map(Scripts.RemoveScripts, Scripts);
    //Filtra apenas os valores que não são nulos
    Files[0] = Files[0].filter(value => value);
    
    Scripts.AppendScripts(version);

    return new Promise((resolve, reject) => {

        try {

            let selfDestruct = document.getElementById('self_destruct');
            selfDestruct.remove(); 
            
        } catch (error) {
            
            if (confirm('Erro na inicialização da página, favor limpar o cache e atualizar a página.')) {
                location.reload();
            }

        }
       
    })

}

export class Method_Scripts {
    constructor() {

        this.scripts = [
            //-- Bibliotecas externas

            // "pace-config",
            // "pace",

            // //--------------------------------

            // //-- Funções Custom Method

            // //--------------------------------

            // //-- Arquivos Externos

            // "method_ajax",
            // "method_config_bar"
            // //--------------------------------
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

    AppendScripts(version = Date.now()) {
        let footer = document.createElement("footer");

        footer.id = "MethodFooter";

        document.body.appendChild(footer);

        for (let i = 0; i < Files[0].length; i++) {
            let scriptTag = document.createElement("script");
            
            scriptTag.type = Files[0][i].type;
            
            scriptTag.src = `shared/method/js/${Files[0][i].src}.js?v=${version}`;

            document.body.lastElementChild.appendChild(scriptTag);
        }
    }
}

export class Method_Styles {
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
            style.href = `shared/method/css/${Files[1][i]}.css`;
            style.type = "text/css";
            style.rel = "stylesheet";
            document.head.appendChild(style);
        }
    }
}
