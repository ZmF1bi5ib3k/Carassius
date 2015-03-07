// ==UserScript==
// @name         Carassius
// @namespace    vk.com/id288202024
// @version      0.3b
// @description  Подсветка счастливых номеров сообщений на Абучане.
// @author       ZmF1bi5ib3k
// @grant        none
// @updateURL    https://raw.githubusercontent.com/ZmF1bi5ib3k/Carassius/master/Carassius.user.js
// ==/UserScript==

var carass_color = "#FF6600"; // Цвет подсветки сообщений в HEX формате. По умолчанию: #FF6600 - фирменный рыжий Абучана.
var carassius_img = "<img title='Карасик' style='position:relative;top:3px;' src='data:image/gif;base64,R0lGODlhGAAOANU/ANTNwouHe6WlpqyimWZIRJJ1eLq4tiMTGXNoX1xXV865tp+Ylbm2qaqam3p1aNzZ3NrRxlBCPYyIiMfAt+PS08WoqbStqezr66KajM3Nzt7i5eLi45eSiz4zOH94ddTS1OXl5piJhefh3tvX1XNtar7Cw/Ly8tXMu2phXejm5ZGUlM/Pz+Lbz+Xh4ci/w4yPknp9hN3Bws+9rtGroNDU2H+Djt/b1+TLvt7e4MrEqcjBwMHHztHFxMrIy7COkAAAACH5BAEAAD8ALAAAAAAYAA4AAAbbwJ9wSLxcUoMRccn8bUAmEWSCQTyavw+OuPnoBpyAYxxglK5EAkFCG35ICYQjgGHkBg7USzNsEA4HMCUGEihkCwwTJycTAREdO0IbDQUoEREJDhwLEpsTAAAsJxgoCRE1Wz0LDgkoHioCCwsDDBAAIhcQeDIBBwk9KB2+FgYCKjASFhMQNhA8KwIhMhYwGX8dAqk8HiQBAgYZGjIFHgUDACMpPyEGLUMbFAUVBgsCOis2NzMxKSBYPw8oKHDyoUcFHy5A9NvwT8gDf0JSiKjgrmHDGDEsWqRQsUkQADs='/>";

$(document).ready(function(){
exec_arass();
});


function exec_arass() {

$(".postbtn-reply-href").not(".cr_chk").each(function() {
    sopn = $(this).text()
    var n_le = sopn.length;
    var sl_pr = 0;
    var sl_af = 1 - n_le;
    var c_arr = [];
    var arr_n = 0;
    while (arr_n != n_le) {
        if (sl_af != 0) {
            c_arr[arr_n] = sopn.slice(sl_pr, sl_af);
        } else {
            c_arr[arr_n] = sopn.slice(sl_pr);
        }
      sl_pr++;
      sl_af++;
      arr_n++;
    }
        
    var i = n_le - 1;
    var wh_stop = 0;
        
    while ( wh_stop == 0 ) {
    if (c_arr[i] == c_arr[i - 1]) {
        i--;
    } else {
        wh_stop = 1;
    }
            
    };
    $(this).addClass("cr_chk");

    var pre;
    var after;

    if (i != n_le - 1) {
        pre = sopn.slice(0, -n_le + i);
        after = sopn.slice(i);
        
        var dd_img = ""; 
        if (after == 77) {
                dd_img = carassius_img;
        }
        $(this).html("<b>" + pre + "<span style='color:" + carass_color + ";'>" + after + "</span></b>" + dd_img);
    }
             
 });
};

$(".posts").bind("DOMSubtreeModified",function(){
    exec_arass();
});
