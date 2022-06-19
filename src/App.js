import logo from './logo.svg';
import './App.css';
import {Routes, Route, Link, BrowserRouter} from "react-router-dom";
import RegisterPage from "./components/RegisterPage.js"
import LoginPage from './components/LoginPage';
import Feed from './components/Feed'
import Header from './components/Header';
import CreatePost from './components/CreatePost'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<LoginPage/>}></Route>
        <Route path="/register" element={<RegisterPage/>}></Route>
        <Route path="/feed" element={<Feed/>}></Route>
        <Route path="/createpost" element={<CreatePost/>}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
