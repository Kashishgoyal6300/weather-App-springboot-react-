import { useState } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import ForecastSection from './components/ForecastSection';
import styles from './App.module.css';

const FORECAST_DAYS = 7;

export default function App() {
    const [query, setQuery] = useState('');
    const [unit, setUnit] = useState(false); // false = °C, true = °F
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentData, setCurrentData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [searched, setSearched] = useState(false);

    const handleSearch = async () => {
        const city = query.trim();
        if (!city) {
            setError('Please enter a city name.');
            return;
        }
        setLoading(true);
        setError('');
        setCurrentData(null);
        setForecastData(null);
        setSearched(true);

        try {
            // Run both fetches in parallel
            const [curRes, fcRes] = await Promise.all([
                fetch(`/weather/current/${encodeURIComponent(city)}`),
                fetch(`/weather/forecast/${encodeURIComponent(city)}/${FORECAST_DAYS}`),
            ]);

            if (!curRes.ok) throw new Error(`City "${city}" not found. Please check spelling.`);
            if (!fcRes.ok) throw new Error('Could not load forecast. Please try again.');

            const [cur, fc] = await Promise.all([curRes.json(), fcRes.json()]);
            setCurrentData(cur);
            setForecastData(fc);
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.app}>
            {/* Ambient orbs */}
            <div className={`${styles.orb} ${styles.orb1}`} />
            <div className={`${styles.orb} ${styles.orb2}`} />
            <div className={`${styles.orb} ${styles.orb3}`} />

            <div className={styles.wrapper}>
                {/* Header */}
                <header className={styles.header}>
                    <div className={styles.logo}>🌐</div>
                    <h1 className={styles.title}>WeatherSphere</h1>
                    <p className={styles.subtitle}>Real-time weather powered by Spring Boot</p>
                </header>

                {/* Search */}
                <SearchBar
                    query={query}
                    setQuery={setQuery}
                    onSearch={handleSearch}
                    loading={loading}
                    unit={unit}
                    setUnit={setUnit}
                />

                {/* Error */}
                {error && (
                    <div className={styles.errorMsg} role="alert">
                        ⚠️ {error}
                    </div>
                )}

                {/* Loading Skeletons */}
                {loading && (
                    <div className={styles.skeletonGrid}>
                        <div className={`${styles.skeleton} ${styles.skeletonCurrent}`} />
                        <div className={`${styles.skeleton} ${styles.skeletonForecast}`} />
                    </div>
                )}

                {/* Results */}
                {!loading && currentData && (
                    <div className={styles.resultsGrid}>
                        <CurrentWeather data={currentData} unit={unit} />
                        <ForecastSection data={forecastData} unit={unit} />
                    </div>
                )}

                {/* Welcome hint when nothing searched yet */}
                {!loading && !searched && !error && (
                    <div className={styles.welcomeHint}>
                        <div className={styles.hintIcon}>⛅</div>
                        <p>Search for any city to get started</p>
                        <div className={styles.hintExamples}>
                            {['Delhi', 'London', 'New York', 'Tokyo', 'Sydney'].map((c) => (
                                <button
                                    key={c}
                                    className={styles.hintChip}
                                    onClick={() => { setQuery(c); }}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className={styles.footer}>
                Powered by{' '}
                <a href="https://www.weatherapi.com" target="_blank" rel="noopener noreferrer">
                    WeatherAPI
                </a>{' '}
                &amp; Spring Boot
            </footer>
        </div>
    );
}
