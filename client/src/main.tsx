import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' 
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login.tsx'
import Invoices from './Invoices.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import { Provider } from 'react-redux'
import { store } from './store.ts'
createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/invoices" element={<Invoices />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
