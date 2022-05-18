

function CreateGUI(scene) {

    advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(scene);
    scoreGUI = new BABYLON.GUI.TextBlock();
    scoreGUI.text = myScore;
    scoreGUI.color = "white";
    scoreGUI.fontSize = 24;
    scoreGUI.textHorizontalAlignment = 1;
    scoreGUI.textVerticalAlignment = 0;
    scoreGUI.outlineWidth = 1;

    var startButton = BABYLON.GUI.Button.CreateSimpleButton("but1", "Start Game");
    startButton.width = 0.2;
    startButton.height = 0.1;
    startButton.color = "white";
    startButton.fontSize = 30;
    startButton.background = "grey";
    startButton.cornerRadius = 20;
    startButton.left = -500;
    startButton.top = -100;
    startButton.onPointerUpObservable.add(function () {
        camera.inputs.clear();
        menuTheme.stop();
        startButton._doNotRender = true;
        restart = true;
        image.isVisible = false;
    });

    var image = new BABYLON.GUI.Image("logo", "textures/logo.png");
    image.width = 0.5;
    image.height = 0.3;
    image.top = -250;
    image.left = -400;
    var speedMalus = new BABYLON.GUI.Image("sm", "img/turbo.png");
    speedMalus.width = 0.2;
    speedMalus.height = 0.2;
    speedMalus.top = -270;
    speedMalus.left = -560;
    var slowBonus = new BABYLON.GUI.Image("sb", "img/slow.png");
    slowBonus.width = 0.1;
    slowBonus.height = 0.2;
    slowBonus.top = -270;
    slowBonus.left = -600;
    var swapMalus = new BABYLON.GUI.Image("sM", "img/swapcommand.png");
    swapMalus.width = 0.15;
    swapMalus.height = 0.2;
    swapMalus.top = -270;
    swapMalus.left = -600;
    var shieldBonus = new BABYLON.GUI.Image("sB", "img/octaneshield.png");
    shieldBonus.width = 0.15;
    shieldBonus.height = 0.2;
    shieldBonus.top = -270;
    shieldBonus.left = -600;
    swapMalus.isVisible = false;
    slowBonus.isVisible = false;
    speedMalus.isVisible = false;
    shieldBonus.isVisible = false;
    bmList.push(swapMalus)
    bmList.push(slowBonus)
    bmList.push(speedMalus)
    bmList.push(shieldBonus)
    advancedTexture.addControl(swapMalus);
    advancedTexture.addControl(slowBonus);
    advancedTexture.addControl(speedMalus);
    advancedTexture.addControl(shieldBonus);
    advancedTexture.addControl(image);
    advancedTexture.addControl(scoreGUI);
    advancedTexture.addControl(startButton);

}