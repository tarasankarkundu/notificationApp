import { useState } from "react";
import "./App.css";

function App() {
  const [showReqBtn, setRequestBtn] = useState(
    Notification.permission !== "granted"
  );

  const checkNotificationPromise = () => {
    try {
      Notification.requestPermission().then();
    } catch (e) {
      return false;
    }
    return true;
  };

  const askNotificationPermission = () => {
    // function to actually ask the permissions
    function handlePermission(permission) {
      // set the button to shown or hidden, depending on what the user answers
      console.log(permission);
      if (permission === "denied" || permission === "default") {
        setRequestBtn(true);
      } else {
        setRequestBtn(false);
      }
    }

    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support notifications.");
    } else {
      if (checkNotificationPromise()) {
        Notification.requestPermission().then((permission) => {
          handlePermission(permission);
        });
      } else {
        Notification.requestPermission(function (permission) {
          handlePermission(permission);
        });
      }
    }
  };

  const sendNotification = () => {
    console.log(Notification.permission);
    new Notification("Test", { body: "Test Notification" });
  };
  return (
    <div className="App">
      {showReqBtn && (
        <button id="enable" onClick={askNotificationPermission}>
          Enable notifications
        </button>
      )}
      <button id="notify" onClick={sendNotification}>
        Send Notification
      </button>
    </div>
  );
}

export default App;
