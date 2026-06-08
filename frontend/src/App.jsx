import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AdminProvider } from "./admin/contexts/AdminContext";
import AdminLayout from "./admin/components/AdminLayout";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import ProtectedRoute from "./admin/components/ProtectedRoute";

// Public components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Blog from "./pages/Blog";
import Gallery from "./pages/Gallery";
import Getinvolved from "./pages/Getinvolved";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";

function App() {
  return (
    <Router>
      <AdminProvider>
        <Routes>
          {/* Admin Routes - Public */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Admin Routes - Protected */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            {/* Add more admin routes here */}
          </Route>

          {/* Public Routes */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Home />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <About />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/programs"
            element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Programs />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/blog"
            element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Blog />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/gallery"
            element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Gallery />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/getinvolved"
            element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Getinvolved />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Contact />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/donate"
            element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Donate />
                </main>
                <Footer />
              </>
            }
          />
          
          {/* 404 - Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AdminProvider>
    </Router>
  );
}

export default App;