let activeColor = new Color4(255, 0, 0);

var colorFrame = new ImageLabel(background);
colorFrame.AnchorPoint = new Vector2(0, 1);
colorFrame.BackgroundColor = null;
colorFrame.Position = new UDim2(0, 20, 1, -20);
colorFrame.Size = new UDim2(0.402, 0, 0.25, 0);
colorFrame.SizeConstraint = Enum.SizeConstraint.RelativeYY;
colorFrame.Source = "cdn/borderwide.png";
workspace.push(colorFrame);

var boxColor = new Frame(colorFrame);
boxColor.Position = new UDim2(3 / 43, 0, 3 / 28, 0);
boxColor.Size = new UDim2(22 / 28, 0, 22 / 28, 0);
boxColor.SizeConstraint = Enum.SizeConstraint.RelativeYY;
boxColor.BackgroundColor = activeColor;
boxColor.MouseEnter = changeColor;
boxColor.MouseButton1Down = changeColor;
workspace.push(boxColor);

var whiteFade = clone(boxColor);
whiteFade.GradientColor = [new Color4(255, 255, 255, 1), new Color4(255, 255, 255, 0)];
whiteFade.GradientStyle = Enum.GradientStyle.LeftRight;
whiteFade.BackgroundColor = null;
workspace.push(whiteFade);

var blackFade = clone(boxColor);
blackFade.GradientColor = [new Color4(0, 0, 0, 0), new Color4(0, 0, 0, 1)];
blackFade.GradientStyle = Enum.GradientStyle.TopBottom;
blackFade.BackgroundColor = null;
workspace.push(blackFade);

boxColor.Selector = new ImageLabel(boxColor);
boxColor.Selector.BackgroundColor = null;
boxColor.Selector.Size = new UDim2(0.2, 0, 0.2, 0);
boxColor.Selector.Source = "cdn/circle.png";
boxColor.Selector.SizeConstraint = Enum.SizeConstraint.RelativeYY;

workspace.push(boxColor.Selector);

function changeColor(e, obj, eventType) {
    if (eventType == Enum.ConnectionType.Mouse1Down || (mouse1Down == true || mouse2Down == true)
        && mouse1DownStart == obj) {
        var y = e.clientY;
        var absY = y - obj.AbsolutePosition.y;
        var pctY = absY / obj.AbsoluteSize.y;
        var x = e.clientX;
        var absX = x - obj.AbsolutePosition.x
        var pctX = absX / obj.AbsoluteSize.x;
        obj.Selector.Position = new UDim2(pctX - 0.08, 0, pctY - 0.08, 0)
        var x = obj.Selector.AbsolutePosition.x + obj.Selector.AbsoluteSize.x / 2;
        var y = obj.Selector.AbsolutePosition.y + obj.Selector.AbsoluteSize.y / 2;
        var color = ctx.getImageData(x, y, 1, 1).data;
        color1 = new Color4(color[0], color[1], color[2], getTransparency());
        boxTransparency.GradientColor = [
            new Color4(0, 0, 0, 0), new Color4(color1.r, color1.g, color1.b)
        ];
    }
}

function moveSlider(e, obj, eventType) {
    if (eventType == Enum.ConnectionType.Mouse1Down || (mouse1Down == true || mouse2Down == true)
        && mouse1DownStart == obj) {
        var y = e.clientY;
        var abs = y - obj.AbsolutePosition.y
        var pct = Math.clamp(abs / obj.AbsoluteSize.y + 0.08, 0.07, 1.07);
        obj.Selector.Position = new UDim2(0.5, 0, pct, 0)
    }
}

function getTransparency() {
    var a = boxTransparency.Selector.Position.yScale / 1.07;
    a = a < 0.081 ? 0 : a;
    return a;
}

function changeTransparency(e, obj, eventType) {
    if (eventType == Enum.ConnectionType.Mouse1Down || ((mouse1Down == true || mouse2Down == true)
        && mouse1DownStart == obj)) {
        moveSlider(e, obj);
        obj.Selector.render();
        color1.a = getTransparency();
    }
}

