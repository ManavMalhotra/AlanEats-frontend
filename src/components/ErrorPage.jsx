import React from "react";

const ErrorPage = () => {
  return (
    <div
      id="wrapper"
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#f7f9fb",
        height: "100vh",
      }}
    >
      <img src="https://cdn.dribbble.com/users/718859/screenshots/3267029/jisunpark_404-error.gif" />
      <div id="info"></div>
    </div>
  );
};

export default ErrorPage;
