import React from "react";
import { Top } from "./layouts/App/top";
import Accordion from "./layouts/App/Accordion";

function App() {
  return (
    <>
      <div className="text-center">
        <div className="mt-10">
          <Top />
        </div>
        <div className="my-5">
          <Accordion />
        </div>
      </div>
    </>
  );
}

export default App;
