document.getElementById('start-game').addEventListener('click', () => {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('add-players').style.display = 'block';
});

let players = [];
let currentPlayerIndex = 0;

document.getElementById('add-player').addEventListener('click', () => {
    const playerName = document.getElementById('player-name').value;
    if (playerName) {
        players.push({ name: playerName, hp: 10 });
        document.getElementById('player-name').value = '';
        updatePlayersList();
    }
});

document.getElementById('start-adventure').addEventListener('click', () => {
    document.getElementById('add-players').style.display = 'none';
    document.getElementById('scenario-container').style.display = 'block';
    document.getElementById('players-status').style.display = 'block';
    playBackgroundMusic();
    showScenario();
    updatePlayersStatus();
});

function updatePlayersList() {
    const playersList = document.getElementById('players-list');
    playersList.innerHTML = '';
    players.forEach((player, index) => {
        const li = document.createElement('li');
        li.textContent = player.name;
        playersList.appendChild(li);
    });
}

function updatePlayersStatus() {
    const playersDiv = document.getElementById('players');
    playersDiv.innerHTML = '';
    players.forEach((player, index) => {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player';
        
        const playerName = document.createElement('span');
        playerName.textContent = `${player.name} - HP: ${player.hp}`;
        
        const increaseHP = document.createElement('button');
        increaseHP.textContent = '+';
        increaseHP.addEventListener('click', () => {
            player.hp += 1;
            updatePlayersStatus();
        });

        const decreaseHP = document.createElement('button');
        decreaseHP.textContent = '-';
        decreaseHP.addEventListener('click', () => {
            player.hp -= 1;
            updatePlayersStatus();
        });

        playerDiv.appendChild(playerName);
        playerDiv.appendChild(increaseHP);
        playerDiv.appendChild(decreaseHP);
        
        playersDiv.appendChild(playerDiv);
    });
}

const scenarios = [
    { text: "De Ingang van de Kerker", task: "Dobbel een 4 of hoger (D6) om binnen te komen zonder gewond te raken.", penalty: 2 },
    { text: "De Donkere Hal", task: "Drink een slok om je moed te verzamelen en verder te gaan.", penalty: 1 },
    { text: "De Vervloekte Spiegel", task: "Dobbel een even getal om de verleiding te weerstaan.", penalty: 3 },
    { text: "De Kille Bries", task: "Drink een halve beker om warm te blijven.", penalty: 2 },
    { text: "De Verlichte Gang", task: "Dobbel een 5 of hoger (D6) om veilig door te lopen.", penalty: 1 },
    { text: "De Gesloten Deur", task: "Drink een slok om de kracht te krijgen de deur te openen.", penalty: 2 },
    { text: "De Spinnenwebben", task: "Dobbel een 4 of hoger (D6) om te ontsnappen.", penalty: 3 },
    { text: "De Geheime Kamer", task: "Drink een halve beker om de schat te bemachtigen. Iedereen krijgt dan 1 hp.", penalty: 2 },
    { text: "De Eerste Vijand", task: "Dobbel een 5 of hoger (D6) om hem te verslaan.", penalty: 4 },
    { text: "De Verlaten Bibliotheek", task: "Drink een slok om je concentratie te verbeteren en een belangrijk boek te vinden.", penalty: 1 },
    { text: "De Vloek van de Magiër", task: "Dobbel een even getal om de vloek te weerstaan.", penalty: 4 },
    { text: "De poort van de van Stilte", task: "Een spreuk wordt over je uitgesproken waardoor je 15 minuten geen ja of nee mag zeggen. Doe je dat wel, moet je 1 slok nemen.", penalty: 0 },
    { text: "De Trollengrot", task: "Een trol geeft je de keuze: Drink zelf 8 slokken, of drink er 5 en kies een teamgenoot die er ook 5 moet drinken.", penalty: 5 },
    { text: "De Liefdestovenaar", task: "Geef degene naast je een compliment en neem een slokje.", penalty: 1 },
    { text: "De Ondergrondse Rivier", task: "Drink een slok om moed te verzamelen en over te steken.", penalty: 2 },
    { text: "De Toren van Wijsheid", task: "Dobbel een 4 of hoger (D6) om een nuttig boek te vinden.", penalty: 2 },
    { text: "De Kamer van Schaduwen", task: "Drink een halve beker om door de schaduwen heen te zien.", penalty: 3 },
    { text: "De Rozeer van de Ondoden", task: "Drink een halve beker om de kracht te krijgen om te vechten.", penalty: 3 },
    { text: "De Vlammen van Angst", task: "Dobbel een 5 of hoger (D6) om door te gaan.", penalty: 4 },
    { text: "De Spookachtige Gang", task: "Drink 2 slokken om je moed te verzamelen en verder te gaan.", penalty: 3 },
    { text: "De OPPERDRAAK", task: "Je hebt de draak gevonden die de kerker bewaakt. Neem 5 slokken om 'm weg te jagen", penalty: 5 },
    { text: "De Spiegel van Waarheid", task: "Drink een slok voor iedere tattoo die je hebt.", penalty: 6 },
    { text: "De Wachter van de Poort", task: "Dobbel een 6 (D6) om hem te verslaan.", penalty: 5 },
    { text: "De Paardenkoning-kamer", task: "De paard beveelt je om een potje paardenrace te spelen met je mede-avonturiers.", penalty: 2 },
    { text: "De Zwaard van de Held", task: "Dobbel een even getal om het zwaard eruit te trekken.", penalty: 3 },
    { text: "De Wacht van de Gigant", task: "Drink een volle beker om de kracht te krijgen hem te passeren.", penalty: 10 },
    { text: "De Kamer van Vuur", task: "Drink 3 slokken om door de hitte heen te gaan.", penalty: 3 },
    { text: "De Fifa voetbal-goden-grot", task: "Speel een potje fifa met een mede-avonturier. De eerste die scoort, wint. De ander drinkt 6 slokken", penalty: 6 },
    { text: "De OPPERDRAAK", task: "De draak is terug met een muntje. Kop = 1 slok, munt  = 5 slokken.", penalty: 5 },
    { text: "De Storm van Vernietiging", task: "Dobbel een 5 of hoger (D6) om beschutting te vinden.", penalty: 4 },
    { text: "De Kloof van de Vergetelheid", task: "Dobbel een 6 (D6) om veilig over te springen.", penalty: 5 },
    { text: "De vrienden-god-kamer", task: "Kies een mede-avonturier. Laat hem of haar zijn lievelingseten op papier zetten en probeer dit te raden.", penalty: 7 },
    { text: "De Brug der Zuchten", task: "Deze plek voelt bekend... Drink 3 slokken om veilig over te steken.", penalty: 3 },
    { text: "De Geheime Tunnel", task: "Jullie avontuur nader zijn einde. Drink een slok met je mede-avonturiers om de moed te verzamelen de tunnel te betreden.", penalty: 2 },
    { text: "De Betoverde Zaal", task: "Dobbel een even getal om een veilig voorwerp te kiezen.", penalty: 3 },
    { text: "De Toren van de Magiër", task: "Dobbel een even getal om de betovering te weerstaan.", penalty: 4 },
    { text: "De OPPERDRAAK!!!", task: "De draak bewaakt de schat. Drink met al je avonturiers een volle beker om de moed te vinden de draak te bevechten.", penalty: 10 },
    { text: "De Schat van de Kerker", task: "Dobbel een 5 of hoger (D6) om de schat veilig te bemachtigen.", penalty: 2 }
];

