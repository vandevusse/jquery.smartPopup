/*!
 * jQuery.smartPopup
 * Copyright (c) 2018 Ben van de Vusse - ben ○ tenzura • com | http://tenzura.com
 * Licensed under MIT
 * https://github.com/flesler/jquery.smartPopup
 * @projectDescription  Behavior based newsletter popup library.
 * @author Ben van de Vusse
 * @version 1.0.0
 */
;(function(factory) {
	'use strict';
	if (typeof module !== 'undefined' && module.exports) {
		// CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Global
		factory(jQuery);
	}
})(function($) {
	'use strict';

	var $smartPopup = $.smartPopup = function(settings) {
		return $(window).smartPopup(settings);
	};

	$smartPopup.defaults = {
		something:'xy'
	};

	$.fn.smartPopup = function(settings) {
		if (typeof settings === 'function') {
			settings = { onAfter:settings };
		}

		settings = $.extend({}, $smartPopup.defaults, settings);

	};

  function setCookie(name, value, days) {
    var expires = "";

    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }

  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

	return $smartPopup;

});
