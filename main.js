setTimeout(()=>document.querySelector(".developer").remove(), 5500)


document.querySelector(".start i").addEventListener("click" , ()=>{
    for(let i = 0; i < document.querySelector(".starting-page").childNodes.length; i++){
        if(document.querySelector(".starting-page").childNodes[i].nodeType !== 3){
            document.querySelector(".starting-page").childNodes[i].classList.add("out")
        }
    }
    setTimeout(()=>{
        let elements = Array.from(document.querySelectorAll(".out"))
        for(let i =0; i < elements.length; i++){
            if(i !== 1){
                elements[i].remove()
            }
        }
        setTimeout(()=> {
            document.querySelector(".starting-page").classList.add("out")
        }, 1000)
    }, 400)
    setTimeout(()=> {
        document.querySelector(".starting-page").remove()
    }, 1700)
})
let gameSound = document.getElementById("game")
document.querySelector(".top i.again").addEventListener("click" , ()=>{
    window.location.reload()
})
document.querySelector(".top i.sound").addEventListener("click" , ()=>{
    if(document.querySelector(".top i.sound").classList.contains("active")){
        document.querySelector(".top i.sound").classList.remove("active")
        document.querySelector(".top i.sound").classList.add("stop")
        gameSound.volume = 0.5
    }else if(document.querySelector(".top i.sound").classList.contains("stop")){
        document.querySelector(".top i.sound").classList.add("active")
        document.querySelector(".top i.sound").classList.remove("stop")
    }
    if(document.querySelector(".top i.sound").classList.contains("active")){
        gameSound.play()
        gameSound.volume = "0.3"
    }else if(document.querySelector(".top i.sound").classList.contains("stop")){
        gameSound.pause()
    }
})


let wordsNumber = 6
let triesNumber = 30
let letters = "abcdefghijklmnopqrstuvwxyz"
let game = document.querySelector(".main .field")
//create inputs
function createMainFeild(){
    let mainField = document.createElement("div")
    mainField.className = "main-field"
    for(let i = 0; i < wordsNumber; i++){
        let span = document.createElement("span")
        span.id = `field-${i}`
        mainField.appendChild(span)
    }
    game.appendChild(mainField)
}
function createLetters(){
    let letterDiv = document.createElement("div")
    letterDiv.className = "letters-guess"
    let lettersGuess= Array.from(letters)
    lettersGuess.forEach(letter =>{
        let span = document.createElement("span")
        let spanContent = document.createTextNode(letter)
        span.appendChild(spanContent)
        letterDiv.appendChild(span)
    })
    game.appendChild(letterDiv)
}
createMainFeild()
createLetters()

const names = {
    Movie: [
        "jokers", "matrix", "frozen", "braven", "hustle",
        "takeny", "clerks", "snatch", "skyfal", "rockyt",
        "casino", "brides", "tedmov", "bright", "pixels",
        "lucyfm", "spiral"
    ],

    Footballer: [
        "ronald", "neymar", "pedrig", "modric", "puyolm",
        "dejong", "fodens", "rashfd", "davies", "kantes",
        "walker", "alison", "laport", "artnz"

    ],

    Country: [
        "france", "norway", "mexico", "brazil", "turkey",
        "finlad", "poland", "serbia", "latvia", "jordan",
        "cyprus", "algery", "kuwait", "bahrin", "omanis",
        "nigers", "chadok", "koreas"
    ],

    Animal: [
        "monkey", "donkey", "pigeon", "falcon", "herond",
        "cougar", "magpie", "crabyn", "goatly",
        "tigera", "donkey", "lemuro", "orangu",
        "cameln", "cougal", "hyenad"
    ]
};

