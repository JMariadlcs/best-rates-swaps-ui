import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./routes/Landing"

function App() {

  return (
      <BrowserRouter>
        <div className="global">
          <Routes>
            <Route path="/" element={<Landing />} />
          </Routes>
        </div>
      </BrowserRouter>
  )
}

export default App
