$(document).ready(function () {
    $.get("/openorders", function (orders) {

        for (item in orders) {
            var datetime = new Date(orders[item].time);
            var orderdate = datetime.getDate() + "-" + (datetime.getMonth() + 1);
            var ordertime = datetime.getHours() + ":" + datetime.getMinutes();
            var orderamount = parseInt(orders[item].quantity) * parseInt(orders[item].rate);

            //if (orders[item].status == "open") {
            openorders = ("<div class='collection-item row'><div class='col s2'>" + orderdate + "<br><span class='grey-text'>" + ordertime + "</span></div><div class='col s4'>" + orders[item].item + "<br><span class='grey-text'>" + orders[item].category + "</span></div><div class='col s2'>" + orders[item].quantity + "</div><div class='col s2'>" + orders[item].rate + "</div><div class='col s2 strong'>" + orderamount + "</div></div>");
            //.concat(openorders);
            $("#orders-list").prepend(openorders);
            //}

        }
        // console.log(orders);
    });
});
