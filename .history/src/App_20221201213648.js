import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import EditChude from "./component/EditChude";
import EditTVung from "./component/EditTuvung";
import SignIn from "./component/SignIn";
import Dashboard from "./component/Dashboard";
import EditUser from "./component/EditUser";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn></SignIn>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>

        <Route path="/chude" element={<EditChude></EditChude>}></Route>
        <Route path="/tuvung" element={<EditTVung></EditTVung>}></Route>
        <Route path="/user" element={<EditUser></EditUser>}></Route>
      </Routes>
    </div>
  );
}

export default App;
