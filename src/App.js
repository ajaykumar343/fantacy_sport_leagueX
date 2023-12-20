import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import PlayerList from "./Pages/PlayerList";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/player-list" element={<PlayerList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
