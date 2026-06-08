import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Blog from "./pages/Blog";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import Getinvolved from "./pages/Getinvolved";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/getinvolved" element={<Getinvolved />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;