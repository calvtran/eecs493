//======================SETTINGS DIV===========================
let SetString = "<div id='Setting'>"
	+ "<a>Settings<br><br><br>"
	+ "Volume: <span id='vol_display'></span><br><br><br>"
	+ " Difficulty<br><br><br></a>"
	+ "<div class='slidecontainer'>"
	+ "<input type='range' min='1' max='100' class='slider' id='myRange'></div>"
	+ "<div id='setButton' class='easy Difficulty'> <button type='Settings' onClick='set_easy()'>Easy</button> </div>"
	+ "<div id='setButton' class='norm Difficulty'> <button type='Settings' onClick='set_normal()'>Normal</button> </div>"
	+ "<div id='setButton' class='hard Difficulty'> <button type='Settings' onClick='set_hard()'>Hard</button> </div>"
	+ "<div id='setButton' class='Return'> <button type='Settings' onClick='show_return()'>Close</button> </div></div>";
let GetReady = "<div id='GetReady'><br /><br />Get Ready!<br /><br /><span id='countdown'></span><br /></div>";
let setOpen = false;
let credOpen = false;
//=============================================================

//===================Music/Sound SETTINGS======================
let musicDiv = "<audio id='music' autoplay loop>"
    +"<source src='src/MainTheme.mp3' type='audio/mpeg'>"
	+ "</audio>";
let music;
let musicVolume = 0.5;
let musicSpeed = 1;
let slider;
let musicStart = false;
let PEW = new Audio("src/pew.mp3"); PEW.volume = 0.25;
let PEWmax = 0.5;
let COLLECT = new Audio("src/collect.mp3"); COLLECT.volume = 0.175;
let COLLECTmax = 0.35;
let CONFIRM = new Audio("src/button_press.wav"); CONFIRM.volume = 0.5;
let CONFIRMmax = 1;
let DESTROY = new Audio("src/destroy.mp3"); DESTROY.volume = 0.5;
let DESTROYmax = 1;
let DIE = new Audio("src/die.mp3"); DIE.volume = 0.3;
let DIEmax = 0.8;
let BEEP = new Audio("src/beep.wav"); BEEP.volume = 0.4;
let BOOP = new Audio("src/boop.wav"); BOOP.volume = BEEP.volume; BEEPBOOPmax = 0.8;
let OPEN = new Audio("src/open.wav");  OPEN.volume = 0.5;
let CLOSE = new Audio("src/close.wav"); CLOSE.volume = 0.5; let OPEN_CLOSEmax = 1;
let REMOVE = new Audio("src/remove.mp3"); REMOVE.volume = 0.5; let REMOVEmax = 1;
//=============================================================

//===================Div Handlers===============================
let Gmwindow;
let GameScreen;
let mainMenu;
let mainSetting;
let charSprite;
let GalagaSection;
let AsteroidSection;
let onScreenAstroid;
let gamescore;
let covDanger;
let covLevel;
let credits_section;
let credits_button;
let leaderboard;
let score_enter;
let score_input;
let menu_buttons;
let tutorial;
//=============================================================

//===================Game Intervals=============================
let galagaCovMetSpawn;
let galagaBackgroundScroll;
let galVacSpawn;
let galMove;
let galDifficulty;

let asteriodCovMetSpawn;
let astVaccine;  
let pointStack;
let astMove;
let maskSpawn;
let astDifficulty;

//=============================================================

//====================Game Object Helpers======================
            //+++++++++++++GALAGA+++++++++++++++++++
let inGalagaSection = false;
let galCovMetIndex = 1;
let galShotIndex = 1;
const GAL_OBJECT_REFRESH_RATE = 25;  //ms
let galBlackBarWidth = 320;
let galScrollSpeed = 1;
let galShip;
let galMaxShipX = 980;
let galMaxShipY = 700;
let shipSpeed = 5;
let shotSpeed = 10;
let galAsterArray = [];
let asteriodHitbox = {xhitbox: 60, yhitbox: 60};
let galVaccineSpeed = 2;
let shootInterval;
let playbackSpeed = 1;
            //++++++++++++ASTROIDS++++++++++++++++++
let masked = false;
let inAsteroidsSection = false;
let currentAstroid = 1;
let AST_OBJECT_REFRESH_RATE = 15;
let maxPersonPosX = 1218;
let maxPersonPosY = 658;
let PERSON_SPEED = 5;
let vaccineOccurrence = 20000; //Vaccine occurs every 20 seconds
let vaccineGone = 5000; //Vaccine disappears in 5 seconds
let maskOccurrence = 15000; //Masks occurs every 15 seconds
let maskGone = 5000; //Mask disappears in 5 seconds

            //++++++++++++LeaderBoards+++++++++++++++
let Highest_score = []
//=============================================================

//====================Difficulty Parameters====================
const diff = {
	EASY: "easy",
	NORM: "norm",
	HARD: "hard"		
}

let currDifficulty = diff.NORM;
let firstLevel = {ast: true, gal: true};
let currentLevel = {ast: 0, gal: 0};
let covidDanger = 25; // easy: 20  medium: 25 hard: 30

let galProjectileSpeed = 7;     // easy: 3, norm: 5, hard: 7
let galProjectileSpeedIncreaser = .3;
let astProjectileSpeed = 3;     // easy: 1, norm: 3, hard: 5
let astProjectileSpeedIncreaser = .2;

let galProjectileOccurrenceMin = 850;     // easy: 1100, norm: 800, hard: 600
let galProjectileOccurrenceMax = 750;
let galVaccineTimer = 20000; //starts at 15 secs and gets longer as difficulty increases
let galVaccineTimerIncreaser = 1500;

let astProjectileOccurrence = 600;     // easy: 1500, norm: 1000, hard: 800

let difficultyIncrement = 15000; //Every 15 seconds, increment difficulty
//==============================================================

let firstTime = true;
let gameStarted = false;
let player;
let playerNeutral;

//=======================MOVEMENT Helpers=======================
var LEFT = false;
var RIGHT = false;
var UP = false;
var DOWN = false;
var touched = false;
var SHOOT = false;

const KEYS = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
	spacebar: 32,
    escape: 27
};
//==============================================================

let score = 0;



