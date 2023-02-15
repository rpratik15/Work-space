
import './App.css';
import {UserContextProvider} from './context/userContext'
import Navs from './Navs';

function App() {
  return (
    <div className="App">
      <UserContextProvider>     
         <Navs/>
      </UserContextProvider>

    </div>
  );
}

export default App;
