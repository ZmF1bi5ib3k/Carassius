// ==UserScript==
// @name         Carassius
// @namespace    vk.com/id288202024
// @version      0.5b
// @description  Подсветка счастливых номеров сообщений на Абучане.
// @author       ZmF1bi5ib3k
// @grant        none
// @updateURL    https://raw.githubusercontent.com/ZmF1bi5ib3k/Carassius/master/Carassius.user.js
// ==/UserScript==

//Изменения в последний версии:
// - Добавлен GUI

var gui_position = "position:fixed;display:block;background-color:#dddddd;border:solid 1px #CCCCCC;top:100px;right:-1px;padding:10px;";
var carassius_version = "0.5b";

if ($.cookie('cookie_carass_color') == null) {
var carass_color = "#FF6600"; // Цвет подсветки сообщений в HEX формате. По умолчанию: #FF6600 - фирменный рыжий Абучана.
} else {
    var carass_color = $.cookie('cookie_carass_color');
}
if ($.cookie('cookie_carass_bold') == null) {
$.cookie('cookie_carass_bold', true)
}
if ($.cookie('cookie_carass_bold') == 'true') {
    var cr_bold = ['<b>','</b>'];
} else {
    var cr_bold = ['',''];
}

var carassius_img = "<img title='Карасик' style='position:relative;top:3px;' src='data:image/gif;base64,R0lGODlhGAAOANU/ANTNwouHe6WlpqyimWZIRJJ1eLq4tiMTGXNoX1xXV865tp+Ylbm2qaqam3p1aNzZ3NrRxlBCPYyIiMfAt+PS08WoqbStqezr66KajM3Nzt7i5eLi45eSiz4zOH94ddTS1OXl5piJhefh3tvX1XNtar7Cw/Ly8tXMu2phXejm5ZGUlM/Pz+Lbz+Xh4ci/w4yPknp9hN3Bws+9rtGroNDU2H+Djt/b1+TLvt7e4MrEqcjBwMHHztHFxMrIy7COkAAAACH5BAEAAD8ALAAAAAAYAA4AAAbbwJ9wSLxcUoMRccn8bUAmEWSCQTyavw+OuPnoBpyAYxxglK5EAkFCG35ICYQjgGHkBg7USzNsEA4HMCUGEihkCwwTJycTAREdO0IbDQUoEREJDhwLEpsTAAAsJxgoCRE1Wz0LDgkoHioCCwsDDBAAIhcQeDIBBwk9KB2+FgYCKjASFhMQNhA8KwIhMhYwGX8dAqk8HiQBAgYZGjIFHgUDACMpPyEGLUMbFAUVBgsCOis2NzMxKSBYPw8oKHDyoUcFHy5A9NvwT8gDf0JSiKjgrmHDGDEsWqRQsUkQADs='/>"; //непонятные символы - картинка в base64 кодировке

