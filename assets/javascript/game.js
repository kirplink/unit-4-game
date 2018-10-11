$(document).ready(function () {



    var characters = [
        {
            name: "tracer",
            health: 150,
            attack: 30,
            baseAttack: 30,
            counter: 30,
            headshot: "assets/images/tracer-portrait-cropped.png",
            bodyshot: "assets/images/tracer-portrait.png",
            voiceline: "assets/sounds/tracervoice.ogg",
            selected: false
        },
        {
            name: "mccree",
            health: 200,
            attack: 20,
            baseAttack: 20,
            counter: 20,
            headshot: "assets/images/mccree-portrait-cropped.png",
            bodyshot: "assets/images/mccree-portrait.png",
            voiceline: "assets/sounds/mccreevoice.mp3",
            selected: false
        },
        {
            name: "junkrat",
            health: 180,
            attack: 25,
            baseAttack: 25,
            counter: 25,
            headshot: "assets/images/junkrat-portrait-cropped.png",
            bodyshot: "assets/images/junkrat-portrait.png",
            voiceline: "assets/sounds/junkratvoice.ogg",
            selected: false
        },
        {
            name: "pharah",
            health: 220,
            attack: 15,
            baseAttack: 15,
            counter: 15,
            headshot: "assets/images/pharah-portrait-cropped.png",
            bodyshot: "assets/images/pharah-portrait.png",
            voiceline: "assets/sounds/pharahvoice.mp3",
            selected: false
        }
    ];

    var attacker = {};
    var defender = {};
    var isAttackerDisplayed = false;
    var opponentsLeft = characters.length - 1;
    var attackAudio = $(`#punch-attack`)[0];
    var defendAudio = $(`#punch-defend`)[0];
    var victoryAudio = $(`#victory-sound`)[0];
    var defeatAudio = $(`#defeat-sound`)[0];
    var currentRound = 1;



    //this uses the characters object to set up the character select screen
    var gameStart = function () {

        $('#fighter-select').text('Select your fighter');
        
        for (var i = 0; i < characters.length; i++) {

            //this converts the oject to a string allowing it to be the value of the button
            var currentValue = JSON.stringify(characters[i]);

            $('#player-container').append(`
                <div class="char-container-attacker hoverable" id=${currentValue}>
                    <img src="${characters[i].headshot}" alt="${characters[i].name}" class="char-container-img">
                    <div class="fighter-container-label">
                        <span>${characters[i].name}</span>
                     </div> 
                    <audio class="audio" id="${characters[i].name}-audio" controls preload="none"> 
                        <source src="${characters[i].voiceline}" type="audio/mpeg">
                    </audio>
                </div> 
            `)
        }
    }

    var gameReset = function() {
        $('.player-area').html('');
        $('.next-opponent').html('');
        $('#attack-btn').addClass("display-none");
        isAttackerDisplayed = false;
        opponentsLeft = characters.length - 1;
        $('.health').addClass('display-none').removeClass('health-flex');
        currentRound = 1;

        for (let val of characters) {
            val.selected = false
        }
    }

    var victory = function() {
        if ((opponentsLeft <= 0) && (attacker.health > 0)) {
            victoryAudio.play();
            $('.modal-text').text('Victory')
            $('#win-modal').removeClass('display-none');
           
        }
    }

    var defeat = function() {
        if (attacker.health <= 0) {
            defeatAudio.play();
            $('.modal-text').text('Defeat')
            $('#win-modal').removeClass('display-none');
            
        }
    }

    $(document).on("click", ".play-again-btn", function(){
        gameReset();
        gameStart();
        $('#win-modal').addClass('display-none');
    })

    //select attacker
    $(document).on("click", ".char-container-attacker", function () {

        //this converts the value of the button to an object and assigns it to the attacker
        attacker = JSON.parse($(this).attr('id'));
        for (let val of characters) {
            if (attacker.name === val.name) {
                val.selected = true;
            }
        }
        $(this).fadeOut("slow", function () {
            // Animation complete.
        });
        var audio = $(`#${attacker.name}-audio`)[0];
        audio.play();
        // $(audioElement).play();
        $(this).addClass("char-container-selected").removeClass("char-container-attacker");
        $(".char-container-attacker").addClass("char-container-defender").removeClass("char-container-attacker");
        $("#fighter-select").text('Select your first opponent')
    });

    //select defender
    $(document).on("click", ".char-container-defender", function () {

        //this converts the value of the button to an object and assigns it to the defender
        defender = JSON.parse($(this).attr('id'));
        for (let val of characters) {
            if (defender.name === val.name) {
                val.selected = true;
            }
        }
        $(".char-container-defender").fadeOut("slow", function () {

        });

        var audio = $(`#${defender.name}-audio`)[0];
        audio.play();
        $(this).addClass("char-container-selected").removeClass("char-container-defender");
        // $(".char-container-defender").addClass("char-container-unselectable").removeClass("char-container-defender");
        $(".char-container-defender").remove();
        $("#fighter-select").text('')

        $('.modal-text').text(`Round: ${currentRound}`);
        $('#start-modal').toggleClass("display-none");
        currentRound++;

    });



    $(document).on("click", "#attack-btn", function () {
        defender.health -= attacker.attack;
        attacker.attack += attacker.baseAttack;
        attacker.health -= defender.counter;
        
        attackAudio.play();
        defendAudio.play();
        
        if (attacker.health < 0) {
            $('#attacker-health').text('0');  
        } else {
            $('#attacker-health').text(attacker.health);
        }

        if (defender.health < 0) {
            $('#defender-health').text('0');  
        } else {
            $('#defender-health').text(defender.health);
        }
        
        ;

        if (defender.health <= 0) {
            $('#attack-btn').toggleClass("display-none");
            opponentsLeft--;
            if (opponentsLeft > 0) {
                $(".defender-container").fadeOut("slow", function () {
                    // Animation complete.
                    $('.modal-text').text(`Choose Next Defender`);
                    $('#next-defender-modal').removeClass('display-none');
                    $('.next-opponent').html('');
    
                    for (let val of characters) {
                        if (val.selected === false) {
                            var currentValue = JSON.stringify(val);
                            $('.next-opponent').append(`
                    
                        <div class="char-container-defender hoverable" id=${currentValue}>
                            <img src="${val.headshot}" alt="${val.name}" class="char-container-img">
                            <div class="fighter-container-label">
                                <span>${val.name}</span>
                            </div> 
                            <audio class="audio" id="${val.name}-audio" controls preload="none"> 
                                <source src="${val.voiceline}" type="audio/mpeg">
                            </audio>
                        </div>
                    
                    `)
    
                        }
                    }
                });
            }
            
        } 
        victory();
        defeat();
        
    });


    $(document).on({
        mouseenter: function () {
            var currentChar = JSON.parse($(this).attr('id'));
            $(`
            <p class="char-container-health">Health: ${currentChar.health}</p>
        `).hide().appendTo(this).fadeIn(300);
        },

        mouseleave: function () {
            $(".char-container-health").fadeOut("slow", function () {
                // Animation complete.
            });
        }
    }, '.hoverable');

    

    $(document).on("click", "#begin-btn", function () {
        $('.modal').addClass("display-none");
        if (isAttackerDisplayed === false) {
            $('.player-area').append(`
            <div class="fighter-container">
                <img src=${attacker.bodyshot} alt=${attacker.name} class="fighter-img">
                <div class="fighter-container-label">
                    <span>${attacker.name}</span>
                </div>
            </div>
        `);
            isAttackerDisplayed = true;
        }

        $('.next-opponent').append(`
        <div class="defender-container">
            <img src=${defender.bodyshot} alt=${defender.name} class="fighter-img">
            <div class="fighter-container-label">
                <span>${defender.name}</span>
            </div>
        </div>
    `);
        $('#attacker-health').text(attacker.health);
        $('#defender-health').text(defender.health);
        $('.health').removeClass('display-none').addClass('health-flex');
        $('#attack-btn').removeClass("display-none");
    });


    $(document).on("click", '#next-defender-btn', function() {
        
        $('#next-defender-modal').addClass('display-none');
    })



   


    gameStart();

    


});
