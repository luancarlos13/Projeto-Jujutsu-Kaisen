const normalizar = (texto = "") =>
  texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();


const aliases = {
  "love hashira": "mitsuri kanroji",
  pedra: "gyomei himejima",
  mestre: "ubuyashiki",
  "lua 1": "kokushibo",
};

const personagens = {
  1: { titulo: "Yuji Itadori", imagem: "personagens/wallpapersden.com_yuji-itadori-fortnite_1920x1080.jpg", paragraph: "Yuji Itadori é o protagonista principal da série Jujutsu Kaisen . Ele é filho de Jin Itadori e Kaori Itadori , e neto de Wasuke Itadori . Yuji vivia uma vida normal na cidade de Sendai até encontrar Megumi e comer um dos dedos de Sukuna . Após se tornar o receptáculo de Sukuna, Yuji começou a frequentar a Escola de Jujutsu de Tóquio junto com Megumi e Nobara como alunos do primeiro ano." },
  2: { titulo: "Satoru Gojo", imagem: "personagens/gojo.webp", paragraph: "Satoru Gojo é um dos principais protagonistas da série Jujutsu Kaisen . Ele é um feiticeiro jujutsu de nível especial e amplamente reconhecido como o mais forte do mundo. Satoru é o orgulho do Clã Gojo , a primeira pessoa em quatrocentos anos a herdar tanto o Poder Ilimitado quanto os Seis Olhos . Ele trabalha como professor na Escola de Jujutsu de Tóquio e usa sua influência para proteger e treinar jovens aliados poderosos." },
  3: { titulo: "Megumi Fushiguro", imagem: "personagens/jujutsu-kaisen-5120x3657-fushi.jpg", paragraph: "Megumi Fushiguro é o deuteragonista da série Jujutsu Kaisen. Ele é um feiticeiro jujutsu de classe 2 e estudante do primeiro ano na Escola Jujutsu de Tóquio junto com Yuji Itadori e Nobara Kugisaki. Megumi é o meio-irmão de Tsumiki Fushiguro e como filho de Toji Fushiguro, Megumi também é um descendente do Clã Zenin. Megumi nasceu fora do clã como a carta na manga de Toji e eventualmente foi encontrado por Satoru Gojo, que se tornou seu mentor e o matriculou na Escola Jujutsu como seu aluno." },
  4: { titulo: "Ryomen Sukuna", imagem: "personagens/sukuna 4k.jpg", paragraph: "Ryomen Sukuna, mais frequentemente chamado de simplesmente Sukuna (宿すく儺な Sukuna?), é o feiticeiro jujutsu mais forte de mais de mil anos atrás. Considerado como o indiscutível Rei das Maldições, Sukuna é um dos antagonistas principais da série Jujutsu Kaisen." },
  5: { titulo: "Nobara Kugisaki", imagem: "personagens/nobara_kugisaki_x_mobile_legends_8k_wallpaper_by_newjer53_dfph3lh-fullview.jpg", paragraph: "Nobara Kugisaki é a tritagonista da série Jujutsu Kaisen. Ela é uma estudante do primeiro ano e feiticeira jujutsu de classe 3 na Escola Jujutsu de Tóquio estudando sob Satoru Gojo junto com Yuji e Megumi." },
  6: { titulo: "Kento Nanami", imagem: "personagens/nanami.gif", paragraph: "Kento Nanami é um personagem secundário maior em Jujutsu Kaisen. Ele era um estudante na Escola Jujutsu de Tóquio onde seus veteranos eram Satoru Gojo e Suguru Geto. Nanami inicialmente saiu da Escola Jujutsu após graduar para se tornar um homem assalariado, mas voltou quatro anos depois para continuar trabalhando como um feiticeiro jujutsu." },
  7: { titulo: "Toge Inumaki", imagem: "personagens/wallpapersden.com_toge-inumaki-4k-jujutsu-kaisen-art_3840x2160.jpg", paragraph: "Toge Inumaki é um personagem secundário em Jujutsu Kaisen e um dos principais protagonistas de seu prelúdio, Jujutsu Kaisen 0: Jujutsu High . Ele é descendente do Clã Inumaki e herdou sua Fala Amaldiçoada , o que o fez desenvolver um padrão de fala único para evitar amaldiçoar os outros. Toge é atualmente um feiticeiro jujutsu de nível intermediário e aluno do segundo ano do Colégio Jujutsu de Tóquio, junto com seus colegas Yuta Okkotsu , Maki Zenin e Panda" },
  8: { titulo: "Maki Zenin", imagem: "personagens/zenin2.jpg", paragraph: "Maki Zenin é uma importante personagem secundária em Jujutsu Kaisen e uma das principais protagonistas de seu prelúdio, Jujutsu Kaisen 0: Jujutsu High . Atualmente, ela cursa o segundo ano na Escola de Jujutsu de Tóquio." },
  9: { titulo: "Panda", imagem: "personagens/panda.jpg", paragraph: "Panda é um importante personagem secundário em Jujutsu Kaisen e um dos principais protagonistas de seu prelúdio, Jujutsu Kaisen 0: Jujutsu High. Apesar de seu nome e aparência, Panda não é um panda de verdade, mas sim um Cadáver Amaldiçoado por Mutação Abrupta criado por Masamichi Yaga . Ele frequenta o Colégio Jujutsu como aluno do segundo ano, juntamente com Maki Zenin , Toge Inumaki e Yuta Okkotsu." },
  10: { titulo: "Noritoshi Kamo", imagem: "personagens/kamo.jpg", paragraph: "Noritoshi Kamo é um personagem de Jujutsu Kaisen. Ele é um aluno do terceiro ano do Colégio de Jujutsu de Kyoto e ex-herdeiro do Clã Kamo." },
  11: { titulo: "Suguru Geto", imagem: "personagens/geto.jpg", paragraph: "Suguru Geto é um antagonista tanto na série Jujutsu Kaisen quanto em seu prelúdio , Jujutsu Kaisen 0: Jujutsu High , sendo o principal antagonista do Arco da Criança Amaldiçoada e o deuteragonista do Arco do Passado de Gojo. Ele era originalmente aluno de Masamichi Yaga, juntamente com Satoru Gojo e Shoko Ieiri, na Escola de Jujutsu de Tóquio. Suas experiências como feiticeiro de jujutsu geraram um profundo ódio por aqueles que não eram feiticeiros, levando a um incidente em que ele massacrou mais de cem civis em uma única noite. Por causa disso, ele foi expulso da Escola de Jujutsu e passou a ser conhecido como o pior de todos os usuários de maldições." },
  12: { titulo: "Aoi Todo", imagem: "personagens/aoi-todo.jpg", paragraph: "Aoi Todo é um importante personagem secundário na série Jujutsu Kaisen. Ele é um aluno do terceiro ano do Colégio de Jujutsu de Kyoto e um feiticeiro de jujutsu de nível 1. Foi aluno de Yuki Tsukumo na juventude e é o autoproclamado melhor amigo de Yuji Itadori , além de fã da idol Nobuko Takada." },
  13: { titulo: "Kasumi Miwa", imagem: "personagens/miwa.jpeg", paragraph: "Kasumi Miwa é uma personagem da série Jujutsu Kaisen. Ela é uma estudante do segundo ano do Colégio de Jujutsu de Kyoto." },
  14: { titulo: "Kokichi Muta", imagem: "personagens/mecha.webp", paragraph: "Kokichi Muta é um personagem secundário na série Jujutsu Kaisen. Ele é um aluno do segundo ano do Colégio de Jujutsu de Kyoto , usando o Ultimate Mechamaru como seu substituto para frequentar a escola. O próprio Kokichi não podia frequentá-la devido ao corpo frágil e doentio com o qual nasceu como resultado de sua Restrição Celestial." },
  15: { titulo: "Momo Nishimiya", imagem: "personagens/momo.jpg", paragraph: "Momo Nishimiya é uma personagem da série Jujutsu Kaisen. Ela é uma feiticeira de jujutsu e aluna do terceiro ano do Colégio de Jujutsu de Kyoto." },
  16: { titulo: "Jogo", imagem: "personagens/Jogo_forces_civilians_on_the_train_tracks_29.webp", paragraph: "Jogo é um dos principais antagonistas da série Jujutsu Kaisen . Ele era um espírito amaldiçoado de grau especial não registrado , aliado a Mahito , Hanami e Dagon . Jogo acreditava que as maldições eram os verdadeiros humanos e desejava um mundo onde sua espécie dominasse a Terra em vez deles." },
  17: { titulo: "Mahito", imagem: "personagens/mahito-de-jujutsu-kaisen-12107.webp", paragraph: "Mahito é um dos principais antagonistas da série Jujutsu Kaisen . Ele é um espírito amaldiçoado de grau especial não registrado, aliado a Kenjaku . Ele também é o líder de seu próprio grupo, composto por Jogo , Hanami e Dagon . O objetivo final do seu grupo é a erradicação da humanidade e, por fim, a substituição da população por espíritos amaldiçoados." },
  18: { titulo: "Yuta Okkotsu", imagem: "personagens/jujutsu-kaisen-yuta-okkotsu-wallpaper-2880x1800_8.jpg", paragraph: "Yuta Okkotsu é um importante personagem secundário na série Jujutsu Kaisen e o protagonista principal de sua prequela, Jujutsu Kaisen 0: Jujutsu High. Inicialmente, ele era um humano amaldiçoado de grau especial , assombrado por sua falecida amiga de infância, Rika Orimoto . Satoru Gojo matriculou Yuta na Escola de Jujutsu de Tóquio e o treinou para se tornar um feiticeiro jujutsu." },
  19: { titulo: "Toji Fushiguro", imagem: "personagens/toji.png", paragraph: "Toji Fushiguro é um personagem recorrente na série Jujutsu Kaisen e o principal antagonista do Arco do Passado de Gojo , além de um antagonista secundário no Arco do Incidente de Shibuya. Ele foi um ex-membro do Clã Zenin e um infame assassino conhecido como o Assassino de Feiticeiros contratado pela Associação de Vasos Temporais, entre outros grupos, durante o tempo em que não era um usuário de maldições. Ele também era o pai de Megumi Fushiguro e um inimigo de Satoru Gojo." },
};