$(document).ready(function () {
    // ====== Startup ====== 
    Gmwindow = $('.game-window');
    mainMenu = $('#mainMenu');
	tutorial = $('#tutorial');
	tutorial.hide();
	Gmwindow.data("inGame", false);
    GameScreen = $('#actualGame');
    GalagaSection = $('.galagaSection');
    AsteroidSection = $('.asteroidSection');
    onScreenAstroid = $('.curAstroid')
	GameScreen.hide();
    gamescore = $('#scorenumber');
    covDanger = $('#covDangerNumber');
    covLevel = $('#covLevel');
    galShip = $('.galShip');
    credits_section = $('#cred_region');
    credits_section.hide();
    credits_button = $('.Credits');
    leaderboard = $('#Leaderboard');
    leaderboard.hide();
    Highest_score.push({Name: "Manuel", Score: 300}, {Name: "Calvin", Score: 9001}, { Name: "COVID", Score: 10},
    { Name: "Mark", Score: 20}, { Name: "Mark with a hat", Score: 30}, { Name: "Jeff", Score: 40}, { Name: "Jane", Score: 50},
    { Name: "Nice", Score: 69}, { Name: "Jack", Score: 101}, { Name: "Pujan", Score: 100});
    Highest_score.sort(score_comp);
    score_enter = $('#EnterScore');
    score_input = $('#ScoreInput');
    menu_buttons = $('#menu_buttons');
    score_enter.hide();
    
	{
		// Throughout game
		// Pause menu settings
		// Scoreboard
	
		// ======  Main menu ====== 
		//scoreboard
		//play game
		//access settings
    
		// ======  Settings ====== 
		//set difficutly
		//music???/sound effect vol
		//return to main menu

	
	
		// ====== Asteroids Game ====== 
		// Throw covid particles
		// Add score-over-time
		// Handle player controls
	
		// ======  Galaga Game ====== 
		// Transition from Asteroids to Galaga
		// Pause score-over-time
		// Rehandle new player controls
		// Add score-by-shooting covid particles
		// Transition from Galaga to Asteroids
	
		// ======+  Game Over +====== 
		// Stop game
		// Stop score
		// Display game over splash screen
		// Leaderboards/Submit score/Play Again?


		// Testing function *************DELETE FOR FINAL VERSION************************
		//testPortion();
	}
});

// Testing function *************DELETE FOR FINAL VERSION************************
function testPortion(){
    var testInput = prompt("FOR TESTING: possible input: 'gal' 'ast' cancel for main menu");
    console.log(testInput);
    if(testInput == "gal"){
        galStartSection();
    }
    if(testInput == "ast"){
        mainMenu.hide();
        GameScreen.show();
        AsteroidSection.show();
        GalagaSection.hide();
        astStartSection();
    }
    if (testInput == "transGal") {
        transtoGalaga();
    }
}


//===========================MENUING (SETTINGS, Difficulty, etc)=============
function play1() {
	touched = false;
	score = 0;
	firstLevel['gal'] = true;
	firstLevel['ast'] = true;
	galCovMetIndex = 1;
	galShotIndex = 1;
	currentAstroid = 1;
	currentLevel = { ast: 0, gal: 0 };
	update_settings();
	gamescore.text(score);
	COLLECT.play();
	mainMenu.hide();
	
	if (firstTime) {
		tutorial.show();
		firstTime = false;
    }
	else
		play2();
}

