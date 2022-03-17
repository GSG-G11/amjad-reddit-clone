const form = document.querySelector('.login-form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const resMsg = document.querySelector('.msg');

// email input Validation
email.addEventListener('input', () => {
  const emailIsValid = ['@', '.com', 'mail'].every((str) => email.value.includes(str));

  validateInput(email, emailIsValid, 'Please enter a valid email');
});

// password input Validation
password.addEventListener('input', () => {
  const passIsValid = password.value.trim().length > 7 && password.value.trim().length < 50;
  validateInput(password, passIsValid, 'Please enter a valid password');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const emailIsValid = ['@', '.com', 'mail'].every((str) => email.value.includes(str));

  const passIsValid = password.value.trim().length > 7 && password.value.trim().length < 50;

  const isFormValid = emailIsValid && passIsValid;

  if (!isFormValid) return;

  const userCredentials = {
    email: email.value,
    password: password.value,
  };

  request('/login', 'POST', userCredentials)
    .then((data) => data.json())
    .then(({ msg, status }) => {
      resMsg.innerText = msg;
      status === 200 && setTimeout(() => window.location.assign('/'), 1000);
    });
});
