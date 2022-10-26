
let activeLevel = null;
window.addEventListener("load", (e) => InitGame());

    
    
function onKeyDown(e) {
    switch (e.key) {
        case "ArrowUp":
            activeLevel.MoveDude(-1, 0);
            e.preventDefault();
            break;
        case "ArrowDown":
            activeLevel.MoveDude(1, 0);
            e.preventDefault();
            break;
        case "ArrowLeft":
            activeLevel.MoveDude(0, -1);
            e.preventDefault();
            break;
        case "ArrowRight":
            activeLevel.MoveDude(0, 1);
            e.preventDefault();
            break;
    }
}

function InitGame() {

    let lt = document.getElementById("LevelThumbs");
    for (let level = 0; level < Levels.length; level++) {
        let uiEle = document.createElement("div");
        uiEle.setAttribute("data-level", level);

        uiEle.addEventListener("click", (event) => {
            selectedLevel = GetLevel(Levels[event.currentTarget.getAttribute("data-level")]);
            if (selectedLevel.error != null) {
                document.write(selectedLevel.error);
            } else {
                let gameUI = document.getElementById("gameUI");
                gameUI.innerHTML="";
                gameUI.appendChild(selectedLevel.uiContainer);
                activeLevel = selectedLevel;
                document.addEventListener("keydown", onKeyDown);
            }
        });
       
        let levelUI = GetLevel(Levels[level]);
        if (levelUI.error != null)
            alert(levelUI.error);
        
        levelUI.uiContainer.classList.toggle("thumbnail");
        levelUI.uiContainer.style.width = `${levelUI.width * 50}px`;

        uiEle.appendChild(levelUI.uiContainer);
        lt.appendChild(uiEle);
    }
    
}

function GetLevel(level) {
    
    if (typeof (level) != 'object')
        return { error: "Level data is not an object!" };

    if (level.width * level.height != level.data.length)
        return { error: `Level dimensions (${level.width * level.height}) does not match level data size (${level.data.length})!`};
    
    let playerX = -1, playerY = -1;
    
    let container = document.createElement("div");
    container.className = `Container${level.theme}`;
    container.style.display = "grid";
    container.style.gridTemplateColumns = `repeat(${level.width}, var(--block-size))`;
    container.style.gridTemplateRows = `repeat(${level.height}, var(--block-size))`;

    let r = document.querySelector(":root");
    let t = getComputedStyle(r);
    let themeBgColor = t.getPropertyValue(`--bg-color-circuit-${level.theme}`);
    r.style.setProperty("--bg-brick-color", themeBgColor);

    let ele = null;
    for (let y = 0; y < level.height; y++) {
        for (let x = 0; x < level.width; x++) {
            let c = level.data[y * level.width + x];
            ele = document.createElement("div");

            switch (c) {
                case " ":
                    break;

                case ".":
                    ele.className = "T0";
                    break;

                case "x":
                    ele.className = "T8";
                    break;

                case "X":
                    ele.className = "T9";
                    break;
                
                case "B":
                    ele.className = "T2";
                    break;

                case "b":
                    ele.className = "T3";
                    break;
                
                case "R":
                    ele.className = "T1";
                    break;
                
                case "P":
                    ele.className = "T4";
                    if (playerX == -1) {
                        playerX = x;
                        playerY = y;
                    }
                    else
                        return { error: "Player start position can only be declared once!" };

                    break;
                
                case "C":
                    ele.className = "TC";
                    break;

                default:
                    return { error: "Unknown level config character: " + c }
            }
            container.appendChild(ele);
        }
    }

    if (playerX == -1)
        return { error: "Player start position must be declared!" };

    return {
        error: null,
        width: level.width,
        height: level.height,
        playerX: playerX,
        playerY: playerY,
        uiContainer: container,
        GetUINode: function (x, y) {
            return this.uiContainer.childNodes[x + y * this.width];
        },
        GetObjectFlags: function (x, y) {
            let ele = this.GetUINode(x, y);
            if (ele.className != null)
                return parseInt(ele.className.substring(1, 5), 10);
            else
                return -1;
        },
        SetObjectFlags: function (x, y, prio) {
            let ele = this.GetUINode(x, y);
            ele.className = `T${prio}`;
        },
        CountUnsolvedBugs: function () {
            let counter = 0;
            for (let x = 0; x < this.width; x++)
                for (let y = 0; y < this.height; y++)
                    if (this.GetObjectFlags(x, y) == 2)
                        counter++;
            
            return counter;
        },
        MoveDude: function (v, h) {
            const movableObjects = 2 | 4;
            let currentPrio = this.GetObjectFlags(this.playerX, this.playerY);
            let nextPrio = this.GetObjectFlags(this.playerX + h, this.playerY + v);

            if (currentPrio > nextPrio) {
                // can move
                if (nextPrio > 1) {
                    // there is something in that next position
                    let nextNextPrio = this.GetObjectFlags(this.playerX + h + h, this.playerY + v + v);
                    if ((nextPrio & movableObjects) > nextNextPrio) {
                        // can move that too
                        nextNextPrio |= (nextPrio & movableObjects); // adding the movable object to that position
                        this.SetObjectFlags(this.playerX + h + h, this.playerY + v + v, nextNextPrio);
                        nextPrio &= ~movableObjects; // remove the movable object from that position
                        this.SetObjectFlags(this.playerX + h, this.playerY + v, nextPrio);
                    } else
                        return false;
                }

                nextPrio |= (currentPrio & movableObjects); // adding the movable object to that position
                this.SetObjectFlags(this.playerX + h, this.playerY + v, nextPrio);
                currentPrio &= ~movableObjects; // remove the movable object from that position
                this.SetObjectFlags(this.playerX, this.playerY, currentPrio);

                this.playerX += h;
                this.playerY += v;
            } else
                return false;
            
            if (this.CountUnsolvedBugs() == 0) {
                document.removeEventListener("keydown", onKeyDown);
                this.uiContainer.classList.add("finished");
            }
                
            
            return true;
        },
    };
}
    