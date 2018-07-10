/* ----Special----
  theme_array - loaded from server (holds theme count for badges)
*/

/* ----Cycript Functions----
  updateWeather
  openURL
  saveURL
  readDict
  setLSWall
  setSBWall
*/

/* ----Other js files----
  showSVG - svg.js
  loadClock - clock.js
  systemdivs - system.js
  miscDivs - system.js
  wlib - weather.js
  weather - weather.js
  loadPage - themes.js
*/

/* ---settings from setup.js----
  options.nowall
  setsbwall
  options.disableweather
  weatherrefresh
  options.nooverlay
*/

/* ----- JSLINT STOP YELLING AT ME ----- */

/*jslint plusplus: true */

/*global
  options,
  alert,
  updateWeather,
  showSVG,
  theme_array,
  openURL,
  saveURL,
  readDict,
  optionsnowall,
  setLSWall,
  setsbwall,
  setSBWall,
  loadClock,
  systemdivs,
  miscDivs,
  optionsdisableweather,
  weatherrefresh,
  wlib,
  weather,
  optionsnooverlay,
  loadPage
*/

"use strict";

var action = {};
action.themeList = [];
action.themePosition = 0;
action.savedElements = {};
action.loadedFonts = [];
action.newThemes = [];
action.containsWeather = false;
action.settingIcons = ['load', 'reset', 'refresh', 'settings', 'download'];


action.setOverlay = function (img) { //apply overlay to screenoverlay
    setTimeout(function () {
        var screenOverDiv, svgdiv;
        screenOverDiv = document.createElement('div');
        screenOverDiv.className = 'screenOverlay';
        screenOverDiv.style.backgroundImage = 'url(' + img + ')';
        document.body.appendChild(screenOverDiv);
        if(iPhoneX){
            //screenOverDiv.style.top = "50px";
        }
        if (img.split(';')[0].split('/')[1].split('+')[0] === 'svg') {
            action.loadjsfile("js/svg.js");
            svgdiv = document.createElement('img');
            svgdiv.className = 'svg';
            svgdiv.style.display = 'none';
            svgdiv.style.opacity = '0';
            svgdiv.src = img;
            document.body.appendChild(svgdiv);
        }
    }, 0);
};

action.isWeather = function (id) {
    if (action.containsWeather === false) {
        var weather = ['lngwstring', 'lngwstring2', 'lngwstring3', 'lngwstring4', 'lngwstring5', 'temp', 'tempdeg', 'tempdegplus', 'high', 'highdeg', 'highdegplus', 'low', 'lowdeg', 'lowdegplus', 'highdashlow', 'highslashlow', 'highdashlowdeg', 'highslashlowdeg', 'city', 'condition', 'humidity', 'windchill', 'wind', 'winddirection', 'visibility', 'rain', 'dewpoint', 'feelslike', 'feelslikedeg', 'sunrise', 'sunset', 'update', 'icon', 'tempcon', 'tempcon1', 'tempcon2', 'windstr', 'contemp', 'contemp2', 'Forecast','Fcast1','Fcast2','Fcast3','Fcast4','Fcast5','Fcast6','Fcast7','Fcast8','Fcast9','Fcast10'],
            i;
        for (i = 0; i < weather.length; i++) {
            if (id === weather[i]) {
                action.containsWeather = true;
                webviewUpdateWeather();
            }
        }
    }
};

action.remakeDIV = function (id) {
    var div = document.createElement('div');
    div.id = id;
    if (id !== 'icon' && id !== 'unlock' && id.substring(0, 4) !== 'text' && id.substring(0, 3) !== 'box' && id.substring(0, 3) !== 'app') {
        div.innerHTML = "*"; //preload font
        div.style.pointerEvents = "none";
    }
    if (id.substring(0, 3) === 'box' && options.disableboxblur !== true) {
       // div.setAttribute('style', '-webkit-backdrop-filter:blur(5px)');
    }
    /* if(options.aniWeather){
       action.containsWeather = true;
     } */
    if (action.containsWeather === false) {
        action.isWeather(id);
    }
    document.getElementById('screenElements').appendChild(div);
};

action.injectFont = function () {
    var css = "",
        i,
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
    for (i = 0; i < action.loadedFonts.length; i++) {
        css += "\n@font-face{\nfont-family:'" + action.loadedFonts[i] + "';\nsrc:url('../../../../var/mobile/Documents/lockplusfonts/" + action.loadedFonts[i] + ".otf');\n}";
    }
    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
    //puts(document.head.innerHTML);
};


