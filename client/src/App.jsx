import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [devices, setDevices] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [url, setUrl] = useState("");

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {

    const res = await axios.get(
      "http://localhost:5000/devices"
    );

    setDevices(res.data);
  };

  const toggleDevice = (device) => {

    if (selectedDevices.includes(device)) {

      setSelectedDevices(
        selectedDevices.filter(d => d !== device)
      );

    } else {

      setSelectedDevices([
        ...selectedDevices,
        device
      ]);
    }
  };

  const sendVideo = async () => {

    await axios.post(
      "http://localhost:5000/open-video",
      {
        url,
        devices: selectedDevices
      }
    );

    alert("Video sent");
  };

  return (
    <div style={{ padding: 20 }}>

      <h1>Video Sync System</h1>

      <h3>Connected Devices</h3>

      {
        devices.map(device => (
          <div key={device}>

            <input
              type="checkbox"
              onChange={() => toggleDevice(device)}
            />

            {device}

          </div>
        ))
      }

      <br />

      <input
        type="text"
        placeholder="Paste YouTube URL"
        style={{
          width: "400px",
          padding: "10px"
        }}
        onChange={(e) => setUrl(e.target.value)}
      />

      <br /><br />

      <button onClick={sendVideo}>
        Play On Phones
      </button>

    </div>
  );
}

export default App;