function play2() {
	tutorial.hide();
	GameScreen.show();
	AsteroidSection.show();
    GalagaSection.hide();       // Probably unnecessary
	if (!musicStart) {  // Add music div in first playthrough
	    $("body").append(musicDiv);
	    music = document.getElementById("music");
        setTimeout(function () {  musicStart = true  }, 2000);
	}
	else {              // Play music on subsequent playthroughs
		music.play();
    }
	music.volume = musicVolume;
	music.playbackRate = musicSpeed;
	console.log("volume start: " + music.volume*100);
	console.log("Speed start: " + music.playbackRate);

    window.addEventListener("keydown", function(e) {
        // space, page up, page down and arrow keys:
        if([32, 33, 34, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);
	
	astStartSection();
    
}

function update_settings() {
    if(currDifficulty == diff.EASY)
    {
        set_easy();
    }
    if(currDifficulty == diff.HARD)
    {
        set_hard();
    }
    else
    {
        set_normal();
    }
}

var counting = false;
function show_set() {
    //counting = false;
    if (musicStart) music.pause();
	OPEN.play();
    Gmwindow.append(SetString);
    load_setting();
    setOpen = true;
    slider = document.getElementById("myRange");
    slider.value = musicVolume*100;
    credits_button.hide();
	(document.getElementById("vol_display")).innerHTML = slider.value;
    if (Gmwindow.data("inGame") == true) {
        //Pause the game
        
    }

}

var countdown = [0, 0, 0, 0];
function show_return() {
    $('#Setting').remove();
	CLOSE.play();
   
    //Restart the setInterval for game if needed
    if (Gmwindow.data("inGame") == true) {
        //continue/unpause the game
        // Give countdown
        Gmwindow.append(GetReady);
        counting = true;

        var beep3 = BEEP.cloneNode(true);
		beep3.volume = BEEP.volume;
        (document.getElementById("countdown")).innerHTML = 3;
        beep3.play();
        
        countdown[0] = setTimeout(function() {
            if (counting) {
				var beep2 = BEEP.cloneNode(true);
				beep2.volume = BEEP.volume;
                (document.getElementById("countdown")).innerHTML = 2;
                beep2.play();
            }
        }, 1000);
    
        countdown[1] = setTimeout(function() {
            if (counting) {
				var beep1 = BEEP.cloneNode(true);
				beep1.volume = BEEP.volume;
                (document.getElementById("countdown")).innerHTML = 1;
                beep1.play();
            }
        }, 2000);

        countdown[2] = setTimeout(function() {
            if (counting) {
                var beep0 = BEEP.cloneNode(true);
                beep0.volume = BEEP.volume;
                (document.getElementById("countdown")).innerHTML = 0;
                beep0.play();
            }
        }, 3000);
        
        
        countdown[3] = setTimeout(function() {
                if (counting) {
                    $("#GetReady").remove();
                    counting = false;
                    setOpen = false;
                }
		}, 4000);
		
        if (musicStart) music.play();
	}
    else {
        setOpen = false;
        credits_button.show();
    }
	console.log("volume left at: " + musicVolume*100);
	console.log("Speed left at: " + musicSpeed);
}

function load_setting() {

    let setting = $('#Setting');
    setting.css("top", "50%");
    setting.css("left", "50%");
    setting.css("width", 600);
    setting.css("height", 690);
    setting.css("background-color", "blue");
    setting.css("border", "5px groove");
    setting.css("z-index", 100);
    setting.css("position", "absolute");
    setting.css("transform", "translate(-50 %, -50 %)");
    setting.children().each(function () {
        var finddiff = $(this).attr("class");
        if (finddiff == (currDifficulty + " Difficulty")) {
            //Make border to show selected
            $(this).css("border", "5px groove yellow");
		}
		else {
			// Remove border from unselected
			$(this).css("border", "none");
        }
    })

}

//Easy difficulty
function set_easy() {
	currDifficulty = diff.EASY;

    covidDanger = 15;

	astProjectileSpeed = 1 + currentLevel['ast'] * astProjectileSpeedIncreaser;
	astProjectileOccurrence = 1500 - currentLevel['ast'] * covidDanger;
	
	galProjectileSpeed = 4 + currentLevel['gal'] * galProjectileSpeedIncreaser;
	galProjectileOccurrenceMin = 1100 - currentLevel['gal'] * covidDanger;
    galProjectileOccurrenceMax = 1200 - currentLevel['gal'] * covidDanger;
	
    console.log("difficulty now set to: " + currDifficulty);
	$('#Setting').children().each(function () {
		var finddiff = $(this).attr("class");
		if (finddiff == (currDifficulty + " Difficulty")) {
			//Make border to show selected
			$(this).css("border", "5px groove yellow");
		}
		else {
			// Remove border from unselected
			$(this).css("border", "none");
		}
	});
	setMusicSpeed(0.75);
	CONFIRM.play();
}
//Normal difficulty
function set_normal() {
	currDifficulty = diff.NORM;

    covidDanger = 25;

	
	astProjectileSpeed = 3 + currentLevel['ast'] * astProjectileSpeedIncreaser;;
	astProjectileOccurrence = 1000 - currentLevel['ast'] * covidDanger;
	
	galProjectileSpeed = 5 + currentLevel['gal'] * galProjectileSpeedIncreaser;
    galProjectileOccurrenceMin = 900 - currentLevel['gal'] * covidDanger;
    galProjectileOccurrenceMax = 650 - currentLevel['gal'] * covidDanger;
	
    console.log("difficulty now set to: " + currDifficulty);
	$('#Setting').children().each(function () {
		var finddiff = $(this).attr("class");
		if (finddiff == (currDifficulty + " Difficulty")) {
			//Make border to show selected
			$(this).css("border", "5px groove yellow");
		}
		else {
			// Remove border from unselected
			$(this).css("border", "none");
		}
	});
	setMusicSpeed(1);
	CONFIRM.play();
}
//Hard difficulty
function set_hard() {
	currDifficulty = diff.HARD;

    covidDanger = 35;

	
    astProjectileSpeed = 5 + currentLevel['ast'] * astProjectileSpeedIncreaser;;
    astProjectileOccurrence = 800 - currentLevel['ast'] * covidDanger;
	
    galProjectileSpeed = 8 + currentLevel['gal'] * galProjectileSpeedIncreaser;
    galProjectileOccurrenceMin = 700 - currentLevel['gal'] * covidDanger;
    galProjectileOccurrenceMax = 550 - currentLevel['gal'] * covidDanger;
	
    console.log("difficulty now set to: " + currDifficulty);
    $('#Setting').children().each(function () {
    var finddiff = $(this).attr("class");
    if (finddiff == (currDifficulty + " Difficulty")) {
        //Make border to show selected
        $(this).css("border", "5px groove yellow");
    }
    else {
        // Remove border from unselected
        $(this).css("border", "none");
    }
    });
    setMusicSpeed(1.25);
	CONFIRM.play();
}

// Volume
setInterval(
        function () {
            if (setOpen) {
                slider.oninput = function() {
					var vol = (this.value) / 100;
                    if (musicStart) {   // If music is currently playing...
                        music.volume = vol;
                    }
					musicVolume = vol;
					COLLECT.volume = COLLECTmax * vol;
                    PEW.volume = PEWmax * vol;
					CONFIRM.volume = CONFIRMmax * vol;
					DESTROY.volume = DESTROYmax * vol;
					DIE.volume = DIEmax * vol;
					BEEP.volume = BEEPBOOPmax * vol;
					BOOP.volume = BEEP.volume;
                    OPEN.volume = OPEN_CLOSEmax * vol;
                    CLOSE.volume = OPEN_CLOSEmax * vol;
                    REMOVE.volume = REMOVEmax * vol;
					
					console.log("volume set to " + musicVolume*100);
					//$("#vol_display").innerHTML = this.value;
                    (document.getElementById("vol_display")).innerHTML = this.value;
				    CONFIRM.play();
                }
            }
        }
        , 10)

function setMusicSpeed(speed) {
	musicSpeed = speed;
	if (musicStart) {
		music.playbackRate = musicSpeed;
	}
	//console.log("Speed set to: " + musicSpeed);
}
//===============================================================================













//============== GALAGA =========================

//Starts game loop
function galStartSection() {
	canShoot = true;
	inAsteroidsSection = false;
	inGalagaSection = true;
    console.log("Gal section entered");
    
    if (!musicStart) {  // Add music div in first playthrough
	    $("body").append(musicDiv);
	    music = document.getElementById("music");
        setTimeout(function () {  musicStart = true  }, 2000);
	}
	else {              // Play music on subsequent playthroughs
		music.play();
    }

    mainMenu.hide();
    GameScreen.show();
    AsteroidSection.hide();
	GalagaSection.show();

    
    update_settings();
    if(firstLevel['gal'] == true)
    {
        firstLevel['gal'] = false;
    }
    else
    {
        if (galProjectileOccurrenceMin > 100)
            galProjectileOccurrenceMin -= currentLevel['gal']  *  covidDanger;
        if (galProjectileOccurrenceMax >  400)
                galProjectileOccurrenceMax -= currentLevel['gal']  *  covidDanger;
        if (galProjectileSpeed < 15){
            galProjectileSpeed = galProjectileSpeedIncreaser + galProjectileSpeed;
        }
        currentLevel['gal'] += 1;
    }

    var welcomeString;
    welcomeString = "<div class='gal_welcome welcome'>"
        + "<h2>Get Ready!</h2>"
        + "<img src='src/ArrowKeys.png'>"
        + "<p>Use arrow keys to move.</p>"
        + "<img src='src/SpacebarKey.png' style='width: 370px;'>"
        + "<p>Press spacebar to shoot.</p></div>";
    GalagaSection.append(welcomeString);
	
	
	setTimeout(function () {
        $(window).keydown(galKeydownRouter);
		$('.welcome').remove();
		galShip.append("<img src='src/ship.gif' id='ship_img'>");
		$("#ship_img").css("width", 50);
		$("#ship_img").css("height", 50);
        covDanger.text(covidDanger);
        covLevel.text(currentLevel['gal']+1);
		galMove = setInterval(updateGal, 10);
	
	
        galagaCovMetSpawn = setInterval(metSpawnRandomizer, getRandomNumber(galProjectileOccurrenceMax, galProjectileOccurrenceMin));
        galagaBackgroundScroll = setInterval(galAutoScrollBack, 10);
        //galVacSpawn = setInterval(galSpawnVaccine, galVaccineTimer);
        galVacSpawn = setInterval(galSpawnVaccine, 10000);
        galDifficulty = setInterval(galIncreaseDifficulty, 15000);
        //galVaccineTimer -= galVaccineTimerIncreaser;

	}, 3000);
}

function galIncreaseDifficulty(){
    covidDanger += 25;
    galProjectileOccurrenceMin -= currentLevel['gal']  *  covidDanger;
    galProjectileOccurrenceMax -= currentLevel['gal']  *  covidDanger;
    galProjectileSpeed = galProjectileSpeedIncreaser + galProjectileSpeed;
    covDanger.text(covidDanger);
}

function metSpawnRandomizer(){
    galSpawnCovMet();
    clearInterval(galagaCovMetSpawn);
    galagaCovMetSpawn = setInterval(metSpawnRandomizer, getRandomNumber(galProjectileOccurrenceMax, galProjectileOccurrenceMin));
}

// vvvvvvvvvvvvvvvvvvvv GALAGA PLAYER CONTROLS vvvvvvvvvvvvvvvvvvvv

let canShoot = true;

function updateGal() {
	if (!setOpen) galMoveShip();
}

function galKeydownRouter(e) {
    switch (e.which) {
      case KEYS.spacebar:
        if (!setOpen && inGalagaSection) galShoot();
        break;
      default:
        console.log("Invalid input!");
    }
  }

function galMoveShip(){
    //switch (arrow) {
        if (LEFT) { // left arrow
          let newPos = parseInt(galShip.css('left'))-shipSpeed;
          if (newPos < 328) {
            newPos = 328;
          }
          galShip.css('left', newPos);
          //break;
        }
        if (RIGHT) { // right arrow
          let newPos = parseInt(galShip.css('left'))+shipSpeed;
          if (newPos > 902) {
            newPos = 902;
          }
          galShip.css('left', newPos);
          //break;
        }
        if (UP) { // up arrow
          let newPos = parseInt(galShip.css('top'))-shipSpeed;
          if (newPos < 0) {
            newPos = 0;
          }
          galShip.css('top', newPos);
          //break;
        }
        if (DOWN) { // down arrow
          let newPos = parseInt(galShip.css('top'))+shipSpeed;
          if (newPos > galMaxShipY-galShip.height()) {
            newPos = galMaxShipY-galShip.height();
          }
          galShip.css('top', newPos);
          //break;
		}
      //}
}

function galShoot() {
	if (canShoot) {
		canShoot = false;
		PEW.play();
		$(".galSpawnedEntities").append("<div id='galShot" + galShotIndex + "' class='galShot'><img src='src/" + 'needle.png' + "'/></div>");
    
		var shotRef = $('#galShot' + galShotIndex);
		let shotX = parseInt(galShip.css('left')) + galShip.width() / 2 - 3;
		shotRef.css({ "top": galShip.css('top'), "left": shotX });
    
		document.getElementById("ship_img").src = "src/ship_shot.gif";
	
		shootInterval = setTimeout(function () {
			document.getElementById("ship_img").src = "src/ship.gif";
			canShoot = true;
		}, 500);

		num_ticks = Math.ceil((parseInt(galShip.css('top') + 24)) / shotSpeed);
    
		setTimeout(galShotMover(shotRef, num_ticks, shotSpeed), 0);
    
		galShotIndex += 1;
	}
}

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

function galShotMover(elementObj, iterationsLeft, shotSpeed){
    let shotInMotion = setInterval( function() {
		if (!setOpen) {
			let newPos = parseInt(elementObj.css('top')) - shotSpeed;
			elementObj.css('top', newPos);
			for (i = 0; i < galAsterArray.length; i++) {
				//check for shot collisions here,
				if (isColliding(galAsterArray[i]["objID"], elementObj)) {
					score += 100;
					gamescore.text(score);
					console.log(galAsterArray[i]["objID"])
					galAsterArray[i]["state"] = 0;

                    clearInterval(shotInMotion);
                    var boom = DESTROY.cloneNode(true);
					boom.volume = DESTROY.volume;
					boom.play();
                    elementObj.remove();

                    setTimeout(function() {
                    }, 1000);
				}
			}

			if (iterationsLeft <= 0) {
				elementObj.remove();
				clearInterval(shotInMotion);
			}
			iterationsLeft -= 1;
		}
    }, GAL_OBJECT_REFRESH_RATE);
}

//spawn the covid particles; can change this to spawn later if more time
function galSpawnCovMet() {
	if (!setOpen) {
		x = getRandomNumber(galBlackBarWidth, GameScreen.width() - galBlackBarWidth - 64);
		covMetSize = Math.floor(getRandomNumber(1, 600));

		$(".galSpawnedEntities").append(galCreateNewCovMet(galCovMetIndex));
		var covMetRef = $('#galCovMet' + galCovMetIndex);
		covMetRef.css({ "top": -64, "left": x }); //replace 64 with met size
		covMetRef.css('transform', 'rotate(' + 120 + 'deg)');
  
		let bottomOfScreen = GameScreen.height();
		num_ticks = Math.ceil((bottomOfScreen + 64) / galProjectileSpeed);

		var galAsterObj = { objID: covMetRef, state: 1, index: galCovMetIndex };

		galAsterArray.push(galAsterObj);

		let currentRotation = getRandomNumber(-360, 360);
		let galCovMetSpin = getRandomNumber(-10, 10);
		let galCovMetXMove = 0;
		if (Math.floor(getRandomNumber(0, 2)) == 1) {
			galCovMetXMove = (parseInt(galShip.css('left')) - x) / num_ticks;
		}
		else {
			//pickup here buddy
		}
		setTimeout(galCovMetFall(galAsterObj, num_ticks, galProjectileSpeed, currentRotation, galCovMetSpin, galCovMetXMove), 0);
  
		galCovMetIndex += 1;
	}
}

//helper functions for spawning

function galCreateNewCovMet(index) {
    return "<div id='galCovMet" + index + "' class='galCovMet'><img id='gal_img" + index + "' src='src/" + 'covidstriod1.png' + "'/></div>";
}

function galCovMetFall(galAsterObj, iterationsLeft, fallSpeed, currentRotation, galCovMetSpin, galCovMetXMove){
    let fallingCovMet = setInterval( function() {
        if (!setOpen) {
            let newPosY = parseInt(galAsterObj["objID"].css('top'))+fallSpeed;
            galAsterObj["objID"].css('top', newPosY);
            let newPosX = parseInt(galAsterObj["objID"].css('left'))+galCovMetXMove;
            galAsterObj["objID"].css('left', newPosX);
            currentRotation += galCovMetSpin;
            galAsterObj["objID"].css('transform','rotate('+currentRotation+ 'deg)');

            let galAstTester = (element) => element["objID"] == galAsterObj["objID"];
            array_elm = galAsterArray.find(galAstTester);
            array_index = galAsterArray.findIndex(galAstTester);

            if(array_elm["state"] == 0)
            {
                galAsterArray.splice(array_index, 1);
				(document.getElementById("gal_img" + galAsterObj["index"])).src = "src/covidstroid_explode.gif";
                setTimeout(function () {
                     galAsterObj["objID"].css('transform','rotate(0deg)');
                    (document.getElementById("gal_img" + galAsterObj["index"])).src = "src/100.gif";
					setTimeout(function () {
						galAsterObj["objID"].remove();
					}, 500);
                }, 420);
                clearInterval(fallingCovMet);
            }

            if(isColliding(galShip, galAsterObj["objID"]))
            {
                //do something to player
                clearInterval(shootInterval);
				touched = true;
				music.pause();
				DIE.play();
				(document.getElementById("ship_img")).src = "src/ship_explode.gif";
                $("#ship_img").css("width", 60);
                $("#ship_img").css("height", 60);
				setTimeout(galAsterObj["objID"].remove, 2000);
				clearInterval(galagaCovMetSpawn);
                clearInterval(galagaBackgroundScroll);
                clearInterval(galVacSpawn);
                clearInterval(fallingCovMet);
                clearInterval(galMove);
                clearInterval(galDifficulty);
                setTimeout(function () {
                    $("#ship_img").remove();
                    $(".galSpawnedEntities").empty();
                    $(window).empty();
					mainMenu.show();
                    if(score > Highest_score[9]["Score"])
                    {
                        menu_buttons.hide();
                        score_enter.show();
                    }
					GameScreen.hide();
                    Gmwindow.data("inGame", false);
                    music.pause();
                    music.currentTime = 0;

				}, 2000);
            }

            if(iterationsLeft <= 0)
            {
                galAsterArray.shift();
                galAsterObj["objID"].remove();  
                clearInterval(fallingCovMet);
            }
            iterationsLeft -= 1;
        }
    }, GAL_OBJECT_REFRESH_RATE);
}


function galAutoScrollBack() {
	if (!setOpen) {
        let elementObj = $('#galScrollingBackground');
        let newPos = parseInt(elementObj.css('bottom'))+galScrollSpeed;
        if(newPos+galScrollSpeed >= (parseInt(elementObj.css('height')) - GameScreen.height()))
        {
            elementObj.css('bottom', 0);
        }
        else{
            elementObj.css('bottom', newPos);
        }
    }
}

function galSpawnVaccine() {
    console.log("Vaccine on the way!!");
    x = getRandomNumber(galBlackBarWidth, GameScreen.width() - galBlackBarWidth - 64);
    var objectString;
    objectString = "<div id = 'v" + galCovMetIndex + "' class = 'curAstroid' > <img src = 'src/vacc.gif'/></div>";
    $(".galSpawnedEntities").append(objectString);
    var vacc = $('#v' + galCovMetIndex);
    galCovMetIndex += 1;
    vacc.css("top", -64);
    vacc.css("left", x);

    let bottomOfScreen = GameScreen.height();
    num_ticks = Math.ceil((bottomOfScreen + 64) / galVaccineSpeed);
    let galVaccineXMove = (parseInt(galShip.css('left')) - x) / num_ticks;
    vaccineFall(vacc, num_ticks, galVaccineSpeed, galVaccineXMove);
}

function vaccineFall(galVac, iterationsLeft, galVacSpeed, galVaccineXMove) {
    let fallingVac = setInterval( function() {
        if (!setOpen) {
            let newPosY = parseInt(galVac.css('top'))+galVacSpeed;
            galVac.css('top', newPosY);
            let newPosX = parseInt(galVac.css('left'))+galVaccineXMove;
            galVac.css('left', newPosX);
            if (isColliding(galVac, galShip)) {
				canShoot = false;
                clearInterval(shootInterval);
                galVac.remove();
                COLLECT.play();
                clearInterval(galDifficulty);
                clearInterval(fallingVac);
                (document.getElementById("ship_img")).src = "src/transform2.gif";
                $("#ship_img").css("width", 60);
                $("#ship_img").css("height", 60);
                $(".galSpawnedEntities").empty();
                reset_and_transition('gal');
                setTimeout(function() {
                    $(".galSpawnedEntities").empty();
                    $("#ship_img").remove();
                    GalagaSection.hide();
                    AsteroidSection.show();
                    astStartSection();
                    clearInterval(galMove);
                    touched = false;
                }, 2000);
                //Transition  to galaga
            }
            if(iterationsLeft <= 0)
            {
                galVac.remove();  
                clearInterval(fallingVac);
            }
            iterationsLeft -= 1;
        }
    }, GAL_OBJECT_REFRESH_RATE)
}






//==================END GALAGA=====================================

//==================Reset inbetween sections=======================

//all global intervals: 
//all galaga inertvals: galVacSpawn, galagaCovMetSpawn, galagaBackgroundScroll, fallingVac, galMove


function reset_and_transition(game_mode){
    //stuff cleared for both here


    if(game_mode == 'gal')
    {
        clearInterval(galVacSpawn);
        clearInterval(galagaCovMetSpawn);
        clearInterval(galagaBackgroundScroll);
        clearInterval(galMove);
        $(window).empty();
    }
    else
    {
        clearInterval(astVaccine);
        clearInterval(astCovMetSpawn);
        clearInterval(pointStack);
		clearInterval(maskSpawn);
    }

}





//==================ASTEROIDS======================================


function astStartSection() {
	masked = false;
    Gmwindow.data("inGame", true);
	console.log("Ast section entered");
	inAsteroidsSection = true;
    inGalagaSection = false;
    update_settings();
    playbackSpeed = 1;
    if  (astProjectileOccurrence > 100)
            astProjectileOccurrence -= currentLevel['ast'] * covidDanger;

    if (astProjectileSpeed < 10)
    {
        astProjectileSpeed = astProjectileSpeed + astProjectileSpeedIncreaser;
    }
    currentLevel['ast']++;
    covDanger.text(covidDanger);
    covLevel.text(currentLevel['ast']);
    var welcomeString;
    welcomeString = "<div class= 'ast_welcome welcome'>"
        + "<h2>Get Ready!</h2>"
        + "<img src='src/ArrowKeys.png'>"
        + "<p>Use arrow keys to move.</p></div>";
    AsteroidSection.append(welcomeString);
    setTimeout(function () {
        var playerDiv = "<div id='player'><img src='src/player/player.gif' id='player_img'></div>";
        AsteroidSection.append(playerDiv);
        player = $("#player");
        $('.welcome').remove();
        if (firstLevel['ast'] == true) {
            firstLevel['ast'] = false;

        }
        astMove = setInterval(function () { if (!setOpen && !touched && Gmwindow.data("inGame")) { updateAst(); } }, 10); // Movement & Keypress handling
		pointStack = setInterval(function () {
			if (!setOpen) {
				score+=40;
				gamescore.text(score);
			}
		}, 500);
		
		astVaccine = setInterval(function () {
			if (!setOpen) astSpawnVaccine();
		}, vaccineOccurrence);
		
        astCovMetSpawn = setInterval(function () {
           if (!setOpen) astMetSpawnRandomizer();
        }, astProjectileOccurrence);

        maskSpawn = setInterval(function () {
			if (!setOpen && !masked) spawnMask();
		}, maskOccurrence);
        spike = setInterval(function () {
            astIncreaseDifficulty()
            covDanger.text(covidDanger);
            if (playbackSpeed < 1.75)
                playbackSpeed += 0.02;
             setMusicSpeed(playbackSpeed);
        }, difficultyIncrement);
    }, 3000);
}

function astIncreaseDifficulty() {
    covidDanger += 15;
    astProjectileOccurrence -= currentLevel['ast'] * covidDanger;
}

function astMetSpawnRandomizer(){
    spawn();
    clearInterval(astCovMetSpawn);
    astCovMetSpawn = setInterval(function () {
        if (!setOpen) astMetSpawnRandomizer();
    }, astProjectileOccurrence);
}

function spawnMask() {
	console.log("Mask on the way!!");
    var MaskObj;
    MaskObj = "<div id = 'm-" + currentAstroid + "' class = 'mask' > <img src='src/mask.gif' /></div>";
    $("#mask_img").css("width", "70px");
    $("#mask_img").css("height", "33px");
    onScreenAstroid.append(MaskObj);
    var mask = $('#m-' + currentAstroid);

    var maskx = Math.floor(Math.random()*1120);
    var masky = Math.floor(Math.random()*650);
    //currentAstroid;
    mask.css("top", masky);
	mask.css("right", maskx);
	
    var getMask;
	getMask = setInterval(function () {
		if (isColliding(mask, player)) {
			mask.remove();                  // don't...
            masked = true;
			COLLECT.play();
			document.getElementById("player_img").src = "src/player/player_masked.gif";
			clearInterval(getMask);
			clearTimeout(playerNeutral);
		}
	}, PERSON_SPEED);
	
	setTimeout(function () {
        if (!masked) graduallyFadeAndRemoveElement(mask);
    }, maskGone)
}

function astSpawnVaccine() {
    console.log("Vaccine on the way!!");
    var objectString;
    objectString = "<div id = 'v-" + currentAstroid + "' class = 'curAstroid' > <img src = 'src/vacc.gif'/></div>";
    onScreenAstroid.append(objectString);
    var vacc = $('#v-' + currentAstroid);

    var posx;
    var posy;
    currentAstroid;
    posx = Math.floor(Math.random() * (1220));
    posy = Math.floor(Math.random() * (680));
    vacc.css("top", posy);
	vacc.css("right", posx);
	
    var getVacc;
    getVacc = setInterval(function () {
        if (isColliding(vacc, player)) {
            vacc.remove();
            COLLECT.play();
            reset_and_transition("ast");

            //Transition  to galaga
            touched = true;
            document.getElementById("player_img").src = "src/transform.gif";
            clearInterval(getVacc);
            clearInterval(astMove);
            clearInterval(maskSpawn);
            clearInterval(spike);
            setTimeout(function() {
                $('.curAstroid').empty();
                AsteroidSection.css("z-index", 0);
                touched = false;
                player.remove();
                
                galStartSection();
            }, 2000);
        }
    }, PERSON_SPEED)
    setTimeout(function () {
        graduallyFadeAndRemoveElement(vacc);
    },vaccineGone)
}
function graduallyFadeAndRemoveElement(elementObj) {
    // Fade to 0 opacity over 2 seconds
    elementObj.fadeTo(2000, 0, function () {
        $(this).remove();
    });
}

function spawn(){
    var objectString;
    objectString = "<div id = 'a-" + currentAstroid + "' class = 'curAstroid' > <img src = 'src/covidstriod1.png'/></div>";
    onScreenAstroid.append(objectString);
    var thisAst = $('#a-' + currentAstroid);
    thisAstImg = $('#a-' + currentAstroid + " img");
    currentAstroid++;


    x = getRandomNumber(0, 1280); // axis = 0
    y = getRandomNumber(0, 720); // axis = 1

    floor = 784;
    ceiling = -64;
    left = 1344;
    right = -64;

    major_axis = Math.floor(getRandomNumber(0, 2)); //decides wether astriods comes from x or y surface
    
    //for minor axis, 0 is left/floor, 1 is right/ceiling
    minor_aix =  Math.floor(getRandomNumber(0, 2)); //if major axis is x then this decides ceiling or floor and visa versa

    let num_ticks = 0;

    let x_dest = 0;
    let y_dest = 0;

    let hide_axis = 'x';
    let hide_after = 0;
    let sign_of_switch = 'neg';

    if(major_axis == 0 && minor_aix == 0)
    {
        // major = x
        // minor = floor
        thisAst.css("top", floor);
        thisAst.css("right", x);
        let bottomOfScreen = GameScreen.height();
		num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed);

        x_dest = (GameScreen.width() - x);
        x_dest = (x_dest - x)/num_ticks + getRandomNumber(-.5,.5);
        y_dest = -astProjectileSpeed - getRandomNumber(0, .5);
        
        hide_axis = 'y';
        hide_after = -64;
        sign_of_switch = 'neg';
    }
    if(major_axis == 0 && minor_aix == 1)
    {
        // major = x
        // y = ceiling
        thisAst.css("top", ceiling);
        thisAst.css("right", x);
        let bottomOfScreen = GameScreen.height();
		num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed);
        
        x_dest = (GameScreen.width() - x);
        x_dest = (x_dest - x)/num_ticks + getRandomNumber(-.5,.5);
        y_dest = astProjectileSpeed + getRandomNumber(0, .5);
        hide_axis = 'y';
        hide_after = 784;
        sign_of_switch = 'pos';
    }
    if(major_axis == 1 && minor_aix == 0)
    {
        // minor = y
        // y = left
        thisAst.css("top", y);
        thisAst.css("right", left);
        let bottomOfScreen = GameScreen.width();
		num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed);

        
        x_dest = -astProjectileSpeed - getRandomNumber(0, .5);
        y_dest = (GameScreen.height() - y);
        //y_dest = (y_dest - y)/num_ticks;
        y_dest = (y_dest - y)/num_ticks + getRandomNumber(-.5,.5);
        hide_axis = 'x';
        hide_after = -64;
        sign_of_switch = 'neg';
    }
    if(major_axis == 1 && minor_aix == 1)
    {
        // minor = y
        // y = right
        thisAst.css("top", y);
        thisAst.css("right", right);
        let bottomOfScreen = GameScreen.width();
		num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed);


        x_dest = astProjectileSpeed + getRandomNumber(0, .5);
        y_dest = (GameScreen.height() - y );
        y_dest = (y_dest - y)/num_ticks + getRandomNumber(-.5,.5);
        //y_dest = (y_dest - y)/num_ticks;
        hide_axis = 'x';
        hide_after = 1344;
        sign_of_switch = 'pos';
    }
    console.log("major spawn point: " + major_axis + " minor speed towards destination: " + minor_aix);
    console.log("top spawn point: " + thisAst.css("top") + " right spawn point: " + thisAst.css("right")  + " x speed towards destination: " + x_dest + " y speed towards destination: " + y_dest);
    setTimeout(spawn_helper(thisAst, num_ticks, x_dest, y_dest, 0, 0, hide_axis, hide_after, sign_of_switch),0);
}


