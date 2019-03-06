/*!
 * jQuery.smartPopup
 * Copyright (c) 2018 Ben van de Vusse - ben ○ tenzura • com | http://tenzura.com
 * Licensed under MIT
 * https://github.com/vandevusse/jquery.smartPopup
 * @projectDescription  Behavior based newsletter popup library.
 * @author Ben van de Vusse
 * @version 1.0.2
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

  if (typeof $.fn['smartPopup'] !== 'undefined') {
    $.error('smartPopup plugin has already been initialized');
    return;
  }

	var $smartPopup = $.smartPopup = function(settings) {
		return $(window).smartPopup(settings);
	};

	var defaults = {
		  pageViews: '',
      timeOnSite: '',
      utmSource: '',
      snoozeWaitInDays: 7
	  },
    initCalled = false,
    user = {},
    settings = {};

  var methods = {
      init : function(requestedSettings) {
        if(initCalled) {
          return;
        }
    		settings = $.extend({}, $smartPopup.defaults, requestedSettings);
        initCalled = true;

        user = getUserCookie();

        if(user === null) {
          user = {
            views: 1,
            initAt: (new Date()).getTime(),
            registered: false,
            snoozed: false
          }
        } else {
          user.views++;
        }

        setUserCookie(user);

        // if user is a known to be registered, exit
        if(user.registered) return;

        // test if user has a known utm source, and save user as registered if so
        if(settings.utmSource) {
           var utmRegex = new RegExp('utm_source='+escapeRegExp(settings.utmSource.toLowerCase()));
           if(utmRegex.test(location.search.toLowerCase())) {
             user.registered = true;
             setUserCookie(user);
             return;
           }
        }

        // test to see if user has set a snooze expiry
        if(isSnoozeExpired(user, settings)) {
          user.snoozed = false;
          setUserCookie(user);
        }
      },
      register : function( ) {
					user.registered = true;
					setUserCookie(user);
      },
      unregister : function( ) {
					user.registered = false;
					setUserCookie(user);
      },
      isRegistered : function( ) {
					return user.registered;
      },
      snooze : function( ) {
          user.snoozed = (new Date()).getTime();
          setUserCookie(user);
      },
      status : function( ) {
        if(user.registered) return "User is a known to be registered";
        if(user.snoozed) return "User has snoozed notifications";
        if(!methods.canShow()) return "User has not met the criteria to show the notification";
        return "User is able to be shown notifications";
      },
      canShow : function( ) {
        if(user.registered || user.snoozed) return false;

        if(settings.pageViews && settings.timeOnSite) {
          var hasEnoughPageViews = settings.pageViews <= user.views;
          var hasEnoughTimeOnSite = settings.timeOnSite <= getSecondsSinceInitialVisit();
          return hasEnoughPageViews || hasEnoughTimeOnSite;
        } else if (settings.pageViews) {
          return settings.pageViews <= user.views;
        } else if (settings.timeOnSite) {
          return settings.timeOnSite <= getSecondsSinceInitialVisit();
        } else {
          return true;
        }
      }
  };

  $.fn.smartPopup = function(methodOrOptions) {
    if ( methods[methodOrOptions] ) {
        return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
        // Default to "init"
        return methods.init.apply( this, arguments );
    } else {
        $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.smartPopup' );
    }

  };
  
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  function getSecondsSinceInitialVisit() {
    if(!user || !user.initAt) return 0;

    var currentTime = (new Date()).getTime();

    return (currentTime - user.initAt) / 1000;
  }

  function isSnoozeExpired(user, settings) {
    if(!user || !user.snoozed) return false;

    var snoozeExpiry = new Date(user.snoozed + (settings.snoozeWaitInDays * (1000*60*60*24.0)));

    return (new Date()) > snoozeExpiry;
  }

  function setUserCookie(value) {
    var encodedValue = JSON.stringify(value);
    document.cookie = "_jqsmartpopup=" + (encodedValue || "")  + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
  }

  function getUserCookie() {
    var nameEQ = "_jqsmartpopup="
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) {
        var rawValue = c.substring(nameEQ.length,c.length);
        return JSON.parse(rawValue);
      }
    }
    return null;
  }

  function deleteUserCookie() {
    document.cookie = "_jqsmartpopup=; expires=Fri, 31 Dec 1999 23:59:59 GMT; path=/";
  }

	return $smartPopup;

});
