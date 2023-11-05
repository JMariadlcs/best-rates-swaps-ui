import { useNavigate } from "react-router-dom";
import '../styles/main.css'

const Main = () => {

  const navigate = useNavigate()
  return (
    <div className="App">
      <header className="App-header">
        <section className='welcome-section'>
          <h1 className='become-title'>Welcome to Best-Swaps-Rates</h1>
          <p className="welcome-text">Welcome to Best Swaps Rates. Within this application, you will have the opportunity to perform WETH-USDT swaps across various decentralized exchanges (DEXs) while selecting the most favorable exchange rate available.</p>
          <button className="access-button" onClick={() => navigate("/commonSwaps")}>CommonSwaps</button>
          <button className="access-button" onClick={() => navigate("/DEXAggregatorSwaps")}>DEXAggregatorSwaps</button>
        </section>
      </header>
    </div>
  );
};

export default Main;
