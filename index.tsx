<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Show do Milhão Matemático - SAEB</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        const { useState, useEffect } = React;

        const QUESTOES = {
            facil: [
                {
                    id: 1, descritor: "D15",
                    enunciado: "Uma empresa gasta 1,5 kg de açúcar por semana para cada 7 empregados. Se essa empresa gasta 9 kg de açúcar por semana, quantos empregados tomam cafezinho?",
                    alternativas: ["11 empregados", "42 empregados", "53 empregados", "63 empregados", "17 empregados"],
                    correta: 1,
                    dica: "Use regra de três simples: 1,5kg está para 7 empregados, assim como 9kg está para x empregados"
                },
                {
                    id: 2, descritor: "D16",
                    enunciado: "Em um concurso público com 60 questões, o candidato que acertar 42 questões obterá qual porcentual de acertos?",
                    alternativas: ["30%", "55%", "42%", "70%", "60%"],
                    correta: 3,
                    dica: "Porcentagem = (parte dividido pelo todo) multiplicado por 100"
                },
                {
                    id: 3, descritor: "D11",
                    enunciado: "Uma praça quadrada possui lados medindo 6 metros cada. Qual é o perímetro dessa praça?",
                    alternativas: ["12 metros", "18 metros", "24 metros", "36 metros", "48 metros"],
                    correta: 2,
                    dica: "Perímetro do quadrado = 4 vezes o lado"
                },
                {
                    id: 4, descritor: "D15",
                    enunciado: "Serão convidadas 60 pessoas para uma festa, mantendo a relação de 3 adolescentes para cada 2 adultos. Quantos adolescentes serão convidados?",
                    alternativas: ["36 adolescentes", "30 adolescentes", "24 adolescentes", "20 adolescentes", "16 adolescentes"],
                    correta: 0,
                    dica: "Some as partes da proporção (3+2=5) e calcule a fração correspondente aos adolescentes"
                },
                {
                    id: 5, descritor: "D18",
                    enunciado: "Observando uma tabela de produção: 2 trabalhadores produzem 60 peças, 4 trabalhadores produzem 120 peças, 6 trabalhadores produzem 180 peças. Qual expressão relaciona o número de peças N com o número de trabalhadores n?",
                    alternativas: ["N = 30n", "N = 40n", "N = 50n", "N = 60n", "N = 70n"],
                    correta: 0,
                    dica: "Divida o número de peças pelo número de trabalhadores para encontrar a constante"
                },
                {
                    id: 6, descritor: "D14",
                    enunciado: "Em uma reta numérica que vai de -30 até -10, onde está localizado exatamente o ponto que representa -20?",
                    alternativas: ["No início da reta", "A um quarto do caminho", "Exatamente no meio", "A três quartos do caminho", "No final da reta"],
                    correta: 2,
                    dica: "O número -20 está a mesma distância de -30 e de -10"
                },
                {
                    id: 7, descritor: "D11",
                    enunciado: "Um retângulo tem 8 metros de comprimento e 5 metros de largura. Qual é o perímetro desse retângulo?",
                    alternativas: ["13 metros", "26 metros", "40 metros", "52 metros", "65 metros"],
                    correta: 1,
                    dica: "Perímetro do retângulo = 2 vezes (comprimento + largura)"
                },
                {
                    id: 8, descritor: "D16",
                    enunciado: "Um produto que custava R$ 200,00 teve um desconto de 15%. Qual é o novo preço do produto?",
                    alternativas: ["R$ 150,00", "R$ 170,00", "R$ 185,00", "R$ 190,00", "R$ 195,00"],
                    correta: 1,
                    dica: "Calcule 15% de 200 e depois subtraia do valor original"
                },
                {
                    id: 9, descritor: "D15",
                    enunciado: "Três pedreiros constroem um muro em 12 dias. Trabalhando no mesmo ritmo, quantos dias 6 pedreiros levariam para construir o mesmo muro?",
                    alternativas: ["3 dias", "6 dias", "8 dias", "9 dias", "24 dias"],
                    correta: 1,
                    dica: "Grandezas inversamente proporcionais: mais pedreiros, menos dias"
                },
                {
                    id: 10, descritor: "D6",
                    enunciado: "No plano cartesiano, qual descrição corresponde ao ponto representado pelo par ordenado (3, -2)?",
                    alternativas: ["3 à direita e 2 acima da origem", "3 à esquerda e 2 abaixo da origem", "3 à direita e 2 abaixo da origem", "2 à direita e 3 abaixo da origem", "3 acima e 2 à direita da origem"],
                    correta: 2,
                    dica: "O primeiro número é a posição horizontal (x), o segundo é a posição vertical (y)"
                }
            ],
            medio: [
                {
                    id: 11, descritor: "D19",
                    enunciado: "Uma torneira despeja 2,5 litros de água por minuto em um tanque inicialmente vazio. Se y representa o volume em litros e x o tempo em minutos, qual função representa essa situação?",
                    alternativas: ["y = 2,5x + 15", "y = 2x - 15", "y = 2,5x", "y = 2x", "y = x + 2,5"],
                    correta: 2,
                    dica: "Volume = vazão multiplicada pelo tempo. Não há volume inicial"
                },
                {
                    id: 12, descritor: "D22",
                    enunciado: "Em uma Progressão Aritmética (PA) com primeiro termo igual a 20 e razão igual a 3, qual é o décimo quarto termo? Use a fórmula: an = a1 + (n-1) vezes r",
                    alternativas: ["39", "42", "59", "62", "70"],
                    correta: 2,
                    dica: "Substitua os valores na fórmula: a14 = 20 + (14-1) vezes 3"
                },
                {
                    id: 13, descritor: "D17",
                    enunciado: "Um retângulo tem área de 35 metros quadrados. Um lado mede (x+2) metros e o outro lado mede (x-3) metros. Considerando apenas valores positivos de x, qual é o valor de x?",
                    alternativas: ["3", "5", "7", "8", "10"],
                    correta: 2,
                    dica: "Área = base vezes altura. Monte a equação (x+2) vezes (x-3) = 35"
                },
                {
                    id: 14, descritor: "D23",
                    enunciado: "Uma reta tem equação y = kx + z, onde k é maior que zero e z é menor que zero. Como é o gráfico dessa reta?",
                    alternativas: ["Crescente, cortando o eixo y abaixo da origem", "Decrescente, cortando o eixo y acima da origem", "Crescente, cortando o eixo y acima da origem", "Decrescente, cortando o eixo y abaixo da origem", "Reta horizontal"],
                    correta: 0,
                    dica: "k positivo indica reta crescente. z negativo indica que corta o eixo y abaixo de zero"
                },
                {
                    id: 15, descritor: "D2",
                    enunciado: "Um prédio de 30 metros de altura projeta uma sombra de 10 metros. No mesmo instante, um hidrante de 1,5 metro de altura projeta uma sombra de quantos metros?",
                    alternativas: ["0,5 metro", "2,0 metros", "3,0 metros", "4,5 metros", "5,0 metros"],
                    correta: 0,
                    dica: "Use proporção: altura do prédio está para sua sombra, assim como altura do hidrante está para sua sombra"
                },
                {
                    id: 16, descritor: "D21",
                    enunciado: "A previsão do tempo descreve: Durante a madrugada a temperatura diminuiu, permaneceu constante pela manhã, mas aumentou no período da tarde. Qual tipo de gráfico melhor representa essa situação?",
                    alternativas: ["Linha sempre subindo", "Linha descendo, depois reta horizontal, depois subindo", "Linha sempre horizontal", "Linha subindo, depois descendo, depois reta", "Linha sempre descendo"],
                    correta: 1,
                    dica: "Traduza cada fase descrita: queda = linha descendo, constante = horizontal, aumento = subindo"
                },
                {
                    id: 17, descritor: "D8",
                    enunciado: "Marcos posicionou numa rua a Escola no ponto A de coordenadas (2, 3) e o Posto de Saúde no ponto B de coordenadas (3, 5). Qual é a equação da reta que passa por esses dois pontos?",
                    alternativas: ["y = 2x - 1", "y = 2x + 1", "y = x + 1", "y = x + 2", "y = x - 2"],
                    correta: 0,
                    dica: "Calcule o coeficiente angular: m = (y2-y1) dividido por (x2-x1)"
                },
                {
                    id: 18, descritor: "D12",
                    enunciado: "Uma sala retangular tem 6 metros de comprimento e 4,5 metros de largura. Qual é a área dessa sala em metros quadrados?",
                    alternativas: ["10,5 m²", "21 m²", "27 m²", "30 m²", "45 m²"],
                    correta: 2,
                    dica: "Área do retângulo = comprimento vezes largura"
                },
                {
                    id: 19, descritor: "D19",
                    enunciado: "Um táxi cobra R$ 5,00 de bandeirada (valor fixo) mais R$ 1,20 por quilômetro rodado. Qual função P(x) representa o preço em função de x quilômetros percorridos?",
                    alternativas: ["P = 1,20x", "P = 5x + 1,20", "P = 5 + 1,20x", "P = 6,20x", "P = 5x"],
                    correta: 2,
                    dica: "Valor total = valor fixo + valor variável por km"
                },
                {
                    id: 20, descritor: "D22",
                    enunciado: "Um atleta corre 700 metros no primeiro dia e aumenta 150 metros a cada dia. Qual distância ele correrá no quinto dia? Use: an = a1 + (n-1) vezes r",
                    alternativas: ["450 metros", "850 metros", "1.300 metros", "1.450 metros", "1.600 metros"],
                    correta: 2,
                    dica: "É uma PA com a1 = 700 e r = 150. Calcule a5"
                }
            ],
            dificil: [
                {
                    id: 21, descritor: "D22",
                    enunciado: "Um site teve os seguintes números de visitas semanais: 1ª semana 2.222 visitas, 2ª semana 6.666 visitas, 3ª semana 19.998 visitas. Mantendo esse padrão de Progressão Geométrica, quantas visitas terá na 4ª semana?",
                    alternativas: ["20.000 visitas", "30.000 visitas", "40.000 visitas", "50.000 visitas", "60.000 visitas"],
                    correta: 4,
                    dica: "Calcule a razão dividindo um termo pelo anterior: 6.666 dividido por 2.222"
                },
                {
                    id: 22, descritor: "D17",
                    enunciado: "Em uma competição, um atleta arremessa um dardo que percorre uma distância d em metros, dada pela equação: -4d² + 600d - 22.500 = 0. Qual é a distância percorrida pelo dardo?",
                    alternativas: ["150 metros", "75 metros", "149 metros", "100 metros", "200 metros"],
                    correta: 1,
                    dica: "Divida toda a equação por -4 para simplificar e depois use Bhaskara ou fatoração"
                },
                {
                    id: 23, descritor: "D33",
                    enunciado: "Uma urna contém 3 bolas vermelhas e 2 bolas azuis. Retirando uma bola ao acaso, qual é a probabilidade de sair uma bola vermelha?",
                    alternativas: ["1/5", "2/5", "3/5", "2/3", "3/2"],
                    correta: 2,
                    dica: "Probabilidade = casos favoráveis dividido por casos totais"
                },
                {
                    id: 24, descritor: "D15",
                    enunciado: "Seis máquinas fabricam 2.000 metros de tecido em 48 dias. Trabalhando no mesmo ritmo, em quantos dias oito máquinas fabricarão 3.000 metros de tecido?",
                    alternativas: ["16 dias", "24 dias", "36 dias", "54 dias", "64 dias"],
                    correta: 2,
                    dica: "Use regra de três composta: mais máquinas (menos dias), mais tecido (mais dias)"
                },
                {
                    id: 25, descritor: "D25",
                    enunciado: "O lucro L de uma empresa em função de x peças fabricadas é dado por L(x) = 200x - x². Quantas peças devem ser fabricadas para obter o lucro máximo?",
                    alternativas: ["25 peças", "100 peças", "200 peças", "1.000 peças", "2.000 peças"],
                    correta: 1,
                    dica: "O máximo da parábola ocorre no vértice: xv = -b dividido por 2a"
                },
                {
                    id: 26, descritor: "D13",
                    enunciado: "Um cilindro tem raio da base medindo 3 metros e altura de 10 metros. Qual é o volume desse cilindro? Use pi igual a 3 e a fórmula V = pi vezes r² vezes h",
                    alternativas: ["90 m³", "180 m³", "270 m³", "360 m³", "450 m³"],
                    correta: 2,
                    dica: "Substitua os valores na fórmula: V = 3 vezes 3² vezes 10"
                },
                {
                    id: 27, descritor: "D5",
                    enunciado: "Uma rampa de 10 metros de comprimento forma um ângulo de 30 graus com o chão. Qual é a altura atingida pela rampa? Use seno de 30 graus igual a 0,5",
                    alternativas: ["3 metros", "5 metros", "7 metros", "8,66 metros", "10 metros"],
                    correta: 1,
                    dica: "Use a relação: seno = cateto oposto dividido pela hipotenusa"
                },
                {
                    id: 28, descritor: "D17",
                    enunciado: "Um terreno retangular tem 255 metros quadrados de área. A frente do terreno mede x metros e a lateral mede (x+2) metros. Qual é o valor de x?",
                    alternativas: ["13 metros", "15 metros", "17 metros", "19 metros", "21 metros"],
                    correta: 1,
                    dica: "Monte a equação: x vezes (x+2) = 255 e teste as alternativas"
                },
                {
                    id: 29, descritor: "D32",
                    enunciado: "De um grupo de 5 pessoas, quantos grupos diferentes de 3 pessoas podem ser formados?",
                    alternativas: ["5 grupos", "10 grupos", "15 grupos", "20 grupos", "60 grupos"],
                    correta: 1,
                    dica: "Use combinação: C(5,3) = 5! dividido por (3! vezes 2!)"
                },
                {
                    id: 30, descritor: "D20",
                    enunciado: "Considere a função f(x) = -2x² + 8x - 6. Em qual intervalo de valores de x a função é crescente?",
                    alternativas: ["x menor que 2", "x maior que 2", "x menor que -2", "x maior que -2", "A função sempre decresce"],
                    correta: 0,
                    dica: "Parábola com concavidade para baixo. Cresce antes do vértice em x = 2"
                }
            ]
        };

        const App = () => {
            const [tela, setTela] = useState('inicio');
            const [modo, setModo] = useState('');
            const [som, setSom] = useState(true);
            const [nome, setNome] = useState('');
            const [codigo, setCodigo] = useState('');
            const [sala, setSala] = useState(null);
            const [questaoIdx, setQuestaoIdx] = useState(0);
            const [questoes, setQuestoes] = useState([]);
            const [pontos, setPontos] = useState(0);
            const [vidas, setVidas] = useState(2);
            const [ajudas, setAjudas] = useState({ pular: 3, eliminar: 2, dica: 2 });
            const [tempo, setTempo] = useState(90);
            const [eliminadas, setEliminadas] = useState([]);
            const [mostrarDica, setMostrarDica] = useState(false);
            const [respondida, setRespondida] = useState(false);
            const [acertou, setAcertou] = useState(null);
            const [escolhida, setEscolhida] = useState(null);
            const [ranking, setRanking] = useState([]);

            const premios = [1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000, 300000, 500000, 750000, 900000, 950000, 980000, 1000000];

            const playSound = (freq, dur) => {
                if (!som) return;
                try {
                    const ctx = new (window.AudioContext || window.webkitAudioContext)();
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.3, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + dur);
                    osc.start();
                    osc.stop(ctx.currentTime + dur);
                } catch(e) {}
            };

            const sons = {
                inicio: () => playSound(523, 0.2),
                certo: () => { playSound(659, 0.15); setTimeout(() => playSound(784, 0.15), 150); },
                errado: () => { playSound(294, 0.3); setTimeout(() => playSound(247, 0.2), 150); },
                tick: () => playSound(440, 0.05),
                fim: () => [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => playSound(f, 0.1), i * 100))
            };

            useEffect(() => {
                if (tela === 'jogo' && !respondida && tempo > 0) {
                    const timer = setTimeout(() => {
                        setTempo(tempo - 1);
                        if (tempo <= 10 && tempo % 2 === 0) sons.tick();
                    }, 1000);
                    return () => clearTimeout(timer);
                }
                if (tempo === 0 && !respondida) errou();
            }, [tempo, tela, respondida]);

            const embaralhar = arr => {
                const novo = [...arr];
                for (let i = novo.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [novo[i], novo[j]] = [novo[j], novo[i]];
                }
                return novo;
            };

            const iniciar = () => {
                const todas = [...QUESTOES.facil, ...QUESTOES.medio, ...QUESTOES.dificil];
                setQuestoes(embaralhar(todas).slice(0, 15));
                setQuestaoIdx(0);
                setPontos(0);
                setVidas(2);
                setAjudas({ pular: 3, eliminar: 2, dica: 2 });
                setTempo(90);
                setRespondida(false);
                setAcertou(null);
                setEscolhida(null);
                setEliminadas([]);
                setMostrarDica(false);
                setTela('jogo');
                sons.inicio();
            };

            const responder = idx => {
                if (respondida) return;
                setRespondida(true);
                setEscolhida(idx);
                if (idx === questoes[questaoIdx].correta) {
                    setAcertou(true);
                    setPontos(premios[questaoIdx]);
                    sons.certo();
                    setTimeout(proxima, 2500);
                } else {
                    errou();
                }
            };

            const errou = () => {
                setAcertou(false);
                sons.errado();
                if (vidas > 1) {
                    setVidas(vidas - 1);
                    setTimeout(proxima, 2500);
                } else {
                    setTimeout(finalizar, 2500);
                }
            };

            const proxima = () => {
                if (questaoIdx < questoes.length - 1) {
                    setQuestaoIdx(questaoIdx + 1);
                    setTempo(90);
                    setEliminadas([]);
                    setMostrarDica(false);
                    setRespondida(false);
                    setAcertou(null);
                    setEscolhida(null);
                } else {
                    finalizar();
                }
            };

            const finalizar = () => {
                sons.fim();
                const novo = [...ranking, { nome, pontos, questoes: questaoIdx + 1 }];
                novo.sort((a, b) => b.pontos - a.pontos);
                setRanking(novo.slice(0, 10));
                setTela('resultado');
            };

            const pular = () => {
                if (ajudas.pular > 0 && !respondida) {
                    setAjudas({...ajudas, pular: ajudas.pular - 1});
                    proxima();
                }
            };

            const eliminar = () => {
                if (ajudas.eliminar > 0 && !respondida && eliminadas.length === 0) {
                    const q = questoes[questaoIdx];
                    const erradas = [0,1,2,3,4].filter(i => i !== q.correta);
                    setEliminadas(embaralhar(erradas).slice(0, 2));
                    setAjudas({...ajudas, eliminar: ajudas.eliminar - 1});
                }
            };

            const verDica = () => {
                if (ajudas.dica > 0 && !respondida) {
                    setMostrarDica(true);
                    setAjudas({...ajudas, dica: ajudas.dica - 1});
                }
            };

            const criarSala = () => {
                const cod = Math.random().toString(36).substring(2, 8).toUpperCase();
                setSala({ codigo: cod, jogadores: [nome], host: nome });
                setCodigo(cod);
                setTela('aguardando');
            };

            const entrarSala = () => {
                if (codigo.length === 6) {
                    setSala({ codigo, jogadores: [nome], host: 'Outro' });
                    setTela('aguardando');
                }
            };

            if (tela === 'inicio') {
                return (
                    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-4">
                        <div className="text-center max-w-2xl">
                            <div className="mb-8">
                                <div className="text-8xl mb-4">🏆</div>
                            </div>
                            <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
                                SHOW DO MILHÃO
                            </h1>
                            <h2 className="text-3xl font-semibold text-yellow-300 mb-2">
                                Matemático - SAEB
                            </h2>
                            <p className="text-white/80 mb-8 text-xl">3ª Série do Ensino Médio</p>
                            <button
                                onClick={() => setTela('escolha')}
                                className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-4 px-12 rounded-full text-2xl shadow-2xl transform hover:scale-110 transition-all mx-auto"
                            >
                                ▶ JOGAR
                            </button>
                            <div className="mt-8 flex justify-center gap-4">
                                <button
                                    onClick={() => setSom(!som)}
                                    className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition text-white text-2xl"
                                >
                                    {som ? '🔊' : '🔇'}
                                </button>
                            </div>
                            <p className="mt-8 text-white/80 text-sm">
                                Desenvolvido por Prof. Markus Henrique Bruno | v1.0
                            </p>
                        </div>
                    </div>
                );
            }

            if (tela === 'escolha') {
                return (
                    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl">
                            <h2 className="text-4xl font-bold text-center mb-8 text-purple-900">
                                Escolha o Modo
                            </h2>
                            <div className="space-y-4">
                                <button
                                    onClick={() => { setModo('individual'); setTela('nome'); }}
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-6 rounded-xl text-2xl shadow-lg transition"
                                >
                                    👤 INDIVIDUAL
                                </button>
                                <button
                                    onClick={() => { setModo('grupoLocal'); setTela('nome'); }}
                                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-6 rounded-xl text-2xl shadow-lg transition"
                                >
                                    👥 GRUPOS (Local)
                                </button>
                                <button
                                    onClick={() => { setModo('online'); setTela('salaEscolha'); }}
                                    className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-6 rounded-xl text-2xl shadow-lg transition"
                                >
                                    🌐 SALAS ONLINE
                                </button>
                            </div>
                            <button
                                onClick={() => setTela('inicio')}
                                className="mt-6 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-xl transition"
                            >
                                Voltar
                            </button>
                        </div>
                    </div>
                );
            }

            if (tela === 'nome') {
                return (
                    <div className="min-h-screen bg-gradient-to-br from-green-600 via-teal-500 to-blue-500 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                            <h2 className="text-3xl font-bold text-center mb-6 text-teal-900">
                                {modo === 'grupoLocal' ? 'Nome do Grupo' : 'Seu Nome'}
                            </h2>
                            <input
                                type="text"
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' && nome.trim() && iniciar()}
                                placeholder="Digite aqui..."
                                className="w-full px-4 py-3 text-xl border-2 border-teal-300 rounded-xl mb-6 focus:outline-none focus:border-teal-500"
                                maxLength={20}
                                autoFocus
                            />
                            <button
                                onClick={iniciar}
                                disabled={!nome.trim()}
                                className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl text-xl transition"
                            >
                                Começar
                            </button>
                            <button
                                onClick={() => setTela('escolha')}
                                className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-xl transition"
                            >
                                Voltar
                            </button>
                        </div>
                    </div>
                );
            }

            if (tela === 'salaEscolha') {
                return (
                    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                            <h2 className="text-3xl font-bold text-center mb-6 text-purple-900">
                                Salas Online
                            </h2>
                            <div className="mb-6">
                                <label className="block text-gray-700 font-semibold mb-2">Seu Nome:</label>
                                <input
                                    type="text"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                    placeholder="Digite seu nome..."
                                    className="w-full px-4 py-3 text-lg border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-500"
                                    maxLength={15}
                                />
                            </div>
                            <div className="space-y-4">
                                <button 
                                    onClick={criarSala}
                                    disabled={!nome.trim()}
                                    className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-xl transition"
                                >
                                    Criar Nova Sala
                                </button>
                                <div className="text-center text-gray-600 font-semibold">OU</div>
                                <input
                                    type="text"
                                    placeholder="Código da sala"
                                    value={codigo}
                                    onChange={e => setCodigo(e.target.value.toUpperCase())}
                                    className="w-full px-4 py-3 text-xl border-2 border-purple-300 rounded-xl text-center uppercase focus:outline-none focus:border-purple-500"
                                    maxLength={6}
                                />
                                <button
                                    onClick={entrarSala}
                                    disabled={codigo.length !== 6 || !nome.trim()}
                                    className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-xl transition"
                                >
                                    Entrar na Sala
                                </button>
                            </div>
                            <button
                                onClick={() => setTela('escolha')}
                                className="mt-6 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-xl transition"
                            >
                                Voltar
                            </button>
                        </div>
                    </div>
                );
            }

            if (tela === 'aguardando') {
                return (
                    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl">
                            <div className="text-center mb-6">
                                <h2 className="text-3xl font-bold text-purple-900 mb-4">Sala Criada!</h2>
                                <div className="bg-purple-100 border-4 border-purple-500 rounded-2xl p-6 mb-4">
                                    <p className="text-gray-700 mb-2">Código da Sala:</p>
                                    <p className="text-5xl font-bold text-purple-900 tracking-widest">{sala?.codigo}</p>
                                </div>
                                <p className="text-gray-600">Compartilhe este código!</p>
                            </div>
                            
                            <div className="bg-gray-100 rounded-xl p-4 mb-6">
                                <h3 className="font-bold text-lg mb-3 text-gray-800">Jogadores:</h3>
                                <div className="space-y-2">
                                    {sala?.jogadores.map((j, i) => (
                                        <div key={i} className="bg-white rounded-lg p-3 flex items-center gap-3">
                                            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                                {j.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-semibold">{j}</span>
                                            {j === sala.host && <span className="ml-auto bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-bold">HOST</span>}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                {sala?.host === nome && (
                                    <button
                                        onClick={iniciar}
                                        className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl text-xl transition"
                                    >
                                        Iniciar Jogo
                                    </button>
                                )}
                                <button
                                    onClick={() => { setTela('salaEscolha'); setSala(null); }}
                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-xl text-xl transition"
                                >
                                    Sair
                                </button>
                            </div>
                        </div>
                    </div>
                );
            }

            if (tela === 'jogo' && questoes.length > 0) {
                const q = questoes[questaoIdx];
                
                return (
                    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
                        <div className="max-w-6xl mx-auto mb-4">
                            <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
                                <div className="flex flex-wrap justify-between items-center gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-red-500 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                                            <span className="text-2xl">❤️</span>
                                            <span className="text-white font-bold text-lg">{vidas}</span>
                                        </div>
                                        <div className={`px-4 py-2 rounded-full flex items-center gap-2 shadow-lg ${tempo <= 10 ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}>
                                            <span className="text-2xl">⏱️</span>
                                            <span className="text-white font-bold text-lg">{tempo}s</span>
                                        </div>
                                    </div>
                                    
                                    <div className="text-center flex-1">
                                        <div className="text-yellow-300 text-sm font-semibold">Questão {questaoIdx + 1}/15</div>
                                        <div className="text-white font-bold text-2xl">R$ {premios[questaoIdx].toLocaleString('pt-BR')}</div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={pular}
                                            disabled={ajudas.pular === 0 || respondida}
                                            title="Pular"
                                            className="relative bg-yellow-500 disabled:bg-gray-500 disabled:cursor-not-allowed p-3 rounded-full hover:bg-yellow-600 transition shadow-lg"
                                        >
                                            <span className="text-2xl">⏭️</span>
                                            <span className="absolute -top-1 -right-1 bg-white text-yellow-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">{ajudas.pular}</span>
                                        </button>
                                        <button
                                            onClick={eliminar}
                                            disabled={ajudas.eliminar === 0 || respondida || eliminadas.length > 0}
                                            title="Eliminar"
                                            className="relative bg-red-500 disabled:bg-gray-500 disabled:cursor-not-allowed p-3 rounded-full hover:bg-red-600 transition shadow-lg"
                                        >
                                            <span className="text-2xl">🗑️</span>
                                            <span className="absolute -top-1 -right-1 bg-white text-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">{ajudas.eliminar}</span>
                                        </button>
                                        <button
                                            onClick={verDica}
                                            disabled={ajudas.dica === 0 || respondida || mostrarDica}
                                            title="Dica"
                                            className="relative bg-green-500 disabled:bg-gray-500 disabled:cursor-not-allowed p-3 rounded-full hover:bg-green-600 transition shadow-lg"
                                        >
                                            <span className="text-2xl">💡</span>
                                            <span className="absolute -top-1 -right-1 bg-white text-green-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">{ajudas.dica}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white rounded-3xl p-8 shadow-2xl mb-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <span className="text-sm font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                                        Descritor {q.descritor}
                                    </span>
                                    <span className="text-sm text-gray-500">{nome}</span>
                                </div>
                                <p className="text-2xl text-gray-800 leading-relaxed font-medium">
                                    {q.enunciado}
                                </p>
                            </div>

                            {mostrarDica && (
                                <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-500 rounded-2xl p-6 mb-6 shadow-lg">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-3xl">💡</span>
                                        <span className="font-bold text-green-800 text-xl">Dica:</span>
                                    </div>
                                    <p className="text-green-900 text-lg font-medium leading-relaxed">
                                        {q.dica}
                                    </p>
                                </div>
                            )}

                            <div className="space-y-3">
                                {q.alternativas.map((alt, i) => {
                                    const eliminada = eliminadas.includes(i);
                                    const correta = i === q.correta;
                                    const selecionada = escolhida === i;
                                    
                                    let bg = 'bg-white hover:bg-blue-50 border-2 border-gray-200';
                                    let txtColor = 'text-gray-800';
                                    
                                    if (respondida) {
                                        if (correta) {
                                            bg = 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-600';
                                            txtColor = 'text-white';
                                        } else if (selecionada && !correta) {
                                            bg = 'bg-gradient-to-r from-red-500 to-rose-500 border-red-600';
                                            txtColor = 'text-white';
                                        }
                                    }
                                    
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => responder(i)}
                                            disabled={eliminada || respondida}
                                            className={`w-full p-6 rounded-2xl text-left text-xl font-semibold shadow-lg transform transition-all duration-300 ${
                                                eliminada ? 'opacity-20 cursor-not-allowed scale-95' : 'hover:scale-102 hover:shadow-xl'
                                            } ${bg} ${respondida ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                                                    respondida && correta ? 'bg-white text-green-600' : 
                                                    respondida && selecionada ? 'bg-white text-red-600' :
                                                    'bg-purple-600 text-white'
                                                }`}>
                                                    {String.fromCharCode(65 + i)}
                                                </span>
                                                <span className={txtColor}>{alt}</span>
                                                {respondida && correta && <span className="ml-auto text-3xl">✅</span>}
                                                {respondida && selecionada && !correta && <span className="ml-auto text-3xl">❌</span>}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {respondida && (
                                <div className={`mt-6 p-6 rounded-2xl text-center text-white text-2xl font-bold shadow-2xl ${
                                    acertou ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-rose-500'
                                }`}>
                                    {acertou ? '🎉 PARABÉNS! Resposta Correta!' : '❌ Ops! Resposta Incorreta'}
                                    {!acertou && vidas > 0 && <div className="text-lg mt-2">Você ainda tem {vidas} vida{vidas > 1 ? 's' : ''}!</div>}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => {
                                if (window.confirm('Sair? O progresso será perdido.')) setTela('inicio');
                            }}
                            className="fixed bottom-4 left-4 bg-white/20 backdrop-blur p-3 rounded-full hover:bg-white/30 transition shadow-lg text-white text-2xl"
                        >
                            🏠
                        </button>
                    </div>
                );
            }

            if (tela === 'resultado') {
                return (
                    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl">
                            <div className="text-center">
                                <div className="text-8xl mb-6">🏆</div>
                                
                                <h2 className="text-5xl font-bold mb-4 text-gray-800">
                                    {pontos >= 1000000 ? '🎊 CAMPEÃO!' : pontos >= 500000 ? '🏆 Excelente!' : '👏 Parabéns!'}
                                </h2>
                                
                                <p className="text-2xl text-gray-700 mb-4">{nome}</p>
                                
                                <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-6 mb-6 shadow-xl">
                                    <p className="text-white text-xl mb-2">Você ganhou:</p>
                                    <p className="text-6xl font-bold text-white drop-shadow-lg">
                                        R$ {pontos.toLocaleString('pt-BR')}
                                    </p>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-blue-100 rounded-xl p-4">
                                        <p className="text-blue-900 font-semibold">Questões</p>
                                        <p className="text-3xl font-bold text-blue-600">{questaoIdx + 1}/15</p>
                                    </div>
                                    <div className="bg-purple-100 rounded-xl p-4">
                                        <p className="text-purple-900 font-semibold">Acertos</p>
                                        <p className="text-3xl font-bold text-purple-600">{questaoIdx + (acertou ? 1 : 0)}</p>
                                    </div>
                                </div>

                                {ranking.length > 0 && (
                                    <div className="bg-gray-100 rounded-2xl p-6 mb-6">
                                        <h3 className="text-2xl font-bold text-gray-800 mb-4">🏆 TOP 10</h3>
                                        <div className="space-y-2">
                                            {ranking.map((j, i) => (
                                                <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${
                                                    j.nome === nome ? 'bg-yellow-200 border-2 border-yellow-400' : 'bg-white'
                                                }`}>
                                                    <div className="flex items-center gap-3">
                                                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                                                            i === 0 ? 'bg-yellow-400 text-yellow-900' :
                                                            i === 1 ? 'bg-gray-300 text-gray-700' :
                                                            i === 2 ? 'bg-orange-400 text-orange-900' :
                                                            'bg-gray-200 text-gray-600'
                                                        }`}>
                                                            {i + 1}
                                                        </span>
                                                        <span className="font-semibold text-gray-800">{j.nome}</span>
                                                    </div>
                                                    <span className="font-bold text-green-600">R$ {j.pontos.toLocaleString('pt-BR')}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-4">
                                    <button
                                        onClick={iniciar}
                                        className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl text-xl transition shadow-lg transform hover:scale-105"
                                    >
                                        🔄 Jogar Novamente
                                    </button>
                                    <button
                                        onClick={() => setTela('inicio')}
                                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 rounded-xl text-xl transition shadow-lg transform hover:scale-105"
                                    >
                                        🏠 Menu
                                    </button>
                                </div>

                                <div className="mt-6 text-gray-600 text-sm">
                                    <p>Obrigado por jogar!</p>
                                    <p className="mt-2">💡 Estude mais e tente novamente!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }

            return null;
        };

        ReactDOM.render(<App />, document.getElementById('root'));
    </script>
</body>
</html>
