//-- Variáveis
let lastFocused, EmpresaIdJavaScript;
//OBJETOS

//-- Funções de uso geral para os arquivos .JS externos
let Method = {
    //-- Converte letras em números
    ConvertToLetters(num) {
        var arr = "abcdefghijklmnopqrstuvwxyz".split("");
        var resultado = arr[num + 1] ? arr[num + 1].toUpperCase() : 0;
        return resultado;
    },
    //-- Ativa um evento isValid personalizado para ser recebido no Genexus através do evento Method_Custom.blurCampo
    BlurValidation() {
        let currentIndex,
            lastIndex = 0,
            lastId,
            mapaFormulario = new Array();

        document.querySelectorAll("input, select").forEach(value =>
            value.addEventListener("focus", event => {
                currentIndex = event.target.gxIndex;
                if (currentIndex > lastIndex) {
                    mapaFormulario = $("input, select");
                    let objs = mapaFormulario.filter(index => {
                        let answer =
                            mapaFormulario[index].gxIndex < currentIndex &&
                            mapaFormulario[index].gxIndex >= lastIndex;
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
    },
    //-- Faz o foco nunca ficar nos prompts
    FixPrompts() {
        let prompts = $(".Method-PromptBtn");
        for (let i = 0; i < prompts.length; i++) {
            prompts[i].tabIndex = 1;
        }
    },
    //-- Troca de empresa utilizando o menu da navbar (WAUDITOR)
    ChangeEmpresaId(EmpresaIdValue) {
        EmpresaIdJavaScript = EmpresaIdValue;
        gx.O.MasterPage.clearMessages();
        gx.O.MasterPage.AV90EmpresaIdJS = gx.num.trunc(
            gx.O.MasterPage.AV31Javascript.LoadVariable("EmpresaIdJavaScript"),
            0
        );
        gx.O.MasterPage.refreshOutputs([
            {
                av: "AV90EmpresaIdJS",
                fld: "vEMPRESAIDJS_MPAGE",
                pic: "ZZZZZZZZZ9",
                nv: 0
            }
        ]);
        gx.O.MasterPage.executeServerEvent(
            "COMMIT_MPAGE",
            true,
            null,
            false,
            false
        );
    },
    //Verifica se um determinado elemento existe e retorna boolean
    ExistVar(value){
        return !!value;
    },

    ExistId(id){
        return !!document.getElementById(id);
    }
    
};

//-- Funções que dizem respeito à sidebar
let Menu = {
    Collapse() {
        ucSidebar.Collapse();
    },
    Expand() {
        ucSidebar.Expand();
    },
    CollapseExpand() {
        ucSidebar.CollapseExpand();
    },
    get visible() {
        ucSidebar.Visible; //-- Retorna um boolean
    },
    //-- Corrige a altura da área visível do menu
    FixHeight() {
        let sidebar_ul = document.getElementById("sidebar_ul");
        sidebar_ul.style.setProperty("height", `calc(100vh - 186px)`);
        let slimScrollDiv = document.querySelectorAll('.slimScrollDiv');
        slimScrollDiv.forEach(value => value.style.setProperty("height", `auto`));
    },
    //-- Corrige a margem dos elementos da tela em relação ao menu
    Resize() {
        if (Method.ExistId("sidebar") && Method.ExistId("TABLECONTENT_MPAGE") && Method.ExistId("TEXTBLOCKTITLE_MPAGE")) {
            
            let sidebar = document.getElementById("sidebar");
            let content = document.getElementById("TABLECONTENT_MPAGE");
            let title = document.getElementById("TEXTBLOCKTITLE_MPAGE").parentElement;        
            let footer = document.getElementById("TABLEFOOTER_MPAGE").parentElement;
            let largura = sidebar.offsetWidth;

            content.style.setProperty("margin-left", `${largura}px`);
            title.style.setProperty("margin-left", `${largura}px`);
            footer.style.setProperty("padding-left", `${largura + 15}px`);
        }
    },
    //-- Chama as funções que corrigem a tela e o menu 60 vezes por segundo
    Cycle() {
        Menu.Resize();
        Menu.FixHeight();
        window.requestAnimationFrame(Menu.Cycle);
    }
};

//-- Funções que travalham com os atalhos do teclado
let KeyBind = {
    Bind(key = "F9") {
        document.addEventListener("keydown", event => {
            if (event.key === key) {
                if (
                    document.getElementById("BTNINSERT") ||
                    document.getElementById("BTNINSERTTESTE")
                ) {
                    let objeto = document.getElementById("BTNINSERT")
                        ? document.getElementById("BTNINSERT")
                        : document.getElWWementById("BTNINSERTTESTE");
                    objeto.click();
                }
            }
        });
    },
    SelectedBind(key = "F2") {
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
            if (
                this.parentNode.parentNode.nodeName == "TD" &&
                this === document.activeElement
            ) {
                this.addEventListener("keydown", WebPanel);
            } else if (
                this.parentNode.parentNode.nodeName == "DIV" &&
                this === document.activeElement &&
                this.nextSibling
            ) {
                if (this.nextSibling.className == "input-group-btn") {
                    this.addEventListener("keydown", Transaction);
                }
            }
        });
        $("body").on("focusout", ".AttributeRealWidth", function() {
            this.removeEventListener("keydown", WebPanel);
        });
    }
};

//-- Funções para o mask dos campos dos formulários
let Mask = {
    Load() {
        $("body").on("focusout", ":input", function() {
            lastFocused = this;
        });
        $(window).bind("beforeunload", function() {
            if (!$(".gx-mask")[0]) {
                $("body").append("<div class='gx-mask'></div>");
            }
        });
    },
    IE() {
        let condition = (field, uf) => {
            if (
                document.getElementById("span_EMPRESACIDADEESTADOID") ||
                document.getElementById(
                    "span_PARTICIPANTE_PARTICIPANTEESTADOID"
                )
            ) {
                uf = document.getElementById("span_EMPRESACIDADEESTADOID")
                    ? document.getElementById("span_EMPRESACIDADEESTADOID")
                          .innerText
                    : document.getElementById(
                          "span_PARTICIPANTE_PARTICIPANTEESTADOID"
                      ).innerText;
            }
            if (uf == "AP" || uf == "AL") {
                field.mask("AAAAAAAAA");
            } else if (
                uf == "ES" ||
                uf == "MA" ||
                uf == "MS" ||
                uf == "PB" ||
                uf == "PI" ||
                uf == "RR" ||
                uf == "SE"
            ) {
                field.mask("AAAAAAAA-A");
            } else if (uf == "SC") {
                field.mask("AAA.AAA.AAA");
            } else if (uf == "AM" || uf == "GO" || uf == "RN") {
                field.mask("AA.AAA.AAA-A");
            } else if (uf == "AC") {
                field.mask("AA.AAA.AAA/AAA-AA");
            } else if (uf == "BA") {
                field.mask("BAAAAAA-AA");
            } else if (uf == "CE") {
                field.mask("AAAAAAAA-AA");
            } else if (uf == "DF") {
                field.mask("AAAAAAAAAAA-AA");
            } else if (uf == "MT" || uf == "TO") {
                field.mask("AAAAAAAAAA-A");
            } else if (uf == "MG") {
                field.mask("AAA.AAA.AAA/AAAA");
            } else if (uf == "PA") {
                field.mask("AA-AAAAAA-A");
            } else if (uf == "PR") {
                field.mask("AAA.AAAAA.AA");
            } else if (uf == "PE") {
                field.mask("AAAAAAA-AA");
            } else if (uf == "RJ") {
                field.mask("AA.AAA.AA-A");
            } else if (uf == "RS") {
                field.mask("AAA/AAAAAAA");
            } else if (uf == "RO") {
                field.mask("AAAAAAAAAAAAA-A");
            } else if (uf == "SP") {
                field.mask("AAA.AAA.AAA.AAA");
            }
        };

        let ie = this;

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
    },
    DateTime() {
        $("body").on("focus", ".MaskDateTime", function() {
            field = $(this).find("input");
            field.mask("00/00/0000 00:00");
        });
    },
    Date() {
        $("body").on("focus", ".MaskDate", function() {
            field = $(this).find("input");
            field.mask("00/00/0000");
        });
    },
    Placa() {
        $("body").on("focus", ".MaskPlaca", function() {
            field = $(this).find("input");
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
    },
    CEP() {
        $("body").on("focus", ".MaskCep", function() {
            field = $(this).find("input");
            field.mask("00000-000");
        });
    },
    CNPJ() {
        $("body").on("focus", ".MaskCNPJ", function() {
            field = $(this).find("input");
            field.mask("00.000.000/0000-00");
        });
    },
    CPF() {
        $("body").on("focus", ".MaskCPF", function() {
            field = $(this).find("input");
            field.mask("000.000.000-00");
        });
    },
    Phone() {
        $("body").on("focus", ".MaskPhone", function() {
            field = $(this).find("input");
            field.on("keyup", function(e) {
                setTimeout(
                    $.proxy(function() {
                        if (this.value.length > 14)
                            $(this).mask("(00) 00000-0000");
                        else $(this).mask("(00) 0000-00000");
                    }, this)
                );
            });
        });
    },
    All() {
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
};
