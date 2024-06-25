import Products from "./components/Products/Products";
import Header from "./components/Layout/Header";
import Subheader from "./components/Layout/Subheader";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Header/>
      <Subheader/>
      <Routes>
        <Route path="/" element={<Products/>}/>
      </Routes>
      
    </div>
  );
};

export default App;
