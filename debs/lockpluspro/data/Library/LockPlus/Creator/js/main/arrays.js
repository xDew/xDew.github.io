/*jslint
  white: true
*/
/*global
  cF,
  convertTOWord
*/

/**
 * holds the array of fonts
 * Defines clock, weather, system, and misc elements
 * Loads after clock.js as it contains cF and convertTOWord
 */

 var fontArray = ['abeatbykai', 'adamasreg', 'android', 'aileronlight', 'aileronthin', 'aileronbold', 'aileronthick'
                 , 'aileronultra', 'aileronheavy', 'ailerons', 'akrobatblack', 'akrobatbold', 'akrobatexbold', 'akrobatlight'
                 , 'akrobatregular', 'akrobatsemibold', 'akrobatthin', 'akrobatxlight'
                 , 'allura', 'alpine', 'apriolight', 'aprioreg', 'anders', 'arista'
                 , 'autograf', 'avantgarde', 'aventura', 'azedobold', 'azedolight'
                 , 'back', 'bariollight', 'bariolthin', 'bariolbold'
                 , 'bikoblack', 'bikoregular', 'bikobold', 'bebasbold', 'bebaslight', 'bebasneue', 'bebasneueregular','blanch'
                 , 'breaksemi', 'braxton', 'building'
                 , 'canter', 'canarolight', 'captian', 'clemente', 'codebold', 'codelight', 'condlight'
                 , 'cooperhewiththin', 'cooperhewittbold', 'cooperhewittbook', 'cooperhewittlight', 'cooperhewittreg'
                 , 'crafted', 'cumulous'
                 , 'damier', 'din', 'dinerfat', 'disclaimerclassic', 'disclaimerreg', 'dense'
                 , 'earth', 'everafte', 'establo'
                 , 'fabfelt', 'feast', 'flow', 'freeky', 'fronte', 'futura', 'future', 'fringe', 'fortuna'
                 , 'geoma', 'gido' , 'gasaltreg', 'gasaltthin', 'gasaltbold', 'globerreg', 'globerthin'
                 , 'geoman', 'goodvibes', 'gothicregular', 'gothicbold'
                 , 'hab', 'hallo', 'hanging', 'high', 'higher', 'huxlee', 'heygorgeous'
                 , 'ikaros', 'infinity', 'inkferno'
                 , 'jaapokki', 'jellyka'
                 , 'kanji', 'kaneda', 'king', 'krinkles', 'krinklesdecor'
                 , 'lcd', 'lg', 'lobster', 'lot', 'loveloblack', 'latoblack', 'latobold', 'latolight', 'latoreg', 'latothin'
                 , 'loveloline', 'lovelolinel', 'manbow', 'nexabold', 'nexabolder', 'nexalight', 'manifesto', 'manteka'
                 , 'makhina', 'masterofbreak', 'mikadolight', 'mikadoregular', 'mikadobold', 'mikadomedium', 'mikadoultra', 'mikadoblack'
                 , 'modernesans', 'moonlight', 'moonbold', 'moonshinerround', 'moonshinersharp','mohave', 'mostwasted'
                 , 'olympic', 'oswald'
                 , 'panama','penelope', 'perfo', 'plstk', 'poplar', 'provisionary', 'pushkin'
                 , 'quadrantabold', 'quadrantareg', 'qontra'
                 , 'ratinfested', 'reckoner', 'reboard', 'realtimethin', 'realtimelight'
                 , 'realtimeregular', 'realtimesemi', 'realtimebold', 'rexbold', 'roadrage', 'robotobold', 'robotolight', 'robotoregular'
                 , 'salamat', 'samster', 'samsunglight', 'samsungregular', 'samsungexlight', 'samsungreg', 'sanfranlight'
                 , 'sanfranthin', 'sanfranreg', 'sanfranbold', 'sanfranheavy', 'sciflysans', 'streamster', 'shimes'
                 , 'shimestwo', 'signer', 'scriptina'
                 , 'storopia', 'superair'
                 , 'talldark', 'timber', 'tiza', 'track', 'tresdias'
                 , 'wildyouth'
                 , 'zekton', 'zelda', 'entypo', 'mat1', 'mat2', 'mat3', 'mat4', 'mat5'

 ];

