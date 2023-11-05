import "../App.css";

import DEXAggregatorSwaps from '../DEXAggregatorSwaps/paraswap/DEXAggregatorSwaps'

const DEXAggregatorSwapsPage = () => {

  return (
    <div className = "commonSwaps-page" >
      <div className="CommonSwaps">
        <header className="commonSwaps-header">
          <section className='commonSwaps-section'>
            <div className="centered-container">
              <h1 className='become-title'>Welcome to Best-Swaps-Rates</h1>
              <DEXAggregatorSwaps ></DEXAggregatorSwaps>
            </div>
          </section>
        </header>
      </div>
        </div >

  );
};

export default DEXAggregatorSwapsPage;
