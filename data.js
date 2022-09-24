let fillTable = [];
let modifiedPixels = {};

const tools = {
    select: {
        src: "/cdn/select.png",
        keybind: "v",
        offset: "0 0"
    },
    marquee: {
        src: "/cdn/marquee.png",
        keybind: "m",
        offset: "0 0"
    },
    paintbrush: {
        src: "/cdn/paintbrush.png",
        keybind: "b",
        offset: "-50 50"
    },
    fill: {
        src: "/cdn/fill.png",
        keybind: "g",
        offset: "-60 10"
    },
    eraser: {
        src: "/cdn/eraser.png",
        keybind: "e",
        offset: "-50 50"
    },
    eyedropper: {
        src: "/cdn/eyedropper.png",
        keybind: "i",
        offset: "-50 50"
    },
}