function spawn_helper(aster, iterationsLeft, x_dest, y_dest, currentRotation, galCovMetSpin, hide_axis, hide_after, sign_of_switch){

    let astermovement = setInterval( function() {
        if (!setOpen && !touched) {

            currentRotation += galCovMetSpin;
            aster.css('transform','rotate('+currentRotation+ 'deg)');

			if (isColliding(aster, player)) {                
				if (!masked)
					diediedie(aster, astermovement);
				else {
                    REMOVE.play();
					aster.remove();
					clearTimeout(playerNeutral);
					document.getElementById("player_img").src = "src/player/player.gif";
					masked = false;
                }
			}
            
            if(iterationsLeft <= 0)
            {
                aster.remove();  
                clearInterval(astermovement);
            }
            let newPosY = parseInt(aster.css('top'))+y_dest;
            aster.css('top', newPosY);
            let newPosX = parseInt(aster.css('right'))+x_dest;
            aster.css('right', newPosX);

            if(hide_axis == 'x')
            {
                if(sign_of_switch == 'pos')
                {
                    if(parseInt(aster.css('right')) > hide_after)
                    {
                        aster.remove();
                        clearInterval(astermovement);
                    }                    
                }
                else
                {
                    if(parseInt(aster.css('right')) < hide_after)
                    {
                        aster.remove();
                        clearInterval(astermovement);
                    }          
                }
            }
            else
            {
                if(sign_of_switch == 'pos')
                {
                    if(parseInt(aster.css('top')) > hide_after)
                    {
                        aster.remove();
                        clearInterval(astermovement);
                    }                    
                }
                else
                {
                    if(parseInt(aster.css('top')) < hide_after)
                    {
                        aster.remove();
                        clearInterval(astermovement);
                    }          
                }
            }

		    iterationsLeft -= 1;
		}
    },GAL_OBJECT_REFRESH_RATE)
}

