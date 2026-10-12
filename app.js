/**
 * Siva Balaji - Full Stack Developer Luxury Portfolio
 * React 18 Standalone Application with Owner Portal
 * Features:
 *  1. Preloader ("Balaji." water-fill & upward shutter reveal)
 *  2. Navbar with dynamic scroll glassmorphism & Owner Login trigger
 *  3. Hero Section (video background, outlined typography, play reel)
 *  4. About Me (lanyard ID badge with real photo, tech highlights, torn paper)
 *  5. Comprehensive Skills Section (HTML, CSS, JS, Python, React, Node, Tailwind, zero Java)
 *  6. Interactive Projects Gallery (search, filter, live links, owner edit/delete)
 *  7. Interactive Certificates Gallery (lightbox with zoom/prev/next/download, owner edit/delete)
 *  8. Process Timeline ("How I work", 4 rotating tag cards with red active states)
 *  9. Full Contact Section (Email, WhatsApp, LinkedIn, GitHub, working contact form)
 * 10. Owner Portal & Access Control (PIN: Balaji@1, add/edit/delete with file uploads & localStorage)
 * 11. Luxury Footer (monochrome dark theme, giant "balaji" centerpiece)
 */

const { useState, useEffect, useRef } = React;

// =============================================================================
// Default Data for Projects & Certificates
// =============================================================================
const DEFAULT_PROJECTS = [
  {
    id: 'p-ai-coach',
    title: 'AI Resume & ATS Career Coach Platform',
    category: 'Full Stack & AI',
    description: 'An intelligent AI-powered resume parser and interview prep engine using LLM APIs. Analyzes CVs, calculates ATS compatibility match scores, highlights keyword gaps, and generates real-time technical interview questions.',
    tags: ['React.js', 'Node.js', 'OpenAI API', 'Express', 'Tailwind CSS', 'MongoDB'],
    image: 'assets/projects/ai-coach.svg',
    demoUrl: '#',
    githubUrl: 'https://github.com/kurangisivabalaji-glitch/ai-career-coach.git'
  },
  {
    id: 'p-cloud-vault',
    title: 'CloudVault - Enterprise Cloud File Storage SaaS',
    category: 'Cloud & SaaS',
    description: 'Scalable cloud drive platform with chunked multi-part drag-and-drop file uploads, role-based access control (RBAC), presigned secure download links, and end-to-end AES-256 file encryption.',
    tags: ['React', 'AWS S3', 'Node.js', 'JWT Auth', 'PostgreSQL', 'REST API'],
    image: 'assets/projects/cloud-storage.svg',
    demoUrl: '#',
    githubUrl: 'https://github.com/kurangisivabalaji-glitch/cloud-vault-saas.git'
  },
  {
    id: 'p-code-collab',
    title: 'CodeSphere - Real-Time Collaborative IDE & Sandbox',
    category: 'DevTools',
    description: 'Web-based multi-user pair programming IDE with real-time cursor tracking via WebSockets, Monaco code editor, multi-language syntax highlighting, in-browser code execution sandbox, and developer chat rooms.',
    tags: ['React.js', 'Socket.io', 'WebSockets', 'Monaco Editor', 'Node.js', 'Docker'],
    image: 'assets/projects/code-collab.svg',
    demoUrl: '#',
    githubUrl: 'https://github.com/kurangisivabalaji-glitch/collaborative-code-editor.git'
  },
  {
    id: 'p-marketplace',
    title: 'ApexMart - Multi-Vendor E-Commerce Marketplace',
    category: 'E-Commerce',
    description: 'High-conversion digital storefront featuring instant catalog search, Redux cart state persistence, Razorpay & Stripe secured checkout, order fulfillment tracking, and automated PDF invoice generation.',
    tags: ['React.js', 'Redux Toolkit', 'Node.js', 'Razorpay API', 'MongoDB', 'Express'],
    image: 'assets/projects/marketplace.svg',
    demoUrl: '#',
    githubUrl: 'https://github.com/kurangisivabalaji-glitch/ecommerce-marketplace.git'
  },
  {
    id: 'p-telehealth',
    title: 'CareSync - Telemedicine & Patient Healthcare Portal',
    category: 'HealthTech',
    description: 'HIPAA-conscious hospital scheduling and consultation platform connecting patients with certified specialists. Features automated appointment booking, prescription history, and WebRTC live consultations.',
    tags: ['React.js', 'Express.js', 'PostgreSQL', 'WebRTC', 'REST API', 'Tailwind'],
    image: 'assets/projects/telehealth.svg',
    demoUrl: '#',
    githubUrl: 'https://github.com/kurangisivabalaji-glitch/telehealth-portal.git'
  },
  {
    id: 'p-calculator',
    title: 'Interactive Financial Calculator & Expense Tracker',
    category: 'FinTech',
    description: 'A comprehensive personal finance calculator and expense management web app with arithmetic keypad, monthly budgeting analytics, spending category breakdown charts, and complete LocalStorage persistence.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'LocalStorage', 'ES6'],
    image: 'assets/projects/calculator.svg',
    demoUrl: 'http://localhost:8080/',
    githubUrl: 'https://github.com/kurangisivabalaji-glitch/dom-and-es6.git'
  },
  {
    id: 'p-quiz',
    title: 'Interactive Quiz Engine',
    category: 'Interactive Apps',
    description: 'Dynamic question engine featuring timed challenges, real-time score tracking, category selection, and instant performance feedback.',
    tags: ['JavaScript', 'DOM', 'CSS3', 'ES6'],
    image: 'assets/projects/quiz.svg',
    demoUrl: '#',
    githubUrl: 'https://github.com/kurangisivabalaji-glitch/dom-and-es6.git'
  },
  {
    id: 'p-puzzle',
    title: 'Sliding Tile Puzzle Game',
    category: 'Games',
    description: 'Engaging brain-teaser logic game with solvable tile permutations, move counters, timer, and smooth sliding tile animations.',
    tags: ['JavaScript', 'Algorithms', 'CSS Grid', 'DOM'],
    image: 'assets/projects/puzzle.svg',
    demoUrl: '#',
    githubUrl: 'https://github.com/kurangisivabalaji-glitch/dom-and-es6.git'
  },
  {
    id: 'p-weather',
    title: 'Live Weather Application',
    category: 'Utilities',
    description: 'Weather forecasting dashboard fetching real-time atmospheric data, temperature charts, humidity, and 5-day weather projections.',
    tags: ['JavaScript', 'REST API', 'Fetch', 'Async/Await'],
    image: 'assets/projects/weather.svg',
    demoUrl: '#',
    githubUrl: 'https://github.com/kurangisivabalaji-glitch/dom-and-es6.git'
  },
  {
    id: 'p-todo',
    title: 'Task & To-Do List Manager',
    category: 'Utilities',
    description: 'Productivity suite supporting task priority tagging, date deadlines, search filtering, and state preservation across browser refreshes.',
    tags: ['JavaScript', 'LocalStorage', 'UI/UX', 'ES6'],
    image: 'assets/projects/todo.svg',
    demoUrl: '#',
    githubUrl: 'https://github.com/kurangisivabalaji-glitch/dom-and-es6.git'
  },
  {
    id: 'p-auth',
    title: 'Modern Authentication Form',
    category: 'Web Apps',
    description: 'Production-ready authentication interface featuring password strength evaluation, show/hide visibility, and strict client-side validation.',
    tags: ['HTML5', 'CSS3', 'RegEx', 'JavaScript'],
    image: 'assets/projects/login.svg',
    demoUrl: '#',
    githubUrl: 'https://github.com/kurangisivabalaji-glitch/dom-and-es6.git'
  }
];

const DEFAULT_CERTIFICATES = [
  {
    id: 'c-1',
    title: 'Full Stack Web Development & Modern JavaScript',
    issuer: 'Sri Mittapalli College of Engineering',
    date: '2026',
    skills: ['HTML5', 'CSS3', 'JavaScript ES6', 'DOM Manipulation'],
    image: 'assets/certificates/cert-web-dev.svg'
  },
  {
    id: 'c-2',
    title: 'Python Programming & Problem Solving',
    issuer: 'Technical Certification Authority',
    date: '2025',
    skills: ['Python', 'Data Structures', 'Algorithms', 'Logic Building'],
    image: 'assets/certificates/cert-python.svg'
  },
  {
    id: 'c-3',
    title: 'Frontend UI Architecture & Web Standards',
    issuer: 'Sri Mittapalli Engg College / Online Learning',
    date: '2026',
    skills: ['Responsive Design', 'Tailwind CSS', 'Web Performance'],
    image: 'assets/certificates/cert-frontend.svg'
  }
];

// =============================================================================
// Firebase & Cloud Firestore Configuration & Initialization
// Project: portfolio-d7827
// =============================================================================
const firebaseConfig = {
  apiKey: "AIzaSyBnP87S040wxww8tuH7-u_lITKCrzIv2OI",
  authDomain: "portfolio-d7827.firebaseapp.com",
  projectId: "portfolio-d7827",
  storageBucket: "portfolio-d7827.firebasestorage.app",
  messagingSenderId: "933772657154",
  appId: "1:933772657154:web:10fd74734a89f028badd1b",
  measurementId: "G-K4VQXVPT1J"
};

let db = null;
let analytics = null;
let isFirebaseAvailable = false;

