import "./App.css";
// import CursorFollower from "./components/CursorFollower";
import Reminder from "./components/Reminder"

function App() {
  return (
    <div className="d-flex align-items-center justify-content-center flex-column vh-100  bg-image">
      <Reminder />
      {/* <CursorFollower />  */}
    </div>
  );
}

export default App;
