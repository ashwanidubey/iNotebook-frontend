
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './componenets/Home';
import About from './componenets/About';
import Navbar from './componenets/Navbar';
import NoteState from './context/notes/NoteState';
import Alert from './componenets/Alert';
import Login from './componenets/Login';
import Signup from './componenets/Signup';


function App() {
  
  return (
    <NoteState >

      <BrowserRouter>

      
        <Navbar />
        <Alert message="{context.showAlert.message} "/>
        <div className='container'>
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="about" element={<About />} />
          </Routes>
        </div>

      </BrowserRouter>
    </NoteState>


  );
}

export default App;
