# svg2gcode

## Installation
```bash
$ npm install git+https://github.com/Nurutomo/svg2gcode.git
```
## Doc
```js
svg2gcode(svg: String, top: Number, shiftX: Number, shiftY: Number, scale: Number, useMM: Boolean) => String
```
## Example
[Running code on repl.it](https://repl.it/@Nurutomo/svg2gcode-example)
```js
const svg2gcode = require('svg2gcode')
const svg = `
<svg width="190" height="160" xmlns="http://www.w3.org/2000/svg">
  <path d="M 10 10 C 20 20, 40 20, 50 10" stroke="black" fill="transparent"/>
  <path d="M 70 10 C 70 20, 110 20, 110 10" stroke="black" fill="transparent"/>
  <path d="M 130 10 C 120 20, 180 20, 170 10" stroke="black" fill="transparent"/>
  <path d="M 10 60 C 20 80, 40 80, 50 60" stroke="black" fill="transparent"/>
  <path d="M 70 60 C 70 80, 110 80, 110 60" stroke="black" fill="transparent"/>
  <path d="M 130 60 C 120 80, 180 80, 170 60" stroke="black" fill="transparent"/>
  <path d="M 10 110 C 20 140, 40 140, 50 110" stroke="black" fill="transparent"/>
  <path d="M 70 110 C 70 140, 110 140, 110 110" stroke="black" fill="transparent"/>
  <path d="M 130 110 C 120 140, 180 140, 170 110" stroke="black" fill="transparent"/>
</svg>`

// Log Output to Console
console.log(svg2gcode(svg, 1, 0, 0, 1, true))
```
Output:
```gcode
; X 0mm
; Y 0mm
; Width 170mm
; Height 110mm

G21 ; Use Millimeter
G0 F1500

M5 ; Turn Off
G0 Z 1
G0 X10 Y-10

G0 X10 Y-10
M3 ; Turn On
G0 Z 0
G0 X10 Y-10
G0 X14.1796875 Y-13.28125
G0 X19.0625 Y-15.625
G0 X24.4140625 Y-17.03125
G0 X30 Y-17.5
G0 X35.5859375 Y-17.03125
G0 X40.9375 Y-15.625
G0 X45.8203125 Y-13.28125

M5 ; Turn Off
G0 Z 1
G0 X70 Y-10

G0 X70 Y-10
M3 ; Turn On
G0 Z 0
G0 X70 Y-10
G0 X71.71875 Y-13.28125
G0 X76.25 Y-15.625
G0 X82.65625 Y-17.03125
G0 X90 Y-17.5
G0 X97.34375 Y-17.03125
G0 X103.75 Y-15.625
G0 X108.28125 Y-13.28125

M5 ; Turn Off
G0 Z 1
G0 X130 Y-10

G0 X130 Y-10
M3 ; Turn On
G0 Z 0
G0 X130 Y-10
G0 X129.2578125 Y-13.28125
G0 X133.4375 Y-15.625
G0 X140.8984375 Y-17.03125
G0 X150 Y-17.5
G0 X159.1015625 Y-17.03125
G0 X166.5625 Y-15.625
G0 X170.7421875 Y-13.28125

M5 ; Turn Off
G0 Z 1
G0 X10 Y-60

G0 X10 Y-60
M3 ; Turn On
G0 Z 0
G0 X10 Y-60
G0 X14.1796875 Y-66.5625
G0 X19.0625 Y-71.25
G0 X24.4140625 Y-74.0625
G0 X30 Y-75
G0 X35.5859375 Y-74.0625
G0 X40.9375 Y-71.25
G0 X45.8203125 Y-66.5625

M5 ; Turn Off
G0 Z 1
G0 X70 Y-60

G0 X70 Y-60
M3 ; Turn On
G0 Z 0
G0 X70 Y-60
G0 X71.71875 Y-66.5625
G0 X76.25 Y-71.25
G0 X82.65625 Y-74.0625
G0 X90 Y-75
G0 X97.34375 Y-74.0625
G0 X103.75 Y-71.25
G0 X108.28125 Y-66.5625

M5 ; Turn Off
G0 Z 1
G0 X130 Y-60

G0 X130 Y-60
M3 ; Turn On
G0 Z 0
G0 X130 Y-60
G0 X129.2578125 Y-66.5625
G0 X133.4375 Y-71.25
G0 X140.8984375 Y-74.0625
G0 X150 Y-75
G0 X159.1015625 Y-74.0625
G0 X166.5625 Y-71.25
G0 X170.7421875 Y-66.5625

M5 ; Turn Off
G0 Z 1
G0 X10 Y-110

G0 X10 Y-110
M3 ; Turn On
G0 Z 0
G0 X10 Y-110
G0 X14.1796875 Y-119.84375
G0 X19.0625 Y-126.875
G0 X24.4140625 Y-131.09375
G0 X30 Y-132.5
G0 X35.5859375 Y-131.09375
G0 X40.9375 Y-126.875
G0 X45.8203125 Y-119.84375

M5 ; Turn Off
G0 Z 1
G0 X70 Y-110

G0 X70 Y-110
M3 ; Turn On
G0 Z 0
G0 X70 Y-110
G0 X71.71875 Y-119.84375
G0 X76.25 Y-126.875
G0 X82.65625 Y-131.09375
G0 X90 Y-132.5
G0 X97.34375 Y-131.09375
G0 X103.75 Y-126.875
G0 X108.28125 Y-119.84375

M5 ; Turn Off
G0 Z 1
G0 X130 Y-110

G0 X130 Y-110
M3 ; Turn On
G0 Z 0
G0 X130 Y-110
G0 X129.2578125 Y-119.84375
G0 X133.4375 Y-126.875
G0 X140.8984375 Y-131.09375
G0 X150 Y-132.5
G0 X159.1015625 Y-131.09375
G0 X166.5625 Y-126.875
G0 X170.7421875 Y-119.84375

M5
G0 Z 1
```
