// import Products from "./components/Products/Products";
// import Header from "./components/Layout/Header";
// import Subheader from "./components/Layout/Subheader";
// import { Route, Routes, Redirect } from "react-router-dom";

// const App = () => {
//   return (
//     <div>
//       <Header/>
//       <Subheader/>
//       <Routes>
//         <Route path="/404" exact>
//           <h1>Not Found!</h1>
//         </Route>
//         <Route path="/:category?" element={<Products/>}/>
//         <Redirect to="/404"/>
//       </Routes>
//     </div>
//   );
// };

// export default App;






























import Products from "./components/Products/Products";
import Header from "./components/Layout/Header";
import Subheader from "./components/Layout/Subheader";
import { Route, Routes, Navigate } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Header />
      <Subheader />
      <Routes>
        <Route path="/404" element={<h1>Not Found!</h1>} />
        <Route path="/:category?" element={<Products />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
};

export default App;