/*
function astSpawnCovid() {
    console.log("Generating Asteroid");
    var objectString;
    objectString = "<div id = 'a-" + currentAstroid + "' class = 'curAstroid' > <img src = 'src/covidstriod1.png'/></div>";
    onScreenAstroid.append(objectString);
    var thisAst = $('#a-' + currentAstroid);
    thisAstImg = $('#a-' + currentAstroid + " img");
    currentAstroid++;
    var startx;
    var endx;
        var starty;
    var endy;
    if (currentAstroid % 2 == 0) { //Out of bounds from top
        starty = 0; //Get value from bottom of screen
        endy = 720; //End at vlue top of screen
        startx = Math.floor(Math.random() * (1280));
        endx = Math.floor(Math.random() * (1280));
    }
    else if (currentAstroid % 3 == 0) {//out of bounds from bottom
        starty = 0; //Get value from top of screen
        endy = 720; //End at value bottom of screen
        startx = Math.floor(Math.random() * (1280));
        endx = Math.floor(Math.random() * (1280)); //End at value to left of screen
    }
    else if (currentAstroid % 4 == 0) {//out of bounds from left
        starty = Math.floor(Math.random() * (720)); //Get value from bottom of screen
        endy = Math.floor(Math.random() * (720)); //End at vlue top of screen
        startx = 1280; //Get value to right of screen
        endx = 0; //End at value to left of screen
    }
    else {//out of bounds from right
        starty = Math.floor(Math.random() * (720)); //Get value from bottom of screen
        endy = Math.floor(Math.random() * (720)); //End at vlue top of screen
        startx = 0; //Get value to left of screen
        endx = 1280; //End at value to right of screen
    }
    thisAst.css("top", starty);
    thisAst.css("left", startx);
    var floating;
    let spin = Math.floor(Math.random() * 120);
    let spinFactor = Math.floor(Math.random()  *  10);
	floating = setInterval(function () {
		if (!setOpen && !touched) {
			spin += spinFactor;
			var newposx = parseInt(thisAst.css("left")) + astdir(startx, endx);
			var newposy = parseInt(thisAst.css("top")) + astdir(starty, endy);
			thisAst.css('transform', 'rotate(' + spin + 'deg)');

			if (outOfBounds(startx, starty, newposx, newposy, endx, endy)) {
				thisAst.remove();
				clearInterval(floating);
			}
			
			if (isColliding(thisAst, player)) {                
				if (!masked)
					diediedie(thisAst, floating);
				else {
					thisAst.remove();
					document.getElementById("player_img").src = "src/player/player.gif";
					masked = false;
                }
			}
			thisAst.css("top", newposy);
			thisAst.css("left", newposx);
		}

    }, AST_OBJECT_REFRESH_RATE)
}
*/

