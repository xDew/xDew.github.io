'use strict';


/*
    Created by JunesiPhone
    Website: http://junesiphone.com/

    WS = weatherStart
    Object contains functions to check weather from InfoStats.currentIcon() and create the needed animation.
    It also contains helper funcitons for the animation objects.

*/

var WS = {
    weatherCode: 0, //IS2 InfoStats.currentIcon()
    refreshRate: 60000 * 10, //10 minutes
    rainColor: 'white', // String(options.dropColor)
    rainType: 'lines', //normal, lines
    starsOut: true,
    weatherParts: [], //array containing rain or snow
    snowCodes: [5, 6, 7, 13, 14, 15, 16, 41, 42, 43, 46],
    rainCodes: [1, 2, 3, 4, 8, 9, 10, 11, 12, 17, 18, 35, 37, 38, 39, 40, 42, 45, 47],
    cloudCodes: [0, 19, 20, 21, 22, 26, 27, 28, 29, 30, 44, 34, 33],
    lightningCodes: [1, 2, 3, 4, 37, 38, 39, 45, 47],
    rainAni: null,
    cloudAni: null,
    lightningAni: null,
    compare: function (code, parts, rainAni, cloudAni, lightningAni, starsOut) {
        //Check to see if any codes match a weather animation
        if (code.indexOf(this.weatherCode) > -1) {
            if (parts !== null) {
                this.weatherParts.push(parts);
            }
            if (rainAni) {
                this.rainAni = rainAni;
            }
            if (cloudAni) {
                this.cloudAni = cloudAni;
            }
            if (lightningAni) {
                this.lightningAni = lightningAni;
            }
            if (!starsOut) {
                this.starsOut = starsOut;
            }
        }
    },
    updateWeather: function () {
        var newWeatherCode = injectedWeather.conditionCode;

        if (this.weatherCode !== newWeatherCode) {
            this.weatherCode = newWeatherCode;
            document.getElementById('animations').innerHTML = '';
            this.loadConditions();
        }

        setTimeout(function () {
            WS.updateWeather();
        }, WS.refreshRate);
    },
    loadConditions: function () {
        if (WS.rainAni) {
            rainOBJ.rainInit();
        }
        if (WS.cloudAni) {
            cloudOBJ.cloudInit();
        }
        if (WS.lightningAni) {
            lightningOBJ.lightningInit();
        }

        //stars
        var hr = (new Date()).getHours();
        if (hr > 6 && hr < 20) {
            //Do something for day
        } else {
            if (WS.starsOut && !WS.cloudAni && !WS.rainAni && !WS.lightningAni) {
                starOBJ.starInit();
            }
        }
    },
    init: function () {
        this.updateWeather();

        this.compare(this.snowCodes, 'snow', true, false, false, false);
        this.compare(this.rainCodes, 'rain', true, false, false, false);
        this.compare(this.cloudCodes, null, false, true, false, false);
        this.compare(this.lightningCodes, null, false, false, true, false);

        this.loadConditions();

    },
    createCanvas: function (id, width, height) {
        var canvas = document.createElement('canvas');
        canvas.id = id;
        canvas.width = width;
        canvas.height = height;
        canvas.style.position = 'absolute';
        document.getElementById('animations').appendChild(canvas);
        return canvas;
    },
    randomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    randomNum: function (min, max) {
        return Math.random() * (max - min + 1) + min;
    },

};




// ************* BEGIN RAIN/SNOW ******************

