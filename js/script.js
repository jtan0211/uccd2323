//Selectors for BMI
const form = document.querySelector("form");
const bmiH = document.getElementById("bmi-h");
const bmiValue = document.getElementById("bmi-value");
const unit = document.getElementById("unit");
const bmiCategory = document.getElementById("bmi-category");
const errorMsg = document.getElementById("error-msg");

// Selectors for BMR
const bmrForm = document.querySelector("form.calculator"); // Adjusted to select the BMR form
const bmrH = document.getElementById("bmr-h");
const bmrValue = document.getElementById("bmr-value");
const bmrUnit = document.getElementById("unit");
const bmrErrorMsg = document.getElementById("error-msg");

// Register and Login Functionality
document.addEventListener('DOMContentLoaded', function () {
    const togglePasswordIcons = document.querySelectorAll('.toggle-password');

    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            const passwordField = this.previousElementSibling;
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    });

    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    
    // Handle Registration
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const username = document.getElementById('register-username').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.some(user => user.username === username || user.email === email);

            if (userExists) {
                alert('Username or Email already exists!');
            } else {
                users.push({ username, email, password });
                localStorage.setItem('users', JSON.stringify(users));
                alert('Account created successfully! You can now login.');
                window.location.href = 'login.html';
            }
        });
    }

    // Handle Login
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const usernameOrEmail = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => 
                (user.username === usernameOrEmail || user.email === usernameOrEmail) && user.password === password
            );

            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                alert('Login successful!');
                window.location.href = 'index.html';
            } else {
                alert('Invalid username/email or password.');
            }
        });
    }

    // Prevent Access to index.html if Not Logged In
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        const loggedInUser = localStorage.getItem('loggedInUser');

        if (!loggedInUser) {
            window.location.href = 'login.html'; // Redirect to login if not logged in
        }

        // Handle Logout
        logoutBtn.addEventListener('click', function () {
            localStorage.removeItem('loggedInUser');
            alert('Logout successful!');
            window.location.href = 'login.html';
        });
    }
});

// Auto-slider for fitness programs
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.transform = `translateX(${-slideIndex * 100}%)`;
    }
    slideIndex++;
    if (slideIndex >= slides.length) { slideIndex = 0; }
    setTimeout(showSlides, 3000); // Change slide every 3 seconds
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.fcontact-form');

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the form from submitting

        // Show a success message
        alert('Form successfully submitted! Thank you for your message.');

        // Optionally, you could clear the form fields after submission
        form.reset();
    });
});


/* BMI Section */
form.addEventListener("submit", onFormSubmit);
form.addEventListener("reset", onFormReset);

function onFormReset() {
    bmiH.textContent = "";
    bmiValue.textContent = "";
    bmiValue.className = "";
    unit.innerHTML = "";
    bmiCategory.textContent = "";
    errorMsg.textContent = "";
}

function onFormSubmit(e) {
    e.preventDefault();

    if (calculateBMI()) {
        let bmiResult = calculateBMI().toFixed(1);

        bmiH.textContent = "BMI";
        bmiValue.textContent = bmiResult;
        bmiValue.className = interpretBMI(bmiResult);
        unit.innerHTML = "kg/m<sup>2</sup>";
        bmiCategory.textContent = displayBMICategory(interpretBMI(bmiResult));
    } else {
        // Don't display anything if error happens
        bmiH.textContent = "";
        bmiValue.textContent = "";
        bmiCategory.textContent = "";
    }
}

function calculateBMI() {
    const age = parseInt(form.age.value.trim());
    const weight = parseFloat(form.weight.value.trim());
    const height = parseFloat(form.height.value.trim());
    const male = form.male;
    const female = form.female;

    // Age validation
    if (isNaN(age) || age < 2 || age > 150) {
        errorMsg.textContent = "Age must be a number between 2 and 150.";
        return;
    }

    // Weight validation
    if (isNaN(weight) || weight <= 0) {
        errorMsg.textContent = "Weight must be a positive number.";
        return;
    }

    // Height validation
    if (isNaN(height) || height <= 0) {
        errorMsg.textContent = "Height must be a positive number.";
        return;
    }

    // Gender validation
    if (!male.checked && !female.checked) {
        errorMsg.textContent = "Please select a gender.";
        return;
    }

    // Calculate BMI
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    // Clear any previous error message
    errorMsg.textContent = "";

    return bmi;
}

function interpretBMI(bmi) {
    if (bmi < 18.5) {
        return "underweight";
    } else if (bmi < 25) {
        return "normal";
    } else if (bmi < 30) {
        return "overweight";
    } else if (bmi < 35) {
        return "obese";
    } else {
        return "very-obese";
    }
}

function displayBMICategory(bmiStr) {
    switch (bmiStr) {
        case "underweight":
            return "Underweight";
        case "normal":
            return "Normal";
        case "overweight":
            return "Overweight";
        case "obese":
            return "Obese";
        case "very-obese":
            return "Very Obese";
        default:
            return "";
    }
}


// Event Listeners for BMR
if (bmrForm) {
    bmrForm.addEventListener("submit", onBmrFormSubmit);
    bmrForm.addEventListener("reset", onBmrFormReset);
}

// Reset function for BMR
function onBmrFormReset() {
    bmrH.textContent = "";
    bmrValue.textContent = "";
    bmrUnit.innerHTML = "";
    bmrErrorMsg.textContent = "";
}

// Submit function for BMR
function onBmrFormSubmit(e) {
    e.preventDefault();

    const bmr = calculateBMR();
    if (bmr) {
        let bmrResult = bmr.toLocaleString("en-US");

        bmrH.textContent = "BMR";
        bmrValue.textContent = bmrResult;
        bmrUnit.innerHTML = "Calories/day";
    } else {
        // Don't display anything if error happens
        bmrH.textContent = "";
        bmrValue.textContent = "";
    }
}

// BMR Calculation
function calculateBMR() {
    const age = parseInt(bmrForm.querySelector("#age").value.trim());
    const weight = parseFloat(bmrForm.querySelector("#weight").value.trim());
    const height = parseFloat(bmrForm.querySelector("#height").value.trim());
    const male = bmrForm.querySelector("#male");
    const female = bmrForm.querySelector("#female");

    // Age validation
    if (isNaN(age) || age < 2 || age > 150) {
        bmrErrorMsg.textContent = "Age must be a number between 2 and 150.";
        return null;
    }

    // Weight validation
    if (isNaN(weight) || weight <= 0) {
        bmrErrorMsg.textContent = "Weight must be a positive number.";
        return null;
    }

    // Height validation
    if (isNaN(height) || height <= 0) {
        bmrErrorMsg.textContent = "Height must be a positive number.";
        return null;
    }

    // Gender validation
    if (!male.checked && !female.checked) {
        bmrErrorMsg.textContent = "Please select a gender.";
        return null;
    }

    // Calculate BMR using the Mifflin-St Jeor Equation
    let bmr;
    if (male.checked) {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (female.checked) {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Clear any previous error message
    bmrErrorMsg.textContent = "";

    return bmr;
}

