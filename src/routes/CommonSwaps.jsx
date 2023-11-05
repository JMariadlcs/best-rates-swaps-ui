
import DepositCommonSwaps from '../components/DepositCommonSwaps'

import '../styles/commonSwaps.css'

const CommonSwaps = () => {




    return (
        <div className="commonSwaps-page">
          <div className="CommonSwaps">
            <header className="commonSwaps-header">
              <section className='commonSwaps-section'>
                <div className="centered-container">
                  <h1 className='become-title'>Welcome to Best-Swaps-Rates</h1>
                  <DepositCommonSwaps ></DepositCommonSwaps>
                </div>
              </section>
            </header>
          </div>
        </div>
      );
      
};

export default CommonSwaps;
