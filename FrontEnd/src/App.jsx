import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Create from "./Components/Create";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create" element={<Create />}></Route>
      </Routes>
    </BrowserRouter>

    // <button onClick={() => setCount((count) => count + 1)}>
    //     count is {count}
    //   </button>
  );
}

export default App;
