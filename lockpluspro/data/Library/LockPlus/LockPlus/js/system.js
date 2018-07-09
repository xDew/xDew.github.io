var systemdivs = function () { //system
    'use strict';
    var sysArray = ['batteryperslashcharge', 'alarmstringsmall', 'alarmstring', 'alarmsday', 'alarmday', 'alarmhr', 'alarmmin' ,'name', 'firmware', 'battery', 'batterypercent', 'chargingtxt', 'chargingstate', 'unlock', 'signal', 'signalpercent', 'alarm24', 'alarm', 'alarmpm', 'wifi', 'wifipercent', 'notifymail', 'notifysms', 'notifyphone', 'notifywhats', 'notifytelegram', 'ramUsed', 'ramFree', 'ramAvailable', 'ramUsedMB', 'ramFreeMB', 'ramAvailableMB'],
        signalArray = ["0%", "20%", "40%", "60%", "80%", "100%"];
    for (var i = 0; i < sysArray.length; i++) {
        var div = checkDiv(sysArray[i]);
        if (div) {
            var value;
            switch (div.id) {
            case 'name':
                value = injectedSystem.deviceName;
                break;
            case 'firmware':
                value = injectedSystem.systemVersion;
                break;
            case 'battery':
                value = injectedSystem.battery;
                break;
            case 'batterypercent':
                value = injectedSystem.battery + "%";
                break;
            case 'batteryperslashcharge':
                value = injectedSystem.battery + "%" + " / " + injectedSystem.chargetext;
                break;
            case 'chargingtxt':
                value = injectedSystem.chargetext;
                break;
            case 'chargingstate':
                value = injectedSystem.chargetext;
                break;
            case 'unlock':
                value = "Unlock";
                break;
            case 'signal':
                value = injectedSystem.signalBars;
                break;
            case 'signalpercent':
                value = signalArray[injectedSystem.signalBars];
                break;
            case 'alarmstring':
                value = translate[options.languages].sday[(injectedSystem.alarmDay === 1) ? 7 : injectedSystem.alarmDay - 1 ] + " " + injectedSystem.alarmString || "NA";
                break;
            case 'alarmstringsmall':
                value = translate[options.languages].sday[(injectedSystem.alarmDay === 1) ? 7 : injectedSystem.alarmDay - 1 ] + " " + injectedSystem.alarmHour + ":" + injectedSystem.alarmMinute || "NA";
                break;
            case 'alarm24':
                value = injectedSystem.alarmString || "NA";
                break;
            case 'alarm':
                value = injectedSystem.alarmTime || "NA";
                break;
            case 'alarmhr':
                value = injectedSystem.alarmHour || "NA";
                break;
            case 'alarmmin':
                value = injectedSystem.alarmMinute || "NA";
                break;
            case 'alarmday':
                value = translate[options.languages].weekday[(injectedSystem.alarmDay === 1) ? 7 : injectedSystem.alarmDay - 1 ] || "";
                break;
            case 'alarmsday':
                value = translate[options.languages].sday[(injectedSystem.alarmDay === 1) ? 7 : injectedSystem.alarmDay - 1 ] || "";
                break;
            case 'wifi':
                value = percent[Number(injectedSystem.wifiBars)];
                break;
            case 'wifipercent':
                value = percent[Number(injectedSystem.wifiBars)] + "%";
                break;
            case 'notifymail':
                value = injectedSystem.mailBadge;
                break;
            case 'notifysms':
                value = injectedSystem.smsBadge;
                break;
            case 'notifyphone':
                value = injectedSystem.phoneBadge;
                break;
            case 'notifywhats':
                value = injectedSystem.whatsBadge || 0;
                break;
            case 'notifytelegram':
                value = injectedSystem.telegramBadge || 0;
                break;
            case 'ramFree':
                value = injectedSystem.ramFree;
                break;
            case 'ramUsed':
                value = injectedSystem.ramUsed;
                break;
            case 'ramAvailable':
                value = injectedSystem.ramAvailable;
                break;
            case 'ramFreeMB':
                value = injectedSystem.ramFree + " mb";
                break;
            case 'ramUsedMB':
                value = injectedSystem.ramUsed + " mb";
                break;
            case 'ramAvailableMB':
                value = injectedSystem.ramAvailable + " mb";
                break;
            }
            var prefix, suffix;
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
    setTimeout(function () {
        systemdivs();
    }, 1000);
}; // end system

var globalBattery = {
    percent: 'nil',
    charging: 'nil'
}
var miscDivs = function () { //misc
    'use strict';
    var miscArray = ['textOne', 'textTwo', 'textThree', 'textFour', 'textFive', 'app1', 'app2', 'app3', 'app4', 'app5', 'app6', 'app7', 'app8', 'app9', 'app10', 'app11', 'app12', 'app13', 'app14', 'app15', 'app16', 'app17', 'app18', 'app19', 'app20', 'app21', 'app21', 'app22', 'app23', 'app24', 'app25', 'app26', 'app27', 'app28', 'app29'];
    for (var i = 0; i < miscArray.length; i++) {
        var div = checkDiv(miscArray[i]);
        if (div) {
            var value;
            switch (div.id) {
            case 'textOne':
                value = "Text";
                break;
            case 'textTwo':
                value = "Text";
                break;
            case 'textThree':
                value = 'Text';
                break;
            case 'textFour':
                value = 'Text';
                break;
            case 'textFive':
                value = 'Text';
                break;
            case 'app1':
                value = 'Mail-com.apple.mobilemail';
                break;
            case 'app2':
                value = 'SMS-com.apple.MobileSMS';
                break;
            case 'app3':
                value = 'Phone-com.apple.mobilephone';
                break;
            case 'app4':
                value = 'Twitter-com.atebits.Tweetie2';
                break;
            case 'app5':
                value = 'Tweetbot3-com.tapbots.Tweetbot3';
                break;
            case 'app6':
                value = 'Telegram-ph.telegra.Telegraph';
                break;
            case 'app7':
                value = 'Instagram-com.burbn.instagram';
                break;
            case 'app8':
                value = 'Pandora-com.pandora';
                break;
            case 'app9':
                value = 'Spotify-com.spotify.client';
                break;
            case 'app10':
                value = 'Facebook-com.facebook.Facebook';
                break;
            case 'app11':
                value = 'Kik-com.kik.chat';
                break;
            case 'app12':
                value = 'YouTube-com.google.ios.youtube';
                break;
            case 'app13':
                value = 'WhatsApp-net.whatsapp.WhatsApp';
                break;
            case 'app14':
                value = 'Safari-com.apple.mobilesafari';
                break;
            case 'app15':
                value = 'Weather-com.apple.weather';
                break;
            case 'app16':
                value = 'Clock-com.apple.mobiletimer';
                break;
            case 'app17':
                value = 'Music-com.apple.Music';
                break;
            case 'app18':
                value = 'Camera-com.apple.camera';
                break;
            case 'app19':
                value = 'Reminders-com.apple.reminders';
                break;
            case 'app20':
                value = 'Notes-com.apple.mobilenotes';
                break;
            case 'app21':
                value = 'Maps-com.apple.Maps';
                break;
            case 'app22':
                value = 'Calendar-com.apple.mobilecal';
                break;
            case 'app23':
                value = 'Calculator-com.apple.calculator';
                break;
            case 'app24':
                value = 'Cydia-com.saurik.Cydia';
                break;
            case 'app25':
                value = 'YouTube-com.google.ios.youtube';
                break;
            case 'app26':
                value = 'Settings-com.apple.Preferences';
                break;
            case 'app27':
                value = 'AppStore-com.apple.AppStore';
                break;
            case 'app28':
                value = 'Health-com.apple.Health';
                break;
            }
            if (div.id.substring(0, 3) === 'app') {
                div.innerHTML = value.split('-')[0];
                div.setAttribute('data-target', value.split('-')[1]);
            } else {
                if (div.innerHTML === '') {
                    div.innerHTML = value;
                }
            }
        }
    }
}; //end misc
