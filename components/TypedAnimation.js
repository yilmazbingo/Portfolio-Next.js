import React from "react";
import Typed from "react-typed";

const TypedAnimation = () => {
  const roles = [
    "Blockchain",
    "Next.js",
    "Node.js",
    "React.js",
    "Angular",
    "Webpack",
    "Python",
    "Firebase",
    "Mongo DB",
    "MySQL",
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
