
mode = 1;
size = 10;
nmbbomb = 10;
board = [];
help = [];
guess = [];

function testforcoord(a, b)  {
    return a >= 0 && a < size && b >= 0 && b < size;
}
function rand(a, b) {
    return Math.floor((Math.random() * (b - a + 1)) + a);
}

function cool(i) {
    mode = i;
}



function fun() {
    failure = false;
    var blab = "";

    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j ++) {
            board[i * size + j] = false;
            help[i * size + j] = 0;
            guess[i * size + j] = false;
        }
    }

    var count = 0;
    while (count != nmbbomb) {
         var i = rand(0, size - 1);
         var j = rand(0, size - 1);
         if (board[i * size + j] == false) {
            board[i * size + j] = true;
            count ++;

             if (testforcoord(i + 1, j)) {
                help[(i + 1) * size +  j] ++;
             }
             if (testforcoord(i + 1, j + 1)) {
                help[(i + 1) * size + (j + 1)] ++;
             }
             if (testforcoord(i + 1, j - 1)) {
                help[(i + 1) * size + (j - 1)] ++;
             }
             if (testforcoord(i, j + 1)) {
                help[i * size +  (j + 1)] ++;
             }
             if (testforcoord(i, j - 1)) {
                help[i * size + (j - 1)] ++;
             }
             if (testforcoord(i - 1, j)) {
                help[(i - 1) * size +  j] ++;
             }
             if (testforcoord(i - 1, j + 1)) {
                help[(i - 1) * size + ( j + 1)] ++;
             }
             if (testforcoord(i - 1, j - 1)) {
                help[(i - 1) * size +  (j - 1)] ++;
             }
         }

    }


    blab += "<table>";

    for (i = 0; i < size; i++) {
        blab += "<tr>";
        for (j = 0; j < size; j ++) {
            blab += "<td>";
            blab += "<button type='button' onclick='act("+ i +","+ j +")'>";
            blab += "<strong>";
            blab += "$";
            blab += "</strong>";
            blab += "</button>";
            blab += "</td>";

        }
        blab += "</tr>";
    }
    blab += "</table>";
    document.getElementById('content').innerHTML = blab;
    return blab;
}

function upd(i , j) {
    if ( !guess[i * size + j]) {
        guess[i * size + j] = true;

        if ( help[i * size + j] == 0) {
            if (testforcoord(i + 1, j)) upd(i + 1, j);
            if (testforcoord(i - 1, j)) upd(i - 1, j);
            if (testforcoord(i + 1, j + 1)) upd(i + 1, j + 1);
            if (testforcoord(i + 1, j - 1)) upd(i + 1, j - 1);
            if (testforcoord(i - 1, j + 1)) upd(i - 1, j + 1);
            if (testforcoord(i - 1, j - 1)) upd(i - 1, j - 1);
            if (testforcoord(i, j + 1)) upd(i, j + 1);
            if (testforcoord(i, j - 1)) upd(i, j - 1);
        }
    }
}

function act(a,b) {
    if (mode == 1) {
    upd(a,b);
    } else {
        if (guess[a * size + b] == false) {
            guess[a * size + b] = -1;
        } else {
            if (guess[a * size + b] == -1) guess[a * size + b] = false;
        }
    }
    disp();
    
}

function disp() {
    count = 0;
    count2 = nmbbomb;
    blab = "<table>";

    for (i = 0; i < size; i++) {
        blab += "<tr>";
        for (j = 0; j < size; j ++) {
            if (guess[i * size + j] !== true) count ++;
            if (guess[i * size + j] == -1) count2 --;
            blab += "<td>";
            blab += "<button type='button' onclick='act("+ i +","+ j +")'>";
            blab += "<strong>";
            blab += (guess[i *size + j] == - 1) ? "!" : guess[i * size + j] ? board[i * size + j] ? fail() : help[i * size + j] : "$";
            blab += "</strong>";
            blab += "</button>";
            blab += "</td>";

        }
        blab += "</tr>";
    }
    blab += "</table>";
    blab += count2 + " Bombes restantes. <br/>"
    if (count == nmbbomb && ! failure) blab += "Vous avez Gagn&eacute";
    if (failure)  blab += "Vous avez Perdu !";
    document.getElementById('content').innerHTML = blab;
}

function fail() {
    failure = true;
    return "B";
}

function customStart() {
    var fo = "";
    fo +=  '<button type="button" onclick="init(3, 2)"> Start 1/4 </button>';
    fo +=  '<br/>';
    fo +=  '<button type="button" onclick="init(10, 10)"> Start Eez </button>';
    fo +=  '<br/>';
    fo +=  '<button type="button" onclick="init(30, 15)"> Start Medium </button>';
    fo +=  '<br/>';
    fo +=  '<button type="button" onclick="init(70, 25)"> Start PGM </button>';
    fo +=  '<br/>';
    fo +=  '<button type="button" onclick="init(399, 20)"> Start Suicide </button>';
    
    document.getElementById('form').innerHTML = fo;
    
}

function init(bomb, siz) {
    size = siz;
    nmbbomb = bomb;
    document.getElementById('form').innerHTML = "";
    fun();
}


