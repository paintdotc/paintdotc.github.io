var index = 0;
var lastBorder;
Object.entries(tools).forEach(([i, v]) => {
    // RENDER BORDER
    var border = new Border(lastBorder || frame2);
    border.AnchorPoint = index % 2 == 0 ? new Vector2(0, 0) : new Vector2(1, 0);
    border.BackgroundColor = null;
    var y = index > 1 && index % 2 == 0 ? 1.2 : 0;
    var x = border.AnchorPoint.x == 1 ? 2.1 : 0;
    border.Position = index % 2 == 0 ? new UDim2(x, 0, y, 0) : new UDim2(x, 0, y, 0);
    border.Size = lastBorder ? new UDim2(1, 0, 1, 0) : new UDim2(0.5, -10, 0.5, -10);
    border.SizeConstraint = Enum.SizeConstraint.RelativeXX;
    workspace.push(border);

    if (index % 2 == 0)
        lastBorder = border;

    var icon = new ImageLabel(border);
    icon.BackgroundColor = activeTool == i ? new Color4(0, 0, 0, 0.4) : null;
    icon.Source = v.src;
    icon.AnchorPoint = new Vector2(0.5, 0.5);
    icon.Position = new UDim2(0.5, 0, 0.5, 0);
    icon.Size = new UDim2(0.8, 0, 0.8, 0);
    icon.ZIndex += 1;
    icon.MouseEnter = function (e) {
        if (!activeTool || activeTool != i)
            icon.BackgroundColor = new Color4(0, 0, 0, 0.2);
    };
    icon.MouseLeave = function (e) {
        if (!activeTool || activeTool != i)
            icon.BackgroundColor = new Color4(0, 0, 0, 0);
    };
    icon.MouseButton1Click = function (e) {
        tools[activeTool].sprite.BackgroundColor = new Color4(0, 0, 0, 0);
        activeTool = i;
        icon.BackgroundColor = new Color4(0, 0, 0, 0.4);
        document.body.style.cursor =
            `url('${v.src.replace("cdn/", "cdn/mouse/")}') ${v.offset}, auto`;
    }
    workspace.push(icon);
    v.sprite = icon;
    index++;
});

document.body.style.cursor =
    `url('${tools[activeTool].src.replace("cdn/", "cdn/mouse/")}') ${tools[activeTool].offset}, auto`;

document.addEventListener('keypress', function (e) {
    switch (e.key) {
        case "x":
            switchColors();
            break;
        default:
            Object.entries(tools).forEach(([i, v]) => {
                if (e.key == v.keybind) {
                    tools[activeTool].sprite.BackgroundColor = new Color4(0, 0, 0, 0);
                    activeTool = i;
                    tools[activeTool].sprite.BackgroundColor = new Color4(0, 0, 0, 0.4);
                    document.body.style.cursor =
                        `url('${v.src.replace("cdn/", "cdn/mouse/")}') ${v.offset}, auto`;
                }
            });
            break;
    }
});