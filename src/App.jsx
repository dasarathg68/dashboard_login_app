import React, { useState, useRef, useEffect } from "react";
import "./App.scss";
import { Login, Register } from "./components/login/index";

const App = () => {
  const [isLogginActive, setIsLogginActive] = useState(true);
  const containerRef = useRef(null);
  const currentRef = useRef(null);
  const rightSideRef = useRef(null);

  useEffect(() => {
    rightSideRef.current.classList.add("right");
  }, []);

  const changeState = () => {
    if (isLogginActive) {
      rightSideRef.current.classList.remove("right");
      rightSideRef.current.classList.add("left");
    } else {
      rightSideRef.current.classList.remove("left");
      rightSideRef.current.classList.add("right");
    }
    setIsLogginActive(!isLogginActive);
  };

  const current = isLogginActive ? "Register" : "Login";
  const currentActive = isLogginActive ? "login" : "register";

  return (
    <div className="App">
      <div className="login">
        <div className="container" ref={containerRef}>
          {isLogginActive && (
            <Login containerRef={currentRef} />
          )}
          {!isLogginActive && (
            <Register containerRef={currentRef} />
          )}
        </div>
        <RightSide
          current={current}
          currentActive={currentActive}
          containerRef={rightSideRef}
          onClick={changeState}
        />
      </div>
    </div>
  );
};

const RightSide = (props) => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default App;
