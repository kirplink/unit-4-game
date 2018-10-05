var characters = [
    {
        name: "tracer",
        health: 150,
        attack: 18,
        baseAttack: 18,
        counter: 20,
        headshot: "assets/images/tracer-portrait-cropped.png",
        bodyshot: "assets/images/tracer-portrait.png",
        voiceline: "assets/sounds/tracervoice.ogg"
    },
    {
        name: "mccree",
        health: 150,
        attack: 18,
        baseAttack: 18,
        counter: 20,
        headshot: "assets/images/mccree-portrait-cropped.png",
        bodyshot: "assets/images/mccree-portrait.png",
        voiceline: "assets/sounds/mccreevoice.mp3"
    },
    {
        name: "junkrat",
        health: 150,
        attack: 18,
        baseAttack: 18,
        counter: 20,
        headshot: "assets/images/junkrat-portrait-cropped.png",
        bodyshot: "assets/images/junkrat-portrait.png", 
        voiceline: "assets/sounds/junkratvoice.ogg" 
    },
    {
        name: "pharah",
        health: 150,
        attack: 18,
        baseAttack: 18,
        counter: 20,
        headshot: "assets/images/pharah-portrait-cropped.png",
        bodyshot: "assets/images/pharah-portrait.png",
        voiceline: "assets/sounds/pharahvoice.mp3"
    }
];

var attacker = {};
var defender = {};




//this uses the characters object to set up the character select screen
for (var i = 0; i < characters.length; i++) {
       
    //this converts the oject to a string allowing it to be the value of the button
    var currentValue = JSON.stringify(characters[i]);

    $('#player-container').append(`
        <div class="char-container-attacker hoverable" id=${currentValue}>
            <img src="${characters[i].headshot}" alt="${characters[i].name}" class="char-container-img" value="test">
            <button class="char-select-btn" id="${characters[i].name}-btn" value=${currentValue}>${characters[i].name}</button> 
            <audio class="audio" id="${characters[i].name}-audio" controls preload="none"> 
                <source src="${characters[i].voiceline}" type="audio/mpeg">
            </audio>
        </div> 
    `)
}

//select attacker
$(document).on("click", ".char-container-attacker", function() {
    
    //this converts the value of the button to an object and assigns it to the attacker
    attacker = JSON.parse($(this).attr('id'));
    $(this).fadeOut( "slow", function() {
        // Animation complete.
    });
    var audio = $(`#${attacker.name}-audio`)[0];
    audio.play();
    // $(audioElement).play();
    $(".char-container-attacker").addClass("char-container-defender").removeClass("char-container-attacker");
    $("#fighter-select").text('Select your first opponent')
});

//select defender
$(document).on("click", ".char-container-defender", function() {
    
    //this converts the value of the button to an object and assigns it to the attacker
    defender = JSON.parse($(this).attr('id'));
    $(this).fadeOut( "slow", function() {
        // Animation complete.
    });
    $(".char-container-defender").addClass("char-container-unselectable").removeClass("char-container-defender");
    $("#fighter-select").text('fight!')
});



$(document).on("click", "#attack-btn", function() {
    defender.health -= attacker.attack;
    attacker.attack += attacker.baseAttack;
    attacker.health -= defender.counter;

    if (defender.health <= 0) {
        alert('you win!');
    } else if (attacker.health <= 0) {
        alert('you lose');
    }
    console.log(attacker.name + ': ' +attacker.health); 
    console.log(defender.name + ': ' +defender.health);   
});


$('.hoverable').on({
    mouseenter: function () {
        var currentChar = JSON.parse($(this).attr('id'));
        $(`
            <p class="char-container-label">Health: ${currentChar.health}</p>
        `).hide().appendTo(this).fadeIn(300);
    },
    mouseleave: function () {
        $( ".char-container-label" ).fadeOut( "slow", function() {
            // Animation complete.
        });
    }
});


("mouseover", ".char-container", function() {
    
    //this converts the value of the button to an object
    var currentChar = JSON.parse($(this).attr('id'));
    console.log(currentChar.name);
    $(this).append(`
        <p class="char-container-label">Health: ${currentChar.health}</p>
    `)
})

