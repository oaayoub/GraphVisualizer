function getNumbersFromString(string) {
    // Create a regular expression that matches any digit.
    const regex = /\d+/g;
  
    // Match all the numbers in the string and return them as an array.
    var arr =  string.match(regex);
    var number = arr.reduce(function (accum, digit) {
        return (accum * 10) + digit
    }, 0);
    return number;
  }

var cursor = {
    x: 0,
    y: 0
};
var dragobj = null,
    h1, i1, oLeft, oTop;

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
	    console.log("zz")
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
        var MyX = w/2 + oLeft;
        var MyY = h/2 + oTop;
        // node width is 100 -> w/2 = 50 
        // myBasicLine.setAttribute("x2",oLeft + w/2)
        // myBasicLine.setAttribute("y2",oTop + h/2)
        //undirected
        // var LineTo = document.getElementById("12");
        // var LineFrom = document.getElementById("21");
        
        // var x2 = w/2 + ToNode.offsetLeft;
        // var y2 = h/2 + ToNode.offsetTop ;
        // LineTo.setAttribute("x1",oLeft + w/2)
        // LineTo.setAttribute("y1",oTop + h/2)
        
        // LineTo.setAttribute("x2",x2)
        // LineTo.setAttribute("y2",y2)
        var arrayToNodes = dragobj.getAttribute("To");
        arrayToNodes = arrayToNodes.split(",")
        var arrayToNodesObjs = [];        
        for(let i = 0; i < arrayToNodes.length; i++){
            console.log(arrayToNodes[i])
            console.log(typeof arrayToNodes[i] === 'string' || arrayToNodes[i] instanceof String)
            var newEL = document.getElementById(arrayToNodes[i]);
            arrayToNodesObjs.push(newEL)
        }
        console.log(arrayToNodesObjs)
        for(let i = 0; i < arrayToNodesObjs.length; i++){
        //get myNode number
        var myNodeNumber =  getNumbersFromString( dragobj.getAttribute("id"));
        var ToNodeNumber = getNumbersFromString( arrayToNodesObjs[i].getAttribute("id"));
        //get Lines that match this number m,n

        //todo
        //get arr[i] x and y


        //todo

        // var LineTo = document.getElementById("1,2");
        // var LineFrom = document.getElementById("2,1");

        }
        
        

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

