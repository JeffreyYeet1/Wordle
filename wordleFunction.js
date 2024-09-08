function submitGuess(word,guess){
    let colourCode = "";
    let index = 0;
    let wordLetters = {};
    if(guess == word)
        return "true";
    for(let x of word)
        wordLetters[x] = countUnique(word,x);
    for(let x of guess){
        if(word.includes(x)){
            if (!wordLetters[x]==0){
                if(x == word[index]){
                    colourCode+="2";
                    wordLetters[x]--;
                }
                else{
                    let temp = wordLetters[x];
                    if (temp != 0){
                        for(let i = index; i<5;i++){
                            if(guess[i]==word[i] && word[i] == x)
                                temp--;
                        }
                        if(temp!=0){
                            colourCode+="1";
                            wordLetters[x]--;
                        }
                        else
                            colourCode+="0";
                    }   
                    else
                        colourCode+="0";
                }
            }
            else
                colourCode+="0";
        }
        else
            colourCode+="0";
        index++;
    }
    return colourCode
}
function countUnique(w,l){
    let c = 0;
    for(x of w){
        if (x == l)
            c++;
    }
    return c;
}
function select_word(){
    let words = [
'forge', 'brave', 'plumb', 'shirk', 'flute', 'swarm', 'grasp', 'razor', 'spade', 'mirth',
'glove', 'blink', 'skirt', 'quirk', 'vixen', 'jumbo', 'oasis', 'wagon', 'hurry', 'glide',
'snarl', 'brawl', 'funky', 'gloat', 'squid', 'climb', 'chalk', 'jazzy', 'haste', 'frost',
'dwell', 'joint', 'dusky', 'latch', 'twirl', 'brisk', 'fizzy', 'trace', 'frown', 'smirk',
'pouch', 'fjord', 'knead', 'scope', 'evoke', 'ozone', 'jolly', 'abyss', 'ruddy', 'whisk',
'cinch', 'mound', 'amber', 'wharf', 'joust', 'funky', 'gland', 'yacht', 'waive', 'flank',
'drift', 'vowel', 'peach', 'forge', 'gruff', 'swoop', 'nudge', 'twine', 'spout', 'rinse',
'tally', 'latch', 'thump', 'giddy', 'chime', 'briny', 'wrist', 'jived', 'spicy', 'plush',
'knack', 'slump', 'fizzy', 'flaky', 'gleam', 'witty', 'plumb', 'tawny', 'lurid', 'nippy',
'tepid', 'plush', 'zesty', 'grime', 'boast', 'quirk', 'blimp', 'mound', 'forge', 'bluff'
];
    return words[Math.floor(Math.random() * words.length)];
}
function showBoxW() {
    document.getElementById("Given1").textContent = words;
    const box = document.getElementById('boxW');
    box.style.display = 'block'; // Show the box when button is clicked
  }
function showBoxL() {
    document.getElementById("Given").textContent = words;
    const box = document.getElementById('boxL');
    box.style.display = 'block'; // Show the box when button is clicked
}
function playAgain(){
    const alphabet = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
      ];
    const box = document.getElementById('boxW');
    box.style.display = 'none';
    const box1 = document.getElementById('boxL');
    box1.style.display = 'none';
    words = select_word().toUpperCase();
    for(let i = 0; i < 5;i++){
        for(let x = 0; x<6;x++){
            document.getElementById(x.toString()+i.toString()).innerHTML = "";
            document.getElementById("t"+x.toString()+i.toString()).style.outline = "2px solid rgb(58,58,60)"; 
            document.getElementById("t"+x.toString()+i.toString()).style.backgroundColor = "rgb(18,18,19)";
            }
    }
    for(x of alphabet)
        document.getElementById(x).style.backgroundColor = "rgb(129,131,132)";
    level = 0;
    win = false;
    kDisplay = {};
}

function getKeyByValue(object, value) {
    for (const key in object) {
      if (object.hasOwnProperty(key) && object[key] === value) {
        return key;
      }
    }
    return null; // Return null if the value is not found
}

function keyInput(a){        
    keyPressed = a.toString().toUpperCase();
    if(keyPressed === "BACKSPACE"){
        for(let i = 4; i > -1;i--){
            if (document.getElementById(level.toString()+i.toString()).innerHTML!=""){
                document.getElementById(level.toString()+i.toString()).innerHTML = "";
                document.getElementById("t"+level.toString()+i.toString()).style.outline = "2px solid rgb(58,58,60)"; 
                break;
            }
        }
    }
    if (keyPressed.toUpperCase() != keyPressed.toLowerCase()){
        if(keyPressed.length == 1){
            for(let i = 0; i < 5;i++){
                if (document.getElementById(level.toString()+i.toString()).innerHTML==""){
                    document.getElementById(level.toString()+i.toString()).innerHTML = keyPressed;
                    document.getElementById("t"+level.toString()+i.toString()).style.outline = "2px solid rgb(86,87,88)"; 
                    break;
                }
            }
        }
    }
    if (keyPressed === 'ENTER' && document.getElementById(level.toString()+"4").innerHTML !="") {
        let guess = "";
        for(let i = 0; i<5;i++){
            guess+= document.getElementById(level.toString()+i.toString()).innerHTML;
        }  
        let colorCode = submitGuess(words,guess);
        for(let x = 0;x < 5;x++){
            if(colorCode == "true"){
                for(let x = 0;x < 5;x++){
                    document.getElementById("t"+level.toString()+x.toString()).style.backgroundColor = "rgb(83,141,78)";
                    document.getElementById("t"+level.toString()+x.toString()).style.outline = "2px solid rgb(83,141,78)";
                }
                win = true;
            }
            else if(colorCode[x]=="0"){
                document.getElementById("t"+level.toString()+x.toString()).style.backgroundColor = "rgb(58,58,60)";
                document.getElementById("t"+level.toString()+x.toString()).style.outline = "2px solid rgb(58,58,60)";
                if (kDisplay[guess[x]] != "GREEN" && kDisplay[guess[x]] != "YELLOW"){
                    document.getElementById(guess[x]).style.backgroundColor = "rgb(58,58,60)";
                }
            }
            else if (colorCode[x] == "1"){
                document.getElementById("t"+level.toString()+x.toString()).style.backgroundColor = "rgb(181,159,59)";
                document.getElementById("t"+level.toString()+x.toString()).style.outline = "2px solid rgb(181,159,59)";
                if (kDisplay[guess[x]] != "GREEN"){
                    document.getElementById(guess[x]).style.backgroundColor = "rgb(181,159,59)";
                    kDisplay[guess[x]] = "YELLOW";
                }
            }   
            else if (colorCode[x] == "2"){
                document.getElementById("t"+level.toString()+x.toString()).style.backgroundColor = "rgb(83,141,78)";
                document.getElementById("t"+level.toString()+x.toString()).style.outline = "2px solid rgb(83,141,78)";
                document.getElementById(guess[x]).style.backgroundColor = "rgb(83,141,78)";
                kDisplay[guess[x]] = "GREEN";
            }
            if (!win && level == 6)
                win = false;
        }
        level = level + 1;
    }
    if(win || level == 6){
        if(!win){
            // Lose
            showBoxL();
            document.getElementsByClassName("word").innerHTML = words;
        }
        else{
            //Win
            showBoxW();
            document.getElementsByClassName("word").innerHTML = words;
        }
    }
}
var kDisplay = {};
var win = false;
var level = 0;
var words = select_word().toUpperCase();
// Attaching an event listener to the document to capture keyboard events
document.addEventListener('keydown', function(event) {
    const keyPressed = (event.key).toUpperCase();
    keyInput(keyPressed);
});

