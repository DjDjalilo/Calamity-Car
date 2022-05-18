

function CreateStar(len) {
    var dodecahedron = {
        vertex: [[0, 0, 1.070466], [0.7136442, 0, 0.7978784], [-0.3568221, 0.618034, 0.7978784], [-0.3568221, -0.618034, 0.7978784], [0.7978784, 0.618034, 0.3568221], [0.7978784, -0.618034, 0.3568221], [-0.9341724, 0.381966, 0.3568221], [0.1362939, 1, 0.3568221], [0.1362939, -1, 0.3568221], [-0.9341724, -0.381966, 0.3568221], [0.9341724, 0.381966, -0.3568221], [0.9341724, -0.381966, -0.3568221], [-0.7978784, 0.618034, -0.3568221], [-0.1362939, 1, -0.3568221], [-0.1362939, -1, -0.3568221], [-0.7978784, -0.618034, -0.3568221], [0.3568221, 0.618034, -0.7978784], [0.3568221, -0.618034, -0.7978784], [-0.7136442, 0, -0.7978784], [0, 0, -1.070466]],
        face: [[0, 1, 4, 7, 2], [0, 2, 6, 9, 3], [0, 3, 8, 5, 1], [1, 5, 11, 10, 4], [2, 7, 13, 12, 6], [3, 9, 15, 14, 8], [4, 10, 16, 13, 7], [5, 8, 14, 17, 11], [6, 12, 18, 15, 9], [10, 11, 17, 19, 16], [12, 13, 16, 19, 18], [14, 15, 18, 19, 17]]
    };
    var face = [];
    var pointIndex = 0;
    var centerX = 0;
    var centerY = 0;
    var centerZ = 0;
    var positions = [];
    var indices = [];
    var vec1 = BABYLON.Vector3.Zero();
    var vec2 = BABYLON.Vector3.Zero();
    var norm
    var nbVertices = dodecahedron.vertex.length
    for (var v = 0; v < nbVertices; v++) {
        positions = positions.concat(dodecahedron.vertex[v])
    }
    for (var f = 0; f < 12; f++) {
        face = dodecahedron.face[f];
        centerX = 0;
        centerY = 0;
        centerZ = 0;
        vec1.set(dodecahedron.vertex[face[1]][0] - dodecahedron.vertex[face[0]][0], dodecahedron.vertex[face[1]][1] - dodecahedron.vertex[face[0]][1], dodecahedron.vertex[face[1]][2] - dodecahedron.vertex[face[0]][2]);
        vec2.set(dodecahedron.vertex[face[2]][0] - dodecahedron.vertex[face[1]][0], dodecahedron.vertex[face[2]][1] - dodecahedron.vertex[face[1]][1], dodecahedron.vertex[face[2]][2] - dodecahedron.vertex[face[1]][2]);
        norm = BABYLON.Vector3.Cross(vec1, vec2).normalize();
        for (var v = 0; v < 5; v++) {
            centerX += dodecahedron.vertex[face[v]][0];
            centerY += dodecahedron.vertex[face[v]][1];
            centerZ += dodecahedron.vertex[face[v]][2];
        }
        pointIndex = 1 * (nbVertices + f);
        positions.push(centerX / 6 + len * norm.x, centerY / 6 + len * norm.y, centerZ / 6 + len * norm.z);
        for (var v = 0; v < 5; v++) {
            indices.push(face[v], pointIndex, face[(v + 1) % 5]);
        }
    }
    var vertexData = new BABYLON.VertexData();

    vertexData.positions = positions;
    vertexData.indices = indices;

    var normals = [];
    BABYLON.VertexData.ComputeNormals(positions, indices, normals);

    vertexData.normals = normals;

    var mesh = new BABYLON.Mesh("star", scene);
    vertexData.applyToMesh(mesh);
    mesh.scaling.x = 0.1
    mesh.scaling.y = 0.1
    mesh.scaling.z = 0.1
    return mesh;
}


function SpawnStars(scene) {
    var star = CreateStar(4);
    star.position = new BABYLON.Vector3(getRandomArbitrary(), getRandomArbitrary(), getRandomArbitrary());
    var starMaterial = new BABYLON.StandardMaterial("starM", scene);
    starMaterial.diffuseTexture = new BABYLON.Texture("textures/star.png", scene);
    star.material = starMaterial;
    star.actionManager = new BABYLON.ActionManager(scene);
    star.actionManager.registerAction(
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
    star.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            {
                trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
                parameter: car,
            },
            () => {
                if(!bonusPicked)
                {
                    rd = randomIntFromInterval(0, 3);
                    spinWheel();
                    star.dispose();
                }
            },
        ),
    );
    stars.push(star);
    var particleSystem = new BABYLON.ParticleSystem("particlesR", 2000, scene);
    particleSystem.renderingGroupId = 3;
    particleSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);
    particleSystem.emitter = star
    particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
    particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
    particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);
    particleSystem.minSize = 0.1;
    particleSystem.maxSize = 0.5;
    particleSystem.minLifeTime = 0.3;
    particleSystem.maxLifeTime = 0.7;
    particleSystem.emitRate = 1000;
    particleSystem.createSphereEmitter(2);
    particleSystem.minEmitPower = 1;
    particleSystem.maxEmitPower = 3;
    particleSystem.updateSpeed = 0.005;
    particleSystem.targetStopDuration = 1.5;
    particleSystem.updateFunction = function (particles) {
        for (var index = 0; index < particles.length; index++) {
            var particle = particles[index];
            particle.age += this._scaledUpdateSpeed;

            if (particle.age >= particle.lifeTime) { // Recycle
                particles.splice(index, 1);
                this._stockParticles.push(particle);
                index--;
                continue;
            }
            else {
                particle.colorStep.scaleToRef(this._scaledUpdateSpeed, this._scaledColorStep);
                particle.color.addInPlace(this._scaledColorStep);
                particle.color = new BABYLON.Color4(Math.random(), Math.random(), Math.random(), 1)

                if (particle.color.a < 0)
                    particle.color.a = 0;

                particle.angle += particle.angularSpeed * this._scaledUpdateSpeed;

                particle.direction.scaleToRef(this._scaledUpdateSpeed, this._scaledDirection);
                particle.position.addInPlace(this._scaledDirection);

                this.gravity.scaleToRef(this._scaledUpdateSpeed, this._scaledGravity);
                particle.direction.addInPlace(this._scaledGravity);
            }
        }
    }
    particleSystem.start();
    //star.showBoundingBox = true;
    star.renderingGroupId = 3;
    var solutions = FindLineSphereIntersections(star.position);
    BABYLON.Animation.CreateAndStartAnimation("anim", star, "position", 30, 60, star.position, solutions[0], BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    if (!stopSpawning)
        setTimeout(SpawnStars, 30000);
}