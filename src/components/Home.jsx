import React, { useEffect, useState, useRef } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const containerRef = useRef(null);
  const orbitFirstRef = useRef(null);
  const orbitSecondRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const calcTransform = () => {
    if (!isHovering || !containerRef.current) return 'rotateX(0deg) rotateY(0deg) scale(1)';
    const maxRotate = 15;
    const rect = containerRef.current.getBoundingClientRect();
    const normX = ((mousePos.x / rect.width) - 0.5) * 2;
    const normY = ((mousePos.y / rect.height) - 0.5) * 2;
    const rotateX = -normY * maxRotate;
    const rotateY = normX * maxRotate;
    return `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  // Orbit configs remain unchanged
  const orbitConfigs = [
    {
      ref: orbitFirstRef,
      radius: 140,
      icons: [
        { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', alt: 'HTML' },
        { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', alt: 'CSS' },
      ],
      reverse: false,
      duration: 30,
    },
    {
      ref: orbitSecondRef,
      radius: 200,
      icons: [
        { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', alt: 'JavaScript' },
        { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', alt: 'TypeScript' },
        { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', alt: 'Python' },
        { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', alt: 'Java' },
        { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', alt: 'PHP' },
      ],
      reverse: true,
      duration: 30,
    },
  ];

  useEffect(() => {
    orbitConfigs.forEach(({ ref, radius, icons, reverse, duration }) => {
      const container = ref.current;
      if (!container) return;

      container.style.width = container.style.height = `${radius * 2}px`;
      container.style.animationDuration = `${duration}s`;
      container.style.animationDirection = reverse ? 'reverse' : 'normal';
      container.style.transform = 'translate(-50%, -50%)';

      container.innerHTML = '';

      const iconCount = icons.length;

      icons.forEach((icon, index) => {
        const angle = (360 / iconCount) * index;
        const iconElement = document.createElement('img');
        iconElement.src = icon.src;
        iconElement.alt = icon.alt;
        iconElement.className = 'icon';

        const rad = angle * (Math.PI / 180);
        const x = radius + radius * Math.cos(rad) - 30; // center icons of 60px
        const y = radius + radius * Math.sin(rad) - 30;
        iconElement.style.left = `${x}px`;
        iconElement.style.top = `${y}px`;

        iconElement.style.animationDuration = `${duration}s`;
        iconElement.style.animationDirection = reverse ? 'normal' : 'reverse';

        iconElement.style.width = '60px';
        iconElement.style.height = '60px';
        iconElement.style.padding = '10px';

        container.appendChild(iconElement);
      });
    });
  }, []);

  return (
    <div
      className="home-container"
      style={{ backgroundColor: '#0d0d0d', minHeight: '100vh', color: 'white', paddingBottom: '60px' }}
    >
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="nav-title" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
          AI Codex
        </div>
        <div className="nav-links">
          <a onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>Home</a>
          <a onClick={() => navigate('/web-editor')} style={{ cursor: 'pointer' }}>Web Editor</a>
          <a onClick={() => navigate('/code-editor')} style={{ cursor: 'pointer' }}>Code Editor</a>
          <a onClick={() => navigate('/chatbot')} style={{ cursor: 'pointer' }}>Chatbot</a>
          <a
  href="https://vocal-cobbler-825494.netlify.app/"
  target="_blank"
  rel="noopener noreferrer"
  style={{
    color: '#ddd',
    textDecoration: 'none',
    fontWeight: '700',  // made bolder
    cursor: 'pointer',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontSize: '1.1rem',
    lineHeight: '1.6',
  }}
>
Explore Visualizer
</a>


        </div>
      </nav>

      <header className="header-section" style={{ paddingBottom: '30px' }}>
        <h1 className="main-title" style={{ fontSize: '4rem', fontWeight: '800' }}>AI Codex</h1>
        <p className="tagline" style={{ fontSize: '1.2rem', fontWeight: '500', color: '#ccc', textAlign: 'center' }}>
  <span style={{ display: 'inline' }}>
    Empower your coding journey with intelligent syntax highlighting,
  </span>
  <br />
  <span style={{ display: 'inline' }}>
    instant compilation, and AI-driven suggestions—all in one sleek editor.
  </span>
</p>

        {/* Buttons placed here */}
        <div className="button-group" style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '24px' }}>
          <button className="btn" onClick={() => navigate('/web-editor')} style={{ padding: '14px 36px', fontSize: '1.1rem' }}>
            Web Editor
          </button>
          <button className="btn" onClick={() => navigate('/code-editor')} style={{ padding: '14px 36px', fontSize: '1.1rem' }}>
            Code Editor
          </button>
        </div>
      </header>

     <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: 'white', lineHeight: '1.3' }}>
Create,Code & Compile Effortlessly</h1>




      {/* Container for SS + Orbit circles below buttons */}
      <div
        style={{
          marginTop: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '60px',
          flexWrap: 'wrap',
        }}
      >
        {/* Screenshot with tilt */}
        <div
          ref={containerRef}
          style={{ perspective: '1000px', flexShrink: 0, maxWidth: '900px', width: '100%' }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <img
            src="/ai codex ss.png"
            alt="AI Codex Screenshot"
            style={{
              maxWidth: '100%',
              width: '100%',
              height: 'auto',
              borderRadius: '16px',
              border: '6px solid #1e1e1e',
              backgroundColor: '#1a1a1a',
              padding: '12px',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
              objectFit: 'contain',
              transition: 'transform 0.15s ease-out',
              transform: calcTransform(),
              cursor: 'pointer',
              willChange: 'transform',
            }}
          />
        </div>

        {/* Orbiting circles container */}
        <div
          className="orbit-container"
          style={{
            position: 'relative',
            width: '400px',
            height: '400px',
            flexShrink: 0,
            userSelect: 'none',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontWeight: 700,
              fontSize: '1.4rem',
              textShadow: '0 0 10px rgba(255,255,255,0.4)',
              zIndex: 10,
              pointerEvents: 'none',
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            AI Codex
          </div>

          <div
            className="orbit-path first"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              border: '1.5px dashed rgba(255,255,255,0.3)',
              boxShadow: '0 0 8px rgba(255,255,255,0.1)',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          />
          <div
            className="orbit-path second"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              border: '1.5px dashed rgba(255,255,255,0.3)',
              boxShadow: '0 0 8px rgba(255,255,255,0.1)',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          />

          <div
            ref={orbitFirstRef}
            className="orbit orbit-first first"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationName: 'spin',
              animationDuration: '30s',
              animationDirection: 'normal',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          ></div>
          <div
            ref={orbitSecondRef}
            className="orbit orbit-second second"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationName: 'spin',
              animationDuration: '30s',
              animationDirection: 'reverse',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          ></div>
        </div>
      </div>

      {/* Feature boxes below SS + orbit */}
      <section
        className="features-section"
        style={{
          marginTop: '60px',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '30px',
          padding: '0 20px',
        }}
      >
        <section
  className="features-section"
  style={{
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '30px',
    marginTop: '80px', // Moved lower
  }}

    
>
  <div
  className="feature-box"
  onClick={() => navigate('/web-editor')}
  onMouseMove={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--x', `${x}px`);
    e.currentTarget.style.setProperty('--y', `${y}px`);
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.setProperty('--x', `-120px`);
    e.currentTarget.style.setProperty('--y', `-120px`);
  }}
  style={{
    cursor: 'pointer',
    flex: '1 1 320px',
    minWidth: '320px',
    maxWidth: '400px',
    padding: '30px',
    backgroundColor: '#1c1c1c',
    borderRadius: '16px',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    color: '#fff',
  }}
>
  <h3 style={{ fontSize: '1.6rem', fontWeight: '700', color: '#fff' }}>Real-time Syntax Highlighting</h3>
  <p style={{ fontSize: '1.1rem', color: '#ccc' }}>
    Write HTML, CSS, and JS with live preview and highlighting.
  </p>

  {/* Magic glow effect layers */}
  <div className="magic-layer color-layer" />
  <div className="magic-layer gradient-layer" />

  {/* Remove hover-overlay if not needed */}
</div>


  <div
  className="feature-box"
  onClick={() => navigate('/code-editor')}
  onMouseMove={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--x', `${x}px`);
    e.currentTarget.style.setProperty('--y', `${y}px`);
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.setProperty('--x', `-120px`);
    e.currentTarget.style.setProperty('--y', `-120px`);
  }}
  style={{
    cursor: 'pointer',
    flex: '1 1 320px',
    minWidth: '320px',
    maxWidth: '400px',
    padding: '30px',
    backgroundColor: '#1c1c1c',
    borderRadius: '16px',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    color: '#fff',
  }}
>
  <h3 style={{ fontSize: '1.6rem', fontWeight: '700', color: '#fff' }}>Multi-language Compiler</h3>
  <p style={{ fontSize: '1.1rem', color: '#ccc' }}>
    Run Java, Python, JS, and C++ directly in the browser.
  </p>

  {/* Magic effect layers */}
  <div className="magic-layer color-layer" />
  <div className="magic-layer gradient-layer" />

  {/* Remove hover-overlay div if unused */}
</div>


  <div
  className="feature-box"
  onClick={() => navigate('/chatbot')}
  onMouseMove={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--x', `${x}px`);
    e.currentTarget.style.setProperty('--y', `${y}px`);
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.setProperty('--x', `-120px`);
    e.currentTarget.style.setProperty('--y', `-120px`);
  }}
  style={{
    cursor: 'pointer',
    flex: '1 1 320px',
    minWidth: '320px',
    maxWidth: '400px',
    padding: '30px',
    backgroundColor: '#1c1c1c',
    borderRadius: '16px',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    color: '#fff',
  }}
>
  <h3 style={{ fontSize: '1.6rem', fontWeight: '700', color: '#fff' }}>AI Chat Assistant</h3>
  <p style={{ fontSize: '1.1rem', color: '#ccc' }}>
    Instant answers and code help with AI support.
  </p>

  {/* Magic glow effect layers */}
  <div className="magic-layer color-layer" />
  <div className="magic-layer gradient-layer" />

  {/* Remove hover-overlay if not needed */}
</div>

</section>


      </section>

      {/* Footer unchanged */}
   <footer
  style={{
    backgroundColor: '#111',
    color: '#ddd',
    padding: '60px 40px',
    marginTop: '80px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontSize: '1.1rem',
    lineHeight: '1.8',
    width: '100%',
    boxSizing: 'border-box',
    position: 'relative', // optional, for layering if needed
    left: 0,
    bottom: 0,
  }}
>
  <div
    style={{
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: '40px',
    }}
  >
    {/* Social Links */}
    <div style={{ flex: '1 1 250px' }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#0a66c2' }}>
        Connect with me
      </h3>
      <p style={{ marginBottom: '15px' }}>
        <a
          href="https://www.linkedin.com/in/sahaj-vaid-47582b292?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', fontWeight: '600' }}
        >
          LinkedIn
        </a>
      </p>
      <p>
        <a
          href="https://github.com/sahaj162"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#ddd', textDecoration: 'none', fontWeight: '600' }}
        >
          GitHub
        </a>
      </p>
    </div>

    {/* Navigation Links */}
    <div style={{ flex: '1 1 300px' }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#0a66c2' }}>
        Quick Links
      </h3>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <a
          href="/code-editor"
          style={{ color: '#ddd', textDecoration: 'none', fontWeight: '500' }}
        >
          Code Editor
        </a>
        <a
          href="/web-editor"
          style={{ color: '#ddd', textDecoration: 'none', fontWeight: '500' }}
        >
          Web Editor
        </a>
        <a
          href="/chatbot"
          style={{ color: '#ddd', textDecoration: 'none', fontWeight: '500' }}
        >
          Chatbot
        </a>
        <a href="/" style={{ color: '#ddd', textDecoration: 'none', fontWeight: '500' }}>
          Home
        </a>
      </nav>
    </div>

    {/* Copyright */}
    <div
      style={{
        flex: '1 1 300px',
        color: '#777',
        fontSize: '1rem',
        marginTop: '40px',
        lineHeight: '1.5',
      }}
    >
      <p>© {new Date().getFullYear()} AI Codex. All rights reserved.</p>
      <p style={{ marginTop: '12px', maxWidth: '320px' }}>
        Built with passion and dedication to code, creativity, and innovation.
      </p>
    </div>
  </div>
</footer>



      <style>{`
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes counter-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .icon {
          position: absolute;
          width: 60px;
          height: 60px;
          background: white;
          border-radius: 50%;
          padding: 10px;
          box-shadow: 0 0 10px rgba(255,255,255,0.4);
          object-fit: contain;
          animation-name: counter-spin;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default Home;
