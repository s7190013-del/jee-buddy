function toggleMenu() {
    document.getElementById("menu").classList.toggle("show");
}


function selectSubject(button) {

    const subjects = document.querySelectorAll(".subject");

    subjects.forEach(function(subject) {
        subject.classList.remove("active");
    });

    button.classList.add("active");
}


function solveQuestion() {

    const question = document.getElementById("question").value.trim();
    const answer = document.getElementById("answer");

    if (question === "") {
        answer.style.display = "block";
        answer.innerHTML = "⚠️ Please enter a question first.";
        return;
    }

    answer.style.display = "block";

    answer.innerHTML = `
        <h3>JEE Buddy</h3>

        <p style="margin-top:10px;">
            Your question has been received.
        </p>

        <p style="margin-top:10px;">
            🧠 <b>Concept:</b> We will identify the required JEE concept.
        </p>

        <p style="margin-top:10px;">
            📚 <b>Solution:</b> Step-by-step solving will be added in the
            next version.
        </p>

        <p style="margin-top:10px;">
            💡 <b>Tip:</b> Try identifying the known quantities and the
            formula required before solving.
        </p>
    `;
}


function startPractice(subject) {

    alert(
        "🚀 " + subject +
        " Practice is coming soon!"
    );
}


function createPlan() {

    const hours = Number(
        document.getElementById("studyHours").value
    );

    const plan = document.getElementById("plan");

    if (!hours || hours < 1) {
        plan.innerHTML = "⚠️ Enter your available study hours.";
        return;
    }

    const physics = Math.round(hours * 0.34);
    const chemistry = Math.round(hours * 0.33);
    const maths = hours - physics - chemistry;

    plan.innerHTML = `
        <h3>Your Study Plan</h3>

        <div class="plan-item">
            ⚡ Physics — ${physics} hour(s)
        </div>

        <div class="plan-item">
            🧪 Chemistry — ${chemistry} hour(s)
        </div>

        <div class="plan-item">
            📐 Mathematics — ${maths} hour(s)
        </div>

        <div class="plan-item">
            🔄 Revision + Questions — 30 minutes
        </div>
    `;
}
