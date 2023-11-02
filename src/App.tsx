import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from "./routes/Main"

function App() {

  return (
      <BrowserRouter>
        <div className="global">
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        </div>
      </BrowserRouter>
  )
}

export default App
