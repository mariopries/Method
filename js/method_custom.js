// AESTHETHIC
//--TESTE 1234

Method_Custom = class {
    LoadVariable(varName) {
        varValue = window[varName];
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
        EmpresasInnerHTML = newHTML;
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
            if (!$(".gx-mask")[0]) {
                $("body").append("<div class='gx-mask'></div>");
            }
        } else {
            if ($(".gx-mask")[0]) {
                $(".gx-mask").remove();
            }
        }
    }

    Alert(message) {
        alert(message);
    }

    CSSClasse(idObjeto, tipo, classe) {
        object = $("#" + idObjeto);
        switch (tipo) {
            case "add":
                object.addClass(classe);
                break;
            case "remove":
                object.removeClass(classe);
                break;
        }
    }

    Reload(forceGet) {
        location.reload(forceGet);
    }

    Msg(message, messageType) {
        var node = document.createElement("div");
        var textnode = document.createTextNode(message);
        node.appendChild(textnode);

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

        $(node).toggleClass(msgClass);
        document.getElementById("gxErrorViewer").appendChild(node);
    }

    AlterarValorCampo(id, value) {
        $(eval(id))[0].value = value;
    }

    AlterarValorCampoGrid(id, value) {
        id = id + "_" + window.gx.currentRows.pop();
        $(eval(id))[0].value = value;
    }

    HideShow(id, command) {
        object = $("#" + id);
        if (object) {
            switch (command) {
                case "hide":
                    object.hide();
                    break;
                case "show":
                    object.show();
                    break;
            }
        }
    }

    SetFocus(fieldId) {
        if (fieldId == "prev" && lastFocused != null) {
            $(lastFocused).focus();
        } else if (fieldId != null) {
            fieldToFocus = $("#" + fieldId);
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

Method_Avatar = class {

    ImageBase64;

    Start() {
        let ConstroiTela = () => {
            let html = '<div id="corpoCropit" class="image-editor">';
            html += ' <table width="100%">';
            html += "   <tr>";
            html +=
                '     <td colspan="5" style="padding-bottom:20px;" align="center"><div class="cropit-preview"></div></td>';
            html += "   </tr>";
            html += "   <tr>";
            html +=
                '     <td colspan="5" style="padding-bottom:2%; padding-left:5px;">Redimencionar imagem</td>';
            html += "   </tr>";
            html += "   <tr>";
            html +=
                '     <td align="center"><i id="rotate-ccw" class="rotate fas fa-undo-alt"></i></td>';
            html +=
                '     <td align="center"><i id="rotate-cw" class="rotate fas fa-redo-alt"></i></td>';
            html +=
                '     <td align="center"><span class="icone-imagem fas fa-search-minus"></span></td>';
            html +=
                '     <td align="center"><input type="range" class="cropit-image-zoom-input custom" min="0" max="1" step="0.01"></td>';
            html +=
                '     <td align="center"><span style="margin-left:5px;" class="icone-imagem fas fa-search-plus"></span></td>';
            html += "   </tr>";
            html += "   <tr>";
            html +=
                '     <td colspan="5" style="padding-top:10px;" align="center">';
            html += '       <div class="container-fluid" style="float:right;">';
            html += '           <div class="row">';
            html += '             <div class="col-md-12">';
            html +=
                '               <span id="selectArquivo" class="btn btn-primary" type="button"><span class="glyphicon glyphicon-picture"></span> Selecionar nova imagem</span>';
            html +=
                '               <span id="aplicarAvatar" class="btn btn-warning" type="button"><span class="glyphicon glyphicon-check"></span> Aplicar/Visualizar</span>';
            html +=
                '               <span id="salvaAvatar" class="btn btn-success" type="button"><span class="glyphicon glyphicon-floppy-saved"></span> Salvar</span>';
            html += "             </div>";
            html += "         </div>";
            html += "     </div>";
            html +=
                '       <input id="uploadImagem" type="file" class="cropit-image-input input-hidden" accept="image/*">';
            html += "     </td>";
            html += "   </tr>";
            html += " </table>";
            html += "</div>";

            $("#corpoCropit").remove();
            $("#W0015TUPLOAD").append(html);
            $("#TUPLOAD").append(html);
        };
        let GeraCropit = () => {
            $(".image-editor").cropit({
                exportZoom: 1.25,
                imageBackground: true,
                imageBackgroundBorderWidth: 20,
                imageState: {
                    src:
                        "data:image/png;base64,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"
                },
                smallImage: "allow"
            });
        };
        let EventoRolagemMouse = () => {
            $(".cropit-preview").bind("mousewheel", function(event) {
                event.preventDefault();

                let slider = $(".cropit-image-zoom-input");
                let currVal = parseFloat(slider.val());
                let increment =
                    event.originalEvent.wheelDelta > 0 ? 0.1 : 0.1 * -1;
                let newVal = currVal + increment;

                slider.val(newVal);
                slider.trigger("change"); // This triggers the CropIt code for slider/range changes.
            });
        };
        let AcaoBotoes = () => {
            //-- Rolagem da imagem a esquerda
            $("#rotate-cw").click(function(event) {
                event.preventDefault();
                $(".image-editor").cropit("rotateCW");
            });

            //-- Da trigger no input de type file
            $("#selectArquivo").click(function(event) {
                event.preventDefault();
                $("#uploadImagem").trigger("click");
            }),
                //-- Rolagem da imagem a direita
                $("#rotate-ccw").click(function(event) {
                    event.preventDefault();
                    $(".image-editor").cropit("rotateCCW");
                });

            //-- Aplicar e visualizar
            $("#aplicarAvatar").click(function(event) {
                event.preventDefault();

                let imageData = $(".image-editor").cropit("export");
                this.ImageBase64 = imageData;

                gx.fx.obs.notify("Method_UserAvatar.SalvarAvatar");

                $("#previlPerfil1").remove();
                $("#previlPerfil2").remove();

                setTimeout(function() {
                    //-- HTML da div da previa do novo avatar
                    let divPrev =
                        '<div align="center" style="display: block;">';
                    divPrev +=
                        ' <img align="middle" src="' +
                        imageData +
                        '" id="previlPerfil1" alt="Prévia do perfil" class="previa-avatar-quadrado"/>';
                    divPrev +=
                        ' <img style="margin-top:10px;" align="middle" src="' +
                        imageData +
                        '" id="previlPerfil2" alt="Prévia do perfil" class="previa-avatar-redondo"/>';
                    divPrev += "</div>";

                    $("#TAVATAR").append(divPrev);

                    setTimeout(function() {
                        //$("#previlPerfil1").fadeIn();
                        $("#previlPerfil2").fadeIn(700);
                    }, 220);
                }, 215);
            });

            //-- Salvar imagem (Comunicação com GeneXus)
            $("#salvaAvatar").click(function(event) {
                event.preventDefault();

                //-- Remove o input type file (Ocorrendo travamento da tela, então tem que ser removido pós utilizar)
                $("#uploadImagem").remove();

                //-- Executa evento para enviar variavel para o GeneXus
                //-- Necessario ser sozinho pois GeneXus não aceita eventos Server junto a Cliente (Browser)
                gx.fx.obs.notify("Method_UserAvatar.SalvarAvatar");

                //-- Executa o comando de atualizar o avatar
                gx.fx.obs.notify("Method_UserAvatar.ExecutarAlteracao");
            });
        };

        //-- Constroi a tela ao carregar a pagina
        ConstroiTela();

        //-- Gera o plugin Cropit
        GeraCropit();

        //-- Carrega os eventos dos botões
        AcaoBotoes();

        //-- Anexa o evento de rolagem de zoom
        EventoRolagemMouse();
    }

    GetImage(value) {
        value = this.ImageBase64;
        return value;
    }

    SetImage(value) {
        this.ImageBase64 = value;
    }

    SelectImagem() {
        document.getElementById("uploadImagem").click();
        $("#uploadImagem").trigger("click");
    }

    AplicarVisualizar() {
        let imageData = $(".image-editor").cropit("export");
        this.ImageBase64 = imageData;

        $("#previlPerfil1").remove();
        $("#previlPerfil2").remove();

        gx.fx.obs.notify("Method_UserAvatar.SalvarAvatar");

        setTimeout(function() {
            //-- HTML da div da previa do novo avatar
            let divPrev = '<div align="center" style="display: block;">';
            divPrev +=
                ' <img align="middle" src="' +
                imageData +
                '" id="previlPerfil1" alt="Prévia do perfil" class="previa-avatar-quadrado"/>';
            divPrev +=
                ' <img style="margin-top:10px;" align="middle" src="' +
                imageData +
                '" id="previlPerfil2" alt="Prévia do perfil" class="previa-avatar-redondo"/>';
            divPrev += "</div>";

            $("#TAVATAR").append(divPrev);

            setTimeout(function() {
                //$("#previlPerfil1").fadeIn();
                $("#previlPerfil2").fadeIn(700);
            }, 220);
        }, 215);
    }

    Criptografa() {
        gx.O.executeServerEvent("'MD5ECRYPT'", !0, null, !1, !1);
    }

    DisparaAjax() {
        gx.O.executeServerEvent("'EXECUTARAJAX'", !0, null, !1, !1);
    }
};