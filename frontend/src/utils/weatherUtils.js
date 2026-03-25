/** Map weather condition text → emoji icon */
export function getWeatherIcon(condition = '') {
    const c = condition.toLowerCase();
    if (c.includes('sunny') || c.includes('clear')) return '☀️';
    if (c.includes('partly cloudy') || c.includes('partly')) return '⛅';
    if (c.includes('overcast') || c.includes('cloudy')) return '☁️';
    if (c.includes('rain') || c.includes('drizzle')) return '🌧️';
    if (c.includes('thunder') || c.includes('storm')) return '⛈️';
    if (c.includes('snow') || c.includes('sleet')) return '❄️';
    if (c.includes('fog') || c.includes('mist')) return '🌫️';
    if (c.includes('wind') || c.includes('gale')) return '💨';
    if (c.includes('hail')) return '🌨️';
    if (c.includes('blizzard')) return '🌨️';
    return '🌤️';
}

/** Celsius → Fahrenheit */
export function toF(c) {
    return (c * 9) / 5 + 32;
}
