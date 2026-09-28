import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Journey from './components/Journey.jsx'
import Experience from './components/Experience.jsx'
import Skills from './components/Skills.jsx'
import Certifications from './components/Certifications.jsx'
import WorkSamples from './components/WorkSamples.jsx'
import FAQSection from './components/FAQ.jsx'
import Closing from './components/Closing.jsx'
import { CONTACT } from './data.js'

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Services />
        <Journey />
        <Experience />
        <Skills />
        <Certifications />
        <WorkSamples />
        <FAQSection />
        <Closing />
      </main>
      <footer className="site-footer">
        Fabian Torres, Bilingual Virtual/Project Assistant. {CONTACT.location}
      </footer>
    </>
  )
}
