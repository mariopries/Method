var controle = false;
var text;

var Method_Custom = function(){

	//-- Carrega a primeira vez com a função de relocar menu
	$(function() {

		//--Inibe os efeitos de realizar um scroll maior do que a tela - mobile
		document.body.style.overscrollBehavior = 'contain'

		//-- Ajusta menu ao recarregar a pagina
		MenuRecarregaPagina();

		//-- Esta função é um agrupamento de funções que são disparadaso resize da pagina.
		$(window).resize(function(){
			ResizeWindow();
		});

		//-- A cada painel que estiver com Collapse true que for clicado
		//-- Sera inicializado o redimencionamento de para Graficos
		EditaPainelCollapsed();		

		//-- Chama funções iniciais
		MenuReload();

		//-- Funções para serem carregadas após a página carregar (APENAS UMA VEZ)
		$(window).load(function(){

			//-- Verifica se não foi gerada a zona de toque e cria uma - mobile
			if (!controle) {
				controle = true;
				menuTouch('MAINFORM'); //Passar local para zona de toque - mobile (TELA TODA/TOUCH DO MENU)

				//-- Inicializa apenas uma vez ao carregar a pagina
				//-- Pode ser chamada qualquer função para carregar apenas uma vez
				$(window).load(function() {
					InseriIconesCollapse();
				});				
			};

		});


		//-- Função do pace.
		//-- Mostra conteudo após o carregamento completo da página
		// Pace.on("done", function () {
		// 	$("#TABLECONTENT_MPAGE").fadeIn(200);
		// 	RedefineGraficos();
		// });

		//-- Gambiarra, se possível achar outra forma
		//-- Corrige scroll do menu na rotação de tela - mobile
		//-- Precisa do timer -- DESCOBRIR PQ --
		$( window ).on( "orientationchange", function( event ) {
			setTimeout( function(){
				MenuReload();
			}, 50);
		});


	});


	//-- Variáveis
	var lastFocused, timerVar, timerSubmenu, filho, irmao, pai, neto;

	//-- Agrupa as funções que devem ser disparadas no resize da tela
	function ResizeWindow() {
		MenuRedefineTamanho();
		RedefineGraficos();
	}

	//-- Função que adiciona icones zoom em painels com collapse
	//-- É chamada apenas uma vez com uma variavel de controle neste arquivo
	function InseriIconesCollapse() {
		$("a.accordion-toggle").each( function() {
			if($(this).hasClass("collapsed")){
				$(this).append('<i style="float: right;" class="fas fa-search-plus"></i>');
			}else {
				$(this).append('<i style="float: right;" class="fas fa-search-minus"></i>');
			}
		});
	}	

	//-- Muda os icones de acordo com a situação do collapse
	function EditaPainelCollapsed() {
		$('body').on('click', 'a.accordion-toggle', function() {
			let icon = $(this).children("i");
			if ($(this).hasClass("collapsed")){
				icon.removeClass("fa-search-minus");
				icon.addClass("fa-search-plus");
			}else{
				icon.removeClass("fa-search-plus");
				icon.addClass("fa-search-minus");
			}
			RedefineGraficos();
		});
	}

	//-- Função para reajustar tamanho dos graficos
	//-- Para que o código funcione, é necessário adicionar a classe "DataContentCell" ao UserControl
	function RedefineGraficos() {

		let Graficos = $(".highcharts-root");
		let UserControlGrafico;
		let DivUserControl;
		let TamanhoDivUserControl;
		setTimeout(function(){
			$(Graficos).each( function() {
				UserControlGrafico = $(this).closest(".gx_usercontrol");
				DivUserControl = UserControlGrafico.closest("div.DataContentCell");

				if(DivUserControl != null){

					TamanhoDivUserControl = (DivUserControl.outerWidth(false) - 10) + 'px';

					UserControlGrafico.css("marginLeft", "-10px").css("height", "auto").stop().animate({width:TamanhoDivUserControl}, 200);
					$(this).css("marginLeft", "0px").css("height", "auto").stop().animate({width:TamanhoDivUserControl}, 200);
				}
			});
		},215);
	}

	//-- Recalcula tamanhos/margens do menu e cria timer de estadia do menu
	function MenuReload() {

		MenuRedefineTamanho();

		//--Corrige posição do footer/content e scroll do menu
		if ($("#sidebar").hasClass('menu-compact')){
			$(".page-content.MasterFooterCellFixedVM").addClass('menu-compact');
		}

		$('#sidebar_ul').children("li").click(function() {
			MenuRedefineTamanho();
		});

		$('#SHOWMENU_MPAGE').click(function() {
			MenuRedefineTamanho();
		});

		//-- Funções que precisam esperar tudo carregar
		setTimeout(function(){

			//-- Quando o mouse sai do item do menu compacto inicia o timer
			$('#sidebar').children('.sidebar-menu').children('li').children('.submenu').mouseleave(function() {
				MenuTimerHide(this);
			});

			//-- Quando o mouse entra no item do menu compacto para o timer
			$('#sidebar').children('.sidebar-menu').children('li').children('.submenu').mouseover(function() {
				StopTimer(timerSubmenu);
			});

		}, 50);

	}

	//-- Controle da zona de toque do menu
	function menuTouch(local) {
		let pageWidth = window.innerWidth || document.body.clientWidth;
		let treshold = Math.max(1,Math.floor(0.1 * (pageWidth)));
		let touchstartX = 0;
		let touchstartY = 0;
		let touchendX = 0;
		let touchendY = 0;
		let resolutionX = window.innerWidth;
		let resolutionY = window.innerHeight;

		const limit = Math.tan(45 * 1.5 / 180 * Math.PI);
		const gestureZone = document.getElementById(local);

		gestureZone.addEventListener('touchstart', function(event) {
			touchstartX = event.changedTouches[0].pageX;
			touchstartY = event.changedTouches[0].pageY;
		}, false);

		gestureZone.addEventListener('touchend', function(event) {
			touchendX = event.changedTouches[0].pageX;
			touchendY = event.changedTouches[0].pageY;
			handleGesture(event);

		}, false);

		function handleGesture(e) {
			let x = touchendX - touchstartX;
			let y = touchendY - touchstartY;
			let xy = Math.abs(x / y);
			let yx = Math.abs(y / x);
			if (Math.abs(x) > treshold || Math.abs(y) > treshold) {
				if (yx <= limit) {
					if ((touchstartX < resolutionX/10 && touchendX>touchstartX) || (touchendX<touchstartX)){
						if (x < 0) {
							console.log("left");

							ucSidebar.Collapse();
						} else {
							console.log("right");
							ucSidebar.Expand();

						}
					} else {
						console.log('invalid');
					}
				}
				if (xy <= limit) {
					if ((touchstartY < 50 && touchendY>touchstartY) || (touchendY<touchstartY)){
						if (y < 0) {
							console.log("top");

							if (document.getElementById('DDO_ADMINAG_MPAGEContainer').classList.contains('open')) {

								$('ul.dropdown-menu').animate({height:'toggle'},200);

								$('ul.dropdown-menu').queue(function() {
									$('ul.dropdown-menu').css('visibility','hidden');
									document.getElementById('DDO_ADMINAG_MPAGEContainer').classList.remove('open');
									$('ul.dropdown-menu').dequeue();
									});
							}
						} else {
							$('#DDO_ADMINAG_MPAGEContainer > .dropdown-menu').css('left','unset');
							$('#DDO_ADMINAG_MPAGEContainer > .dropdown-menu').css('right','0');
							$('.btn-group').css('position','unset');
							$('.dropdown-menu').css('width','50%');
							$('.dropdown-menu').css('overflow','hidden');

							console.log("bottom");

							if (! document.getElementById('DDO_ADMINAG_MPAGEContainer').classList.contains('open')) {
								$('ul.dropdown-menu').css('visibility','visible');
								$('ul.dropdown-menu').animate({height:'toggle'},200);
								$('ul.dropdown-menu').queue(function() {
									document.getElementById('DDO_ADMINAG_MPAGEContainer').classList.add('open');
									$('ul.dropdown-menu').dequeue();
								});
							}
						}
					} else {
						console.log('invalid');
					}

				}
			} else {
				console.log("tap");
			}
		}
	}

	//-- Limpa o menu compacto de styles

	function MenuClear(pai,filho,irmao){
		filho.style = pai.style = irmao.style = '';
	}

	//-- Timer de controle do delay dos submenus compactos

	function MenuTimer(pai,filho,irmao){
		timerSubmenu = setTimeout(function(){
			MenuClear(pai,filho,irmao)
		},1000)
	}

	//-- Para um timeout

	function StopTimer(timerVar) {
		clearTimeout(timerVar);
	}

	//-- Delay de exibição do menu compacto responsivo

	function MenuTimerHide(filho) {

		pai = filho.parentNode,	irmao = filho.parentNode.firstChild.childNodes[1], neto = filho.firstChild, neto = $(neto).children('.open').lastChild;

		if(document.getElementById('sidebar_ul').parentNode.className == 'page-sidebar sidebar-fixed menu-compact sidebarmenu-transtion'||document.getElementById('sidebar_ul').parentNode.className == 'page-sidebar sidebar-fixed sidebarmenu-transtion menu-compact') {
			if(document.querySelectorAll('neto').length > 0){
				neto.style.setProperty('display', 'block', 'important');
			}

			filho.style.setProperty('display', 'block', 'important');
			irmao.style.setProperty('display', 'block', 'important');
			irmao.style.setProperty('width', 'max-content', 'important');
			var largura = $(irmao).outerWidth(true) + 25;
			irmao.style.setProperty('width', largura + 'px', 'important');
			filho.style.setProperty('padding-top', '38px', 'important');
			filho.style.setProperty('background-image', 'linear-gradient(to bottom, #004000, #004000),linear-gradient(to bottom, #002700, #2c3b41)', 'important');
			filho.style.setProperty('background-clip', 'content-box,padding-box', 'important');

			MenuTimer(pai,filho,irmao);

			$('.menu-dropdown').mouseenter(function(){
				filho.style = pai.style = irmao.style = '';
			});

			$('#LAYOUTMAINTABLE_MPAGE').click(function(){
				filho.style = pai.style = irmao.style = '';
			});
		}

	}


	//-- Redefine o tamanho do menu
	function MenuRedefineTamanho() {

		var sidebar_ul = document.getElementById('sidebar_ul');

		if (document.getElementsByClassName('slimScrollDiv').length == 1){
			document.getElementsByClassName('slimScrollDiv')[0].style.setProperty('overflow', 'auto', 'important');
		}
		if ( sidebar_ul != null && window.innerWidth <= 768){
			sidebar_ul.style.setProperty('overflow', 'hidden', 'important');
			document.getElementById('sidebar_ul').style.setProperty('height', 'unset', 'important');
		}
		$('.slimScrollDiv').css('height', '100vh - 186px');
		$('#HEADER_MPAGE').css('paddingLeft', 'calc(50vw - 50%)' );

		setTimeout(function(){

			if ($('.page-sidebar').is(":visible") && window.innerWidth <= 768) {
				return 0;
			}else if ($('.page-sidebar').is(":visible") && window.innerWidth > 768){
				var largura = ($('#sidebar').outerWidth(true) - 1) + 'px';
			}else {
				var largura = 0;
			}

			$('#TABLECONTENT_MPAGE').css('marginLeft', largura);

			$('#TEXTBLOCKTITLE_MPAGE').css('marginLeft', 0);
			$(".CellTitleMasterFixed").stop().animate({marginLeft:largura}, 200);

			//-- Grava na session o novo valor da variavel
			sessionStorage.setItem('WidthMenu', largura);

			RedefineGraficos();

		}, 215);
	}



	//-- Função de recarregar menu
	function MenuRecarregaPagina() {


		var MenuWidth = sessionStorage.getItem("WidthMenu");

		if(MenuWidth != null){
			//-- Recebe valor da session se existir
			var largura = MenuWidth;
			$('#TABLECONTENT_MPAGE').css('marginLeft', largura);
			$('#TEXTBLOCKTITLE_MPAGE').css('marginLeft', 0);
			$('.CellTitleMasterFixed').css('marginLeft', largura);
		}
	}

	//-- Inicializa Variáveis e Funções
	$('body').on('focusout', ':input', function(){ lastFocused = this; })

	//-- Mask -- INÍCIO --
		//MaskPhone
		$('body').on('focus', '.MaskPhone', function() {
			field = $(this).find('input');
			field.on('keyup', function (e) {
				setTimeout($.proxy(function () {
						if (this.value.length > 14)
							$(this).mask("(00) 00000-0000");
						else
							$(this).mask("(00) 0000-00000");
				}, this));
			});
		});


		//MaskCPF
		$('body').on('focus', '.MaskCPF', function() {
			field = $(this).find('input');
			field.mask('000.000.000-00');
		});


		//MaskCNPJ
		$('body').on('focus', '.MaskCNPJ', function() {
			field = $(this).find('input');
			field.mask('00.000.000/0000-00');
		});


		//MaskCep
		$('body').on('focus', '.MaskCep', function() {
			field = $(this).find('input');
			field.mask('00000-000');
		});


		//MaskPlaca
		$('body').on('focus', '.MaskPlaca', function() {
			field = $(this).find('input');
			field.mask('SSS-0000', {
				'translation': {
					S: {pattern: /[A-Za-z]/},
					0: {pattern: /[0-9]/}
				}
				,onKeyPress: function (value, event) {
					event.currentTarget.value = value.toUpperCase();
				}
			});
		});



		//MaskDate
		$('body').on('focus', '.MaskDate', function() {
			field = $(this).find('input');
			field.mask('00/00/0000');
		});


		//MaskDateTime
		$('body').on('focus', '.MaskDateTime', function() {
			field = $(this).find('input');
			field.mask('00/00/0000 00:00');
		});
	//-- Mask -- FIM --


	//-- Funções select grid

	$('body').on('click', 'input[id*="vGRIDSELECTED"]', function(evt) {
		gx.fx.obs.notify("CalcularGrid");
	});


	$('body').on('click', 'input[name*="selectAllCheckboxGrid"]', function(evt) {
		gx.fx.obs.notify("CalcularGrid");
	});


	$(window).bind('beforeunload', function() {
		if (!$(".gx-mask")[0]) {
		  $("body").append("<div class='gx-mask'></div>");
		}
	});


	return {


		// session store
		GetSessionStorage : function(key) {
			return sessionStorage.getItem(key);
		},


		SetSessionStorage : function(key, value){
			sessionStorage.setItem(key, value);
		},


		RemoveSessionStorage : function(key){
			sessionStorage.removeItem(key);
		},



		// local store
		// GetLocalStorage (key) {
			// return localStorage.getItem(key);
		// },


		SetLocalStorage : function(key, value){
			localStorage.setItem(key, value);
		},


		RemoveLocalStorage : function(key){
			localStorage.removeItem(key);
		},



		ExecutaComando : function(comando){
			eval(comando);
		},


		ConsoleLog : function(value){
			console.log(value)
		},


		LoaderExecute : function(executar){
			if(executar){
				if (!$(".gx-mask")[0]) {
				  $("body").append("<div class='gx-mask'></div>");
				}
			}
			else{
				if ($(".gx-mask")[0]) {
				  $(".gx-mask").remove();
				}
			}


		},


		Alert : function(message){
			alert(message);
		},


		CSSClasse : function(idObjeto, tipo, classe){
			object = $('#' + idObjeto);
			switch(tipo) {
				case "add":
					object.addClass(classe);
					break;
				case "remove":
					object.removeClass(classe);
					break;
				}
		},


		Reload : function(forceGet){
			location.reload(forceGet);
		},


		MenuReload : function(){


			MenuRedefineTamanho();


			$('#sidebar_ul').children( "li" ).click(function () {
				MenuRedefineTamanho();
			});

			$('#SHOWMENU_MPAGE').click(function () {
				MenuRedefineTamanho();
			});

			$('#sidebar').children('.sidebar-menu').children('li').children('.submenu').mouseleave(function(){
				MenuTimerHide(this);
			});

			$('#sidebar').children('.sidebar-menu').children('li').children('.submenu').mouseover(function(){
				StopTimer(timerSubmenu);
			});

		},

		Msg : function(message, messageType){

			var node = document.createElement("div");
			var textnode = document.createTextNode(message);
			node.appendChild(textnode);


			switch(messageType) {
				case "Erro":
					msgClass = 'gx-error-message'
					break;
				case "Info":
					msgClass = 'gx-info-message'
					break;
				case "Alerta":
					msgClass = 'gx-warning-message'
					break;
				case "Sucesso":
					msgClass = 'gx-sucess-message'
					break;


				default:
					msgClass = 'gx-warning-message'
					break;
				}


			$(node).toggleClass(msgClass)
			document.getElementById("gxErrorViewer").appendChild(node);


		},


		AlterarValorCampo : function(id, value){
			$(eval(id))[0].value = value;
		},


		AlterarValorCampoGrid : function(id, value){
			id = id + '_' + window.gx.currentRows.pop()
			$(eval(id))[0].value = value;
		},


		HideShow : function(id, command){


			object = $('#' + id);
				if(object){
					switch(command) {
					case "hide":
						object.hide();
						break;
					case "show":
						object.show();
						break;
					}


				}
		},


		SetFocus : function(fieldId) {
			if(fieldId == 'prev' && lastFocused != null){
				$(lastFocused).focus();
			} else if (fieldId != null) {
				fieldToFocus = $('#' + fieldId);
				if(fieldToFocus){
					fieldToFocus.focus();
				}
			}
		},


		StringReplace : function(message, search, replacement) {
			return message.replace(new RegExp(search, 'g'), replacement);
		},


		PNotify : function(msgnotify){
			eval(msgnotify);
		},



		Modal : function(headerText, message, messageType){


			if(!$('#myModal').get(0)) {


				//http://v4-alpha.getbootstrap.com/components/modal/#modaloptions


				if ($('#myModal').attr('tabindex') != null){
					$('#myModal').attr('window-tabindex', $(this).attr('tabindex'));
				}
				$(this).attr('tabindex', '-99');

				returnFocusTo = lastFocused;


				headerClass = '';
				message = this.StringReplace(message, '\n','<br/>');


				switch(messageType) {
					case "Erro":
						headerClass = 'alert-danger'
						break;
					case "Info":
						headerClass = 'alert-info'
						break;
					case "Alerta":
						headerClass = 'alert-warning'
						break;
					case "Sucesso":
						headerClass = 'alert-success'
						break;


					default:
						headerClass = 'alert-info'
						break;
				}


				modalHtml = '<div class="modal fade" id="myModal" role="dialog">';
				modalHtml +='	<div class="modal-dialog">';
				modalHtml +='		<div class="modal-content">';
				modalHtml +='			<div class="modal-header ' + headerClass + '" style="border-top-left-radius: 6px; border-top-right-radius: 6px; font-size: 15px;">';
				modalHtml +='				<button type="button" class="close" data-dismiss="modal">&times;</button>';
				modalHtml +='				<h4 class="modal-title">' + headerText + '</h4>';
				modalHtml +='			</div>';
				modalHtml +='			<div class="modal-body" style="font-size: 12px; padding: 20px; ">';
				modalHtml +='				<p>' + message + '</p>';
				modalHtml +='			</div>';
				modalHtml +='			<div class="modal-footer">';
				modalHtml +='				<button id="btnFecharAlerta" focused="true" type="button" class="btn btn-default Button" data-dismiss="modal">Fechar</button>';
				modalHtml +='			</div>';
				modalHtml +='		</div>';
				modalHtml +='	</div>';
				modalHtml +='</div>';


				var $modalHtml = $(modalHtml);


				$('body').append($modalHtml);


				$modalHtml.on('shown.bs.modal', function (e) {
					$modalHtml.find('[focused]').focus();
				});


				$modalHtml.on('hidden.bs.modal', function (e) {

					if ($('#myModal').attr('tabindex') == '-99') {
						if ($('#myModal').attr('window-tabindex') != null)
							$('#myModal').attr('tabindex', $(this).attr('window-tabindex'));
						else
							$('#myModal').removeAttr('tabindex');
					}
					$('#myModal').removeAttr('window-tabindex');
					$('#myModal').remove();


					$(returnFocusTo).focus()


				});


				$modalHtml.modal();
			}
		}


	}

};
