import Modal from 'react-modal';
import { useContext } from 'react';
import { BrowserRouter} from 'react-router-dom'
import Login from './Components/Login'
import Home from './Components/Home'
import { AuthContext } from "./Context/AuthContext"

Modal.setAppElement('#root')

function App() {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <BrowserRouter>
      { !isAuthenticated ? <Login/> : <Home/> }
    </BrowserRouter>
  )
}

export default App;
