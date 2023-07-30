import "./App.css";
import Reminder from "./components/Reminder";
import Cursor from "react-cursor-follow";

function App() {

  return (
    <div className="d-flex align-items-center justify-content-center flex-column vh-100  bg-image">
      <Reminder />
      <Cursor hollow color={"#339FAF"} duration={1.8} size={45} />
    </div>
  );
}

export default App;
