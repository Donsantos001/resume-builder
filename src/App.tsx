// import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Register from "./pages/Auth/Register";
import Profile from "./pages/Auth/Profile";
import ProtectedPage from "./pages/Generic/ProtectedPage";
import SharedLayout from "./pages/Generic/SharedLayout";
import Login from "./pages/Auth/Login";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider
        preventDuplicate
        autoHideDuration={2000}
        maxSnack={10}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedPage>
              <SharedLayout>
                <Outlet />
              </SharedLayout>
            </ProtectedPage>
          }
        >
          <Route path="/" element={<Profile />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
