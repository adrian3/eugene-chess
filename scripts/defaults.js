$(document).ready(function() {
$('.tabHide').hide();

var promotionMemory = localStorage.getItem('PromotedPiecesBecome');
if (promotionMemory == 0) {
    $('.promopiece').replaceWith('<span class=\"promopiece\">Queens</span>');
}
if (promotionMemory == 1) {
    $('.promopiece').replaceWith('<span class=\"promopiece\">Rooks</span>');
}
if (promotionMemory == 2) {
    $('.promopiece').replaceWith('<span class=\"promopiece\">Bishops</span>');
}
if (promotionMemory == 3) {
    $('.promopiece').replaceWith('<span class=\"promopiece\">Knights</span>');
}

var colorside = localStorage.getItem('boardside');
if (colorside == undefined) {
    $('.whiteside').addClass('currentlevel');
}
if (colorside == "0") {
    $('.whiteside').addClass('currentlevel');
}
if (colorside == "1") {
    $('.blackside').addClass('currentlevel');
}

var promopiecesare = localStorage.getItem('PromotedPiecesBecome');
if (promopiecesare == undefined) {
    $('#selectQueen').addClass('currentlevel');
}
if (promopiecesare == 0) {
    $('#selectQueen').addClass('currentlevel');
}
if (promopiecesare == 1) {
    $('#selectRook').addClass('currentlevel');
}
if (promopiecesare == 2) {
    $('#selectBishop').addClass('currentlevel');
}
if (promopiecesare == 3) {
    $('#selectKnight').addClass('currentlevel');
}

//this sets the default board styles and piece styles:
var board_style = localStorage.getItem('boardstyle');
if (board_style == undefined) {
    localStorage.setItem('boardstyle', 'board1');
    var board_style = "board1";
}

var piece_style = "alpha";

var PromotedPiecesBecome = localStorage.getItem('PromotedPiecesBecome');
if (PromotedPiecesBecome == undefined) {
    localStorage.setItem('PromotedPiecesBecome', '0');
    var PromotedPiecesBecome = "0";
}

var nVwPressed = false;


// this checks to see if a difficulty level has been set. If not it sets the difficulty to normal. Then it as the levels are changed, it highlights the current difficulty level by changing the styles.
var mydifficultylevel2 = localStorage.getItem('difficultylevel');
if (mydifficultylevel2 == undefined) {
    var mydifficultylevel2 = "1";
    $('.normalmode').addClass('currentlevel');
}
if (mydifficultylevel2 == 0) {
    $('.easymode').addClass('currentlevel');
}
if (mydifficultylevel2 == 1) {
    $('.normalmode').addClass('currentlevel');
}
if (mydifficultylevel2 == 2) {
    $('.hardmode').addClass('currentlevel');
}

// This controls the email and name that gets loaded into the PGN.
var myemail = localStorage.getItem('myemailaddress');
if (myemail == undefined) {
    localStorage.setItem('myemailaddress', "");
    myemail = "";
    $('textarea#myemail').val(myemail);
} else if (myemail != undefined) {
    $('textarea#myemail').val(myemail);
    localStorage.setItem('myemailaddress', myemail);
}
var myname = "Human";


$('.playtoggle').click(function() {
    $('.stoptoggle').show();
    $('.playtoggle').hide();
});
$('.stoptoggle').click(function() {
    $('.playtoggle').show();
    $('.stoptoggle').hide();
});
    $('.stoptoggle').show();
    $('.playtoggle').hide();
    $('.playbuttons').hide();
    $('.forwardback').hide();
    
    $("#boardstyle1").click(function() {
        $('#flatChessboard').removeClass().addClass('board1'), localStorage.setItem("boardstyle", "board1");
    });
    $("#boardstyle2").click(function() {
        $('#flatChessboard').removeClass().addClass('board2'), localStorage.setItem("boardstyle", "board2");
    });
    $("#boardstyle3").click(function() {
        $('#flatChessboard').removeClass().addClass('board3'), localStorage.setItem("boardstyle", "board3");
    });
    $("#boardstyle4").click(function() {
        $('#flatChessboard').removeClass().addClass('board4'), localStorage.setItem("boardstyle", "board4");
    });
    $("#boardstyle5").click(function() {
        $('#flatChessboard').removeClass().addClass('board5'), localStorage.setItem("boardstyle", "board5");
    });
    $("#boardstyle6").click(function() {
        $('#flatChessboard').removeClass().addClass('board6'), localStorage.setItem("boardstyle", "board6");
    });
    $("#boardstyle7").click(function() {
        $('#flatChessboard').removeClass().addClass('board7'), localStorage.setItem("boardstyle", "board7");
    });
    $("#boardstyle8").click(function() {
        $('#flatChessboard').removeClass().addClass('board8'), localStorage.setItem("boardstyle", "board8");
    });
    $("#boardstyle9").click(function() {
        $('#flatChessboard').removeClass().addClass('board9'), localStorage.setItem("boardstyle", "board9");
    });

    // This hides the moves panel when page loads. Then adds hide and reveal functionality to the hidemoves class. 
    $("#whiteside").hide();
    // $("#buttonnav").hide();
    $("#showmoves").click(function() {
        $("#chessCtrlPanel").animate({
            opacity: "toggle"
        })
    });

    $('#settingslink').click(function() {
        $("#chessCtrlPanel").animate({
            opacity: "hide"
        }), $("#buttonnav").animate({
            opacity: "hide"
        });
    });
    $('#gameslink').click(function() {
        $("#chessCtrlPanel").animate({
            opacity: "hide"
        }), $("#buttonnav").animate({
            opacity: "hide"
        });
    });

$('.easymode').click(function() {
    localStorage.setItem("difficultylevel", "0");
    chess.setPlyDepth(1);
    $('.easymode').addClass('currentlevel');
    $('.normalmode').removeClass('currentlevel');
    $('.hardmode').removeClass('currentlevel');
});
$('.normalmode').click(function() {
    localStorage.setItem("difficultylevel", "1");
    chess.setPlyDepth(2);
    $('.easymode').removeClass('currentlevel');
    $('.normalmode').addClass('currentlevel');
    $('.hardmode').removeClass('currentlevel');
});
$('.hardmode').click(function() {
    localStorage.setItem("difficultylevel", "2");
    chess.setPlyDepth(3);
    $('.easymode').removeClass('currentlevel');
    $('.normalmode').removeClass('currentlevel');
    $('.hardmode').addClass('currentlevel');
});

$('#selectQueen').click(function() {
    localStorage.setItem("PromotedPiecesBecome", "0");
    chess.setPromotion("0");
    // $.jnotify("Promoted pawns will become queens.");
    $('.promopiece').replaceWith('<span class=\"promopiece\">Queens</span>');
    $('#selectQueen').removeClass().addClass('currentlevel');
    $('#selectRook').removeClass('currentlevel');
    $('#selectBishop').removeClass('currentlevel');
    $('#selectKnight').removeClass('currentlevel');
});
$('#selectRook').click(function() {
    localStorage.setItem("PromotedPiecesBecome", "1");
    chess.setPromotion("1");
    // $.jnotify("Promoted pawns will become Rooks.");
    $('.promopiece').replaceWith('<span class=\"promopiece\">Rooks</span>');
    $('#selectQueen').removeClass('currentlevel');
    $('#selectRook').removeClass().addClass('currentlevel');
    $('#selectBishop').removeClass('currentlevel');
    $('#selectKnight').removeClass('currentlevel');
});
$('#selectBishop').click(function() {
    localStorage.setItem("PromotedPiecesBecome", "2");
    chess.setPromotion("2");
    // $.jnotify("Promoted pawns will become Bishops.");
    $('.promopiece').replaceWith('<span class=\"promopiece\">Bishops</span>');
    $('#selectQueen').removeClass('currentlevel');
    $('#selectRook').removeClass('currentlevel');
    $('#selectBishop').removeClass().addClass('currentlevel');
    $('#selectKnight').removeClass('currentlevel');
});
$('#selectKnight').click(function() {
    localStorage.setItem("PromotedPiecesBecome", "3");
    chess.setPromotion("3");
    // $.jnotify("Promoted pawns will become Knights.");
    $('.promopiece').replaceWith('<span class=\"promopiece\">Knights</span>');
    $('#selectQueen').removeClass('currentlevel');
    $('#selectRook').removeClass('currentlevel');
    $('#selectBishop').removeClass('currentlevel');
    $('#selectKnight').removeClass().addClass('currentlevel');
});


}); // end document ready function