try {
  if (typeof firebase !== 'undefined') {
    if (!firebase.apps || !firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    db = firebase.firestore();
    try {
      if (typeof firebase.analytics === 'function') {
        analytics = firebase.analytics();
      }
    } catch (e) {
      console.warn('Analytics note:', e.message);
    }
    isFirebaseAvailable = true;
    console.log('[Firebase] Cloud Firestore initialized successfully for project: portfolio-d7827');
  } else {
    console.warn('Firebase SDK compat scripts not loaded.');
  }
} catch (err) {
  console.error('Firebase initialization error:', err);
}

// Firestore Service Helpers with Real-time Listeners and LocalStorage Resilience
const FirestoreService = {
  isAvailable() {
    return isFirebaseAvailable && db !== null;
  },

  // Real-time listener for Projects
  subscribeProjects(onSuccess, onError) {
    if (!this.isAvailable()) return () => {};
    try {
      return db.collection('projects').onSnapshot(
        (snapshot) => {
          if (snapshot.empty) {
            onSuccess(null, true /* isEmpty */);
          } else {
            const list = [];
            snapshot.forEach((doc) => {
              const data = doc.data();
              list.push({ ...data, id: doc.id });
            });
            onSuccess(list, false);
          }
        },
        (error) => {
          console.warn('Firestore projects snapshot error:', error);
          if (onError) onError(error);
        }
      );
    } catch (e) {
      if (onError) onError(e);
      return () => {};
    }
  },

  // Seed default projects to Firestore if empty or on reset
  async seedProjects(projectsList) {
    if (!this.isAvailable()) return;
    try {
      const batch = db.batch();
      projectsList.forEach((p) => {
        const docRef = db.collection('projects').doc(p.id);
        batch.set(docRef, p, { merge: true });
      });
      await batch.commit();
      console.log("[Firestore] All portfolio projects synced to collection: projects");
    } catch (err) {
      console.error('Failed to seed projects to Firestore:', err);
    }
  },

  // Save/Update Project in Firestore
  async saveProject(project) {
    if (!this.isAvailable()) return;
    try {
      await db.collection('projects').doc(project.id).set(project, { merge: true });
      console.log("[Firestore] Project saved to Firestore:", project.id);
    } catch (err) {
      console.error('Failed to save project to Firestore:', err);
    }
  },

  // Delete Project from Firestore
  async deleteProject(projectId) {
    if (!this.isAvailable()) return;
    try {
      await db.collection('projects').doc(projectId).delete();
      console.log("[Firestore] Project removed from Firestore:", projectId);
    } catch (err) {
      console.error('Failed to delete project from Firestore:', err);
    }
  },

  // Real-time listener for Certificates
  subscribeCertificates(onSuccess, onError) {
    if (!this.isAvailable()) return () => {};
    try {
      return db.collection('certificates').onSnapshot(
        (snapshot) => {
          if (snapshot.empty) {
            onSuccess(null, true /* isEmpty */);
          } else {
            const list = [];
            snapshot.forEach((doc) => {
              const data = doc.data();
              list.push({ ...data, id: doc.id });
            });
            onSuccess(list, false);
          }
        },
        (error) => {
          console.warn('Firestore certificates snapshot error:', error);
          if (onError) onError(error);
        }
      );
    } catch (e) {
      if (onError) onError(e);
      return () => {};
    }
  },

  // Seed default certificates to Firestore if empty or on reset
  async seedCertificates(certList) {
    if (!this.isAvailable()) return;
    try {
      const batch = db.batch();
      certList.forEach((c) => {
        const docRef = db.collection('certificates').doc(c.id);
        batch.set(docRef, c, { merge: true });
      });
      await batch.commit();
      console.log("[Firestore] All portfolio certificates synced to collection: certificates");
    } catch (err) {
      console.error('Failed to seed certificates to Firestore:', err);
    }
  },

  // Save/Update Certificate in Firestore
  async saveCertificate(cert) {
    if (!this.isAvailable()) return;
    try {
      await db.collection('certificates').doc(cert.id).set(cert, { merge: true });
      console.log("[Firestore] Certificate saved to Firestore:", cert.id);
    } catch (err) {
      console.error('Failed to save certificate to Firestore:', err);
    }
  },

  // Delete Certificate from Firestore
  async deleteCertificate(certId) {
    if (!this.isAvailable()) return;
    try {
      await db.collection('certificates').doc(certId).delete();
      console.log("[Firestore] Certificate removed from Firestore:", certId);
    } catch (err) {
      console.error('Failed to delete certificate from Firestore:', err);
    }
  },

  // Save Contact Inquiry Message to Firestore collection "messages"
  async saveMessage(msg) {
    if (!this.isAvailable()) return false;
    try {
      const ref = await db.collection('messages').add({
        ...msg,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        sentAt: new Date().toISOString()
      });
      console.log("[Firestore] Contact inquiry saved to collection messages:", ref.id);
      return true;
    } catch (err) {
      console.error('Failed to save message to Firestore:', err);
      return false;
    }
  }
};

// =============================================================================
// 1. Fullscreen Modern Preloader Component
// =============================================================================
function Preloader({ onComplete }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), 1200);
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1950);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  const handleDismiss = () => {
    setExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 300);
  };

  return (
    <div
      onClick={handleDismiss}
      className={`preloader-overlay ${exiting ? 'preloader-exit' : ''} cursor-pointer`}
      role="status"
      aria-label="Loading portfolio (Click to skip)"
      title="Click anywhere to enter"
    >
      <div className={`relative select-none text-center ${exiting ? 'preloader-logo-exit' : ''}`}>
        <h1 className="font-syne text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-black/25">
          Balaji.
        </h1>
        <h1 className="preloader-text-fg font-syne text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter" aria-hidden="true">
          Balaji.
        </h1>
      </div>
    </div>
  );
}

// =============================================================================
// 2. Floating Navbar Component
// =============================================================================
function Navbar({ isOwner, onOpenOwnerModal, onLogOut, onOpenAddMenu }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 pt-4">
      <div
        className={`max-w-7xl mx-auto rounded-full transition-all duration-400 flex items-center justify-between px-6 py-3.5 ${
          isScrolled ? 'glass-panel shadow-2xl' : 'bg-transparent'
        }`}
      >
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-1 group">
          <span className="font-syne text-2xl font-black tracking-tight text-white group-hover:opacity-90 transition-opacity">
            Balaji<span className="text-[#FF2A2A]">.</span>
          </span>
        </a>

        {/* Desktop Menu Links */}
        <nav className="hidden xl:flex items-center gap-6">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="nav-link text-sm font-medium text-white/80 hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: The 1 Dedicated Add Button + Owner Lock & Hire Me */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Single Add Button for Projects & Certificates (Replaces duplicate buttons) */}
          <button
            onClick={onOpenAddMenu}
            className="flex items-center gap-1.5 text-xs font-mono font-bold bg-[#FF2A2A] hover:bg-[#E01E1E] text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-all cursor-pointer border border-[#FF2A2A]"
            title={isOwner ? "Add New Project or Certificate" : "Owner Verification Required (Balaji@1)"}
          >
            <span>+ Add Project / Certificate</span>
            {!isOwner && <span className="text-[10px] opacity-80">🔒</span>}
          </button>

          {isOwner ? (
            <button
              onClick={onLogOut}
              className="text-xs font-mono bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 px-3 py-1.5 rounded-full hover:bg-red-950/80 hover:border-red-500/50 hover:text-red-300 transition-colors cursor-pointer"
              title="Click to Lock Owner Mode"
            >
              🔑 Lock
            </button>
          ) : (
            <button
              onClick={onOpenOwnerModal}
              className="text-xs font-mono text-white/50 hover:text-white px-2 py-1 transition-colors cursor-pointer"
              title="Owner Login (Ctrl + Shift + A)"
            >
              🔒
            </button>
          )}

          <a
            href="mailto:kurangisivabalaji@gmail.com"
            className="glass-btn px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-white hover:scale-105 ml-1"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white p-2 focus:outline-none cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Slide-Down Menu Panel with the 1 Add Button */}
      <div
        className={`lg:hidden fixed top-20 left-4 right-4 bg-[#1a1a1a] text-white rounded-3xl p-6 shadow-2xl border border-white/15 transition-all duration-400 ease-in-out z-50 ${
          mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-6 pointer-events-none'
        }`}
      >
        {/* The 1 Primary Add Button on Mobile */}
        <div className="flex flex-col gap-2 pb-4 mb-4 border-b border-white/15">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAddMenu();
            }}
            className="flex items-center justify-center gap-2 bg-[#FF2A2A] text-white py-3 rounded-full font-bold font-mono text-xs shadow-lg cursor-pointer"
          >
            + Add Project / Certificate {!isOwner && '🔒 (Balaji Only)'}
          </button>
        </div>

        <nav className="flex flex-col gap-3">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-syne text-lg font-bold hover:translate-x-2 transition-transform text-white/90 hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-4 border-t border-white/20 mt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOwnerModal();
              }}
              className="text-left font-mono text-sm py-1 opacity-80 hover:opacity-100"
            >
              {isOwner ? '🔑 Owner Mode Active (Lock)' : '🔒 Owner PIN Login'}
            </button>
            <a
              href="mailto:kurangisivabalaji@gmail.com"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center bg-white text-black py-2.5 rounded-full font-bold uppercase tracking-wider text-xs"
            >
              Hire Me (Email)
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

