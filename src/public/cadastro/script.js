// seção de chamada dos campos de input, de seus respectivos erros de verificação e do botão de Sign Up
const errors = Array.from(document.querySelectorAll(".error"));
const signUpBtn = document.querySelector("#signup button");
const requeridos = Array.from(document.querySelectorAll(".required"));
const checkFields = Array.from(document.querySelectorAll(".checkfields"));
const handlePwdBtn = document.querySelector(".show-pwd button");

// objeto que define os padrões de validação de cada input
const padroes = {
    email: /\w+\@\w+/,
    password: /\w{6,}/,
    username: /.\w/,
    day: /\d{1,2}/,
    month: /.\w/,
    year: /\d{4}/,
    termsUse: /\w/,
};

// objeto que define a mensagem de erro a ser exibida quando o respectivo campo de input não é
// preenchido
const erroVazio = {
    email: "You need to enter your email.",
    password: "You need to enter a password.",
    username: "Enter a name for your profile.",
    day: "Enter a valid day of the month.",
    month: "Select your birth month.",
    year: "Enter a valid year.",
    termsUse: "Please accept the terms and conditions to continue.",
};

// objeto que define a mensagem de erro a ser exibida quando o respectivo campo de input não é
// validado de acordo com o padrão citado anteriormente
const erroValidacao = {
    email: "This email is invalid. Make sure it's written like example@email.com",
    password: "Your password is too short.",
    username: "Enter a name for your profile.",
    day: "Enter a valid day of the month.",
    month: "",
    year: "Enter a valid year.",
    termsUse: "Please accept the terms and conditions to continue.",
};

// função que verifica se os campos de input estão vazios ou se são válidos
// se todos os campos estiverem devidamente preenchidos, a propridade de
// display das mensagens de erro permanecerão como 'none'
function validarCampos(nomeCampo, padrao, erroVazio, erroValidacao) {
    const campo = document.getElementById(`${nomeCampo}`);
    let erro = selecionarErro(`${nomeCampo}`);
    let errorMessage = erro.lastChild;

    if (campo.value === "") {
        errorMessage.textContent = erroVazio;
        mostrarErro(campo, erro);
    } else if (campo.value !== "" && !padrao.test(campo.value)) {
        errorMessage.textContent = erroValidacao;
        mostrarErro(campo, erro);
    } else {
        ocultarErro(campo, erro);
    }
}

// função que retorna a div de erro referente ao nome da classe do respectivo
// campo de input
function selecionarErro(att) {
    return document.getElementsByClassName(`error ${att}`)[0];
}

// função que muda propriedade de display da div de erro, referente ao nome da
// classe do respectivo campo de input para 'flex'
function mostrarErro(nomeCampo, erro) {
    erro.style.display = "flex";
    nomeCampo.style.boxShadow = "inset 0 0 0 1px #e91429";
}

// função que muda propriedade de display da div de erro, referente ao nome da
// classe do respectivo campo de input para 'none'
function ocultarErro(nomeCampo, erro) {
    erro.style.display = "none";
    nomeCampo.style.boxShadow = "inset 0 0 0 1px black";
}

// função para validar os campos gender e termsUse
function validarCheckFields() {
    const erros = Array.from(document.querySelectorAll(".error.checkfields"));
    const [erroGender, erroTermsUse] = erros;
    const checkedFields = checkFields.filter((e) => e.checked);

    if (checkedFields.length < 1) {
        erros.forEach((erro) => (erro.style.display = "flex"));
    } else if (checkedFields.length > 1) {
        erros.forEach((erro) => (erro.style.display = "none"));
    } else if (
        checkedFields.length === 1 &&
        checkedFields[0].className.includes("termsUse")
    ) {
        erroTermsUse.style.display = "none";
        erroGender.style.display = "flex";
    } else {
        erroTermsUse.style.display = "flex";
        erroGender.style.display = "none";
    }
}

