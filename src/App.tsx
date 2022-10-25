import "./App.css";
import MainRoutes from "./routes";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import UserProvider from "./contexts/UserContext";
import TechsProvider from "./contexts/TechContext";

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={600}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <UserProvider>
        <TechsProvider>
          <MainRoutes />
        </TechsProvider>
      </UserProvider>
    </>
  );
}

export default App;
