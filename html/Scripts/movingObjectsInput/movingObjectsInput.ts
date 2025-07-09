

namespace movingObjects {
    type Vector = { x: number, y: number };

    type Tank = { element: HTMLElement, pos: Vector, vel: Vector, rot: number };


    type inputActions = { "shoot": string, "fwrd": string, "bwrd": string, "left": string, "right": string, "slow": string };

    let inputMap: inputActions = {
        "shoot": " ",
        "fwrd": "w",
        "bwrd": "s",
        "left": "a",
        "right": "d",
        "slow": "Shift"
    };
    let registeredInputs: string[] = [];
    let activeInputs: string[] = [];
    const tankList: Tank[] = [];

    let viewPortDimensions: Vector;
    let myTank: Tank = {
        element: document.createElement("span"),
        pos: { "x": 100, "y": 100 },
        vel: { "x": 0, "y": 0 },
        rot: 0
    };


    const MAX_SPEED: number = 100;


    let previousTime: number;
    let currentTime: number;
    let deltaTime: number

    window.addEventListener("load", handleLoad);




    function handleLoad(_event: Event): void {
        myTank.element = document.getElementById("tank")!;
        window.addEventListener("resize", handleResize);
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        handleResize();
        setInterval(processLoop, 16.6666);
        createRegisteredInputList();
    }




    function processLoop() {
        pollInputs();
        calcDeltaTime();
        movement();
        doCollision();
    }








    function movement() {

        let deltaDivided: number = deltaTime / 1000;
        let slowFactor: number = 0;
        let inputVec: Vector = { "x": 0, "y": 0 };

        if (isInputPressed("slow")) {
            slowFactor = 200;
        }
        if (isInputPressed("fwrd")) {
            inputVec.y += -1;
            myTank.vel.y = -MAX_SPEED * deltaDivided;
        }
        else if (isInputPressed("bwrd")) {
            inputVec.y += 1;
            myTank.vel.y = MAX_SPEED * deltaDivided;
        }
        if (isInputPressed("left")) {
            inputVec.x += -1;
            myTank.vel.x = -MAX_SPEED * deltaDivided;
        }
        else if (isInputPressed("right")) {
            inputVec.x += 1;
            myTank.vel.x = MAX_SPEED * deltaDivided;
        }
        if (inputVec.x != 0 || inputVec.y != 0) {
            //inputVec = normalise(inputVec);
        }
        //myTank.vel.x = inputVec.x * MAX_SPEED* deltaDivided
        //myTank.vel.y = inputVec.y * MAX_SPEED * deltaDivided
        myTank.pos.x += myTank.vel.x;
        myTank.pos.y += myTank.vel.y;
        console.log(myTank.pos);



        //apply Transform
        myTank.element.style.transform = assembleMatrix(myTank.pos, myTank.rot, { "x": 10, "y": 10 });
        myTank.vel.x = 0;
        myTank.vel.y = 0;
        previousTime = currentTime;
    }











    function doCollision() {


    }





    function calcBallDistance(_ball1: Tank, _ball2: Tank): number {
        let distance = Math.hypot(_ball1.pos.x - _ball2.pos.x, _ball1.pos.y - _ball2.pos.y);
        //console.log(distance);
        return distance;
    }





    function calcDeltaTime() {
        currentTime = Date.now();
        deltaTime = currentTime - previousTime;

        displayFramerate();
    }




    function displayFramerate() {
        document.getElementById("frameCounter")!.innerText = String(Math.round(1000 / deltaTime));
    }


    //Math
    function normalise(_vec: Vector): Vector {
        let mag: number = Math.hypot(_vec.x, _vec.y);
        return { "x": _vec.x / mag, "y": _vec.y / mag };
    }





    function randomInt(_min: number, _max: number): number {

        return _min + Math.floor((_max - _min + 1) * Math.random());


    }




    function assembleMatrix(_translation: Vector, _rotation: number, _scale: Vector): string {
        const sin: number = Math.sin(Math.PI * _rotation / 180);
        const cos: number = Math.cos(Math.PI * _rotation / 180);
        const matrix: number[] = [_scale.x * cos, _scale.x * sin, _scale.y * -sin, _scale.y * cos, _translation.x, _translation.y];
        return `matrix(${matrix.toString()})`;
    }




    function handleResize() {
        viewPortDimensions = { "x": window.innerWidth as number, "y": window.innerHeight as number };

    }





    function removeTank(_tankToRemove: HTMLElement) {
        for (let tank of tankList) {
            if (tank["element"] == _tankToRemove) {
                tankList.splice(tankList.indexOf(tank), 1);
            }
        }
        _tankToRemove.remove();
    }




    function randomColour() {
        return `rgb(${randomInt(20, 255)},${randomInt(20, 255)},${randomInt(20, 255)})`;
    }





    //Input

    function isInputPressed(_action: string) {
        const keyTyped = _action as keyof inputActions;
        return activeInputs.includes(inputMap[keyTyped]);
    }




    function handleKeyDown(_event: KeyboardEvent) {

        if (registeredInputs.includes(_event.key) && !activeInputs.includes(_event.key)) {
            activeInputs.push(_event.key);

        }
    }




    function handleKeyUp(_event: KeyboardEvent) {
        activeInputs.splice(activeInputs.indexOf(_event.key), 1);

    }




    function pollInputs() {
        //console.log(activeInputs);
        return activeInputs;
    }




    function createRegisteredInputList() {
        let key: keyof inputActions;

        for (key in inputMap) {
            registeredInputs.push(inputMap[key]);
        }
    }
}