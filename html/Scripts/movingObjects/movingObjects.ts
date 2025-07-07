

namespace movingObjects {
    type Vector = { x: number, y: number };
    let initBall: HTMLElement;
    type ballObject = { currentBall: HTMLElement, pos: Vector, vel: Vector };
    let ballList: ballObject[] = [];
    let viewPortDimensions: Vector;
    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {

        viewPortDimensions = { "x": visualViewport?.width as number, "y": visualViewport?.height as number };
        console.log(viewPortDimensions);
        initBall = document.getElementsByClassName("ball")[0] as HTMLElement;
        createBalls(Number(prompt("enter amount to spawn")));
        document.body.removeChild(initBall);

    }

    function createBalls(_amount: number) {
        for (let i = 0; i < _amount; i++) {

            ballList.push({
                "currentBall": initBall.cloneNode(true) as HTMLElement,
                "pos": { "x": randomInt(1, visualViewport?.width as number), "y": randomInt(1, visualViewport?.height as number) },
                "vel": createVelocity()
            });

            ballList[i]["currentBall"].style.transform = assembleMatrix(ballList[i]["pos"]["x"], ballList[i]["pos"]["y"]);
            document.body.appendChild(ballList[i]["currentBall"]);
            ballList[i]["currentBall"].style.backgroundColor = `rgb(${randomInt(20, 255)},${randomInt(20, 255)},${randomInt(20, 255)})`;
        }
        setInterval(movement, 13);
    }
    function movement() {



        for (let i = 0; i < ballList.length; i++) {
            let ball = ballList[i];
            ball["vel"]["x"] *= checkBounds(ball["pos"]["x"], viewPortDimensions["x"]);
            ball["vel"]["y"] *= checkBounds(ball["pos"]["y"], viewPortDimensions["y"]);
            ball["pos"]["x"] += ball["vel"]["x"];
            ball["pos"]["y"] += ball["vel"]["y"];
            ball["currentBall"].style.transform = assembleMatrix(ball["pos"]["x"], ball["pos"]["y"]);

        }
    }

    function randomInt(_min: number, _max: number): number {

        return _min + Math.floor((_max - _min + 1) * Math.random());


    }



    function assembleMatrix(_translateX: number, _translateY: number): string {
        return `matrix(10,0,0,10,${_translateX},${_translateY})`;
    }


    function createVelocity(): { "x": number, "y": number } {
        let x: number = randomInt(-20, 20);
        let y: number = randomInt(-20, 20);
        let timeout: number = 0
        while (x == 0 && y == 0) {
            if (timeout == 3) {
                x = 1
                y = -1
                break;
            }
            else {

                x = randomInt(-20, 20);
                y = randomInt(-20, 20);
                timeout++;
            }

        }

        return { "x": randomInt(-20, 20), "y": randomInt(-20, 20) }
    }
    function checkBounds(_ballPos: number, _viewportValue: number): number {
        if (_ballPos > _viewportValue || _ballPos <= 0) {
            return -1
        }
        else {
            return 1

        }
    }
}