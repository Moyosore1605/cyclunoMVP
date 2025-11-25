import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import Signup from "./pages/auth/Signup.jsx";
import Login from "./pages/auth/Login.jsx";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicLayout from "./layouts/PublicLayout.jsx";
import LandingLayout from "./layouts/LandingLayout.jsx";
import Landing from "./pages/landing/Landing.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import EmailVerify from "./pages/auth/EmailVerify.jsx";
import VerificationTester from "./pages/auth/VerificationTester.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import CreateProduct from "./pages/product/CreateProduct.jsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing Page */}
          <Route element={<LandingLayout />}>
            <Route path="/" element={<Landing />} />
          </Route>

          {/* Public Pages */}
          <Route element={<PublicLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/emailverify" element={<EmailVerify />} />
            <Route path="/dev-verify" element={<VerificationTester/>} />
          </Route>

          {/* Protected Pages */}
          <Route element={<DashboardLayout/>}>
            <Route path="/dashboard" element={
              // <ProtectedRoute>
                <Dashboard /> 
              // </ProtectedRoute>
              }
              />
              <Route path="/createproduct" element={<CreateProduct/>}/>
          </Route>
          

        </Routes>
      </BrowserRouter>
      <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
    </AuthProvider>
  );
}