var rainOBJ = {
    canvas: null,
    context: null,
    bufferCanvas: null,
    bufferCanvasCtx: null,
    flakeArray: {},
    flakeTimer: {},
    flakeProperties: {
        'snow': {
            'max': 40,
            'spawnDelay': 200
        },
        'rain': {
            'max': 20,
            'spawnDelay': 200,
            'minSpeed': 7,
            'maxSpeed': 13,
            'minSize': 3,
            'maxSize': 5
        }
    },
    requestAnimFrame: function () {
        return window.requestAnimationFrame;
    },
    Flake: function (type) {
        this.type = type;
        switch (type) {
        case 'rain':
            this.speed = {
                'x': 1,
                'y': WS.randomInt(rainOBJ.flakeProperties['rain']['minSpeed'], rainOBJ.flakeProperties['rain']['maxSpeed'])
            };
            this.width = WS.randomInt(rainOBJ.flakeProperties['rain']['minSize'], rainOBJ.flakeProperties['rain']['maxSize']);
            this.y = -10;
            this.colorFade = "rgba(255,255,255," + Math.random() + ")";
            this.position = {
                'xLeft': this.width / 2,
                'xRight': this.width / 2,
                'yUp': 7,
                'yDown': this.width / 2
            };
            break;
        case 'snow':
            this.width = (Math.random() * 3) + 2;
            this.speed = {
                'x': Math.random(),
                'y': Math.round(Math.random() * 5) + 1
            };
            this.position = {
                'xLeft': this.width / 2,
                'xRight': this.width / 2,
                'yUp': 7,
                'yDown': this.width / 2
            };
            this.y = -10;
            break;
        }
        this.x = Math.round(Math.random() * rainOBJ.context.canvas.width);
        //this.y = -10;
        this.height = this.width;
        this.drawToCanvas = function (ctx) {
            switch (type) {
            case 'rain':
                if (WS.rainType === 'normal') {
                    ctx.fillStyle = this.colorFade;
                    ctx.beginPath();
                    ctx.moveTo(this.x - this.width / 2, this.y);
                    ctx.lineTo(this.x, this.y - 7);
                    ctx.lineTo(this.x + this.width / 2, this.y);
                    ctx.arc(this.x, this.y, this.width / 2, 0, Math.PI);
                }
                if (WS.rainType === 'lines') {
                    ctx.fillStyle = this.colorFade;
                    ctx.beginPath();
                    ctx.moveTo(this.x - this.width / 2, this.y);
                    ctx.rect(this.x, this.y, 0.8, 30);
                }
                break;
            case 'snow':
                ctx.fillStyle = "rgba(255,255,255,0.8)";
                ctx.beginPath();
                ctx.arc(this.x, this.y, 2, 10, 0, true);
                break;
            }
            ctx.closePath();
            ctx.fill();
        };
    },
    rainInit: function () {
        this.canvas = WS.createCanvas('canvasRain', window.screen.width, window.screen.height);
        this.context = this.canvas.getContext("2d");
        this.bufferCanvas = document.createElement("canvas");
        this.bufferCanvasCtx = this.bufferCanvas.getContext("2d");
        this.bufferCanvasCtx.canvas.width = this.context.canvas.width;
        this.bufferCanvasCtx.canvas.height = this.context.canvas.height;
        this.addFlakes();
        this.Draw();
        (function animloop() {
            window.requestAnimationFrame(animloop);
            rainOBJ.animate();
        }());
    },
    addFlake: function (weatherType) {
        this.flakeArray[weatherType].push(new this.Flake(weatherType));
        if (this.flakeArray[weatherType].length === this.flakeProperties[weatherType]['max'] && this.flakeTimer[weatherType]) { // If we've hit the max, and just verify it exists to prevent errors
            clearInterval(this.flakeTimer[weatherType]);
        }
    },
    blank: function () {
        this.context.save();
        this.bufferCanvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    animate: function () {
        this.Update();
        this.Draw();
    },
    Update: function () {
        var i;
        Object.keys(this.flakeArray).forEach(function (key) {
            for (i = 0; i < rainOBJ.flakeArray[key].length; i += 1) {
                if (rainOBJ.flakeArray[key][i].y - rainOBJ.flakeArray[key][i].position['yUp'] <= rainOBJ.context.canvas.height) {
                    rainOBJ.flakeArray[key][i].y += rainOBJ.flakeArray[key][i].speed.y;
                    if (rainOBJ.flakeArray[key][i].y - rainOBJ.flakeArray[key][i].position['yUp'] > rainOBJ.context.canvas.height) { // If it's gone beyond the bottom of the screen
                        rainOBJ.flakeArray[key][i].y = rainOBJ.flakeArray[key][i].position['yDown'] * -1;
                        rainOBJ.flakeArray[key][i].x += rainOBJ.flakeArray[key][i].speed.x;
                    }
                    if (rainOBJ.flakeArray[key][i].x - rainOBJ.flakeArray[key][i].position['xLeft'] > rainOBJ.context.canvas.width) {
                        rainOBJ.flakeArray[key][i].x = rainOBJ.flakeArray[key][i].position['xRight'] * -1;
                    }
                    if (rainOBJ.flakeArray[key][i].y >= rainOBJ.canvas.height) { //move rain after it's hit the bottom
                        rainOBJ.flakeArray[key][i].x = WS.randomNum(0, rainOBJ.canvas.width);
                    }
                }
            }
        });
    },
    addFlakes: function () {
        var i, k, weatherType;
        for (i = 0; i < WS.weatherParts.length; i += 1) {
            this.flakeArray[WS.weatherParts[i]] = []; // Create an empty array for each of the flake types

            if (this.flakeProperties[WS.weatherParts[i]]['spawnDelay']) { // If it's something that should be introduced over a delay
                weatherType = WS.weatherParts[i];
                this.flakeTimer[WS.weatherParts[i]] = setInterval(function () {
                    rainOBJ.addFlake(weatherType);
                }, this.flakeProperties[WS.weatherParts[i]]['spawnDelay']); // Incrementally introduce the flakes
            } else { // They should all be introduced at the same time
                for (k = 0; k < this.flakeProperties[WS.weatherParts[i]]['max']; k += 1) {
                    this.addFlake(WS.weatherParts[i]);
                }
            }
        }
    },
    Draw: function () {
        var i;
        this.context.save();
        this.blank();
        Object.keys(rainOBJ.flakeArray).forEach(function (key) { // Go through each of the arrays for each type of flake
            for (i = 0; i < rainOBJ.flakeArray[key].length; i += 1) { // Go through each flake in this type
                rainOBJ.flakeArray[key][i].drawToCanvas(rainOBJ.bufferCanvasCtx); // Call its draw function
            }
        });
        this.context.drawImage(this.bufferCanvas, 0, 0, this.bufferCanvas.width, this.bufferCanvas.height);
        this.context.restore();
    }
};

// ************* END RAIN/SNOW ******************


// ************* BEGIN CLOUDS ******************

var cloudOBJ = {
    canvasCTX: null,
    leftMax: -250,
    speed: 0.5,
    variationCount: 6,
    currentTop: WS.randomNum(-50, 300),
    randomStep: Math.round(WS.randomNum(1, this.variationCount) - 1),
    step: this.randomStep > 0 ? this.randomStep : 2,
    topNum: function () {
        return WS.randomNum(-50, 300);
    },
    clearCanvas: function () {
        this.canvasCTX.save();
        this.canvasCTX.clearRect(0, 0, window.screen.width, window.screen.height);
    },
    drawClouds: function () {
        var cloudCanvas = document.getElementById('canvasCloud'),
            imageObj,
            imageObj2,
            imageObj3;
        this.canvasCTX = cloudCanvas.getContext("2d");
        imageObj = new Image();
        imageObj2 = new Image();
        imageObj3 = new Image();
        imageObj.onload = function () {
            (function animloop() {
                window.requestAnimationFrame(animloop);
                cloudOBJ.aniCloud(cloudOBJ.canvasCTX, imageObj, imageObj2, imageObj3);
            }());
        };
        imageObj.src = 'animation/cloud1.png';
        imageObj2.src = 'animation/cloud2.png';
        imageObj3.src = 'animation/cloud3.png';
    },
    cloudInit: function () {
        WS.createCanvas('canvasCloud', window.screen.width, window.screen.height);
        this.drawClouds();
    },
    aniCloud: function (ctx, image1, image2, image3) {
        this.leftMax = this.leftMax + this.speed;
        var leftMax = this.leftMax,
            topNum = this.currentTop,
            imgWidth = 400,
            imgHeight = 200,
            step = this.step;
        if (leftMax === window.screen.width) {
            ctx.globalAlpha = Math.random();
            step += 1;
            this.step = step;
            this.leftMax = -440;
            this.currentTop = this.topNum();
            if (step > this.variationCount) {
                step = this.randomStep > 0 ? this.randomStep : 2;
                this.step = step;
            } // = ((step + 1) < variationCount) ? step + 1 : 1;
        }
        ctx.save();
        this.clearCanvas();
        switch (step) {
        case 1:
            ctx.drawImage(image1, leftMax, topNum, imgWidth, imgHeight);
            // ctx.drawImage(image2, leftMax, topNum - 50, imgWidth, imgHeight);
            break;
        case 2:
            ctx.drawImage(image3, leftMax, topNum, imgWidth, imgHeight);
            //ctx.drawImage(image1, leftMax - 5, topNum + 10, imgWidth, imgHeight);
            break;
        case 3:
            ctx.drawImage(image2, leftMax, topNum, imgWidth, imgHeight);
            break;
        case 4:
            ctx.drawImage(image2, leftMax, topNum + 20, imgWidth, imgHeight);
            break;
        case 5:
            ctx.drawImage(image1, leftMax, topNum, imgWidth, imgHeight);
            ctx.drawImage(image2, leftMax, topNum - 10, imgWidth, imgHeight);
            break;
        case 6:
            ctx.drawImage(image3, leftMax, topNum, imgWidth, imgHeight);
            ctx.drawImage(image2, leftMax, topNum - 10, imgWidth, imgHeight);
            break;
        }
    }

};

// ************* END CLOUDS ******************

// ************* Start Stars ******************


var starOBJ = {
    cstarWidth: window.screen.width,
    cstarHeight: 200,
    cStarCanvas: null,
    context: null,
    pxs: [],
    twinkle: 10,
    starAmount: 50,
    starInit: function () {
        var i;
        this.cStarCanvas = WS.createCanvas('canvasStar', window.screen.width, 200);
        this.context = this.cStarCanvas.getContext('2d');

        for (i = 0; i < starOBJ.starAmount; i += 1) {
            starOBJ.pxs[i] = new this.Circle();
            starOBJ.pxs[i].resetCX();
        }
        setInterval(starOBJ.drawstar, starOBJ.twinkle);
    },
    drawstar: function () {
        var i;
        starOBJ.context.clearRect(0, 0, starOBJ.cstarWidth, starOBJ.cstarHeight);
        for (i = 0; i < starOBJ.pxs.length; i += 1) {
            starOBJ.pxs[i].fadestar();
            if (i === 18) {
                starOBJ.pxs[i].movestar();
            }
            starOBJ.pxs[i].drawstar();
        }
    },
    Circle: function () {
        this.s = {
            timetolive: 1000,
            xspeed: 20,
            yspeed: 4,
            radius: 0.5,
            rt: 1,
            xorigin: window.screen.width,
            yorigin: 10,
            xdrift: 4,
            ydrift: 3,
            random: true,
            blink: true
        };
        this.resetCX = function () {
            this.x = (this.s.random ? starOBJ.cstarWidth * Math.random() : this.s.xorigin);
            this.y = (this.s.random ? starOBJ.cstarHeight * Math.random() - 50 : this.s.yorigin - 50);
            this.r = ((this.s.radius - 1) * Math.random()) + 1;
            this.dx = (Math.random() * this.s.xspeed) * (Math.random() < 0.5 ? -1 : 1);
            this.dy = (Math.random() * this.s.yspeed) * (Math.random() < 0.5 ? -1 : 1);
            this.hl = (this.s.timetolive / starOBJ.twinkle) * (this.r / this.s.radius);
            this.rt = Math.random() * this.hl;
            this.s.rt = Math.random() + 1;
            this.stop = Math.random() * 0.2 + 0.4;
            this.s.xdrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1);
            this.s.ydrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1);
        };
        this.fadestar = function () {
            this.rt += this.s.rt;
        };
        this.drawstar = function () {
            if (this.s.blink && (this.rt <= 0 || this.rt >= this.hl)) {
                this.s.rt = this.s.rt * -1;
            } else if (this.rt >= this.hl) {
                this.resetCX();
            }
            var newone = 1 - (this.rt / this.hl);
            starOBJ.context.beginPath();
            starOBJ.context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
            starOBJ.context.closePath();
            starOBJ.context.fillStyle = 'rgba(255,255,255,' + newone + ')';
            starOBJ.context.fill();
        };
        this.movestar = function () {
            this.x += (this.rt / this.hl) * this.dx;
            this.y += (this.rt / this.hl) * this.dy;
            if (this.y > starOBJ.cstarHeight - 50 || this.y < 0) {
                this.dy *= -1;
            }
        };
    }
};



