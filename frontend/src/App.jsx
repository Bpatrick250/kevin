import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminProvider } from "./admin/contexts/AdminContext";
import AdminLayout from "./admin/components/AdminLayout";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import ProtectedRoute from "./admin/components/ProtectedRoute";

// Your existing imports...
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
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            {/* Add more admin routes here */}
          </Route>

          {/* Public Routes */}
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/programs" element={<Programs />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/getinvolved" element={<Getinvolved />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/donate" element={<Donate />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </AdminProvider>
    </Router>
  );
}

export default App;