var elementPanel = {
    clockElements: {
        clocks: {
            title: "Clocks",
            clock: cF.hour() + ":" + cF.minute(),
            clocksmush: cF.hour() + "" + cF.minute(),
            clockline: cF.hour() + "|" + cF.minute(),
            zclock: cF.zhour() + ":" + cF.minute(),

            clockdot: cF.hour() + "." + cF.minute(),
            zclockdot: cF.zhour() + "." + cF.minute() + " (Padded)",

            clockpm: cF.hour() + ":" + cF.minute() + cF.am(),

            sclock: cF.hour() + ":" + cF.minute() + cF.ampmstrict() + " (always show am/pm)",
            sclockpadded: cF.zhour() + ":" + cF.minute() + cF.ampmstrict() + " (padded always show am/pm)",

            hour: cF.hour() + " (hour)",
            zhour: cF.zhour() + " (padded hour)",
            minute: cF.minute() + " (minute)",
            second: cF.second() + " (seconds)",
            pm: cF.am() + " (am or pm)",
            htext: cF.hourtext() + " (hour text)",
            mtext: cF.minuteonetext() + ' ' + cF.minutetwotext() + " (minute text)",
            tod: cF.tod() + " (time of day)",
            hrmin: cF.hourtext() + '.' + cF.minute(),
            hrnsmin: cF.hourtext() + ' ' + cF.minute(),
            hrsmush: cF.hourtext() + cF.minute(),
            hrmintx: (cF.minutetwotext() !== "") ? cF.hourtext() + '.' + cF.minuteonetextdot() + '.' + cF.minutetwotext() : cF.hourtext() + '.' + cF.minuteonetextdot() + cF.minutetwotext(),
            ttext: cF.hourtext() + " " + cF.minuteonetext() + ' ' + cF.minutetwotext(),

            ttextstr: cF.hourtext() + "" + cF.minuteonetext() + '' + cF.minutetwotext() + '<p style="text-transform:uppercase">' + cF.daytext() + '</p><p style="text-transform:lowercase">the' + cF.dateplus() + '</p>',

            nhrtmin: cF.hourtext() + ':' + cF.minute(),
            nhrtarrowmin: cF.hourtext() + '>>' + cF.minute(),
            nttext: "[" + cF.hourtext() + "]" + cF.minuteonetext() + cF.minutetwotext(),
            lngclstring: "It's " + cF.hour() + ":" + cF.minute() + " on " + cF.daytext().toLowerCase() + " the " + cF.dateplus()
        },
        dates: {
            title: "Dates",
            date: cF.date(),
            dateplus: cF.dateplus(),
            datetext: cF.datetext(),
            prevdate: cF.prevdate() + " (yesterday's date)",
            nextdate: cF.nextdate() + " (tomorrow's date)",
            day: cF.daytext(),
            sday: cF.sdaytext(),
            sday1: cF.sdaytext().slice(0,1) + " (first letter of day)",
            sday2: cF.sdaytext().slice(1,2) + " (second letter of day)",
            sday3: cF.sdaytext().slice(2,3) + " (third letter of day)",
            yestday: cF.yesterdaydaytext() + " (previous day)",
            sprevday: cF.sprevday() + " (previous day short)",
            nextday: cF.nextdaytext() + " (next day)",
            snextday: cF.snextday() + " (next day short)",
            month: cF.monthtext(),
            smonth: cF.smonthtext(),
            smonth1: cF.smonthtext().slice(0,1) + " (first letter of month)",
            smonth2: cF.smonthtext().slice(1,2) + " (second letter of month)",
            smonth3: cF.smonthtext().slice(2,3) + " (third letter of month)",
            prevmonth: cF.prevmonthtext() + " (previous month)",
            sprevmonth: cF.sprevmonth() + " (previous month short)",
            nextmonth: cF.nextmonthtext() + " (next month)",
            snextmonth: cF.snextmonth() + " (next month short)",
            year: cF.year(),
            yearnum: cF.year().toString().slice(2,4) + " (year)",
            yeartext: convertTOWord(cF.year()),
            dateplusof : cF.dateplus() + " of " + cF.monthtext(),
            dateplusplusof : cF.daytext() + ", " + cF.dateplus() + " of " + cF.monthtext(),
            datestring: cF.daytext() + ", " + cF.monthtext() + " " + cF.date(),
            datedash: cF.daytext() + "-" + cF.monthtext() + "-" + cF.date(),
            datespace: cF.daytext() + " " + cF.monthtext() + " " + cF.date(),
            ndatedash: cF.daytext() + " - " + cF.monthtext() + " - " + cF.date(),
            monthdateyear: cF.monthtext() + " " + cF.date() + ", " + cF.year(),
            daydatesmonth: cF.daytext() + ' ' + cF.date() + ' ' + cF.smonthtext(),
            daydatescommamonth: cF.daytext() + ', ' + cF.date() + ' ' + cF.smonthtext(),
            monthlinespace: cF.monthtext() + " | " + cF.date() + " | " + cF.year(),
            monthline: cF.monthtext() + "|" + cF.date() + "|" + cF.year(),
            monthdayyear: cF.monthtext() + " " + cF.date() + " " + cF.year(),
            datestringrev: cF.monthtext() + " " + cF.date() + ", " + cF.daytext(),
            datedotmonth: cF.date() + '.' + cF.monthtext(),
            monthdot: cF.monthtext() + "." + cF.date(),
            daydatemonth: cF.daytext() + " | " + cF.date() + " " + cF.monthtext(),
            dayabdatemonth: cF.sdaytext() + ' ' + cF.date() + ' ' + cF.smonthtext(),
            daycommadatemonth: cF.sdaytext() + ', ' + cF.date() + ' ' + cF.smonthtext(),
            daydate: cF.daytext() + " " + cF.date(),
            daydotdate: cF.daytext() + "." + cF.date(),
            datebar: cF.month() + 1 + '|' + cF.date() + '|' + cF.smyear(),
            datesnslash: cF.month() + 1 + '/' + cF.date() + '/' + cF.smyear(),
            datesingled: cF.month() + 1 + '-' + cF.date() + '-' + cF.smyear(),
            mdy: cF.month() + 1 + "/" + cF.date() + "/" + cF.year(),
            nsmd: cF.smonthtext() + " " + cF.date(),
            ndsm: cF.date() + " " + cF.smonthtext(),
            ndsmd: cF.date() + " " + cF.sdaytext(),
            nsmdd: cF.sdaytext() + " " + cF.date(),
            smdotdate: cF.smonthtext() + '.' + cF.date(),
            datesmdot: cF.date() + '.' + cF.smonthtext(),
            dateslashmonth: cF.date() + "/" + cF.monthtext(),
            monthslashdate: cF.monthtext() + "/" + cF.date(),
            datemonth: cF.date() + " " + cF.monthtext(),
            datemonthrev: cF.monthtext() + " " + cF.date(),
            fullmonthdotdate: cF.monthtext() + '.' + cF.date(),
            datedotmonthfull: cF.date() + '.' + cF.monthtext(),
            nsmmyear: cF.smonthtext() + " " + cF.year(),
            nmdplusyear: cF.monthtext() + " " + cF.dateplus() + " " + cF.year(),
            datemonthyear: cF.date() + ' ' + cF.monthtext() + ', ' + cF.year(),
            prevdaystrings: cF.yesterdaydaytext() + ' ' + cF.monthtext() + ' ' + cF.prevdate(),
            todaystrings: cF.daytext() + ' ' + cF.monthtext() + ' ' + cF.date(),
            nextdaystrings: cF.nextdaytext() + ' ' + cF.monthtext() + ' ' + cF.nextdate()
        }
    },
    weatherElements: {
        wstring: {
            title: "String",
            tempcon: "76 Cloudy",
            tempcon1: "76°f Cloudy",
            tempcon2: "76° Cloudy",
            contemp: "Cloudy 76°",
            contemp2: "Cloudy 76°f",
            windstr: "25mph N",
            lngwstring: "It's cloudy outside and the temp is around 35&deg;.",
            lngwstring2: "Currently it's 35&deg; outside.",
            lngwstring3: "Currently it's cloudy, the high today will reach 60&deg; </br> Right now it's 90&deg; and your battery is 50%",
            lngwstring4: "It could be cloudy and 50&deg; but who really knows. </br> What I can tell you is your battery is 50%:)",
            lngwstring5: "The current temperature is 90&deg;, it's cloudy with a wind speed of 30mph. </br> Your battery is at 90% and is charging.",
        },
        temps: {
            title: "Temp",
            temp: "76",
            tempdeg: "76°",
            tempdegplus: "76°f"
        },
        icon: {
            title: "Icon",
            icon: "Weather"
        },
        highs: {
            title: "High",
            high: "80",
            highdeg: "80°",
            highdegplus: "80°f"
        },
        lows: {
            title: "Low",
            low: "70",
            lowdeg: "70°",
            lowdegplus: "70°f"
        },
        lowhigh: {
            title: "High and Low",
            highdashlow: "80-70",
            highdashlowdeg: "80°-70°",
            highslashlow: "80/70",
            highslashlowdeg: "80°/70°"
        },
        city: {
            title: "City",
            city: "Current City"
        },
        condition: {
            title: "Condition",
            condition: "Cloudy"
        },
        humidity: {
            title: "Humidity",
            humidity: "60"
        },
        windchill: {
            title: "Wind Chill",
            windchill: "20°"
        },
        wind: {
            title: "Wind",
            wind: "25mph",
            winddirection: "N"
        },
        visibility: {
            title: "Visibility",
            visibility: "20miles"
        },
        rain: {
            title: "Rain",
            rain: "20%"
        },
        dewpoint: {
            title: "Dewpoint",
            dewpoint: "40°"
        },
        feelslike: {
            title: "FeelsLike",
            feelslike: "90",
            feelslikedeg: "90°"
        },
        suntime: {
            title: "Sun",
            sunrise: "5:00 (sunset)",
            sunset: "7:00 (sunrise)"
        },
        update: {
            title: "Last Updated",
            update: "Last Updated"
        }

    },
    systemElements: {
        phone: {
            title: "Phone name",
            name: "My iPhone"
        },
        firmware: {
            title: "Firmware",
            firmware: "Version 8.3"
        },
        battery: {
            title: "Battery",
            battery: "100",
            batterypercent: "100%",
            batteryperslashcharge: "80% / charging",
            chargingtxt: "Not Charging",
            chargingstate: "Charging"
        },
        memory: {
            title: "Memory",
            ramFree: "700 (Free)",
            ramUsed: "100 (Used)",
            ramAvailable: "800 (Available)",
            ramFreeMB: "700mb (Free)",
            ramUsedMB: "100mb (Used)",
            ramAvailableMB: "800mb (Available)"
        },
        unlock: {
            title: "Unlock",
            unlock: "Unlock"
        },
        signal: {
            title: "Signal",
            signal: "3",
            signalpercent: "40%"
        },
        alarm: {
            title: "Alarm",
            alarm24: "10:30 AM",
            alarmstring: "Tue 10:30 AM",
            alarmstringsmall: "Tue 10:30",
            alarm: "8:00",
            alarmhr: "8",
            alarmmin: "30",
            alarmday: "Tuesday",
            alarmsday: "Tue"
        },
        wifi: {
            title: "Wifi",
            wifi: "20",
            wifipercent: "20%"
        },
        notifications: {
            title: "Notifications",
            notifymail: "Mail",
            notifysms: "SMS",
            notifyphone: "Phone",
            notifywhats: "WhatsApp",
            notifytelegram: "Telegram"
        }
    },
    miscElements: {
        text: {
            title: "Text Elements",
            textOne: "Custom Text 1",
            textTwo: "Custom Text 2",
            textThree: "Custom Text 3",
            textFour: "Custom Text 4",
            textFive: "Custom Text 5",
            textSix: "Custom Text 6",
            textSeven: "Custom Text 7",
            textEight: "Custom Text 8",
            textNine: "Custom Text 9",
            textTen: "Custom Text 10",
            textEleven: "Custom Text 11",
            textTwelve: "Custom Text 12",
            textThirteen: "Custom Text 13",
            textFourteen: "Custom Text 14",
            textFifteen: "Custom Text 15",
            textSixteen: "Custom Text 16",
            textSeventeen: "Custom Text 17",
            textEighteen: "Custom Text 18",
            textNineteen: "Custom Text 19",
            textTwenty: "Custom Text 20",
            textTwentyOne: "Custom Text 21"
        },
        box: {
            title: "Squares",
            boxOne: "Custom Box 1",
            boxTwo: "Custom Box 2",
            boxThree: "Custom Box 3",
            boxFour: "Custom Box 4",
            boxFive: "Custom Box 5",
            boxSix: "Custom Box 6",
            boxSeven: "Custom Box 7",
            boxEight: "Custom Box 8",
            boxNine: "Custom Box 9",
            boxTen: "Custom Box 10",
            boxEleven: "Custom Box 11",
            boxTwelve: "Custom Box 12",
            boxThirteen: "Custom Box 13",
            boxFourteen: "Custom Box 14",
            boxFifteen: "Custom Box 15",
            boxSixteen: "Custom Box 16",
            boxSeventeen: "Custom Box 17",
            boxEighteen: "Custom Box 18",
            boxNineteen: "Custom Box 19",
            boxTwenty: "Custom Box 20"
        },
        circle: {
            title: "Circles",
            boxCircleOne: "Custom Circle 1",
            boxCircleTwo: "Custom Circle 2",
            boxCircleThree: "Custom Circle 3",
            boxCircleFour: "Custom Circle 4",
            boxCircleFive: "Custom Circle 5",
            boxCircleSix: "Custom Circle 6",
            boxCircleSeven: "Custom Circle 7",
            boxCircleEight: "Custom Circle 8",
            boxCircleNine: "Custom Circle 9",
            boxCircleTen: "Custom Circle 10",
            boxCircleEleven: "Custom Circle 11",
            boxCircleTwelve: "Custom Circle 12",
            boxCircleThirteen: "Custom Circle 13",
            boxCircleFourteen: "Custom Circle 14",
            boxCircleFifteen: "Custom Circle 15",
            boxCircleSixteen: "Custom Circle 16",
            boxCircleSeventeen: "Custom Circle 17",
            boxCircleEighteen: "Custom Circle 18",
            boxCircleNineteen: "Custom Circle 19",
            boxCircleTwenty: "Custom Circle 20"
        },
        apps: {
            title: "Apps 1",
            app1: "Mail",
            app2: "SMS",
            app3: "Phone",
            app4: "Twitter",
            app5: "Tweetbot",
            app6: "Telegram"
        },
        apps2: {
            title: "Apps 2",
            app7: "Instagram",
            app8: "Pandora",
            app9: "Spotify",
            app10: "Facebook",
            app11: "Kik",
            app12: "YouTube"
        },
        apps3: {
            title: "Apps 3",
            app13: "WhatsApp",
            app14: "Safari",
            app15: "Weather",
            app16: "Clock",
            app17: "Music",
            app18: "Camera"
        },
        apps4: {
            title: "Apps 4",
            app19: "Reminders",
            app20: "Notes",
            app21: "Maps",
            app22: "Calendar",
            app23: "Calculator",
            app24: "Cydia"
        },
        apps5: {
            title: "Apps 5",
            app25: "YouTube",
            app26: "Settings",
            app27: "AppStore",
            app28: "Health"
        }
    }
};
