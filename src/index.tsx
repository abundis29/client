import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const Home = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ 'pages/Home'),
)

// const Prefetched = React.lazy(() =>
//   import(
//     /* webpackPrefetch: true */
//     /* webpackChunkName: "prefetched" */
//     './prefetched'
//   ),
// )

const App = React.lazy(() =>
  import(
    /* webpackPreload: true */
    /* webpackChunkName: "preload" */
    './App'
  ),
)

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback="...">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<App />} />
          </Route>
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);