function changeHue(e, obj, eventType) {
    if (eventType == Enum.ConnectionType.Mouse1Down || ((mouse1Down == true || mouse2Down == true)
        && mouse1DownStart == obj)) {
        moveSlider(e, obj);
        obj.Selector.render();
        var x = obj.Selector.AbsolutePosition.x + obj.Selector.AbsoluteSize.x / 2;
        var y = obj.Selector.AbsolutePosition.y + obj.Selector.AbsoluteSize.y / 2;
        var color = ctx.getImageData(x, y, 1, 1).data;
        activeColor = new Color4(color[0], color[1], color[2]);
        boxColor.BackgroundColor = activeColor;

        var x = boxColor.Selector.AbsolutePosition.x + boxColor.Selector.AbsoluteSize.x / 2;
        var y = boxColor.Selector.AbsolutePosition.y + boxColor.Selector.AbsoluteSize.y / 2;
        var color = ctx.getImageData(x, y, 1, 1).data;
        color1 = new Color4(color[0], color[1], color[2], getTransparency());
        boxTransparency.GradientColor = [
            new Color4(0, 0, 0, 0), new Color4(color1.r, color1.g, color1.b)
        ];
    }
}


var boxHue = new Frame(colorFrame);
boxHue.Position = new UDim2(27 / 43, 0, 3 / 28, 0);
boxHue.Size = new UDim2(5 / 43, 0, 22 / 28, 0);
boxHue.GradientColor = [
    new Color4(255, 0, 0), new Color4(255, 255, 0), new Color4(0, 255, 0),
    new Color4(0, 255, 255), new Color4(0, 0, 255),
    new Color4(255, 0, 255), new Color4(255, 0, 0)
];
boxHue.GradientStyle = Enum.GradientStyle.TopBottom;
boxHue.BackgroundColor = null;
boxHue.MouseEnter = changeHue;
boxHue.MouseButton1Down = changeHue;
workspace.push(boxHue)

var boxTransparency = new Frame(colorFrame);
boxTransparency.Position = new UDim2(35 / 43, 0, 3 / 28, 0);
boxTransparency.Size = new UDim2(5 / 43, 0, 22 / 28, 0);
boxTransparency.GradientColor = [
    new Color4(0, 0, 0, 0), new Color4(color1.r, color1.g, color1.b)
];
boxTransparency.GradientStyle = Enum.GradientStyle.TopBottom;
boxTransparency.BackgroundColor = null;
boxTransparency.MouseEnter = changeTransparency;
boxTransparency.MouseButton1Down = changeTransparency;
workspace.push(boxTransparency)

for (var o = 0; o < 2; o++) {
    var parent = o == 0 ? boxHue : boxTransparency;
    var hueSelector = new Frame(parent);
    hueSelector.BackgroundColor = null;
    hueSelector.Size = new UDim2(1.8, 0, 0.15, 0);
    hueSelector.AnchorPoint = new Vector2(0.5, 1);
    hueSelector.Position = o == 0 ? new UDim2(0.5, 0, 0.08, 0) : new UDim2(0.5, 0, 1.08, 0);
    parent.Selector = hueSelector;
    workspace.push(hueSelector);
    for (var i = 0; i < 2; i++) {
        var arrow = new ImageLabel(hueSelector);
        arrow.AnchorPoint = i == 0 ? new Vector2(0, 0) : new Vector2(1, 0);
        arrow.BackgroundColor = null;
        arrow.Position = i == 0 ? new UDim2(0, 0, 0, 0) : new UDim2(1, 0, 0, 0);
        arrow.Source = i == 0 ? "cdn/arrowRight.png" : "cdn/arrowLeft.png";
        arrow.Size = new UDim2(1, 0, 1, 0);
        arrow.SizeConstraint = Enum.SizeConstraint.RelativeYY;
        workspace.push(arrow);
    }
}

/*
var wx = canvas.height - (blackFade.Position.yScale * blackFade.Parent.Size.yScale * canvas.height);
var wy = wx + blackFade.Size.yScale * blackFade.Parent.Size.yScale * canvas.height;
console.log(wx, wy)
var wf = ctx.createLinearGradient(0, wx, 0, wy);
wf.addColorStop(0, new Color4(0, 0, 0, 1).colorString);
wf.addColorStop(1, new Color4(0, 0, 0, 0).colorString);
blackFade.BackgroundColor = wf;
*/