import { Route, Routes } from "react-router-dom";
import "./App.css";
import Body from "./components/body";
import SingelPdf from "./components/SingelPdf";
// import Header from "./components/header";
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="flex flex-col h-full">
            <Body />
          </div>
        }
      />
      <Route path="/:id" element={<SingelPdf />} />
    </Routes>
  );
}

export default App;
