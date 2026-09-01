/* =====================================================
   FUTEBOL CARIOCA - SCRIPT PRINCIPAL
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* --- MENU MOBILE --- */
    const menuMobile = document.getElementById("menuMobile");
    const menu = document.getElementById("menu");

    if (menuMobile && menu) {
        menuMobile.addEventListener("click", () => {
            menu.classList.toggle("aberto");
        });

        document.querySelectorAll("nav a").forEach(link => {
            link.addEventListener("click", () => {
                menu.classList.remove("aberto");
            });
        });
    }

    /* --- FILTRO DOS CLUBES --- */
    const filtros = document.querySelectorAll(".filtro");
    const clubes = document.querySelectorAll(".card-clube");

    filtros.forEach(filtro => {
        filtro.addEventListener("click", () => {
            filtros.forEach(item => item.classList.remove("ativo"));
            filtro.classList.add("ativo");

            const categoria = filtro.dataset.filtro;

            clubes.forEach(clube => {
                if (categoria === "todos" || clube.dataset.categoria === categoria) {
                    clube.style.display = ""; // Restaura o display original do CSS (ex: flex/block)
                } else {
                    clube.style.display = "none";
                }
            });
        });
    });

    /* --- PESQUISA --- */
    const campoPesquisa = document.getElementById("campoPesquisa");
    const botaoPesquisa = document.getElementById("botaoPesquisa");
    const resultadoPesquisa = document.getElementById("resultadoPesquisa");

    function pesquisar() {
        if (!campoPesquisa || !resultadoPesquisa) return;

        const termo = campoPesquisa.value.trim().toLowerCase();

        if (!termo) {
            resultadoPesquisa.innerHTML = `
                <div class="resultado-item">
                    <strong>Digite o nome de um clube.</strong>
                    <p>Experimente: Flamengo, Vasco, Botafogo, Bangu ou Madureira.</p>
                </div>
            `;
            return;
        }

        const encontrados = Array.from(clubes).filter(clube => {
            const texto = clube.innerText.toLowerCase();
            return texto.includes(termo);
        });

        if (encontrados.length === 0) {
            resultadoPesquisa.innerHTML = `
                <div class="resultado-item">
                    <strong>Nenhum clube encontrado.</strong>
                    <p>Tente pesquisar por outro nome.</p>
                </div>
            `;
            return;
        }

        resultadoPesquisa.innerHTML = encontrados.map(clube => {
            const titulo = clube.querySelector("h3")?.innerText || "Clube";
            const bairro = clube.querySelector(".bairro")?.innerText || "";
            const descricao = clube.querySelector(".conteudo-clube p:not(.bairro)")?.innerText || "";

            return `
                <div class="resultado-item">
                    <strong>${titulo}</strong>
                    ${bairro ? `<p>${bairro}</p>` : ""}
                    ${descricao ? `<p>${descricao}</p>` : ""}
                </div>
            `;
        }).join("");
    }

    if (botaoPesquisa) {
        botaoPesquisa.addEventListener("click", pesquisar);
    }

    if (campoPesquisa) {
        campoPesquisa.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                pesquisar();
            }
        });

        // Opcional: pesquisa em tempo real conforme digita
        campoPesquisa.addEventListener("input", pesquisar);
    }

    /* --- ANIMAÇÃO DOS CARDS (INTERSECTION OBSERVER) --- */
    if ("IntersectionObserver" in window) {
        const observador = new IntersectionObserver((entradas, observer) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    entrada.target.style.opacity = "1";
                    entrada.target.style.transform = "translateY(0)";
                    observer.unobserve(entrada.target); // Para de observar após animar
                }
            });
        }, { threshold: 0.08 });

        clubes.forEach(clube => {
            clube.style.opacity = "0";
            clube.style.transform = "translateY(20px)";
            clube.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            observador.observe(clube);
        });
    } else {
        // Fallback para navegadores antigos sem suporte ao IntersectionObserver
        clubes.forEach(clube => {
            clube.style.opacity = "1";
            clube.style.transform = "translateY(0)";
        });
    }

});
