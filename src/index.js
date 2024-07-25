import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./App";
import "./App.css";
// import reportWebVitals from "./reportWebVitals";
import StarRating from "./StarRating";
const root = ReactDOM.createRoot(document.getElementById("root"));

function Test() {
  const [movieRating, setMovierating] = useState(0);

  return (
    <div>
      <StarRating
        color="blue"
        maxRating={10}
        onSetRating={setMovierating}
        className=""
      />
      <p>The movie is Rated {movieRating}</p>
    </div>
  );
}
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      color={"#fcc419"}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    /> */}

    {/* <StarRating maxRating={10} />
    <StarRating /> */}
    {/* <Test /> */}
  </React.StrictMode>
);
