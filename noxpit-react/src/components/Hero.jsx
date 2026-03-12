import { useEffect, useRef, useCallback } from 'react';
import { useCarousel, ACCENT_COLORS } from '../hooks/useCarousel';
import { XIcon } from './XIcon';

const slides = [
  {
    slideClass: 'slide-0',
    tag: 'Kategori Unggulan',
    titleAccent: 'Drivetrain',
    titleLine2: '',
    desc: 'Komponen drivetrain berkualitas tinggi untuk transfer tenaga optimal. Gear set, rantai, dan sprocket dengan material premium.',
    ghostLabel: 'Lihat Produk',
    stats: [{ num: '500+', label: 'Produk Tersedia' }, { num: 'OEM', label: 'Certified Quality' }, { num: '1 Yr', label: 'Garansi Resmi' }],
    badges: ['OEM Quality', 'Best Seller', '500+ Variants'],
    video: '/hero-gear-video.mp4',
  },
  {
    slideClass: 'slide-1',
    tag: 'Kategori Unggulan',
    titleAccent: 'Electrical',
    titleLine2: '',
    desc: 'Sistem kelistrikan motor lengkap. Stator, CDI, regulator, dan komponen elektrik dengan teknologi terkini.',
    ghostLabel: 'Lihat Produk',
    stats: [{ num: '300+', label: 'Produk Tersedia' }, { num: 'OEM', label: 'Certified Quality' }, { num: '2 Yr', label: 'Garansi Resmi' }],
    badges: ['Premium Grade', 'New Arrival', 'Top Rated'],
    video: '/hero-gear-video.mp4',
  },
  {
    slideClass: 'slide-2',
    tag: 'Kategori Unggulan',
    titleAccent: 'Engine',
    titleLine2: '',
    desc: 'Komponen mesin presisi tinggi. Cylinder block, piston, dan valve dengan material paduan aluminium terpilih.',
    ghostLabel: 'Lihat Produk',
    stats: [{ num: '400+', label: 'Produk Tersedia' }, { num: 'OEM', label: 'Certified Quality' }, { num: '2 Yr', label: 'Garansi Resmi' }],
    badges: ['Top Seller', 'Precision Fit', 'Engine Grade'],
    video: '/hero-gear-video.mp4',
  },
];

export default function Hero() {
  const { current, goTo, trackRef, progressRef, SLIDE_COUNT } = useCarousel();
  const videoRefs = useRef([]);

  const setVideoRef = useCallback((el, i) => {
    videoRefs.current[i] = el;
    if (el) {
      el.muted = true;
      el.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      video.muted = true;
      if (i === current) {
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [current]);

  return (
    <section className="hero" id="hero-carousel">
      <div className="noise" />
      <div className="carousel-track" ref={trackRef}>
        {slides.map((slide, i) => (
          <div key={i} className={`carousel-slide ${slide.slideClass}`}>
            <div className="slide-bg" />
            <div className="hero-x">
              <XIcon />
            </div>
            <div className="hero-content">
              <div className="hero-tag">{slide.tag}</div>
              <h1 className="hero-title">
                <span className="accent">{slide.titleAccent}</span>
                {slide.titleLine2 && <><br />{slide.titleLine2}</>}
              </h1>
              <p className="hero-desc">{slide.desc}</p>
              <div className="hero-tagline">Not just a part, it's an upgrade experience.</div>
              <div className="hero-actions">
                <a href="#products" className="btn-primary">Jelajahi Kategori</a>
                <a href="#products" className="btn-ghost">{slide.ghostLabel}</a>
              </div>
              <div className="hero-stats">
                {slide.stats.map((s, j) => (
                  <div className="stat" key={j}>
                    <div className="stat-num">{s.num}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-visual">
              <div className="video-showcase">
                <video
                  className="hero-video"
                  ref={(el) => setVideoRef(el, i)}
                  src={slide.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  onLoadedData={(e) => { e.target.muted = true; e.target.play().catch(() => {}); }}
                />
                <div className="video-overlay" />
                <div className="video-frame" />
                <div className="badge badge-1">{slide.badges[0]}</div>
                <div className="badge badge-2">{slide.badges[1]}</div>
                <div className="badge badge-3">{slide.badges[2]}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="carousel-controls">
        <div className="carousel-dots">
          {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
            <button
              key={i}
              className={`carousel-dot${current === i ? ' active' : ''}`}
              data-index={i}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <div className="carousel-arrows">
          <button className="carousel-arrow" onClick={() => goTo(current - 1)}>&#8592;</button>
          <button className="carousel-arrow" onClick={() => goTo(current + 1)}>&#8594;</button>
        </div>
      </div>

      <div className="carousel-counter">
        <span>{current + 1}</span> / {SLIDE_COUNT}
      </div>

      <div
        className="carousel-progress"
        ref={progressRef}
        style={{ background: ACCENT_COLORS[0] }}
      />
    </section>
  );
}