function getWord(){
    let catagories = Object.keys(names)
    let randomCatNum = Math.floor(Math.random() * catagories.length)
    let randomCat = catagories[randomCatNum]
    let randomWordNum = Math.floor(Math.random() * randomCat.length)
    let randomWord = names[randomCat][randomWordNum]
    sessionStorage.setItem("randomCat" , randomCat)
    sessionStorage.setItem("randomWord" , randomWord)
}
function lose(){
    let randomWord = sessionStorage.getItem("randomWord")
    const loserDiv = document.createElement("div")
    const loserLayer = document.createElement("div")
    loserDiv.classList.add("loser-div")
    loserLayer.classList.add("loser-layer")
    const loseHead = document.createElement("h2")
    loseHead.classList.add("lose-head")
    const loseHeadText = document.createTextNode("Game Over !")
    loseHead.appendChild(loseHeadText)
    const prag1 = document.createElement("p")
    const prag2 = document.createElement("p")
    const prag3 = document.createElement("p")
    const prag1Text = document.createTextNode(`- Sorry, Nice try`)
    prag2.innerHTML = `<p>- The word is <span>${randomWord}</span></p>`
    const prag3Text = document.createTextNode(`- You can try again`)
    const close = document.createElement("i")
    close.addEventListener("click" , function(){
        loserLayer.classList.add("closed")
        loserDiv.remove()
    })
    const again = document.createElement("i")
    again.addEventListener("click" , function(){
        location.reload()
    })
    close.classList.add("fas" , "fa-close" , "close")
    again.classList.add("fas" , "fa-redo" , "again")
    prag1.appendChild(prag1Text)
    prag3.appendChild(prag3Text)
    loserDiv.appendChild(loseHead)
    loserDiv.appendChild(prag1)
    loserDiv.appendChild(prag2)
    loserDiv.appendChild(prag3)
    loserDiv.appendChild(close)
    loserDiv.appendChild(again)
    document.body.appendChild(loserDiv)
    document.body.appendChild(loserLayer)
    document.querySelector("#lose").play()
    document.querySelector("#game").pause()
    document.querySelector("i.sound").classList.add("disapled")
}
function win(){
    let mainDiv = document.createElement("div")
    mainDiv.className = "win-div"
    let winHead = document.createElement("h2")
    winHead.className = "win-head"
    let winHeadText = document.createTextNode("Congratulation You Won !")
    winHead.appendChild(winHeadText)
    let winText = document.createElement("p")
    let winTextText = document.createTextNode("You Have Got 10 stars")
    winText.appendChild(winTextText)
    let winLayer = document.createElement("div")
    winLayer.className = "win-layer"
    let nextButton = document.createElement("i")
    nextButton.className ="fas fa-arrow-right"
    mainDiv.appendChild(winHead)
    mainDiv.appendChild(winText)
    mainDiv.appendChild(nextButton)
    document.body.appendChild(winLayer)
    document.body.appendChild(mainDiv)
    document.getElementById("win").play()
    nextButton.addEventListener("click" , ()=>{
        nextQuestion()
    })
    addScore()
    
}
function nextQuestion(){
    document.querySelector(".win-div").remove()
    document.querySelector(".win-layer").remove()
    let buttons = Array.from(document.querySelectorAll(".chose"))
    buttons.forEach((button)=>{
        button.classList.remove("chose")
        button.classList.remove("false")
        button.classList.remove("true")
    })
    let spans = Array.from(document.querySelectorAll(".main-field span"))
    spans.forEach((span)=>{
        span.textContent = ""
    })
    document.querySelector(".draw").className = "draw"
    getWord()
    detectWord()
}

function detectWord(){
        document.querySelector(".catagory h3").innerHTML = sessionStorage.getItem("randomCat")
        let lettersbuttons = Array.from(document.querySelectorAll(".letters-guess span"))
        let randomWord = sessionStorage.getItem("randomWord")
        let randomWordList = Array.from(randomWord)
        lettersbuttons.forEach((button)=>{
            button.onclick = ()=>{
            if(randomWord.includes(button.textContent) && !button.classList.contains("chose") ){
                button.classList.add("chose")
                button.classList.add("true")
                document.getElementById(`field-${randomWordList.indexOf(button.textContent)}`).textContent = button.textContent
                document.getElementById("correct").play()
            if(document.querySelectorAll(".true").length === 6){
                win()
            }
        }else if(!button.classList.contains("chose")){
            button.classList.add("chose")
            button.classList.add("false")
            document.getElementById("wrong").play()
        if(document.querySelectorAll(".false").length === 1){
            document.querySelector(".draw").classList.add("one")
        }
        if(document.querySelectorAll(".false").length === 2){
            document.querySelector(".draw").classList.remove("one")
            document.querySelector(".draw").classList.add("two")
        }
        if(document.querySelectorAll(".false").length === 3){
            document.querySelector(".draw").classList.remove("two")
            document.querySelector(".draw").classList.add("three")
        }
        if(document.querySelectorAll(".false").length === 4){
            document.querySelector(".draw").classList.remove("three")
            document.querySelector(".draw").classList.add("four")
        }
        if(document.querySelectorAll(".false").length === 5){
            document.querySelector(".draw").classList.remove("four")
            document.querySelector(".draw").classList.add("five")
            document.getElementById("help").play()
        }
        if(document.querySelectorAll(".false").length === 6){
            document.querySelector(".draw").classList.remove("five")
            document.querySelector(".draw").classList.add("six")
        }
        if(document.querySelectorAll(".false").length === 7){
            document.querySelector(".draw").classList.remove("six")
            document.querySelector(".draw").classList.add("seven")
            lose()
        }
    }
        }
})
}

function addScore(){
    let scoreSpan = document.querySelector(".top .score span")
    let score = +scoreSpan.textContent
    score += 10
    localStorage.setItem( "score" , score)
    scoreSpan.textContent = localStorage.getItem("score")
}
window.addEventListener("load" , ()=>{
    getWord()
    detectWord()
    document.querySelector(".top .score span").textContent = localStorage.getItem("score")
})
