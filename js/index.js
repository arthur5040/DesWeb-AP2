document.addEventListener("DOMContentLoaded", (e) => {
  const session = sessionStorage.getItem("userName");
  if (
    session !==
    "ce855f48b7422de36b50512a9a0a06a59d4f2f6efac6f439456777a396773cc1"
  ) {
    window.location.href = "../index.html";
  } else {
    exec();
  }
});

function exec() {
  let players = [];

  const btnLogout = document.getElementById("btn-logout");
  btnLogout.addEventListener("click", () => {
    window.location.href = "../index.html";
    sessionStorage.removeItem("userName");
  });

  const btnAllPlayers = document.getElementById("all");
  const btnFeminine = document.getElementById("feminine");
  const btnMasculine = document.getElementById("masculine");

  btnAllPlayers.addEventListener("click", asyncGetAllPlayers);

  async function asyncGetAllPlayers() {
    const response = await fetch(
      "https://botafogo-atletas.mange.li/2024-1/all"
    );
    const playersArray = await response.json();
    players = [...playersArray];

    removeAllPlayersOnDisplay();
    players.forEach(createCardPlayer);
  }

  btnMasculine.addEventListener("click", asyncGetMasculinePlayers);
  async function asyncGetMasculinePlayers() {
    const response = await fetch(
      "https://botafogo-atletas.mange.li/2024-1/masculino"
    );
    const playersArray = await response.json();
    removeAllPlayersOnDisplay();
    playersArray.forEach(createCardPlayer);
  }

  btnFeminine.addEventListener("click", asyncGetFemininePlayers);

  async function asyncGetFemininePlayers() {
    const response = await fetch(
      "https://botafogo-atletas.mange.li/2024-1/feminino"
    );
    const playersArray = await response.json();
    removeAllPlayersOnDisplay();
    playersArray.forEach(createCardPlayer);
  }

  function createCardPlayer(player) {
    const containerPlayers = document.getElementById("container-players");

    const article = document.createElement("article");
    article.classList.add("cardPlayer");
    article.dataset.id = player.id;

    const imgPlayer = document.createElement("img");
    imgPlayer.src = player.imagem;

    // Nome do jogador
    const titleH2 = document.createElement("h2");
    titleH2.textContent = player.nome;
    titleH2.classList.add("titleH2");

    // Link com o saiba mais
    const information = document.createElement("h3");
    information.textContent = "Saiba Mais";
    information.classList.add("information");
    information.addEventListener("click", (e) => {
      // Pegar a informação do ID e passando via QUERY STRING REDIRECIONANDO para a pagina DETALHES.html, que irá fazer um FETCH(GET) a partir do ID e usar as informações do jogador retornado.
      window.location.href = `../DesWeb-AP2/descricao.html?id=${e.target.parentNode.dataset.id}`;
    });

    article.append(imgPlayer, titleH2, information);
    containerPlayers.append(article);
  }

  function removeAllPlayersOnDisplay() {
    const childs = document.querySelectorAll("article");
    childs.forEach((articleCard) => articleCard.remove());
  }

  const inputNamePlayer = document.getElementById("input-id");
  inputNamePlayer.addEventListener("input", filterPlayersByName);

  function filterPlayersByName() {
    const childs = document.querySelectorAll("article");
    // cardPlayer é o ARTICLE.
    Array.from(childs).forEach((cardPlayer) => {
      // se não for igual, então some da tela.
      if (
        !cardPlayer.childNodes[1].textContent
          .toLowerCase()
          .includes(inputNamePlayer.value.toLowerCase())
      ) {
        cardPlayer.style.display = "none";
      }
      // se for igual, então aparece na tela.
      else if (
        cardPlayer.childNodes[1].textContent
          .toLowerCase()
          .includes(inputNamePlayer.value.toLowerCase())
      ) {
        cardPlayer.style.display = "block";
      }
    });
  }

  // --------
  // Função para criar o SELECT e substituir os botões
  function transformButtonsToSelect() {
    const container = document.querySelector(".select-menu");
    const buttons = document.querySelectorAll(".btn-menu");

    // Verifica se o SELECT já foi criado
    if (window.innerWidth <= 768) {
      // Se SELECT já existir, não recria
      if (document.querySelector("#menu-select")) return;

      // Cria o SELECT
      const select = document.createElement("select");
      select.id = "menu-select";
      select.style.width = "100%";

      // Converte botões em opções do SELECT
      buttons.forEach((button) => {
        const option = document.createElement("option");
        option.value = button.id; // Valor do botão vira o valor da opção
        option.textContent = button.textContent; // Texto do botão vira o texto da opção
        select.appendChild(option);
      });

      // Substitui botões pelo SELECT
      buttons.forEach((button) => (button.style.display = "none"));
      container.appendChild(select);

      // Adiciona listener para selecionar a opção
      select.addEventListener("change", (e) => {
        const selectedValue = e.target.value;

        // Chama as funções específicas baseadas na escolha
        switch (selectedValue) {
          case "all":
            asyncGetAllPlayers();
            break;
          case "feminine":
            asyncGetFemininePlayers();
            break;
          case "masculine":
            asyncGetMasculinePlayers();
            break;
          default:
            console.log("Opção não reconhecida:", selectedValue);
        }
      });
    } else {
      // Remove o SELECT e exibe os botões novamente em telas maiores
      const select = document.querySelector("#menu-select");
      if (select) select.remove();
      buttons.forEach((button) => (button.style.display = "inline-block"));
    }
  }

  // Chama a função ao carregar e ao redimensionar a janela
  window.addEventListener("load", transformButtonsToSelect);
  window.addEventListener("resize", transformButtonsToSelect);
}
