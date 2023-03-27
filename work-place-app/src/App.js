
import './App.css';
import {UserContextProvider} from './context/userContext'
import Navs from './Navs';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

function App() {
  return (
    <div className="App">
       <ReactNotifications />
      <UserContextProvider>     
         <Navs/>
      </UserContextProvider>

    </div>
  );
}

export default App;
