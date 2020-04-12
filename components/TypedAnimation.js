import React from "react";
import Typed from "react-typed";

const TypedAnimation = () => {
  const roles = [
    "Fullstack-Developer",
    "Tech Lover",
    "Blockchain",
    "Node.js",
    "React.js",
    "Python",
    "Firebase",
    "Mongo DB",
  ];
  return (
    <Typed
      loop
      typeSpeed={60}
      backSpeed={60}
      strings={roles}
      backDelay={1000}
      loopCount={0}
      showCursor
      className="self-typed"
      cursorChar="|"
    />
  );
};

export default TypedAnimation;
