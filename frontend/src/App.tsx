import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import HeadPage from "./pages/HeadPage";
import ManagerPage from "./pages/ManagerPage";
import CoordPage from "./pages/CoordPage";
import NoRolePage from "./pages/NoRolePage";
import ProtectedRoute, { getDefaultPathForRole } from "./components/ProtectedRoute";
import TopBar from "./components/TopBar";

function App() {
  const { user, loading, login } = useAuth();

  if (loading) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>Loading...</div>;
  }

  return (
    <>
      <TopBar />
      <Routes>
        {/* Public Login Route */}
        <Route path="/" element={
          user?.authenticated ? (
            <Navigate to={getDefaultPathForRole(user.role)} replace />
          ) : (
            <div>
              <h1>Login Page</h1>
              <button onClick={login}>Login with DAuth</button>
            </div>
          )
        } />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute allowedRole="HEAD" />}>
          <Route path="/head/*" element={<HeadPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRole="MANAGER" />}>
          <Route path="/manager/*" element={<ManagerPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRole="COORD" />}>
          <Route path="/coord/*" element={<CoordPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRole="NO-ROLE" />}>
          <Route path="/no-role/*" element={<NoRolePage />} />
        </Route>

        {/* Catch-All */}
        <Route path="*" element={<Navigate to={user?.authenticated ? getDefaultPathForRole(user.role) : "/"} replace />} />
      </Routes>
    </>
  );
}

export default App;
