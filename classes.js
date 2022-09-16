function clone(obj) {
    return Object.assign(Object.create(Object.getPrototypeOf(obj)), obj)
}

class Color4 {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = (a == undefined) ? 1 : a;
    }

    get colorString() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
    }
}

class Sprite {
    constructor(src, x, y, w, h) {
        this.src = src;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.img = new Image();
        this.img.src = this.src;
        this.img.onload = function (e) {
        }
    }

    onClick(func) {
        var t = this;
        document.addEventListener('click', function (e) {
            var x = e.clientX;
            var y = e.clientY;
            var w = t.w;
            var h = t.h;
            var tx = t.x;
            var ty = t.y;
            if (x >= tx && x <= tx + w && y >= ty && y <= ty + h) {
                func();
            }
        });
    }

    render(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
}

class Rect {
    constructor(color, x, y, w, h) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    onClick(func) {
        var t = this;
        document.addEventListener('click', function (e) {
            var x = e.clientX;
            var y = e.clientY;
            var w = t.w;
            var h = t.h;
            var tx = t.x;
            var ty = t.y;
            if (x >= tx && x <= tx + w && y >= ty && y <= ty + h) {
                func();
            }
        });
    }

    render(ctx, x, y) {
        var color = this.color;
        ctx.fillStyle = color instanceof Color4 ? color.colorString : color;
        ctx.fillRect(x || this.x, y || this.y, this.w, this.h);
    }
}