let currentScenarioIndex = 0;

document.getElementById('task-success').addEventListener('click', () => {
    document.getElementById('task-success').style.display = 'none';
    document.getElementById('task-fail').style.display = 'none';
    document.getElementById('next-scenario').style.display = 'block';
});

document.getElementById('task-fail').addEventListener('click', () => {
    players[currentPlayerIndex].hp -= scenarios[currentScenarioIndex].penalty;
    updatePlayersStatus();
    document.getElementById('task-success').style.display = 'none';
    document.getElementById('task-fail').style.display = 'none';
    document.getElementById('next-scenario').style.display = 'block';
});

document.getElementById('next-scenario').addEventListener('click', () => {
    currentScenarioIndex++;
    if (currentScenarioIndex < scenarios.length) {
        nextTurn();
        showScenario();
    } else {
        
        document.getElementById('scenario-text').textContent = "Gefeliciteerd! Je hebt het avontuur voltooid. Geniet van je virtuele gratis biertjes!";
        document.getElementById('bevinden').textContent = "";
        document.getElementById('scenario-task').textContent = "";
        document.getElementById('penalty-text').textContent = "";
        document.getElementById('current-player').textContent = "";
        document.getElementById('task-success').style.display = 'none';
        document.getElementById('task-fail').style.display = 'none';
        document.getElementById('next-scenario').style.display = 'none';
    }
});

function nextTurn() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
}

function showScenario() {
    const scenario = scenarios[currentScenarioIndex];
    document.getElementById('scenario-text').textContent = scenario.text;
    document.getElementById('scenario-task').textContent = scenario.task;
    document.getElementById('penalty-text').textContent = `Straf: ${scenario.penalty} HP bij mislukking.`;
    document.getElementById('current-player').textContent = `Aan de beurt: ${players[currentPlayerIndex].name}`;
    document.getElementById('task-success').style.display = 'block';
    document.getElementById('task-fail').style.display = 'block';
    document.getElementById('next-scenario').style.display = 'none';
    changeBackground();
    changeScenarioImage();
}

function changeScenarioImage() {
    let image = document.getElementById('scenario-image');
    image.src = `images/scenario${currentScenarioIndex + 1}.jpg`;
    image.style.display ='block';
}


function playBackgroundMusic() {
    const audio = document.getElementById('background-music');
    audio.play();
}

function changeBackground() {
    const backgrounds = [
        'url("background1.jpg")',
        'url("background2.jpg")',
        'url("background3.jpg")',
        'url("background4.jpg")',
        'url("background5.jpg")'
    ];
    document.body.style.backgroundImage = backgrounds[currentScenarioIndex % backgrounds.length];
}
