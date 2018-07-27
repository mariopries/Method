window.onload = () => {
    let Scripts = new Method_Scripts;
    CarregaStyles();
    Scripts.AppendScripts();
};
//--Teste
class Method_Scripts {
    constructor() {
        this.scripts = [
            //-- Bibliotecas externas

            "shared/method/js/jquery.cropit.js",
            "shared/method/js/jquery.mask.js",
            "shared/method/js/xls-export.js",

            //--------------------------------

            //-- Funções Custom Method

            "shared/method/js/method_loading.js",

            //--------------------------------

            //-- Arquivos Externos

            "shared/method/js/method_menu.js",
            "shared/method/js/method_mobile.js",
            "shared/method/js/method_style.js",
            "shared/method/js/pnotify.custom.min.js",
            "shared/method/js/method_mask.js",
            "shared/method/js/method_onload.js",
            "shared/method/js/method_excel.js"

            //--------------------------------
        ];
    }

    AppendScripts() {
        let footer = document.createElement("footer");

        footer.id = "MethodFooter";

        document.body.appendChild(footer);

        for (let i = 0; i < this.scripts.length; i++) {
            let scriptTag = document.createElement("script");
            scriptTag.type = "text/javascript";
            scriptTag.src = this.scripts[i];

            document.body.lastElementChild.appendChild(scriptTag);
        }
    }
};

class Method_Styles {
    constructor(){
        this.styles = [
            "shared/method/css/method_custom.css",
            "shared/method/css/teste.css"
        ];
    }

    AppendStyles(){

        for (let i = 0; i < this.styles.length; i++) {
            let style = document.createElement("link");
            style.href = this.styles[i];
            style.type = "text/css";
            style.rel = "stylesheet";
            document.head.appendChild(style);
        }

    }
}
