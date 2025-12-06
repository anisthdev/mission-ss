import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';

// Placeholder pages - will be created later
const About = () => <div className="min-h-screen py-20"><h1 className="text-4xl text-center">About Page</h1></div>;
const Team = () => <div className="min-h-screen py-20"><h1 className="text-4xl text-center">Team Page</h1></div>;
const Programs = () => <div className="min-h-screen py-20"><h1 className="text-4xl text-center">Programs Page</h1></div>;
const Impact = () => <div className="min-h-screen py-20"><h1 className="text-4xl text-center">Impact Page</h1></div>;
const WhereWeWork = () => <div className="min-h-screen py-20"><h1 className="text-4xl text-center">Where We Work Page</h1></div>;
const Partners = () => <div className="min-h-screen py-20"><h1 className="text-4xl text-center">Partners Page</h1></div>;
const Transparency = () => <div className="min-h-screen py-20"><h1 className="text-4xl text-center">Transparency Page</h1></div>;
const GetInvolved = () => <div className="min-h-screen py-20"><h1 className="text-4xl text-center">Get Involved Page</h1></div>;
const Contact = () => <div className="min-h-screen py-20"><h1 className="text-4xl text-center">Contact Page</h1></div>;

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-white dark:bg-[rgb(var(--dark-bg-primary))] transition-colors">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/programs/:slug" element={<Programs />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/where-we-work" element={<WhereWeWork />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/transparency" element={<Transparency />} />
              <Route path="/get-involved" element={<GetInvolved />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
