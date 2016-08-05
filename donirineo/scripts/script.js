$(function(){
// IPad/IPhone
	var viewportmeta = document.querySelector && document.querySelector('meta[name="viewport"]'),
    ua = navigator.userAgent,
 
    gestureStart = function () {
        viewportmeta.content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6";
    },
 
    scaleFix = function () {
      if (viewportmeta && /iPhone|iPad/.test(ua) && !/Opera Mini/.test(ua)) {
        viewportmeta.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
        document.addEventListener("gesturestart", gestureStart, false);
      }
    };
scaleFix();
// Menu Android
	var userag = navigator.userAgent.toLowerCase();
	var isAndroid = userag.indexOf("android") > -1; 
	if(isAndroid) {
		$('.sf-menu').responsiveMenu({autoArrows:true});
	}
	
	//	Initialize Pretty Photo
	$("a[data-gal^='prettyPhoto']").prettyPhoto({ theme: 'facebook' });

    // Log Errors if possible
	window.onerror = function (message, file, lineNumber, columnNumber, error) {
	    // We don't want to trigger any errors inside window.onerror, so wrap in a try/catch.
	    try {
	        // Some browsers don't support error param yet.
	        if (error !== undefined) {
	            message = error.stack;
	        }
	        ga && ga('send', 'event', 'error', file + ':' + lineNumber, message);
	    } catch (e) {
	        // no-op
	    }
	};

    // prompt for localized content eg "de-DE"
	var browserLang = navigator.languages
        ? navigator.languages[0]
        : (navigator.language || navigator.userLanguage)
	browserLang = browserLang.toLowerCase();
	var siteLang = $("html").attr("lang").toLowerCase();

	if (browserLang.indexOf(siteLang) == -1)
	{
        var question = "";
        var targetLang = "";
        var targetSite = "";
        if (browserLang.indexOf("de") > -1) {
            question = "Hallo, sprechen Sie deutsch? Übersetzten Inhalt dieser Seite anzeigen.";
            targetLang = "de";
            targetSite = "-de";
        }
        else if (browserLang.indexOf("en") > -1) {
            question = "Hello, do you speak english? Show translated content of this site.";
            targetLang = "en";
            targetSite = "-en";
        }
        else if (browserLang.indexOf("es") > -1) {
            question = "Hola, estas hablando español? Visita la version traducido de esta página.";
            targetLang = "es";
            targetSite = "";
        }

        var languageSwitcher = $("<a hreflang='" + targetLang + "' lang='" + targetLang + "'>" + question + "</a>").attr("href", function () {
            if (siteLang.indexOf("es") != -1) {
                if (window.location.href.indexOf(".html") == -1) {
                    // no .html but maybe hash
                    return window.location.href.replace(window.location.pathname + window.location.hash, window.location.pathname + "index" + targetSite + ".html" + window.location.hash);
                }
                else {
                    // index.html
                    return window.location.href.replace(".html", targetSite + ".html");
                }
            }
            else {
                // index-de.html
                return window.location.href.replace("-" + siteLang + ".html", targetSite + ".html");
            }
        });

        var noteCloser = $("<a id='close'></a>").click(function () { $("#note").remove(); });
        var notification = $("<div class='container_12 show' id='note'><div class='wrapper'>" + languageSwitcher.prop('outerHTML') + "</div></div>");
        notification.mouseenter(function () { $("#note").removeClass("show"); });

        $("body").append(notification.append(noteCloser));
	}
});
