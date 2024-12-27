import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Hero from "./components/hero/Hero";
import Food from "./components/food/Food";
import Todo from "./components/todo/Todo";
import Users from "./components/users/Users";

function App() {
  const handleClick = (p) => {
    alert("function comp " + p);
  };

  return (
    <>
      {/* <Hero title={"class component"} />
      <h2>React</h2>
      <button onClick={() => handleClick(5)}>Click</button> */}
      {/* <Food /> */}
      {/* <Todo/> */}
      <Users/>
    </>
  );
}

export default App;
