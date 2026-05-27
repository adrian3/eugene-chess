var jQT = new $.jQTouch({

});

// // iScroll integration
// $(function() {
//     jQT.setPageHeight();
// });


function initChess() {

    chess.useAI(document.chessCtrl1.useAI.checked);
    chess.setPromotion(document.chessCtrl1.selPromo.selectedIndex);
    chess.setFrameRate(Math.abs(Number(1000)) || 1000);
    var flipboard = localStorage.getItem('boardside');
    chess.setSide(flipboard);
    chess.useKeyboard(true);
    chess.placeById("chessDesk");
    var mydifficultylevel = localStorage.getItem('difficultylevel');
    if (mydifficultylevel == undefined||mydifficultylevel == null) {
        localStorage.setItem('difficultylevel', 2);
        var mydifficultylevel = 2;
    }
    // document.chessCtrl1.plyDepthCtrl.value = mydifficultylevel;
    chess.setPlyDepth(mydifficultylevel);
    chess.setView(1);
    // pressVwBtn(1);

}

function startNewGame() {
if (navigator.notification) {
  navigator.notification.confirm(
    'Would you like to start over?', // message
     newGameConfirm,           // callback to invoke with index of button pressed
    'New Game',         // title
    ['New Game','Cancel']           // buttonLabels
  );
}
  else {
    // for testing in browser
    var messageResponse = confirm("Start a new game?");
    if (messageResponse == true) {
        // You pressed OK
        chess.setSide(amIWhiteNum());
        chess.organize(amIWhiteNum());
    } else {
        // You pressed Cancel
    }
  }
}

function newGameConfirm(buttonIndex) {
    // if new game
  if(buttonIndex===1) { 
    chess.setSide(amIWhiteNum());
    chess.organize(amIWhiteNum());
  }
  // if cancel
  if(buttonIndex===2) {
    // do nothing
  }
}

function amIWhiteNum() {
    var myColorNum = localStorage.getItem('boardside');
        if (myColorNum == "1") {
        return(1);
    }
    else {
        return(0);
    }
}

function amIWhite() {
    var myColor = localStorage.getItem('boardside');
    if (myColor == "1") {
        return(true)
    }
    else {
        return(false)
    }
}

var app = {

};






function getPromoNumber() {
    promoNumber = localStorage.getItem("PromotedPiecesBecome");
    if (promoNumber == 0) {
        return ("queen");
    }
    if (promoNumber == 1) {
        return ("rook");
    }
    if (promoNumber == 2) {
        return ("bishop");
    }
    if (promoNumber == 3) {
        return ("knight");
    }
}


function onConfirm(button) {
    if (button == 1) {
        localStorage.setItem("PromotedPiecesBecome", 0);
        chess.setPromotion("0");
        $('.promopiece').replaceWith('<span class=\"promopiece\">Queens</span>');
        $('#selectQueen').removeClass().addClass('currentlevel');
        $('#selectRook').removeClass('currentlevel');
        $('#selectBishop').removeClass('currentlevel');
        $('#selectKnight').removeClass('currentlevel');
        return ("0");
    }
    if (button == 2) {
        localStorage.setItem("PromotedPiecesBecome", 1);
        chess.setPromotion("1");
        $('.promopiece').replaceWith('<span class=\"promopiece\">Rooks</span>');
        $('#selectQueen').removeClass('currentlevel');
        $('#selectRook').removeClass().addClass('currentlevel');
        $('#selectBishop').removeClass('currentlevel');
        $('#selectKnight').removeClass('currentlevel');
        return ("1");
    }
    if (button == 3) {
        localStorage.setItem("PromotedPiecesBecome", 2);
        chess.setPromotion("2");
        $('.promopiece').replaceWith('<span class=\"promopiece\">Bishops</span>');
        $('#selectQueen').removeClass('currentlevel');
        $('#selectRook').removeClass('currentlevel');
        $('#selectBishop').removeClass().addClass('currentlevel');
        $('#selectKnight').removeClass('currentlevel');
        return ("2");
    }
    if (button == 4) {
        localStorage.setItem("PromotedPiecesBecome", 3);
        chess.setPromotion("3");
        $('#promopiece').replaceWith('<span class=\"promopiece\">Knights</span>');
        $('#selectQueen').removeClass('currentlevel');
        $('#selectRook').removeClass('currentlevel');
        $('#selectBishop').removeClass('currentlevel');
        $('#selectKnight').removeClass().addClass('currentlevel');
        return ("3");
    } else {

    }
}

function showControls(visibility) {
    if (visibility == "hidden" || visibility == "undefined") {
        drawerIn();
        $("#options").slideUp('slow', function() {
            $("#drawerbackground").slideDown(), $("#controls").slideDown();
        });
        controlsvisibility = "showing";
        optionsvisibility = "hidden";
        $("#chessCtrlPanel").animate({
            opacity: "show"
        })
    }
    if (visibility == "showing") {
        drawerIn();
        controlsvisibility = "hidden";
    }
}

