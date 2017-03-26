// ==UserScript==
// @name         Userinfo Search
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Displaying names differently
// @author       _Rikardo_
// @include     https://goliath.hypixel.net/userinfo
// @include     https://goliath.hypixel.net/userinfo?*
// @include     https://goliath.hypixel.net/userinfo#*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// ==/UserScript==
var names = [];
var maxInLine = 8; // Users shown
    socket.on("autocompleteResponse", function(data) {
        data = JSON.parse(data);
        names = data;
        html = "<br />Online players: ";

        for (var index = 0; index < (data.length > maxInLine ? maxInLine : data.length); index++) {
            html += "<a style='margin-right: 7px;' href='/userinfo?player=" + data[index] + "'>" + data[index] + "</a>";
        }

        if (data.length > maxInLine) {
            html += " and " + (data.length - maxInLine) + " more.";
            $('.showAll').remove();
            $("<div class='showAll' style='height: 30px;display:flex;flex-direction:colum;justify-content:center;align-items:center;margin: 10px 0 0 0;border: 1px solid white;border-radius:5px;width: 100px;'>Show all</div>").insertAfter("#autocompleteChoices");
            document.getElementsByClassName('showAll')[0].addEventListener('click', displayNames, false);
        } else if (data.length === 0) {
            html += "<span class='gray'>None.</span>";
            $('.showAll').remove();
        }

        $("#autocompleteChoices").html(html);
    });
function displayNames() {
    var htmlText = "<br />Online players: ";
    $('.showAll').remove();
    for (var index = 0; index < names.length; index++) {
        if (index === 0)
        {
            htmlText += "<a style='margin: 0 7px 0 7px;' href='/userinfo?player=" + names[index] + "'>" + names[index] + "</a>";
        }
        else
        {
            htmlText += "<a style='margin-right: 7px;' href='/userinfo?player=" + names[index] + "'>" + names[index] + "</a>";
        }
    }
    $("#autocompleteChoices").html(htmlText);
    $("#autocompleteChoices").css("display","flex");
    $("#autocompleteChoices").css("flex-direction","row");
    $("#autocompleteChoices").css("flex-wrap","wrap");
    $("#autocompleteChoices").css("align-items","flex-end");
}

var version = 0.01;
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (request.readyState == XMLHttpRequest.DONE) {
        var updatedScriptVersion = request.responseText;
        if(version < updatedScriptVersion)
        {
            console.log("Update script");
            window.location.href = "https://youtu.be/dQw4w9WgXcQ";
        }
    }
};
request.open('GET', 'https://raw.githubusercontent.com/Rikeardo/UserinfoSearch/master/SearchVersion.json', true);
request.send(null);
