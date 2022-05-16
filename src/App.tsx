import { Fragment } from "react";

import "./App.css";
import Header from "./components/Header";
import Form from "./components/Form";
import ListContainer from "./components/ListContainer";

function App() {
  return (
    <Fragment>
      <Header />
      <Form />
      <ListContainer />
    </Fragment>
  );
}

export default App;