const personagensPorSlug = Object.entries(personagens).reduce((accumulator, [id, personagem]) => {
  accumulator[normalizar(personagem.titulo)] = { id, ...personagem };
  return accumulator;
}, {});


function encontrarPersonagemPorTexto(texto = "") {
  const slug = aliases[normalizar(texto)] || normalizar(texto);

  if (personagensPorSlug[slug]) {
    return personagensPorSlug[slug];
  }

  return Object.values(personagensPorSlug).find((personagem) => {
    const tituloSlug = normalizar(personagem.titulo);
    return tituloSlug.includes(slug) || slug.includes(tituloSlug);
  });
}

function preencherDetalhesDoPersonagem() {
  const params = new URLSearchParams(window.location.search);
  const personagemSlug = params.get("personagem");
  const personagem = personagemSlug
    ? Object.values(personagensPorSlug).find((item) => normalizar(item.titulo) === personagemSlug)
    : null;

  const titulo = document.getElementById("detalhes-titulo");
  const imagem = document.getElementById("detalhes-imagem");
  const descricao = document.getElementById("detalhes-descricao");

  if (titulo && imagem && descricao && personagem) {
    titulo.textContent = personagem.titulo;
    imagem.src = personagem.imagem;
    imagem.alt = personagem.titulo;
    descricao.textContent = personagem.paragraph;

    const painel = document.querySelector("main");
    if (painel) {
      painel.style.background = "#000000";
    }
  }
}

