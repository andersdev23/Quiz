let resultadoMostrado = false;

function verificarQuestao() {

    if (resultadoMostrado) return; // Impede múltiplas execuções

    const perguntas = document.querySelectorAll(".div-perguntas");

    perguntas.forEach(pergunta => {
        const opcoes = pergunta.querySelectorAll("input[type='radio']");
        let respondido = false;

        opcoes.forEach(opcao => {
            const container = opcao.closest(".opcao");

            if (opcao.checked) {
                respondido = true;

                // Verifica se a classe correta é 'valida' ou 'true'
                if (container.classList.contains("valida") || container.classList.contains("true")) {
                    container.style.backgroundColor = "greenyellow";
                    const div = document.createElement("div")
                    div.classList.add("aviso-questao-certa")
                    div.innerText = "Opção certa! ✅"
                    pergunta.appendChild(div);


                } else {
                    container.style.backgroundColor = "red";
                    const div = document.createElement("div")
                    div.classList.add("aviso-questao-errada")
                    div.innerText = "Opção errada! ❌"
                    pergunta.appendChild(div);
                }

            } else {
                // Remove cores de opções não selecionadas
                container.style.backgroundColor = "red";
            }

            // Desabilita todos os inputs após verificação
            opcao.disabled = true;

        });

        if (!respondido) {
            // Se nenhuma opção marcada, alerta
            const div = document.createElement("div")
            div.classList.add("aviso-questao-nao-respondida")
            div.innerText = "Atenção: Questão não respondida!"

            pergunta.appendChild(div);
        }
    });

    resultadoMostrado = true; // Marca que já foi mostrado
}

function refazer() {
    const perguntas = document.querySelectorAll(".div-perguntas");

    perguntas.forEach(pergunta => {
        // 1. Desmarcar e habilitar os radios
        const opcoes = pergunta.querySelectorAll("input[type='radio']");
        opcoes.forEach(opcao => {
            opcao.checked = false;
            opcao.disabled = false;
        });

        // 2. Limpar o fundo das divs com opções
        const divsOpcoes = pergunta.querySelectorAll(".opcao");
        divsOpcoes.forEach(div => {
            div.style.backgroundColor = "";
        });

        // 3. Remover todos os avisos adicionados dinamicamente
        const avisos = pergunta.querySelectorAll(
            ".aviso-questao-nao-respondida, .aviso-questao-certa, .aviso-questao-errada"
        );
        avisos.forEach(aviso => aviso.remove());
    });

    // 4. Permitir nova verificação
    resultadoMostrado = false;

    // 5. (Opcional) Voltar ao topo da página suavemente
    window.scrollTo({ top: 0, behavior: "smooth" });
}