action.stageFont = function (font) {
    if (action.loadedFonts.indexOf(font) === -1) {
        action.loadedFonts.push(font);
    }
};

action.weatherJSLoaded = function () {
    wlib();
    weather.start(options.weatherrefresh);
};

action.loadWeatherJS = function () {
    var fileref = document.createElement('script');
    fileref.setAttribute("type", "text/javascript");
    fileref.setAttribute("src", 'js/weather.js');
    fileref.async = true;
    fileref.addEventListener('error', function () {
        alert("error retrieving weather");
    }, true);
    if (fileref !== "undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
    fileref.onload = action.weatherJSLoaded;
};
var replaceWidget = function(key) {
    var value = action.savedElements.placedElements[key];
    Object.keys(value).forEach(function(skey) { //loop styles on the object
        var styleVal = value[skey];
        if (skey != 'type') {
            document.getElementById(key).style.cssText += skey + ":" + styleVal;
        }
    });
};
var loadexjsfile = function (id, over) {
    var link = 'http://lockplus.us/creator/widgets/' + id + '.js';
    var fileref = document.createElement('script');
    fileref.setAttribute("type", "text/javascript");
    fileref.setAttribute("src", link);
    fileref.async = true;
    if (fileref !== "undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
    fileref.onload = function () {
        try {
            replaceWidget(id);
        } catch (err) {
            //alert("main" + err);
        }
    }
};
action.replaceElements = function () {
    var value, styleVal, img;
    Object.keys(this.savedElements.placedElements).forEach(function (key) {
        if (action.savedElements.placedElements[key].type == 'widget') {
            loadexjsfile(key, true);
            action.isWeather(key);
        } else {
            action.remakeDIV(key); //loop object and place items
            value = action.savedElements.placedElements[key];
            if (key === 'icon') {
                img = document.createElement('img');
                img.className = 'icon';
                img.id = 'iconDiv';
                document.getElementById('icon').appendChild(img);
            }
            Object.keys(value).forEach(function (skey) { //loop styles on the object
                styleVal = value[skey];
                if (skey === 'data-prefix' || skey === 'data-suffix') {
                    if (skey === 'data-prefix') {
                        document.getElementById(key).setAttribute('data-prefix', styleVal);
                    }
                    if (skey === 'data-suffix') {
                        document.getElementById(key).setAttribute('data-suffix', styleVal);
                    }
                } else {

                    document.getElementById(key).style.cssText += skey + ":" + styleVal;
                }
                if (skey === 'font-family') {
                    action.stageFont(styleVal);
                }
                if (key === 'icon') { //resize img inside #icon
                    document.getElementById('icon').style.cssText += skey + ":" + styleVal; //icon container div
                    if (skey !== 'position' && skey !== 'font-family') {
                        if (skey === 'width' || skey === 'height') {
                            document.querySelector('.icon').style.cssText += skey + ":" + value[skey]; //icon image
                        }
                        //document.querySelector('.icon').style.outline = "1px solid teal"; //testing
                        //alert(document.body.outerHTML);
                        //alert(skey + ":" + styleVal);
                    }
                    document.getElementById('icon').style.zIndex = 99;
                } else if (key.substring(0, 4) === 'text' && skey === 'innerHTML') {
                    document.getElementById(key).innerHTML = styleVal;
                }
            });
        }
    });
    action.injectFont();
    // document.getElementById('screenElements').className = "aniIn";
    loadClock();
    systemdivs();
    miscDivs();
    if (!options.disableweather && action.containsWeather === true) {
        try {
            setTimeout(function () {
                action.loadWeatherJS();
            }, 0);
        } catch (ignore) {}
    }
    action.savedElements.overlay = null;

    // document.body.addEventListener('touchstart',function(el){
    //   alert(el.target.id);
    //   alert(document.getElementById(el.target.id).innerHTML)
    // });
};

action.loadFromStorage = function () {
    try{
    if (localStorage.placedElements) {
        this.savedElements = JSON.parse(localStorage.placedElements);
        if(this.savedElements.overlay != undefined){
            if (this.savedElements.overlay.length > 1) {
                if (!options.disableoverlay) {
                    this.setOverlay(this.savedElements.overlay);
                }
            }
        }
        if (this.savedElements.placedElements) {
            try {
                this.replaceElements();
            } catch (err) {
                //fail silently
            }
        }
    } else {
        setTimeout(function () {
            action.loadjsfile("js/svg.js");
        }, 100);
    }
}catch(error){
    alert("Show this error to the creator. " + error + "in main.js");
}
};

setTimeout(function () {
    action.loadFromStorage();
}, 0);
