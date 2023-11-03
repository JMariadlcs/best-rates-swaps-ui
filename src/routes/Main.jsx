import { useNavigate } from "react-router-dom";
import '../styles/main.css'

const Main = () => {

  const navigate = useNavigate()
  return (
    <div className="App">
      <header className="App-header">
        <section className='welcome-section'>
          <h1 className='become-title'>Welcome to Best-Swaps-Rates</h1>
          <button className="access-button" onClick={() => navigate("/commonSwaps")}>CommonSwaps</button>
          <button className="access-button" onClick={() => navigate("/DEXAggregatorSwaps")}>DEXAggregatorSwaps</button>
        </section>
      </header>
    </div>
  );
};

export default Main;
