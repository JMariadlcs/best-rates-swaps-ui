import "../App.css";

import DEXAggregatorSwaps from '../DEXAggregatorSwaps/paraswap/DEXAggregatorSwaps'

const DEXAggregatorSwapsPage = () => {

  return (
    <div className = "commonSwaps-page" >
      <div className="CommonSwaps">
        <header className="commonSwaps-header">
          <section className='commonSwaps-section'>
            <div className="centered-container">
              <h1 className='become-title'>DEXAggregator Swaps: Paraswap</h1>
              <DEXAggregatorSwaps ></DEXAggregatorSwaps>
            </div>
          </section>
        </header>
      </div>
        </div >

  );
};

export default DEXAggregatorSwapsPage;
