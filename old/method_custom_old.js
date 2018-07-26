	String.prototype.replaceAll = function(search, replacement) {
		var target = this;
		return target.replace(new RegExp(search, 'g'), replacement);
	};
//Coisas do Gx, se não funcionar segue essa ideia
	function maskPhone(evt) {
		field = $(this).find('input');

		field.on('keyup', function (e) {
        		setTimeout($.proxy(function () {
            			if (this.value.length > 14)
                			$(this).mask("(00) 00000-0000");
            			else
                			$(this).mask("(00) 0000-00000");
        		}, this));
    		});
	}
	
	function maskCPF(evt) {
		field = $(this).find('input');

		field.mask('000.000.000-00');
	}

	function maskCNPJ(evt) {
		field = $(this).find('input');

		field.mask('00.000.000/0000-00');
	}
	
	function maskCEP(evt) {
		field = $(this).find('input');

		field.mask('00000-000');
	}
	
	function maskPlaca(evt) {
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
	}
	

	
	function maskDate(evt) {
		field = $(this).find('input');

		field.mask('00/00/0000');
	}
	
	function maskDateTime(evt) {
		field = $(this).find('input');

		field.mask('00/00/0000 00:00');
	}
	
	function disableReadOnlyFields(){
		$(':input[Class*=Readonly]').attr("disabled",true)
	}
	
	var lastFocused;
	$('body').on('focusout', ':input', function(){ lastFocused = this; })
	
	function SetFocus(fieldId) {
		if(fieldId == 'prev' && lastFocused != null){
			$(lastFocused).focus();
		} else if (fieldId != null) {
			fieldToFocus = $('#' + fieldId);
			if(fieldToFocus){
				fieldToFocus.focus();
			}
		} else {
			console.log('false');
		}
	}
	
	function lockTabindex() {
		$.each(this, function () {
			if ($(this).attr('tabindex') != null)
				$(this).attr('window-tabindex', $(this).attr('tabindex'));

			$(this).attr('tabindex', '-99');
		});
	};

	function unlockTabindex() {
		$.each(this, function () {
			if ($(this).attr('tabindex') == '-99') {
				if ($(this).attr('window-tabindex') != null)
					$(this).attr('tabindex', $(this).attr('window-tabindex'));
				else
					$(this).removeAttr('tabindex');
			}

			$(this).removeAttr('window-tabindex');
		});
	};
	


	function Modal(headerText, message, messageType, closeFunction){
		
		
		if(!$('#myModal').get(0)) {
			
			//http://v4-alpha.getbootstrap.com/components/modal/#modaloptions
			
			lockTabindex.call($('*'));
			SetFocus();
			returnFocusTo = lastFocused;
			
			headerClass = '';
			message = message.replaceAll('\n','<br/>')
			
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
				unlockTabindex.call($('*'));
				$('#myModal').remove();
								
				var fn = window[closeFunction];
				if(typeof fn === 'function') {
					fn.call();
				}
				
				SetFocus(returnFocusTo.id);
			});	
			
			$modalHtml.modal();
		}
	}
	
$(function() {
	
	/* Valida quando checkbox marcar/desmarcar todos for alterado */
	$('body').on('focus', '.MaskPhone', function() {
		maskPhone.call($('.MaskPhone'));
	});
	
	$('body').on('focus', '.MaskCPF', function() {
		maskCPF.call($('.MaskCPF'));
	});
	
	$('body').on('focus', '.MaskCNPJ', function() {
		maskCNPJ.call($('.MaskCNPJ'));
	});
	
	$('body').on('focus', '.MaskCep', function() {
		maskCEP.call($('.MaskCep'));
	});
	
	$('body').on('focus', '.MaskPlaca', function() {
		maskPlaca.call($('.MaskPlaca'));
	});
	
	$('body').on('focus', '.MaskDate', function() {
		maskDate.call($('.MaskDate'));
	});
	
	$('body').on('focus', '.MaskDateTime', function() {
		maskDateTime.call($('.MaskDateTime'));
	});
	
	$('body').on('mouseover', '.ErrorMessages', function(){$(this).parent().hide(false)})


	/* Valida quando checkbox marcar/desmarcar todos for alterado */
	$('body').on('change', '#selectAllCheckboxGrid', function(evt) {
		//method_executar_evento('W0013', true, 'TESTE');
	});
	
	/* Chama a função que irá aguardar carregar gxErrorViewer */
	//AguardaCarregargxErrorViewer();
	/*
		DOMNodeInserted
	*/
		
		//$('body').on('DOMNodeInserted', '#gxErrorViewer div', function(evt) {
		$('body').on('DOMNodeInserted', 'span[id*="gxErrorViewer"]', function(evt) {
			var id = "";
			if (evt.currentTarget != null)
			{
				id = evt.currentTarget.id;
			}
			
			
			if(id.indexOf("gxErrorViewer") >= 0)
			{
				
				// ClasseMsg
				if( evt.target.textContent.indexOf("#Javascript=#ClasseMsg=") == 0 ){

					var classe = evt.target.textContent.replace("#Javascript=#ClasseMsg=", "");
					var idObj  = $(evt.target.parentElement).find('.gx-warning-message').get($(evt.target.parentElement).find('.gx-warning-message').index(evt.target)-1);
					
					evt.target.remove();
					method_alterar_classe(idObj, classe);
					
				}
				
				// Comando Custom
				if( evt.target.textContent.indexOf("#Javascript=") == 0 ){
					var comando = evt.target.textContent.replace("#Javascript=", "");
					
					evt.target.remove();
					window.eval(comando);
				}
			
			}
		
		});
		
		
	//caso exista algo já inserido junto ao gxErrorViewer, irá recriá-lo
	var recriar = $('#gxErrorViewer').children().remove();
	recriar.appendTo($('#gxErrorViewer'));			
		
	/*
		MouseOver GPXMENU1_MPAGEContainer
	*/
	$('#GPXMENU1_MPAGEContainer').on('mouseover', 'li.has-submenu, li', function() {
		
		$("li.has-submenu").css('background-color','#3BB16F');
		
		if( $(this).attr('class') == 'has-submenu' ){
			$(this).css('background-color','#299057');
		}
		
	}); 
	
	

});



/*
	 
	 *
	 * FUNÇÕES
	 *
	 
	*/
	
	
	/*
		Alterar classes css
	*/
	function method_alterar_classe(id, classe){
		$(id).attr('class','')
		$(id).toggleClass(classe);
	}
	
	function method_setar_evento(evento){
		GX_setevent("E\'"+evento+"\'.");
		gxSubmit();
	}
	
	/*
		Executar evento no genexus
	*/
	function method_executar_evento(evento){
		var comando = 'E\''+evento+'\'.';
		gx.evt.execEvt(comando,this)
	}
	