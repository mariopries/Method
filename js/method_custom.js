//@ts-check

//-- Classes de objetos externos Method_Custom

//-- Method_Custom

let controle = false;

let Method_Custom = class {
    LoadVariable(varName) {
        let varValue = window[varName];
        return varValue;
    }

    OpenInTab(link) {
        open(link);
    }

    EnablePrompt() {
        KeyBind.SelectedBind();

        KeyBind.Bind();
    }

    AddHTML(target, newHTML) {
        // EmpresasInnerHTML = newHTML;
        document.getElementById(target).innerHTML = newHTML;
    }

    GetSessionStorage(key) {
        return sessionStorage.getItem(key);
    }

    SetSessionStorage(key, value) {
        sessionStorage.setItem(key, value);
    }

    RemoveSessionStorage(key) {
        sessionStorage.removeItem(key);
    }

    SetLocalStorage(key, value) {
        localStorage.setItem(key, value);
    }

    RemoveLocalStorage(key) {
        localStorage.removeItem(key);
    }

    ExecutaComando(comando) {
        eval(comando);
    }

    ConsoleLog(value) {
        console.log(value);
    }

    LoaderExecute(executar) {
        if (executar) {
            // @ts-ignore
            if (!$(".gx-mask")[0]) {
                // @ts-ignore
                $("body").append("<div class='gx-mask'></div>");
            }
        } else {
            // @ts-ignore
            if ($(".gx-mask")[0]) {
                // @ts-ignore
                $(".gx-mask").remove();
            }
        }
    }

    Alert(message) {
        alert(message);
    }

    CSSClasse(idObjeto, tipo, classe) {
        let object = document.getElementById(idObjeto);
        switch (tipo) {
            case "add":
                object.classList.add(classe);
                break;
            case "remove":
                object.classList.remove(classe);
                break;
        }
    }

    Reload(forceGet) {
        location.reload(forceGet);
    }

    Msg(message, messageType) {
        let node = document.createElement("div");
        let textnode = document.createTextNode(message);
        node.appendChild(textnode);
        let msgClass;
        switch (messageType) {
            case "Erro":
                msgClass = "gx-error-message";
                break;
            case "Info":
                msgClass = "gx-info-message";
                break;
            case "Alerta":
                msgClass = "gx-warning-message";
                break;
            case "Sucesso":
                msgClass = "gx-sucess-message";
                break;

            default:
                msgClass = "gx-warning-message";
                break;
        }

        node.classList.toggle(msgClass);
        document.getElementById("gxErrorViewer").appendChild(node);
    }

    AlterarValorCampo(id, value) {
        // @ts-ignore
        $(eval(id))[0].value = value;
    }

    AlterarValorCampoGrid(id, value) {
        // @ts-ignore
        id = `${id}_${window.gx.currentRows.pop()}`;
        // @ts-ignore
        $(eval(id))[0].value = value;
    }

    HideShow(id) {
        let object = document.getElementById(id);
        if (object.style.display !== "none") {
            object.style.setProperty("display", "none");
        } else {
            object.style.setProperty("display", "block");
        }
    }

    SetFocus(fieldId) {
        if (fieldId == "prev" && lastFocused != null) {
            // @ts-ignore
            $(lastFocused).focus();
        } else if (fieldId != null) {
            // @ts-ignore
            let fieldToFocus = $("#" + fieldId);
            if (fieldToFocus) {
                fieldToFocus.focus();
            }
        }
    }

    StringReplace(message, search, replacement) {
        return message.replace(new RegExp(search, "g"), replacement);
    }

    PNotify(msgnotify) {
        eval(msgnotify);
    }
};

//--Method_Avatar

class Method_Avatar {
    constructor() {
        this.ImageBase64;
    }

