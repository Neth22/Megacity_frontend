
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './util/AuthContext.jsx';

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <AuthProvider><App /></AuthProvider>
  </BrowserRouter>,
  
)
