var tab = [];
var jeu = [];

for (let i = 0; i < 9; i++) {
    tab[i] = document.getElementById(i);
    tab[i].addEventListener('click', tourJoueur);
}

// TP MORPION
// 1) Ecrire une fonction nouveau() qui retourne un jeu vide, c'est à dire une liste de 8 cases contenant '.' dans chaque case.
const nouveau = () => {
    let arr = Array(9)
    for (let i = 0; i < arr.length; i++) {
        arr[i] = '<img src="img/ballon.png" width="50" height="50">';
        tab[i].innerHTML = arr[i];
        tab[i].classList.remove('taken');
    }
    jeu = arr;
    document.getElementById('winner').innerHTML = '';
    return arr;
}

// 2) Ecrire une fonction affiche(jeu) capable d'afficher un jeu passé en paramètre.
const affiche = (jeu) => {
    let ligne = '';
    for (let i = 0; i < 9; i++) {
        tab[i].innerHTML = jeu[i];
        ligne += jeu[i];
        ligne += ' ';
        if ((i + 1) % 3 === 0 && i !== 0) {
            console.log(ligne);
            ligne = '';
        }
    }
}
// 3) Ecrire une fonction joueur(jeu) qui permet de savoir qui doit jouer à partir d'un jeu passé en paramètre
const joueur = (jeu) => {
    let x = 0;
    let o = 0;
    for (let i = 0; i < jeu.length; i++) {
        jeu[i] === '<img src="img/ronaldo.png" width="50" height="50">' ? x++ : null;
        jeu[i] === '<img src="img/messi.png" width="50" height="50">' ? o++ : null;
    }
    return x >= o === true ? '<img src="img/messi.png" width="50" height="50">' : '<img src="img/ronaldo.png" width="50" height="50">';
}
// 4) Ecrire une fonction coupPossibles(jeu) qui retourne les coups possibles à partir d'un jeu passé en paramètre.
const coupPossibles = (jeu) => {
    let coup = [];
    let idx = jeu.indexOf('<img src="img/ballon.png" width="50" height="50">');
    while (idx != -1) {
        coup.push(idx);
        idx = jeu.indexOf('<img src="img/ballon.png" width="50" height="50">', idx + 1);
    }
    return coup;
}
// 5)fonction gagner(jeu) qui permet de savoir qui a gagné ou perdu. Cette fonction retourne :
// - 1 si le joueur 'X' a gagné.
// - (-1) si le joueur 'O' a gagné.
// 0 si aucun joueur 2 a gagné ( qu'il reste des coups possibles ou non)
const gagner = (jeu) => {
    let winner = 0;
    //check ligne
    /*
    for (let col = 0; col <= 6; col += 3) {
        if (jeu[col] === jeu[col + 1] && jeu[col + 1] === jeu[col + 2]) {
            winner = jeu[col] != '<img src="img/ballon.png" width="50" height="50">' ? jeu[col] == '<img src="img/ronaldo.png" width="50" height="50">' ? 1 : -1 : 0;
        }
    }*/
    //check colonne
    /*for (let row = 0; row < jeu.length / 3; row++) {
        if (jeu[row] === jeu[row + 3] && jeu[row + 3] === jeu[row + 6]) {
            winner = jeu[row] != '<img src="img/ballon.png" width="50" height="50">' ? jeu[row] == '<img src="img/ronaldo.png" width="50" height="50">' ? 1 : -1 : 0;
        }
    }*/
    if (((jeu[0] === jeu[4] && jeu[4] === jeu[8]) || (jeu[2] === jeu[4] && jeu[4] === jeu[6])) && jeu[4] != '<img src="img/ballon.png" width="50" height="50">') {
        winner = jeu[4] != '<img src="img/ballon.png" width="50" height="50">' ? jeu[4] == '<img src="img/ronaldo.png" width="50" height="50">' ? 1 : -1 : 0;
    }
    if ((jeu[0] === jeu[1] && jeu[1] === jeu[2]) && jeu[1] != '<img src="img/ballon.png" width="50" height="50">') {
        winner = jeu[1] != '<img src="img/ballon.png" width="50" height="50">' ? jeu[1] == '<img src="img/ronaldo.png" width="50" height="50">' ? 1 : -1 : 0;
    }
    if ((jeu[0] === jeu[3] && jeu[3] === jeu[6]) && jeu[3] != '<img src="img/ballon.png" width="50" height="50">') {
        winner = jeu[3] != '<img src="img/ballon.png" width="50" height="50">' ? jeu[3] == '<img src="img/ronaldo.png" width="50" height="50">' ? 1 : -1 : 0;
    }
    if ((jeu[1] === jeu[4] && jeu[4] === jeu[7]) && jeu[4] != '<img src="img/ballon.png" width="50" height="50">') {
        winner = jeu[4] != '<img src="img/ballon.png" width="50" height="50">' ? jeu[4] == '<img src="img/ronaldo.png" width="50" height="50">' ? 1 : -1 : 0;
    }
    if ((jeu[3] === jeu[4] && jeu[4] === jeu[5]) && jeu[4] != '<img src="img/ballon.png" width="50" height="50">') {
        winner = jeu[4] != '<img src="img/ballon.png" width="50" height="50">' ? jeu[4] == '<img src="img/ronaldo.png" width="50" height="50">' ? 1 : -1 : 0;
    }


    return winner;
}
// 6) Ecrire une fonction jouer(jeu, coup) qui permet de jouer un coup et qui retourne le nouveau jeu. Cette fonction prend en paramètre un jeu et un numéro de la case.
// Elle appelle la fonction joueur pour savoir quel est le joueur qui a joué et elle ajoute le bon caractère au bon endroit dans le jeux.


/**
 * Jouer la case saisie par l'utilisateur
 * @param {String} valeur
 */

function tourJoueur() {
    let coup = this.id;
    let cp = coupPossibles(jeu);
    let test = false;
    
    for (var i = 0; i < cp.length; i++) {
        if (cp[i] == coup) {
            test = true;
        }
    }
    if (test) {
        let signe = joueur(jeu);
        jeu[coup] = signe;
        tab[this.id].classList.add("taken");
        affiche(jeu);
    }
    
    if (gagner(jeu)) {
        if(gagner(jeu) == 1 ) 
        {
            url="ronaldo.html";
            document.location.href = url;
            return true; 
        } 
        else if(gagner(jeu) == -1)
        {
            url="messi.html";
            document.location.href = url;
            return true; 
        }
    }
    if(cp.length == 1){
        url="matchnul.html";
        document.location.href = url;
        return true; 
}
    console.log('------');
    return jeu;
}

window.addEventListener('load', nouveau);

//Fonction qui permet de lancer le jeu via la page d'accueil
function openLink(url){
url="jeu.html";
document.location.href = url;
return true;
}