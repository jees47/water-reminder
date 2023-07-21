import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [minutes, setMinutes] = useState<any>(null);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  useEffect(() => {
    let interval: any;

    if (!("Notification" in window)) {
      alert("Sorry, this browser does not support desktop notification");
      // Handle unsupported browser case
      return;
    }

    if (isStarted) {
      interval = setInterval(() => {
        // Request permission for notifications
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            showNotification();
          } else {
            alert("Please accept notification permission");
          }
        });
      }, minutes * 60000);
    }
    return () => clearTimeout(interval);
  }, [isStarted]);

  const showNotification = () => {
    // Check if the browser supports notifications
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      // If permission is granted, show the notification
      const notification = new Notification("Take A Drink", {
        body: "Its time to take a sip!",
      });

      // Optional: Handle click event on the notification
      notification.onclick = () => {
        console.log("Notification clicked");
      };
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center flex-column vh-100  bg-image" >
      <div>
        <h1 className="mb-4 font-width-bolder">Water Reminder</h1>
      </div>
      <div>
        <h6 className="mb-2">Remind Me To Drink Water Every</h6>
      </div>
      <div className="input-group w-25 mb-2">
        <input
          type="number"
          className="form-control "
          placeholder="Enter a value"
          aria-label="Enter a value"
          aria-describedby="basic-addon2"
          onChange={(e) => {
            setMinutes(+e.target.value);
          }}
          disabled={isStarted}
        />
        <span className="input-group-text" id="basic-addon2">
          Minutes
        </span>
      </div>
      <div>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => {
            setIsStarted((prev) => !prev);
          }}
        >
          {isStarted ? "Stop" : "Remind me"}
        </button>
      </div>
    </div>
  );
}

export default App;
