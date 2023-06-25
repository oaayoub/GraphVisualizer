
var cursor = {
    x: 0,
    y: 0
};
var dragobj = null,
    h1, i1, oLeft, oTop;

var myBasicLine = document.getElementById("line1")
document.onmousedown = startMove;
document.onmouseup = drop;
document.onmousemove = moving;

function getOBJ(ob) {
    if (ob) {
        return document.getElementById(ob)
    } else {
        return null
    }
}

function makeObjectToDrag(obj) {
    if (obj) {
        dragobj = getOBJ(obj.id);
        console.log("Trigirred" , dragobj.className);
    }

}

function getCenterPoint(el) {
    let centerX = el.offsetLeft + el.offsetWidth / 2;
    let centerY = el.offsetTop + el.offsetHeight / 2;
    return [centerX,centerY];
}

function setInHTML(ob, txt) {
    getOBJ(ob).innerHTML = txt;
}

function checkClass(ob, className) {
    //return boolean
    var element = getOBJ(ob)
    return element.classList.contains(className);
}


function startMove(e) {
    if (dragobj) {
        getCursorPos(e);
        dragobj.className = "moving node";
        i1 = cursor.x - dragobj.offsetLeft;
        h1 = cursor.y - dragobj.offsetTop;
        console.log(i1,h1);

    }
}

function drop() {
    if (dragobj) {
        dragobj.className = "node";
        dragobj = null;
    }
}
function moving(e) {
    getCursorPos(e);
    if (dragobj) {
        oLeft = cursor.x - i1;
        oTop = cursor.y - h1;
        dragobj.style.left = oLeft + 'px';
        dragobj.style.top = oTop + 'px';
        w =  dragobj.offsetWidth;
        h =  dragobj.offsetHeight;
        console.log(w,h);
    // node width is 100 -> w/2 = 50 
        myBasicLine.setAttribute("x2",oLeft + w/2)
        myBasicLine.setAttribute("y2",oTop + h/2)

    }
}

function getCursorPos(e) {
    e = e || window.event;
    if (e.pageX || e.pageY) {
        cursor.x = e.pageX;
        cursor.y = e.pageY;
    } else {
        var de = document.documentElement;
        var db = document.body;
        cursor.x = e.clientX +
            (de.scrollLeft || db.scrollLeft) - (de.clientLeft || 0);
        cursor.y = e.clientY +
            (de.scrollTop || db.scrollTop) - (de.clientTop || 0);
    }
    return cursor;
}

// draw line between two nodes