function showOptions(visibility) {
    if (visibility == "hidden" || visibility == "undefined") {
        drawerIn();
        $("#controls").slideUp('slow', function() {
            $("#drawerbackground").slideDown(), $("#options").slideDown();
        });
        optionsvisibility = "showing";
        controlsvisibility = "hidden";
        $("#chessCtrlPanel").animate({
            opacity: "show"
        })
    }
    if (visibility == "showing") {
        drawerIn();
        optionsvisibility = "hidden";
    }
}

function drawerIn() {
    $("#drawerbackground").slideUp('slow');
    $("#options").slideUp('slow');
    $("#controls").slideUp('slow');
    $("#chessCtrlPanel").animate({
        opacity: "hide"
    })
}

function pressVwBtn(nBtnId) {
    if (nVwPressed) {
        document.getElementById("viewBtn" + nVwPressed).className = "";
    }
    document.getElementById("viewBtn" + nBtnId).className = "pressedBtn";
    nVwPressed = nBtnId;
}


function getMoves() {
    var theMoves = "";
    $("#chessMoves option").each(function() {
        theMoves = theMoves + $(this).val();
    });
    alert(theMoves);
}

function getLastMove() {
    var currentmove = $("#chessMoves").val();
    alert(currentmove);
}

function help() {
    // launch a notification window with these options: Hint?
    // Switch human player to Eugene, move forward one, switch back to human? 
    chess.help();
}
function undo() {
    chess.navigate(-2);
}
function newGame() {
    $.jnotify("Save your last game first? <br /><a class=\"savelink jnotify-close\" href=\"#\" onclick=\"chess.organize();\">Yes please.</a> <a class=\"nothanks jnotify-close\" href=\"#\" onclick=\"chess.organize();\">No thanks.</a> <a class=\"jnotify-close\" href=\"#\">Cancel.</a>", true);
}

function drawerToggle() {
    $('.playbuttons').slideToggle('fast');
    $('.forwardback').slideToggle('fast');
}

function showConfirm() {
if (navigator.notification) {
    navigator.notification.confirm(
        '', // message
        onConfirm, // callback to invoke with index of button pressed
        'Pawn promoted to a ' + getPromoNumber() + '. Change default or proceed.', // title
        'Queen,Rook,Bishop,Knight,Proceed' // buttonLabels
    );
}
  else {
    alert(getPromoNumber());
    }
}

var colorSelected;
function selectYourColorAlert(colorChoice) {
    colorSelected=colorChoice;
    if(colorChoice=="black") {colorChoice=false;}
    if(colorChoice=="white") {colorChoice=true;  }
    if(colorChoice===amIWhite()) {

if (navigator.notification) {
  navigator.notification.confirm(
    'Changing your color requires starting a new game.', // message
     colorConfirm,           // callback to invoke with index of button pressed
    'New Game?',         // title
    ['New Game','Cancel']           // buttonLabels
  );
}
  else {
    // for testing in browser
    var messageResponse = confirm("Changing your color requires starting a new game.");
    if (messageResponse == true) {
        // You pressed OK
            if (colorSelected=="white") {selectWhite();}
            if (colorSelected=="black") {selectBlack();}
    } else {
        // You pressed Cancel
    }
    }
  }
}

function colorConfirm(buttonIndex) {
    // if ok
  if(buttonIndex===1) { 
    if (colorSelected=="white") {selectWhite();}
    if (colorSelected=="black") {selectBlack();}
  }
  // if cancel
  if(buttonIndex===2) {
    // do nothing
  }
}

function selectWhite() {
    $('.blackside').removeClass("currentlevel");
    $('.whiteside').addClass("currentlevel");
    localStorage.setItem("boardside", "0");
    chess.setSide("0");
    chess.organize("0");
    setTimeout(startNewGameNoPrompt, 500);
}
function selectBlack() {
    $('.blackside').addClass("currentlevel");
    $('.whiteside').removeClass("currentlevel");
    localStorage.setItem("boardside", "1");
    chess.setSide("1");
    chess.organize("1");
    setTimeout(startNewGameNoPrompt, 500);
}

function startNewGameNoPrompt() {
    chess.setSide(amIWhiteNum());
    chess.organize(amIWhiteNum());
}

function helpAlert() {
if (navigator.notification) {
  navigator.notification.confirm(
    'Select an option:', // message
     helpConfirm,           // callback to invoke with index of button pressed
    'Help',         // title
    ['Take Back Last Move','Move Suggestion','Cancel']           // buttonLabels
  );
}
  else {
    // for testing in browser
    var messageResponse = confirm("Select an option:");
    if (messageResponse == true) {
        // You pressed OK
        undo();
    } else {
        // You pressed Cancel
        help();
    }
  }
}
function alertDismissed() {
    // do nothing
}
function helpConfirm(buttonIndex) {
  // if undo
  if(buttonIndex===1) { 
    undo();
  }
  // if suggest a move
  if(buttonIndex===2) {
    help();
  }
}

function showNav() {
    drawerToggle();
}
function emailPGN() {
    latestPGN = localStorage.getItem('CurrentGame');
    if (latestPGN!=null) {
    window.location='mailto:?subject=Recent chess game from Eugene&body='+latestPGN;
    }
}
function resetApp() {
    localStorage.clear();
    initChess();
    jQT.goTo('#home','slideright');
    location.hash="home";
    setTimeout(function() {
        location.reload();
    }, 100);
}
