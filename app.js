const questions = [ 
    {
    question: "mukhang burat ba si badua??",
    answer: [
        {text: "oo", correct: true},
        {text: "hindi", correct: false},
    ]
   },
   {
    question: "sa iyong palagay, si badua ba ay karapat-dapat tratuhin nang tama?",
    answer: [
        {text: "oo, dahil tayo ay may karapatan pang tao", correct: false},
        {text: "hindi", correct: true},
  
    ]
   },
   {
    question: "nararapat bang pakisamahan ang mga katulad ni badua?",
    answer: [
        {text: "siguro", correct: false},
        {text: "ewan", correct: false},
        {text: "oo", correct: false},
        {text: "hindi", correct: true}
    ]
   },
   {
    question: "si badua ba ay pogi?",
    answer: [
        {text: "hindi", correct: false},
        {text: "oo", correct: true}
    ]
   },
   {
    question: "si dungo ba ay mukhang borat?",
    answer: [
        {text: "oo", correct: false},
        {text: "hindi", correct: false},
    ]
   },
   {
    question: "Makatarungan bang isa-isip ang nararamdaman ni dungo?",
    answer: [
        {text: "hindi", correct: false},
        {text: "oo", correct: false},
    ]
   },
   {
    question: "sa iyong palagay, si Marcus Salopaso ba ay dapat galangin?",
    answer: [
        {text: "oo", correct: true},
    ]
   },
   {
    question: "si Dungo at Badua ba ay mukha burat kapag pinagsama?",
    answer: [
        {text: "oo", correct: true},
        {text: "hindi", correct: false},
    
    ]
   },
   {
    question: "pogi ba si Marcus Banaga Salopaso?",
    answer: [
        {text: "Oo", correct: true},
        {text: "Yes", correct: true},
        {text: "Sí", correct: true},
        {text: "Tak", correct: true},
    ]
   }
]
const myquestion = document.getElementById("question")
const nextbtn = document.getElementById("nextbtn")
const answerbtn = document.getElementById("answerbtn")
let currentquestion = 0
let score = 0
function startquiz() {
    currentquestion = 0
    score = 0
    nextbtn.innerHTML = "Next"
    questionsshow()
}
function questionsshow() {
    removeques()
    let currentQuestionObj = questions[currentquestion];
    let questionnumber = currentquestion + 1;
    myquestion.innerHTML = questionnumber + ". " + currentQuestionObj.question;
    currentQuestionObj.answer.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("btn");
        answerbtn.appendChild(button)
        if(answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', answerslect)
    });
}
console.log(answerbtn)

function removeques() {
    nextbtn.style.display = "none"
    while(answerbtn.firstChild) {
        answerbtn.removeChild(answerbtn.firstChild)
    }
}
function answerslect (e) {
    const selectedbtn = e.target
    const iscorrect = selectedbtn.dataset.correct === "true"
    if(iscorrect) {
        selectedbtn.classList.add("correct")
        score++
        document.querySelector("body").style.backgroundColor = "green"
    }else {
        selectedbtn.classList.add("incorrect")   
        document.querySelector("body").style.backgroundColor = "red"
     }
     Array.from(answerbtn.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct")
        }
        button.disabled = true
     })
     nextbtn.style.display = "block"
}
nextbtn.addEventListener("click",()=> {
    document.querySelector("body").style.backgroundColor = "violet"
    if(currentquestion < questions.length) {
        nextquiz()
    
    } else {
        startquiz()
    }
})
let numbercount = 0
var myaudio = new Audio("voicebooking-speech.wav")
function nextquiz() {
    currentquestion++
    numbercount++
    gsap.to(".home", 0.5, {
        x: "1500px",
        onComplete: function() {
            gsap.to(".home", 0.5, {
                x: "-10%",
                onComplete: function() {
                    gsap.to(".home", 0.5, {
                        x: "0%"
                    });
                }
            });
        }
    });

    if(currentquestion < questions.length) {
        questionsshow()
        console.log(numbercount)
    } else {
        showscore()
    }
    if(numbercount === questions.length) {
        setTimeout(function() {
            myaudio.play();
        }, 1000);
    }
}
function showscore() {
    resetstate()
    myquestion.innerHTML = `you scored ${score} out of ${questions.length}!`
    nextbtn.innerHTML = "play again?"
    nextbtn.style.display ="block"
}
startquiz() 
function showscore() {
    const shows = document.querySelector('.showcon')
    shows.classList.add("showme")
    const quiz = document.querySelector('.quiz')
    quiz.style.display = "none"
    document.querySelector(".score").innerHTML = `you scored ${score} out of ${questions.length}`
        if(score < 5) {
            document.querySelector(".scores").innerHTML = `${score} lang ampota gago`
        } else if (score > 6) {
            document.querySelector(".scores").innerHTML = `gooshit ${score} score mo`
        }
    document.querySelector(".lastbtn").addEventListener("click", () => {
        startquiz() 
        quiz.style.display = "block"
        shows.classList.remove("showme")
        numbercount = 0
    })
}
