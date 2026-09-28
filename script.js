const fetchBtn = document.getElementById('fetchBtn');
const tempElement = document.getElementById('temp');
const cityElement = document.getElementById('city');
const descElement = document.getElementById('desc');
const weatherIcon = document.getElementById('weatherIcon');

// Список возможных состояний погоды для визуального разнообразия
const weatherConditions = [
    { text: "Quyoshli", icon: "☀️" },
    { text: "Bulutli", icon: "☁️" },
    { text: "Qisman bulutli", icon: "⛅" },
    { text: "Yomg'irli", icon: "🌧️" }
];

async function getWeatherData() {
    try {
        // Используем открытый API погоды для Ташкента (latitude: 41.31, longitude: 69.24)
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=41.31&longitude=69.24&current=temperature_2m,relative_humidity_2m');
        
        if (!response.ok) {
            throw new Error("Ma'lumotni yuklashda xatolik yuz berdi!");
        }

        const data = await response.json();
        const currentTemp = Math.round(data.current.temperature_2m);
        
        // Рандомизируем описание погоды для демонстрации смены данных при клике
        const randomCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];

        // Выводим данные на экран через DOM
        tempElement.textContent = `${currentTemp}°C`;
        cityElement.textContent = "Farg`ona";
        descElement.textContent = randomCondition.text;
        weatherIcon.textContent = randomCondition.icon;

    } catch (error) {
        console.error(error);
        descElement.textContent = "Xatolik yuz berdi!";
    }
}

// Загружаем погоду при клике на кнопку без перезагрузки страницы
fetchBtn.addEventListener('click', getWeatherData);

// Загрузить погоду сразу при открытии страницы
getWeatherData();