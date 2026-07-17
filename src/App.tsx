import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import TrackingReticle from "./components/TrackingReticle";
import ScrollToTop from "./components/ScrollToTop";
import FloatingDonate from "./components/FloatingDonate";
import { initSmoothScroll } from "./lib/smoothScroll";

import Home from "./pages/Home";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import Download from "./pages/Download";
import Docs from "./pages/Docs";
import About from "./pages/About";
import Authors from "./pages/Authors";
import Changelog from "./pages/Changelog";
import Community from "./pages/Community";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import Analytics from "./pages/Analytics";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

function App() {
  useEffect(() => {
    const cleanup = initSmoothScroll();
    return cleanup;
  }, []);

  return (
    <>
      <ScrollToTop />
      <TrackingReticle />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/download" element={<Download />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/about" element={<About />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/community" element={<Community />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingDonate />
    </>
  );
}

export default App;
