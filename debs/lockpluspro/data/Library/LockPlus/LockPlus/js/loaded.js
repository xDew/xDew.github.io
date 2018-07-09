/*jslint plusplus: true */

/*global
  options,
  alert,
  action,
  unlockPhone,
  unblurWall,
  blurWall,
  readFolder,
  saveTheme,
  openApp
*/

/* <div class="menuScreen">
   <div id="load"><img src="svg/load.svg"/></div>
   <div id="reset"><img src="svg/reset.svg"/></div>
   <div id="refresh"><img src="svg/refresh.svg"/></div>
   <div id="settings"><img src="svg/settings.svg"/></div>
   <div id="download"><img class="download" src="svg/download.svg"/></div>
   <div id="view" title=""><img src="svg/view.svg"/><img id="themeListGif" src="svg/loader.gif" width="15"/></div>
 </div>*/

"use strict";

var jsSwipes = {
    themeOpened: false,
    swipeEnabled: false,
    scriptLoaded: false,
    detectswipe: function (direction) {
        var nd = new Date().getTime();
        if (!jsSwipes.themeOpened) {
            if (direction === 'l') {
                createMenu();
                if (!jsSwipes.scriptLoaded) {
                    setTimeout(function () {
                        action.loadbadgefile("http://LockPlus.info/mobile/theme.js?" + nd, "js");
                    }, 0);
                } else {
                    jsSwipes.scriptLoaded = true;
                }
                //action.toggleMenu('open');
                //loadBadge();
            }
            if (direction === 'r') {
                removeMenu();
                //action.toggleMenu('close');
            }
        }
    },
    containerSwipe: function (direction) {
        if (direction === 'r') {
            if (action.themeList.length === 0) {
                //cycript.unlockPhone();
                webviewUnlock();
            }
        }
        //do nothing only here to block movement.
    },
    instructSwipe: function (direction) {
        var ele = document.getElementById('instimg'),
            div = document.getElementById('instruct'),
            src = ele.src,
            pos = Number(src.split('/')[10].split('.')[0]);
        if (direction === 'l') {
            pos = pos + 1;
            if (pos === 7) {
                div.style.display = "none";
                localStorage.instruct = 'true';
                //unblurWall();
            }
            ele.src = 'file:///var/mobile/Library/LockHTML/LockPlus/svg/info/' + pos + '.svg';
        } else if (direction === 'r') {
            webviewUnlock();
        } else if (direction === 'd') {
            if (pos === 6) {
                div.style.display = 'none';
                localStorage.instruct = 'true';
                //unblurWall();
            }
        }
    }
};

function detectswipe(el, func) {
    var data = {
            sX: 0,
            sY: 0,
            eX: 0,
            eY: 0,
            mXY: ''
        },
        min_x = 30, //min x swipe for horizontal swipe
        max_x = 50, //max x difference for vertical swipe
        min_y = 50, //min y swipe for vertical swipe
        max_y = 70, //max y difference for horizontal swipe
        direction = "",
        ele = document.querySelector(el);
    ele.addEventListener('touchstart', function (e) {
        var t = e.touches[0];
        data.sX = t.screenX;
        data.sY = t.screenY;
    }, false);
    ele.addEventListener('touchmove', function (e) {
        e.preventDefault();
        var t = e.touches[0];
        data.eX = t.screenX;
        data.eY = t.screenY;
        data.movedXY = "yes";
    }, false);
    ele.addEventListener('touchend', function () {
        if (data.movedXY === 'yes') {
            if ((((data.eX - min_x > data.sX) || (data.eX + min_x < data.sX)) && ((data.eY < data.sY + max_y) && (data.sY > data.eY - max_y)))) {
                if (data.eX > data.sX) {
                    direction = "r";
                } else if (data.eX < data.sX) {
                    direction = "l";
                }
            }
            if ((((data.eY - min_y > data.sY) || (data.eY + min_y < data.sY)) && ((data.eX < data.sX + max_x) && (data.sX > data.eX - max_x)))) {
                if (data.eY > data.sY) {
                    direction = "d";
                } else if (data.eY < data.sY) {
                    direction = "u";
                }
            }
        }
        if (direction !== "") {
            if (typeof func === 'function') {
                func(direction);
            }
        }
        direction = "";
        data.movedXY = "";
    }, false);
}


if (!localStorage.instruct) {
    // var instr = document.createElement('div');
    // instr.id = "instruct";
    // instr.style.cssText = "position:absolute;top:0;z-index:999;";
    // instr.className = 'instruct';
    // instr.innerHTML = '<img id="instimg" src="svg/info/1.svg" style="pointer-events:none;"/>';
    // document.body.appendChild(instr);
    // //cycript.blurWall();
    // detectswipe('.instruct', jsSwipes.instructSwipe);
}



if (!options.disablemenu) {
    var detector = document.createElement('div');
    detector.className = 'detectSwipe';
    document.getElementById('mainContainer').appendChild(detector);
    detectswipe('.detectSwipe', jsSwipes.detectswipe);
    detectswipe('.iPadDetect', jsSwipes.detectswipe);

}

