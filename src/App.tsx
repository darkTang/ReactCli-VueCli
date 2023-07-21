

import React from "react";
import { Suspense, lazy } from "react";
import { Link, Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
// import About from "./pages/About";

// 路由懒加载
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import("./pages/About"));


function App() {
  return (
    <>
      <h1>App</h1>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
