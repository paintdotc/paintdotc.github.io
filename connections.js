let mouse1DownObj;
let mouse1Down = false;
let mouse2Down = false;
let mouse1DownStart;
let mouse2DownStart;

document.addEventListener('click', function (e) {
    modifiedPixels = {};

    mouse1Down = false;
    mouse1DownStart = null;

    var x = e.clientX;
    var y = e.clientY;
    var clickedObjects = [];
    workspace.forEach(v => {
        var pos = v.AbsolutePosition;
        var size = v.AbsoluteSize;
        if (v.Visible == true) {
            if (isInside(x, y, pos.x, pos.y, size.x, size.y)) {
                clickedObjects.push(v)
            }
        }
    });

    var zIndex = -Infinity;
    var clickedObject;
    clickedObjects.forEach(v => {
        if (v.AbsoluteZIndex > zIndex) {
            zIndex = v.AbsoluteZIndex;
            clickedObject = v;
        }
    });

    if (clickedObject) {
        var click = clickedObject.MouseButton1Click;
        if (click && typeof click == 'function') {
            click(e, clickedObject, Enum.ConnectionType.Mouse1Click);
        }
    }
});

document.addEventListener('contextmenu', function (e) {
    modifiedPixels = {};

    mouse2Down = false;
    mouse2DownStart = null;

    var x = e.clientX;
    var y = e.clientY;
    var clickedObjects = [];
    workspace.forEach(v => {
        var pos = v.AbsolutePosition;
        var size = v.AbsoluteSize;
        if (v.Visible == true) {
            if (isInside(x, y, pos.x, pos.y, size.x, size.y)) {
                clickedObjects.push(v)
            }
        }
    });

    var zIndex = -Infinity;
    var clickedObject;
    clickedObjects.forEach(v => {
        if (v.AbsoluteZIndex > zIndex) {
            zIndex = v.AbsoluteZIndex;
            clickedObject = v;
        }
    });

    if (clickedObject) {
        var click = clickedObject.MouseButton2Click;
        if (click && typeof click == 'function') {
            click(e, clickedObject, Enum.ConnectionType.Mouse2Click);
        }
    }
});

document.addEventListener('mousemove', function (e) {
    var x = e.clientX;
    var y = e.clientY;
    var clickedObjects = [];
    workspace.forEach(v => {
        var pos = v.AbsolutePosition;
        var size = v.AbsoluteSize;
        if (v.Visible == true) {
            if (isInside(x, y, pos.x, pos.y, size.x, size.y)) {
                clickedObjects.push(v);
            } else {
                var click = v.MouseLeave;
                if (click && typeof click == 'function') {
                    click(e, clickedObject, Enum.ConnectionType.MouseLeave);
                }
            }
        }
    });

    var zIndex = -Infinity;
    var clickedObject;
    clickedObjects.forEach(v => {
        if (v.AbsoluteZIndex > zIndex) {
            zIndex = v.AbsoluteZIndex;
            clickedObject = v;
        }
    });


    if (clickedObject) {
        var click = clickedObject.MouseEnter;
        if (click && typeof click == 'function') {
            click(e, clickedObject, Enum.ConnectionType.MouseEnter);
        }
    }
});

document.addEventListener('mousedown', function (e) {
    switch (e.button) {
        case 0:
            mouse1Down = true;
            break;
        case 2:
            mouse2Down = true;
            break;
    }

    var x = e.clientX;
    var y = e.clientY;
    var clickedObjects = [];
    workspace.forEach(v => {
        var pos = v.AbsolutePosition;
        var size = v.AbsoluteSize;
        if (v.Visible == true) {
            if (isInside(x, y, pos.x, pos.y, size.x, size.y)) {
                clickedObjects.push(v)
            }
        }
    });

    var zIndex = -Infinity;
    var clickedObject;
    clickedObjects.forEach(v => {
        if (v.AbsoluteZIndex > zIndex) {
            zIndex = v.AbsoluteZIndex;
            clickedObject = v;
        }
    });

    if (clickedObject) {
        var click;
        var connectionType;
        switch (e.buttons) {
            case 1:
                click = clickedObject.MouseButton1Down;
                if (mouse1DownStart == null) {
                    mouse1DownStart = clickedObject;
                    connectionType = Enum.ConnectionType.Mouse1Down;
                }
                break;
            case 2:
                click = clickedObject.MouseButton2Down;
                if (mouse2DownStart == null) {
                    mouse2DownStart = clickedObject;
                    connectionType = Enum.ConnectionType.Mouse2Down;
                }
                break;
        }
        if (click && typeof click == 'function') {
            click(e, clickedObject, connectionType);
        }
    }
});

document.addEventListener('mouseup', function (e) {
    var x = e.clientX;
    var y = e.clientY;
    var clickedObjects = [];
    workspace.forEach(v => {
        var pos = v.AbsolutePosition;
        var size = v.AbsoluteSize;
        if (v.Visible == true) {
            if (isInside(x, y, pos.x, pos.y, size.x, size.y)) {
                clickedObjects.push(v)
            }
        }
    });

    var zIndex = -Infinity;
    var clickedObject;
    clickedObjects.forEach(v => {
        if (v.AbsoluteZIndex > zIndex) {
            zIndex = v.AbsoluteZIndex;
            clickedObject = v;
        }
    });

    if (clickedObject) {
        var click;
        var connectionType;
        switch (e.button) {
            case 0:
                click = clickedObject.MouseButton1Up;
                connectionType = Enum.ConnectionType.Mouse1Up;
                break;
            case 2:
                click = clickedObject.MouseButton2Up;
                connectionType = Enum.ConnectionType.Mouse2Up;
                break;
        }
        if (click && typeof click == 'function') {
            click(e, clickedObject, connectionType);
        }
    }
});