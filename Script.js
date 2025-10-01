let questions = JSON.parse(localStorage.getItem("questions")) || [];

function saveQuestions() {
    localStorage.setItem("questions", JSON.stringify(questions));
}

// Add Question
document.getElementById("add-question").addEventListener("click", function () {
    let q = document.getElementById("question").value;
    let opts = [
        document.getElementById("opt1").value,
        document.getElementById("opt2").value,
        document.getElementById("opt3").value,
        document.getElementById("opt4").value
    ];
    let correct = document.querySelector('input[name="correct"]:checked');

    if (q && opts.every(o => o) && correct) {
        questions.push({
            question: q,
            options: opts,
            answer: parseInt(correct.value)
        });
        saveQuestions();
        alert("Question Added!");
        document.getElementById("question").value = "";
        opts.forEach((_, i) => document.getElementById("opt" + (i + 1)).value = "");
        correct.checked = false;
    } else {
        alert("Please fill all fields & select correct answer!");
    }
});

// Start Quiz
document.getElementById("start-quiz").addEventListener("click", function () {
    if (questions.length === 0) {
        alert("No questions available!");
        return;
    }

    let quizBox = document.getElementById("quiz-box");
    quizBox.innerHTML = "";
    questions.forEach((q, index) => {
        let div = document.createElement("div");
        div.classList.add("quiz-question");
        div.innerHTML = <p>${index + 1}. ${q.question}</p> +
            q.options.map((opt, i) => 
                <label><input type="radio" name="q${index}" value="${i}"> ${opt}</label><br>
            ).join("");
        quizBox.appendChild(div);
    });
    let submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit Quiz";
    submitBtn.classList.add("btn");
    submitBtn.onclick = checkAnswers;
    quizBox.appendChild(submitBtn);
});

function checkAnswers() {
    let score = 0;
    questions.forEach((q, index) => {
        let selected = document.querySelector(input[name="q${index}"]:checked);
        if (selected && parseInt(selected.value) === q.answer) {
            score++;
        }
    });
    alert(Your Score: ${score} / ${questions.length});
}

// Clear Questions
document.getElementById("clear-question").addEventListener("click", function () {
    if (confirm("Are you sure you want to clear all questions?")) {
        questions = [];
        saveQuestions();
        alert("All questions cleared!");
    }
});
