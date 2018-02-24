









function orderready(ordertime, itemname) {
    $.post("/orderready", {
        itemdate: ordertime
    }, function (res) {
        if (res == "ok") {
            document.getElementById(itemname + Date.parse(ordertime)).classList.add("green");
        }
    });
}

function ordercancel(ordertime, itemname) {
    $.post("/ordercancel", {
        itemdate: ordertime
    }, function (res) {
        if (res == "ok") {
            var k = document.getElementById(itemname + Date.parse(ordertime));
            k.parentNode.removeChild(k);
        }
    });
}

function orderdone(ordertime, itemname) {
    $.post("/orderdone", {
        itemdate: ordertime
    }, function (res) {
        if (res == "ok") {
            var k = document.getElementById(itemname + Date.parse(ordertime));
            k.parentNode.removeChild(k);
        }
    });
    updateEarning();
}
