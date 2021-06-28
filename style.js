(function (blink) {
	'use strict';

	var ModernStyle = function () {
			blink.theme.styles.basic.apply(this, arguments);
		},
		page = blink.currentPage;

	ModernStyle.prototype = {
		//BK-15873 añadimos el estilo basic como parent para la herencia de los estilos del CKEditor
		parent: blink.theme.styles.basic.prototype,
		bodyClassName: 'content_type_clase_CustomNewStyle',
		extraPlugins: ['image2'],
		ckEditorStyles: {
			name: 'CustomNewStyle',
			styles: [

				{ name: 'Título de la Unidad', element: 'h4', attributes: { 'class': 'bck-title2'} },
				{ name: 'Subtítulo Unidad', element: 'h4', attributes: { 'class': 'bck-title3'} },

				{ name: 'Énfasis', element: 'span', attributes: { 'class': 'bck-enfasis' }},
				
				{ name: 'Lista Tick', element: 'ul', attributes: { 'class': 'bck-ul'} },
				{ name: 'Lista Info', element: 'ul', attributes: { 'class': 'bck-ul-2'} },
				{ name: 'Lista Título ppal del tema', element: 'ol', attributes: { 'class': 'bck-ol bck-ol-1' } },
				{ name: 'Lista Ordenada azul', element: 'ol', attributes: { 'class': 'bck-ol bck-ol-2' } },
				{ name: 'Lista Ordenada amarilla', element: 'ol', attributes: { 'class': 'bck-ol bck-ol-3' } },
			

				{ name: 'Tabla', element: 'table', type: 'bck-stack-class', attributes: { 'class': 'bck-table-center'} },
				{ name: 'Celda 1', element: 'td', attributes: { 'class': 'bck-td' } },
				{ name: 'Celda 2', element: 'td', attributes: { 'class': 'bck-td2' } },
				
				{ name: 'Icono Ordenador', element: 'span', attributes: { 'class': 'icon icon-ordenador' } },
				{ name: 'Icono Bombilla', element: 'span', attributes: { 'class': 'icon icon-bombilla' } },
				{ name: 'Icono Química', element: 'span', attributes: { 'class': 'icon icon-quimica' } },
				{ name: 'Icono Birrete', element: 'span', attributes: { 'class': 'icon icon-birrete' } },
				{ name: 'Icono libro', element: 'span', attributes: { 'class': 'icon icon-libro' } },
				{ name: 'Icono Lápiz', element: 'span', attributes: { 'class': 'icon icon-lapiz' } },

				{ name: 'Caso Práctico', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-1' } },
				{ name: 'Caja Autoevaluación', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-2' } },
				{ name: 'Caja Compresión:', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-3' } },
				{ name: 'Caja Recuadros opcionales', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-4' } }
			]
		},

		init: function () {
			//BK-15873 Utilizamos this.parent declarada al inicio de la clase
			this.parent.init.call(this);
			this.addActivityTitle();
			if(window.esWeb) return;
			this.addPageNumber();
			this.formatCarouselindicators();
			this.addSlideNavigators();
		},

		removeFinalSlide: function () {
			//BK-15873 Utilizamos this.parent declarada al inicio de la clase
			this.parent.removeFinalSlide.call(this, true);
		},

		addActivityTitle: function () {
			if (!blink.courseInfo || !blink.courseInfo.unit) return;
			$('.libro-left').find('.title').html(function () {
				return $(this).html() + ' > ' + blink.courseInfo.unit;
			})
		},
		
		configEditor: function (editor) {
			editor.dtd.$removeEmpty['span'] = false;
		},

		addPageNumber: function() {
			$('.js-slider-item').each(function(i,e) {
				var idPage = $(e).attr('id');
				var page = parseInt(idPage.replace("slider-item-", ""))+1;
				$(e).find('.header').prepend('<div class="single-pagination"><div class="page">'+page+'</div></div>');
			});
		},


		formatCarouselindicators: function () {
			var $navbarBottom = $('.navbar-bottom'),
				$carouselIndicators = $('.slider-indicators').find('li');
			$navbarBottom.find('li').tooltip('destroy');

			var dropDown = '' +
					'<div class="dropdown">' +
						'<button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" role="button" aria-expanded="false">' +
							'Índice' +
							'<span class="caret"></span>' +
						'</button>' +
						'<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">';

			var navigatorIndex = 0;
			for (var index = 0; index < window.secuencia.length; index++) {
				var slide = eval('t'+index+'_slide'),
					slideTitle = slide.title;

				if (slide.isConcatenate) continue;

				dropDown += '<li role="presentation"><a role="menuitem">' + (navigatorIndex+1) + '. ' + stripHTML(slideTitle) + '</a></li>';
				$navbarBottom.find('li').eq(navigatorIndex).html('<span title="'+ stripHTML(slideTitle) +'">'+(navigatorIndex+1)+'</span>');
				navigatorIndex++;

			};

			dropDown += '' +
						'</ul>' +
					'</div>';

			$navbarBottom
				.attr('class', 'publisher-navbar')
				.wrapInner('<div class="navbar-content"></div>')
				.find('ol')
					.before(dropDown)
					.wrap('<div id="top-navigator"/>')
					.end()
				.find('.dropdown').find('li')
					.on('click', function (event) {
						$navbarBottom.find('ol').find('li').eq($(this).index()).trigger('click');
					});

			if (!blink.hasTouch) {
				$navbarBottom
					.find('ol').find('span')
						.tooltip({
							placement: 'bottom',
							container: 'body'
						});
			}
		},

		//BK15873 Quitamos la funcion getEditorStyles para que herede de parent
	};

	ModernStyle.prototype = _.extend({}, new blink.theme.styles.basic(), ModernStyle.prototype);

	blink.theme.styles.CustomNewStyle = ModernStyle;

})( blink );

$(document).ready(function () {

    $('.item').find('.header').find('.title')
		.filter(function () {
			return $(this).find('.empty').length;
		}).hideBlink();

    $('.item').find('.header').find('.title')
		.filter(function () {
			return !$(this).find('.empty').length;
		})
		.each(function () {
			var $header = $(this).find('h3');
			$header.length && $header.html($header.html().replace(' ', ''));
		});

	// BK-8433 cambiamos el logo de las slides por el del dominio
	var src_logo = $('.content_type_clase_CustomNewStyle').find('.logo_slide').attr('logo_dominio');
	if (typeof(src_logo) != 'undefined' && src_logo && src_logo != '' && src_logo.indexOf('gif1x1.gif') == -1) {
		$('.content_type_clase_CustomNewStyle').find('.logo-publisher').css('background-image', "url('"+src_logo+"')");
	}
});
