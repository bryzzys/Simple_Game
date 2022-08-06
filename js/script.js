const ctrl = document.getElementById("controle");
const botao1 = document.getElementById("btn1");
const botao2 = document.getElementById("btn2");
const msg = document.getElementById("mensagem");
const Pstatus= document.getElementById("status");
var enemy = undefined;


var Player = {
    hp:10,
    force:2,
    speed:7,
    armor:0,
}

/*--Classes--*/
class Item{
    constructor(type, hp, force, speed){
        this.type=type;
        this.hp=hp;
        this.force=force;
        this.speed=speed;
    }
}

class Enemy extends Item{
    constructor(type, hp, force, speed, loot){
    super(type, hp, force, speed);
    this.loot=loot;
    }   
    Atacar(){
        if(Player.hp > 0){
            Player.hp -= this.force;
            console.log("atacou")
            Status();
        }
        else{
            msg.innerHTML = "<h1>Voce morreu</h1>"
        }
    }
}
/*-Enemys and Itens--*/
function Orc(){
    var orc= new Enemy("orc", 12, 20, 6, 0);
    enemy = orc
}

function Zumbi(){
    var zumbi = new Enemy("zumbi", 8, 2, 2 ,"espada") 
    enemy = zumbi
}

function Espada(){
    var espada = new Item("espada", 0, 4, 0)
    item  = espada
}
/*--Start Game--*/
function game1(){
    Status();
    botao1.innerHTML = "<button onclick='avancar()'>Avançar</button>";
    botao2.innerHTML = "<button onclick='esperar()'>Esperar</button>";
    msg.innerHTML = "<h1>Você encontra uma porta. Prefere avançar ou esperar?</h1>"
}
function Status(){
    Pstatus.innerHTML = "<p>HP:"+Player.hp+"</p><p>Força:"+Player.force+"</p>"+"<p>speed:"+Player.speed+"</p><p>Item:"+item.type+"</p>";
}
    
/*-Functions in game fight-*/
function atacar(){
    if( enemy.hp >0){
    enemy.hp -= Player.force;
    msg.innerHTML = "<h1>Você dá "+Player.force+" de dano no " +enemy.type+"</h1>";
    enemy.Atacar();
    console.log(enemy.hp);
    }
    else{
    var d20 = D20();
    if(d20 <= 17){
        msg.innerHTML = "<h1>Parabéns você matou o " +enemy.type+"</h1>"
        botao1.innerHTML = "<button onclick='avancar()'>Avançar</button>";
        botao2.innerHTML = "<button onclick='esperar()'>Esperar</button>";
        }
    else {
        Espada();
        msg.innerHTML = "<h1>Parabéns você matou o " +enemy.type+" e encontrou uma "+enemy.loot+" você a pega?</h1>";
        botao1.innerHTML = "<button onclick='pegar()'>pegar</button>";
        botao2.innerHTML = "<button onclick='deixar()'>deixar</button>";
    }
    }
}

function fugir(){
    var PSpeed = Math.floor(Math.random()*Player.speed+1);
    var ESpeed = Math.floor(Math.random()*enemy.speed+1);
    if(PSpeed > ESpeed){
        msg.innerHTML ="<h1>Parabens voce fugiu</h1>"
        botao1.innerHTML = "<button onclick='avancar()'>Avançar</button>";
        botao2.innerHTML = "<button onclick='esperar()'>Esperar</button>";
    }
    else{
        msg.innerHTML="<h1>Voce nao conseguiu fugir</h1>"
        enemy.Atacar();
    }
}

function pegar(){
    Status();
    if(item.type=="espada"){
        Player.force = item.force; 
    }
    avancar()
}

function avancar(){
    var sorte = D20()
    if (sorte < 20){
        Zumbi()
        msg.innerHTML = "<h1>Você encontra um zumbi. Você o ataca ou tenta fugir?</h1>";
        botao1.innerHTML = "<button onclick='atacar()'>atacar</button>";
        botao2.innerHTML = "<button onclick='fugir()'>fugir</button>";
    }
    else{
        Espada();
        msg.innerHTML = "<h1>Você encontra uma espada. Você pega?</h1>";
        botao1.innerHTML = "<button onclick='pegar()'>pegar</button>";
        botao2.innerHTML = "<button onclick='deixar()'>deixar</button>";
    }
}

function esperar(){
        sorte = D20()
        if(sorte <11){
        Orc()
        msg.innerHTML = "<h1>Você espera até que chega um Orc. Você o ataca ?</h1>";
        botao1.innerHTML = "<button onclick='atacar()'>atacar</button>";
        botao2.innerHTML = "<button onclick='fugir()'>fugir</button>";
        }
    else{
        Espada();
        msg.innerHTML = "<h1>Você encontra uma espada. Você pega?</h1>";
        botao1.innerHTML = "<button onclick='pegar()'>pegar</button>";
        botao2.innerHTML = "<button onclick='deixar()'>deixar</button>";
    }
}
/*------*/


function D20(){
    var d20 = Math.floor(Math.random()*20+1);
    return d20;
}

var item = new Item("nenhum");