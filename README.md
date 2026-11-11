# GreenBasket — React + Vite

This project is the React/Vite launch and deployment version of the supplied GreenBasket website.

## What was kept unchanged
- The supplied GreenBasket page layouts and CSS.
- Existing shop, product filtering/sorting, cart, recipe, profile, login/register and admin interactions.
- Existing localStorage-based demo data and account flows.
- Existing image URLs and product catalogue.

The React application provides the application entry point and React Router navigation. Each original page is hosted in an iframe by a reusable React `GreenBasketPage` component. This compatibility approach deliberately avoids rewriting the existing DOM-based features, which helps preserve their appearance and behaviour. React Router handles the main page routes; internal page links are routed through React.

> Demo project note: the original app stores demo users, cart and orders in the browser's localStorage. It is not connected to a production database or payment gateway. Do not use real customer/payment information.

## Requirements
- Node.js 20.19+ (or 22.12+)
- npm

Check installation:
```bash
node -v
npm -v
```

## Run locally
1. Extract the ZIP.
2. Open the extracted `greenbasket-react` folder in VS Code.
3. Open Terminal in that folder (the folder containing `package.json`).
4. Run:

```bash
npm install
npm run dev
```

5. Open the Local URL printed by Vite, usually `http://localhost:5173/`.
6. Stop the server with `Ctrl + C`.

Whenever you make code changes, Vite refreshes the browser automatically.

## Build and preview
```bash
npm run build
npm run preview
```
The production output is created in `dist/`.

## Deploy to Vercel
### Option A — GitHub (recommended)
1. Create a GitHub repository and upload the contents of this project folder (not the ZIP itself).
2. Sign in to Vercel and choose **Add New → Project**.
3. Import the GitHub repository.
4. Vercel should detect Vite. Confirm:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Select **Deploy**. Vercel will provide your live URL.
6. For later updates, push commits to GitHub; Vercel will redeploy.

### Option B — Vercel CLI
Install/use the CLI, sign in, then run from this project folder:
```bash
npx vercel
```
Follow the prompts. For production deployment:
```bash
npx vercel --prod
```

`vercel.json` sends application routes back to `index.html` so React Router URLs such as `/shop` and `/recipes` work after refresh.

## Routes
| URL | Page |
|---|---|
| `/` | Home |
| `/shop` | Shop |
| `/recipes` | Recipes |
| `/auth` | Login / registration |
| `/profile` | Customer profile |
| `/admin` | Admin dashboard |
| any other URL | React 404 page |

The legacy pages are kept under `public/legacy/`. Do not move the `css/` or `js/` folders out of that directory: the original pages load those assets using relative paths.

## Demo admin login
- Email: `admin@greenbasket.in`
- Password: `admin123`

## Troubleshooting
- **`npm` is not recognized:** install Node.js LTS, close and reopen VS Code, then check `node -v` and `npm -v`.
- **Missing package errors:** run `npm install` in the project root.
- **Blank page after editing:** check the terminal and browser console for errors.
- **A route returns 404 after deployment:** ensure `vercel.json` is included and redeploy.
- **Images do not load:** product images use remote image URLs and need an internet connection.

## Project structure
```text
greenbasket-react/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── src/
│   ├── main.jsx       # React components and React Router
│   └── shell.css      # React shell styles
└── public/
    └── legacy/
        ├── *.html
        ├── css/style.css
        └── js/*.js
```
