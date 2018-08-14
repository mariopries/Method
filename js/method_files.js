export let Files = [
    [
        //-- Bibliotecas que sejam utilizadas em arquivos externos para o genexus como o method_custom
        //-- Que utiliza o pnotify e o croppit, são necessário carregar no próprio genexus.
        //-- Causa do problema: Variáveis externas do genexus, executam antes do evento start da página.

        //-- Bibliotecas externas
        {
            src: "jquery.mask.new",
            type: "text/javascript"
        },
        {
            src: "xls-export",
            type: "text/javascript"
        },
        {
            src: "pace-config",
            type: "text/javascript"
        },
        {
            src: "pace",
            type: "text/javascript"
        },
        {
            src: "lodash.min",
            type: "text/javascript"
        },
        //-- Módulos Custom Method
        {
            src: "method_classes",
            type: "module"
        },
        {
            src: "method_util",
            type: "module"
        },
        {
            src: "method_loading",
            type: "module"
        },

        //-- Arquivos Externos
        {
            src: "method_ajax",
            type: "text/javascript"
        }
    ],
    ["method_custom", "switches"]
];
