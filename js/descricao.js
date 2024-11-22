document.addEventListener("DOMContentLoaded", () => {
    const session = sessionStorage.getItem("userName");
    if (session !== "ce855f48b7422de36b50512a9a0a06a59d4f2f6efac6f439456777a396773cc1") {
        window.location.href = "../login.html";
    }
});

const btnBack = document.getElementById("btn-back");
btnBack.addEventListener("click", () => {
    window.location.href = "../index.html";
});

async function asyncMoreInformation() {
    const urlParams = new URLSearchParams(window.location.search);
    const playerId = urlParams.get("id");

    try {
        const response = await fetch(`https://botafogo-atletas.mange.li/2024-1/${playerId}`);
        const player = await response.json();
        if (player.id) {
            createCardDetails(player);
        }
        else {
            const mainContainer = document.getElementById("main");
            const h1Error = document.createElement("h1");
            h1Error.classList.add("h1Error");
            h1Error.textContent = "Ocorreu um Erro!";
            mainContainer.append(h1Error);
        }
    } catch (err) {
        console.error("Ocorreu um erro!");
    }
}

function createCardDetails(player) {
    const mainContainer = document.getElementById("main");

    const article = document.createElement("article");
    article.classList.add("article-player");

    const img = document.createElement("img");
    img.src = player.imagem;

    const h1 = document.createElement("h1");
    h1.textContent = `Nome: ${player.nome}`;

    const h2 = document.createElement("h2");
    h2.textContent = `Detalhes: ${player.detalhes}`;
    h2.classList.add("details");

    const pGames = document.createElement("p");
    pGames.textContent = `Qtd jogos participados: ${player.n_jogos}`;

    const pBirthDate = document.createElement("p");
    pBirthDate.textContent = `Data de Nascimento: ${player.nascimento}`;

    const pHeigth = document.createElement("p");
    pHeigth.textContent = `Altura: ${player.altura}`;

    const pNationality = document.createElement("p");
    pNationality.textContent = `Nacionalidade: ${player.naturalidade}`;

    article.append(img, h1, h2, pGames, pBirthDate, pHeigth, pNationality);

    mainContainer.append(article);
}

asyncMoreInformation();