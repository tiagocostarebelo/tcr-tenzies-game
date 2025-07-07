function formatTime(seconds) {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `00:${mins}:${secs}`;
}

export default function Stopwatch({ currentTime, bestTime }) {
    return (
        <div className="timer">
            <div className="stopwatch">
                <h3>Current time</h3>
                <p className="display">{formatTime(currentTime)}</p>
            </div>
            <div className="best-time">
                <h3>Best time</h3>
                <p className="display">{bestTime !== null ? formatTime(bestTime) : "--:--:--"}</p>
            </div>
        </div>
    )
}