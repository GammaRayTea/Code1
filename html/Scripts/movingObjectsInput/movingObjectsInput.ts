

namespace movingObjects {
    type Vector = { x: number, y: number };

    type Tank = { element: HTMLElement, pos: Vector, vel: Vector, rot: number };
    const tankList: Tank[] = [];
    let Input: {} = {};
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
        setInterval(physicsProcess, 16.6666);
    }




    function physicsProcess() {
        calcDeltaTime();
        movement();
        doCollision()
    }








    function movement() {

        let deltaDivided = deltaTime / 1000
        myTank.rot+=1
        myTank.element.style.transform = assembleMatrix(myTank.pos, myTank.rot, { "x": 10, "y": 20 });

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
        console.log(viewPortDimensions);
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







    //Input polling
    function handleKeyDown(_event: KeyboardEvent) {

    }
    function handleKeyUp(_event: KeyboardEvent) {

    }


    function pollInputs() {

    }
}