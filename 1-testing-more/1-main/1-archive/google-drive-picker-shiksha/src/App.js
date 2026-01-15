
import './App.css';

import React, { useEffect } from 'react';
import useDrivePicker from 'react-google-drive-picker';

function App() {

  const [openPicker, data, authResponse] = useDrivePicker();

  const handleOpenPicker = () => {
    openPicker({
      clientId: "694215446641-7755vkis1538vo7p678m379cj0en8odd.apps.googleusercontent.com",
      developerKey: "AIzaSyDQ1b13IpgHtVs5DVD7TP7loADrxDWb0qM",
      viewId: "DOCS",
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true

    })
  }

  useEffect(() => {

    if (data) {

      console.log(data);

    }

  }, [data])

  return (

    <div>
      <button onClick={() => handleOpenPicker()}> Open Picker </button>
    </div>
    

  );
}

export default App;
