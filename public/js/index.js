const btns = document.querySelector('.btns');

// ? conditional rendering  logout button
if (document.cookie) {
  const logoutBtn = createEl('button', 'btn logoutBtn');

  logoutBtn.innerText = 'Logout';
  btns.append(logoutBtn);

  logoutBtn.addEventListener('click', () => {
    fetch('/logout');
    window.location.assign('/login');
  });
} else {
  const loginBtn = createEl('button', 'btn loginBtn');
  const signupBtn = createEl('button', 'btn singupBtn');
  const loginLink = createEl('a', null, 'Login');
  const signupLink = createEl('a', null, 'Sign Up');

  loginLink.href = '/login';
  signupLink.href = '/signup';

  loginBtn.append(loginLink);
  signupBtn.append(signupLink);

  btns.append(loginBtn, signupBtn);
}

request('/api/v1/allPosts')
  .then((data) => data.json())
  .then(renderPost);
