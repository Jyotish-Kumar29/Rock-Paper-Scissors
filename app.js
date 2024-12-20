let body = document.querySelector("body");
let rock = body.querySelector("#rock");
let paper = body.querySelector("#paper");
let scissors = body.querySelector("#scissors");
let buttons = body.querySelectorAll(".buttons");
let chosen = body.querySelector("#chosen");
let chosenDivs = chosen.querySelectorAll("div");
let yourChoiceImage = chosenDivs[0].querySelector("img");
let computerChoiceImage = chosenDivs[1].querySelector("img");
let buttonList = body.querySelector(".button-list");
let possibleChoices = buttonList.querySelectorAll("button");
let scores = body.querySelector(".scores");
let scoresList = scores.querySelectorAll("li");
let nextRound = body.querySelector("#next-round");
let newGame = body.querySelector("#new-game");
let roundNo = body.querySelector("#round-no");
let roundResult = body.querySelector("#round-result");


let yourChoiceIndex, computerChoiceIndex;
let yourScore = 0, computerScore = 0, drawScore = 0;
let roundNumber = 1;

let clicked = [false, false, false];

src_choice = (index)=>{
    let src;
    if( index === 0){
        src = "images/rock.png";
    } else if(index === 1){
        src = "images/paper.png";
    } else if(index === 2){
        src = "images/scissors.png"
    }

    return src;
};

disableButtons = ()=>{
    possibleChoices.forEach((btn) => {
        btn.disabled = true;
    });
};

enableButtons = ()=>{
    possibleChoices.forEach((btn) => {
        btn.disabled = false;
    });
};

increaseScore = (c1, c2)=>{
    if(c1 == c2){
        drawScore += 1;
        return "Draw";
    } else if((c1===0 && c2===2) ||
                (c1===1 && c2===0) ||
                (c1===2 && c2===1)){

                    yourScore += 1;
        return `You won round ${roundNumber}.`;
    } else {
        computerScore += 1;
        return `You lose round ${roundNumber}.`;
    }
}

updateScorecard = ()=>{
    s1 = 'Your Score : ';
    s2 = 'Computer Score : ';
    s3 = 'Draw : ';

    scoresList[0].textContent = s1.concat(yourScore.toString());
    scoresList[1].textContent = s2.concat(computerScore.toString());
    scoresList[2].textContent = s3.concat(drawScore.toString());
}

buttons.forEach((button, index) => {
    button.addEventListener('mouseover', ()=>{
        if(clicked[index] === false)
        button.classList.add('dimmed');
    })
});

buttons.forEach((button, index) => {
    button.addEventListener('mouseout', ()=>{
        if(clicked[index] === false){
            button.classList.remove('dimmed');
        }
    })
});

buttons.forEach((button, index) => {
    button.addEventListener('click', ()=>{
        if(!clicked[index]){

            yourChoiceIndex = index;
            clicked[0] = true;
            clicked[1] = true;
            clicked[2] = true;

            button.classList.add('dimmed');
            computerChoiceIndex = Math.floor( Math.random() * 3);

            disableButtons();

            yourChoiceImage.src = src_choice(index);
            computerChoiceImage.src = src_choice(computerChoiceIndex);

            chosenDivs[0].classList.remove('not-visible');
            chosenDivs[1].classList.remove('not-visible');
            nextRound.classList.remove('not-visible');

            roundResult.textContent = increaseScore(yourChoiceIndex, computerChoiceIndex);
            roundResult.classList.remove('not-visible');

            updateScorecard();
        }
    })
});

nextRound.addEventListener('click', ()=>{
    enableButtons();

    clicked[0] = false;
    clicked[1] = false;
    clicked[2] = false;

    for(let i = 0; i<3; i++){
        buttons[i].classList.remove('dimmed');
    }
    chosenDivs[0].classList.add('not-visible');
    chosenDivs[1].classList.add('not-visible');
    roundResult.classList.add('not-visible');

    let round = "Round ";
    roundNumber += 1;
    roundNo.textContent = round.concat(roundNumber.toString());

    nextRound.classList.add('not-visible');
})

newGame.addEventListener('click', ()=>{
    enableButtons();

    clicked[0] = false;
    clicked[1] = false;
    clicked[2] = false;

    for(let i = 0; i<3; i++){
        buttons[i].classList.remove('dimmed');
    }
    chosenDivs[0].classList.add('not-visible');
    chosenDivs[1].classList.add('not-visible');
    roundResult.classList.add('not-visible');

    yourScore = 0;
    computerScore = 0;
    drawScore = 0;
    roundNumber = 1;

    let round = "Round ";
    roundNo.textContent = round.concat(roundNumber.toString());
    nextRound.classList.add('not-visible');

    updateScorecard();
})

