class Card {
    constructor(path, index) {
        this.cardFace = path;
        this.cardBack = "img/rosa-shield.png";
        this.cardIndex = index;
    }
}

const card1 = new Card("img/arrowhead.png", 1);
const card2 = new Card("img/barbed-spear.png", 2);
const card3 = new Card("img/battered-axe.png", 3);
const card4 = new Card("img/battle-axe.png", 4);
const card5 = new Card("img/blunderbuss.png", 5);
const card6 = new Card("img/bolas.png", 6);
const card7 = new Card("img/bolter-gun.png", 7);
const card8 = new Card("img/bowman.png", 8);
const card9 = new Card("img/broken-bottle.png", 9);
const card10 = new Card("img/bullets.png", 10);
const card11 = new Card("img/cannon-ball.png", 11);
const card12 = new Card("img/cannon.png", 12);
const card13 = new Card("img/crossed-pistols.png", 13);
const card14 = new Card("img/crossed-sabres.png", 14);
const card15 = new Card("img/crossed-swords.png", 15);
const card16 = new Card("img/crystal-wand.png", 16);
const card17 = new Card("img/double-shot.png", 17);
const card18 = new Card("img/fairy-wand.png", 18);
const card19 = new Card("img/flaming-trident.png", 19);
const card20 = new Card("img/flash-grenade.png", 20);
const card21 = new Card("img/grenade.png", 21);
const card22 = new Card("img/gunshot.png", 22);
const card23 = new Card("img/halberd-shuriken.png", 23);
const card24 = new Card("img/harpoon-chain.png", 24);
const card25 = new Card("img/harpoon-trident.png", 25);
const card26 = new Card("img/heavy-arrow.png", 26);
const card27 = new Card("img/lightning-bow.png", 27);
const card28 = new Card("img/mace-head.png", 28);
const card29 = new Card("img/minigun.png", 29);
const card30 = new Card("img/missile-pod.png", 30);
const card31 = new Card("img/missile-swarm.png", 31);
const card32 = new Card("img/pincers.png", 32);
const card33 = new Card("img/ray-gun.png", 33);
const card34 = new Card("img/saber-slash.png", 34);
const card35 = new Card("img/sabers-choc.png", 35);
const card36 = new Card("img/sacrificial-dagger.png", 36);
const card37 = new Card("img/scythe.png", 37);
const card38 = new Card("img/sentry-gun.png", 38);
const card39 = new Card("img/shuriken.png", 39);
const card40 = new Card("img/sparkling-sabre.png", 40);
const card41 = new Card("img/spiked-mace.png", 41);
const card42 = new Card("img/spray.png", 42);
const card43 = new Card("img/stone-spear.png", 43);
const card44 = new Card("img/supersonic-bullet.png", 44);
const card45 = new Card("img/sword-in-stone.png", 45);
const card46 = new Card("img/sword-spade.png", 46);
const card47 = new Card("img/tesla-turret.png", 47);
const card48 = new Card("img/trefoil-shuriken.png", 48);
const card49 = new Card("img/trident.png", 49);
const card50 = new Card("img/wave-strike.png", 50);

const cardStack = [card1, card2, card3, card4, card5, card6, card7, card8, card9, card10,
     card11, card12, card13, card14, card15, card16, card17, card18, card19, card20,
     card21, card22, card23, card24, card25, card26, card27, card28, card29, card30,
     card31, card32, card33, card34, card35, card36, card37, card38, card39, card40,
     card41, card42, card43, card44, card45, card46, card47, card48, card49, card50];

const generate = diff => {
    let cards = 0;
    let deck = [];
    let shuffeldDeck = [];
    if (diff == "easy") {
        cards = 8;
    }
    else if (diff == "normal") {
        cards = 18;
    }
    else if (diff == "hard") {
        cards = 32;
    }
    else if (diff == "expert"){
        cards = 50;
    }
    for (let i = 0; i < cards; i++) {
        deck.push(cardStack[i], cardStack[i]);
    }
    for (let i = 0; i < cards * 2; i++) {
        let ind = Math.floor(Math.random() * deck.length);
        shuffeldDeck[i] = deck.splice(ind, 1)[0];
    }
    return shuffeldDeck;
};

export default generate;