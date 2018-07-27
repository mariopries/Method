//-- Estrutura de execução de ajax ** Mario 15/06/2018 **
//-- No momento a execução esta chumbada para dar reload na página
//-- Mas isso pode ser parametrizado quando desejar algo especifico

/* ===================== AVISO ===================== */
//-- Esta estrutura está utilizando o plugin PNotify.js
//-- Carregue os arquivos pnotify.custom.min.js e pnotify.custom.min.css
//-- Caso não  quera utilizar o plugin, remova as linhas new PNotify

var Method_Ajax = function(){

    return{

        //-- Executa o ajax com os parametros enviados pelo GeneXus
        Execute : function(type, dataType, contentType, value, url, onSuccess){

            $.ajax({
                                            //-- Exemplos
                type: type,                 //  'POST',
                dataType: dataType,         //  'json',
                contentType: contentType,   //  'application/json; charset=utf-8',
                data: value,                //  {"Data":"ABC"},
                url: url,                   //  'rest/ABC',

                //-- Success: Função que indica que a requisição foi concluida.
                //-- O retorno dela pode ser tratado apartir de parâmetros.
                success: function( data ){

                    if(data = 'OK'){

                        new PNotify({text: onSuccess, type: 'success', styling: 'fontawesome', icons: 'fontawesome4'});
                        setTimeout(function(){
                            window.location.reload();
                        }, 1800);

                    }
                    else{

                        new PNotify({text: data, type: 'error', styling: 'fontawesome', icons: 'fontawesome4'});

                    }

                },

                //-- Error: Função que indica que não foi possível requisitar.
                //-- Por algum motivo como: Parâmetros errados, URL inválida, etc..
                error: function() {

                    new PNotify({text: 'Ocorreu um erro, tente novamente.', styling: 'fontawesome', icons: 'fontawesome4'});

                }

            });

        }

    }

};
