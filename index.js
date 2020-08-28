const { parseSVG, makeAbsolute } = require('svg-path-parser')
const { JSDOM } = require('jsdom')

function bezier(i, x1, y1, x2, y2, x3, y3, x4, y4) {

    x5 = (x2 - x1) * i + x1
    y5 = (y2 - y1) * i + y1
    x6 = (x3 - x2) * i + x2
    y6 = (y3 - y2) * i + y2
    x7 = (x4 - x3) * i + x3
    y7 = (y4 - y3) * i + y3

    x8 = (x6 - x5) * i + x5
    y8 = (y6 - y5) * i + y5
    x9 = (x7 - x6) * i + x6
    y9 = (y7 - y6) * i + y6

    return [
        (x9 - x8) * i + x8,
        (y9 - y8) * i + y8
    ]
}

function path2gcode(dList, top = 1, sx = 0, sy = 0, scale = 1, useMM) {
    let maxx = -Infinity
    let maxy = -Infinity
    let minx = Infinity
    let miny = Infinity
    let z = 0
    let gcode = [useMM ? 'G21 ; Use Millimeter' : 'G20 ; Use Inch', 'G0 F1500']
    for (let d of dList) {
        let commands = parseSVG(d)
        makeAbsolute(commands)
        for (let command of commands) {
            let { code, x, y, x0, y0, x1, y1, x2, y2 } = command
            x -= sx
            y -= sy
            x0 -= sx
            y0 -= sy
            x1 -= sx
            y1 -= sy
            x2 -= sx
            y2 -= sy
            x *= scale
            y *= scale
            x0 *= scale
            y0 *= scale
            x1 *= scale
            y1 *= scale
            x2 *= scale
            y2 *= scale
            minx = Math.min(minx, x, x0)
            miny = Math.min(miny, y, y0)
            maxx = Math.max(maxx, x, x0)
            maxy = Math.max(maxy, y, y0)
            switch (code) {
                case 'M':
                    z = top
                    gcode.push('', `M5 ; Turn Off`, `G0 Z ${z}`, `G0 X${x} Y${-y}`)
                    break
                case 'V':
                case 'H':
                case 'L':
                    if (z != 0) {
                        z = 0
                        gcode.push('', `M3 ; Turn On`, `G0 Z ${z}`)
                    }
                    gcode.push(`G0 X${x} Y${-y}`)
                    break
                case 'C':
                    if (z != 0) {
                        z = 0
                        gcode.push('', `G0 X${x0} Y${-y0}`, `M3 ; Turn On`, `G0 Z ${z}`)
                    }
                    let points = []
                    let resolution = 8
                    for (let i = 0; i < resolution; i++) {
                        let pos = i / resolution
                        points.push(bezier(pos, x0, y0, x1, y2, x2, y2, x, y))
                    }
                    for (let [x, y] of points) {
                        gcode.push(`G0 X${x} Y${-y}`)
                    }
                    break
            }
        }
    }
    gcode.push('', `M5`, `G0 Z ${top}`)

    let measurement = useMM ? 'mm' : ' inch'
    gcode.unshift(`; Height ${maxy - miny + measurement}`, '')
    gcode.unshift(`; Width ${maxx - minx + measurement}`)
    gcode.unshift(`; Y ${minx + measurement}`)
    gcode.unshift(`; X ${minx + measurement}`)
    return gcode.join('\n')
}

function svg2gcode(svg, top = 1, sx = 0, sy = 0, scale = 1 / 96, useMM = false) {
    let dom = new JSDOM(svg);
    let document = dom.window.document
    let list = document.querySelectorAll('path')
    let dList = []

    for (let node of list) {
        dList.push(node.getAttribute('d'))
    }
    return path2gcode(dList, top, sx, sy, scale, useMM)
}

module.exports = svg2gcode