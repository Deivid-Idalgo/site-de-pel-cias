
function lerCookie(nome) {
    let cookies = document.cookie.split("; ");

    for (let i = 0; i < cookies.length; i++) {
        let partes = cookies[i].split("=");

        if (partes[0] == nome) {
            return decodeURIComponent(partes.slice(1).join("="));
        }
    }

    return "";
}


// Variáveis principais
let codigoCorreto = "";
let emailConfirmado = "";

const formEmail = document.getElementById("formEmail");
const formCodigo = document.getElementById("formCodigo");
const formNovaSenha = document.getElementById("formNovaSenha");

const areaCodigo = document.getElementById("areaCodigo");
const areaNovaSenha = document.getElementById("areaNovaSenha");
const mensagem = document.getElementById("mensagem");


// ETAPA 1 - Verificar e-mail
formEmail.addEventListener("submit", function (event) {
    event.preventDefault();

    let email = document.getElementById("emailRecuperar").value.trim();
    let emailSalvo = lerCookie("gmail");

    if (emailSalvo == "" || email.toLowerCase() != emailSalvo.toLowerCase()) {
        mensagem.textContent = "Este e-mail não está cadastrado.";

        areaCodigo.hidden = true;
        areaNovaSenha.hidden = true;

        return;
    }

    emailConfirmado = emailSalvo;

    // Gerar código de seis dígitos
    codigoCorreto = String(Math.floor(100000 + Math.random() * 900000));

    document.getElementById("codigoGerado").textContent = codigoCorreto;
    document.getElementById("codigoDigitado").value = "";

    areaCodigo.hidden = false;
    areaNovaSenha.hidden = true;

    mensagem.textContent = "Código gerado. Digite-o no campo abaixo.";
});


// ETAPA 2 - Conferir código
formCodigo.addEventListener("submit", function (event) {
    event.preventDefault();

    let digitado = document.getElementById("codigoDigitado").value.trim();

    if (digitado == codigoCorreto && codigoCorreto != "") {
        areaNovaSenha.hidden = false;

        mensagem.textContent = "";
    } else {
        mensagem.textContent = "Código incorreto. Tente novamente.";
    }
});


// ETAPA 3 - Alterar senha
formNovaSenha.addEventListener("submit", function (event) {
    event.preventDefault();

    let nova = document.getElementById("novaSenha").value;
    let confirmar = document.getElementById("confirmarNovaSenha").value;

    // Verificar se as senhas coincidem
    if (nova != confirmar) {
        mensagem.textContent = "As senhas não coincidem.";
        return;
    }

    // Confirmar novamente a conta
    if (
        emailConfirmado == "" ||
        lerCookie("gmail").toLowerCase() != emailConfirmado.toLowerCase()
    ) {
        mensagem.textContent = "Não foi possível confirmar a conta. Comece novamente.";

        areaCodigo.hidden = true;
        areaNovaSenha.hidden = true;

        return;
    }

    // Salvar nova senha no cookie
    document.cookie = "senha=" + encodeURIComponent(nova) + "; max-age=86400; path=/";

    mensagem.textContent = "Senha alterada com sucesso! Redirecionando para o login...";

    formNovaSenha.reset();

    setTimeout(function () {
        window.location.href = "../Login/Login.html";
    }, 1500);
});
