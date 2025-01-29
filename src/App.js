import { RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./routes/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStoreProvider } from "./store/GlobalStoreContext";
function App() {
  return (
    <GlobalStoreProvider>
      <div className="App">
        <RouterProvider router={routes}></RouterProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={true}
          closeButton={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </GlobalStoreProvider>
  );
}

export default App;
