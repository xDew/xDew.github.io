/*jslint plusplus: true */

/*global
  injectedWeather,
  injectedSystem,
  options,
  translate,
  checkDiv,
  weather,
  action
*/

"use strict";

var globalWeather;

function wlib() {
    var w = injectedWeather,
        weather = {
            cvtF: function (temp) {
                //letting iOS handle this
                //return (temp == "--") ? this.temp() : Math.round(temp * 1.8 + 32);
                return temp;
            },
            cvtK: function (wind) {
                return Math.round(((wind * 1.609344) * 100) / 100);
            },
            cvtM: function (distance) {
                return Math.round(distance * 1.60934);
            },
            cvtS: function (time) {
                var timecut, timeE, cvtt;
                if (String(time).length > 3) {
                    timecut = String(time).slice(0, 2);
                    timeE = String(time).slice(2, 4);
                } else {
                    timeE = String(time).slice(1, 3);
                    timecut = String(time).slice(0, 1);
                }
                if (timecut === "00") {
                    return 12;
                }
                cvtt = (timecut > 12) ? timecut - 12 : timecut;
                return cvtt + ":" + timeE;
            },
            degToCompass: function (num) {
                var val = Math.floor((num / 22.5) + 0.5),
                    arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
                return arr[(val % 16)];
            },
            temp: function () {
                return (options.celsius ? Math.round(w.temperature) : this.cvtF(w.temperature));
            },
            high: function (deg) {
                return (options.celsius ? Math.round(w.dayForecasts[0].high) + deg : this.cvtF(w.dayForecasts[0].high) + deg);
            },
            low: function (deg) {
                return (options.celsius ? Math.round(w.dayForecasts[0].low) + deg : this.cvtF(w.dayForecasts[0].low) + deg);
            },
            condition: function () {
                return translate[options.languages].condition[w.conditionCode];
            },
            icon: function () {
                return w.conditionCode;
            },
            city: function () {
                return w.name;
            },
            humidity: function () {
                return Math.round(w.humidity);
            },
            windchill: function (deg) {
                return Math.round(w.windChill) + deg;
            },
            wind: function (spd) {
                return (options.celsius ? this.cvtK(Math.round(w.windSpeed)) + spd : Math.round(w.windSpeed) + spd);
            },
            direction: function () {
                return this.degToCompass(w.windDirection);
            },
            visible: function (dis) {
                return (options.celsius ? this.cvtM(Math.round(w.visibility)) + dis : Math.round(w.visibility) + dis);
            },
            rain: function (perc) {
                var percent = (w.precipitationForecast === 2) ? 0 : w.precipitationForecast;
                return percent + perc;
            },
            dewpoint: function (deg) {
                return Math.round(w.dewPoint) + deg;
            },
            feelslike: function (deg) {
                return (options.celsius ? Math.round(w.feelsLike) + deg : this.cvtF(w.feelsLike) + deg);
            },
            sunset: function () {
                return (options.celsius ? w.sunsetTime : this.cvtS(w.sunsetTime));
            },
            sunrise: function () {
                return (options.celsius ? w.sunriseTime : this.cvtS(w.sunriseTime));
            },
            updated: function () {
                return w.updateTimeString;
            },
            aniWeather: function () {
                /*if (options.aniWeather) {
                    var head = document.getElementsByTagName('head')[0],
                        script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.src = 'animation/animation.js';
                    head.appendChild(script);
                }*/
            },
            start: function (weatherInterval) {
                var currentTime = new Date().getTime();
                if (currentTime > Number(localStorage.getItem('lastUpdate'))) {
                    //loadWeatherCy(); dont need it
                    // this.aniWeather();
                } else {
                    weatherdivs();
                    //this.aniWeather();
                }
                setTimeout(function () {
                    weather.start(weatherInterval);
                }, weatherInterval);
            }
        };
    window.weather = weather;
    globalWeather = weather;
}

