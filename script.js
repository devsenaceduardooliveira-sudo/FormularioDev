const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-confirmation");

// Evitar o envio do formulário e permitir a validação personalizada
form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});

function checkInputs() {
  // Obter os valores dos campos e remover espaços em branco
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const passwordConfirmationValue = passwordConfirmation.value.trim();

  //Validar o campo de nome de usuário
  if (usernameValue === "") {
    setErrorFor(username, "O nome de usuário é obrigatório");
  } else {
    setSuccessFor(username);
  }

  //Validar o campo de email
  if (emailValue === "") {
    setErrorFor(email, "O email é obrigatório");
  } else if (!checkEmail(emailValue)) {
    setErrorFor(email, "Por favor, insira um e-mail válido");
  } else {
    setSuccessFor(email);
  }

  //Validar o campo de senha
  if (passwordValue === "") {
    setErrorFor(password, "A senha é obrigatória");
  } else if (passwordValue.length < 7) {
    setErrorFor(password, "A senha deve conter no mínimo 7 caracteres");
  } else {
    setSuccessFor(password);
  }

  // Validar o campo de confirmação de senha
  if (passwordConfirmationValue === "") {
    setErrorFor(passwordConfirmation, "A confirmação de senha é obrigatória");
  } else if (passwordConfirmationValue !== passwordValue) {
    setErrorFor(passwordConfirmation, "As senhas não conferem");
  } else {
    setSuccessFor(passwordConfirmation);
  }

  // Verificar se todos os campos estão válidos
  const formControls = form.querySelectorAll(".form-control");
  const formIsValid = [...formControls].every((formControl) => {
    return formControl.classList.contains("success");
  });

  if (formIsValid) {
    alert("Formulário enviado com sucesso!");
  }
}

// Função para exibir mensagem de erro e adicionar classe 'error'
function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  // Adicionar mensagem de erro
  small.innerText = message;
  // Adicionar a classe 'error' e remover a classe 'success'
  formControl.className = "form-control error";
}

// Função para adicionar classe 'success' e remover classe 'error'
function setSuccessFor(input) {
  const formControl = input.parentElement;
  // Adicionar a classe 'success' e remover a classe 'error'
  formControl.className = "form-control success";
}

function checkEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
  );
}