function diediedie(thisAst, floating) {
    touched = true;
    clearInterval(pointStack);
    DIE.play();
    document.getElementById("player_img").src = "src/player/player_touched.gif";
    setTimeout(thisAst.remove, 2000);
    clearInterval(floating);
    clearInterval(astVaccine);
    clearInterval(astCovMetSpawn);
    clearInterval(astMove);
    clearInterval(pointStack);
    clearInterval(maskSpawn);
	clearTimeout(playerNeutral);
    clearInterval(spike);
    setTimeout(function () {

        $('.asteroidSection').remove();

        $('#actualGame').append("<div class= 'asteroidSection'><div class = 'curAstroid'></div></div>");
        AsteroidSection = $('.asteroidSection');
        onScreenAstroid = $('.curAstroid');
        mainMenu.show();
        if (score > Highest_score[9]["Score"]) {
            menu_buttons.hide();
            score_enter.show();
        }
        GameScreen.hide();
        Gmwindow.data("inGame", false);
        music.pause();
        music.currentTime = 0;

        // astStartSection();
    }, 2000);
}

function astdir(start, end) {
    if (start < end)
        return astProjectileSpeed;
    else
        return -1*astProjectileSpeed;
}

function outOfBounds(startx, starty, curx, cury, endx, endy) {
    if (startx == 1280 && curx <= 0 ||(cury > 650 || cury < 0))
        return true;
    if (startx == 0 && curx >= 1220 || (cury > 650 || cury < 0))
        return true;
    if (starty == 0 && cury >= 680 || (curx > 1220 || cury < 0))
        return true;
    if (starty == 720 && cury <= 0 || (curx > 1220 || cury < 0))
        return true;
    return false;
}

