class Color4 {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = (a == undefined) ? 1 : a;
    }

    multiply(color) {
        cctx.clearRect(0, 0, ccanvas.width, ccanvas.height);
        cctx.fillStyle = this.colorString;
        cctx.fillRect(0, 0, ccanvas.width, ccanvas.height);
        cctx.fillStyle = color.colorString;
        cctx.fillRect(0, 0, ccanvas.width, ccanvas.height);
        var c = cctx.getImageData(1, 1, 1, 1).data;
        return new Color4(c[0], c[1], c[2], c[3] / 255);
    }

    distance(color) {
        var r = (color.r - this.r) ** 2;
        var g = (color.g - this.g) ** 2;
        var b = (color.b - this.b) ** 2;
        return Math.sqrt(r + g + b);
    }

    get colorString() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
    }
}

class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class UDim2 {
    constructor(xScale, xOffset, yScale, yOffset) {
        this.xScale = xScale;
        this.xOffset = xOffset;
        this.yScale = yScale;
        this.yOffset = yOffset;
    }
}

class UIElement {
    constructor(parent) {
        this.AbsolutePosition = new Vector2(0, 0);
        this.AbsoluteSize = new Vector2(0, 0);
        this.AbsoluteZIndex = 1;
        this.AnchorPoint = new Vector2(0, 0);
        this.BackgroundColor = new Color4(255, 255, 255);
        this.GradientColor = [];
        this.GradientStyle = null;
        this.Position = new UDim2(0, 0, 0, 0);
        this.Parent = parent || null;
        this.Size = new UDim2(0, 100, 0, 100);
        this.SizeConstraint = Enum.SizeConstraint.RelativeXY;
        this.Visible = true;
        this.ZIndex = 1;
        this.MouseButton1Click = null;
        this.MouseButton2Click = null;
        this.MouseButton1Down = null;
        this.MouseButton2Down = null;
        this.MouseButton1Up = null;
        this.MouseButton2Up = null;
        this.MouseEnter = null;
        this.MouseLeave = null;
    }

    render() {
        var color = this.BackgroundColor;
        var gradientColor = this.GradientColor;
        var gradientStyle = this.GradientStyle;
        var image = this.Image;
        var source = this.Source;

        if (source && image && image.src != source) {
            image.onload = function () { }
            image.src = source;
        }

        this.AnchorPoint.x = Math.clamp(this.AnchorPoint.x, 0, 1)
        this.AnchorPoint.y = Math.clamp(this.AnchorPoint.y, 0, 1)

        var parent = this.Parent;
        this.AbsoluteZIndex = parent == null ? this.ZIndex : this.ZIndex + parent.ZIndex;
        var parentX = parent == null ? 0 : parent.AbsolutePosition.x;
        var parentY = parent == null ? 0 : parent.AbsolutePosition.y;
        var parentWidth = parent == null ? window.innerWidth : parent.AbsoluteSize.x;
        var parentHeight = parent == null ? window.innerHeight : parent.AbsoluteSize.y;

        var xRelative = (this.SizeConstraint != 2) ? parentWidth : parentHeight;
        var yRelative = (this.SizeConstraint != 0) ? parentHeight : parentWidth;

        var x = this.Position.xScale * parentWidth + this.Position.xOffset + parentX;
        var y = this.Position.yScale * parentHeight + this.Position.yOffset + parentY;
        var w = this.Size.xScale * xRelative + this.Size.xOffset
        var h = this.Size.yScale * yRelative + this.Size.yOffset

        x -= w * this.AnchorPoint.x;
        y -= h * this.AnchorPoint.y;

        this.AbsolutePosition = new Vector2(x, y);
        this.AbsoluteSize = new Vector2(w, h);

        if (this.Visible == true) {
            if (color != null && (gradientColor == null || gradientStyle == null)) {
                ctx.fillStyle = color instanceof Color4 ? color.colorString : color;
                ctx.fillRect(x, y, w, h);
            }
            if (gradientColor != null && gradientStyle != null) {
                var gx = gradientStyle == Enum.GradientStyle.LeftRight ? x : y;
                var gy = (gradientStyle == Enum.GradientStyle.LeftRight ? w : h) + gx;
                var lg = gradientStyle == Enum.GradientStyle.LeftRight ?
                    ctx.createLinearGradient(gx, 0, gy, 0) : ctx.createLinearGradient(0, gx, 0, gy);

                lg.addColorStop(0, gradientColor[0].colorString);
                lg.addColorStop(1, gradientColor[gradientColor.length - 1].colorString);
                for (var i = 1; i < gradientColor.length - 1; i++) {
                    lg.addColorStop(i * (1 / (gradientColor.length - 1)), gradientColor[i].colorString);
                }

                ctx.fillStyle = lg;
                ctx.fillRect(x, y, w, h);
            }
            if (this instanceof ImageLabel && image && this.Source) {
                var imgColor = this.ImageColor instanceof Color4 ? this.ImageColor.colorString : this.ImageColor;
                var finalImage = new Image();
                finalImage.onload = function () { };
                finalImage.src = image.src;

                ictx.globalCompositeOperation = "source-over";
                ictx.clearRect(0, 0, canvas.width, canvas.height);
                ictx.drawImage(finalImage, x, y, w, h);

                ictx.globalCompositeOperation = "multiply";
                ictx.fillStyle = imgColor;
                ictx.fillRect(x, y, w, h);

                ictx.globalCompositeOperation = 'destination-in';
                ictx.drawImage(finalImage, x, y, w, h);

                ctx.drawImage(icanvas, 0, 0);
            }

            if (this instanceof TextLabel) {
                var fontSize = this.TextScaled == true ? getFontSize(this.Text, this.Font, w) + "px" : this.FontSize;
                ctx.font = `${fontSize} ${this.Font}`
                ctx.fillStyle = this.TextColor.colorString;
                y += parseInt(fontSize);
                ctx.fillText(this.Text, x, y);
            }

            if (this instanceof Border) {
                this.images.forEach(v => {
                    v.render();
                });
            }
        }
    }
}

