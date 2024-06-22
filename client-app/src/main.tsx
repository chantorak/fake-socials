import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/layouts/App.tsx'
import './app/layouts/index.css'
import { useQueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = useQueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)
