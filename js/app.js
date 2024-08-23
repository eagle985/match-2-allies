/*-------------------------------- Constants --------------------------------*/


/*---------------------------- Variables (state) ----------------------------*/
let playerOne;
let playerTwo;
let firstCard;
let secondCard;
let firstCardImage;
let secondCardImage;
let winner;
let turn;
let flipDisable;
let timeLeft;
let timeClock;

/*------------------------ Cached Element References ------------------------*/

const cardHandEl = document.querySelectorAll('.card')

const scoreCardEL = document.querySelector('#scoreCard');

const messageEl = document.querySelector('#message');

const funFactEl = document.querySelector('#ruleTag');

const resetBtnEl = document.querySelector('#resetButton');

const playerOneScoreEL = document.querySelector('.scorecardScoreOne');
const playerTwoScoreEL = document.querySelector('.scorecardScoreTwo');

const countDownEl = document.querySelector("#countdown")

/*-------------------------------- Functions --------------------------------*/


const init = () => {

    turn = 'Player One';

    winner = false;

    playerOne = 0;

    playerTwo = 0;

    firstCardImage = null;

    secondCardImage = null;

    messageEl.textContent = `It is ${turn}'s turn!`

    flipDisable = false;

    timeLeft = 5;

}

const flipcard = (e) => {

    const cardFace = e.target.parentNode
    console.log(cardFace)
    const cardFaceParent = cardFace.parentNode
    const mainCard = cardFaceParent.parentNode
    if (!secondCard && !flipDisable) {
        const containsCardBack = cardFace.classList.contains("cardback")
        console.log(containsCardBack)

        if (containsCardBack) {
            cardFace.classList.add("hidden")
            cardFaceParent.querySelector(".cardfront").classList.remove("hidden")
        }
        else {
            return
        }

        if (!firstCard) {
            firstCardImage = cardFaceParent.querySelector(".cardfront").firstElementChild.src
            console.log("firstCardImage", firstCardImage)
            firstCard = mainCard

            countDownEl.textContent = timeLeft + " seconds remaining"
            timeClock = setInterval(() => {
                if (timeLeft <= 0) {
                    firstCard.firstElementChild.querySelector(".cardfront").classList.add("hidden")
                    firstCard.firstElementChild.querySelector(".cardback").classList.remove("hidden")
                    clearInterval(timeClock);
                    countDownEl.textContent = "Turn Ends!";
                    firstCard = null;
                    timeLeft = 5;
                    switchTurn()
                } else {
                    timeLeft -= 1;
                    countDownEl.textContent = timeLeft + " seconds remaining"
                }
            }, 1000);

        }
        else {
            clearInterval(timeClock)
            countDownEl.textContent = ""
            timeLeft = 5
            console.log(firstCard, mainCard)
            if (firstCard.id == mainCard.id) {
                console.log("same card clicked")
                return
            }
            secondCardImage = cardFaceParent.querySelector(".cardfront").firstElementChild.src
            console.log("secondCardImage", secondCardImage)
            secondCard = mainCard

            flipDisable = true

            const cardMatch = compareCard()

            if (cardMatch) {
                if (turn === "Player One") {
                    playerOne += 1;
                    playerOneScoreEL.textContent = playerOne;
                } else {
                    playerTwo += 1;
                    playerTwoScoreEL.textContent = playerTwo;
                }
                matchPoint()
                setTimeout(() => {
                    firstCard.innerHTML = ""
                    firstCard.classList.remove("cardfront-bkcolor")
                    secondCard.innerHTML = ""
                    secondCard.classList.remove("cardfront-bkcolor")
                    firstCard.style.border = "none"
                    secondCard.style.border = "none"

                    firstCard = null;
                    secondCard = null;
                    firstCardImage = null;
                    secondCardImage = null;
                    flipDisable = false;

                    if (playerOne !== 5 && playerTwo !== 5) {
                        switchTurn()
                    }
                }, 3000)

            } else {
                setTimeout(() => {
                    firstCard.firstElementChild.querySelector(".cardfront").classList.add("hidden")
                    firstCard.firstElementChild.querySelector(".cardback").classList.remove("hidden")

                    secondCard.firstElementChild.querySelector(".cardfront").classList.add("hidden")
                    secondCard.firstElementChild.querySelector(".cardback").classList.remove("hidden")

                    firstCard = null;
                    secondCard = null;
                    firstCardImage = null;
                    secondCardImage = null;
                    flipDisable = false;

                    switchTurn()

                }, 3000)


            }
        }


    }

}


const compareCard = () => {
    console.log(firstCardImage)
    console.log(secondCardImage)
    if (firstCardImage === secondCardImage) {
        console.log("it's a match")
        return true
    } else {
        return false
    }
}


const matchPoint = () => {
    if (playerOne === 5 || playerTwo === 5) {
        messageEl.textContent = `${turn} wins.`
        funFactEl.textContent = "Congratulations on the win! The flags of the countries used in this game represent the top eight countries in the world in 2024 for PISA overall student test scores in math, reading and science."
        flipDisable = true
    } else if (playerOne === 4 && playerTwo === 4) {
        messageEl.textContent = "It is a tie!"
        flipDisable = true;
    }
}

const switchTurn = () => {
    if (turn === "Player One") {
        turn = "Player Two"
    } else {
        turn = "Player One"
    }
    messageEl.textContent = `It is ${turn}'s turn!`
}


const restartGame = () => {
    location.reload();
}

/*----------------------------- Event Listeners -----------------------------*/
cardHandEl.forEach(suite => {
    suite.addEventListener("click", flipcard)
}
)

init()

resetBtnEl.addEventListener("click", restartGame)