// vvvvvvvvvvvvvvvvvvvv ASTEROIDS PLAYER MOVEMENT vvvvvvvvvvvvvvvvvvvv

function updateAst() {
	if (!setOpen) astMovePlayer();
}

function astMovePlayer() {
    //might need to change galMaxShipx/y to maxPlayerx/y values
    //switch (arrow) {
        if (LEFT) { // left arrow
			let newPos = parseInt(player.css('left')) - PERSON_SPEED;
			
            if (masked) document.getElementById("player_img").src = "src/player/player_masked_left.gif";
			else document.getElementById("player_img").src = "src/player/player_left.gif";
			
            if (newPos < 0) {
                newPos = 0;
            }
            player.css('left', newPos);
            //break;
        }
        if (RIGHT) { // right arrow
			let newPos = parseInt(player.css('left')) + PERSON_SPEED;
			
            if (masked) document.getElementById("player_img").src = "src/player/player_masked_right.gif";
			else document.getElementById("player_img").src = "src/player/player_right.gif";
			
            if (newPos > maxPersonPosX) {
                newPos = maxPersonPosX;
            }
            player.css('left', newPos);
            //break;
        }
        if (UP) { // up arrow
			let newPos = parseInt(player.css('top')) - PERSON_SPEED;
            if (masked) document.getElementById("player_img").src = "src/player/player_masked_up.gif";
			else document.getElementById("player_img").src = "src/player/player_up.gif";
            if (newPos < 0) {
                newPos = 0;
            }
            player.css('top', newPos);
            //break;
        }
        if (DOWN) { // down arrow
            let newPos = parseInt(player.css('top')) + PERSON_SPEED;
            if (masked) document.getElementById("player_img").src = "src/player/player_masked_down.gif";
            else document.getElementById("player_img").src = "src/player/player_down.gif";
            if (newPos > maxPersonPosY) {
                newPos = maxPersonPosY;
            }
            player.css('top', newPos);
            //break;
        }
    //}
}

