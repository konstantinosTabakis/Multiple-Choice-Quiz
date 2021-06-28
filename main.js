let btn =document.querySelector(".btn")
let container= document.querySelector(".container")
let index=0
let score=0

btn.addEventListener("click", ()=>{
    document.getElementById("title").style.display="none"
    document.getElementById("text").style.display="none"
    btn.style.display="none"
    let retrieving =document.createElement("div")
    retrieving.innerHTML="Retrieving Data..."
    container.appendChild(retrieving)
    gameStart()
})

function gameStart(){
    fetch("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple")
    .then(res=>res.json())
    .then(data=> {
        nextQuestion(data)
    })
}

function nextQuestion(data){
    container.innerHTML=""
    let correct=""
    let answers=[]
    if(index<data.results.length){
        let question = document.createElement("h2")
        let quest=data.results[index].question
        quest=quest.replaceAll("&quot;","")
        quest=quest.replaceAll("&#039;","")
        question.innerText=quest
        container.appendChild(question)

        let flex=document.createElement("div")
        flex.classList.add("flex")
        container.appendChild(flex)
        for(x of data.results[index].incorrect_answers){
            answers.push([x,false])
        }
        answers.push([data.results[index].correct_answer,true])
        answers=randomize(answers)
        for(let i=0;i<answers.length;i++){
            let answerDiv=document.createElement("div")
            answerDiv.innerHTML=answers[i][0]
            answerDiv.classList.add("question")
            answerDiv.addEventListener("click",()=>{
                correct=answers[i][1]
                let divs= document.querySelectorAll(".question")
                for(div of divs){
                    div.classList.remove("checked")
                }
                answerDiv.classList.add("checked")
            })
            flex.appendChild(answerDiv)
        }
        let indexQuestion=document.createElement("div")
        indexQuestion.innerHTML= `Question : ${index+1} / 10`
        indexQuestion.classList.add("indexQuestion")
        container.appendChild(indexQuestion)

        let next=document.createElement("button")
        next.classList.add("btn")
        next.innerHTML= "Next"
        next.addEventListener("click",()=>{
            if (correct){
                score++ 
            } 
            index++
            nextQuestion(data)
        })        
        container.appendChild(next)

    }else{
        showScore()
        
    }
}
function showScore(){
    container.innerHTML=""
    let message=""
    if(score<4){
        message="Better luck next time"
    }else if(score <7){
        message ="Good job"
    }else{
        message=" PERFECT"
    }
    let scoreDiv=document.createElement("div")
    scoreDiv.classList.add("message")
    scoreDiv.innerHTML=` ${message}, your score is ${score}/10`
    container.appendChild(scoreDiv)
    let button=document.createElement("button")
    button.innerHTML="Go again?"
    button.classList.add("btn")
    container.appendChild(button)
    button.addEventListener("click",()=>{
        index=0
        score=0
        gameStart()
    })
}

function randomize(arr){
    let arr2=[]
    let ran=[0,1,2,3]
    ran=ran.sort(() => Math.random() - 0.5)
    for(let i=0;i<arr.length;i++){
        arr2[i]=arr[ran[i]]
    }
    return arr2
}
