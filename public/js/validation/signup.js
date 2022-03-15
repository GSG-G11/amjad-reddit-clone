const form = document.querySelector('.login-form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');
const resMsg = document.querySelector('.msg');

// email input Validation
email.addEventListener('input', () => {
  const emailIsValid = email.value.includes('@') && email.value.includes('.com');
  validateInput(email, emailIsValid, 'Please enter a valid email');
});

// username input Validation
username.addEventListener('input', () => {
  const usernameIsValid = username.value.trim().length >= 3 && username.value.match(/^[a-zA-Z]/);
  validateInput(username, usernameIsValid, 'please enter a valid username');
});

// password input Validation
password.addEventListener('input', () => {
  const passIsValid = password.value.trim().length > 7 && password.value.trim().length < 50;
  validateInput(password, passIsValid, 'Please enter a valid password');
});

// confirm password input Validation
confirmPassword.addEventListener('input', () => {
  const confirmPassIsValid = password.value.trim() === confirmPassword.value.trim();
  validateInput(confirmPassword, confirmPassIsValid, "Passwords Don't Match");
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const emailIsValid = email.value.includes('@') && email.value.includes('.com');
  const usernameIsValid = username.value.trim().length >= 3 && username.value.match(/^[a-zA-Z]/);
  const passIsValid = password.value.trim().length > 7 && password.value.trim().length < 50;
  const confirmPassIsValid = password.value.trim() === confirmPassword.value.trim();

  const isFormValid = emailIsValid && usernameIsValid && confirmPassIsValid && passIsValid;

  if (!isFormValid) return;

  const userCredentials = {
    username: username.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  };

  request('/signup', 'POST', userCredentials)
    .then((data) => data.json())
    .then(({ msg, status }) => {
      resMsg.innerText = msg;
      status === 201 && setTimeout(() => window.location.assign('/'), 1000);
    });
});
