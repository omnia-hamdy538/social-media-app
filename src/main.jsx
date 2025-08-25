import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "@fortawesome/fontawesome-free/css/all.min.css"
import {HeroUIProvider} from "@heroui/react";
import CounterContextProvider from './contexts/CounterContext.jsx'
import AuthContextProvider from "./contexts/AuthContext.jsx"
import {addToast , ToastProvider } from '@heroui/react';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider>
        
      </ToastProvider>
      <CounterContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
          
      </CounterContextProvider>
      
    </HeroUIProvider>
  </StrictMode>,
)
