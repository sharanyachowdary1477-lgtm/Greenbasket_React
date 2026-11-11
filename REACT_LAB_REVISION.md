# React Lab Exam — Quick Revision (GreenBasket examples)

The main project demonstrates React component rendering, props, state and routing while preserving the original GreenBasket UI.

## 1. Component rendering
- `App` renders the route tree.
- `GreenBasketPage` is a reusable page component.
- `NotFound` is rendered for unknown routes.

Example:
```jsx
function Welcome() {
  return <h1>Welcome to GreenBasket</h1>
}
```

## 2. State — `useState`
The `GreenBasketPage` component uses:
```jsx
const [loading, setLoading] = useState(true)
```
It displays a loading layer until the page iframe fires its `onLoad` event:
```jsx
{loading && <div className="loading-screen">Loading GreenBasket…</div>}
```
A basic counter example for the exam:
```jsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  return (
    <>
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </>
  )
}
```

## 3. Props
`GreenBasketPage` receives a `page` prop from each route:
```jsx
function GreenBasketPage({ page }) {
  return <iframe title={page.title} src={`/legacy/${page.file}`} />
}

// Parent passes different props:
<GreenBasketPage page={{ file: 'shop.html', title: 'Shop' }} />
```
A simple exam example:
```jsx
function StudentCard({ name, rollNo }) {
  return <p>{name} — {rollNo}</p>
}

// Parent:
<StudentCard name="Nikesh" rollNo="101" />
```

## 4. React Routing — `react-router-dom`
The project uses `BrowserRouter`, `Routes` and `Route`:
```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/shop" element={<Shop />} />
    <Route path="/recipes" element={<Recipes />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```
Dynamic route / `useParams` example:
```jsx
import { useParams } from 'react-router-dom'

function StudentDetails() {
  const { id } = useParams()
  return <h2>Student ID: {id}</h2>
}

// Add inside Routes:
// <Route path="/student/:id" element={<StudentDetails />} />
```

## How the GreenBasket compatibility layer works
1. Vite starts the React application from `index.html`.
2. React mounts `App` into the `root` element.
3. React Router selects the page component based on the URL.
4. `GreenBasketPage` receives the selected page configuration through props.
5. The existing page loads in an iframe with its original CSS and JavaScript, so its existing interface and features are retained.
6. Internal links between the supplied pages are intercepted and sent through React Router.

## Important distinction
The existing shopping/cart/admin feature logic is still the original JavaScript, not rewritten as React hooks/components. React owns the application shell, page component rendering, loading state, and route handling. This was chosen to honour the requirement not to change the existing UI or features.
