import Navbar from "./components/Navbar/Navbar";
import Table from "./components/Table/Table";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  console.log('render')
  return (
    <div className="App">
      <Navbar/>
      <Table/>
    </div>
  );
}

export default App;
