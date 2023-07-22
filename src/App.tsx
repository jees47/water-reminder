import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [minutes, setMinutes] = useState<any>(null);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isSupported, setIsSupported] = useState<boolean>(false);

  useEffect(() => {
    if (!("Notification" in window)) {
      setIsSupported(false);
      alert("Sorry, this browser does not support desktop notification");
    } else {
      setIsSupported(true);
    }
  }, []);

  useEffect(() => {
    let interval: any;

    if (isStarted && isSupported) {
      if(minutes > 0 ){
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            interval = setInterval(() => {
              showNotification();
            }, minutes * 60000);
          } else {
            alert("Please accept notification permission");
          }
        });
      }else{
        alert("Please Enter a valid value")
        setIsStarted((prev) => !prev);
      }
    }
    return () => clearTimeout(interval);
  }, [isStarted, isSupported]);

  const showNotification = () => {
    const notification = new Notification("Take A Drink", {
      body: "Its time to take a sip!",
      icon: './assets/bg.jpg',
    });

    notification.onclick = () => {
      console.log("You are Awesome 😉👌");
    };
  };

  return (
    <div className="d-flex align-items-center justify-content-center flex-column vh-100  bg-image">
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
