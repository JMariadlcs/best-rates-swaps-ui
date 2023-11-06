
import DepositCommonSwaps from '../components/DepositCommonSwaps'

import '../styles/commonSwaps.css'

const CommonSwaps = () => {

    return (
        <div className="commonSwaps-page">
          <div className="CommonSwaps">
            <header className="commonSwaps-header">
              <section className='commonSwaps-section'>
                <div className="centered-container">
                  <h1 className='become-title'>Common Swaps</h1>
                  <p className="text-description">The common swaps work in the following way: There exists a Treasury contract that permits any user to deposit WETH. All the WETH deposits are aggregated, as opposed to being segregated for each user. Subsequently, any individual can obtain the most favorable swap rate offered by SushiSwap or Camelot, and initiate a complete swap of the aggregated WETH balance to USDT. Following the swap, any user can invoke the "withdraw" function to receive the entire USDT amount from the Treasury.
                  </p>
                  <DepositCommonSwaps ></DepositCommonSwaps>
                </div>
              </section>
            </header>
          </div>
        </div>
      );
      
};

export default CommonSwaps;
