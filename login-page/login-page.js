const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const loginBtn2 = document.getElementById('loginButton')

registerBtn.addEventListener('click', ()=>{
    container.classList.add("active");
})

loginBtn.addEventListener('click', ()=>{
    container.classList.remove("active");
})

loginBtn2.addEventListener('click', ()=>{
    loginMethod();
})


function loginMethod(){
    console.log('Email: ' + document.getElementById('emailRegister').value);
    console.log('Password: ' + document.getElementById('passwordRegister').value);
    window.location.href = 'main-page.html'
}