// Click Controls:
// $('.nothanks.jnotify-close').live('click', function(event) {});

$('.newpanel').click(function() {
    drawerIn();
    controlsvisibility = "hidden";
    optionsvisibility = "hidden";
});

// this is a confirmation that is shown before the app is reset:
$('.masterdelete').click(function() {
    $.jnotify("Are you sure you want to delete all games and reset this app? <br /><a href=\"#\" onclick=\"localStorage.clear(),location.reload();\">Yes please.</a> <a class=\"jnotify-close\">No thanks.</a> <a class=\"jnotify-close\" href=\"#\">Cancel.</a>", true);
});



// This will ask for confirmation before a new game is started. On confirmation, the board is flipped to the correct side and a new game is started
$('#playaswhite').click(function() {
    $.jnotify("Changing piece color to white requires starting a new game. Would you like to save your last game first? <br /><a class=\"savelink jnotify-close\" href=\"#\" onclick=\"chess.organize(0),chess.setSide(0);\">Yes please.</a> <a class=\"jnotify-close\" href=\"#\" onclick=\"chess.organize(0),chess.setSide(0);\">No thanks.</a> <a class=\"jnotify-close\" href=\"#\">Cancel.</a>", true);
});
$('#playasblack').click(function() {
    $.jnotify("Changing piece color to black requires starting a new game. Would you like to save your last game first? <br /><a class=\"savelink jnotify-close\" href=\"#\" onclick=\"chess.organize(1),chess.setSide(1);\">Yes please.</a> <a class=\"jnotify-close\" href=\"#\" onclick=\"chess.organize(1),chess.setSide(1);\">No thanks.</a> <a class=\"jnotify-close\" href=\"#\">Cancel.</a>", true);
});

// I can't figure out whether or not the "human" side is worth showing
$('#myside').click(function() {
    localStorage.setItem("boardside", "2");
    chess.setSide("2");
});

