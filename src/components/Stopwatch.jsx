function formatTime(seconds) {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `00:${mins}:${secs}`;
}

export default function Stopwatch({ currentTime, bestTime, currentRolls, bestRolls }) {
    return (
        <div className="records">

            <div className="best-rolls">
                <h3>Best Rolls</h3>
                <p className="display">{bestRolls ?? "--"}</p>
            </div>
            <div className="best-time">
                <h3>Best time</h3>
                <p className="display">{bestTime !== null ? formatTime(bestTime) : "--:--:--"}</p>
            </div>
            <div className="stopwatch">
                <h3>Time</h3>
                <p className="display">{formatTime(currentTime)}</p>
            </div>
            <div className="rolls">
                <h3>Rolls</h3>
                <p className="display">{currentRolls}</p>
            </div>
        </div>
    )
}