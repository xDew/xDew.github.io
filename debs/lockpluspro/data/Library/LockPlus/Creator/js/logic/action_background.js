/*jslint
  node: true,
  sloppy: true,
  browser: true,
  todo: true
*/
/*global
  action,
  constants,
  editSB,
  alert,
  FileReader,
  tempWall:true,
  stackBlurImage,
  showSVG,
  $
*/
/**
 * Detects when a user uploads a wall
 * Sets background
 * Loads after action.js as it contains constants and action object
 */

//localStorage
var wallpaperBlurText = (isios2 === true) ? 'ALTwallpaperBlur' : 'wallpaperBlur';

action.openBackground = function (purpose) { // either 'original' or 'blurry'
    var newWindow,
        newCanvas,
        imageData,
        image;
    if ($('#wallpaper').attr('src') !== 'none') {
        newWindow = window.open('');
        if (purpose === 'blurry') {
            newCanvas = document.getElementById('blurcanvas').cloneNode();
            newCanvas.className = '';
            //newCanvas.getContext('2d').drawImage(document.getElementById('blurcanvas'),0,0);

            stackBlurImage('wallpaper', newCanvas, localStorage.getItem(wallpaperBlurText), false);
            imageData = newCanvas.toDataURL();
            image = document.createElement('img');
            image.src = imageData;
            image.style.display = 'block';
        } else if (purpose === 'original') {
            image = $('#wallpaper').clone();
            image.attr('style', '');
            image.attr('width', '');
            image.attr('height', '');
        }
        $('body', newWindow.document).append(image);
        $('head', newWindow.document).append($('<title>Wallpaper</title>'));

    } else {
        action.setHelpText('No wallpaper set. Click "Change Background" above to set one.');
    }
};

action.setOverlay = function (img) { //apply overlay to screenoverlay
    document.querySelector('.svg').src = img;
    $('.screenoverlay').css('background-image', 'url(' + img + ')');
    action.savedElements.overlay = img;
    if (img.split('+')[0] === 'data:image/svg') {
        setTimeout(function () {
            showSVG('.svg', true);
            setTimeout(function () {
                var inner = document.querySelector('.newSVG').innerHTML,
                    div = document.createElement('div');
                $('.newSVG').empty();
                div.className = 'newSVG';
                div.innerHTML = inner;
                document.querySelector('.screen').appendChild(div);
            }, 0);
        }, 0);
    }
    action.saveStorage();
};

action.backgroundBlur = function (idSelector, cssKey, unit, jsCssKey, purpose) {
    var min,
        max,
        blur;
    if (purpose === 'set') {
        max = JSON.parse($(idSelector).attr('max'));
        min = JSON.parse($(idSelector).attr('min'));
        if (JSON.parse($(idSelector).val()) >= JSON.parse(max)) {
            $(idSelector).val(max);
        }
        if (JSON.parse($(idSelector).val()) <= JSON.parse(min)) {
            $(idSelector).val(min);
        }

        $('#miniBlurCanvas').show();
        stackBlurImage('miniWallpaper', 'miniBlurCanvas', $(idSelector).val(), false);
        if (action.blurTimeout !== null) {
            clearTimeout(action.blurTimeout);
        }
        action.blurTimeout = setTimeout(function () {
            //$('#miniBlurCanvas').hide();
            $('#miniBlurCanvas').removeClass('miniBlur');
            $('#miniBlurCanvas').animate({
                opacity: 0.25,
                width: 320,
                height: 568
            }, 1000, function () {
                $('#miniBlurCanvas').hide();
                $('#miniBlurCanvas').addClass('miniBlur');
                $('#miniBlurCanvas').css('opacity', '1');
            });
            stackBlurImage('wallpaper', 'blurcanvas', $(idSelector).val(), false);
            localStorage.setItem(wallpaperBlurText, $(idSelector).val());
        }, 400);
    } else if (purpose === 'get') {
        blur = localStorage.getItem(wallpaperBlurText);

        if (blur !== null && blur !== '0') {
            return blur;
        }
    }
};

action.uploadedImage = function (e) {
    if (editSB) {
        alert("When creating SB themes upload a screenshot of your homescreen to create your widget around them. Wallpapers are not used!");
    }
    var tw = e.target.files,
        rd;
    rd = new FileReader();
    rd.onload = (function () {
        return function (e) {
            if (action.uploadSelection === 'cgBackground') {
                tempWall = e.target.result;
                document.getElementById('loader').style.display = 'block';
                window.location = 'wallpaper:' + tempWall.split(',')[1]; //saves wallpaper to disk via tweak
                tempWall = "file:///var/mobile/Documents/lockpluscreator.jpg";
                var timeInMs = Date.now();
                setTimeout(function(){
                    $('#wallpaper').attr('src', tempWall + "?dummy=" + timeInMs);
                    $('#wallpaper').css('display', 'initial');
                    document.getElementById('loader').style.display = 'none';
                },1000);

                wallpaperSaved = true;
            } else if (action.uploadSelection === 'cgOverlay') {
                action.setOverlay(e.target.result);
            }
        };
    }(tw[0]));
    rd.readAsDataURL(tw[0]);
};