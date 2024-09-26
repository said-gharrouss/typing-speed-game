let buttonStart = document.querySelector(".start-playing");
let inputText = document.querySelector("input");
let wordsArea = document.querySelector(".words-area");
let timeSpan = document.querySelector(".time span");
let timeInfo = document.querySelector(".info-area span:nth-child(2)");
let levels = Array.from(document.querySelectorAll(".game-level ul li"));
let levelInfo = document.querySelector(".info-area span:nth-child(1)");
let gameOver = document.querySelector(".game-over");
let congratz = document.querySelector(".congratz");
let score = document.querySelector(".score");
let scoreFrom = document.querySelector(".score-from");
let playAgain = document.querySelector(".play-again");


let arrofWords = [
  // Morocco
  "Wydad",
  "Raja",
  "Mco",

  // Egypt
  "Ahly",
  "Zamalek",
  "Ismaily",

  // Saudi Arabia
  "Hilal",
  "Nasr",
  "Ittihad",

  // Spain
  "Barcelona",
  "Madrid",
  "Atletico",

  // Italy
  "Juventus",
  "Milan",
  "Inter",

  // Germany
  "Bayern",
  "Dortmund",
  "Leverkusen",

  // France
  "Paris",
  "Marseille",
  "Lyon",

  // England
  "United",
  "Liverpool",
  "Chelsea",
  "Arsenal",
  "City",
  "Tottenham",

  // Portugal
  "Porto",
  "Benfica",
  "Sporting"
];

function shuffle(){
    // set variable current that has the length value of array minus 1
    let current = arrofWords.length - 1;

    // set the variable temp
    let temp;
    
    while(current > -1){

        // create a random number from the current variable
        let randomNumber = Math.floor(Math.random() * current);

        // give tha variable temp the value of arrofWords[current]
        temp = arrofWords[current]; 

        // give the arrofWords[current] the value of arrofWords[randomNumber]
        arrofWords[current] = arrofWords[randomNumber];

        // give the arrofWords[randomNumber] the value of temp
        arrofWords[randomNumber] = temp;

        // decrase the value of current by 1
        current--;
    }

    return arrofWords;

}
shuffle();

// disable Past Evenet
inputText.onpaste = () => {
    return false;
}

// give the scoreFrom element a value of words length
scoreFrom.innerHTML = arrofWords.length;
let index = 0;

// set the event click to the button start
buttonStart.onclick = ()=>{
    // blocked the click on the levels
    document.querySelector(".game-level").style.pointerEvents = "none"; 

    // start to focus on the input 
    inputText.focus();

    // get the function showTheWords
    showTheWords();

    // get the function runTheCounter
    runTheCounter();
}

function setTimeAndLevel(){
    levels.forEach((level)=>{
        level.addEventListener("click",()=>{
            levelInfo.innerHTML = level.textContent;
            timeInfo.innerHTML = level.getAttribute("data-time");
            timeSpan.textContent = timeInfo.textContent;
        })
    })
}
setTimeAndLevel();
timeSpan.textContent = timeInfo.textContent;

function runTheCounter(){
    setInterval(()=>{
        // set length of Words
        let numberOfWords = arrofWords.length;

        // check if time value is greater than 0 to start decreasing  the time value by 1 
        if(timeSpan.textContent > 0){

            // decreasing the time value by 1
            parseInt(timeSpan.textContent--)

            // check if the time value equal to 0 
            if(timeSpan.textContent == 0){
                console.log(inputText.value);
                console.log(buttonStart.textContent);

                // check if the value of the input equal to the value of the word
                if(inputText.value.toLocaleLowerCase() == buttonStart.textContent.toLocaleLowerCase()){

                    // add the index value by 1
                    index++;

                    // get the function corectWord
                    corectWord(numberOfWords,index);
                } else{
                    // get the gameOver element and give them display block
                    gameOver.style.display = "block";

                    // get the playAgain element and give them display block
                    playAgain.style.display = "block";
                }
            }
        }
    },1000);
}

function corectWord(length,index){
    // remove the value from inputText
    inputText.value = "";

    // check if lenght of words greater than index
    if(length > index ){
        // add the score value by 1
        parseInt(score.textContent++);

        // return the time value to the value of timeInfo
        timeSpan.textContent = timeInfo.textContent;

        // get the function showTheWords to show the next word from the array of words
        showTheWords();
    }

    // check if length of words equal to index
    if(length == index){

        // add the score value by 1
        parseInt(score.textContent++);

        // get the congratz element and give them display block
        congratz.style.display = "block";

        // get the playAgain element and give them display block
        playAgain.style.display = "block";
    }
}

function showTheWords(){
    // replace buttonStart with the first word from arrofWords
    buttonStart.innerHTML = arrofWords[index];

    // add class btn-start-clicked to style the word 
    buttonStart.classList.add("btn-start-clicked");
    
    // remove content from wordsArea
    wordsArea.innerHTML = "";

    // add spans of words from arrofWords to wordsArea
    for(let i = index + 1; i < arrofWords.length; i++){
        // creat the span
        let span = document.createElement("span");

        // give the span a value of word from arrofWords
        span.textContent = arrofWords[i];
        
        // add class named word to style the span
        span.classList.add("word");

        // apend the span in the wordsArea
        wordsArea.appendChild(span);
    }
}

// we reload the page when the user click in the button playAgain
playAgain.addEventListener("click",()=>{
    location.reload();
})