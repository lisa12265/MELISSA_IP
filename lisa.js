const map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

let marker = L.marker([51.5, -0.09]).addTo(map);

setTimeout(() => {
  map.invalidateSize();
}, 100);

const apiKey = "at_RIjw4QIWB6l5WktLLxQFTmYS1z0Zs";

async function fetchIPData(query = "") {
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${query}`;

  const res = await fetch(url);
  const data = await res.json();

  updateUI(data);
}

function updateUI(data) {
  document.getElementById("ip").textContent = data.ip;
  document.getElementById("location").textContent =
    `${data.location.city}, ${data.location.country}`;
  document.getElementById("timezone").textContent =
    `UTC ${data.location.timezone}`;
  document.getElementById("isp").textContent = data.isp;

  const { lat, lng } = data.location;

  map.setView([lat, lng], 13);
  marker.setLatLng([lat, lng]);
}

const form = document.querySelector(".search-form");
const input = form.querySelector("input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") return;
  fetchIPData(input.value.trim());
});

fetchIPData();
