namespace eventPractice {
    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {
        document.addEventListener("mousemove", handleMouseMovement);

        let divs = document.getElementsByClassName("blueBox");
        
    }


    function handleMouseMovement(_event: Event): void {

    }
}
