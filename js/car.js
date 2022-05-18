

function CreateCar(scene){
    BABYLON.SceneLoader.ImportMesh("", "scenes/", "car.gltf", scene, function (meshes) {
        for (var i = 0; i < meshes.length; i++) {
            meshes[i].renderingGroupId = 3;
        }
        shield  = BABYLON.Mesh.CreateSphere("shield", 64, 1.2, scene);
        var matStd = new BABYLON.StandardMaterial("matstd", scene);
        shield.material = matStd;
        matStd.diffuseTexture = new BABYLON.Texture("img/shield.png", scene);
        matStd.diffuseTexture.hasAlpha = true;
        matStd.useAlphaFromDiffuseTexture = true;
        matStd.useSpecularOverAlpha = true;
        matStd.alphaCutOff = 0.4;
        shield.parent = meshes[0];
        shield.renderingGroupId = 3;
        meshes[0].parent = car;
        meshes[0].position.y -= 0.1
        car.visibility = 0;
        shield.isVisible = false;
        scene.registerBeforeRender(function () {
            shield.rotation.y += 0.03;
        });

    });
    car = BABYLON.MeshBuilder.CreateBox("car", { width: 0.05, height: 0.1, depth: 0.5 }, scene);
    car.position = new BABYLON.Vector3(0, 4.1, 0);
    var transform = new BABYLON.TransformNode("root");
    transform.position = new BABYLON.Vector3(0, 0, 0);
    car.parent = transform;
    car.move = () => {
        transform.rotate(new BABYLON.Vector3(1, 0, 0), -carSpeed * scene.getAnimationRatio(), BABYLON.Space.LOCAL);
        if (inputStates.left) {
            transform.rotate(new BABYLON.Vector3(0, -1, 0), 0.08 * scene.getAnimationRatio(), BABYLON.Space.LOCAL);
        }
        if (inputStates.right) {
            transform.rotate(new BABYLON.Vector3(0, 1, 0), 0.08 * scene.getAnimationRatio(), BABYLON.Space.LOCAL);
        }

    };
    
    BABYLON.ParticleHelper.CreateFromSnippetAsync("LCBQ5Y#6", scene, false).then((nitro) => {
        carSmoke = new BABYLON.ParticleSystem("carSmoke", 1000, scene);
        carSmoke.particleTexture = new BABYLON.Texture("https://raw.githubusercontent.com/PatrickRyanMS/BabylonJStextures/master/FFV/smokeParticleTexture.png", scene);
        carSmoke.minEmitBox = new BABYLON.Vector3(-0.25, -0.25, -0.25);
        carSmoke.maxEmitBox = new BABYLON.Vector3(0.25, 0.25, 0.25);
        carSmoke.color1 = new BABYLON.Color4(0.02, 0.02, 0.02, .02);
        carSmoke.color2 = new BABYLON.Color4(0.02, 0.02, 0.02, .02);
        carSmoke.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);
        carSmoke.minSize = 0.5;
        carSmoke.maxSize = 1.5;
        carSmoke.minLifeTime = 0.3;
        carSmoke.maxLifeTime = 0.75;
        carSmoke.emitRate = 350;
        carSmoke.addSizeGradient(0, 0.15, 0.25);
        carSmoke.addSizeGradient(0.075, 0.25, 0.5);
        carSmoke.addSizeGradient(0.125, 0.3, 0.75);
        carSmoke.addColorGradient(0, new BABYLON.Color4(0.5, 0.5, 0.5, 0), new BABYLON.Color4(0.8, 0.8, 0.8, 0));
        carSmoke.addColorGradient(0.4, new BABYLON.Color4(0.1, 0.1, 0.1, 0.1), new BABYLON.Color4(0.4, 0.4, 0.4, 0.4));
        carSmoke.addColorGradient(0.7, new BABYLON.Color4(0.03, 0.03, 0.03, 0.2), new BABYLON.Color4(0.3, 0.3, 0.3, 0.4));
        carSmoke.addColorGradient(1.0, new BABYLON.Color4(0.0, 0.0, 0.0, 0), new BABYLON.Color4(0.03, 0.03, 0.03, 0));
        carSmoke.addVelocityGradient(0, 0.5, 0.75);
        carSmoke.addVelocityGradient(0.05, 0.4, 0.45);
        carSmoke.addVelocityGradient(0.35, 0.2, 0.25);
        carSmoke.addVelocityGradient(0.5, 0.05, 0.1);
        carSmoke.minInitialRotation = 0;
        carSmoke.maxInitialRotation = Math.PI;
        carSmoke.minAngularSpeed = -1;
        carSmoke.maxAngularSpeed = 1;
        carSmoke.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;

        var emitter = new BABYLON.TransformNode();
        emitter.parent = carCopy;
        carCopy.isVisible = false;
        turbo = nitro;
        emitter.rotation.x = Math.PI / 2;
        turbo.emitter = emitter;
        particleSystemCar.emitter = emitter;
        turbo.targetStopDuration = 0.2;
        turbo.renderingGroupId = 3;
        carSmoke.emitter = emitter;
        carSmoke.renderingGroupId = 3;
    });
    carCopy = car.clone("carCopy");
    car.renderingGroupId = 3
    particleSystemCar = new BABYLON.ParticleSystem("particles", 8000, scene);
    particleSystemCar.particleTexture = new BABYLON.Texture("https://raw.githubusercontent.com/PatrickRyanMS/BabylonJStextures/master/FFV/smokeParticleTexture.png", scene);
    particleSystemCar.minLifeTime = 2;
    particleSystemCar.maxLifeTime = 6;
    particleSystemCar.emitRate = 150;
    particleSystemCar.gravity = new BABYLON.Vector3(0.25, 3, 0);
    particleSystemCar.addSizeGradient(0, 0.3, 0.5);
    particleSystemCar.addSizeGradient(0.15, 0.5, 1);
    particleSystemCar.addSizeGradient(0.25, 1, 1.5);
    particleSystemCar.addSizeGradient(0.5, 3, 4);
    particleSystemCar.addColorGradient(0, new BABYLON.Color4(0.5, 0.5, 0.5, 0), new BABYLON.Color4(0.8, 0.8, 0.8, 0));
    particleSystemCar.addColorGradient(0.4, new BABYLON.Color4(0.1, 0.1, 0.1, 0.1), new BABYLON.Color4(0.4, 0.4, 0.4, 0.4));
    particleSystemCar.addColorGradient(0.7, new BABYLON.Color4(0.03, 0.03, 0.03, 0.2), new BABYLON.Color4(0.3, 0.3, 0.3, 0.4));
    particleSystemCar.addColorGradient(1.0, new BABYLON.Color4(0.0, 0.0, 0.0, 0), new BABYLON.Color4(0.03, 0.03, 0.03, 0));
    particleSystemCar.addVelocityGradient(0, 0.5, 0.75);
    particleSystemCar.addVelocityGradient(0.05, 0.4, 0.45);
    particleSystemCar.addVelocityGradient(0.35, 0.2, 0.25);
    particleSystemCar.addVelocityGradient(0.5, 0.05, 0.1);
    particleSystemCar.minInitialRotation = 0;
    particleSystemCar.maxInitialRotation = Math.PI;
    particleSystemCar.minAngularSpeed = -1;
    particleSystemCar.maxAngularSpeed = 1;
    particleSystemCar.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
    var sphereEmitter = particleSystemCar.createSphereEmitter(0.05);
    particleSystemCar.minEmitBox = new BABYLON.Vector3(-0.25, -0.25, -0.25);
    particleSystemCar.maxEmitBox = new BABYLON.Vector3(0.25, 0.25, 0.25);
    particleSystemCar.emitter = car;
    particleSystemCar.renderingGroupId = 3;
    //car.showBoundingBox = true;
}