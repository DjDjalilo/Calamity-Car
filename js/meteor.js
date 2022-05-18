
function SpawnMeteor(scene) {
    meteorCrash = new BABYLON.Sound("meteor", "sfx/meteor.wav", scene, null, { loop: false, autoplay: false, volume: 0.2 });
    var meteor = BABYLON.MeshBuilder.CreateSphere("meteor", { diameter: 0.70, segments: 16 }, scene);
    var meteorHitbox = BABYLON.MeshBuilder.CreateSphere("meteorH", { diameter: 0.35, segments: 32 }, scene);
    //meteorHitbox.showBoundingBox = true;
    meteorHitbox.parent = meteor;
    meteorHitbox.renderingGroupId = 3;
    var meteorMaterial = new BABYLON.StandardMaterial("meteorM", scene);
    meteorMaterial.bumpTexture = new BABYLON.Texture("textures/meteor_n.png", scene);
    meteorMaterial.emissiveTexture = new BABYLON.Texture("textures/meteor_e.png", scene);
    meteorMaterial.ambientTexture = new BABYLON.Texture("textures/meteor_ao.png", scene);
    meteorMaterial.diffuseTexture = new BABYLON.Texture("textures/meteor_g.png")
    meteor.material = meteorMaterial;
    meteor.physicsImpostor = new BABYLON.PhysicsImpostor(meteor, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 0 });
    meteor.position = new BABYLON.Vector3(getRandomArbitrary(), getRandomArbitrary(), getRandomArbitrary());
    meteor.actionManager = new BABYLON.ActionManager(scene);
    meteorHitbox.actionManager = new BABYLON.ActionManager(scene);
    meteor.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            {
                trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
                parameter: world,
            },
            () => {
                meteorCrash.play();
            },
        ),
    );
    meteorHitbox.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            {
                trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
                parameter: 
                car,
                usePreciseIntersection: true,
            },
            () => {
                if (godMode) {
                    meteor.dispose();
                }
                else{
                    carSmoke.stop();
                    theme.stop();
                    carCrash.play();     
                    saveHighScore();
                    getHighScore();
                    restart = false;
                    startCar = false;
                    stopSpawning = true;
                    particleSystemCar.start();
                            var RESTART = setTimeout(function () {
                                var restartButton = BABYLON.GUI.Button.CreateSimpleButton("but2", "Restart ?");
                                restartButton.width = 0.2;
                                restartButton.height = 0.1;
                                restartButton.color = "white";
                                restartButton.fontSize = 30;
                                restartButton.background = "grey";
                                restartButton.cornerRadius = 20;
                                restartButton.left = 0;
                                restartButton.top = 0;

                                restartButton.onPointerUpObservable.add(function () {
                                    theme.play();
                                    restartButton._doNotRender = true;
                                    myScore = 0;
                                    khkhkh = 0;
                                    car.position = new BABYLON.Vector3(0, 4.1, 0);
                                    for (let index = 0; index < stars.length; index++) {
                                        stars[index].dispose();
                                    }
                                    for (let index = 0; index < meteors.length; index++) {
                                        meteors[index].dispose();
                                    }
                                    meteors = [];
                                    stars = [];
                                    restart = true;
                                    startCar = true;
                                    preStartReady = true;
                                    stopSpawning = false;
                                    carSmoke.start();
                                    particleSystemCar.stop();
                                    resetSpeed();

                                });
                                advancedTexture.addControl(restartButton);

                            }, 3000);
                        }
            },
    ));
    //meteor.showBoundingBox = true;
    meteors.push(meteor);
    meteor.renderingGroupId = 3;
    var solutions = FindLineSphereIntersections(meteor.position);

    var smokeSystem = new BABYLON.ParticleSystem("particles", 1000, scene);
    smokeSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);
    smokeSystem.emitter = meteor;
    smokeSystem.minEmitBox = new BABYLON.Vector3(-0.25, -0.25, -0.25);
    smokeSystem.maxEmitBox = new BABYLON.Vector3(0.25, 0.25, 0.25);
    smokeSystem.color1 = new BABYLON.Color4(0.02, 0.02, 0.02, .02);
    smokeSystem.color2 = new BABYLON.Color4(0.02, 0.02, 0.02, .02);
    smokeSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);
    smokeSystem.minSize = 0.5;
    smokeSystem.maxSize = 1.5;
    smokeSystem.minLifeTime = 0.3;
    smokeSystem.maxLifeTime = 0.75;
    smokeSystem.emitRate = 350;
    smokeSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    smokeSystem.gravity = new BABYLON.Vector3(0, 0, 0);
    smokeSystem.direction1 = new BABYLON.Vector3(0, 0, 0);
    smokeSystem.direction2 = new BABYLON.Vector3(0, 0, 0);
    smokeSystem.minAngularSpeed = 0;
    smokeSystem.maxAngularSpeed = Math.PI;
    smokeSystem.minEmitPower = 0.25;
    smokeSystem.maxEmitPower = 0.75;
    smokeSystem.updateSpeed = 0.0025;
    // Create a particle system
    var fireSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
    //Texture of each particle
    fireSystem.particleTexture = new BABYLON.Texture("textures/fire.png", scene);
    // Where the particles come from
    fireSystem.emitter = meteor; // the starting object, the emitter
    // Colors of all particles
    fireSystem.minEmitBox = new BABYLON.Vector3(-0.25, -0.25, -0.25);
    fireSystem.maxEmitBox = new BABYLON.Vector3(0.25, 0.25, 0.25);
    fireSystem.color1 = new BABYLON.Color4(1, 0.5, 0, 1.0);
    fireSystem.color2 = new BABYLON.Color4(1, 0.5, 0, 1.0);
    fireSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);
    // Size of each particle (random between...
    fireSystem.minSize = 0.15;
    fireSystem.maxSize = 0.5;
    // Life time of each particle (random between...
    fireSystem.minLifeTime = 0.1;
    fireSystem.maxLifeTime = 0.2;
    // Emission rate
    fireSystem.emitRate = 600;
    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    fireSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    // Set the gravity of all particles
    fireSystem.gravity = new BABYLON.Vector3(0, 0, 0);
    // Direction of each particle after it has been emitted
    fireSystem.direction1 = new BABYLON.Vector3(0, 0, 0);
    fireSystem.direction2 = new BABYLON.Vector3(0, 0, 0);
    // Angular speed, in radians
    fireSystem.minAngularSpeed = 0;
    fireSystem.maxAngularSpeed = Math.PI;
    // Speed
    fireSystem.minEmitPower = 0.5;
    fireSystem.maxEmitPower = 1.5;
    fireSystem.updateSpeed = 0.007;
    fireSystem.targetStopDuration = 2;
    fireSystem.renderingGroupId = 3;
    smokeSystem.targetStopDuration = 2;
    smokeSystem.renderingGroupId = 3;
    fireSystem.start();
    smokeSystem.start();
    startGameTimer();
    BABYLON.Animation.CreateAndStartAnimation("anim", meteor, "position", 30, 60, meteor.position, solutions[0], BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    if (!stopSpawning)
        setTimeout(SpawnMeteor, 2000);
}