namespace eventPractice {
    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {

        document.addEventListener("mousemove", handleMouseMovement);
        document.addEventListener("click", handleClick);
        document.addEventListener("keyup", handleKeyup);

        document.body.addEventListener("click", handleClick);
        document.body.addEventListener("keyup", handleKeyup);

        let divs = document.getElementsByClassName("blueBox");

        for (var value of divs) {
            console.log(value)
            value.addEventListener("click", handleClick);
            value.addEventListener("keyup", handleKeyup);
        }
    }


    function handleMouseMovement(_event: MouseEvent): void {
        setInfoBox(_event)
    }

    function handleClick(_event: Event): void {
        logInfo(_event)
    }

    function handleKeyup(_event: Event): void {
        logInfo(_event)
    }


    function setInfoBox(_event: MouseEvent): void {
        let position = [_event.clientX, _event.clientY];
        let infoBox = document.getElementById("infoBox") as HTMLElement;
        infoBox.style.left = `${position[0] + 20}px`;
        infoBox.style.top = `${position[1] + 20}px`;
        infoBox.innerText = (
            `position = ${position[0]},${position[1]}
            target = ${_event.target}`
        )
    }

    function logInfo(_event: Event): void {
        console.log(
            `type = ${_event.type}
target = ${_event.target}
currentTarget = ${_event.currentTarget}
event Object = ${_event}
            `
        )
    }
}


