import { Route, Routes } from "react-router-dom";
// importing the necessary components and pages
import Dashboard from "./Components/Dashboard";
import Home from "./Pages/Home";
import About from "./Pages/About";
import CompletedTodos from "./Pages/CompletedTodos";
import PendingTodos from "./Pages/PendingTodos";

const App = () => {
  return (
    // define the routing structure for the application using <Routes>
    <Routes>
      {/* base route ("/") for Dashboard component */}
      <Route path="/" element={<Dashboard />}>
        {/* inner routes */}

        {/* default route for parent route */}
        <Route index element={<Home />} />

        {/* route for completed todos*/}
        <Route path="/completed-todos" element={<CompletedTodos />} />

        {/*route for pending todos */}
        <Route path="/pending-todos" element={<PendingTodos />} />

        {/* route for about todo*/}
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
};

export default App;
