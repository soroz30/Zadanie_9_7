window.onload = function() {
    var newGameBtn = document.getElementById('js-newGameButton');

    newGameBtn.addEventListener('click', newGame);

    var pickRock = document.getElementById('js-playerPick_rock'),
        pickPaper = document.getElementById('js-playerPick_paper'),
        pickScissors = document.getElementById('js-playerPick_scissors');

        pickRock.addEventListener('click', function() { playerPick('rock') });
        pickPaper.addEventListener('click', function() { playerPick('paper') });
        pickScissors.addEventListener('click', function() { playerPick('scissors') });

    var gameState = 'notStarted', //started //ended,
        player = {
            name: '',
            score: 0
        },
        computer = {
            score: 0
    };

    var newGameElem = document.getElementById('js-newGameElement'),
        pickElem = document.getElementById('js-playerPickElement'),
        resultsElem = document.getElementById('js-resultsTableElement');

    function setGameElements() {
        switch(gameState) {
            case 'started':
                newGameElem.style.display = 'none';
                pickElem.style.display = 'block';
                resultsElem.style.display = 'block';
                break;
            case 'ended':
                newGameBtn.innerText = 'Jeszcze raz';
            case 'notStarted':
            default:
                newGameElem.style.display = 'block';
                pickElem.style.display = 'none';
                resultsElem.style.display = 'none';
        }
    }

    setGameElements();

    var playerPointsElem = document.getElementById('js-playerPoints'),
        playerNameElem = document.getElementById('js-playerName'),
        computerPointsElem = document.getElementById('js-computerPoints');

    function newGame() {
        player.name = prompt('Please enter your name', 'imię gracza');
        if (player.name) {
            player.score = computer.score = 0;
            gameState = 'started';
            setGameElements();

            playerNameElem.innerHTML = player.name;
            setGamePoints();
        }
    }

    function getComputerPick() {
        var possiblePicks = ['rock', 'paper', 'scissors'];
        return possiblePicks[Math.floor(Math.random() *3)];
    }

    function playerPick(playerPick) {
        var computerPick = getComputerPick();

        playerPickElem.innerHTML = playerPick;
        computerPickElem.innerHTML = computerPick;

        checkRoundWinner(playerPick, computerPick);
    }

    var playerPickElem = document.getElementById('js-playerPick'),
        computerPickElem = document.getElementById('js-computerPick'),
        playerResultElem = document.getElementById('js-playerResult'),
        computerResultElem = document.getElementById('js-computerResult');

    function checkRoundWinner(playerPick, computerPick) {
        playerResultElem.innerHTML = computerResultElem.innerHTML = '';

        var winnerIs = 'player';

            if (playerPick == computerPick) {
                winnerIs = 'noone';
            } else if (
                (computerPick == 'rock' && playerPick == 'scissors') ||
                (computerPick == 'scissors' && playerPick == 'paper') ||
                (computerPick == 'paper' && playerPick == 'rock')) {

                winnerIs = 'computer';
            }

            if (winnerIs == 'player') {
                playerResultElem.innerHTML = "Win!";
                player.score++;
            } else if (winnerIs == 'computer') {
                computerResultElem.innerHTML  = "Win!";
                computer.score++;
            }
            setGamePoints();
            setTimeout(function() {
                processGameState();
            }, 10);
    }

    function processGameState() {
        var gameWinner = checkFinalWinner();
        if (gameWinner) {
            displayFinalWinner(gameWinner);
        }
        else {
            return;
        }
        gameState = 'ended';
        setGameElements();
    }

    function displayFinalWinner(gameWinner) {
        if (gameWinner == 'player') {
            alert('The final winner is ' + player.name);
        } else if (gameWinner == 'computer') {
            alert('The final winner is computer');
        } 
    }

    function checkFinalWinner() {
        var winnerIndex = [player.score, computer.score].indexOf(10);
        if (winnerIndex == 0) {
            return 'player';
        } else if (winnerIndex == 1) {
            return 'computer';
        } else if (winnerIndex == -1) {
            return false;
        }
    }

    function setGamePoints() {
        playerPointsElem.innerHTML = player.score;
        computerPointsElem.innerHTML = computer.score;
    }
}