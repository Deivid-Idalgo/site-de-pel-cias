
function verificarSenha() {
    let gmail = document.getElementById("gmailCad").value;
    let nome = document.getElementById("nomeCad").value;
    let senha = document.getElementById("senhaCad").value;
    let confirmarSenha = document.getElementById("confirSenCad").value;

    if (gmail == "" || nome == "" || senha == "" || confirmarSenha == "") {
        alert("Preencha todos os campos!");
    }
    else if (senha != confirmarSenha) {
        alert("Senha incorreta!");
    }
    else {
        document.cookie = "gmail=" + encodeURIComponent(gmail) + "; max-age=86400; path=/";
        document.cookie = "nome=" + encodeURIComponent(nome) + "; max-age=86400; path=/";
        document.cookie = "senha=" + encodeURIComponent(senha) + "; max-age=86400; path=/";

        alert("Cadastro realizado com sucesso!");
        window.location.href = "../PagInicial/Principal.html";

        alert("Cookies salvos: " + document.cookie);
    }
}