/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'methodicones\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-Compras': '&#xe90d;',
		'icon-Vendas': '&#xe90e;',
		'icon-Volante': '&#xe909;',
		'icon-ContasAReceberReport': '&#xe905;',
		'icon-Boleto': '&#xe906;',
		'icon-Fatura': '&#xe907;',
		'icon-SituacaoMoney': '&#xe908;',
		'icon-CartaoFidelidadeHome': '&#xe900;',
		'icon-ComprasHome': '&#xe901;',
		'icon-ContasAReceber': '&#xe902;',
		'icon-DashHome': '&#xe903;',
		'icon-Fiscal': '&#xe904;',
		'icon-FiscalHome': '&#xe90a;',
		'icon-Franquias': '&#xe90b;',
		'icon-IconeMethod': '&#xe90c;',
		'icon-OutrasRotinas': '&#xe91f;',
		'icon-Pagamento': '&#xe920;',
		'icon-Payments': '&#xe921;',
		'icon-Placa': '&#xe922;',
		'icon-Programa': '&#xe923;',
		'icon-Report': '&#xe924;',
		'icon-ReportLapis': '&#xe925;',
		'icon-ReportMoney': '&#xe926;',
		'icon-RotinaPreco': '&#xe927;',
		'icon-UserDesconto': '&#xe928;',
		'icon-UserDevedor': '&#xe929;',
		'icon-UserReport': '&#xe92a;',
		'icon-UserReport2': '&#xe92b;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
