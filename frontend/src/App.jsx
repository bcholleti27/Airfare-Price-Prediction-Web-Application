
import { useState } from "react";
import "./App.css";

function App() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(30);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function handlePredict(event) {
    event.preventDefault();
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          origin: origin.toUpperCase(),
          destination: destination.toUpperCase(),
          days_until_departure: Number(days)
        })
      });

      if (!response.ok) {
        throw new Error("Unable to predict airfare.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Cannot connect to the prediction server.");
    }
  }

  return (
    <main className="container">
      <h1>Airfare Price Predictor</h1>
      <p>Estimate flight prices using travel information.</p>

      <form onSubmit={handlePredict}>
        <label>Departure Airport</label>
        <input
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="DFW"
          maxLength={3}
          required
        />

        <label>Destination Airport</label>
        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="JFK"
          maxLength={3}
          required
        />

        <label>Days Until Departure</label>
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          min="0"
          max="365"
          required
        />

        <button type="submit">Predict Price</button>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <section className="result">
          <h2>Estimated Airfare</h2>
          <p>${result.predicted_price}</p>
          {result.model_status === "placeholder" && (
            <small>Demo price only — ML model not yet trained.</small>
          )}
        </section>
      )}
    </main>
  );
}

export default App;
