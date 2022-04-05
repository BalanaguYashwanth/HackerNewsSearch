import './App.css';
import Homepage from './screens/homepage';
import Header from './components/header';
import Details from './screens/details'
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage/>} exact />
        <Route path="/item/:id" element={ <Details />}  exact/>
      </Routes>
    </Router>
  );
}

export default App;
