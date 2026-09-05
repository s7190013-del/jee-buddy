let selectedSubject = "Physics";
let selectedDifficulty = "Main";

let currentQuestion = 0;
let score = 0;
let questions = [];
let answered = false;


const questionBank = {

    Physics: [

        {
            question: "A body starts from rest and accelerates at 2 m/s². What is its velocity after 5 s?",
            options: ["5 m/s", "10 m/s", "15 m/s", "20 m/s"],
            answer: 1,
            explanation: "Using v = u + at, v = 0 + 2×5 = 10 m/s."
        },

        {
            question: "Which quantity is a scalar?",
            options: ["Velocity", "Acceleration", "Displacement", "Speed"],
            answer: 3,
            explanation: "Speed has magnitude only, so it is a scalar quantity."
        },

        {
            question: "If the net force on a body is zero, its acceleration is:",
            options: ["Zero", "Maximum", "Negative", "Infinite"],
            answer: 0,
            explanation: "Newton's second law gives F = ma. If F = 0, then a = 0."
        },

        {
            question: "The SI unit of work is:",
            options: ["Newton", "Watt", "Joule", "Pascal"],
            answer: 2,
            explanation: "The SI unit of work is joule (J)."
        },

        {
            question: "A projectile reaches maximum height when its vertical velocity becomes:",
            options: ["Maximum", "Zero", "Equal to horizontal velocity", "Infinite"],
            answer: 1,
            explanation: "At maximum height, the vertical component of velocity is zero."
        }

    ],


    Chemistry: [

        {
            question: "The atomic number of an element represents the number of:",
            options: ["Neutrons", "Protons", "Nucleons", "Isotopes"],
            answer: 1,
            explanation: "Atomic number equals the number of protons in the nucleus."
        },

        {
            question: "The pH of a neutral solution at 25°C is approximately:",
            options: ["0", "5", "7", "14"],
            answer: 2,
            explanation: "At 25°C, a neutral solution has pH = 7."
        },

        {
            question: "Which bond involves sharing of electrons?",
            options: ["Ionic bond", "Covalent bond", "Metallic bond", "Hydrogen bond"],
            answer: 1,
            explanation: "Covalent bonds are formed by sharing electron pairs."
        },

        {
            question: "Avogadro's number is approximately:",
            options: ["6.022 × 10²³", "9.8 × 10²", "3 × 10⁸", "1.6 × 10⁻¹⁹"],
            answer: 0,
            explanation: "One mole contains approximately 6.022 × 10²³ particles."
        },

        {
            question: "Which particle has a negative charge?",
            options: ["Proton", "Neutron", "Electron", "Nucleus"],
            answer: 2,
            explanation: "The electron carries a negative electric charge."
        }

    ],


    Maths: [

        {
            question: "What is the derivative of x²?",
            options: ["x", "2x", "x²", "2"],
            answer: 1,
            explanation: "Using d(xⁿ)/dx = nxⁿ⁻¹, derivative of x² is 2x."
        },

        {
            question: "The value of sin 90° is:",
            options: ["0", "1/2", "1", "√3/2"],
            answer: 2,
            explanation: "sin 90° = 1."
        },

        {
            question: "If x + 5 = 12, then x is:",
            options: ["5", "6", "7", "8"],
            answer: 2,
            explanation: "x = 12 − 5 = 7."
        },

        {
            question: "The slope of a horizontal line is:",
            options: ["0", "1", "−1", "Undefined"],
            answer: 0,
            explanation: "A horizontal line has zero change in y, so its slope is zero."
        },

        {
            question: "The determinant of the identity matrix of order 2 is:",
            options: ["0", "1", "2", "4"],
            answer: 1,
            explanation: "The determinant of an identity matrix is always 1."
        }

    ]

};


function toggleMenu() {

    document.getElementById("menu")
        .classList.toggle("show");

}


function chooseSubject(subject, button) {

    selectedSubject = subject;

    document
        .querySelectorAll(".choice")
        .forEach(function(btn) {
            btn.classList.remove("active");
        });

    button.classList.add("active");
}


function chooseDifficulty(difficulty, button) {

    selectedDifficulty = difficulty;

    document
        .querySelectorAll(".difficulty")
        .forEach(function(btn) {
            btn.classList.remove("active");
        });

    button.classList.add("active");
}


