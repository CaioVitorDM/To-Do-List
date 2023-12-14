const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
document.getElementById('loginForm').addEventListener('submit', loginMethod);

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
})

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
})

async function signUpMethod(event) {
    const signUpForm = document.getElementById('signUpForm');
    
    if(signUpForm.checkValidity()) {
        event.preventDefault();

        const formData = new FormData(signUpForm);

        await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Erro ao registrar usuário');
        })
        .then(data => {
            container.classList.remove("active");
        })
        .catch(error => {
            console.error(error);
        });
    } else {
        alert('Por favor, preencha todos os campos');
    }
}

async function loginMethod(event) {
    event.preventDefault();

    const email = document.getElementById('emailLogin').value;
    const password = document.getElementById('passwordLogin').value;

    await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (response.ok) {
            console.log(response);
            return response.json();
        }
        throw new Error('Dados inválidos');
    })
    .then(data => {
        localStorage.setItem('userId', data.user.id);
        alert("Login realizado com sucesso");
        window.location.href = 'main-page.html';
    })
    .catch(error => {
        alert("E-mail ou senha inválidos");
        console.error(error);
        //container.classList.add("active");
    });
}