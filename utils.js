Math.clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function clone(obj) {
    return Object.assign(Object.create(Object.getPrototypeOf(obj)), obj)
}

function getFontSize(text, fontFace, maxWidth) {
    ctx.font = `1px ${fontFace}`;
    return maxWidth / ctx.measureText(text).width;
}

function isInside(x, y, sx, sy, sw, sh) {
    if (x >= sx && x < sx + sw &&
        y >= sy && y < sy + sh) {
        return true;
    } else {
        return false;
    }
}

function switchColors() {
    [color1, color2] = [color2, color1];
    boxTransparency.GradientColor = [
        new Color4(0, 0, 0, 0), color1
    ];
}

function fill(Class, color, b, b2) {
    for (var a = -1; a < 2; a += 2) {
        var x = b2 + a;
        var y = b;

        if ((x >= 0 && y >= 0) && (fillTable[y] == null || fillTable[y][x] == null)) {
            fillTable[y] = fillTable[y] == null ? [] : fillTable[y];
            fillTable[y][x] = 0;
            if (Class.pixels[y] && Class.pixels[y][x]) {
                if (Class.pixels[y][x].BackgroundColor.colorString == color.colorString) {
                    var sq = Class.pixels[y][x];
                    sq.BackgroundColor = color1;

                    fill(Class, color, y, x)
                }
            }
        }
    }

    for (var a = -1; a < 2; a += 2) {
        var x = b2;
        var y = b + a;

        if ((x >= 0 && y >= 0) && (fillTable[y] == null || fillTable[y][x] == null)) {
            fillTable[y] = fillTable[y] == null ? [] : fillTable[y];
            fillTable[y][x] = 0;
            if (Class.pixels[y] && Class.pixels[y][x]) {
                if (Class.pixels[y][x].BackgroundColor.colorString == color.colorString) {
                    var sq = Class.pixels[y][x];
                    sq.BackgroundColor = color1;

                    fill(Class, color, y, x)
                }
            }
        }
    }

}

function save(sCanvas) {
    if (sCanvas instanceof Canvas) {
        var scanvas = document.createElement('CANVAS');
        var sctx = scanvas.getContext('2d');
        var dataURL;
        scanvas.height = height * 10;
        scanvas.width = width * 10;
        for (var i = 0; i < height; i++) {
            for (var i2 = 0; i2 < width; i2++) {
                sctx.fillStyle = sCanvas.pixels[i][i2].BackgroundColor.colorString
                sctx.fillRect(i2 * 10, i * 10, 10, 10);
            }
        }
        dataURL = scanvas.toDataURL();
        console.log(dataURL);
        saveBase64AsFile(dataURL, "drawing.png");
    }
}

function saveBase64AsFile(base64, fileName) {
    var link = document.createElement("a");

    document.body.appendChild(link); // for Firefox

    link.setAttribute("href", base64);
    link.setAttribute("download", fileName);
    link.click();
}