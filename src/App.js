import "./App.css";

function App() {
  const notificationBtn = document.getElementById("enable");
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
      if (
        Notification.permission === "denied" ||
        Notification.permission === "default"
      ) {
        notificationBtn.style.display = "block";
      } else {
        notificationBtn.style.display = "none";
      }
    }

    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications.");
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
      <button id="enable" onClick={askNotificationPermission}>
        Enable notifications
      </button>
      <button id="notify" onClick={sendNotification}>
        Send Notification
      </button>
    </div>
  );
}

export default App;
