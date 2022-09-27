// const num = prompt("邊界:")
// document.documentElement.style.setProperty("--col-num", Number(num))
// document.documentElement.style.setProperty("--row-num", Number(3 / 2 * num))

const MODE = document.getElementById("mode")
const BTN = document.getElementById("btn")
let algo;
let mode = "start";



MODE.addEventListener("change", e => {
    mode = document.querySelector("[name=mode]:checked").value
})

BTN.addEventListener("click", e => {
    algo = document.querySelector("[name=algo]:checked").value
    console.log(algo, mode)

    if (algo === "Dijkstra")
        print(Dijkstra(SPOT["start"], SPOT["end"]))
    else {
        print(Astart(SPOT["start"], SPOT["end"]))
    }
    BTN.disabled = true;
})


const NODES = []
const OBJS = []
let SPOT = { start: null, end: null };
let TARGET;
document.addEventListener("click", e => {
    if (e.target.matches(".node")) {
        const index = NODES.findIndex(n => n.node === e.target)
        NODES[index].add(mode)
        SPOT[mode]?.remove(mode)
        SPOT[mode] = NODES[index]

        if (mode === 'start') {
            mode = 'end'
        } else {
            mode = 'start'
        }
        document.getElementById(mode).checked = true;
    }
})
const ROW = getComputedStyle(document.documentElement).getPropertyValue("--row-num")
const COL = getComputedStyle(document.documentElement).getPropertyValue("--col-num")

const container = document.querySelector(".container")


if (("ontouchstart" in document.documentElement)) {
    container.classList.add("mobile")
}

class Node {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.node = document.createElement("div")
        this.node.className = "node"
        container.append(this.node)
    }
    set finish(val) {
        this._finish = val;
        // if (val === false) this.remove("finish")
    }
    get finish() {
        return this._finish;
    }
    add(className) {
        this.node.classList.add(className)
    }
    remove(className) {
        this.node.classList.remove(className)
    }
    toggle(className) {
        this.node.classList.toggle(className)
    }
}
class Obj {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.obj = document.createElement("div")
        this.obj.className = "obj"
        container.append(this.obj)
    }
}

const MAP = []
for (let i = 0; i < ROW; ++i) {
    MAP[i] = []
    for (let j = 0; j < COL; ++j) {
        MAP[i][j] = 1;
    }
}

// for (let i = 1; i <= 28; ++i) {
//     MAP[14][i] = 0
//     MAP[i][14] = 0
// }


MAP.forEach((row, i) => {
    row.forEach((col, j) => {
        if (col === 1) {
            NODES.push(new Node(j, i))
        } else {
            OBJS.push(new Obj(j, i))
        }
    })
})






function Dijkstra(S, E) {

    let path = []
    let weight = []
    const finish = []
    for (let i = 0; i < NODES.length; ++i) {
        NODES[i].finish = false
        weight[i] = d2(S, NODES[i])
        path[i] = -1;
    }


    S.finish = true;


    for (let j = 0; j < NODES.length - 1; ++j) {
        let min = Number.MAX_SAFE_INTEGER;
        let base;

        for (let i = 0; i < NODES.length; ++i) {

            if (!NODES[i].finish && weight[i] < min) {
                min = weight[i]
                base = i;
            }
        }

        NODES[base].finish = true;


        if (NODES[base] === E) {

            let flag = true

            const showProcess = () => {
                if (flag) {
                    flag = false
                    NODES[finish.shift()].add("finish")
                    setTimeout(() => {
                        flag = true
                    }, 10)
                }
                if (finish.length === 0)
                    return obj.flag = true

                requestAnimationFrame(showProcess)
            }

            showProcess()
            const stack = []
            let i = NODES.findIndex(n => n === E);
            while (path[i] !== -1) {
                stack.push(path[i])
                i = path[i]
            }
            let obj = { path: stack, flag: false }
            return obj
        }


        for (let i = 0; i < NODES.length; ++i) {
            if (!NODES[i].finish && min + d2(NODES[base], NODES[i]) < weight[i]) {
                weight[i] = min + d2(NODES[base], NODES[i])
                path[i] = base
            }
        }

        finish.push(base)

    }


}

function d2(a, b) {
    return neighbor(a, b) ? 1 : Number.MAX_SAFE_INTEGER
}
function d(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
}

function neighbor(a, b) {
    return (Math.abs(a.x - b.x) === 1 && a.y === b.y) ||
        (Math.abs(a.y - b.y) === 1 && a.x === b.x)
}


function print(obj) {

    if (obj.flag) {

        NODES[obj.path.pop()].add("show")

        obj.flag = false
        setTimeout(() => {
            obj.flag = true
        }, 100)
    }

    if (obj.path.length === 0)
        return BTN.disabled = false

    requestAnimationFrame(() => print(obj))
}
// print(Dijkstra(0, 423))








function Astart(S, E) {

    let path = []
    let weight = []
    const finish = []
    for (let i = 0; i < NODES.length; ++i) {
        NODES[i].finish = false
        weight[i] = d2(S, NODES[i])
        path[i] = -1;
    }


    S.finish = true;


    for (let j = 0; j < NODES.length - 1; ++j) {
        let min = Number.MAX_SAFE_INTEGER;
        let base;

        for (let i = 0; i < NODES.length; ++i) {

            const h = d(NODES[i], E)
            if (!NODES[i].finish && weight[i] + h < min) {
                min = weight[i] + h
                base = i;
            }
        }

        NODES[base].finish = true;


        if (NODES[base] === E) {

            let flag = true

            const showProcess = () => {
                if (flag) {
                    flag = false
                    NODES[finish.shift()].add("finish")
                    setTimeout(() => {
                        flag = true
                    }, 10)
                }
                if (finish.length === 0)
                    return obj.flag = true

                requestAnimationFrame(showProcess)
            }

            showProcess()
            const stack = []
            let i = NODES.findIndex(n => n === E);
            while (path[i] !== -1) {
                stack.push(path[i])
                i = path[i]
            }
            let obj = { path: stack, flag: false }
            return obj
        }


        for (let i = 0; i < NODES.length; ++i) {
            if (!NODES[i].finish && min + d2(NODES[base], NODES[i]) < weight[i]) {
                weight[i] = min + d2(NODES[base], NODES[i])
                path[i] = base
            }
        }

        finish.push(base)

    }


}