function tratarPassword() {
    const passwordInput = document.querySelector("#password");
    const visibility = document.querySelector("#visibility");

    if (passwordInput.type === "password") {
        visibility.innerHTML = `<svg role="img" height="24" width="24">
                    <path
                      d="M22.207 2.824a1 1 0 1 0-1.414-1.414L17.15 5.053C15.621 4.363 13.92 4 12 4 8.671 4 5.996 5.091 3.742 7.089c-.896.794-2.3 2.353-3.381 4.453L.125 12l.236.458c1.082 2.1 2.485 3.659 3.381 4.453.278.246.562.479.853.697L1.793 20.41a1 1 0 1 0 1.414 1.414l3.126-3.126.003.002 1.503-1.503-.004-.001 1.73-1.73.004.001 1.567-1.567h-.004l4.68-4.681.001.004 1.595-1.595-.002-.003.11-.109.002.002 1.444-1.444-.003-.002 3.248-3.248zM14.884 7.32l-5.57 5.57A4.035 4.035 0 0 1 8.113 10c0-2.23 1.761-4 3.886-4 1.137 0 2.17.506 2.884 1.319zM7.9 14.304l-1.873 1.873a11.319 11.319 0 0 1-.957-.763C4.396 14.818 3.3 13.621 2.387 12c.913-1.62 2.01-2.818 2.683-3.414.519-.46 1.061-.863 1.634-1.204A6.073 6.073 0 0 0 6.113 10c0 1.681.682 3.21 1.786 4.304zm11.568-5.2 1.415-1.415a16.503 16.503 0 0 1 2.756 3.853l.236.458-.236.458c-1.082 2.1-2.485 3.659-3.381 4.453C18.004 18.908 15.328 20 12 20a13.22 13.22 0 0 1-3.08-.348l1.726-1.726c.435.05.886.074 1.354.074 2.833 0 5.037-.907 6.931-2.586.674-.596 1.77-1.793 2.683-3.414a14.515 14.515 0 0 0-2.146-2.896z"
                    ></path>
                    <path
                      d="M17.843 10.729c-.328 2.755-2.494 4.956-5.24 5.24l5.24-5.24z"
                    ></path>
                  </svg>`;
    } else {
        visibility.innerHTML = `<svg
    role="img"
    height="24"
    width="24"
    aria-hidden="true"
    viewBox="0 0 24 24"
    data-encore-id="icon"
    class="Svg-sc-ytk21e-0 gQUQL"
  >
    <path
      d="M6.703 7.382A6.073 6.073 0 0 0 6.113 10c0 3.292 2.614 6 5.887 6 3.273 0 5.886-2.708 5.886-6 0-.936-.211-1.825-.589-2.618.573.341 1.115.744 1.634 1.204.674.596 1.77 1.793 2.683 3.414-.913 1.62-2.01 2.818-2.683 3.414C17.037 17.093 14.833 18 12 18s-5.037-.907-6.931-2.586c-.674-.596-1.77-1.793-2.683-3.414.913-1.62 2.01-2.818 2.683-3.414.519-.46 1.061-.863 1.634-1.204zM12 4C8.671 4 5.996 5.091 3.742 7.089c-.896.794-2.3 2.353-3.381 4.453L.125 12l.236.458c1.082 2.1 2.485 3.659 3.381 4.453C5.996 18.908 8.672 20 12 20c3.329 0 6.004-1.091 8.258-3.089.896-.794 2.3-2.353 3.38-4.453l.237-.458-.236-.458c-1.082-2.1-2.485-3.659-3.381-4.453C18.004 5.09 15.328 4 12 4zm0 2c2.125 0 3.886 1.77 3.886 4S14.125 14 12 14s-3.886-1.77-3.886-4S9.875 6 12 6z"
    ></path>
  </svg>`;
    }
}

// trecho de código que adiciona os eventos declarados em events para as divs
// da classe .required. A cada evento, busca-se validar o respectivo campo ou,
// mostrar a devida frase de erro.
requeridos.forEach((element) => {
    let events = ["change", "input", "focusout"];
    events.forEach((event) => {
        element.addEventListener(event, () => {
            let nomeCampo = element.id;

            validarCampos(
                nomeCampo,
                padroes[`${nomeCampo}`],
                erroVazio[`${nomeCampo}`],
                erroValidacao[`${nomeCampo}`]
            );
        });
    });
});

// adição de eventos de validação dos campos de gênero
checkFields.forEach((e) => {
    e.addEventListener("change", validarCheckFields);
});

// adcionar funcionalidade de mostrar o password
handlePwdBtn.addEventListener("click", () => {
    const passwordInput = document.querySelector("#password");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        tratarPassword();
    } else {
        passwordInput.type = "password";
        tratarPassword();
    }
});

// evento que checa os campos ao apertar o botão de Sign In
signUpBtn.addEventListener("click", () => {
    requeridos.forEach((element) => {
        let nomeCampo = element.id;

        validarCampos(
            nomeCampo,
            padroes[`${nomeCampo}`],
            erroVazio[`${nomeCampo}`],
            erroValidacao[`${nomeCampo}`]
        );

        validarCheckFields();
    });
});
