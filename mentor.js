const mentors = JSON.parse(localStorage.getItem('mentors')) || [];
const interns = JSON.parse(localStorage.getItem('interns')) || {};
const currentMentorName = "John Doe";
const assignedInterns = interns[currentMentorName] || [];
function updateInternList() {
    const internList = document.getElementById('intern-list');
    internList.innerHTML = '';

    if (assignedInterns.length === 0) {
        internList.innerHTML = '<li>No interns assigned.</li>';
    }

    assignedInterns.forEach(intern => {
        const listItem = document.createElement('li');
        listItem.textContent = intern;
        internList.appendChild(listItem);
    });

    updateInternSelect();
}
function updateInternSelect() {
    const internSelect = document.getElementById('intern-select');
    internSelect.innerHTML = '<option value="">Select Intern</option>';
    
    assignedInterns.forEach(intern => {
        const option = document.createElement('option');
        option.value = intern;
        option.textContent = intern;
        internSelect.appendChild(option);
    });

    internSelect.disabled = assignedInterns.length === 0;
}
document.getElementById('intern-select').addEventListener('change', function () {
    const feedbackText = document.getElementById('feedback-text');
    const submitButton = document.getElementById('submit-feedback');
    
    if (this.value) {
        feedbackText.disabled = false;
        submitButton.disabled = false;
    } else {
        feedbackText.disabled = true;
        submitButton.disabled = true;
    }
});

function submitFeedback() {
    const internName = document.getElementById('intern-select').value;
    const feedback = document.getElementById('feedback-text').value.trim();

    if (internName && feedback) {
        alert(`Feedback for ${internName}: ${feedback}`);
        document.getElementById('feedback-text').value = '';
    } else {
        alert('Please select an intern and provide feedback.');
    }
}
updateInternList();
