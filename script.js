/* =====================================================
FUTEBOL CARIOCA
JAVASCRIPT
===================================================== */

/* =====================================================
MENU MOBILE
===================================================== */

const menuMobile =
document.getElementById("menuMobile");

const menu =
document.getElementById("menu");

menuMobile.addEventListener("click", () => {

menu.classList.toggle("aberto");

});

document.querySelectorAll("nav a").forEach(link => {


link.addEventListener("click", () => {

    menu.classList.remove("aberto");

});


});

/* =====================================================
FILTRO DOS CLUBES
===================================================== */

const filtros =
document.querySelectorAll(".filtro");

const clubes =
document.querySelectorAll(".card-clube");

filtros.forEach(filtro => {


filtro.addEventListener("click", () => {


    filtros.forEach(item => {

        item.classList.remove("ativo");

    });


    filtro.classList.add("ativo");


    const categoria =
        filtro.dataset.filtro;


    clubes.forEach(clube => {


        if (
            categoria === "todos" ||
            clube.dataset.categoria === categoria
        ) {

            clube.style.display = "block";

        } else {

            clube.style.display = "none";

        }

    });

});


});

/* =====================================================
PESQUISA
===================================================== */

const campoPesquisa =
document.getElementById("campoPesquisa");

const botaoPesquisa =
document.getElementById("botaoPesquisa");

const resultadoPesquisa =
document.getElementById("resultadoPesquisa");

function pesquisar() {


const termo =
    campoPesquisa.value
    .trim()
    .toLowerCase();


if (!termo) {

    resultadoPesquisa.innerHTML = `

        <div class="resultado-item">

            <strong>
                Digite o nome de um clube.
            </strong>

            <p>
                Experimente: Flamengo, Vasco,
                Botafogo, Bangu ou Madureira.
            </p>

        </div>

    `;

    return;

}


let encontrados = [];


clubes.forEach(clube => {


    const texto =
        clube.innerText.toLowerCase();


    if (texto.includes(termo)) {

        encontrados.push(clube);

    }

});


if (encontrados.length === 0) {

    resultadoPesquisa.innerHTML = `

        <div class="resultado-item">

            <strong>
                Nenhum clube encontrado.
            </strong>

            <p>
                Tente pesquisar por outro nome.
            </p>

        </div>

    `;

    return;

}


resultadoPesquisa.innerHTML =
    encontrados.map(clube => `

        <div class="resultado-item">

            <strong>
                ${clube.querySelector("h3").innerText}
            </strong>

            <p>
                ${clube.querySelector(".bairro").innerText}
            </p>

            <p>
                ${clube.querySelector(
                    ".conteudo-clube p:not(.bairro)"
                ).innerText}
            </p>

        </div>

    `).join("");


}

botaoPesquisa.addEventListener(
"click",
pesquisar
);

campoPesquisa.addEventListener(
"keydown",
event => {


    if (event.key === "Enter") {

        pesquisar();

    }

}


);

/* =====================================================
ANIMAÇÃO DOS CARDS
===================================================== */

const observador =
new IntersectionObserver(
entradas => {


        entradas.forEach(entrada => {

            if (entrada.isIntersecting) {

                entrada.target.style.opacity = "1";

                entrada.target.style.transform =
                    "translateY(0)";

            }

        });

    },
    {
        threshold: 0.08
    }
);


clubes.forEach(clube => {


clube.style.opacity = "0";

clube.style.transform =
    "translateY(20px)";

clube.style.transition =
    "opacity 0.5s ease, transform 0.5s ease";

observador.observe(clube);


});
