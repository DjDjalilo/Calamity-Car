

function spinWheel() {
    bonusPicked = true;
    if (bmId == (13 + rd)) {
        stopSpin = true;
        bmId = 0;
        doBonus();
        setTimeout(stopBonus, 5000);
    }
    if (!stopSpin) {
        if (bmId == 0) {
            bmList[bmId % bmList.length].isVisible = true;
        }
        else {
            var i = bmId % bmList.length;
            var j = (i - 1) % bmList.length;
            if (j == -1)
                j = bmList.length - 1;
            bmList[i].isVisible = true;
            bmList[j].isVisible = false;
        }
        bmId++;
        setTimeout(spinWheel, 100);
    }
}

function doBonus() {
    if (rd == 0) {
        swapEnabled = true;
    }
    else if (rd == 1) {
        speedSaved2 = carSpeed;
        carSpeed = speedSaved2 - 0.01;
    }
    else if (rd == 2) {
        speedSaved2 = carSpeed;
        carSpeed = speedSaved2 + 0.01;
    }
    else if (rd == 3) {
        shield.isVisible = true;
        godMode = true;
    }
}
function removeBonus() {
    for (let i = 0; i < bmList.length; i++) {
        const element = bmList[i];
        element.isVisible = false;
    }
}
function stopBonus() {
    removeBonus();
    if (rd == 0) {
        swapEnabled = false;
        if (inputStates.left) {
            inputStates.left = false;
            inputStates.right = true;
        }
        else if (inputStates.right) {
            inputStates.left = true;
            inputStates.right = false;
        }
    }
    else if (rd == 1) {
        carSpeed = speedSaved2
    }
    else if (rd == 2) {
        carSpeed = speedSaved2
    }
    else if (rd == 3) {
        shield.isVisible = false;
        godMode = false;
    }
    stopSpin = false;
    bonusPicked = false;
}