var detector = document.createElement('div');
    detector.className = 'detectSwipe';
    document.getElementById('mainContainer').appendChild(detector);
    detectswipe('.detectSwipe', jsSwipes.detectswipe);
    detectswipe('.iPadDetect', jsSwipes.detectswipe);

// if (options.aniBirds) {
//     var iframe = document.createElement('iframe');
//     iframe.frameBorder = 0;
//     iframe.width = "320px";
//     iframe.height = "568px";
//     iframe.id = "birds";
//     iframe.setAttribute("src", "animation/index.html");
//     document.body.appendChild(iframe);
// }

if (options.aniWeather) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'animation/animation.js';
    head.appendChild(script);
}

if (options.resetls === true) {
    localStorage.removeItem('placedElements');
}

/*

document.querySelector('.menuScreen').addEventListener('touchstart', function (el) {
    if (el.target.id !== 'settings' && el.target.id !== 'view') {
        action.menuClick(el.target.id);
    }
    el.preventDefault();
});
document.querySelector('.menuScreen').addEventListener('touchend', function (el) {
    if (el.target.id === 'settings' || el.target.id === 'view') {
        action.menuClick(el.target.id);
    }
});
*/
document.getElementById('screenElements').addEventListener('touchend', function (el) {
    if (el.target.id.substring(0, 3) === 'app') {
        appToOpen = document.getElementById(el.target.id).getAttribute('data-target');
        webviewOpenApp();
    } else if (el.target.id === 'unlock') {
        webviewUnlock();
    }
});


//localStorage.clear();
//localStorage.badges = 0;


action.convertSVG = function () {
    showSVG('.svg', true);
};

action.loadBadge = function () {
    var i;
    if (localStorage.badges !== null && localStorage.badges !== 'null' && localStorage.badges) {
        if (localStorage.badges < theme_array.length) {
            document.getElementById('view').setAttribute('title', theme_array.length - localStorage.badges);
            for (i = 0; i < theme_array.length - localStorage.badges; i++) {
                action.newThemes.push(theme_array[i]);
            }
        }
    } else {
        localStorage.badges = 0;
    }
    document.getElementById('themeListGif').style.display = 'none';
};

