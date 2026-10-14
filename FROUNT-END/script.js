
const btnAleatorio = document.getElementById("btnAleatorio");
const btnBuscar = document.getElementById("btnBuscar");
const campoCategoria = document.getElementById("categoria");
const fotoGato = document.getElementById("fotoGato");
const nomeCategoria = document.getElementById("nomeCategoria");
const mensagem = document.getElementById("mensagem");

// Busca os dados no servidor e apresenta o resultado na página.
async function buscarGato(categoria = "") {
    mensagem.textContent = "Procurando um gatinho...";
    fotoGato.hidden = true;
    nomeCategoria.textContent = "";

    const rota = categoria
        ? `/api/gatos/${encodeURIComponent(categoria.trim().toLowerCase())}`
        : "/api/gatos/aleatorio";

    try {
        const resposta = await fetch(`http://localhost:3000${rota}`);
        const dados = await resposta.json();

        if (!resposta.ok) {
            mensagem.textContent =
                dados.mensagem ||
                dados.erro ||
                "Não foi possível encontrar essa raça.";
            return;
        }

        if (!dados.foto || !dados.categoria) {
            mensagem.textContent = "Os dados recebidos estão incompletos.";
            return;
        }

        // Mostra a foto e o nome da raça.
        fotoGato.src = `http://localhost:3000${dados.foto}`;
        fotoGato.alt = `Gato da raça ${dados.categoria}`;
        nomeCategoria.textContent = `Raça: ${dados.categoria}`;
        mensagem.textContent = "Olha só que gatinho lindo! 🐾";
        fotoGato.hidden = false;

    } catch (erro) {
        console.error("Erro ao buscar gato:", erro);
        mensagem.textContent =
            "😿 Não conseguimos conectar ao servidor. Verifique se o Gato Explorer está ligado.";
    }
}

// Sorteia um gato aleatório.
btnAleatorio.addEventListener("click", () => buscarGato());

// Pesquisa a raça digitada.
btnBuscar.addEventListener("click", () => {
    if (!campoCategoria.value.trim()) {
        mensagem.textContent = "Digite o nome de uma raça para pesquisar!";
        return;
    }

    buscarGato(campoCategoria.value);
});

// Permite pesquisar apertando Enter.
campoCategoria.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
        btnBuscar.click();
    }
});
