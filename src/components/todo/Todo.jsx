import React, { useReducer, useState } from "react";

const initialState = {
  count: 1,
  wishlist: [],
  show: false,
};

const reducer = (state, action, payload) => {
  switch (action.type) {
    case "INC":
      return { ...state, count: state.count + payload };
    case "DEC":
      return state.count <= 1 ? state : { ...state, count: state.count - 1 };
    case "MORE":
      return { ...state, show: !state.show };
    case "LESS":

    default:
      return state;
  }
};

const Todo = () => {
  const [count, setCount] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <div onClick={() => setCount((state) => state + 1)}>Todo {count}</div>
      <h1>{state.count}</h1>
      <button onClick={() => dispatch({ type: "INC", payload: 1 })}>Increment 1</button>
      <button onClick={() => dispatch({ type: "INC", payload: 10 })}>Increment 10</button>
      <button onClick={() => dispatch({ type: "INC", payload: 100 })}>Increment 100</button>
      <button onClick={() => dispatch({ type: "DEC" })}>Decrement</button>
      <button onClick={() => dispatch({ type: "MORE" })}>show more</button>
      {state.show && (
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
          obcaecati iste ratione, laborum officia ut minus voluptate, ullam
          magni commodi eius? Doloremque cupiditate iusto commodi provident, nam
          doloribus quod eos vero voluptates consequuntur minima neque culpa
          quasi cum soluta molestias at voluptatibus? Facere temporibus fugiat
          id possimus ratione nisi aut ab expedita debitis nam libero
          reprehenderit, quasi enim tempora ipsum numquam, sed illo rem optio
          velit. Consequatur tenetur molestiae aliquam rerum saepe harum.
          Dolorum, rem! Inventore, commodi facere illum totam aliquam velit
          dolorem maxime obcaecati adipisci rem illo doloremque laborum ea
          ratione laboriosam saepe qui rerum cupiditate magnam, animi deleniti.
        </p>
      )}
    </div>
  );
};

export default Todo;