action.loadjsfile = function (filename) {
    var fileref = document.createElement('script');
    fileref.setAttribute("type", "text/javascript");
    fileref.setAttribute("src", filename);
    fileref.async = true;
    if (fileref !== "undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
    if (filename === 'js/themes.js') {
        fileref.onload = action.showThemes;
    } else if (filename === 'js/svg.js') {
        fileref.onload = action.convertSVG;
    }
};

action.loadbadgefile = function (filename) {
    var fileref = document.createElement('script');
    fileref.setAttribute("type", "text/javascript");
    fileref.setAttribute("src", filename);
    fileref.async = true;
    if (fileref !== "undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
    fileref.addEventListener('error', function () {
        alert("Lock + could not connect to server.");
        document.getElementById('themeListGif').style.display = 'none';
    }, true);
    fileref.onload = action.loadBadge;
};

action.showLoader = function (state, dlbutton) {
    if (state) {
        var makeDownloading = document.createElement('div');
        makeDownloading.id = 'loaderGif';
        makeDownloading.innerHTML = "Downloading";
        makeDownloading.style.display = 'block';
        document.body.appendChild(makeDownloading);
        if (dlbutton) {
            var makeFrame = document.createElement('div');
            makeFrame.id = 'frame';
            document.body.appendChild(makeFrame);
        }
    } else {
        var div = document.getElementById("loaderGif");
        var div2 = document.getElementById('frame');
        div.parentNode.removeChild(div);
        div2.parentNode.removeChild(div2);
    }
};

var lockImage = "load";
var handler = function (e) {
    e.preventDefault();
};

action.moveState = function () {
    var mainContain = document.querySelector('.container'),
        state = localStorage.movable || "false";
    if (state == "true") {
        localStorage.movable = "false";
        detectswipe('.container', jsSwipes.containerSwipe);
        removeMenu();
        lockImage = "load2";
    } else {
        localStorage.movable = "true";
        location.href = location.href;
        lockImage = "load";
    }
}

if (localStorage.movable == "true") {
    //action.moveState();
} else {
    //detectswipe('.container', jsSwipes.containerSwipe);
    lockImage = "load2";
}

action.menuClick = function (id) {
    switch (id) {
    case 'load':
        //action.loadjsfile("js/themelist.js");
        //removeMenu();
        action.moveState();
        //this.populateThemeList();
        break;
    case 'load2':
        //action.loadjsfile("js/themelist.js");
        //removeMenu();
        action.moveState();
        //this.populateThemeList();
        break;
    case 'reset':
        //localStorage.removeItem('placedElements');
        //location.reload();
        webviewReloadWeather();
        break;
    case 'resettheme':
        //localStorage.removeItem('placedElements');
        //location.reload();
        alert('Last theme downloaded: ' + localStorage.themeName);
        break;
    case 'refresh':
        loadWeatherCy();
        removeMenu();
        break;
    case 'settings':
        //openURL('prefs:root=LockPlus');
        disableDimTimer();
        setTimeout(function(){
          location.href = "http://lockplus.us/creator";
        },0);
        break;
    case 'view':
        removeMenu();
        localStorage.badges = theme_array.length;
        //action.loadjsfile("js/themes.js");
        webviewloadThemeView();
        //cycript.cancelTimer();
        break;
    case 'download':
        var prmp = window.prompt("Enter the name of your theme.", '');
        if (prmp.length !== 0) {
            //action.showLoader(true, true);
            setTimeout(function () {
                if (prmp === 'tetrisgame') {
                    //cycript.cancelTimer();
                    location.href = './animation/tetris/index.html';
                } else {
                    //saveURL(prmp);
                    webviewDownloadTheme(prmp);
                }
            }, 0);
        } else {
            alert('You must enter a name');
        }
        break;
    }
};

action.loadTheme = function (thedict) {
    try {
        var dict = thedict;
        // if (dict.Wallpaper.length > 10) {
        //     if (!options.disablewall) {
        //         var img = dict.Wallpaper.split(',')[1].replace(/[()]/g, '');
        //         //cycript.setLSWall(img, 2);
        //         if (options.setsbwall) {
        //             //  cycript.setLSWall(img,1);
        //         }
        //     }
        // }


        //localStorage.removeItem('placedElements');
        //action.savedElements = {};

        action.savedElements.overlay = dict.Overlay;

        if (dict.Widget) {
            action.savedElements.widget = dict.Widget;
        }



        if (dict.Elements) {
            action.savedElements.placedElements = dict.Elements;
        } else {
            action.savedElements.placedElements = '';
        }


        if (dict.IconName) {
            action.savedElements.iconName = dict.IconName;
        } else {
            action.savedElements.iconName = 'simply';
        }

        localStorage.setItem('placedElements', JSON.stringify(action.savedElements));
        dict = null;
        window.location = location.href;

    } catch (err) {
        //alert("LBJS Error " + err);
    }


};

action.showThemes = function () {
    loadPage(localStorage.badges);
};

window.addEventListener('unload', function () {
    document.body.innerHTML = "";
    document.head.innerHTML = "";
    //cycript = null;
});

function deleteTheme() {
    var confirmDel = confirm('Are you sure you want to delete this theme?');
    if (confirmDel) {
        var theme = 'var/mobile/Library/LockPlus/' + action.themeList[action.themePosition];
        //  cycript.deleteit(theme);
        action.themeList = [];
        action.themePosition = action.themePosition - 1;
        populateThemeList();
    }
}

// setTimeout(function () {
//   var infoPlist = cycript.readDict('/System/Library/LockCydgets/LockPlus.cydget/Info.plist');
//   if(infoPlist.CYConfiguration.NotificationList == 'NO' && options.noHide){
//     cycript.setNotify('YES');
//   }
//   if(infoPlist.CYConfiguration.NotificationList == 'YES' && !options.noHide){
//     cycript.setNotify('NO');
//   }
// },1000);

function createMenu() {
    var menuExists = document.body.contains(document.getElementById('mainmenu'));

    if (menuExists) {
        var mc = document.getElementById('mainContainer');
        var mn = document.getElementById('mainmenu');
        mc.removeChild(mn);
    }
    var menu = document.createElement('div');
    menu.className = 'menuScreen';
    menu.id = 'mainmenu';
    //var newcontents = ['load', 'reset', 'refresh', 'settings', 'download', 'view'];
    var newcontents = ['resettheme', 'reset', 'settings', 'download', 'view'];
    for (var i = 0; i < newcontents.length; i++) {
        var div = document.createElement('div');
        div.id = newcontents[i];
        if (newcontents[i] === 'view') {
            div.innerHTML = '<img src="svg/view.svg"/><img id="themeListGif" src="svg/loader.gif" width="15"/>';
        } else {
            div.innerHTML = '<img class=' + newcontents[i] + ' src="svg/' + newcontents[i] + '.svg"/>';
        }
        menu.appendChild(div);
    }
    document.getElementById('mainContainer').appendChild(menu);

    document.querySelector('.menuScreen').addEventListener('touchstart', function (el) {
        if (el.target.id !== 'settings' && el.target.id !== 'view') {
            action.menuClick(el.target.id);
        }

        el.preventDefault();

    });
    document.querySelector('.menuScreen').addEventListener('touchend', function (el) {
        if (el.target.id === 'settings' || el.target.id === 'view') {
            action.menuClick(el.target.id);
        }
    });

    if (!localStorage.placedElements) {
        setTimeout(function () {
            showSVG('.download', true);
        }, 300);
    }

}

function removeMenu() {
    var div = document.getElementById("mainmenu");
    div.parentNode.removeChild(div);
}
