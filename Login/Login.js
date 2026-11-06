function verificarLogin() {
    let gmail = document.getElementById("gmailLogin").value;
    let senha = document.getElementById("senhaLogin").value;

    let gmailSalvo = "";
    let senhaSalva = "";

    let cookies = document.cookie.split("; ");

    for (let i = 0; i < cookies.length; i++) {
        let partes = cookies[i].split("=");

        if (partes[0] == "gmail") {
            gmailSalvo = decodeURIComponent(partes.slice(1).join("="));
        }

        if (partes[0] == "senha") {
            senhaSalva = decodeURIComponent(partes.slice(1).join("="));
        }
    }

    if (gmail == gmailSalvo && senha == senhaSalva && gmailSalvo != "" && senhaSalva != "") {
        window.location.href = "../PagInicial/Principal.html";
    } else {
        alert("E-mail ou senha incorretos!");
    }
}