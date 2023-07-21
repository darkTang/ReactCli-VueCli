import React from "react";
import { Suspense, lazy } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Button } from "antd";
// import Home from "./pages/Home";
// import About from "./pages/About";

// 路由懒加载w
const Home = lazy(() => import(/* webpackChunkName: "Home" */ "./pages/Home"));
const About = lazy(
  () => import(/* webpackChunkName: "About" */ "./pages/About")
);

function App() {
  return (
    <>
      <h1>App</h1>
      <Button type="primary">按钮</Button>
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
