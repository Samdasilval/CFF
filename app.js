"use strict";

const stationName = document.querySelector(".title h1");

const boardContainer = document.querySelector("#board");

const getStations = async (station) => {
    try {
        const res = await fetch(`https://transport.opendata.ch/v1/stationboard?station=${station}&limit=10`);
        const data = await res.json();
        console.log(data);
        afficheNomStation(data);
        getAllStationboard(data);
        boardContainer.insertAdjacentHTML("beforeend", "")
    } catch (e) {
        console.error(e.message);
    }
}

const addStationboard = (stationboard) => {
    const category = stationboard.category;
    const name = stationboard.to;
    const date = new Date(stationboard.stop.departure);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const html = `<article>
    <div class="time">${hours}:${minutes}</div>
    <div class="category" data-category="${category}">${category}</div>
    <div class="destination">${name}</div>
</article>`; 
    boardContainer.insertAdjacentHTML("beforeend", html)
}

const afficheNomStation = (data) => {
    const dataStationName = data.station.name;
    stationName.textContent = "🚆 " + dataStationName;
}

const getAllStationboard = (data) => {
    const allStationboard = data.stationboard;
    allStationboard.forEach(e => {
        addStationboard(e);
    });
}

getStations("Yverdon-les-Bains");