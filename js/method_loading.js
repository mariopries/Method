//-- Variáveis
let lastFocused;
//OBJETOS

//-- Funções para serem utilizadas nos arquivos JS externos
class Method {
    //-- Função de uso geral para converter letras do alfabeto no número correspondente às mesmas
    static ConvertToLetters(num) {
        var arr = "abcdefghijklmnopqrstuvwxyz".split("");
        var resultado = arr[num + 1] ? arr[num + 1].toUpperCase() : 0;
        return resultado;
    }

    //-- Função para validar o evento isValid no Genexus (O evento do Genexus se aplica apenas no momento em que o campo é alterado)
    static BlurValidation() {
        let currentIndex,
            lastIndex = 0,
            lastId,
            mapaFormulario;

        document.querySelectorAll("input, select").forEach(value =>
            value.addEventListener("focus", event => {
                currentIndex = event.target.gxIndex;
                if (currentIndex > lastIndex) {
                    mapaFormulario = $("input, select");
                    let objs = mapaFormulario.filter(index => {
                        let answer = mapaFormulario[index].gxIndex < currentIndex && mapaFormulario[index].gxIndex >= lastIndex;
                        return answer;
                    });
                    let objIds = objs.map(index => {
                        let answer = objs[index].id;
                        return answer;
                    });

                    gx.fx.obs.notify("Method_Custom.blurCampo", [objIds]);
                }

                lastIndex = event.target.gxIndex;

                lastId = event.target.id;
            })
        );
    }

    //-- Função que corrige a interação com focus nos prompts em Web Panels, fazendo o focus ir para o próximo campo
    static FixPrompts() {
        let prompts = $(".Method-PromptBtn");
        for (let i = 0; i < prompts.length; i++) {
            prompts[i].tabIndex = 1;
        }
    }

    //-- Função que altera o Id das empresas utilizando o combo box na navbar
    static ChangeEmpresaId(EmpresaIdValue) {
        gx.fx.obs.notify("Method_Custom.ChangeEmpresa", [EmpresaIdValue]);
    }
}

//-- Funções relacionadas ao Menu Lateral
class Menu {
    static Collapse() {
        ucSidebar.Collapse();
    }
    static Expand() {
        ucSidebar.Expand();
    }
    static CollapseExpand() {
        ucSidebar.CollapseExpand();
    }
    static get visible() {
        return ucSidebar.Visible; //--Retorna um boolean
    }
    //-- Corrige o tamanho da área visível do menu ao redimensionar a tela
    static FixHeight() {
        let sidebar_ul = document.getElementById("sidebar_ul");
        let slimScrollDiv = document.querySelectorAll(".slimScrollDiv");

        sidebar_ul.style.setProperty("height", `calc(100vh - 186px)`);

        slimScrollDiv.forEach(value => value.style.setProperty("height", `auto`));
    }
    //-- Corrige a responsividade da tela conforme o menu se adapta (É chamada pelo método Cycle)
    static Resize() {
        if (document.getElementById("sidebar") && document.getElementById("TABLECONTENT_MPAGE") && document.getElementById("TEXTBLOCKTITLE_MPAGE")) {
            let sidebar = document.getElementById("sidebar");
            let content = document.getElementById("TABLECONTENT_MPAGE");
            let title = document.getElementById("TEXTBLOCKTITLE_MPAGE").parentElement;
            let footer = document.getElementById("TABLEFOOTER_MPAGE").parentElement;
            let largura = sidebar.offsetWidth;
            content.style.setProperty("margin-left", `${largura}px`);
            title.style.setProperty("margin-left", `${largura}px`);
            footer.style.setProperty("padding-left", `${largura + 15}px`);
        }
    }
    //-- Corrige a responsividade da página uma vez por frame
    static Cycle() {
        Menu.Resize();
        Menu.FixHeight();
        window.requestAnimationFrame(Menu.Cycle);
    }
}

//-- Funções utilizadas para remapeamento de atalhos do teclado
class KeyBind {
    static Bind(key = "F9") {
        document.addEventListener("keydown", event => {
            if (event.key === key) {
                if (document.getElementById("BTNINSERT") || document.getElementById("BTNINSERTTESTE")) {
                    let objeto = document.getElementById("BTNINSERT") ? document.getElementById("BTNINSERT") : document.getElementById("BTNINSERTTESTE");
                    objeto.click();
                }
            }
        });
    }
    static SelectedBind(key = "F2") {
        function WebPanel(event) {
            if (event.key === key) {
                let objeto = this.parentNode.parentNode.nextSibling.firstChild;
                objeto.click();
            }
        }

        function Transaction(event) {
            if (event.key === key) {
                let objeto = this.nextSibling.firstChild;
                objeto.click();
            }
        }

        $("body").on("focus", ".AttributeRealWidth", function() {
            if (this.parentNode.parentNode.nodeName === "TD" && this === document.activeElement) {
                this.addEventListener("keydown", WebPanel);
            } else if (this.parentNode.parentNode.nodeName === "DIV" && this === document.activeElement && this.nextSibling) {
                if (this.nextSibling.className === "input-group-btn") {
                    this.addEventListener("keydown", Transaction);
                }
            }
        });

        $("body").on("focusout", ".AttributeRealWidth", function() {
            this.removeEventListener("keydown", WebPanel);
        });
    }
}

