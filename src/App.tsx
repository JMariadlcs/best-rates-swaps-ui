import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from "./routes/Main"
import CommonSwaps from "./routes/CommonSwaps"

function App() {

  return (
      <BrowserRouter>
        <div className="global">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/commonSwaps/" element={<CommonSwaps />} />
          </Routes>
        </div>
      </BrowserRouter>
  )
}

export default App
