"use strict";
{
    console.log("available actions: Rinse, Wash, Spin, Rinse2, Spin2");
    console.log(`run executeWashing("actionName") to start. The machine will do the given action and every action after that.`);
}
function executeWashing(actionName) {
    let action = actionName;
    switch (action) {
        case ("Rinse"):
            console.log("Rinsing...");
        case ("Wash"):
            console.log("Washing...");
        case ("Spin"):
            console.log("Spinning..");
        case ("Rinse2"):
            console.log("Rinsing...2");
        case ("Spin2"):
            console.log("Spinning...2");
    }
}
//# sourceMappingURL=switchtest.js.map