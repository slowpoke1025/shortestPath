const ROW = COL = 25;
const container = document.querySelector(".container")
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
        this.node.classList.add("finish")
    }
    get finish() {
        return this._finish;
    }
    show() {
        this.node.classList.add("show")
    }
    start() {
        this.node.classList.add("start")
    }
    end() {
        this.node.classList.add("end")
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

for (let i = 6; i < 15; ++i) {
    MAP[10][i] = 0
    MAP[i][10] = 0
}

const NODES = []
const OBJS = []

MAP.forEach((row, i) => {
    row.forEach((col, j) => {
        if (col === 1) {
            NODES.push(new Node(j, i))
        } else {
            OBJS.push(new Obj(j, i))
        }
    })
})




let path = []
let weight = []

function Dijkstra(index, target) {

    for (let i = 0; i < NODES.length; ++i) {
        weight[i] = d2(NODES[index], NODES[i])
        path[i] = -1;
    }
    NODES[index].start()
    NODES[target].end()
    NODES[index].finish = true;

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
        if (base === target) return

        for (let i = 0; i < NODES.length; ++i) {
            if (!NODES[i].finish && min + d2(NODES[base], NODES[i]) < weight[i]) {
                weight[i] = min + d2(NODES[base], NODES[i])
                path[i] = base
            }
        }

    }
}

function d2(a, b) {
    return neighbor(a, b) ? Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) : Number.MAX_SAFE_INTEGER
}

function neighbor(a, b) {
    return Math.abs(a.x - b.x) === 1 && a.y === b.y ||
        Math.abs(a.y - b.y) === 1 && a.x === b.x
}




let target = 227
Dijkstra(0, target)
let flag = true


function print() {

    if (flag) {

        NODES[path[target]].node.classList.add("show")
        target = path[target]
        flag = false
        setTimeout(() => {
            flag = true
        }, 100)
    }

    if (path[target] === -1)
        return

    requestAnimationFrame(print)
}
print()