    Start() {
        let ConstroiTela = () => {
            let html = `<div id="corpoCropit" class="image-editor">
                            <table width="100%">
                                <tr>
                                    <td colspan="5" style="padding-bottom:20px;" align="center"><div class="cropit-preview"></div></td>
                                </tr>
                                <tr>
                                    <td colspan="5" style="padding-bottom:2%; padding-left:5px;">Redimencionar imagem</td>
                                </tr>
                                <tr>
                                    <td align="center"><i id="rotate-ccw" class="rotate fas fa-undo-alt"></i></td>
                                    <td align="center"><i id="rotate-cw" class="rotate fas fa-redo-alt"></i></td>
                                    <td align="center"><span class="icone-imagem fas fa-search-minus"></span></td>
                                    <td align="center"><input type="range" class="cropit-image-zoom-input custom" min="0" max="1" step="0.01"></td>
                                    <td align="center"><span style="margin-left:5px;" class="icone-imagem fas fa-search-plus"></span></td>
                                </tr>
                                <tr>
                                    <td colspan="5" style="padding-top:10px;" align="center">
                                        <div class="container-fluid" style="float:right;">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <span id="selectArquivo" class="btn btn-primary" type="button"><span class="glyphicon glyphicon-picture"></span> Selecionar nova imagem</span>
                                                    <span id="aplicarAvatar" class="btn btn-warning" type="button"><span class="glyphicon glyphicon-check"></span> Aplicar/Visualizar</span>
                                                    <span id="salvaAvatar" class="btn btn-success" type="button"><span class="glyphicon glyphicon-floppy-saved"></span> Salvar</span>
                                                </div>
                                            </div>
                                        </div>
                                        <input id="uploadImagem" type="file" class="cropit-image-input input-hidden" accept="image/*">
                                    </td>
                                </tr>
                            </table>
                        </div>`;

            // @ts-ignore
            $("#corpoCropit").remove();
            // @ts-ignore
            $("#W0015TUPLOAD").append(html);
            // @ts-ignore
            $("#TUPLOAD").append(html);
        };
        let GeraCropit = () => {
            // @ts-ignore
            $(".image-editor").cropit({
                exportZoom: 1.25,
                imageBackground: true,
                imageBackgroundBorderWidth: 20,
                imageState: {
                    src: "shared/method/images/avatar.png"
                },
                smallImage: "allow"
            });
        };
        let EventoRolagemMouse = () => {
            // @ts-ignore
            $(".cropit-preview").bind("mousewheel", function(event) {
                event.preventDefault();

                // @ts-ignore
                let slider = $(".cropit-image-zoom-input");
                let currVal = parseFloat(slider.val());
                let increment = event.originalEvent.wheelDelta > 0 ? 0.1 : 0.1 * -1;
                let newVal = currVal + increment;

                slider.val(newVal);
                slider.trigger("change"); // This triggers the CropIt code for slider/range changes.
            });
        };
        let AcaoBotoes = () => {
            //-- Rolagem da imagem a esquerda
            // @ts-ignore
            $("#rotate-cw").click(function(event) {
                event.preventDefault();
                // @ts-ignore
                $(".image-editor").cropit("rotateCW");
            });

            //-- Da trigger no input de type file
            // @ts-ignore
            $("#selectArquivo").click(function(event) {
                event.preventDefault();
                // @ts-ignore
                $("#uploadImagem").trigger("click");
            }),
                //-- Rolagem da imagem a direita
                // @ts-ignore
                $("#rotate-ccw").click(function(event) {
                    event.preventDefault();
                    // @ts-ignore
                    $(".image-editor").cropit("rotateCCW");
                });

            //-- Aplicar e visualizar
            document.getElementById("aplicarAvatar").addEventListener("click", () => {
                // @ts-ignore
                let imageData = $(".image-editor").cropit("export");
                this.ImageBase64 = imageData;

                // @ts-ignore
                gx.fx.obs.notify("Method_Avatar.SalvarAvatar");

                // @ts-ignore
                $("#previlPerfil1").remove();
                // @ts-ignore
                $("#previlPerfil2").remove();

                setTimeout(function() {
                    //-- HTML da div da previa do novo avatar
                    let divPrev = ` <div align="center" style="display: block;">
                                        <img align="middle" src="${imageData}" id="previlPerfil1" alt="Prévia do perfil" class="previa-avatar-quadrado"/>
                                        <img style="margin-top:10px;" align="middle" src="${imageData}" id="previlPerfil2" alt="Prévia do perfil" class="previa-avatar-redondo"/>
                                    </div>`;

                    // @ts-ignore
                    $("#TAVATAR").append(divPrev);

                    setTimeout(function() {
                        //$("#previlPerfil1").fadeIn(700);
                        // @ts-ignore
                        $("#previlPerfil2").fadeIn(700);
                    }, 220);
                }, 215);
            });

            //-- Salvar imagem (Comunicação com GeneXus)
            // @ts-ignore
            $("#salvaAvatar").click(function(event) {
                event.preventDefault();

                //-- Remove o input type file (Ocorrendo travamento da tela, então tem que ser removido pós utilizar)
                // @ts-ignore
                $("#uploadImagem").remove();

                //-- Executa o comando de atualizar o avatar
                // @ts-ignore
                gx.fx.obs.notify("Method_Avatar.ExecutarAlteracao");
            });
        };

        //-- Constroi a tela ao carregar a pagina
        ConstroiTela.bind(this)();

        //-- Gera o plugin Cropit
        GeraCropit.bind(this)();

        //-- Carrega os eventos dos botões
        AcaoBotoes.bind(this)();

        //-- Anexa o evento de rolagem de zoom
        EventoRolagemMouse.bind(this)();
    }

    GetImage() {
        return this.ImageBase64;
    }

    SetImage(value) {
        this.ImageBase64 = value;
    }
}
