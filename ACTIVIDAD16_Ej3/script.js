const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

const currencySelect = document.getElementById('currency-one');
const coin = document.getElementById('coin');
const cargando = document.getElementById('cargando');

let rate = 1;
let currentCurrency = "USD";

populateUI();

let ticketPriceUSD = +movieSelect.value;

//Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;

    const totalUSD = selectedSeatsCount * ticketPriceUSD;

    const totalConverted = totalUSD * rate;

    total.innerText = totalConverted.toFixed(2);
}

//Consulta a la API
function getExchangeRate(currency) {

    cargando.style.display = "block";

    fetch(`https://v6.exchangerate-api.com/v6/370108f641dc25be835c142f/latest/USD`)
        .then(res => res.json())
        .then(data => {

            rate = data.conversion_rates[currency];
            currentCurrency = currency;

            updateSelectedCount();
            updateMoviePrices();

            cargando.style.display = "none";

        })
        .catch(() => {

            cargando.style.display = "none";
            alert("Error obteniendo el tipo de cambio");

        });

}

//Actualizar los precios de las películas
function updateMoviePrices() {

    const movies = movieSelect.querySelectorAll('option');

    movies.forEach(movie => {

        const basePrice = Number(movie.value);

        const convertedPrice = (basePrice * rate).toFixed(2);

        const name = movie.text.split('(')[0];

        movie.text = `${name}(${convertedPrice} ${currentCurrency})`;

    });

    coin.innerText = currentCurrency;

}

//Cambio de moneda
currencySelect.addEventListener('change', e => {

    const currency = e.target.value;

    getExchangeRate(currency);

});

//Get data from localstorage and populate UI
function populateUI() {

    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex
    }
}

//Movie select event
movieSelect.addEventListener('change', e => {

    ticketPrice = +e.target.value;

    setMovieData(e.target.selectedIndex, e.target.value);

    updateSelectedCount();
});

//Select click event
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

//Initial count and total set
updateSelectedCount();
getExchangeRate(currencySelect.value);