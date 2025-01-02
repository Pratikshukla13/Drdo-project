document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");

    const users = {
        hr: JSON.parse(localStorage.getItem("hrUsers")) || [],
        mentor: JSON.parse(localStorage.getItem("mentors")) || [],
        interns: JSON.parse(localStorage.getItem("interns")) || []
    };

    let currentRole = "";

    function renderProfessionSelection() {
        app.innerHTML = `
            <div class="container">
                <h2>Select Profession</h2>
                <select id="profession-select">
                    <option value="">Select Profession</option>
                    <option value="hr">HR</option>
                    <option value="mentor">Mentor</option>
                    <option value="intern">Intern</option>
                </select>
            </div>
        `;
        document.getElementById("profession-select").addEventListener("change", (e) => {
            currentRole = e.target.value;
            if (currentRole === "hr" || currentRole === "mentor") {
                renderLoginForm();
            } else if (currentRole === "intern") {
                window.location.href = "intern.html";
            }
        });
    }

    function renderLoginForm() {
        app.innerHTML = `
            <div class="container">
                <h3>Login</h3>
                <input type="text" id="username" placeholder="Username" required>
                <input type="password" id="password" placeholder="Password" required>
                <button id="login-btn">Login</button>
                <p>Don't have an account? <span class="register-link" id="register-link">Register</span></p>
            </div>
        `;

        document.getElementById("login-btn").addEventListener("click", handleLogin);
        document.getElementById("register-link").addEventListener("click", renderRegisterForm);
    }

    function renderRegisterForm() {
        app.innerHTML = `
            <div class="container">
                <h3>Register</h3>
                <input type="text" id="register-username" placeholder="Username" required>
                <input type="password" id="register-password" placeholder="Password" required>
                <button id="register-btn">Register</button>
                <p>Already have an account? <span class="register-link" id="login-link">Login</span></p>
            </div>
        `;

        document.getElementById("register-btn").addEventListener("click", handleRegister);
        document.getElementById("login-link").addEventListener("click", renderLoginForm);
    }

    function handleRegister() {
        const username = document.getElementById("register-username").value.trim();
        const password = document.getElementById("register-password").value.trim();

        if (username && password) {
            users[currentRole].push({ username, password });
            localStorage.setItem(`${currentRole}Users`, JSON.stringify(users[currentRole]));
            alert("Registration successful!");
            renderLoginForm();
        } else {
            alert("Please fill in all fields.");
        }
    }

    function handleLogin() {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        const validUser = users[currentRole].some(user => user.username === username && user.password === password);

        if (validUser) {
            alert("Login successful!");
            if (currentRole === "hr") {
                window.location.href = "hr.html";
            } else if (currentRole === "mentor") {
                window.location.href = "mentor.html";
            }
        } else {
            alert("Invalid username or password.");
        }
    }

    renderProfessionSelection();
});
