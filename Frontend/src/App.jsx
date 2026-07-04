import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import { getCurrentUser } from "./api/authApi";
import { loginSuccess, logout, setInitialized } from "./features/authSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await getCurrentUser();
        dispatch(loginSuccess(response.data.data.user));
      } catch (error) {
        dispatch(logout());
      } finally {
        dispatch(setInitialized());
      }
    };

    fetchCurrentUser();
  }, [dispatch]);

  return <AppRoutes />;
}

export default App;