class Frame extends UIElement {
    constructor(parent) {
        super(parent)
    }
}

class ImageLabel extends UIElement {
    constructor(parent) {
        super(parent);
        this.Image = new Image();
        this.ImageColor = new Color4(255, 255, 255);
        this.Source = null;
    }
}

class TextLabel extends UIElement {
    constructor(parent) {
        super(parent)
        this.Font = "Calibri";
        this.FontSize = "20px";
        this.Size = new UDim2(0, 200, 0, 100);
        this.Text = "TextLabel";
        this.TextColor = new Color4(0, 0, 0);
        this.TextScaled = false;
    }
}

class Border extends Frame {
    constructor(parent) {
        super(parent);
        this.palette = [colors.paletteBlack, colors.paletteRed, colors.paletteYellow];
        this.images = [new ImageLabel(this), new ImageLabel(this), new ImageLabel(this)];
        for (var i = 0; i < this.images.length; i++) {
            var image = this.images[i];
            image.Size = new UDim2(1, 0, 1, 0);
            image.Source = `/cdn/border/${i + 1}.png`
            image.BackgroundColor = null;
            image.ImageColor = this.palette[i];
        }
    }
}

function createSquare(Class, i, i2) {
    var f = new Frame();
    f.Parent = Class.parent;
    f.Size = new UDim2(1 / width, 1, 1 / height, 1);
    f.Position = new UDim2(i2 * (1 / width), 0, i * (1 / width), 0);
    f.BackgroundColor = new Color4(0, 0, 0, 0);
    f.ZIndex = 3;
    workspace.push(f);
    Class.hover[i][i2] = f;
    f.MouseEnter = function (e) {
        f.BackgroundColor = new Color4(0, 0, 0, 0.1);
        if ((mouse1Down == true && mouse1DownStart.Parent == f.Parent)
            || (mouse2Down == true && mouse2DownStart.Parent == f.Parent)) {
            switch (activeTool) {
                case "paintbrush":
                    if (modifiedPixels[i] == null || modifiedPixels[i][i2] == null) {
                        var color = mouse1Down == true ? clone(color1) : clone(color2);
                        if (color.a < 1 && Class.pixels[i][i2].BackgroundColor != null)
                            color = Class.pixels[i][i2].BackgroundColor.multiply(color);
                        console.log(1)

                        modifiedPixels[i] = modifiedPixels[i] == null ? {} : modifiedPixels[i];
                        modifiedPixels[i][i2] = color;

                        Class.pixels[i][i2].BackgroundColor = color;
                    }
                    break;
                case "eraser":
                    if (mouse1Down == true)
                        Class.pixels[i][i2].BackgroundColor = null;
                    break;
            }
        }
    };
    f.MouseLeave = function (e) {
        f.BackgroundColor = new Color4(0, 0, 0, 0);
    };
    f.MouseButton1Down = function (e) {
        switch (activeTool) {
            case "paintbrush":
                if (modifiedPixels[i] == null || modifiedPixels[i][i2] == null) {
                    var color = clone(color1);
                    if (color.a < 1 && Class.pixels[i][i2].BackgroundColor != null)
                        color = Class.pixels[i][i2].BackgroundColor.multiply(color);

                    modifiedPixels[i] = modifiedPixels[i] == null ? {} : modifiedPixels[i];
                    modifiedPixels[i][i2] = color;

                    Class.pixels[i][i2].BackgroundColor = color;
                }
                break;
            case "eraser":
                Class.pixels[i][i2].BackgroundColor = null;
                break;
            case "eyedropper":
                color1 = Class.pixels[i][i2].BackgroundColor;
                break;
            case "fill":
                fillTable = [];
                fillTable[i] = [];
                fillTable[i][i2] = 0;

                fill(Class, Class.pixels[i][i2].BackgroundColor, i, i2)
                Class.pixels[i][i2].BackgroundColor = color1;
                break;
        }
    }
    f.MouseButton2Down = function (e) {
        switch (activeTool) {
            case "paintbrush":
                if (modifiedPixels[i] == null || modifiedPixels[i][i2] == null) {
                    var color = clone(color2);
                    if (color.a < 1 && Class.pixels[i][i2].BackgroundColor != null)
                        color = Class.pixels[i][i2].BackgroundColor.multiply(color);

                    modifiedPixels[i] = modifiedPixels[i] == null ? {} : modifiedPixels[i];
                    modifiedPixels[i][i2] = color;

                    Class.pixels[i][i2].BackgroundColor = color;
                }
                break;
        }
    }
}