$(document).ready(function(){ //выполняеи скрипт при построении DOM структуры
    if ($("body").hasClass("makaba")) {
        exec_arass();
        //иконка GUI
        $('body').append('<div class="carassius_gui c_icon" style="' + gui_position + 'opacity:.3;"><a class="cr_open_gui">' + carassius_img + '</a></div>');
        //GUI настройки
        $('body').append('<div class="carassius_gui c_set" style="' + gui_position + 'display:none;opacity:0;"><b>Carassius ' + carassius_version + '</b><div style="float:right;"><a class="cr_info">info</a> | <a class="cr_close">[x]</a></div><br /><br />Выделение жирным: <input type="checkbox" id="cr_bold" checked /><br />Цвет в HEX:<br /><input type="text" class="color" id="cr_color" /><br /><br /><input type="button" value="Сохранить"  id="cr_save" /> <a href="" style="display:block;float:right;"  id="cr_reset">Сброс</a></div>');
        //GUI информацмя
        $('body').append('<div class="carassius_gui c_info" style="' + gui_position + 'display:none;opacity:0;"><b>Carassius </b><div style="float:right;"> <a class="cr_open_gui">Назад</a> | <a class="cr_close">[x]</a></div><br /><br />Версия: ' + carassius_version + '<br /><br /><a href="https://github.com/ZmF1bi5ib3k/Carassius" target="_blank">GitHub проекта</a><br /><br /><span title="Сдохни, вконтактоблядь!">По вопросам поддержки<br />можно писть <a href="http://vk.com/id288202024" target="_blank">сюда</a>.</span><br /><br /><span class="spoiler" title="Я голодный студент, хуже меня нет.">Yandex.Money<br />410011768333339</span></div>');
        //анимация прозрачности иконки   
        $('.c_icon').hover(
            function() {
                $( this ).animate({
                    opacity: 1
                }, 175);
            }, function() {
                $( this ).animate({
                    opacity: 0.3
                }, 300);
            }
        );
        //установка значений input
        $('#cr_color').val(carass_color);
        if ($.cookie('cookie_carass_bold') == 'true') {
        $('#cr_bold').prop( "checked", true );
        } else {
            $('#cr_bold').prop( "checked", false );
        }
    
        //открыть GUI
        $('.cr_open_gui').click(function() {
            $( '.carassius_gui' ).animate({
                opacity: 0
            }, 250, function() {
                $( '.carassius_gui' ).css('display', 'none');
                $( '.c_set' ).css('display', 'block');
                $( '.c_set' ).animate({
                    opacity: 1
                }, 250)
            });
        });
    
        //открыть info
        $('.cr_info').click(function() {
            $( '.carassius_gui' ).animate({
                opacity: 0
            }, 250, function() {
                $( '.carassius_gui' ).css('display', 'none');
                $( '.c_info' ).css('display', 'block');
                $( '.c_info' ).animate({
                    opacity: 1
                }, 250)
            });
        });
    
    //закрыть GUI
    $('.cr_close').click(function() {
         $( '.carassius_gui' ).animate({
          opacity: 0
         }, 250, function() {
             $( '.carassius_gui' ).css('display', 'none');
             $( '.c_icon' ).css('display', 'block');
             $( '.c_icon' ).animate({
          opacity: .3
         }, 250)
         });
     });
    
    //кнопка "Сохранить"
    $('#cr_save').click(function() {
        if ($('#cr_bold').is(':checked')) {
            $.cookie('cookie_carass_bold', true)
        } else {
            $.cookie('cookie_carass_bold', false)
        }
        $.cookie('cookie_carass_color', $('#cr_color').val());
        
        if (confirm("Для применения настроек требуется перезагрузить страницу.")) {
            location.reload();
        }

    });
    
    //кнопка "сброс"
    $('#cr_reset').click(function() {
        if (confirm("Вы действительно хотите сбросить настройки Carassius?")) {
            $.cookie('cookie_carass_bold', null)
            $.cookie('cookie_carass_color', null)
            if (confirm("Для применения настроек требуется перезагрузить страницу.")) {
            location.reload();
        }
        }
    });
    
    }   
});

function exec_arass() {

$(".postbtn-reply-href").not(".cr_chk").each(function(carassius_count) { //обрабатываем поле с номером сообщения    
    //задаем основные переменные
    sopn = $(this).text();
    var n_le = sopn.length;
    var sl_pr = 0;
    var sl_af = 1 - n_le;
    var c_arr = [];
    var arr_n = 0;
    while (arr_n != n_le) { //цикл создания массива чисел
        if (sl_af != 0) {
            c_arr[arr_n] = sopn.slice(sl_pr, sl_af);
        } else {
            c_arr[arr_n] = sopn.slice(sl_pr);
        }
      sl_pr++;
      sl_af++;
      arr_n++;
    }
    //нужно больше переменных
    var i = n_le - 1;
    var wh_stop = 0;
        
    while ( wh_stop == 0 ) { //цикл аналициза на наличие одинаковых числел
    if (c_arr[i] == c_arr[i - 1]) {
        i--;
    } else {
        wh_stop = 1;
    }
            
    };
    $(this).addClass("cr_chk"); //отмечаем проверенное
    sopn = $(this).text();//пересоздаем переменную, которую терял Огнелис
    var n_le = sopn.length;//эту тоже
    //переменных много не бывает 
    var pre;
    var after;
    
    if (i != n_le - 1) {//разбираем номер
        pre = sopn.slice(0, -n_le + i);
        after = sopn.slice(i);
        
        var dd_img = ""; 
        if (after == 77) { //ищем карасика
            dd_img = carassius_img;
        }
        $(this).html(cr_bold[0] + pre + "<span style='color:" + carass_color + ";'>" + after + "</span>" + cr_bold[1] + dd_img);//собираем номер
        $(this).prev().html(cr_bold[0] + $(this).prev().text() + cr_bold[1]);
    }      
 });
};

if ($("body").hasClass("makaba")) {
$(".posts").bind("DOMSubtreeModified",function(){ //повтор скрипта при догрузке контента
    exec_arass();
});
}
