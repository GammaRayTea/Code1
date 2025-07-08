

namespace movingObjects {
    type Vector = { x: number, y: number };
    let initBall: HTMLElement;
    type ballObject = { currentBall: HTMLElement, pos: Vector, vel: Vector };
    let ballList: ballObject[] = [];
    let viewPortDimensions: Vector;
    let ballSpeed: number = 400;
    let previousTime: number;
    let currentTime: number;
    let deltaTime: number
    //let simSpeed:number = 13;
    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {
        window.addEventListener("resize", handleResize)
        handleResize();
        console.log(viewPortDimensions);
        initBall = document.getElementsByClassName("ball")[0] as HTMLElement;
        createBalls(Number(prompt("enter amount to spawn (anything from around 4000 onwoards won't be very fun")));
        //simSpeed = Number(prompt("Enter time for a single frame in milliseconds"));
        document.body.removeChild(initBall);

    }


    function createBalls(_amount: number) {
        previousTime = Date.now()
        for (let i = 0; i < _amount; i++) {

            ballList.push({
                "currentBall": initBall.cloneNode(true) as HTMLElement,
                "pos": { "x": randomInt(1, visualViewport?.width as number), "y": randomInt(1, visualViewport?.height as number) },
                "vel": createVelocity()
            });
            console.log(ballList[i]["vel"])
            ballList[i]["currentBall"].style.transform = assembleMatrix(ballList[i]["pos"]["x"], ballList[i]["pos"]["y"]);
            document.body.appendChild(ballList[i]["currentBall"]);
            ballList[i]["currentBall"].style.backgroundColor = `rgb(${randomInt(20, 255)},${randomInt(20, 255)},${randomInt(20, 255)})`;
        }
        setInterval(movement, 13);
    }
    function movement() {

        calcDelta();
        let deltaDivided = deltaTime / 1000

        for (let i = 0; i < ballList.length; i++) {
            let ball = ballList[i];
            ball["vel"]["x"] *= checkBounds(ball["pos"]["x"], viewPortDimensions["x"]);
            ball["vel"]["y"] *= checkBounds(ball["pos"]["y"], viewPortDimensions["y"]);
            ball["pos"]["x"] += ball["vel"]["x"] * deltaDivided;
            ball["pos"]["y"] += ball["vel"]["y"] * deltaDivided;
            ball["currentBall"].style.transform = assembleMatrix(ball["pos"]["x"], ball["pos"]["y"]);
        }

        previousTime = currentTime;
    }

    function calcDelta() {
        currentTime = Date.now();
        deltaTime = currentTime - previousTime;

        displayDeltaTime();
    }


    function displayDeltaTime() {

        document.getElementById("frameCounter")!.innerText = String(Math.round(1000 / deltaTime));
    }




    function randomInt(_min: number, _max: number): number {

        return _min + Math.floor((_max - _min + 1) * Math.random());


    }



    function assembleMatrix(_translateX: number, _translateY: number): string {
        return `matrix(10,0,0,10,${_translateX},${_translateY})`;
    }


    function createVelocity(): { "x": number, "y": number } {
        let x: number = randomInt(-ballSpeed, ballSpeed);
        let y: number = randomInt(-ballSpeed, ballSpeed);
        let timeout: number = 0
        while (x == 0 && y == 0) {
            if (timeout == 3) {
                x = 1
                y = -1
                break;
            }
            else {

                x = randomInt(-ballSpeed, ballSpeed);
                y = randomInt(-ballSpeed, ballSpeed);
                timeout++;
            }

        }

        return { "x": randomInt(-ballSpeed, ballSpeed), "y": randomInt(-ballSpeed, ballSpeed) }
    }
    function checkBounds(_ballPos: number, _viewportValue: number): number {
        if (_ballPos > _viewportValue || _ballPos <= 0) {
            return -1
        }
        else {
            return 1

        }
    }


    function handleResize(){
        viewPortDimensions = { "x": window.innerWidth as number, "y": window.innerHeight as number };
    }
}