class Canvas {
    constructor(container) {
        this.parent = container;
        this.pixels = {};
        this.hover = {};
        this.transparency = {};

        var pixels = this.pixels;
        for (var i = 0; i < height; i++) {
            pixels[i] = {}
            for (var i2 = 0; i2 < width; i2++) {
                var f = new Frame();
                f.Parent = this.parent;
                f.Size = new UDim2(1 / width, 1, 1 / height, 1);
                f.Position = new UDim2(i2 * (1 / width), 0, i * (1 / width), 0);
                f.BackgroundColor = new Color4(0, 0, 0, 0);
                f.ZIndex = 2;
                workspace.push(f);
                this.pixels[i][i2] = f;
            }
        }

        for (var i = 0; i < height; i++) {
            this.hover[i] = {}
            for (var i2 = 0; i2 < width; i2++) {
                createSquare(this, i, i2)
            }
        }

        for (var i = 0; i < height; i++) {
            this.transparency[i] = {}
            for (var i2 = 0; i2 < width; i2++) {
                var color;
                if (i % 2 == 0) {
                    color = i2 % 2 ? colors.transparencyEven : colors.transparencyOdd;
                } else {
                    color = i2 % 2 ? colors.transparencyOdd : colors.transparencyEven;
                }

                var f = new Frame();
                f.Parent = this.parent;
                f.Size = new UDim2(1 / width, 0, 1 / height, 0);
                f.Position = new UDim2(i2 * (1 / width), 0, i * (1 / width), 0);
                f.BackgroundColor = color;
                workspace.push(f);
                this.transparency[i][i2] = f;
            }
        }
    }
}