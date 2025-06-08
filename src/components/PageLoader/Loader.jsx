import React from "react";

const Loader = () => {
  const loaderContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    // padding: "0% 400%",
    height: "51vh", // Full screen height
    width: "80vw",
    backgroundColor: "#f9f9f9", // Optional background color
  };

  const loaderStyle = {
    width: "50px",
    height: "50px",
    border: "5px solid rgba(0, 0, 0, 0.1)", // Light gray border
    borderTop: "5px solid #25826A", // Black loader
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  const keyframesStyle = `
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div style={loaderContainerStyle}>
        <div style={loaderStyle}></div>
      </div>
    </>
  );
};

export default Loader;
