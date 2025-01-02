const internshipForm = document.getElementById('internship-form');
const startDate = document.getElementById('start-date');
const endDate = document.getElementById('end-date');
const internshipDetails = document.getElementById('internship-details');
const confirmationMessage = document.getElementById('confirmation-message');
internshipForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const start = startDate.value;
    const end = endDate.value;
    const details = internshipDetails.value.trim();
    if (start && end && details) {
        confirmationMessage.classList.remove('hidden');
        console.log('Internship Start Date:', start);
        console.log('Internship End Date:', end);
        console.log('Internship Details:', details);
        internshipForm.reset();
    } else {
        alert('Please fill out all fields.');
    }
});
