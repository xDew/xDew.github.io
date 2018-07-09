function clock(option) {
    'use strict';
    var getTimes = function () {
        var d = new Date(),
            funcs = {
                daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                hour: function () {
                    var hour = (option.twentyfour === true) ? d.getHours() : (d.getHours() + 11) % 12 + 1;
                    return hour;
                },
                zhour: function () {
                    var hour = (option.twentyfour === true) ? d.getHours() : (d.getHours() + 11) % 12 + 1;
                    hour = hour < 10 ? "0" + hour : " " + hour;
                    return hour;
                },
                rawhour: function () {
                    return d.getHours();
                },
                minute: function () {
                    return (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
                },
                second: function () {
                    return (d.getSeconds() < 10) ? "0" + d.getSeconds() : d.getSeconds();
                },
                rawminute: function () {
                    return d.getMinutes();
                },
                ampmstrict: function(){
                    var ampm = (d.getHours() > 11) ? "pm" : "am";
                    return ampm;
                },
                am: function () {
                    var ampm = (d.getHours() > 11) ? "pm" : "am";
                    if (options.celsius) {
                        ampm = "";
                    }
                    return ampm;
                },
                tod: function () {
                    return (d.getHours() > 11) ? "Afternoon" : "Morning";
                },
                date: function () {
                    return d.getDate();
                },
                prevdate: function () {
                    var pd = (this.date() === 0) ? this.daysInMonth[this.month() - 1] : this.date() - 1;
                    return pd;
                },
                nextdate: function () {
                    var nd = (this.date() === 0) ? this.daysInMonth[this.month() + 1] : this.date() + 1;
                    return nd;
                },
                day: function () {
                    return d.getDay();
                },
                month: function () {
                    return d.getMonth();
                },
                year: function () {
                    return d.getFullYear();
                },
                smyear: function () {
                    return d.getFullYear() % 1000;
                },
                hourtext: function () {
                    var hourtxt;
                    if (options.languages === 'fr') {
                        hourtxt = (option.twentyfour === true) ? ["Minuit", "Une heure", "Deux heures", "Trois heures", "Quatre heures", "Cing heures", "Six heures", "Sept heures", "Huit heures", "Neuf heures", "Dix heures", "Onze heures", "Midi", "Treize heures", "Quatorze heures", "Quinze heures", "Seize heures", "Dix-sept heures", "Dix-huit heures", "Dix-neuf heures", "Vingt heures", "Vingt et une heures", "Vingt-deux heures", "Vingt-trois heures", "Minuit"] : ["Minuit", "Une heure", "Deux heure", "Trois heure", "Quatre heure", "Cing heure", "Six heure", "Sept heure", "Huit heure", "Neuf heure", "Dix heure", "Onze heure", "Midi", "Une heure", "Deux heure", "Trois heure", "Quatre heure", "Cing heure", "Six heure", "Sept heure", "Huit heure", "Neuf heure", "Dix heure", "Onze heure", "Minuit"];
                    } else {
                        hourtxt = (option.twentyfour === true) ? ["Twelve", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty", "Twenty One", "Twenty Two", "Twenty Three", "Twenty Four"] : ["Twelve", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];
                    }
                    return hourtxt[this.rawhour()];
                },
                minuteonetext: function () {
                    var minuteone;
                    if (options.languages === 'fr') {
                        minuteone = ["", "et une", "et deux", "et trois", "et quatre", "et cinq", "et six", "et sept", "et huit", "et neuf", "et dix", "et onze", "et douze", "et treize", "et quatorze", "et quinze", "et seize", "et dix-sept", "et dix-huit", "et dix-neuf", "et vingt", "et vingt", "et vingt", "et vingt", "et vingt", "et vingt", "et vingt", "et vingt", "et vingt", "et vingt", "et trente", "et trente", "et trente", "et trente", "et trente", "et trente", "et trente", "et trente", "et trente", "et trente", "et quarante", "et quarante", "et quarante", "et quarante", "et quarante", "et quarante", "et quarante", "et quarante", "et quarante", "et quarante", "et cinquante", "et cinquante", "et cinquante", "et cinquante", "et cinquante", "et cinquante", "et cinquante", "et cinquante", "et cinquante", "et cinquante", "et cinquante"];
                    } else {
                        minuteone = ["o' clock", "o' one", "o' two", "o' three", "o' four", "o' five", "o' six", "o' seven", "o' eight", "o' nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "Sixteen", "Seventeen", "eighteen", "Nineteen", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty"];
                    }
                    if (minuteone[this.rawminute()] !== undefined) {
                        return minuteone[this.rawminute()];
                    }
                    return "";
                },
                minuteonetextdot: function () {
                    var minuteone;
                    if (options.languages === 'fr') {
                        minuteone = ["", "et.une", "et.deux", "et.trois", "et.quatre", "et.cinq", "et.six", "et.sept", "et.huit", "et.neuf", "et.dix", "et.onze", "et.douze", "et.treize", "et.quatorze", "et.quinze", "et.seize", "et.dix-sept", "et.dix-huit", "et.dix-neuf", "et.vingt", "et.vingt", "et.vingt", "et.vingt", "et.vingt", "et.vingt", "et.vingt", "et.vingt", "et.vingt", "et.vingt", "et.trente", "et.trente", "et.trente", "et.trente", "et.trente", "et.trente", "et.trente", "et.trente", "et.trente", "et.trente", "et.quarante", "et.quarante", "et.quarante", "et.quarante", "et.quarante", "et.quarante", "et.quarante", "et.quarante", "et.quarante", "et.quarante", "et.cinquante", "et.cinquante", "et.cinquante", "et.cinquante", "et.cinquante", "et.cinquante", "et.cinquante", "et.cinquante", "et.cinquante", "et.cinquante", "et.cinquante"];
                    } else {
                        minuteone = ["", "one", "o.two", "o.three", "o.four", "o.five", "o.six", "o.seven", "o.eight", "o.nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "Sixteen", "Seventeen", "eighteen", "Nineteen", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Twenty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Thirty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Forty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty", "Fifty"];
                    }
                    if (minuteone[this.rawminute()] !== undefined) {
                        return minuteone[this.rawminute()];
                    }
                    return "";
                },
                minutetwotext: function () {
                    var minutetwo;
                    if (options.languages === 'fr') {
                        minutetwo = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "et-un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "", "et-un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "", "et-un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "", "et-un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", ""];
                    } else {
                        minutetwo = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", ""];
                    }
                    if (minutetwo[this.rawminute()] !== undefined) {
                        return minutetwo[this.rawminute()];
                    }
                    return "";
                },
                daytext: function () {
                    return translate[options.languages].weekday[this.day()];
                },
                yesterdaydaytext: function () {
                    return (this.day() === 0) ? translate[options.languages].weekday[6] : translate[options.languages].weekday[this.day() - 1];
                },
                nextdaytext: function () {
                    return (this.day() === 6) ? translate[options.languages].weekday[0] : translate[options.languages].weekday[this.day() + 1];
                },
                sdaytext: function () {
                    return translate[options.languages].sday[this.day()];
                },
                snextday: function () {
                    return (this.day() === 6) ? translate[options.languages].sday[0] : translate[options.languages].sday[this.day() + 1];
                },
                sprevday: function () {
                    return (this.day() === 0) ? translate[options.languages].sday[6] : translate[options.languages].sday[this.day() - 1];
                },
                monthtext: function () {
                    return translate[options.languages].month[this.month()];
                },
                nextmonthtext: function () {
                    return (this.month() === 11) ? translate[options.languages].month[0] : translate[options.languages].month[this.month() + 1];
                },
                prevmonthtext: function () {
                    return (this.month() === 0) ? translate[options.languages].month[11] : translate[options.languages].month[this.month() - 1];
                },
                smonthtext: function () {
                    return translate[options.languages].smonth[this.month()];
                },
                snextmonth: function () {
                    return (this.month() === 11) ? translate[options.languages].smonth[0] : translate[options.languages].smonth[this.month() + 1];
                },
                sprevmonth: function () {
                    return (this.month() === 0) ? translate[options.languages].smonth[11] : translate[options.languages].smonth[this.month() - 1];
                },
                datetext: function () {
                    var textdate = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth", "Eleventh", "Twelfth", "Thirteenth", "Fourteenth", "Fifteenth", "Sixteenth", "Seventeenth", "Eightheenth", "Nineteenth", "Twentyith", "TwentyFirst", "TwentySecond", "TwentyThird", 'TwentyFourth', "TwentyFifth", "TwentySixth", "TwentySeventh", "TwentyEight", "TwentyNinth", "Thirtyith", "ThirtyFirst"];
                    return textdate[this.date() - 1];
                },
                nth: function (d) {
                    if (d > 3 && d < 21) {
                        return 'th';
                    }
                    switch (d % 10) {
                    case 1:
                        return "st";
                    case 2:
                        return "nd";
                    case 3:
                        return "rd";
                    default:
                        return "th";
                    }
                },
                dateplus: function () {
                    return this.date() + this.nth(Number(this.date()));
                }
            };
        option.success(funcs);
        setTimeout(function () {
            getTimes();
        }, option.refresh);
    };
    getTimes();
}
var globalClock;

function loadClock() { //clock
    clock({
        twentyfour: options.twentyfour,
        refresh: options.clockrefresh,
        success: function (clock) {
            'use strict';
            globalClock = clock;
            var clockArray = ['ttextstr', 'dateplusplusof', 'dateplusof', 'zclockdot', 'clockdot', 'sclock', 'sclockpadded', 'monthdateyear', 'yearnum', 'sday1','sday2','sday3','smonth1','smonth2','smonth3', 'lngclstring', 'clock', 'zclock', 'clockline', 'clockpm', 'zhour', 'hour', 'minute', 'second', 'pm', 'tod', 'ttext', 'htext', 'mtext', 'date', 'prevdate', 'nextdate', 'dateplus', 'datetext', 'day', 'nextday', 'yestday', 'sday', 'snextday', 'sprevday', 'month', 'nextmonth', 'prevmonth', 'monthstring', 'datedotmonth', 'dateslashmonth', 'datemonth', 'smonth', 'snextmonth', 'sprevmonth', 'monthdot', 'monthline', 'mdy', 'datestring', 'datedash', 'year', 'datemonthrev', 'monthlinespace', 'daydate', 'datestringrev', 'datespace', 'daydotdate', 'hrmin', 'hrmintx', 'daydatemonth', 'daydatesmonth', 'daydatescommamonth', 'yeartext', 'hrnsmin', 'clocksmush', 'datebar', 'datesnslash', 'datesingled', 'hrsmush', 'dayabdatemonth', 'daycommadatemonth', 'nsmd', 'ndsm', 'ndsmd', 'nsmdd', 'ndatedash', 'nsmmyear', 'nmdplusyear', 'nhrtmin', 'nhrtarrowmin', 'nttext', 'datemonthfirst', 'smdotdate', 'datesmdot', 'monthdayyear', 'monthslashdate', 'fullmonthdotdate', 'datedotmonthfull', 'datemonthyear', 'prevdaystrings', 'todaystrings', 'nextdaystrings'];
            for (var i = 0; i < clockArray.length; i++) {
                var div = checkDiv(clockArray[i]);
                if (div) {
                    var value;
                    switch (div.id) {
                    case 'sday1':
                        value = clock.sdaytext().slice(0,1);
                    break;
                    case 'sday2':
                        value = clock.sdaytext().slice(1,2);
                    break;
                    case 'sday3':
                        value = clock.sdaytext().slice(2,3);
                    break;
                    case 'smonth1':
                        value = clock.smonthtext().slice(0,1);
                    break;
                    case 'smonth2':
                        value = clock.smonthtext().slice(1,2);
                    break;
                    case 'smonth3':
                        value = clock.smonthtext().slice(2,3);
                    break;
                    case 'yearnum':
                        value = clock.year().toString().slice(2,4);
                        break;
                    case 'lngclstring':
                        value = "It's " + clock.hour() + ":" + clock.minute() + " on " + clock.daytext() + " the " + clock.dateplus();
                        break;
                    case 'prevdaystrings':
                      value =  clock.yesterdaydaytext() + ' ' + clock.monthtext() + ' ' + clock.prevdate();
                      break;
                    case 'todaystrings':
                      value = clock.daytext() + ' ' + clock.monthtext() + ' ' + clock.date();
                      break;
                    case 'nextdaystrings':
                      value = clock.nextdaytext() + ' ' + clock.monthtext() + ' ' + clock.nextdate();
                      break;
                    case 'datemonthrev':
                        value = clock.monthtext() + " " + clock.date();
                        break;
                    case 'monthlinespace':
                        value = clock.monthtext() + " | " + clock.date() + " | " + clock.year();
                        break;
                    case 'daydate':
                        value = clock.daytext() + " " + clock.date();
                        break;
                    case 'datespace':
                        value = clock.daytext() + " " + clock.monthtext() + " " + clock.date();
                        break;
                    case 'daydotdate':
                        value = clock.daytext() + "." + clock.date();
                        break;
                    case 'datestringrev':
                        value = clock.monthtext() + " " + clock.date() + ", " + clock.daytext();
                        break;
                    case 'hrmintx':
                        value = (clock.minutetwotext() !== "") ? clock.hourtext() + '.' + clock.minuteonetextdot() + '.' + clock.minutetwotext() : clock.hourtext() + '.' + clock.minuteonetextdot() + clock.minutetwotext();
                        break;
                    case 'hrmin':
                        value = clock.hourtext() + '.' + clock.minute();
                        break;
                    case 'daydatemonth':
                        value = clock.daytext() + " | " + clock.date() + " " + clock.monthtext();
                        break;
                    case 'monthdateyear':
                        value = clock.monthtext() + " " + clock.date() + ", " + clock.year();
                        break;
                    case 'clock':
                        value = clock.hour() + ":" + clock.minute();
                        break;
                    case 'clockdot':
                        value = clock.hour() + "." + clock.minute();
                        break;
                    case 'zclockdot':
                        value = clock.zhour() + "." + clock.minute();
                        break;
                    case 'sclock':
                        value = clock.hour() + ":" + clock.minute() + clock.ampmstrict();
                        break;
                    case 'sclockpadded':
                        value = clock.zhour() + ":" + clock.minute() + clock.ampmstrict();
                        break;
                    case 'zclock':
                        value = clock.zhour() + ":" + clock.minute();
                        break;
                    case 'clockline':
                        value = clock.hour() + "|" + clock.minute();
                        break;
                    case 'clockpm':
                        value = clock.hour() + ":" + clock.minute() + clock.am();
                        break;
                    case 'zhour':
                        value = clock.zhour();
                        break;
                    case 'hour':
                        value = clock.hour();
                        break;
                    case 'minute':
                        value = clock.minute();
                        break;
                    case 'second':
                        value = clock.second();
                        break;
                    case 'pm':
                        value = clock.am();
                        break;
                    case 'tod':
                        value = clock.tod();
                        break;
                    case 'ttext':
                        value = clock.hourtext() + " " + clock.minuteonetext() + ' ' + clock.minutetwotext();
                        break;
                    case 'ttextstr':
                        //value = clock.hourtext() + "" + clock.minuteonetext() + '' + clock.minutetwotext() + '<span style="text-transform:uppercase">' + clock.daytext() + "the" + clock.dateplus();
                        value = clock.hourtext() + "" + clock.minuteonetext() + '' + clock.minutetwotext() + '<span style="text-transform:uppercase">' + clock.daytext() + '</span><span style="text-transform:lowercase">the' + clock.dateplus() + '</span>';
                        break;
                    case 'htext':
                        value = clock.hourtext();
                        break;
                    case 'mtext':
                        value = clock.minuteonetext() + ' ' + clock.minutetwotext();
                        break;
                    case 'date':
                        value = clock.date();
                        break;
                    case 'prevdate':
                        value = clock.prevdate();
                        break;
                    case 'nextdate':
                        value = clock.nextdate();
                        break;
                    case 'dateplus':
                        value = clock.dateplus();
                        break;
                    case 'dateplusof':
                        value = clock.dateplus() + " of " + clock.monthtext();
                        break;
                    case 'dateplusplusof':
                        value = clock.daytext() + ", " + clock.dateplus() + " of " + clock.monthtext();
                        break;
                    case 'datetext':
                        value = clock.datetext();
                        break;
                    case 'day':
                        value = clock.daytext();
                        break;
                    case 'nextday':
                        value = clock.nextdaytext();
                        break;
                    case 'yestday':
                        value = clock.yesterdaydaytext();
                        break;
                    case 'sday':
                        value = clock.sdaytext();
                        break;
                    case 'snextday':
                        value = clock.snextday();
                        break;
                    case 'sprevday':
                        value = clock.sprevday();
                        break;
                    case 'month':
                        value = clock.monthtext();
                        break;
                    case 'nextmonth':
                        value = clock.nextmonthtext();
                        break;
                    case 'prevmonth':
                        value = clock.prevmonthtext();
                        break;
                    case 'monthstring':
                        value = clock.monthtext() + " the " + clock.dateplus();
                        break;
                    case 'datedotmonth':
                        value = clock.date() + '.' + clock.monthtext();
                        break;
                    case 'dateslashmonth':
                        value = clock.date() + "/" + clock.monthtext();
                        break;
                    case 'datemonth':
                        value = clock.date() + " " + clock.monthtext();
                        break;
                    case 'smonth':
                        value = clock.smonthtext();
                        break;
                    case 'snextmonth':
                        value = clock.snextmonth();
                        break;
                    case 'sprevmonth':
                        value = clock.sprevmonth();
                        break;
                    case 'monthdot':
                        value = clock.monthtext() + "." + clock.date();
                        break;
                    case 'monthline':
                        value = clock.monthtext() + "|" + clock.date() + "|" + clock.year();
                        break;
                    case 'mdy':
                        value = (clock.month() + 1) + "/" + clock.date() + "/" + clock.year();
                        break;
                    case 'datestring':
                        value = clock.daytext() + ", " + clock.monthtext() + " " + clock.date();
                        break;
                    case 'datedash':
                        value = clock.daytext() + "-" + clock.monthtext() + "-" + clock.date();
                        break;
                    case 'year':
                        value = clock.year();
                        break;
                    case 'daydatesmonth':
                        value = clock.daytext() + ' ' + clock.date() + ' ' + clock.smonthtext();
                        break;
                    case 'daydatescommamonth':
                        value = clock.daytext() + ', ' + clock.date() + ' ' + clock.smonthtext();
                        break;
                    case 'yeartext':
                        value = convertTOWord(clock.year());
                        break;
                    case 'datebar':
                        value = (clock.month() + 1) + '|' + clock.date() + '|' + clock.smyear();
                        break;
                    case 'datesnslash':
                        value = (clock.month() + 1) + '/' + clock.date() + '/' + clock.smyear();
                        break;
                    case 'datesingled':
                        value = (clock.month() + 1) + '-' + clock.date() + '-' + clock.smyear();
                        break;
                    case 'hrsmush':
                        value = clock.hourtext() + '' + clock.minute();
                        break;
                    case 'dayabdatemonth':
                        value = clock.sdaytext() + ' ' + clock.date() + ' ' + clock.smonthtext();
                        break;
                    case 'daycommadatemonth':
                        value = clock.sdaytext() + ', ' + clock.date() + ' ' + clock.smonthtext();
                        break;
                    case 'hrnsmin':
                        value = clock.hourtext() + ' ' + clock.minute();
                        break;
                    case 'clocksmush':
                        value = clock.hour() + "" + clock.minute();
                        break;
                    case 'datemonthfirst':
                        value = clock.date() + ' ' + clock.monthtext();
                        break;
                    case 'nsmd':
                        value = clock.smonthtext() + " " + clock.date();
                        break;
                    case 'ndsm':
                        value = clock.date() + " " + clock.smonthtext();
                        break;
                    case 'ndsmd':
                        value = clock.date() + " " + clock.sdaytext();
                        break;
                    case 'nsmdd':
                        value = clock.sdaytext() + " " + clock.date();
                        break;
                    case 'ndatedash':
                        value = clock.daytext() + " - " + clock.monthtext() + " - " + clock.date();
                        break;
                    case 'nsmmyear':
                        value = clock.smonthtext() + " " + clock.year();
                        break;
                    case 'nmdplusyear':
                        value = clock.monthtext() + " " + clock.dateplus() + " " + clock.year();
                        break;
                    case 'nhrtmin':
                        value = clock.hourtext() + ':' + clock.minute();
                        break;
                    case 'nhrtarrowmin':
                        value = clock.hourtext() + '>>' + clock.minute();
                        break;
                    case 'nttext':
                        value = "[" + clock.hourtext() + "]" + "" + clock.minuteonetext() + '' + clock.minutetwotext();
                        break;
                    case 'smdotdate':
                        value = clock.smonthtext() + '.' + clock.date();
                        break;
                    case 'datesmdot':
                        value = clock.date() + '.' + clock.smonthtext();
                        break;
                    case 'monthdayyear':
                        value = clock.monthtext() + " " + clock.date() + " " + clock.year();
                        break;
                    case 'monthslashdate':
                        value = clock.monthtext() + '/' + clock.date();
                        break;
                    case 'fullmonthdotdate':
                        value = clock.monthtext() + '.' + clock.date();
                        break;
                    case 'datedotmonthfull':
                        value = clock.date() + '.' + clock.monthtext();
                        break;
                    case 'datemonthyear':
                        value = clock.date() + ' ' + clock.monthtext() + ', ' + clock.year();
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
            };
        }
    });
} //end clock
