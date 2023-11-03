import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from "./routes/Main"
import CommonSwaps from "./routes/CommonSwaps"
import DEXAggregatorSwaps from "./routes/DEXAggregatorSwaps"

function App() {
  return (
      <BrowserRouter>
        <div className="global">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/commonSwaps/" element={<CommonSwaps />} />
            <Route path="/DEXAggregatorSwaps/" element={<DEXAggregatorSwaps />} />
          </Routes>
        </div>
      </BrowserRouter>
  )
}

export default App
