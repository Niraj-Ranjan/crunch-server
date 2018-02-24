// ================ CONFIGURATION ================



//const hostaddress = "http://clavi.herokuapp.com";
//const hostaddress = "http://192.168.225.68:3000";
//const hostaddress = "http://localhost:3000";
//const hostaddress = "";




// ===============================================









// ================   document.ready ================
$(document).ready(function () {
    // initialize jquery
    $('.button-collapse').sideNav();

    /*
    $('ul.tabs').tabs({
    	swipeable: true
    });
    */
    $('ul.tabs').tabs();
    //$('.parallax').parallax();
    /*
    	$('.carousel.carousel-slider').carousel({
    		fullWidth: true
    	});
    	$('.carousel').carousel();
    */

    $("select").material_select();

    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();


   // document.getElementById("user-greeter").innerHTML = Cookies.get("username-name");

    hideWait();

});

// ===================================================




// ================ Local Functions ================


function addWaitingOverlay() {
    var innerdata = '<div id="waiting-overlay" class="screen-unit valign-wrapper"><div class="container center"><div class="preloader-wrapper big active"><div class="spinner-layer spinner-blue"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div><div class="spinner-layer spinner-red"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div><div class="spinner-layer spinner-yellow"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div><div class="spinner-layer spinner-green"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div></div></div>';

    var waitContainer = document.createElement("div");
    waitContainer.innerHTML = innerdata;

    document.getElementsByTagName("body")[0].appendChild(waitContainer);
}

function showWait() {
    $("#waiting-overlay").removeClass("hide");
}

function hideWait() {
    $("#waiting-overlay").addClass("hide");
}

addWaitingOverlay();


// ===================================================









// ================ Global Functions ================

$(".logout-btn").click(function () {
    Cookies.remove('username');
    Cookies.remove('username-name');
    //console.log(document.getElementById("global-script").getAttribute("src"));
    window.location = $("#global-script").attr("src").replace("js/script.js", "pages/login.html");

});


function updateEarning () {
    $.get("/earnings", function(resp){
       document.getElementById("earnings").innerHTML = resp;
    });
}






// ==================================================
