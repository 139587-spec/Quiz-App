// Getting all elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");

// Start button click
start_btn.onclick = () => {
    info_box.classList.add("activeInfo");
};

// Exit button click
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
};

// Continue button click
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0)
};

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;


const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = () => {
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    clearInterval(counter);
    clearInterval(counterLine);

    next_btn.style.display = "none";                   // hide next button
    timeOff.textContent = "Time Left";                 // reset timer text
    timeCount.textContent = timeValue < 10 ? "0" + timeValue : timeValue; // reset seconds
    const option_list = document.querySelector(".option_list");
    option_list.innerHTML = "";                        // clear all options
    option_list.classList.remove("answered");          // remove answered state

    const optionDivs = option_list.querySelectorAll(".option");
    optionDivs.forEach(opt => {
        opt.classList.remove("correct", "incorrect", "disabled");
    });

    result_box.classList.remove("activeResult");
    quiz_box.classList.add("activeQuiz");

    showQuestions(que_count);
    queCounter(que_numb);
    startTimer(timeValue);
    startTimerLine();
};

quit_quiz.onclick = () => {
    clearInterval(counter);
    clearInterval(counterLine);

    result_box.classList.remove("activeResult");
    quiz_box.classList.remove("activeQuiz");
    info_box.classList.add("activeInfo");

    // Reset quiz variables so it starts fresh next time
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
};

// If the next button is clicked
next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
    } else {
        showResultBox();
        console.log("Questions completed");
    }
};

// Getting questions and options from the array
function showQuestions(index) {
    const que_text = document.querySelector(".que_text");
    const option_list = document.querySelector(".option_list");

    let que_tag =
        '<span>' + questions[index].numb + ". " + questions[index].question + "</span>";

    let option_tag =
        '<div class="option">' + questions[index].options[0] + '<span></span></div>' +
        '<div class="option">' + questions[index].options[1] + '<span></span></div>' +
        '<div class="option">' + questions[index].options[2] + '<span></span></div>' +
        '<div class="option">' + questions[index].options[3] + '<span></span></div>';

    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';


function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    const option_list = document.querySelector(".option_list");

    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;

    if (userAns == correctAns) {
        answer.classList.add("correct");
        console.log("Answer is Correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    } else {
        answer.classList.add("incorrect");
        console.log("Answer is Wrong");
        answer.insertAdjacentHTML("beforeend",crossIcon);

        // Automatically highlight correct answer
        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correctAns) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }

    // Disable all options after selection
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }


// Mark that the question has been answered
    option_list.classList.add("answered");


    // Show next button
    next_btn.style.display = "block";
}

function showResultBox(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    if(userScore > 3){
        let scoreTag = '<span>and congrats! You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag = '<span>and nice, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>and sorry, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}


function startTimer(time) {
    const option_list = document.querySelector(".option_list");
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent  = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00"
            timeOff.textContent = "Time Off";
            let correctAns = questions[que_count].answer;
            let allOptions = option_list.children.length;


           
            for (let i = 0; i < allOptions; i++) {
                if(option_list.children[i].textContent == correctAns){
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon)
                }
            }
            for (let i = 0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.display = "block";
        }
    }
}

function startTimerLine() {
    let width = 0; // reset for each question
    counterLine = setInterval(() => {
        width++;
        timeLine.style.width = width + "px";
        if (width >= 549) { 
            clearInterval(counterLine);
        }
    }, 29);
}

function queCounter(index) {
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQueCountTag =
    '<span><span>' + index + '</span> of <span>' + questions.length + '</span> Questions</span>';
bottom_ques_counter.innerHTML = totalQueCountTag;
}