function adicionarCliqueNasBandeiras() {
  const cards = document.querySelectorAll(".container-cards .cards");

  cards.forEach((card) => {
    const imagem = card.querySelector("img");
    imagem.style.cursor = "pointer";
    card.setAttribute("role", "link");
    card.setAttribute("tabindex", "0");

    const abrirDetalhes = () => {
      const personagem = encontrarPersonagemPorTexto(imagem.alt || "");

      if (!personagem) {
        return;
      }

      const url = `index2.html?personagem=${encodeURIComponent(normalizar(personagem.titulo))}`;
      window.location.href = url;
    };

    card.addEventListener("click", abrirDetalhes);
    card.addEventListener("keydown", (evento) => {
      if (evento.key === "Enter" || evento.key === " ") {
        evento.preventDefault();
        abrirDetalhes();
      }
    });
  });
}

function configurarMenuResponsivo() {
  const menu = document.querySelector(".menu");
  const botao = document.querySelector(".menu-toggle");

  if (!menu || !botao) {
    return;
  }

  botao.addEventListener("click", () => {
    const aberto = menu.classList.toggle("menu-aberto");
    botao.setAttribute("aria-expanded", String(aberto));
    menu.querySelector(".detalhes").hidden = !aberto;
  });

  menu.querySelectorAll(".detalhes a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("menu-aberto");
      botao.setAttribute("aria-expanded", "false");
      menu.querySelector(".detalhes").hidden = true;
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  configurarMenuResponsivo();

  if (document.querySelector(".container-cards")) {
    adicionarCliqueNasBandeiras();
  }

  if (document.getElementById("detalhes-selecao")) {
    preencherDetalhesDoPersonagem();
  }
});
