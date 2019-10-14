        let form = document.getElementById('formulario')
        form.addEventListener('submit', function(event) {
            const nome = document.getElementById("nome").value;
            const cep = document.getElementById("cep").value;
            const renda = document.getElementById("renda").value;
            const dependentes = document.getElementById("dependentes").value;
            event.preventDefault()
            $.ajax({
                type: 'post',
                url: "http://localhost:3000/calculo",
                data: {
                    "nome": nome,
                    "cep": cep,
                    "renda": renda,
                    "dependentes": dependentes
                },
                success: function(result) {
                    document.getElementById("result").innerHTML = `
                        <h1>Resultados: </h1>
                        <div id="retorno">
                        <div class="dados">
                            <label>Nome:</label>
                            ${result.nome}
                        </div>
                        <div class="dados">
                            <label>CEP:</label>
                            ${result.cep}
                        </div>
                        <div class="dados">
                            <label>Cidade:</label>
                            ${result.cidade}
                        </div>
                        <div class="dados">
                            <label>Bairro:</label>
                            ${result.bairro}
                        </div>
                        <div class="dados">
                            <label>Logradouro:</label>
                            ${result.logradouro}
                        </div>
                        <div class="dados">
                            <label>Renda per capita:</label>
                            ${result.calculoTotal}
                        </div>
                        </div>
                    `;
                }
            });

        })