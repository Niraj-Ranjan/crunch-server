$(document).ready(function () {
    $.get("/openorders", function (orders) {

        for (item in orders) {
            var datetime = new Date(orders[item].time);
            var orderdate = datetime.getDate() + "-" + (datetime.getMonth() + 1);
            var ordertime = datetime.getHours() + ":" + datetime.getMinutes();
            var orderamount = parseInt(orders[item].quantity) * parseInt(orders[item].rate);

            //if (orders[item].status == "open") {
            openorders = ("<tr><td>" + orderdate + "<br><span class='grey-text'>" + ordertime + "</span></td><td>" + orders[item].item + "<br><span class='grey-text'>" + orders[item].category + "</span></td><td>" + orders[item].quantity + "</td><td>" + orders[item].rate + "</td><td class='strong'>" + orderamount + "</td><td><a class='btn-floating waves-effect waves-light red 'onclick='ordercancel("+orders[item].time+")'><i class='material-icons' >close</i></a><a class='btn-floating waves-effect waves-light blue' onclick='orderdelivered("+orders[item].time+")'><i class='material-icons'>done_all</i></a><a class='btn-floating waves-effect waves-light green' onclick='orderready("+orders[item].time+")'><i class='material-icons'>check</i></a></td></tr>");
            //.concat(openorders);
            $("#orders-list").prepend(openorders);
            //}

        }
        // console.log(orders);
    });
});


function orderready (ordertime) {

}
