async function fetchDadosIdade() {
    const response = await fetch('/dados_idade');
    const data = await response.json();
    return data;
}

document.addEventListener('DOMContentLoaded', async function() {
    const data = await fetchDadosIdade();
    const ctx = document.getElementById('graficoIdade').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Quantidade de Pessoas por Idade',
                data: data.data,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', async () => {
    // Fetch data from the Flask endpoint
    const response = await fetch('/heart_data');
    const data = await response.json();

    const ctx = document.getElementById('pieChart').getContext('2d');
    const pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.percentages,
                backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
});

        document.getElementById("preverForm").addEventListener("submit", async function (event) {
            event.preventDefault();

            const idade = document.getElementById("idade").value;
            const sexo = document.getElementById("sexo").value;
            const pressao_arterial = document.getElementById("pressao_arterial").value;
            const colesterol = document.getElementById("colesterol").value;

            const response = await fetch("/prever", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idade: Number(idade),
                    sexo: Number(sexo),
                    pressao_arterial: Number(pressao_arterial),
                    colesterol: Number(colesterol),
                }),
            });

            const mais = document.getElementById("mais");
            const menos = document.getElementById("menos");
            mais.style.display = "none";
            menos.style.display = "none";

            const result = await response.json();
            if (result.previsao !== undefined) {
                if (result.previsao === 1) {
                    mais.style.display = "block";
                } else {
                    menos.style.display = "block";
                }
            } else {
                document.getElementById("resultado").innerText = "Erro: " + result.erro;
            }
        });