var weatherdivs = function () { //weather
    var weatherArray = ['lngwstring', 'lngwstring2', 'lngwstring3', 'lngwstring4', 'lngwstring5', 'temp', 'tempdeg', 'tempdegplus', 'high', 'highdeg', 'highdegplus', 'low', 'lowdeg', 'lowdegplus', 'highdashlow', 'highslashlow', 'highdashlowdeg', 'highslashlowdeg', 'city', 'condition', 'humidity', 'windchill', 'wind', 'winddirection', 'visibility', 'rain', 'dewpoint', 'feelslike', 'feelslikedeg', 'sunrise', 'sunset', 'update', 'icon', 'tempcon', 'tempcon1', 'tempcon2', 'windstr', 'contemp', 'contemp2'],
        tcf = (options.celsius === true) ? 'c' : 'f',
        spd = (options.celsius === true) ? 'kph' : 'mph',
        i,
        div,
        icon,
        value,
        prefix,
        suffix;
    for (i = 0; i < weatherArray.length; i++) {
        div = checkDiv(weatherArray[i]);
        if (div) {
            switch (div.id) {
            case 'lngwstring':
                value = "It's " + weather.condition().toLowerCase() + " outside and the temp is around " + weather.temp() + "&deg;.";
                break;
            case 'lngwstring2':
                value = "Currently it's " + weather.temp() + "&deg; outside.";
                break;
            case 'lngwstring3':
                value = "Currently it's " + weather.condition().toLowerCase() + ", the high today will reach " + weather.high('') + "&deg; </br> Right now it's " + weather.temp() + "&deg; and your battery is at " + injectedSystem.battery +"%.";
                break;
            case 'lngwstring4':
                value = "It could be " + weather.condition().toLowerCase() + " and " + weather.temp() + "&deg; but who really knows. </br> What I can tell you is your battery is " + injectedSystem.battery +"%:)";
                break;
            case 'lngwstring5':
                value = "The current temperature is " + weather.temp() + "&deg;, it's " + weather.condition().toLowerCase() + " with a wind speed of " + weather.wind(spd) + ". </br> Your battery is at " + injectedSystem.battery +"% and is " + injectedSystem.chargetext.toLowerCase() + ".";
                break;
            case 'contemp':
                value = weather.condition() + " " + weather.temp() + "&deg;";
                break;
            case 'contemp2':
                value = weather.condition() + " " + weather.temp() + "&deg;" + tcf;
                break;
            case 'tempcon':
                value = weather.temp() + " " + weather.condition();
                break;
            case 'tempcon1':
                value = weather.temp() + "&deg;" + tcf + " " + weather.condition();
                break;
            case 'tempcon2':
                value = weather.temp() + "&deg; " + weather.condition();
                break;
            case 'windstr':
                value = weather.wind(spd) + " " + weather.direction();
                break;
            case 'temp':
                value = weather.temp();
                break;
            case 'tempdeg':
                value = weather.temp() + '&deg;';
                break;
            case 'tempdegplus':
                value = weather.temp() + '&deg;' + tcf;
                break;
            case 'high':
                value = weather.high('');
                break;
            case 'highdeg':
                value = weather.high('') + '&deg;';
                break;
            case 'highdegplus':
                value = weather.high('') + '&deg;' + tcf;
                break;
            case 'low':
                value = weather.low('');
                break;
            case 'lowdeg':
                value = weather.low('') + '&deg;';
                break;
            case 'lowdegplus':
                value = weather.low('') + '&deg;' + tcf;
                break;
            case 'highdashlow':
                value = weather.high('') + '-' + weather.low('');
                break;
            case 'highslashlow':
                value = weather.high('') + '/' + weather.low('');
                break;
            case 'highdashlowdeg':
                value = weather.high('') + '&deg;-' + weather.low('') + '&deg;';
                break;
            case 'highslashlowdeg':
                value = weather.high('') + '&deg;/' + weather.low('') + '&deg;';
                break;
            case 'city':
                value = weather.city();
                break;
            case 'condition':
                value = weather.condition();
                break;
            case 'humidity':
                value = weather.humidity();
                break;
            case 'windchill':
                value = weather.windchill('&deg');
                break;
            case 'wind':
                value = weather.wind(spd);
                break;
            case 'winddirection':
                value = weather.direction();
                break;
            case 'visibility':
                value = weather.visible(spd);
                break;
            case 'rain':
                value = weather.rain('%');
                break;
            case 'dewpoint':
                value = weather.dewpoint('&deg');
                break;
            case 'feelslike':
                value = weather.feelslike('');
                break;
            case 'feelslikedeg':
                value = weather.feelslike('&deg');
                break;
            case 'sunrise':
                value = weather.sunrise();
                break;
            case 'sunset':
                value = weather.sunset();
                break;
            case 'update':
                value = weather.updated();
                break;
            case 'icon':
                icon = weather.icon();
                value = icon;
                break;
            }
            if (div.id === 'icon') {
                if (document.getElementById('iconDiv').src != 'http://junesiphone.com/weather/IconSets/' + action.savedElements.iconName + '/' + icon + '.png') {
                    document.getElementById('iconDiv').src = 'http://junesiphone.com/weather/IconSets/' + action.savedElements.iconName + '/' + icon + '.png';
                }
            } else {
                if (div.getAttribute('data-prefix') !== null) {
                    prefix = div.getAttribute('data-prefix');
                } else {
                    prefix = '';
                }
                if (div.getAttribute('data-suffix') !== null) {
                    suffix = div.getAttribute('data-suffix');
                } else {
                    suffix = '';
                }
                div.innerHTML = prefix + value + suffix;
            }
        }
    }
}; //end weather

function weatherLoaded() {
    var currentTime = new Date().getTime();
    wlib();
    weatherdivs();
    localStorage.setItem('lastUpdate', currentTime + options.weatherrefresh);
}
weatherLoaded();