/** Lightning **/
var lightningOBJ = {
    canvasEL: null,
    ctx: null,
    width: window.screen.width,
    height: 568,
    lightningArray: [],
    lightTimeCurrent: 0,
    lightTimeTotal: 50,
    randomInterval: 800,
    YminDistance: 10,
    YmaxDistance: 30,
    startPoint: 0,
    lightningInit: function () {
        this.canvasEL = WS.createCanvas('canvasLightning', window.screen.width, window.screen.height);
        this.ctx = this.canvasEL.getContext('2d');
        this.loop();
    },
    randomNumber: function (min, max) {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    },
    clearCanvas: function () {
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.fillStyle = 'rgba(0,0,0,' + this.randomNumber(1, 30) / 100 + ')';
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.globalCompositeOperation = 'source-over';
    },
    updateArray: function () {
        var i = this.lightningArray.length,
            light;
        while (i--) {
            light = this.lightningArray[i];
            light.path.push({
                x: light.path[light.path.length - 1].x + (this.randomNumber(0, light.xRange) - (light.xRange / 2)),
                y: light.path[light.path.length - 1].y + (this.randomNumber(0, light.yRange))
            });
            if (light.path.length > light.pathLimit) {
                this.lightningArray.splice(i, 1);
            }
            light.hasFired = true;
        }
    },
    createBolt: function (x, y, canSpawn) {
        this.lightningArray.push({
            x: x,
            y: y,
            xRange: this.randomNumber(5, 30),
            yRange: this.randomNumber(this.YminDistance, this.YmaxDistance),
            path: [{
                x: x,
                y: y
            }],
            pathLimit: this.randomNumber(10, 40),
            canSpawn: canSpawn,
            hasFired: false
        });
    },
    timer: function () {
        this.lightTimeCurrent += 1;
        if (this.lightTimeCurrent >= this.lightTimeTotal) {
            var newX = this.randomNumber(100, this.width - 100),
                newY = this.startPoint,
                createCount = this.randomNumber(1, 3);
            while (createCount--) {
                this.createBolt(newX, newY, true);
            }
            this.lightTimeCurrent = 0;
            this.lightTimeTotal = this.randomNumber(30, this.randomInterval);
        }
    },
    loop: function () {
        var loopIt = function () {
            window.requestAnimationFrame(loopIt, lightningOBJ.canvas);
            lightningOBJ.clearCanvas();
            lightningOBJ.updateArray();
            lightningOBJ.timer();
            lightningOBJ.render();
        };
        loopIt();
    },
    render: function () {
        var i = this.lightningArray.length,
            light,
            pathCount,
            pc;
        while (i--) {
            light = this.lightningArray[i];

            this.ctx.strokeStyle = 'hsla(0, 100%, 100%, ' + this.randomNumber(10, 100) / 100 + ')';
            this.ctx.lineWidth = 1;
            if (this.randomNumber(0, 30) === 0) {
                this.ctx.lineWidth = 2;
            }
            if (this.randomNumber(0, 60) === 0) {
                this.ctx.lineWidth = 3;
            }
            if (this.randomNumber(0, 90) === 0) {
                this.ctx.lineWidth = 4;
            }
            if (this.randomNumber(0, 120) === 0) {
                this.ctx.lineWidth = 5;
            }
            if (this.randomNumber(0, 150) === 0) {
                this.ctx.lineWidth = 6;
            }

            this.ctx.beginPath();

            pathCount = light.path.length;
            this.ctx.moveTo(light.x, light.y);
            for (pc = 0; pc < pathCount; pc += 1) {

                this.ctx.lineTo(light.path[pc].x, light.path[pc].y);

                if (light.canSpawn) {
                    if (this.randomNumber(0, 100) === 0) {
                        light.canSpawn = false;
                        this.createBolt(light.path[pc].x, light.path[pc].y, false);
                    }
                }
            }

            if (!light.hasFired) {
                this.ctx.fillStyle = 'rgba(255, 255, 255, ' + this.randomNumber(4, 12) / 100 + ')';
                this.ctx.fillRect(0, 0, this.width, this.height);
            }

            if (this.randomNumber(0, 30) === 0) {
                this.ctx.fillStyle = 'rgba(255, 255, 255, ' + this.randomNumber(1, 3) / 100 + ')';
                this.ctx.fillRect(0, 0, this.width, this.height);
            }
            this.ctx.stroke();
        }
    }
};

window.onload = function () {
    WS.init();
};
