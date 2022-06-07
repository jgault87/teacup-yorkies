let homeLink = document.querySelector('#home-link');
let dashboardLink = document.querySelector('#dashboard-link');
let potatoOrPitbullLink = document.querySelector('#potato-or-pitbull-link');
let loginLink = document.querySelector('#login-link');
let logoutLink = document.querySelector('#logout');

let active = window.location.pathname;

if (active == '/') {
  homeLink.classList.add('active');
  dashboardLink.classList.remove('active');
  loginLink
    ? loginLink.classList.remove('active')
    : logoutLink.classList.remove('active');
  potatoOrPitbullLink.classList.remove('active');
} else if (active == '/dashboard') {
  dashboardLink.classList.add('active');
  homeLink.classList.remove('active');
  loginLink
    ? loginLink.classList.remove('active')
    : logoutLink.classList.remove('active');
  potatoOrPitbullLink.classList.remove('active');
} else if (active == '/login') {
  loginLink.classList.add('active');
  homeLink.classList.remove('active');
  dashboardLink.classList.remove('active');
  potatoOrPitbullLink.classList.remove('active');
} else if (active == '/PotatoOrPitbull') {
  potatoOrPitbullLink.classList.add('active');
  homeLink.classList.remove('active');
  dashboardLink.classList.remove('active');
  loginLink
    ? loginLink.classList.remove('active')
    : logoutLink.classList.remove('active');
}
