import { getWeatherIcon, toF } from '../utils/weatherUtils';
import styles from './ForecastSection.module.css';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getDayLabel(dateStr, index) {
    const d = new Date(dateStr);
    if (index === 0) return 'Today';
    return DAYS[d.getDay()];
}

function MinMaxBar({ min, avg, max }) {
    // Normalize bar heights relative to max (max bar = 100%)
    const maxH = 32;
    const scale = max > 0 ? maxH / max : 1;
    const heights = {
        min: Math.max(Math.round(Math.abs(min) * scale * 0.6), 6),
        avg: Math.max(Math.round(Math.abs(avg) * scale * 0.8), 8),
        max: Math.max(Math.round(Math.abs(max) * scale), 10),
    };
    return (
        <div className={styles.miniBars}>
            <div className={`${styles.miniBar} ${styles.barMin}`} style={{ height: heights.min }} title={`Min: ${min}°`} />
            <div className={`${styles.miniBar} ${styles.barAvg}`} style={{ height: heights.avg }} title={`Avg: ${avg}°`} />
            <div className={`${styles.miniBar} ${styles.barMax}`} style={{ height: heights.max }} title={`Max: ${max}°`} />
        </div>
    );
}

function ForecastCard({ day, index, unit }) {
    const minT = unit ? toF(day.minTemp) : day.minTemp;
    const avgT = unit ? toF(day.avgTemp) : day.avgTemp;
    const maxT = unit ? toF(day.maxTemp) : day.maxTemp;
    const unitLabel = unit ? '°F' : '°C';

    // Guess icon from avg temp range
    const iconCondition = avgT > 30 ? 'Sunny' : avgT > 20 ? 'Partly cloudy' : avgT > 10 ? 'Cloudy' : 'Snow';

    return (
        <div className={styles.dayCard} style={{ animationDelay: `${index * 0.06}s` }}>
            <div className={styles.dayLabel}>{getDayLabel(day.date, index)}</div>
            <div className={styles.dayDate}>{new Date(day.date).toLocaleDateString([], { month: 'short', day: 'numeric' })}</div>
            <div className={styles.forecastIcon}>{getWeatherIcon(iconCondition)}</div>
            <div className={styles.temps}>
                <span className={styles.tMax}>{Math.round(maxT)}{unitLabel}</span>
                <span className={styles.tAvg}>{Math.round(avgT)}{unitLabel}</span>
                <span className={styles.tMin}>{Math.round(minT)}{unitLabel}</span>
            </div>
            <MinMaxBar min={minT} avg={avgT} max={maxT} />
            <div className={styles.barsLegend}>
                <span>Min</span><span>Avg</span><span>Max</span>
            </div>
        </div>
    );
}

export default function ForecastSection({ data, unit }) {
    if (!data || !data.dayTemp || data.dayTemp.length === 0) return null;

    return (
        <div className={styles.section}>
            <div className={styles.sectionHeader}>
                <span className={styles.headerIcon}>📅</span>
                {data.dayTemp.length}-DAY FORECAST
            </div>
            <div className={styles.forecastGrid}>
                {data.dayTemp.map((day, i) => (
                    <ForecastCard key={day.date} day={day} index={i} unit={unit} />
                ))}
            </div>
        </div>
    );
}
