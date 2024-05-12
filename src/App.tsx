import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Country from "./routes/country/Country";
import Countries from "./routes/countries/Countries";

export default function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/:name" element={<Country/>} />
      <Route path="/" element={<Countries/>} />
    </Routes>
    </>
  )
}
