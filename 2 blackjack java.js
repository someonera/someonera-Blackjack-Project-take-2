
// Welcome to BlackJack! 
// 

var cardValues = [2,3,4,5,6,7,8,9,10,"J","Q","K","A"]
var cardSuits = ["♥", "♦", "♣", "♠"]
var deck = []
var playerHand = []
var dealerHand = [] 

// function for hiding the buttons

function hideButtons() {
  var x = document.getElementById("hitButton"); 
  x.style.display = "none"
  var y = document.getElementById("standButton"); 
  y.style.display = "none"
}

///make the deck of cards

function makeDeck() {
  for (let i = 0; i < cardValues.length; i++) {
    for (let j = 0; j < cardSuits.length; j++) {
      deck.push([cardValues[i], cardSuits[j]])
    }
  }
}

// shuffle the cards: 

function shuffle(thing){
  for (let i = thing.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i) 
    const temp = thing[i]
    thing[i] = thing[j]
    thing[j] = temp
  }
}

makeDeck()
shuffle(deck)


// initiate the  the game: 

function playGame() {

   playerHand = [deck.pop(), deck.pop()]
   dealerHand = [deck.pop()]

  if (playerHand[0][1] === "♥" || playerHand[0][1] === "♦") {
    $("#playerCard1").removeClass("cardSpace");
    $("#playerCard1").addClass("cardRed")
  } else if ( playerHand[0][1] == "♣" || playerHand[0][1] == "♠") {
    $("#playerCard1").removeClass("cardSpace");
    $("#playerCard1").addClass("cardBlack")
  }

  if ( playerHand[1][1] == "♥" || playerHand[1][1] == "♦") {
    $("#playerCard2").removeClass("cardSpace");
    $("#playerCard2").addClass("cardRed")
  } else if ( playerHand[1][1] == "♣" || playerHand[1][1] == "♠") {
    $("#playerCard2").removeClass("cardSpace");
    $("#playerCard2").addClass("cardBlack")   
  }

  if ( dealerHand[0][1] == "♥" || dealerHand[0][1] == "♦") {
    $("#dealerCard1").removeClass("cardSpace");
    $("#dealerCard1").addClass("cardRed")
  } else if ( dealerHand[0][1] == "♣" || dealerHand[0][1] == "♠") {
    $("#dealerCard1").removeClass("cardSpace");
    $("#dealerCard1").addClass("cardBlack") 
  }   

  $("#playerCard1").text(playerHand[0].join(""))
  $("#playerCard2").text(playerHand[1].join(""))
  $("#dealerCard1").text(dealerHand[0].join(""))


  $("#playerTotal").text("Score: " + handValue(playerHand))
  $("#dealerTotal").text("Score: " + handValue(dealerHand))

  if (handValue(playerHand) == 21) {
    $("#result").text(" 🤩 BLACKJACK! 🤩").removeClass("greenfont").addClass("resultFont")
    hideButtons()
  } 
}

playGame()


// find the hand value 

function handValue(hand) {
   
  var value = 0
  var handNumbers = []
  var numberOfAces = 0

  for (let i = 0; i < hand.length; i++) {
    handNumbers.push(hand[i][0])
  }

  for (let j = 0; j < handNumbers.length; j++) {
    if (typeof handNumbers[j] === 'number') {
      value = value + handNumbers[j]
    }
    if (handNumbers[j] === "J" || handNumbers[j] === "Q" || handNumbers[j] === "K") {
      value = value + 10
    }
   
    if (handNumbers[j] === "A") {
      value = value + 11
      numberOfAces++
    }
  }

  while (numberOfAces) {
    if (value > 21)
    value = value - 10
    numberOfAces--
  }

  return value   
}
   

// function to hit 

function hitMe() {
  playerHand.push(deck.pop())

  if (playerHand.length === 3) {
    if (playerHand[2][1] === "♥" || playerHand[2][1] === "♦") {
      $("#playerCard3").removeClass("cardSpace").addClass("cardRed"); 
    } else {
      $("#playerCard3").removeClass("cardSpace").addClass("cardBlack"); 
    }
    $("#playerCard3").text(playerHand[2].join(""))
  }
  
  if (playerHand.length === 4) {
    if (playerHand[3][1] === "♥" || playerHand[3][1] === "♦") {
      $("#playerCard4").removeClass("cardSpace").addClass("cardRed"); 
    } else {
      $("#playerCard4").removeClass("cardSpace").addClass("cardBlack"); 
    }
    $("#playerCard4").text(playerHand[3].join(""))
  }

  if (playerHand.length === 5) {
    if (playerHand[4][1] === "♥" || playerHand[4][1] === "♦") {
      $("#playerCard5").removeClass("cardSpace").addClass("cardRed"); 
    } else {
      $("#playerCard5").removeClass("cardSpace").addClass("cardBlack"); 
    }
    $("#playerCard5").text(playerHand[4].join(""))
  }

  $("#playerTotal").text("Score: " + handValue(playerHand))

  if (handValue(playerHand) > 21) {
    $("#result").text("BUST! 🙁").removeClass("greenfont").addClass("resultFont")
    hideButtons()    
  } 

}


/// stand & conclude the game 

function stand() {

  // dealer has to take more cards
  while (handValue(dealerHand) < 17) {
    dealerHand.push(deck.pop());
 
    if (dealerHand.length === 2) {
      if (dealerHand[1][1] === "♥" || dealerHand[1][1] === "♦") {
        $("#dealerCard2").removeClass("cardSpace").addClass("cardRed"); 
      } else {
        $("#dealerCard2").removeClass("cardSpace").addClass("cardBlack"); 
      }
     $("#dealerCard2").text(dealerHand[1].join(""))
    }
    
    if (dealerHand.length === 3) {
      if (dealerHand[2][1] === "♥" || dealerHand[2][1] === "♦") {
        $("#dealerCard3").removeClass("cardSpace").addClass("cardRed"); 
      } else {
        $("#dealerCard3").removeClass("cardSpace").addClass("cardBlack"); 
      }  
        $("#dealerCard3").text(dealerHand[2].join(""))
    }

    $("#dealerTotal").text("Score: " + handValue(dealerHand))
  }

   // final result of the game: 
   if (handValue(playerHand) <= 21) {
    if (handValue(playerHand) == handValue(dealerHand)) {
      $("#result").text("Draw! 🤷 ").removeClass("greenfont").addClass("resultFont")
      hideButtons()
    } else if (handValue(playerHand) > handValue(dealerHand) || handValue(dealerHand) > 21) {
      $("#result").text(" 🤩 You Win! 🤩").removeClass("greenfont").addClass("resultFont")
      hideButtons()
    } else {
      $("#result").text("You Lose! 🙁").removeClass("greenfont").addClass("resultFont")
      hideButtons()
    }
  }

}


// deal again: 
function playAgain() {
  location.reload()
}