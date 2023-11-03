import { useNavigate } from "react-router-dom";

const Main = () => {

  const navigate = useNavigate()
  return (
    <div className="App">
      <header className="App-header">
        <section className='welcome-section'>
          <h1 className='become-title'>Welcome to Best-Swaps-Rates</h1>
          <button className="access-commonSwaps" onClick={() => navigate("/commonSwaps")}>CommonSwaps</button>
          <button className="access-DEXAggregatorSwaps" onClick={() => navigate("/DEXAggregatorSwaps")}>DEXAggregatorSwaps</button>
        </section>
      </header>
    </div>
  );
};

export default Main;
