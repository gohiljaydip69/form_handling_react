import React from "react";
import "./App.css";
import OutputTable from "./OutputTable";
import Form from "./Form";
import FormContext from "./context/stateContext";

const App = () => {


  return (
    <>
      <FormContext>
        <Form />
        <OutputTable />
      </FormContext>
    </>
  );
};

export default App;
