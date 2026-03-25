import { getWeatherIcon, toF } from '../utils/weatherUtils';
import styles from './CurrentWeather.module.css';

export default function CurrentWeather({ data, unit }) {
    if (!data) return null;

    const temp = unit ? toF(data.temperature) : data.temperature;
    const unitLabel = unit ? '°F' : '°C';
    const icon = getWeatherIcon(data.condition);
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className={styles.card}>
            {/* Top row */}
            <div className={styles.topRow}>
                <div className={styles.locationWrap}>
                    <h2 className={styles.cityName}>{data.city}</h2>
                    <p className={styles.location}>
                        📍 {[data.region, data.country].filter(Boolean).join(', ')}
                    </p>
                    <p className={styles.datetime}>{dateStr} · {timeStr}</p>
                </div>

                <div className={styles.weatherIcon}>{icon}</div>
            </div>

            {/* Temperature + condition */}
            <div className={styles.tempRow}>
                <div className={styles.tempWrap}>
                    <span className={styles.tempValue}>{Math.round(temp)}</span>
                    <span className={styles.tempUnit}>{unitLabel}</span>
                </div>
                <div className={styles.conditionPill}>
                    <span className={styles.conditionDot} />
                    {data.condition}
                </div>
            </div>

            {/* Stat chips */}
            <div className={styles.statsRow}>
                <Chip icon="🌡️" label="Feels Like" value={`${Math.round(temp)}${unitLabel}`} />
                <Chip icon="💧" label="Condition" value={data.condition.split(' ')[0]} />
                <Chip icon="🗺️" label="Region" value={data.region || '—'} />
                <Chip icon="🌍" label="Country" value={data.country} />
            </div>
        </div>
    );
}

function Chip({ icon, label, value }) {
    return (
        <div className={styles.chip}>
            <span className={styles.chipIcon}>{icon}</span>
            <div>
                <div className={styles.chipLabel}>{label}</div>
                <div className={styles.chipValue}>{value}</div>
            </div>
        </div>
    );
}
