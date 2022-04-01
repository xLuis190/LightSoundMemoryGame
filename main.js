function generateArray(n){
    for(var x = 0;x<=n;x++){
        pattern[x] = (Math.floor(Math.random() * 6) +1)
    }
    console.log(pattern)
}


function startGame(){
    //initialize game variables
    var diff = document.getElementById('difficulty')
    var value = diff.options[diff.selectedIndex].value;
    switch (value){
        case 'easy':
            generateArray(4)
            break;
        case 'normal':
            generateArray(9)
            break
        case 'hard':
            generateArray(14)
            break
    }
    elem.innerHTML = `${tries} tries`

    progress = 0;
    gamePlaying = true;
    document.getElementById("startBtn").classList.add("hidden");
    document.getElementById("stopBtn").classList.remove("hidden");
    playClueSequence()

}
function stopGame(){
    gamePlaying = false;
    document.getElementById("startBtn").classList.remove("hidden");
    document.getElementById("stopBtn").classList.add("hidden");

}
function lightButton(btn){
    document.getElementById("button"+btn).classList.add("lit")
  }
function clearButton(btn){
    document.getElementById("button"+btn).classList.remove("lit")
}
function playSingleClue(btn){
    if(gamePlaying){
      lightButton(btn);
      playTone(btn,clueHoldTime);
      setTimeout(clearButton,clueHoldTime,btn);
    }
}
function playClueSequence(){
    guessCounter = 0;
    context.resume()
    let delay = nextClueWaitTime; //set delay to initial wait time
    for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
      console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
      setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
      delay += clueHoldTime 
      delay += cluePauseTime;
    }
}
function loseGame(){
    stopGame();
    alert("Game Over. You lost.");
}
function winGame(){
    stopGame()
    alert("Game Over. You won!")
}
function guess(btn){
    
    console.log("user guessed: " + btn);
    
    if(!gamePlaying){
      return;
    }
    
    if(pattern[guessCounter] == btn){
      if(guessCounter == progress){
        if(progress == pattern.length - 1){
          winGame();
        }else{
          progress++;
          playClueSequence();
        }
      }else{
        guessCounter++;
      }
    }else{
        tries -=1
        if(tries == 0 ){
            loseGame()
            tries = 3
            elem.innerHTML = `${tries} tries`
        }
        else{
            alert(`Wrong one you have ${tries} left`)
            elem.innerHTML = `Wrong one you have ${tries} left`
            playClueSequence();
        }
        
      
    }
}    
