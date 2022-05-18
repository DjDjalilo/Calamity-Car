const FRAMES_PER_SECOND = 60;
var myVar;
var highScore;
var carCrash;
var inputStates = []
var json = { "name": "CPU particle system", "id": "default system", "capacity": 10000, "emitter": [0, 0, 0], "particleEmitterType": { "type": "ConeParticleEmitter", "radius": 0.1, "angle": 0.7853981633974483, "directionRandomizer": 0, "radiusRange": 1, "heightRange": 1, "emitFromSpawnPointOnly": false }, "textureName": "https://www.babylonjs.com/assets/Flare.png", "invertY": true, "isLocal": false, "animations": [], "beginAnimationOnStart": false, "beginAnimationFrom": 0, "beginAnimationTo": 60, "beginAnimationLoop": false, "startDelay": 0, "renderingGroupId": 0, "isBillboardBased": true, "billboardMode": 7, "minAngularSpeed": 0, "maxAngularSpeed": 0, "minSize": 0.1, "maxSize": 0.2, "minScaleX": 1, "maxScaleX": 1, "minScaleY": 1, "maxScaleY": 1, "minEmitPower": 2, "maxEmitPower": 2, "minLifeTime": 1, "maxLifeTime": 2, "emitRate": 150, "gravity": [0, 0, 0], "noiseStrength": [10, 10, 10], "color1": [1, 1, 1, 1], "color2": [0.7647058823529411, 0.07450980392156863, 0.07450980392156863, 1], "colorDead": [0, 0, 0, 0], "updateSpeed": 0.016666666666666666, "targetStopDuration": 0, "blendMode": 0, "preWarmCycles": 0, "preWarmStepOffset": 1, "minInitialRotation": 0, "maxInitialRotation": 0, "startSpriteCellID": 0, "endSpriteCellID": 0, "spriteCellChangeSpeed": 1, "spriteCellWidth": 0, "spriteCellHeight": 0, "spriteRandomStartCell": false, "isAnimationSheetEnabled": false, "textureMask": [1, 1, 1, 1], "customShader": null, "preventAutoStart": false };
var world;
var canvas = document.getElementById("renderCanvas");
var car;
var meteors = [];
var lost = false;
var khkhkh = 0;
var khkhkhs = 0;
var particleSystemCar;
var theme, menuTheme;
var scoreGUI;
var restart = false;
var onceFunction = true;
var preStartReady = false;
var startCar = false;
var camera;
var light;
var turbo;
var carSmoke;
var shield;
carSpeed = 0.02;
var fps = 2;
var carCopy;
var advancedTexture;
var bmList = []
var stopSpin = false;
var bmId = 0;
var rd;
var bonusPicked = false;
var speedSaved2;
var speedSaved;
var boostReady = true;
var godMode = false;
var swapEnabled = false;
var themeSpeed = 1
var stars = []
var stopSpawning = false;
var myScore = 0;