//======================END ASTROIDS=====================





// ==============================================
// =========== Utility Functions Here ===========
// ==============================================

document.onkeydown = function(e) {
	if (e.keyCode == KEYS.left) LEFT = true;
	if (e.keyCode == KEYS.right) RIGHT = true;
	if (e.keyCode == KEYS.up) UP = true;
	if (e.keyCode == KEYS.down) DOWN = true;
	if (e.keyCode == KEYS.spacebar) SHOOT = true;
	if (e.keyCode == KEYS.escape) {
		if (!credOpen) {
            if (counting && setOpen) {
                counting = false;
                countdown.forEach((element) => clearTimeout(element));
                $('#GetReady').remove();
                show_set();
            }
			else if (!setOpen) show_set();
			else show_return();
		}
    }
}

document.onkeyup = function (e) {
	if (inAsteroidsSection) {
		playerNeutral = setTimeout(function () {
			if (!touched) { 
				if (masked) document.getElementById("player_img").src = "src/player/player_masked.gif";
				else document.getElementById("player_img").src = "src/player/player.gif";
			}
		}, 1200);
	}
	if (e.keyCode == KEYS.left) LEFT = false;
	if (e.keyCode == KEYS.right) RIGHT = false;
	if (e.keyCode == KEYS.up) UP = false;
	if (e.keyCode == KEYS.down) DOWN = false;
    if (e.keyCode == KEYS.spacebar) SHOOT = false;
}

// Are two elements currently colliding?
function isColliding(o1, o2) {
  return isOrWillCollide(o1, o2, 0, 0);
}

// Will two elements collide soon?
// Input: Two elements, upcoming change in position for the moving element
function willCollide(o1, o2, o1_xChange, o1_yChange){
  return isOrWillCollide(o1, o2, o1_xChange, o1_yChange);
}

// Are two elements colliding or will they collide soon?
// Input: Two elements, upcoming change in position for the moving element
// Use example: isOrWillCollide(paradeFloat2, person, FLOAT_SPEED, 0)
function isOrWillCollide(o1, o2, o1_xChange, o1_yChange){
  const o1D = { 'left': o1.offset().left + o1_xChange,
        'right': o1.offset().left + o1.width() + o1_xChange,
        'top': o1.offset().top + o1_yChange,
        'bottom': o1.offset().top + o1.height() + o1_yChange
  };
  const o2D = { 'left': o2.offset().left,
        'right': o2.offset().left + o2.width(),
        'top': o2.offset().top,
        'bottom': o2.offset().top + o2.height()
  };
  // Adapted from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  if (o1D.left < o2D.right &&
    o1D.right > o2D.left &&
    o1D.top < o2D.bottom &&
    o1D.bottom > o2D.top) {
     // collision detected!
     return true;
  }
  return false;
}



// Get random number between min and max integer
function getRandomNumber(min, max){
  return (Math.random() * (max - min)) + min;
}




// ==============================================
// ================ CREDITS =====================
// ==============================================

function show_credits() {
    if(credits_section.is(":visible"))
    {
		credOpen = false;
        credits_section.hide();
    }
    else
	{
		CONFIRM.play();
		credOpen = true;
        credits_section.show();
        if ( credits_section.children().length == 0 ) {
            credits_section.append('<h1>Creators</h1>');
            credits_section.append('<h2>Jack Ferguson</h2>');
            credits_section.append('<h2>Pujan Moradiya</h2>');
            credits_section.append('<h2>Manuel Rodriguez</h2>');
            credits_section.append('<h2>Calvin Tran</h2>');
            credits_section.append('<h3>Assets Used</h3>');
            credits_section.append('<a>Menu Slider: www.w3schools.com</a>');
            credits_section.append('<br>');
            credits_section.append('<br>');
            credits_section.append('<a>COVID Background Image: https://unsplash.com/@fusion_medical_animation</a>');
            credits_section.append('<br>');
            credits_section.append('<br>');
            credits_section.append('<a>Code from EECS 493 Assignment 2</a>');
        }
    }

}


// ==============================================
// ============== LEADERBOARD ===================
// ==============================================

function show_leader_board() {
    if(leaderboard.is(":visible"))
    {
		credOpen = false;
        leaderboard.hide();
    }
    else
	{
		CONFIRM.play();
		credOpen = true;
        Highest_score.sort(score_comp);
        leaderboard.empty();
        leaderboard.show();
        leaderboard.append('<h1>' + '1. ' + Highest_score[0]['Name'] + ': ' + Highest_score[0]['Score'] + '</h1>');
        leaderboard.append('<h1>' + '2. ' + Highest_score[1]['Name'] + ': ' + Highest_score[1]['Score'] + '</h1>');
        leaderboard.append('<h1>' + '3. ' + Highest_score[2]['Name'] + ': ' + Highest_score[2]['Score'] + '</h1>');
        leaderboard.append('<h1>' + '4. ' + Highest_score[3]['Name'] + ': ' + Highest_score[3]['Score'] + '</h1>');
        leaderboard.append('<h1>' + '5. ' + Highest_score[4]['Name'] + ': ' + Highest_score[4]['Score'] + '</h1>');
        leaderboard.append('<h1>' + '6. ' + Highest_score[5]['Name'] + ': ' + Highest_score[5]['Score'] + '</h1>');
        leaderboard.append('<h1>' + '7. ' + Highest_score[6]['Name'] + ': ' + Highest_score[6]['Score'] + '</h1>');
        leaderboard.append('<h1>' + '8. ' + Highest_score[7]['Name'] + ': ' + Highest_score[7]['Score'] + '</h1>');
        leaderboard.append('<h1>' + '9. ' + Highest_score[8]['Name'] + ': ' + Highest_score[8]['Score'] + '</h1>');
        leaderboard.append('<h1>' + '10. ' + Highest_score[9]['Name'] + ': ' + Highest_score[9]['Score'] + '</h1>');
        leaderboard.append("<button type='Settings' onClick='show_leader_board()'>Return to Main Menu</button>");
    }
}

function score_comp(a, b) {
    if (a["Score"] > b["Score"]) {
      return -1;
    }
    if (a["Score"] < b["Score"]) {
      return 1;
    }
    return 0;
}

function submitName() {
    if (document.getElementById("ScoreInput").value != "") {
        Highest_score.push({ "Name": document.getElementById("ScoreInput").value, "Score": score });
    }
    menu_buttons.show();
    score_enter.hide();
}