function startQuiz() {

    questions = [...questionBank[selectedSubject]];

    currentQuestion = 0;
    score = 0;

    document.getElementById("finalResult")
        .style.display = "none";

    document.getElementById("quiz")
        .style.display = "block";

    showQuestion();

    document.getElementById("quiz")
        .scrollIntoView({
            behavior: "smooth"
        });
}


function showQuestion() {

    answered = false;

    const question = questions[currentQuestion];

    document.getElementById("questionNumber")
        .textContent =
        "Question " +
        (currentQuestion + 1) +
        " / " +
        questions.length;

    document.getElementById("score")
        .textContent =
        "Score: " + score;


    document.getElementById("progress")
        .style.width =
        ((currentQuestion + 1) /
        questions.length * 100) + "%";


    document.getElementById("questionText")
        .textContent = question.question;


    const options =
        document.getElementById("options");

    options.innerHTML = "";


    question.options.forEach(function(option, index) {

        const button =
            document.createElement("button");

        button.className = "option";

        button.textContent =
            String.fromCharCode(65 + index) +
            ". " +
            option;

        button.onclick = function() {
            checkAnswer(index, button);
        };

        options.appendChild(button);

    });


    document.getElementById("result")
        .innerHTML = "";

    document.getElementById("nextButton")
        .style.display = "none";
}


function checkAnswer(selected, button) {

    if (answered) {
        return;
    }

    answered = true;

    const question = questions[currentQuestion];

    const allOptions =
        document.querySelectorAll(".option");


    if (selected === question.answer) {

        score++;

        button.classList.add("correct");

        document.getElementById("result")
            .innerHTML =
            "✅ Correct! " +
            question.explanation;

    } else {

        button.classList.add("wrong");

        allOptions[question.answer]
            .classList.add("correct");

        document.getElementById("result")
            .innerHTML =
            "❌ Incorrect. " +
            question.explanation;
    }


    document.getElementById("score")
        .textContent =
        "Score: " + score;


    if (currentQuestion <
        questions.length - 1) {

        document.getElementById("nextButton")
            .style.display = "block";

    } else {

        document.getElementById("nextButton")
            .textContent = "View Result";

        document.getElementById("nextButton")
            .style.display = "block";
    }
}


function nextQuestion() {

    currentQuestion++;

    if (currentQuestion >= questions.length) {

        finishQuiz();

        return;
    }

    showQuestion();
}


function finishQuiz() {

    document.getElementById("quiz")
        .style.display = "none";

    document.getElementById("finalResult")
        .style.display = "block";


    const total = questions.length;

    const accuracy =
        Math.round((score / total) * 100);


    document.getElementById("finalScore")
        .innerHTML = `
            <p><b>${selectedSubject}</b></p>
            <p>Score: ${score} / ${total}</p>
            <p>Accuracy: ${accuracy}%</p>
            <p>${getMessage(accuracy)}</p>
        `;
}


function getMessage(accuracy) {

    if (accuracy === 100) {
        return "🏆 Perfect! Excellent work.";
    }

    if (accuracy >= 80) {
        return "🔥 Great performance!";
    }

    if (accuracy >= 60) {
        return "👍 Good. Keep practicing.";
    }

    return "📚 Revise the concepts and try again.";
}


function createPlan() {

    const hours =
        Number(
            document.getElementById("studyHours").value
        );

    const plan =
        document.getElementById("plan");


    if (!hours || hours < 1) {

        plan.innerHTML =
            "⚠️ Enter your study hours.";

        return;
    }


    const physics =
        Math.round(hours * 0.34);

    const chemistry =
        Math.round(hours * 0.33);

    const maths =
        hours - physics - chemistry;


    plan.innerHTML = `
        <h3>Your Daily Plan</h3>

        <div class="plan-item">
            ⚡ Physics — ${physics} hour(s)
        </div>

        <div class="plan-item">
            🧪 Chemistry — ${chemistry} hour(s)
        </div>

        <div class="plan-item">
            📐 Maths — ${maths} hour(s)
        </div>

        <div class="plan-item">
            🔄 Revision — 30 minutes
        </div>
    `;
}


function submitDoubt() {

    const question =
        document.getElementById("questionInput")
        .value.trim();

    const result =
        document.getElementById("doubtResult");


    if (!question) {

        result.innerHTML =
            "⚠️ Please enter your question.";

        return;
    }


    result.innerHTML = `
        <b>JEE Buddy received your doubt! 🧠</b>
        <br><br>
        The real AI doubt-solving engine will be
        connected in a future version.
    `;
        }
