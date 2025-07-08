

namespace movingObjects {
    type Vector = { x: number, y: number };
    let initBall: HTMLElement;
    type ballObject = { currentBall: HTMLElement, pos: Vector, vel: Vector };
    const BALL_LIST: ballObject[] = [];
    let viewPortDimensions: Vector;
    const BALL_SPEED: number = 100;
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
        previousTime = Date.now();
        let ballIndex: number;
        for (let i = 0; i < _amount; i++) {
            let posToAdd: { "x": number, "y": number };
            if (_randomised) {
                posToAdd = { "x": randomInt(20, visualViewport?.width as number), "y": randomInt(100, visualViewport?.height as number) };
                ballIndex = i;
            }
            else {
                posToAdd = { "x": _clickedPos[0], "y": _clickedPos[1] };
                ballIndex = _listSize+i;
            }

            BALL_LIST.push({
                "currentBall": initBall.cloneNode(true) as HTMLElement,
                "pos": posToAdd,
                "vel": createVelocity()
            });
            let ball = BALL_LIST[ballIndex]["currentBall"];


            ball.style.transform = assembleMatrix(BALL_LIST[ballIndex]["pos"]["x"], BALL_LIST[ballIndex]["pos"]["y"]);
            document.body.appendChild(ball);
            ball.style.backgroundColor = randomColour();
        }

    }
    function movement() {

        calcDelta();
        let deltaDivided = deltaTime / 1000

        for (let i = 0; i < BALL_LIST.length; i++) {
            let ball = BALL_LIST[i];
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
        let x: number = randomInt(-BALL_SPEED, BALL_SPEED);
        let y: number = randomInt(-BALL_SPEED, BALL_SPEED);
        let timeout: number = 0
        while (x == 0 && y == 0) {
            if (timeout == 3) {
                x = 1;
                y = -1;
                break;
            }
            else {

                x = randomInt(-BALL_SPEED, BALL_SPEED);
                y = randomInt(-BALL_SPEED, BALL_SPEED);
                timeout++;
            }

        }

        return { "x": x, "y": y }
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
        console.log(viewPortDimensions);
    }



    function onClick(_event: MouseEvent) {
        let clickedElement = _event.target as HTMLElement;

        if (clickedElement.className == "ball") {


            for (let ball of BALL_LIST) {
                if (ball["currentBall"] == clickedElement) {
                    BALL_LIST.splice(BALL_LIST.indexOf(ball), 1);

                }
            }
            clickedElement.remove();

        }
        else if (clickedElement.className == "body") {
            createBalls(1, false, [_event.pageX, _event.pageY - 50], BALL_LIST.length);

        }
    }

    function randomColour() {
        return `rgb(${randomInt(20, 255)},${randomInt(20, 255)},${randomInt(20, 255)})`;
    }
}