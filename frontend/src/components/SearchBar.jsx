import styles from './SearchBar.module.css';

export default function SearchBar({ query, setQuery, onSearch, loading, unit, setUnit }) {
    const handleKey = (e) => {
        if (e.key === 'Enter') onSearch();
    };

    return (
        <div className={styles.searchSection}>
            <div className={styles.searchBox}>
                <span className={styles.searchIcon}>🔍</span>
                <input
                    id="city-search"
                    type="text"
                    placeholder="Search city… e.g. Delhi, London, Tokyo"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKey}
                    autoComplete="off"
                    spellCheck="false"
                />
                <button
                    id="search-btn"
                    onClick={onSearch}
                    disabled={loading}
                    className={loading ? styles.loading : ''}
                >
                    {loading ? (
                        <span className={styles.spinner} />
                    ) : (
                        <>
                            <span className={styles.btnIcon}>⚡</span>
                            Search
                        </>
                    )}
                </button>
            </div>

            <div className={styles.unitToggle}>
                <span className={!unit ? styles.activeUnit : ''}>°C</span>
                <label className={styles.toggleSwitch} htmlFor="unit-toggle">
                    <input
                        id="unit-toggle"
                        type="checkbox"
                        checked={unit}
                        onChange={() => setUnit((u) => !u)}
                    />
                    <span className={styles.track} />
                    <span className={styles.knob} />
                </label>
                <span className={unit ? styles.activeUnit : ''}>°F</span>
            </div>
        </div>
    );
}
