

namespace movingObjects {
    type Vector = { x: number, y: number };
    let initBall: HTMLElement;
    type ballObject = { currentBall: HTMLElement, pos: Vector, vel: Vector };
    let ballList: ballObject[] = [];
    let viewPortDimensions: Vector;
    const ballSpeed: number = 100;
    let previousTime: number;
    let currentTime: number;
    let deltaTime: number
    //let simSpeed:number = 13;
    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {
        window.addEventListener("resize", handleResize);
        document.body.addEventListener("click", onClick);
        handleResize();

        initBall = document.getElementsByClassName("ball")[0] as HTMLElement;
        createBalls(Number(prompt("enter amount to spawn (anything from around 4000 onwoards won't be very fun")));
        setInterval(movement, 13);
        //simSpeed = Number(prompt("Enter time for a single frame in milliseconds"));
        document.body.removeChild(initBall);

    }


    function createBalls(_amount: number, _randomised: boolean = true, _clickedPos: number[] = [0, 0], _listSize: number = 0) {
        previousTime = Date.now()
        let ballIndex: number;
        for (let i = 0; i < _amount; i++) {
            let posToAdd: { "x": number, "y": number };
            if (_randomised) {
                posToAdd = { "x": randomInt(1, visualViewport?.width as number), "y": randomInt(1, visualViewport?.height as number) }
                ballIndex = i;
            }
            else {
                posToAdd = { "x": _clickedPos[0], "y": _clickedPos[1] };
                ballIndex = _listSize;
            }

            ballList.push({
                "currentBall": initBall.cloneNode(true) as HTMLElement,
                "pos": posToAdd,
                "vel": createVelocity()
            });
            let ball = ballList[ballIndex]["currentBall"];


            ball.style.transform = assembleMatrix(ballList[ballIndex]["pos"]["x"], ballList[ballIndex]["pos"]["y"]);
            document.body.appendChild(ball);
            ball.style.backgroundColor = randomColour();
        }

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


    function handleResize() {
        viewPortDimensions = { "x": window.innerWidth as number, "y": window.innerHeight as number };
    }



    function onClick(_event: MouseEvent) {
        let clickedElement = _event.target as HTMLElement;
        console.log(clickedElement.className);
        if (clickedElement.className == "ball") {


            for (let ball of ballList) {
                if (ball["currentBall"] == clickedElement) {
                    let removedBall = ballList.splice(ballList.indexOf(ball), 1);
                    console.log(removedBall);
                }
            }
            clickedElement.remove();
            console.log("balllist:");
            console.log(ballList);
        }
        else if (clickedElement.className == "body") {
            createBalls(1, false, [_event.pageX, _event.pageY-50], ballList.length);

        }
    }

    function randomColour() {
        return `rgb(${randomInt(20, 255)},${randomInt(20, 255)},${randomInt(20, 255)})`;
    }
}