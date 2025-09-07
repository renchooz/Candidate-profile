import { useState } from "react";
import ProfileDetail from "./components/ProfileDetail";
import UpdateProfile from "./components/UpdateProfile";

function App() {
  const [updateBtn, setUpdateBtn] = useState(false);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>

      {!updateBtn && (
        <>
          <ProfileDetail />
          <button
            onClick={() => setUpdateBtn(true)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Update
          </button>
        </>
      )}

      {updateBtn && <UpdateProfile setUpdateBtn={setUpdateBtn} />}
    </div>
  );
}

export default App;
