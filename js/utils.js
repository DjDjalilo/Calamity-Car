function getRandomArbitrary() {
    var sign = Math.random() < 0.5 ? -1 : 1;
    var coord = Math.floor(Math.random() * 50)
    return sign * coord;
}
function FindLineSphereIntersections(meteorPosition) {
    let solutions;
    var circleRadius = 4;
    var cx = 0;
    var cy = 0;
    var cz = 0;

    var px = cx;
    var py = cy;
    var pz = cz;

    var vx = meteorPosition.x;
    var vy = meteorPosition.y;
    var vz = meteorPosition.z;

    var A = vx * vx + vy * vy + vz * vz;
    var B = 2.0 * (px * vx + py * vy + pz * vz - vx * cx - vy * cy - vz * cz);
    var C = px * px - 2 * px * cx + cx * cx + py * py - 2 * py * cy + cy * cy +
        pz * pz - 2 * pz * cz + cz * cz - circleRadius * circleRadius;

    // discriminant
    var D = B * B - 4 * A * C;

    if (D < 0) {
        return new BABYLON.Vector3.Zero();
    }

    var t1 = (-B - Math.sqrt(D)) / (2.0 * A);

    var solution1 = new BABYLON.Vector3(cx * (1 - t1) + t1 * meteorPosition.x,
        cy * (1 - t1) + t1 * meteorPosition.y,
        cz * (1 - t1) + t1 * meteorPosition.z);
    if (D == 0) {
        solutions = [solution1];
        return solutions;
    }

    var t2 = (-B + Math.sqrt(D)) / (2.0 * A);
    var solution2 = new BABYLON.Vector3(cx * (1 - t2) + t2 * meteorPosition.x,
        cy * (1 - t2) + t2 * meteorPosition.y,
        cz * (1 - t2) + t2 * meteorPosition.z);

    // prefer a solution that's on the line segment itself

    if (Math.abs(t1 - 0.5) < Math.abs(t2 - 0.5)) {
        solutions = [solution1, solution2];
        return solutions;
    }

    solutions = [solution2, solution1];
    return solutions;

}
function startGameTimer() {
    myScore = myScore + 1;
    scoreGUI.text = "Score : " + myScore + "\n Best : " + highScore;
}
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function saveHighScore() {
    if (highScore <= myScore) {
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            console.log(req.responseText);
        }
        };
        req.open("PUT", "https://api.jsonbin.io/v3/b/6278d3c538be296761fe87d6", true);
        req.setRequestHeader("Content-Type", "application/json");
        req.setRequestHeader("X-Master-Key", "$2b$10$fvLNo07/4bn3PusIf/iyXe6xlviXFz4fr9F9Rt5CNgiBG1cYL.MbW");
        req.setRequestHeader("X-Bin-Meta", "false");
        var string = '{"myCar": '+myScore+'}';
        req.send(string);
    }
};

function startCD() {
    var boostBar = document.getElementById('center');
    boostBar.style.display = "block"
    carSmoke.start();
    preStartReady = !preStartReady;
    startCar = !startCar;
}
function fakeLoading() {
    menuTheme = new Howl({
        src: ['sfx/menu_theme.wav', 'sfx/theme.wav'],
        autoplay: false,
        loop: true,
        volume: 0.3,
    });
    var boostBar = document.getElementById('center');
    boostBar.style.display = "none"
    var div = document.getElementById('text');
    div.style.display = "none"
    myVar = setTimeout(showText, 3000);
}
function showText() {
    var span = document.getElementById('span');
    span.style.display = "none"
    var div = document.getElementById('text');
    div.style.display = "block"
}
function showPage() {
    $(".loader-wrapper").fadeOut("slow");
    menuTheme.play();
    setTimeout(function () {
    }, 1000);
}
function getHighScore() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
        var myArr = JSON.parse(req.responseText);
        highScore = myArr.myCar
    }
    };
    req.open("GET", "https://api.jsonbin.io/v3/b/6278d3c538be296761fe87d6/latest", true);
    req.setRequestHeader("X-Master-Key", "$2b$10$fvLNo07/4bn3PusIf/iyXe6xlviXFz4fr9F9Rt5CNgiBG1cYL.MbW");
    req.setRequestHeader("X-Bin-Meta","false");
    req.send();
}

function resetSpeed() {
    themeSpeed = 1
    carSpeed = 0.02;
}
function updateSpeed() {
    theme.setPlaybackRate(themeSpeed);
    themeSpeed += 0.00001;
    carSpeed += 0.000005;
}