//-- Funções de mask dos campos dos formulários
class Mask {
    static Load() {
        $("body").on("focusout", ":input", function() {
            lastFocused = this;
        });

        $(window).bind("beforeunload", function() {
            if (!$(".gx-mask")[0]) {
                $("body").append("<div class='gx-mask'></div>");
            }
        });
    }
    static IE() {
        let condition = (field, uf) => {
            if (document.getElementById("span_EMPRESACIDADEESTADOID") || document.getElementById("span_PARTICIPANTE_PARTICIPANTEESTADOID")) {
                uf = document.getElementById("span_EMPRESACIDADEESTADOID")
                    ? document.getElementById("span_EMPRESACIDADEESTADOID").innerText
                    : document.getElementById("span_PARTICIPANTE_PARTICIPANTEESTADOID").innerText;
            }
            if (uf === "AP" || uf === "AL") {
                field.mask("AAAAAAAAA");
            } else if (uf === "ES" || uf === "MA" || uf === "MS" || uf === "PB" || uf === "PI" || uf === "RR" || uf === "SE") {
                field.mask("AAAAAAAA-A");
            } else if (uf === "SC") {
                field.mask("AAA.AAA.AAA");
            } else if (uf === "AM" || uf === "GO" || uf === "RN") {
                field.mask("AA.AAA.AAA-A");
            } else if (uf === "AC") {
                field.mask("AA.AAA.AAA/AAA-AA");
            } else if (uf === "BA") {
                field.mask("BAAAAAA-AA");
            } else if (uf === "CE") {
                field.mask("AAAAAAAA-AA");
            } else if (uf === "DF") {
                field.mask("AAAAAAAAAAA-AA");
            } else if (uf === "MT" || uf === "TO") {
                field.mask("AAAAAAAAAA-A");
            } else if (uf === "MG") {
                field.mask("AAA.AAA.AAA/AAAA");
            } else if (uf === "PA") {
                field.mask("AA-AAAAAA-A");
            } else if (uf === "PR") {
                field.mask("AAA.AAAAA.AA");
            } else if (uf === "PE") {
                field.mask("AAAAAAA-AA");
            } else if (uf === "RJ") {
                field.mask("AA.AAA.AA-A");
            } else if (uf === "RS") {
                field.mask("AAA/AAAAAAA");
            } else if (uf === "RO") {
                field.mask("AAAAAAAAAAAAA-A");
            } else if (uf === "SP") {
                field.mask("AAA.AAA.AAA.AAA");
            }
        };

        $("body").on("focus", ".MaskIE", function() {
            let uf;

            let field = $(this).find("input");
            if (field[0].value.length <= 1) {
                field.on("keyup", event => {
                    if (field[0].value.match("[0-9]+$")) {
                        condition(field, uf);
                    } else {
                        field.mask("AAAAAA", {
                            onKeyPress: (value, event) => {
                                event.currentTarget.value = value.toUpperCase();
                            }
                        });
                    }
                });
            }
        });
    }
    static DateTime() {
        $("body").on("focus", ".MaskDateTime", function() {
            let field = $(this).find("input");

            field.mask("00/00/0000 00:00");
        });
    }
    static Date() {
        $("body").on("focus", ".MaskDate", function() {
            let field = $(this).find("input");

            field.mask("00/00/0000");
        });
    }
    static Placa() {
        $("body").on("focus", ".MaskPlaca", function() {
            let field = $(this).find("input");

            field.mask("SSS-0000", {
                translation: {
                    S: { pattern: /[A-Za-z]/ },
                    0: { pattern: /[0-9]/ }
                },
                onKeyPress: function(value, event) {
                    event.currentTarget.value = value.toUpperCase();
                }
            });
        });
    }
    static CEP() {
        $("body").on("focus", ".MaskCep", function() {
            let field = $(this).find("input");

            field.mask("00000-000");
        });
    }
    static CNPJ() {
        $("body").on("focus", ".MaskCNPJ", function() {
            let field = $(this).find("input");

            field.mask("00.000.000/0000-00");
        });
    }
    static CPF() {
        $("body").on("focus", ".MaskCPF", function() {
            let field = $(this).find("input");

            field.mask("000.000.000-00");
        });
    }
    static Phone() {
        $("body").on("focus", ".MaskPhone", function() {
            let field = $(this).find("input");

            field.on("keyup", function(e) {
                setTimeout(
                    $.proxy(function() {
                        if (this.value.length > 14) $(this).mask("(00) 00000-0000");
                        else $(this).mask("(00) 0000-00000");
                    }, this)
                );
            });
        });
    }
    static All() {
        Mask.Load();
        Mask.CEP();
        Mask.CNPJ();
        Mask.CPF();
        Mask.Date();
        Mask.DateTime();
        Mask.IE();
        Mask.Phone();
        Mask.Placa();
    }
}

let afterLoad = () => {
    Menu.Cycle();
    Method.BlurValidation();
    KeyBind.Bind("F9");
    KeyBind.SelectedBind();
    Mask.All();
    $("body").on("focus", ":input", () => {
        Method.FixPrompts();
    });
};

try {

    afterLoad();
    
} catch (error) {

    location.reload();
    
}

