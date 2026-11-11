import React, { useCallback, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import './shell.css'

const pages = {
  '/': { file: 'index.html', title: 'GreenBasket home' },
  '/shop': { file: 'shop.html', title: 'Shop' },
  '/recipes': { file: 'recipes.html', title: 'Recipes' },
  '/auth': { file: 'auth.html', title: 'Login and registration' },
  '/profile': { file: 'profile.html', title: 'My profile' },
  '/admin': { file: 'admin.html', title: 'Admin dashboard' },
}

/**
 * React component + props:
 * The page configuration is passed from the route as a prop.
 * The existing GreenBasket HTML/CSS/JavaScript is hosted inside this frame
 * so its visual design and established interactions remain unchanged.
 */
function GreenBasketPage({ page }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  const handleFrameLoad = useCallback((event) => {
    setLoading(false)
    const frameDocument = event.currentTarget.contentDocument
    if (!frameDocument || frameDocument.__greenbasketRouterBound) return
    frameDocument.__greenbasketRouterBound = true

    // Keep navigation inside React Router while preserving the legacy pages.
    frameDocument.addEventListener('click', (clickEvent) => {
      const anchor = clickEvent.target.closest('a[href]')
      if (!anchor) return
      const rawHref = anchor.getAttribute('href')
      if (!rawHref || rawHref.startsWith('#') || anchor.target === '_blank') return

      const routeByFile = {
        'index.html': '/',
        'shop.html': '/shop',
        'recipes.html': '/recipes',
        'auth.html': '/auth',
        'profile.html': '/profile',
        'admin.html': '/admin',
      }
      const fileName = rawHref.split(/[?#]/)[0].split('/').pop()
      const route = routeByFile[fileName]
      if (route) {
        clickEvent.preventDefault()
        const query = rawHref.includes('?') ? `?${rawHref.split('?').slice(1).join('?')}` : ''
        navigate(`${route}${query}`)
      }
    }, true)
  }, [navigate])

  return (
    <main className="legacy-shell" aria-label={page.title}>
      {loading && <div className="loading-screen">Loading GreenBasket…</div>}
      <iframe
        key={page.file}
        title={page.title}
        src={`/legacy/${page.file}${location.search}`}
        onLoad={handleFrameLoad}
        onError={() => setLoading(false)}
      />
    </main>
  )
}

function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found-card">
        <div className="basket-icon">🧺</div>
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist.</p>
        <a href="/">Return to GreenBasket</a>
      </div>
    </main>
  )
}

function App() {
  return (
    <Routes>
      {Object.entries(pages).map(([path, page]) => (
        <Route key={path} path={path} element={<GreenBasketPage page={page} />} />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
