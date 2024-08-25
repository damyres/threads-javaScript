const graficoDolar = document.getElementById('graficoDolar')

const graficoParaDolar = new Chart(graficoDolar, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Dólar',
            data: [],
            borderWidth: 1
        }]
    },
});

setInterval(() => conectaApi(), 5000)
async function conectaApi() {
    const conecta = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL")
    const conectaTraduzido = await conecta.json()
    let tempo = geraHorario()
    let valor = conectaTraduzido.USDBRL.ask
    adicionardados(graficoParaDolar, tempo, valor)
}

function geraHorario() {
    let data = new Date()
    let horario = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds()
    console.log(horario)
    return horario
}

function adicionardados(grafico, legenda, dados) {
    grafico.data.labels.push(legenda)
    grafico.data.datasets.forEach((dataset) => {
        dataset.data.push(dados)
    })
    grafico.update()
}

