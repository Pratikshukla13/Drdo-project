const mentors = JSON.parse(localStorage.getItem('mentors')) || [];
const interns = JSON.parse(localStorage.getItem('interns')) || {};
document.getElementById('add-mentor-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const mentorName = document.getElementById('mentor-name').value.trim();
    const mentorEmail = document.getElementById('mentor-email').value.trim();

    if (mentorName && mentorEmail) {
        const mentor = { name: mentorName, email: mentorEmail };
        mentors.push(mentor);
        interns[mentorName] = [];
        localStorage.setItem('mentors', JSON.stringify(mentors));
        localStorage.setItem('interns', JSON.stringify(interns));
        updateMentorSelect();
        updateMentorList();
    }
    document.getElementById('mentor-name').value = '';
    document.getElementById('mentor-email').value = '';
});
document.getElementById('add-intern-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const internName = document.getElementById('intern-name').value.trim();
    const mentorName = document.getElementById('mentor-select').value;

    if (internName && mentorName) {
        interns[mentorName].push(internName);
        localStorage.setItem('interns', JSON.stringify(interns));
        updateMentorList();
    }
    document.getElementById('intern-name').value = '';
    document.getElementById('mentor-select').value = '';
});
function updateMentorSelect() {
    const mentorSelect = document.getElementById('mentor-select');
    mentorSelect.innerHTML = '<option value="">Assign to Mentor</option>';
    mentors.forEach(mentor => {
        const option = document.createElement('option');
        option.value = mentor.name;
        option.textContent = mentor.name;
        mentorSelect.appendChild(option);
    });
}
function updateMentorList() {
    const mentorList = document.getElementById('mentor-list');
    mentorList.innerHTML = '';
    mentors.forEach(mentor => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${mentor.name}</strong><br>Interns: ${interns[mentor.name].join(', ') || 'None'}`;
        mentorList.appendChild(listItem);
    });
}
updateMentorSelect();
updateMentorList();
