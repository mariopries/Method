let Files = [

    [
        //-- Bibliotecas que sejam utilizadas em arquivos externos para o genexus como o method_custom
        //-- Que utiliza o pnotify e o croppit, são necessário carregar no próprio genexus.
        //-- Causa do problema: Variáveis externas do genexus, executam antes do evento start da página.


        //-- Bibliotecas externas
        "jquery.mask",
        "xls-export",
        "pace-config",
        "pace",
        
        //-- Funções Custom Method
        "method_loading",

        //-- Arquivos Externos
        "method_menu",
        "method_mobile",
        "method_style",        
        "method_mask",
        "method_onload",
        "method_excel",
        "method_ajax"
    ],
    [
        "shared/method/css/method_custom.css",
        "shared/method/css/switches.css"
    ]
    ];