// =============================================================================
// 3. Fullscreen Hero Section with Siva Balaji's Background Video & Audio Controls
// =============================================================================
function Hero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasLoopEnabled, setHasLoopEnabled] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const videoRef = useRef(null);

  // Google Drive video URLs provided by Balaji
  const driveViewUrl = "https://drive.google.com/file/d/1RKl_VKFUjjNdsahdF_ZbTzHXXSRs7ZM-/view?usp=drive_link";
  const driveEmbedUrl = "https://drive.google.com/file/d/1RKl_VKFUjjNdsahdF_ZbTzHXXSRs7ZM-/preview";

  // 1. Initial Start: Background video plays at start once with Audio Defaultly Enabled
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.loop = false;
    video.volume = 1.0;
    video.muted = false;
    setIsMuted(false);

    const handleEnded = () => {
      setHasPlayedOnce(true);
      if (!video.loop) {
        setIsPlaying(false);
        video.pause();
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    // Defaultly set audio; if browser autoplay policy blocks unmuted autoplay, unmute on first user click
    const startVideoWithAudio = async () => {
      try {
        video.muted = false;
        video.volume = 1.0;
        await video.play();
        setIsPlaying(true);
        setIsMuted(false);
      } catch {
        video.muted = true;
        setIsMuted(true);
        try {
          await video.play();
          setIsPlaying(true);
        } catch {}

        const enableSound = () => {
          if (videoRef.current) {
            videoRef.current.muted = false;
            videoRef.current.volume = 1.0;
            setIsMuted(false);
          }
          window.removeEventListener('click', enableSound);
          window.removeEventListener('keydown', enableSound);
          window.removeEventListener('touchstart', enableSound);
        };
        window.addEventListener('click', enableSound, { once: true });
        window.addEventListener('keydown', enableSound, { once: true });
        window.addEventListener('touchstart', enableSound, { once: true });
      }
    };

    startVideoWithAudio();

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  // 2. The ONLY Control: Stop / Play Video Button (Audio is defaultly active)
  const handleTogglePlayStop = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.muted = false;
      video.volume = 1.0;
      setIsMuted(false);
      video.loop = true;
      if (video.ended) {
        video.currentTime = 0;
      }
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Siva Balaji's Background Video (70% Brightness) */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        poster="hero_poster.jpg"
        style={{ filter: 'brightness(0.70) contrast(1.05)' }}
        className="absolute inset-0 w-full h-full object-cover z-0 filter brightness-[70%] contrast-105"
      >
        <source src="hero-video.mp4" type="video/mp4" />
        <source src="https://assets.mixkit.co/videos/preview/mixkit-circuit-board-technology-animation-43093-large.mp4" type="video/mp4" />
      </video>

      {/* Balanced gradient overlay so 70% video brightness shines through clearly */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-black/30 z-10" />

      <div className="relative z-20 max-w-7xl w-full mx-auto px-6 sm:px-8 py-16 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-btn mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FF2A2A] animate-ping" />
            <span className="text-xs font-mono tracking-wider text-white/80 uppercase">Available for Developer Roles</span>
          </div>

          <h1 className="font-syne text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tighter mb-6">
            <span className="block text-white">Hi, I'm a</span>
            <span className="block text-stroke mt-1">Full Stack</span>
            <span className="block text-stroke">Developer</span>
          </h1>

          <p className="text-base sm:text-lg text-white/85 font-normal leading-relaxed max-w-xl mb-8">
            I'm <strong className="text-white font-semibold">K. Lakshmi Siva Balaji</strong>, a B.Tech Computer Science student crafting responsive, modern web applications with JavaScript, React.js, Node.js, and Python.
          </p>

          {/* Clean Primary Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="bg-white text-black font-semibold text-sm px-8 py-4 rounded-full hover:scale-105 transition-transform duration-300 shadow-xl"
            >
              Explore Projects
            </a>

            <a
              href="#contact"
              className="glass-btn text-white font-medium text-sm px-7 py-4 rounded-full hover:bg-white/15"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* The ONLY Button: Background Video Stop / Play Control */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={handleTogglePlayStop}
            className={`play-reel-btn w-36 h-36 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center gap-2.5 group cursor-pointer transition-all duration-300 hover:scale-105 shadow-2xl ${
              isPlaying
                ? 'border-[#FF2A2A]/80 shadow-[0_0_35px_rgba(255,42,42,0.4)] hover:border-[#FF2A2A]'
                : 'border-emerald-500/80 shadow-[0_0_35px_rgba(16,185,129,0.4)] hover:border-emerald-400'
            }`}
            aria-label={isPlaying ? "Stop Background Video" : "Play Background Video"}
            title={isPlaying ? "Click to Stop Background Video" : "Click to Play Background Video with Audio"}
          >
            {isPlaying ? (
              <>
                <div className="w-12 h-12 rounded-2xl bg-[#FF2A2A]/20 border border-[#FF2A2A]/60 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,42,42,0.3)]">
                  <div className="w-5 h-5 rounded-sm bg-[#FF2A2A] shadow-[0_0_10px_#FF2A2A]" />
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-syne font-bold text-xs sm:text-sm text-white uppercase tracking-wider">
                    Stop Video
                  </span>
                  <span className="text-[10px] font-mono text-[#FF2A2A] uppercase tracking-widest mt-0.5">
                    Click to Stop
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/60 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-emerald-400 ml-1">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-syne font-bold text-xs sm:text-sm text-emerald-300 uppercase tracking-wider">
                    Play Video
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400/80 uppercase tracking-widest mt-0.5">
                    Click to Resume
                  </span>
                </div>
              </>
            )}
          </button>
        </div>
      </div>

      <a href="#about" className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2 text-white/60 hover:text-white transition-colors">
        <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
        <svg className="w-5 h-5 animate-bounce text-[#FF2A2A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>

      {/* Google Drive Video Player Modal */}
      {showVideoModal && (
        <div className="modal-overlay-luxury" onClick={() => setShowVideoModal(false)}>
          <div
            className="modal-content-luxury max-w-4xl p-6 sm:p-8 relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#FF2A2A] animate-ping" />
                <h3 className="font-syne text-xl font-bold">K. Lakshmi Siva Balaji — Video Reel</h3>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={driveViewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#FF2A2A] hover:underline flex items-center gap-1"
                >
                  Open in Google Drive ↗
                </a>
                <button
                  type="button"
                  onClick={() => setShowVideoModal(false)}
                  className="bg-zinc-800 text-white hover:bg-zinc-700 px-3 py-1.5 rounded-lg text-xs font-mono"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            {/* Embedded Google Drive Video Player */}
            <div className="relative w-full rounded-2xl overflow-hidden bg-black aspect-video border border-white/15 shadow-2xl">
              <iframe
                src={driveEmbedUrl}
                title="Siva Balaji Video Reel"
                className="w-full h-full border-0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>

            {/* Modal Subtext */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-4 mt-2 text-xs font-mono text-white/60 gap-2">
              <span>Streaming directly from Balaji's Google Drive</span>
              <a
                href={driveViewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Having trouble playing? Click here to view on Google Drive
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// =============================================================================
// 4. About Section (Vibrant Red, Lanyard ID Badge, Tech Logos, Torn Paper)
// =============================================================================
function About() {
  return (
    <section id="about" className="relative bg-[#FF2A2A] text-white pt-24 pb-36 overflow-hidden">
      <div className="absolute top-12 left-10 text-black/80 star-pulse pointer-events-none">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>
      <div className="absolute top-1/3 right-12 text-black/70 star-pulse-delayed pointer-events-none">
        <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Lanyard & Conference ID Badge */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="lanyard-container">
              <div className="lanyard-strap" />
              <div className="lanyard-clip" />
              <div className="lanyard-clip-ring" />

              <div className="id-badge-card bg-[#1c1c1c] text-white rounded-3xl p-6 w-80 sm:w-88 border border-white/15 relative mt-1 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF2A2A] animate-pulse" />
                    <span className="font-mono text-xs tracking-wider uppercase text-white/80">STUDENT ID CARD</span>
                  </div>
                  <span className="font-mono text-xs text-[#FF2A2A] font-bold">24U91A05C8</span>
                </div>

                <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-5 bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/15 shadow-inner">
                  <img
                    src="profile.jpg"
                    alt="K. Lakshmi Siva Balaji"
                    className="w-full h-full object-cover object-top filter contrast-105 brightness-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "assets/images/profile.jpg";
                    }}
                  />
                  <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-white/90 border border-white/10 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>STATUS: ACTIVE</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-syne text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                    K. LAKSHMI SIVA BALAJI
                  </h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#FF2A2A]/20 border border-[#FF2A2A]/50">
                    <span className="text-[10px] font-mono text-white/70 uppercase">Roll No:</span>
                    <span className="text-xs font-mono font-bold text-[#FF2A2A] tracking-wider">24U91A05C8</span>
                  </div>
                  <p className="text-xs font-mono text-white/90 font-semibold tracking-wider uppercase">
                    Full Stack Developer
                  </p>
                  <p className="text-[11px] font-mono text-white/60">
                    Sri Mittapalli College of Engg. | CSE Department
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1 font-mono text-[10px] text-white/40">
                    <span>|||||||</span>
                    <span>||||||</span>
                    <span>|||||||||</span>
                    <span>||||</span>
                  </div>
                  <span className="font-mono text-xs text-white/70 font-semibold">ROLL: 24U91A05C8</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Narrative */}
          <div className="lg:col-span-7">
            <h2 className="font-syne text-6xl sm:text-8xl font-black text-black tracking-tighter leading-none mb-6">
              Hello!
            </h2>
            <p className="text-lg sm:text-2xl font-medium text-white leading-relaxed mb-6">
              I’m <span className="font-black text-black uppercase tracking-tight bg-white/20 px-2 py-0.5 rounded">SIVA BALAJI</span>, 
              a B.Tech 3rd Year Computer Science student at Sri Mittapalli College of Engineering and an aspiring Full Stack Developer.
            </p>
            <p className="text-white/95 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl">
              I build interactive, user-focused web applications with clean code, strong performance, and modern web standards. Eager to solve real-world problems and create engaging digital products.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md px-5 py-3 rounded-2xl hover:scale-105 transition-all shadow-lg border border-black/10">
                <span className="font-syne font-bold text-white">React.js</span>
                <span className="text-xs text-white/75 font-mono">Frontend</span>
              </div>
              <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md px-5 py-3 rounded-2xl hover:scale-105 transition-all shadow-lg border border-black/10">
                <span className="font-syne font-bold text-white">JavaScript &amp; Python</span>
                <span className="text-xs text-white/75 font-mono">Core Logic</span>
              </div>
              <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md px-5 py-3 rounded-2xl hover:scale-105 transition-all shadow-lg border border-black/10">
                <span className="font-syne font-bold text-white">Node.js</span>
                <span className="text-xs text-white/75 font-mono">Backend</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Torn-Paper SVG Divider */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 sm:h-24 text-[#111111] fill-current">
          <path d="M0,0 L25,42 L50,15 L75,55 L100,20 L135,48 L170,12 L205,58 L240,25 L280,50 L320,18 L360,54 L400,22 L440,60 L480,15 L520,52 L560,20 L600,58 L640,16 L680,48 L720,24 L760,62 L800,20 L840,55 L880,18 L920,48 L960,15 L1000,56 L1040,24 L1080,50 L1120,18 L1160,52 L1200,10 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}

// =============================================================================
// 5. Skills Section (Zero Java, Pure Web & Python Stack)
// =============================================================================
function SkillsSection() {
  const skillCategories = [
    {
      category: 'Frontend & UI Engineering',
      desc: 'Crafting responsive, accessible, and high-performance user interfaces',
      skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Tailwind CSS', 'DOM Manipulation', 'Responsive Web Design', 'CSS Grid & Flexbox']
    },
    {
      category: 'Programming & Backend',
      desc: 'Building robust algorithms, application logic, and RESTful APIs',
      skills: ['Python', 'Node.js', 'Express.js', 'REST APIs', 'LocalStorage API', 'JSON Data Modeling', 'Async & Promises']
    },
    {
      category: 'Developer Workflow & Tools',
      desc: 'Modern developer toolchain for rapid, version-controlled delivery',
      skills: ['Git', 'GitHub', 'VS Code', 'Browser DevTools', 'Command Line', 'Clean Architecture', 'Unit Testing Basics']
    }
  ];

  return (
    <section id="skills" className="bg-[#111111] text-white py-28 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-btn mb-4">
            <span className="w-2 h-2 rounded-full bg-[#FF2A2A]" />
            <span className="text-xs font-mono tracking-wider uppercase text-white/80">Technical Arsenal</span>
          </div>
          <h2 className="font-syne text-4xl sm:text-6xl font-black tracking-tight mb-4">
            Skills &amp; Technologies
          </h2>
          <p className="text-white/70 text-base sm:text-lg">
            A comprehensive foundation in modern web development and software engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((group, idx) => (
            <div key={idx} className="bg-zinc-900/70 border border-white/10 rounded-3xl p-8 hover:border-[#FF2A2A]/40 transition-colors">
              <span className="text-xs font-mono text-[#FF2A2A] tracking-widest uppercase block mb-2">0{idx + 1} / STACK</span>
              <h3 className="font-syne text-2xl font-bold mb-3">{group.category}</h3>
              <p className="text-xs text-white/60 mb-6 leading-relaxed">{group.desc}</p>
              
              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span key={skill} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// 6. Projects Gallery Section with Owner Edit / Delete
// =============================================================================
function ProjectsGallery({ projects, isOwner, onAddProject, onEditProject, onDeleteProject, onRequestDeleteProject }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Full Stack & AI', 'Cloud & SaaS', 'DevTools', 'E-Commerce', 'FinTech', 'Web Apps', 'Interactive Apps', 'Utilities', 'Games'];

  const filteredProjects = projects.filter((item) => {
    const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchSearch =
      searchTerm.trim() === '' ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.tags && item.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())));
    return matchCat && matchSearch;
  });

  return (
    <section id="projects" className="bg-[#111111] text-white py-28 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Header with Owner "+ Add Project" button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-btn mb-4">
              <span className="w-2 h-2 rounded-full bg-[#FF2A2A]" />
              <span className="text-xs font-mono tracking-wider uppercase text-white/80">Portfolio Showcase</span>
            </div>
            <h2 className="font-syne text-4xl sm:text-6xl font-black tracking-tight">
              Featured Projects
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onAddProject}
              className="bg-[#FF2A2A] hover:bg-[#E01E1E] text-white font-mono font-bold text-xs px-5 py-3 rounded-full flex items-center gap-2 shadow-lg hover:scale-105 transition-all cursor-pointer border border-[#FF2A2A]"
              title={isOwner ? "Add New Project" : "Owner Verification Required: Only Siva Balaji can add projects"}
            >
              <span>📁 + Add New Project</span>
              {!isOwner && <span className="text-[10px] opacity-75">🔒</span>}
            </button>
            <span className="text-xs font-mono text-white/60 bg-zinc-900 border border-white/10 px-4 py-2 rounded-full">
              {filteredProjects.length} Projects
            </span>
          </div>
        </div>

        {/* Filter Toolbar: Search & Categories */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 bg-zinc-900/60 p-3 rounded-2xl border border-white/10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#FF2A2A] text-white font-bold shadow-md'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="w-full sm:w-72">
            <input
              type="text"
              placeholder="Search projects by name or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#FF2A2A]"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="gallery-card flex flex-col justify-between group relative">
              
              {/* Project Action Badges: Edit (when Owner) + Delete (Access with PIN) */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                {isOwner && (
                  <button
                    onClick={() => onEditProject(project)}
                    className="owner-action-badge text-amber-300 flex items-center gap-1 bg-black/70 border border-amber-400/40 px-2.5 py-1 rounded-full text-xs font-mono font-bold hover:bg-amber-950/80 cursor-pointer shadow-lg"
                    title="Edit Project"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9"></path>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                    <span>Edit</span>
                  </button>
                )}
                <button
                  onClick={() => onRequestDeleteProject ? onRequestDeleteProject(project.id) : onDeleteProject(project.id)}
                  className="owner-action-badge text-red-300 bg-red-950/90 border border-red-500/60 hover:bg-red-900 px-2.5 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105 cursor-pointer backdrop-blur-md"
                  title={isOwner ? "Delete Project" : "Owner Verification Required to Delete (Balaji@1)"}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  <span>Delete</span>
                  {!isOwner && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  )}
                </button>
              </div>

              {/* Thumbnail Image */}
              <div className="relative h-52 w-full overflow-hidden bg-zinc-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80";
                  }}
                />
                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-[#FF2A2A]">
                  {project.category}
                </div>
              </div>

              {/* Details Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-syne text-xl font-bold mb-2 group-hover:text-[#FF2A2A] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-white/70 mb-4 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags && project.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-white/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Links */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <a
                    href={project.demoUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono font-semibold text-[#FF2A2A] hover:underline"
                  >
                    Live Preview &rarr;
                  </a>
                  <a
                    href={project.githubUrl || 'https://github.com/kurangisivabalaji-glitch/dom-and-es6.git'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-white/60 hover:text-white"
                  >
                    GitHub Repo
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 bg-zinc-900/40 rounded-3xl border border-white/10">
            <p className="text-white/60 text-sm font-mono">No projects found matching your search criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="mt-4 text-xs font-mono text-[#FF2A2A] underline underline-offset-4"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

// =============================================================================
// 7. Certificates Gallery Section with Lightbox & Owner Controls
// =============================================================================
function CertificatesGallery({ certificates, isOwner, onAddCertificate, onEditCertificate, onDeleteCertificate, onRequestDeleteCertificate, onOpenLightbox }) {
  return (
    <section id="certificates" className="bg-[#111111] text-white py-28 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-btn mb-4">
              <span className="w-2 h-2 rounded-full bg-[#FF2A2A]" />
              <span className="text-xs font-mono tracking-wider uppercase text-white/80">Verified Credentials</span>
            </div>
            <h2 className="font-syne text-4xl sm:text-6xl font-black tracking-tight">
              Certificates &amp; Achievements
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onAddCertificate}
              className="bg-[#FF2A2A] hover:bg-[#E01E1E] text-white font-mono font-bold text-xs px-5 py-3 rounded-full flex items-center gap-2 shadow-lg hover:scale-105 transition-all cursor-pointer border border-[#FF2A2A]"
              title={isOwner ? "Add New Certificate" : "Owner Verification Required: Only Siva Balaji can add certificates"}
            >
              <span>+ Add Certificate</span>
              {!isOwner && <span className="text-[10px] opacity-75">ðŸ”’</span>}
            </button>
            <span className="text-xs font-mono text-white/60 bg-zinc-900 border border-white/10 px-4 py-2 rounded-full">
              {certificates.length} Credentials
            </span>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <div key={cert.id} className="gallery-card relative group flex flex-col justify-between">
              
              {/* Certificate Action Badges: Edit (when Owner) + Delete (Access with PIN) */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                {isOwner && (
                  <button
                    onClick={() => onEditCertificate(cert)}
                    className="owner-action-badge text-amber-300 flex items-center gap-1 bg-black/70 border border-amber-400/40 px-2.5 py-1 rounded-full text-xs font-mono font-bold hover:bg-amber-950/80 cursor-pointer shadow-lg"
                    title="Edit Certificate"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9"></path>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                    <span>Edit</span>
                  </button>
                )}
                <button
                  onClick={() => onRequestDeleteCertificate ? onRequestDeleteCertificate(cert.id) : onDeleteCertificate(cert.id)}
                  className="owner-action-badge text-red-300 bg-red-950/90 border border-red-500/60 hover:bg-red-900 px-2.5 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105 cursor-pointer backdrop-blur-md"
                  title={isOwner ? "Delete Certificate" : "Owner Verification Required to Delete (Balaji@1)"}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  <span>Delete</span>
                  {!isOwner && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  )}
                </button>
              </div>

              {/* Certificate Image / Thumbnail */}
              <div
                onClick={() => onOpenLightbox(index)}
                className="relative h-56 w-full overflow-hidden bg-zinc-900 cursor-pointer"
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-[#FF2A2A] text-white text-xs font-mono px-4 py-2 rounded-full font-bold shadow-xl">
                    🔍 View Certificate
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-[#FF2A2A] font-semibold">{cert.issuer}</span>
                    <span className="text-xs font-mono text-white/50">{cert.date}</span>
                  </div>
                  <h3 className="font-syne text-lg font-bold mb-3">{cert.title}</h3>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cert.skills && cert.skills.map((s) => (
                      <span key={s} className="text-[10px] font-mono bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full text-white/80">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenLightbox(index)}
                  className="text-xs font-mono text-white/70 hover:text-[#FF2A2A] text-left pt-3 border-t border-white/10"
                >
                  Inspect Certificate Details →
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// =============================================================================
// 8. "How I Work" / Process Timeline Section
// =============================================================================
function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(1);

  const processCards = [
    {
      id: 1,
      num: '01',
      title: 'Define',
      rotation: 'rotate-cw',
      desc: 'Understanding core project requirements, user needs, functional architecture, and technical deliverables.',
    },
    {
      id: 2,
      num: '02',
      title: 'Design',
      rotation: 'rotate-ccw',
      desc: 'Crafting responsive layouts, intuitive UI interactions, and mobile-friendly component hierarchies.',
    },
    {
      id: 3,
      num: '03',
      title: 'Build',
      rotation: 'rotate-cw',
      desc: 'Writing clean, modular, and well-commented code using HTML, CSS, JavaScript, React, and backend services.',
    },
    {
      id: 4,
      num: '04',
      title: 'Launch',
      rotation: 'rotate-ccw',
      desc: 'Testing across browsers and screen sizes, optimizing load speed, and deploying production-ready applications.',
    },
  ];

  return (
    <section id="process" className="process-grid-bg text-black py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        <div className="max-w-3xl mb-20 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-300 bg-white shadow-sm mb-5">
            <span className="w-2 h-2 rounded-full bg-[#FF2A2A]" />
            <span className="text-xs font-mono font-semibold tracking-wider uppercase text-gray-700">How I work</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <h2 className="font-syne text-4xl sm:text-6xl font-extrabold text-black tracking-tight leading-[1.08]">
              Let me show you how I build web projects to new heights
            </h2>
            <div className="hidden lg:block flex-shrink-0 text-[#FF2A2A]">
              <svg width="64" height="64" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M10 80 Q 45 10, 85 40" strokeLinecap="round" strokeDasharray="4 4" />
                <path d="M70 28 L 88 42 L 75 58" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <p className="text-gray-600 text-base sm:text-lg mt-4 max-w-2xl leading-relaxed">
            Every web application is developed through structured milestones. Click any card below to explore my workflow pipeline.
          </p>
        </div>

        <div className="relative my-12 min-h-[900px] flex flex-col justify-between">
          <div className="absolute inset-0 w-full h-full pointer-events-none hidden md:block">
            <svg className="w-full h-full" viewBox="0 0 1000 900" fill="none" preserveAspectRatio="none">
              <path
                d="M 680 80 C 850 200, 150 220, 280 360 C 400 480, 820 480, 720 620 C 620 760, 180 750, 320 860"
                stroke="#111111"
                strokeWidth="3.5"
                strokeDasharray="9 9"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12 relative z-10">
            {processCards.map((card, i) => (
              <div
                key={card.id}
                className={`${i % 2 === 1 ? 'md:col-start-1 flex justify-end md:pr-12' : 'md:col-start-2 flex justify-start md:pl-12'}`}
              >
                <div
                  onClick={() => setActiveStep(card.id)}
                  className={`process-tag-card ${card.rotation} w-full max-w-md p-8 ${activeStep === card.id ? 'active-card' : ''}`}
                >
                  <div className="tag-hole mb-4" />
                  <div className="flex items-center justify-between mb-3">
                    <span className="tag-num font-serif italic text-3xl font-bold text-gray-300">{card.num}</span>
                    <span className="text-xs font-mono uppercase tracking-widest opacity-60">PHASE {card.num}</span>
                  </div>
                  <h3 className="tag-title font-syne text-3xl font-bold mb-3 text-black">{card.title}</h3>
                  <p className="tag-desc text-gray-600 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="font-hand text-3xl sm:text-4xl text-[#FF2A2A] transform -rotate-3 inline-block font-bold">
            Ready to be delivered! ✨
          </p>
        </div>

      </div>
    </section>
  );
}

// =============================================================================
// 9. Dedicated Contacts Section & Interactive Message Form
// =============================================================================
function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [cloudSaved, setCloudSaved] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSending(true);
    let firestoreSuccess = false;
    try {
      firestoreSuccess = await FirestoreService.saveMessage({
        name: formState.name,
        email: formState.email,
        subject: formState.subject || 'Portfolio Inquiry from ' + formState.name,
        message: formState.message
      });
    } catch (err) {
      console.warn('Firestore message save error:', err);
    }
    setIsSending(false);
    setCloudSaved(firestoreSuccess);

    // Create prefilled mailto link
    const mailto = `mailto:kurangisivabalaji@gmail.com?subject=${encodeURIComponent(
      formState.subject || 'Portfolio Inquiry from ' + formState.name
    )}&body=${encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    )}`;

    window.location.href = mailto;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="bg-[#111111] text-white py-28 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-btn mb-4">
            <span className="w-2 h-2 rounded-full bg-[#FF2A2A]" />
            <span className="text-xs font-mono tracking-wider uppercase text-white/80">Get In Touch</span>
          </div>
          <h2 className="font-syne text-4xl sm:text-6xl font-black tracking-tight mb-4">
            Let's Build Something Exceptional
          </h2>
          <p className="text-white/70 text-base sm:text-lg">
            Have a project in mind, a developer opening, or want to say hello? Reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Direct Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <a
              href="mailto:kurangisivabalaji@gmail.com"
              className="block bg-zinc-900/80 border border-white/10 rounded-2xl p-6 hover:border-[#FF2A2A] transition-all group"
            >
              <span className="text-xs font-mono text-[#FF2A2A] uppercase block mb-1">Direct Email</span>
              <p className="font-syne text-xl font-bold group-hover:text-[#FF2A2A] transition-colors">
                kurangisivabalaji@gmail.com
              </p>
              <span className="text-xs font-mono text-white/50 mt-2 block">Click to compose email →</span>
            </a>

            {/* Phone / WhatsApp Card */}
            <a
              href="tel:+918125616811"
              className="block bg-zinc-900/80 border border-white/10 rounded-2xl p-6 hover:border-[#FF2A2A] transition-all group"
            >
              <span className="text-xs font-mono text-[#FF2A2A] uppercase block mb-1">Phone &amp; WhatsApp</span>
              <p className="font-syne text-xl font-bold group-hover:text-[#FF2A2A] transition-colors">
                +91 81256 16811
              </p>
              <span className="text-xs font-mono text-white/50 mt-2 block">Direct call or WhatsApp chat →</span>
            </a>

            {/* Social Channels */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href="https://linkedin.com/in/sivabalaji-kurangi-3aaa64356"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-900/80 border border-white/10 rounded-2xl p-5 hover:border-white transition-all text-center"
              >
                <span className="text-xs font-mono text-white/60 block mb-1">LinkedIn</span>
                <span className="font-bold text-sm">sivabalaji-kurangi</span>
              </a>

              <a
                href="https://github.com/kurangisivabalaji-glitch/dom-and-es6.git"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-900/80 border border-white/10 rounded-2xl p-5 hover:border-white transition-all text-center"
              >
                <span className="text-xs font-mono text-white/60 block mb-1">GitHub</span>
                <span className="font-bold text-sm">dom-and-es6</span>
              </a>
            </div>

            {/* Location Notice & Firestore Live Status */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono text-white/70">
                  Location: Andhra Pradesh, India &bull; Open for Remote &amp; On-Site
                </span>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-xs font-mono text-white/60">
                  Database: <span className="text-amber-400 font-semibold">Google Firebase Firestore</span> (portfolio-d7827)
                </span>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7 bg-zinc-900/80 border border-white/10 rounded-3xl p-8 sm:p-10">
            <h3 className="font-syne text-2xl font-bold mb-6">Send a Quick Message</h3>

            {submitted ? (
              <div className="bg-emerald-950/60 border border-emerald-500/50 rounded-2xl p-6 text-center animate-fade-in">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mb-2 font-bold text-lg">
                  &#10003;
                </div>
                <p className="text-emerald-300 font-bold mb-1">Message Sent &amp; Recorded! &#10024;</p>
                <p className="text-xs text-emerald-200/80 font-mono mb-2">
                  {cloudSaved
                    ? 'Cloud Firestore: Message saved to database (portfolio-d7827) & opened in mail client.'
                    : 'Opened in your email client.'}
                </p>
                <p className="text-[11px] text-white/50">
                  Thank you for reaching out, Siva Balaji will get back to you promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Alex Smith"
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FF2A2A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-1.5">Your Email *</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="alex@example.com"
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FF2A2A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1.5">Subject</label>
                  <input
                    type="text"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="Project Inquiry / Job Opportunity"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FF2A2A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1.5">Message *</label>
                  <textarea
                    required
                    rows="4"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your project or requirement..."
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FF2A2A]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#FF2A2A] hover:bg-[#E01E1E] text-white font-bold py-4 rounded-xl text-sm transition-all shadow-lg hover:shadow-red-500/25"
                >
                  Send Message via Email
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}

// =============================================================================
// 10. Lightbox Modal for Certificates
// =============================================================================
function CertificateLightbox({ certificates, activeIndex, onClose, onPrev, onNext }) {
  const [zoom, setZoom] = useState(1);
  const cert = certificates[activeIndex];

  useEffect(() => {
    setZoom(1);
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, onClose, onPrev, onNext]);

  if (!cert) return null;

  return (
    <div className="modal-overlay-luxury" onClick={onClose}>
      <div
        className="modal-content-luxury max-w-4xl p-6 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Toolbar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div>
            <span className="text-xs font-mono text-[#FF2A2A]">{cert.issuer}</span>
            <h3 className="font-syne text-xl font-bold">{cert.title}</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom(Math.min(zoom + 0.25, 2))}
              className="bg-zinc-800 text-white px-2.5 py-1 rounded text-xs hover:bg-zinc-700"
              title="Zoom In"
            >
              🔍 +
            </button>
            <button
              onClick={() => setZoom(Math.max(zoom - 0.25, 0.75))}
              className="bg-zinc-800 text-white px-2.5 py-1 rounded text-xs hover:bg-zinc-700"
              title="Zoom Out"
            >
              🔍 -
            </button>
            <button
              onClick={() => setZoom(1)}
              className="bg-zinc-800 text-white px-2.5 py-1 rounded text-xs hover:bg-zinc-700"
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className="bg-red-600/80 text-white px-3 py-1 rounded text-xs hover:bg-red-600 ml-2"
            >
              ✕ Close
            </button>
          </div>
        </div>

        {/* Certificate Display Area with Zoom */}
        <div className="relative overflow-hidden rounded-2xl bg-black min-h-[400px] flex items-center justify-center p-4">
          <img
            src={cert.image}
            alt={cert.title}
            style={{ transform: `scale(${zoom})`, transition: 'transform 0.2s ease' }}
            className="max-h-[65vh] object-contain rounded-lg shadow-2xl"
          />

          {/* Prev / Next Controls */}
          {certificates.length > 1 && (
            <>
              <button
                onClick={onPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/75 hover:bg-[#FF2A2A] text-white w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors shadow-xl"
              >
                ◀
              </button>
              <button
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/75 hover:bg-[#FF2A2A] text-white w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors shadow-xl"
              >
                ▶
              </button>
            </>
          )}
        </div>

        {/* Footer Meta */}
        <div className="flex items-center justify-between pt-4 mt-2 text-xs font-mono text-white/60">
          <span>{activeIndex + 1} of {certificates.length}</span>
          <a
            href={cert.image}
            download={`${cert.title}.jpg`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF2A2A] hover:underline"
          >
            📥 Open / Download Full Resolution
          </a>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// 10. Quick Add Selection Modal for Siva Balaji (Single Add Action)
// =============================================================================
function QuickAddModal({ onClose, onSelectProject, onSelectCertificate }) {
  return (
    <div className="modal-overlay-luxury" onClick={onClose}>
      <div
        className="modal-content-luxury max-w-md p-6 sm:p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#FF2A2A]/10 border border-[#FF2A2A]/30 flex items-center justify-center text-2xl">
          ✨
        </div>
        <h3 className="font-syne text-xl font-bold mb-2 text-white">
          Add to Portfolio
        </h3>
        <p className="text-xs text-white/60 mb-6 leading-relaxed">
          Welcome Siva Balaji. What would you like to add to your portfolio?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={onSelectProject}
            className="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl bg-zinc-900 border border-white/15 hover:border-[#FF2A2A] hover:bg-[#FF2A2A]/10 transition-all text-white group cursor-pointer"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform">📁</span>
            <span className="font-syne font-bold text-sm">Add Project</span>
            <span className="text-[11px] text-white/50 font-mono">Upload project preview, tech stack, and links</span>
          </button>

          <button
            type="button"
            onClick={onSelectCertificate}
            className="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl bg-zinc-900 border border-white/15 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all text-white group cursor-pointer"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform">📜</span>
            <span className="font-syne font-bold text-sm">Add Certificate</span>
            <span className="text-[11px] text-white/50 font-mono">Upload certificate image/PDF and issue details</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-xs font-mono text-white/50 hover:text-white transition-colors cursor-pointer"
        >
          ✕ Cancel
        </button>
      </div>
    </div>
  );
}

// =============================================================================
// 11. Owner Access PIN Modal (Strictly Private for Siva Balaji - PIN: Balaji@1)
// =============================================================================
function OwnerPinModal({ onClose, onSuccess, targetAction }) {
  const [pin, setPin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const actionTitle = targetAction === 'add_project'
    ? '🔐 Owner Verification — Add Project'
    : targetAction === 'add_certificate'
    ? '🔐 Owner Verification — Add Certificate'
    : targetAction === 'add_content'
    ? '🔐 Owner Verification — Add Content'
    : '🔐 Owner Portal Access';

  const actionButtonText = targetAction === 'add_project'
    ? 'Verify & Add Project'
    : targetAction === 'add_certificate'
    ? 'Verify & Add Certificate'
    : targetAction === 'add_content'
    ? 'Verify & Continue'
    : 'Unlock Access';

  const handleVerify = (e) => {
    e.preventDefault();
    const storedPin = localStorage.getItem('balaji_owner_pin');
    const validPin = (storedPin && storedPin !== 'balaji2026') ? storedPin : 'Balaji@1';
    if (pin.trim() === validPin || pin.trim() === 'Balaji@1') {
      localStorage.setItem('balaji_owner_pin', 'Balaji@1');
      localStorage.setItem('balaji_owner_session', 'active');
      setError(false);
      onSuccess();
    } else {
      setError(true);
      setPin('');
    }
  };

  return (
    <div className="modal-overlay-luxury" onClick={onClose}>
      <div
        className="modal-content-luxury max-w-sm p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#FF2A2A]/10 border border-[#FF2A2A]/30 flex items-center justify-center text-2xl">
          🔒
        </div>
        <h3 className="font-syne text-xl font-bold mb-2 text-white">
          {actionTitle}
        </h3>
        <p className="text-xs text-white/60 mb-5 leading-relaxed">
          {targetAction === 'add_project' ? (
            <>Adding projects is restricted <span className="text-white font-semibold">exclusively to Siva Balaji</span>. Enter your private owner PIN to unlock and upload your project.</>
          ) : targetAction === 'add_certificate' ? (
            <>Adding certificates is restricted <span className="text-white font-semibold">exclusively to Siva Balaji</span>. Enter your private owner PIN to unlock and upload your certificate.</>
          ) : targetAction === 'add_content' ? (
            <>Adding content is restricted <span className="text-white font-semibold">exclusively to Siva Balaji</span>. Enter your owner PIN (<span className="text-[#FF2A2A] font-mono">Balaji@1</span>) to continue.</>
          ) : (
            <>Access is restricted <span className="text-white font-semibold">exclusively to Siva Balaji</span>. Enter your private owner PIN or password to unlock project and certificate management.</>
          )}
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              autoFocus
              placeholder="Enter Owner PIN / Password"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              className="w-full text-center bg-black/70 border border-white/20 rounded-xl py-3 pl-4 pr-11 text-white text-sm tracking-wider focus:outline-none focus:border-[#FF2A2A]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs font-mono cursor-pointer"
              title={showPassword ? 'Hide' : 'Show'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          {error && (
            <div className="bg-red-950/50 border border-red-500/40 rounded-lg p-2.5">
              <p className="text-xs text-red-400 font-mono">Access Denied: Incorrect PIN / Password.</p>
              <p className="text-[10px] text-white/50 mt-1">Only Siva Balaji is authorized to add projects &amp; certificates.</p>
            </div>
          )}

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2.5 rounded-xl bg-zinc-800 text-white/70 text-xs font-mono hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 py-2.5 rounded-xl bg-[#FF2A2A] text-white text-xs font-mono font-bold hover:bg-[#E01E1E] transition-colors shadow-lg cursor-pointer"
            >
              {actionButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Modal to allow Balaji to change his private PIN anytime
function ChangePinModal({ onClose }) {
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChangePin = (e) => {
    e.preventDefault();
    const storedPin = localStorage.getItem('balaji_owner_pin');
    const currentValidPin = (storedPin && storedPin !== 'balaji2026') ? storedPin : 'Balaji@1';
    if (currentPin.trim() !== currentValidPin && currentPin.trim() !== 'Balaji@1') {
      setError('Current PIN is incorrect.');
      return;
    }
    if (!newPin.trim() || newPin.length < 4) {
      setError('New PIN must be at least 4 characters.');
      return;
    }
    if (newPin !== confirmPin) {
      setError('New PINs do not match.');
      return;
    }

    localStorage.setItem('balaji_owner_pin', newPin.trim());
    setSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-overlay-luxury" onClick={onClose}>
      <div className="modal-content-luxury max-w-sm p-6 text-center" onClick={(e) => e.stopPropagation()}>
        <span className="text-3xl mb-2 block">🔑</span>
        <h3 className="font-syne text-xl font-bold mb-1">Change Owner PIN</h3>
        <p className="text-xs text-white/60 mb-4">Set your own private PIN to protect your portfolio privileges.</p>

        {success ? (
          <div className="bg-emerald-950/80 border border-emerald-500/50 p-4 rounded-xl text-emerald-300 text-xs font-mono">
            PIN updated successfully! ✨
          </div>
        ) : (
          <form onSubmit={handleChangePin} className="space-y-3">
            <input
              type="password"
              placeholder="Current PIN"
              value={currentPin}
              onChange={(e) => { setCurrentPin(e.target.value); setError(''); }}
              className="w-full text-center bg-black/70 border border-white/20 rounded-xl py-2.5 px-3 text-white text-sm focus:outline-none focus:border-[#FF2A2A]"
            />
            <input
              type="password"
              placeholder="New PIN"
              value={newPin}
              onChange={(e) => { setNewPin(e.target.value); setError(''); }}
              className="w-full text-center bg-black/70 border border-white/20 rounded-xl py-2.5 px-3 text-white text-sm focus:outline-none focus:border-[#FF2A2A]"
            />
            <input
              type="password"
              placeholder="Confirm New PIN"
              value={confirmPin}
              onChange={(e) => { setConfirmPin(e.target.value); setError(''); }}
              className="w-full text-center bg-black/70 border border-white/20 rounded-xl py-2.5 px-3 text-white text-sm focus:outline-none focus:border-[#FF2A2A]"
            />

            {error && <p className="text-xs text-[#FF2A2A] font-mono">{error}</p>}

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-2 rounded-xl bg-zinc-800 text-white/70 text-xs font-mono"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 py-2 rounded-xl bg-[#FF2A2A] text-white text-xs font-mono font-bold hover:bg-[#E01E1E]"
              >
                Save PIN
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// 12. Add / Edit Project Modal with File Upload
// =============================================================================
function ProjectFormModal({ project, onClose, onSave }) {
  const [title, setTitle] = useState(project ? project.title : '');
  const [category, setCategory] = useState(project ? project.category : 'Web Apps');
  const [description, setDescription] = useState(project ? project.description : '');
  const [tags, setTags] = useState(project ? (project.tags || []).join(', ') : '');
  const [image, setImage] = useState(project ? project.image : '');
  const [demoUrl, setDemoUrl] = useState(project ? project.demoUrl : '');
  const [githubUrl, setGithubUrl] = useState(project ? project.githubUrl : '');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      id: project ? project.id : 'p-' + Date.now(),
      title,
      category,
      description,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      image: image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
      demoUrl,
      githubUrl
    });
  };

  return (
    <div className="modal-overlay-luxury" onClick={onClose}>
      <div className="modal-content-luxury max-w-lg p-6 sm:p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-5">
          <h3 className="font-syne text-xl font-bold">
            {project ? '✏️ Edit Project' : '+ Add New Project'}
          </h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-white/70 mb-1">Project Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. E-Commerce Platform"
              className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF2A2A]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-white/70 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF2A2A]"
              >
                <option value="Web Apps">Web Apps</option>
                <option value="Interactive Apps">Interactive Apps</option>
                <option value="Utilities">Utilities</option>
                <option value="Games">Games</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono text-white/70 mb-1">Tech Stack (comma separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="React, Node, CSS"
                className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF2A2A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-white/70 mb-1">Description</label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of key features and architecture..."
              className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#FF2A2A]"
            />
          </div>

          {/* Image Upload or URL with Quick Presets */}
          <div>
            <label className="block text-xs font-mono text-white/70 mb-1">
              Project Screenshot / Illustration *
            </label>
            <div className="space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="w-full text-xs font-mono text-white/70 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#FF2A2A] file:text-white hover:file:bg-[#E01E1E] cursor-pointer"
              />
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Or enter Image URL / Asset Path (e.g. assets/projects/calculator.svg)"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#FF2A2A]"
                />
                {image && (
                  <button
                    type="button"
                    onClick={() => setImage('')}
                    className="text-xs font-mono text-red-400 hover:text-red-300 px-2 py-1 bg-red-950/40 rounded-lg whitespace-nowrap"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-mono text-white/50">Presets:</span>
                {[
                  { label: 'Calculator', path: 'assets/projects/calculator.svg' },
                  { label: 'Quiz', path: 'assets/projects/quiz.svg' },
                  { label: 'Puzzle', path: 'assets/projects/puzzle.svg' },
                  { label: 'Weather', path: 'assets/projects/weather.svg' },
                  { label: 'Todo', path: 'assets/projects/todo.svg' },
                  { label: 'Login', path: 'assets/projects/login.svg' },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setImage(item.path)}
                    className="text-[10px] font-mono bg-white/5 hover:bg-white/15 border border-white/10 px-2 py-0.5 rounded text-white/80"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {image && (
              <div className="mt-3 relative h-28 w-44 rounded-xl overflow-hidden border border-white/20 bg-zinc-900 shadow-md">
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
                <span className="absolute bottom-1 right-1 text-[9px] font-mono bg-black/80 text-emerald-400 px-1.5 py-0.5 rounded">
                  ✓ Preview Ready
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-white/70 mb-1">Live Demo URL</label>
              <input
                type="text"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#FF2A2A]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-white/70 mb-1">GitHub Repo URL</label>
              <input
                type="text"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#FF2A2A]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl bg-zinc-800 text-white/70 text-xs font-mono hover:bg-zinc-700">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#FF2A2A] text-white text-xs font-mono font-bold hover:bg-[#E01E1E] shadow-lg">
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// =============================================================================
// 13. Add / Edit Certificate Modal with File Upload
// =============================================================================
function CertificateFormModal({ cert, onClose, onSave }) {
  const [title, setTitle] = useState(cert ? cert.title : '');
  const [issuer, setIssuer] = useState(cert ? cert.issuer : 'Sri Mittapalli College of Engineering');
  const [date, setDate] = useState(cert ? cert.date : '2026');
  const [skills, setSkills] = useState(cert ? (cert.skills || []).join(', ') : '');
  const [image, setImage] = useState(cert ? cert.image : '');
  const [credentialUrl, setCredentialUrl] = useState(cert ? (cert.credentialUrl || '') : '');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      id: cert ? cert.id : 'c-' + Date.now(),
      title,
      issuer,
      date,
      skills: skills.split(',').map((s) => s.trim()).filter(Boolean),
      image: image || 'assets/certificates/cert-web-dev.svg',
      credentialUrl
    });
  };

  return (
    <div className="modal-overlay-luxury" onClick={onClose}>
      <div className="modal-content-luxury max-w-lg p-6 sm:p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-5">
          <h3 className="font-syne text-xl font-bold">
            {cert ? '✏️ Edit Certificate' : '+ Add Certificate'}
          </h3>
          <button onClick={onClose} className="text-white/60 hover:text-white text-lg">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-white/70 mb-1">Certificate Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Full Stack Web Development Certification"
              className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF2A2A]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-white/70 mb-1">Issuing Authority / College</label>
              <input
                type="text"
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                placeholder="Sri Mittapalli College of Engg"
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF2A2A]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-white/70 mb-1">Issue Date / Year</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="2026"
                className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF2A2A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-white/70 mb-1">Skill Highlights (comma separated)</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="HTML5, CSS3, JavaScript ES6, Python"
              className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#FF2A2A]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-white/70 mb-1">Credential URL / Verification ID (optional)</label>
            <input
              type="text"
              value={credentialUrl}
              onChange={(e) => setCredentialUrl(e.target.value)}
              placeholder="https://coursera.org/verify/... or ID"
              className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#FF2A2A]"
            />
          </div>

          {/* Certificate File Upload with Presets */}
          <div>
            <label className="block text-xs font-mono text-white/70 mb-1">
              Certificate Image File (PNG, JPG, WebP, SVG) *
            </label>
            <div className="space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="w-full text-xs font-mono text-white/70 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#FF2A2A] file:text-white hover:file:bg-[#E01E1E] cursor-pointer"
              />
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Or enter Certificate URL / Asset Path (e.g. assets/certificates/cert-web-dev.svg)"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#FF2A2A]"
                />
                {image && (
                  <button
                    type="button"
                    onClick={() => setImage('')}
                    className="text-xs font-mono text-red-400 hover:text-red-300 px-2 py-1 bg-red-950/40 rounded-lg whitespace-nowrap"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-mono text-white/50">Presets:</span>
                {[
                  { label: 'Web Dev Cert', path: 'assets/certificates/cert-web-dev.svg' },
                  { label: 'Python Cert', path: 'assets/certificates/cert-python.svg' },
                  { label: 'Frontend UI Cert', path: 'assets/certificates/cert-frontend.svg' },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setImage(item.path)}
                    className="text-[10px] font-mono bg-white/5 hover:bg-white/15 border border-white/10 px-2 py-0.5 rounded text-white/80"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {image && (
              <div className="mt-3 relative h-28 w-44 rounded-xl overflow-hidden border border-white/20 bg-zinc-900 shadow-md">
                <img src={image} alt="Certificate Preview" className="w-full h-full object-cover" />
                <span className="absolute bottom-1 right-1 text-[9px] font-mono bg-black/80 text-emerald-400 px-1.5 py-0.5 rounded">
                  ✓ Certificate Loaded
                </span>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl bg-zinc-800 text-white/70 text-xs font-mono hover:bg-zinc-700">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#FF2A2A] text-white text-xs font-mono font-bold hover:bg-[#E01E1E] shadow-lg">
              Save Certificate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// =============================================================================
// 14. Luxury Editorial Footer
// =============================================================================
// =============================================================================
// 14. Luxury Editorial Footer
// =============================================================================
function Footer({ isOwner, onOpenOwnerModal, onLogOut }) {
  return (
    <footer className="bg-[#111111] text-[#F4F4F4] pt-24 pb-12 min-h-[50vh] flex flex-col justify-between border-t border-white/10">
      <div className="max-w-7xl w-full mx-auto px-6 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-16 border-b border-white/10">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-white/50 uppercase block mb-4">
              CAPABILITIES
            </span>
            <ul className="font-mono text-xs uppercase tracking-wider space-y-2 text-[#D4D4D4]">
              <li className="hover:text-white transition-colors">Web Development</li>
              <li className="hover:text-white transition-colors">React Frontend Architecture</li>
              <li className="hover:text-white transition-colors">Node.js &amp; Python Services</li>
              <li className="hover:text-white transition-colors">UI/UX &amp; Responsive Design</li>
            </ul>
          </div>

          <div className="md:text-center">
            <span className="text-[11px] font-mono tracking-widest text-white/50 uppercase block mb-4">
              EDUCATION &amp; FOCUS
            </span>
            <p className="font-syne text-xl font-bold text-white mb-2">B.Tech CSE Student</p>
            <p className="text-xs font-mono text-white/60 mb-2">Sri Mittapalli College of Engineering</p>
            <a
              href="https://github.com/kurangisivabalaji-glitch/dom-and-es6.git"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs font-mono uppercase tracking-wider text-[#FF2A2A] underline underline-offset-4 hover:text-white transition-colors"
            >
              View GitHub Repositories →
            </a>
          </div>

          <div className="md:text-right">
            <span className="text-[11px] font-mono tracking-widest text-white/50 uppercase block mb-4">
              AVAILABILITY
            </span>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-white mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Hire &amp; Roles</span>
            </div>
            <p className="text-xs font-mono text-white/60 mt-1">Andhra Pradesh, India</p>
            <a href="tel:+918125616811" className="block text-xs font-mono text-white/80 hover:text-[#FF2A2A] mt-2 transition-colors">
              📞 +91 81256 16811
            </a>
          </div>
        </div>

        <div className="py-16 text-center overflow-hidden">
          <h2 className="footer-hero-text font-syne text-[18vw] font-black leading-none text-[#242424] lowercase select-none cursor-default">
            balaji
          </h2>
        </div>

        <div className="pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-white/60 items-center">
          <div className="text-left font-mono">
            <p>© 2026 K. Lakshmi Siva Balaji. All rights reserved.</p>
            <p className="text-white/40 text-[11px] mt-0.5">Built with React &amp; Tailwind CSS</p>
          </div>

          <div className="sm:text-center">
            <a href="mailto:kurangisivabalaji@gmail.com" className="font-mono text-white/90 hover:text-[#FF2A2A] underline underline-offset-4 transition-colors text-sm">
              kurangisivabalaji@gmail.com
            </a>
          </div>

          <div className="sm:text-right flex items-center justify-start sm:justify-end gap-3 font-mono text-xs">
            <a href="https://linkedin.com/in/sivabalaji-kurangi-3aaa64356" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              LinkedIn
            </a>
            <span>•</span>
            <a href="https://github.com/kurangisivabalaji-glitch/dom-and-es6.git" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GitHub
            </a>
            <span>•</span>
            {isOwner ? (
              <button
                onClick={onLogOut}
                className="text-emerald-400 hover:text-red-400 font-bold transition-colors cursor-pointer"
                title="Lock Owner Mode"
              >
                🔑 Owner Active (Lock)
              </button>
            ) : (
              <button
                onClick={onOpenOwnerModal}
                className="text-white/40 hover:text-white transition-colors cursor-pointer"
                title="Owner Portal (Ctrl + Shift + A)"
              >
                🔒 Owner Access
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
}

// =============================================================================
// Master Application Component with Strict Owner Access & Persistence
// =============================================================================
function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  // Sync PIN to Balaji@1
  useEffect(() => {
    const existing = localStorage.getItem('balaji_owner_pin');
    if (!existing || existing === 'balaji2026') {
      localStorage.setItem('balaji_owner_pin', 'Balaji@1');
    }
  }, []);

  // STRICT PRIVATE OWNER ACCESS:
  // Default is false (guest/visitor mode). Only Siva Balaji can unlock editing privileges!
  const [isOwner, setIsOwner] = useState(() => {
    const saved = localStorage.getItem('balaji_owner_session');
    return saved === 'active';
  });
  const [showPinModal, setShowPinModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // 'add_project' | 'add_certificate' | 'add_content' | null
  const [showQuickAddMenu, setShowQuickAddMenu] = useState(false);
  const [showChangePinModal, setShowChangePinModal] = useState(false);

  // Projects State: initialized with SVG assets & sync
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('balaji_portfolio_projects');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Seamlessly upgrade legacy Unsplash images to authentic local SVG assets
          return parsed.map((p, idx) => {
            if (p.image && p.image.includes('unsplash.com') && DEFAULT_PROJECTS[idx]) {
              return { ...p, image: DEFAULT_PROJECTS[idx].image };
            }
            return p;
          });
        }
      }
    } catch (e) {}
    return DEFAULT_PROJECTS;
  });
  const [editingProject, setEditingProject] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);

  // Certificates State: initialized with SVG certificates & sync
  const [certificates, setCertificates] = useState(() => {
    try {
      const saved = localStorage.getItem('balaji_portfolio_certificates');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((c, idx) => {
            if (c.image && c.image.includes('unsplash.com') && DEFAULT_CERTIFICATES[idx]) {
              return { ...c, image: DEFAULT_CERTIFICATES[idx].image };
            }
            return c;
          });
        }
      }
    } catch (e) {}
    return DEFAULT_CERTIFICATES;
  });
  const [editingCert, setEditingCert] = useState(null);
  const [showCertModal, setShowCertModal] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [cloudSynced, setCloudSynced] = useState(false);

  // Save projects on change
  useEffect(() => {
    localStorage.setItem('balaji_portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  // Save certificates on change
  useEffect(() => {
    localStorage.setItem('balaji_portfolio_certificates', JSON.stringify(certificates));
  }, [certificates]);

  // Real-time Firestore sync for Projects & Certificates
  useEffect(() => {
    if (!FirestoreService.isAvailable()) return;

    const unsubProjects = FirestoreService.subscribeProjects(
      (remoteProjects, isEmpty) => {
        if (isEmpty) {
          // First time database setup: seed initial projects to Firestore
          FirestoreService.seedProjects(DEFAULT_PROJECTS);
          setCloudSynced(true);
        } else if (remoteProjects && remoteProjects.length > 0) {
          setProjects(remoteProjects);
          localStorage.setItem('balaji_portfolio_projects', JSON.stringify(remoteProjects));
          setCloudSynced(true);
        }
      },
      (err) => {
        console.warn('Firestore offline fallback for projects:', err);
      }
    );

    const unsubCerts = FirestoreService.subscribeCertificates(
      (remoteCerts, isEmpty) => {
        if (isEmpty) {
          FirestoreService.seedCertificates(DEFAULT_CERTIFICATES);
          setCloudSynced(true);
        } else if (remoteCerts && remoteCerts.length > 0) {
          setCertificates(remoteCerts);
          localStorage.setItem('balaji_portfolio_certificates', JSON.stringify(remoteCerts));
          setCloudSynced(true);
        }
      },
      (err) => {
        console.warn('Firestore offline fallback for certificates:', err);
      }
    );

    return () => {
      unsubProjects();
      unsubCerts();
    };
  }, []);

  // Keyboard shortcut Ctrl + Shift + A for Owner Mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setPendingAction(null);
        setShowPinModal(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Dedicated Handlers for the 2 Add Buttons with Owner Protection
  const handleAddProjectClick = () => {
    if (isOwner) {
      setEditingProject(null);
      setShowProjectModal(true);
    } else {
      setPendingAction('add_project');
      setShowPinModal(true);
    }
  };

  const handleAddCertificateClick = () => {
    if (isOwner) {
      setEditingCert(null);
      setShowCertModal(true);
    } else {
      setPendingAction('add_certificate');
      setShowPinModal(true);
    }
  };

  const handleOpenAddMenu = () => {
    if (isOwner) {
      setShowQuickAddMenu(true);
    } else {
      setPendingAction('add_content');
      setShowPinModal(true);
    }
  };

  // Handlers for Projects (with Firestore Cloud Persistence)
  const handleSaveProject = (newProject) => {
    let updated;
    if (editingProject) {
      updated = projects.map((p) => (p.id === newProject.id ? newProject : p));
    } else {
      updated = [newProject, ...projects];
    }
    setProjects(updated);
    localStorage.setItem('balaji_portfolio_projects', JSON.stringify(updated));
    setShowProjectModal(false);
    setEditingProject(null);

    // Persist to Cloud Firestore
    FirestoreService.saveProject(newProject);
  };

  const handleRequestDeleteProject = (id) => {
    if (isOwner) {
      handleDeleteProject(id);
    } else {
      setPendingAction({ type: 'delete_project', id });
      setShowPinModal(true);
    }
  };

  const handleRequestDeleteCertificate = (id) => {
    if (isOwner) {
      handleDeleteCertificate(id);
    } else {
      setPendingAction({ type: 'delete_certificate', id });
      setShowPinModal(true);
    }
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updated = projects.filter((p) => p.id !== id);
      setProjects(updated);
      localStorage.setItem('balaji_portfolio_projects', JSON.stringify(updated));
      // Delete from Cloud Firestore
      FirestoreService.deleteProject(id);
    }
  };

  // Handlers for Certificates (with Firestore Cloud Persistence)
  const handleSaveCertificate = (newCert) => {
    let updated;
    if (editingCert) {
      updated = certificates.map((c) => (c.id === newCert.id ? newCert : c));
    } else {
      updated = [newCert, ...certificates];
    }
    setCertificates(updated);
    localStorage.setItem('balaji_portfolio_certificates', JSON.stringify(updated));
    setShowCertModal(false);
    setEditingCert(null);

    // Persist to Cloud Firestore
    FirestoreService.saveCertificate(newCert);
  };

  const handleDeleteCertificate = (id) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      const updated = certificates.filter((c) => c.id !== id);
      setCertificates(updated);
      localStorage.setItem('balaji_portfolio_certificates', JSON.stringify(updated));
      // Delete from Cloud Firestore
      FirestoreService.deleteCertificate(id);
    }
  };

  // Reset to default official assets & sync to Firestore
  const handleResetDefaults = () => {
    if (window.confirm('Reset all projects and certificates to Siva Balaji official portfolio assets & sync to Firestore?')) {
      setProjects(DEFAULT_PROJECTS);
      setCertificates(DEFAULT_CERTIFICATES);
      localStorage.setItem('balaji_portfolio_projects', JSON.stringify(DEFAULT_PROJECTS));
      localStorage.setItem('balaji_portfolio_certificates', JSON.stringify(DEFAULT_CERTIFICATES));
      // Sync to Cloud
      FirestoreService.seedProjects(DEFAULT_PROJECTS);
      FirestoreService.seedCertificates(DEFAULT_CERTIFICATES);
    }
  };

  // Force push current projects & certificates to Cloud Firestore
  const handleSyncToFirestore = async () => {
    try {
      await FirestoreService.seedProjects(projects);
      await FirestoreService.seedCertificates(certificates);
      alert('Successfully synced all ' + projects.length + ' projects & ' + certificates.length + ' certificates to Cloud Firestore (portfolio-d7827)!');
    } catch (e) {
      alert('Error syncing to Firestore: ' + e.message);
    }
  };

  // Backup JSON export
  const handleExportData = () => {
    const backupData = { projects, certificates, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sivabalaji_portfolio_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      {/* 1. Fullscreen Preloader */}
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}

      {/* Owner Mode Sticky Status Bar - ONLY VISIBLE TO AUTHENTICATED BALAJI */}
      {isOwner && (
        <div className="owner-bar px-6 py-2.5 flex flex-wrap items-center justify-between text-xs font-mono text-white gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-emerald-400">&#128081; Owner Mode Active: Siva Balaji</span>
            <span className="hidden sm:inline text-white/50">|</span>
            <span className="inline-flex items-center gap-1.5 text-[11px] bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
              &#128293; Firestore: portfolio-d7827 ({cloudSynced ? "Live Sync" : "Connected"})
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap mt-2 sm:mt-0">
            <button
              onClick={handleAddProjectClick}
              className="bg-[#FF2A2A] text-white px-3 py-1 rounded-full font-bold hover:scale-105 transition-transform cursor-pointer"
            >
              + Add Project
            </button>
            <button
              onClick={handleAddCertificateClick}
              className="bg-[#FF2A2A] text-white px-3 py-1 rounded-full font-bold hover:scale-105 transition-transform cursor-pointer"
            >
              + Add Certificate
            </button>
            <button
              onClick={handleSyncToFirestore}
              className="bg-amber-600 hover:bg-amber-500 text-white px-3 py-1 rounded-full font-bold hover:scale-105 transition-transform cursor-pointer flex items-center gap-1"
              title="Force sync all projects &amp; certificates to Cloud Firestore"
            >
              &#128293; Sync to Cloud
            </button>
            <button
              onClick={handleResetDefaults}
              className="bg-zinc-800 border border-white/20 text-white px-3 py-1 rounded-full hover:bg-zinc-700 cursor-pointer"
              title="Reset all projects and certificates to official assets"
            >
              🔄 Reset Assets
            </button>
            <button
              onClick={() => setShowChangePinModal(true)}
              className="bg-zinc-800 border border-white/20 text-white px-3 py-1 rounded-full hover:bg-zinc-700 cursor-pointer"
              title="Change your private owner PIN"
            >
              🔑 Change PIN
            </button>
            <button
              onClick={handleExportData}
              className="bg-zinc-700 text-white px-3 py-1 rounded-full hover:bg-zinc-600 cursor-pointer"
            >
              💾 Backup Data
            </button>
            <button
              onClick={() => {
                localStorage.setItem('balaji_owner_session', 'locked');
                setIsOwner(false);
              }}
              className="bg-zinc-900 border border-red-500/40 text-red-400 px-3 py-1 rounded-full hover:bg-red-950/80 cursor-pointer"
              title="Lock owner privileges"
            >
              🔒 Lock Mode
            </button>
          </div>
        </div>
      )}

      {/* 2. Floating Navbar with the 1 Primary Add Button */}
      <Navbar
        isOwner={isOwner}
        onOpenAddMenu={handleOpenAddMenu}
        onOpenOwnerModal={() => {
          setPendingAction(null);
          setShowPinModal(true);
        }}
        onLogOut={() => {
          localStorage.setItem('balaji_owner_session', 'locked');
          setIsOwner(false);
        }}
      />

      {/* 3. Fullscreen Hero Section with 70% Video Brightness */}
      <Hero />

      {/* 4. About Section */}
      <About />

      {/* 5. Skills Section */}
      <SkillsSection />

      {/* 6. Projects Gallery with + Add Project button */}
      <ProjectsGallery
        projects={projects}
        isOwner={isOwner}
        onAddProject={handleAddProjectClick}
        onEditProject={(proj) => {
          setEditingProject(proj);
          setShowProjectModal(true);
        }}
        onDeleteProject={handleDeleteProject}
        onRequestDeleteProject={handleRequestDeleteProject}
      />

      {/* 7. Certificates Gallery with + Add Certificate button */}
      <CertificatesGallery
        certificates={certificates}
        isOwner={isOwner}
        onAddCertificate={handleAddCertificateClick}
        onEditCertificate={(c) => {
          setEditingCert(c);
          setShowCertModal(true);
        }}
        onDeleteCertificate={handleDeleteCertificate}
        onRequestDeleteCertificate={handleRequestDeleteCertificate}
        onOpenLightbox={(idx) => setLightboxIndex(idx)}
      />

      {/* 8. Process Timeline */}
      <ProcessTimeline />

      {/* 9. Contact Section */}
      <ContactSection />

      {/* 10. Footer Section */}
      <Footer
        isOwner={isOwner}
        onOpenOwnerModal={() => {
          setPendingAction(null);
          setShowPinModal(true);
        }}
        onLogOut={() => {
          localStorage.setItem('balaji_owner_session', 'locked');
          setIsOwner(false);
        }}
      />

      {/* Quick Add Selection Modal for Siva Balaji */}
      {showQuickAddMenu && (
        <QuickAddModal
          onClose={() => setShowQuickAddMenu(false)}
          onSelectProject={() => {
            setShowQuickAddMenu(false);
            setEditingProject(null);
            setShowProjectModal(true);
          }}
          onSelectCertificate={() => {
            setShowQuickAddMenu(false);
            setEditingCert(null);
            setShowCertModal(true);
          }}
        />
      )}

      {/* Owner PIN Modal with targetAction support */}
      {showPinModal && (
        <OwnerPinModal
          targetAction={pendingAction}
          onClose={() => {
            setShowPinModal(false);
            setPendingAction(null);
          }}
          onSuccess={() => {
            setIsOwner(true);
            setShowPinModal(false);
            if (pendingAction === 'add_project') {
              setEditingProject(null);
              setShowProjectModal(true);
            } else if (pendingAction === 'add_certificate') {
              setEditingCert(null);
              setShowCertModal(true);
            } else if (pendingAction === 'add_content') {
              setShowQuickAddMenu(true);
            } else if (pendingAction && pendingAction.type === 'delete_project') {
              handleDeleteProject(pendingAction.id);
            } else if (pendingAction && pendingAction.type === 'delete_certificate') {
              handleDeleteCertificate(pendingAction.id);
            }
            setPendingAction(null);
          }}
        />
      )}

      {/* Change PIN Modal */}
      {showChangePinModal && (
        <ChangePinModal
          onClose={() => setShowChangePinModal(false)}
        />
      )}

      {/* Project Add / Edit Modal */}
      {showProjectModal && (
        <ProjectFormModal
          project={editingProject}
          onClose={() => {
            setShowProjectModal(false);
            setEditingProject(null);
          }}
          onSave={handleSaveProject}
        />
      )}

      {/* Certificate Add / Edit Modal */}
      {showCertModal && (
        <CertificateFormModal
          cert={editingCert}
          onClose={() => {
            setShowCertModal(false);
            setEditingCert(null);
          }}
          onSave={handleSaveCertificate}
        />
      )}

      {/* Certificate Lightbox Modal */}
      {lightboxIndex !== null && (
        <CertificateLightbox
          certificates={certificates}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + certificates.length) % certificates.length)}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % certificates.length)}
        />
      )}
    </div>
  );
}

// Mount the React Application into the DOM
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
