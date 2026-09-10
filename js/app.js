// Eventurion Master Application Engine & Single-Page Sliding Router
// Interactive Historical Atlas of India

class EventurionApp {
  constructor() {
    this.selectedCivilizationId = 'maurya';
    this.selectedEventId = 'kalinga-war';
    this.activeYear = -261;
    this.activeFilter = 'all';
    this.searchQuery = '';
    
    this.mapEngine = null;
    this.timelineEngine = null;
    this.reconstructionStudio = null;

    this.init();
  }

  init() {
    this.initSinglePageScroll();
    this.initAsiaMap();
    this.initTimeline();
    this.initReconstruction();
    this.populateQuickPickers();
    this.bindSearchAndFilters();
    this.bindHeroAndTransitions();
    this.renderInitialViews();
  }

  // =========================================================================
  // SINGLE PAGE SLIDING & SCROLL SPY ENGINE
  // =========================================================================
  initSinglePageScroll() {
    // 1. Top Navbar Link Clicks
    document.querySelectorAll('.top-navbar .nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = link.getAttribute('data-nav');
        if (targetSection) {
          this.scrollToSection(targetSection);
        }
      });
    });

    // 2. Right-side Floating Slide Dots
    document.querySelectorAll('.slide-nav-dots .slide-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        const targetSection = dot.getAttribute('data-target');
        if (targetSection) {
          this.scrollToSection(targetSection);
        }
      });
    });

    // 3. Generic [data-route] elements
    document.querySelectorAll('[data-route]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const route = el.getAttribute('data-route');
        const civId = el.getAttribute('data-civ');
        const eventId = el.getAttribute('data-event');
        const siteId = el.getAttribute('data-site');
        this.navigate(route, { civId, eventId, siteId });
      });
    });

    // 4. IntersectionObserver for Continuous Scroll Spy (highlights active nav link and dot)
    const sections = document.querySelectorAll('.page-slide');
    if ('IntersectionObserver' in window && sections.length > 0) {
      const observerOptions = {
        root: null,
        rootMargin: '-25% 0px -45% 0px', // Trigger when section is in middle of viewport
        threshold: 0
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const currentId = entry.target.id;
            this.updateActiveNavState(currentId);
          }
        });
      }, observerOptions);

      sections.forEach(sec => observer.observe(sec));
    }
  }

  updateActiveNavState(sectionId) {
    // Update top navbar
    document.querySelectorAll('.top-navbar .nav-link').forEach(link => {
      const target = link.getAttribute('data-nav');
      link.classList.toggle('active', target === sectionId);
    });

    // Update floating dots
    document.querySelectorAll('.slide-nav-dots .slide-dot').forEach(dot => {
      const target = dot.getAttribute('data-target');
      dot.classList.toggle('active', target === sectionId);
    });
  }

  scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.updateActiveNavState(sectionId);
  }

  jumpToMapEra(year, civId) {
    if (civId) {
      this.selectedCivilizationId = civId;
      this.updateSelectedCivPanel(civId);
      this.updateCivPickerActive(civId);
      if (this.mapEngine) this.mapEngine.selectCivilization(civId);
    }
    this.setScrubberYear(year);
    document.querySelectorAll('.hero-era-chip').forEach(chip => {
      chip.classList.toggle('active', chip.getAttribute('onclick')?.includes(`'${civId}'`));
    });
    this.scrollToSection('section-map');
  }

  // Backwards compatibility and flexible routing helper
  navigate(route, params = {}) {
    if (route === 'home' || route === 'section-home') {
      this.scrollToSection('section-home');
    } else if (route === 'map' || route === 'section-map') {
      if (params.civId) {
        this.selectedCivilizationId = params.civId;
        this.updateSelectedCivPanel(params.civId);
        if (this.mapEngine) this.mapEngine.selectCivilization(params.civId);
      }
      if (params.year !== undefined) {
        this.setScrubberYear(params.year);
      }
      this.scrollToSection('section-map');
    } else if (route === 'timeline' || route === 'section-timeline') {
      this.scrollToSection('section-timeline');
    } else if (route === 'profile' || route === 'civilizations' || route === 'section-civilizations') {
      const civId = params.civId || this.selectedCivilizationId || 'maurya';
      this.showCivilization(civId, true);
    } else if (route === 'event' || route === 'battles' || route === 'section-battles') {
      const evId = params.eventId || this.selectedEventId || 'kalinga-war';
      this.showEvent(evId, true);
    } else if (route === 'reconstruction' || route === 'section-reconstruction') {
      const siteId = params.siteId || 'pataliputra';
      this.showReconstruction(siteId, true);
    } else if (route === 'archive' || route === 'section-archive') {
      this.scrollToSection('section-archive');
    } else if (route === 'about' || route === 'section-about') {
      this.scrollToSection('section-about');
    } else {
      const targetEl = document.getElementById(route);
      if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // =========================================================================
  // QUICK PICKER SCROLLERS (SECTION 4 & 5)
  // =========================================================================
  populateQuickPickers() {
    // 1. Civilizations Quick Picker Chips
    const civScroller = document.getElementById('civ-chips-scroller');
    if (civScroller && HISTORICAL_DATA && HISTORICAL_DATA.civilizations) {
      civScroller.innerHTML = HISTORICAL_DATA.civilizations.map(c => `
        <button class="civ-chip-btn ${c.id === this.selectedCivilizationId ? 'active' : ''}" data-civ-id="${c.id}">
          <span class="chip-name">${c.name}</span>
          <span class="chip-era">${c.period.split('–')[0].trim()}</span>
        </button>
      `).join('');

      civScroller.querySelectorAll('.civ-chip-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const civId = btn.getAttribute('data-civ-id');
          if (civId) {
            this.showCivilization(civId, false); // false = don't force scroll since user is already in section
          }
        });
      });
    }

    // 2. Battles / Turning Points Quick Picker Chips
    const eventScroller = document.getElementById('event-chips-scroller');
    if (eventScroller && HISTORICAL_DATA && HISTORICAL_DATA.events) {
      eventScroller.innerHTML = HISTORICAL_DATA.events.map(ev => `
        <button class="civ-chip-btn ${ev.id === this.selectedEventId ? 'active' : ''}" data-event-id="${ev.id}">
          <span class="chip-name">${ev.title}</span>
          <span class="chip-era">${ev.date}</span>
        </button>
      `).join('');

      eventScroller.querySelectorAll('.civ-chip-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const evId = btn.getAttribute('data-event-id');
          if (evId) {
            this.showEvent(evId, false);
          }
        });
      });
    }
  }

  updateCivPickerActive(civId) {
    document.querySelectorAll('#civ-chips-scroller .civ-chip-btn').forEach(btn => {
      const match = btn.getAttribute('data-civ-id') === civId;
      btn.classList.toggle('active', match);
      if (match) {
        btn.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
      }
    });
  }

  updateEventPickerActive(eventId) {
    document.querySelectorAll('#event-chips-scroller .civ-chip-btn').forEach(btn => {
      const match = btn.getAttribute('data-event-id') === eventId;
      btn.classList.toggle('active', match);
      if (match) {
        btn.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
      }
    });
  }

  // =========================================================================
  // HERO CONTROLS
  // =========================================================================
  bindHeroAndTransitions() {
    // Hero Epoch Chronology Chips Sync
    document.querySelectorAll('.hero-era-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.hero-era-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      });
    });
  }

  // =========================================================================
  // ENTITY ACTIVATION & RENDERING
  // =========================================================================
  showCivilization(civId, shouldScroll = true) {
    this.selectedCivilizationId = civId;
    this.renderCivilizationProfile(civId);
    this.updateCivPickerActive(civId);
    this.updateSelectedCivPanel(civId);
    if (this.mapEngine) {
      this.mapEngine.selectCivilization(civId);
    }
    if (shouldScroll) {
      this.scrollToSection('section-civilizations');
    }
  }

  showEvent(eventId, shouldScroll = true) {
    this.selectedEventId = eventId;
    this.renderEventDetail(eventId);
    this.updateEventPickerActive(eventId);
    if (shouldScroll) {
      this.scrollToSection('section-battles');
    }
  }

  showReconstruction(siteId, shouldScroll = true) {
    if (this.reconstructionStudio) {
      this.reconstructionStudio.setSite(siteId);
      this.reconstructionStudio.resize();
    }
    // Update site button states in reconstruction section
    document.querySelectorAll('.recon-site-chip').forEach(chip => {
      chip.classList.toggle('active', chip.getAttribute('data-site') === siteId);
    });
    if (shouldScroll) {
      this.scrollToSection('section-reconstruction');
    }
  }

  renderInitialViews() {
    this.renderCivilizationProfile(this.selectedCivilizationId);
    this.renderEventDetail(this.selectedEventId);
    this.renderArchiveList();
    this.updateSelectedCivPanel(this.selectedCivilizationId);
  }

  // =========================================================================
  // SUB-ENGINES INITIALIZATION
  // =========================================================================
  initAsiaMap() {
    this.mapEngine = new AsiaMapEngine('asia-map-container', (selectedCiv) => {
      this.selectedCivilizationId = selectedCiv.id;
      this.updateSelectedCivPanel(selectedCiv.id);
      this.updateCivPickerActive(selectedCiv.id);
    });

    const scrubber = document.getElementById('map-year-slider');
    scrubber?.addEventListener('input', (e) => {
      const yr = parseInt(e.target.value, 10);
      this.setScrubberYear(yr);
    });

    // Auto Play / Pause
    let isPlaying = false;
    let playInterval = null;
    const playBtn = document.getElementById('map-timeline-play');

    playBtn?.addEventListener('click', () => {
      isPlaying = !isPlaying;
      playBtn.classList.toggle('playing', isPlaying);
      playBtn.innerHTML = isPlaying ? 
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Pause' :
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> Play History';

      if (isPlaying) {
        playInterval = setInterval(() => {
          let currentVal = parseInt(scrubber.value, 10);
          currentVal += 50;
          if (currentVal > 1950) currentVal = -3300;
          this.setScrubberYear(currentVal);
          scrubber.value = currentVal;
        }, 250);
      } else {
        clearInterval(playInterval);
      }
    });

    // Right sidebar button: "Slide to Full Civilization Profile"
    document.getElementById('btn-map-explore-civ')?.addEventListener('click', () => {
      this.showCivilization(this.selectedCivilizationId, true);
    });

    // Right sidebar button: "Slide to AI Reconstruction"
    document.getElementById('btn-map-recon')?.addEventListener('click', () => {
      let targetSite = 'pataliputra';
      if (this.selectedCivilizationId === 'indus_valley') targetSite = 'dholavira';
      else if (this.selectedCivilizationId === 'vijayanagara') targetSite = 'hampi';
      else if (this.selectedCivilizationId === 'chola') targetSite = 'thanjavur';
      else if (this.selectedCivilizationId === 'gupta') targetSite = 'nalanda';
      else if (this.selectedCivilizationId === 'maratha') targetSite = 'raigad';

      this.showReconstruction(targetSite, true);
    });
  }

  setScrubberYear(year) {
    this.activeYear = year;
    const scrubber = document.getElementById('map-year-slider');
    if (scrubber) scrubber.value = year;

    const yearDisplay = document.getElementById('map-year-display');
    if (yearDisplay) {
      if (year < 0) {
        yearDisplay.innerText = `${Math.abs(year)} BCE`;
      } else if (year === 0) {
        yearDisplay.innerText = `1 CE`;
      } else {
        yearDisplay.innerText = `${year} CE`;
      }
    }

    const eraTag = document.getElementById('map-era-tag');
    if (eraTag) {
      if (year <= -1500) eraTag.innerText = "Indus & Bronze Age";
      else if (year <= -345) eraTag.innerText = "Vedic & 16 Mahajanapadas";
      else if (year <= 300) eraTag.innerText = "Mauryan & Classical Antiquity";
      else if (year <= 650) eraTag.innerText = "Gupta Golden Age & Classical Epoch";
      else if (year <= 1206) eraTag.innerText = "Medieval Maritime Dynasties (Chola/Rashtrakuta)";
      else if (year <= 1526) eraTag.innerText = "Delhi Sultanate & Vijayanagara Empire";
      else if (year <= 1818) eraTag.innerText = "Early Modern (Mughal, Maratha & Rajput Apex)";
      else eraTag.innerText = "Sikh Empire & National Freedom Movement";
    }

    if (this.mapEngine) {
      this.mapEngine.setYear(year);
    }
  }

  updateSelectedCivPanel(civId) {
    const civ = HISTORICAL_DATA.civilizations.find(c => c.id === civId) || HISTORICAL_DATA.civilizations[0];
    const panel = document.getElementById('map-selected-civ-panel');
    if (!panel) return;

    const titleEl = document.getElementById('panel-civ-title');
    const nativeEl = document.getElementById('panel-civ-native');
    const periodEl = document.getElementById('panel-civ-period');
    const regionEl = document.getElementById('panel-civ-region');
    const capitalEl = document.getElementById('panel-civ-capital');
    const descEl = document.getElementById('panel-civ-desc');
    const areaEl = document.getElementById('panel-civ-area');

    if (titleEl) titleEl.innerText = civ.name;
    if (nativeEl) nativeEl.innerText = civ.nativeName || "";
    if (periodEl) periodEl.innerText = civ.period;
    if (regionEl) regionEl.innerText = civ.region;
    if (capitalEl) capitalEl.innerText = civ.capital;
    if (descEl) descEl.innerText = civ.overview;
    if (areaEl) areaEl.innerText = civ.area;

    const photoWrap = document.getElementById('panel-civ-photo-wrap');
    if (photoWrap) {
      if (civ.image) {
        photoWrap.innerHTML = `
          <div class="panel-civ-photo-card">
            <img src="${civ.image}" alt="${civ.name}" class="panel-civ-photo-img" />
            <div class="panel-civ-photo-overlay"></div>
            <span class="panel-civ-photo-badge">ASI ARCHAEOLOGICAL RECORD</span>
          </div>
        `;
        photoWrap.style.display = 'block';
      } else {
        photoWrap.innerHTML = '';
        photoWrap.style.display = 'none';
      }
    }
  }

  initTimeline() {
    this.timelineEngine = new TimelineEngine(
      'timeline-container',
      (civId) => this.showCivilization(civId, true),
      (eventId) => this.showEvent(eventId, true)
    );
  }

  initReconstruction() {
    this.reconstructionStudio = new ReconstructionStudio('recon-canvas', 'recon-container');
  }

  bindSearchAndFilters() {
    const searchInput = document.getElementById('map-search-input');
    const searchResults = document.getElementById('map-search-results');
    const filterPills = document.querySelectorAll('.map-filter-pill');

    const updateResults = () => {
      const q = (searchInput?.value || '').trim().toLowerCase();
      const filter = this.activeFilter;

      let matchedCivs = HISTORICAL_DATA.civilizations.filter(c => {
        const matchesQ = !q || c.name.toLowerCase().includes(q) || c.region.toLowerCase().includes(q) || c.capital.toLowerCase().includes(q);
        const matchesF = (filter === 'all') || 
          (filter === 'civilization' && c.tag.toLowerCase() === 'civilization') ||
          (filter === 'empire' && c.tag.toLowerCase() === 'empire');
        return matchesQ && matchesF;
      });

      let matchedEvents = (filter === 'all' || filter === 'event') ? 
        HISTORICAL_DATA.events.filter(e => !q || e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q)) : [];

      if (!searchResults) return;

      if (matchedCivs.length === 0 && matchedEvents.length === 0) {
        searchResults.innerHTML = `<div class="no-results-msg">No historical entries match "${q}"</div>`;
        return;
      }

      searchResults.innerHTML = `
        ${matchedCivs.map(c => `
          <div class="search-result-item ${c.id === this.selectedCivilizationId ? 'active' : ''}" data-civ="${c.id}">
            <div class="res-badge">${c.tag}</div>
            <div class="res-details">
              <h4 class="res-title">${c.name}</h4>
              <span class="res-meta">${c.period} • ${c.capital}</span>
            </div>
            <svg class="res-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        `).join("")}

        ${matchedEvents.map(ev => `
          <div class="search-result-item event-res" data-event="${ev.id}">
            <div class="res-badge crimson">Event</div>
            <div class="res-details">
              <h4 class="res-title">${ev.title}</h4>
              <span class="res-meta">${ev.date} • ${ev.location}</span>
            </div>
            <svg class="res-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        `).join("")}
      `;

      searchResults.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
          const civId = item.getAttribute('data-civ');
          const evId = item.getAttribute('data-event');
          if (civId) {
            this.selectedCivilizationId = civId;
            if (this.mapEngine) this.mapEngine.selectCivilization(civId);
            this.updateSelectedCivPanel(civId);
            this.updateCivPickerActive(civId);
            this.renderCivilizationProfile(civId);
          } else if (evId) {
            this.showEvent(evId, true);
          }
        });
      });
    };

    searchInput?.addEventListener('input', updateResults);

    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.activeFilter = pill.getAttribute('data-filter') || 'all';
        updateResults();
      });
    });

    // Era Dropdown in Left Sidebar
    const eraSelect = document.getElementById('map-era-select');
    eraSelect?.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val === 'bronze') this.setScrubberYear(-2400);
      else if (val === 'vedic') this.setScrubberYear(-1000);
      else if (val === 'antiquity') this.setScrubberYear(-261);
      else if (val === 'golden') this.setScrubberYear(400);
      else if (val === 'medieval') this.setScrubberYear(1025);
      else if (val === 'vijayanagara') this.setScrubberYear(1520);
      else if (val === 'early_modern') this.setScrubberYear(1674);
      else if (val === 'freedom') this.setScrubberYear(1930);
      else this.setScrubberYear(-261);
    });

    updateResults();
  }

  bindHeroAndTransitions() {
    // Hero CTA: Start Exploring -> Slide to Atlas Map
    document.getElementById('cta-start-exploring')?.addEventListener('click', () => {
      this.scrollToSection('section-map');
    });

    // Hero CTA: View Timeline -> Slide to Timeline
    document.getElementById('cta-view-timeline')?.addEventListener('click', () => {
      this.scrollToSection('section-timeline');
    });

    // Hero CTA: Explore 16 Dynasties & Empires -> Slide to Civilizations
    document.getElementById('cta-explore-civs')?.addEventListener('click', () => {
      this.scrollToSection('section-civilizations');
    });

    // Hero Quick Era Jump Chips
    document.querySelectorAll('.hero-era-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const yr = parseInt(chip.getAttribute('data-year'), 10);
        this.setScrubberYear(yr);
        this.scrollToSection('section-map');
      });
    });
  }

  // =========================================================================
  // CIVILIZATION PROFILE RENDERER (SECTION 4)
  // =========================================================================
  renderCivilizationProfile(civId) {
    const civ = HISTORICAL_DATA.civilizations.find(c => c.id === civId) || HISTORICAL_DATA.civilizations[0];
    const container = document.getElementById('civ-profile-content');
    if (!container) return;

    this.selectedCivilizationId = civ.id;

    container.innerHTML = `
      <div class="profile-hero-card">
        ${civ.image ? `
          <div class="profile-hero-photo-banner">
            <img src="${civ.image}" alt="${civ.name}" class="profile-hero-photo" />
            <div class="profile-photo-gradient-overlay"></div>
            <div class="profile-photo-caption-badge">
              <span class="badge gold">Archaeological AI Reconstruction</span>
              <span class="caption-text">${civ.imageCaption || civ.name}</span>
            </div>
          </div>
        ` : ''}

        <div class="profile-hero-badge">
          <span class="badge gold">${civ.tag}</span>
          <span class="badge-accent">${civ.region}</span>
        </div>

        <h1 class="profile-title">${civ.name}</h1>
        <div class="profile-native-title">${civ.nativeName || ""}</div>

        <div class="profile-stats-grid">
          <div class="p-stat-box">
            <span class="p-stat-label">Historical Chronology</span>
            <span class="p-stat-value">${civ.period}</span>
          </div>
          <div class="p-stat-box">
            <span class="p-stat-label">Imperial Capital</span>
            <span class="p-stat-value">${civ.capital}</span>
          </div>
          <div class="p-stat-box">
            <span class="p-stat-label">Peak Territorial Extent</span>
            <span class="p-stat-value">${civ.area}</span>
          </div>
          <div class="p-stat-box">
            <span class="p-stat-label">Era Classification</span>
            <span class="p-stat-value">${civ.eraId ? civ.eraId.replace('_', ' ').toUpperCase() : 'CLASSICAL'}</span>
          </div>
        </div>

        <p class="profile-lead">${civ.overview}</p>

        <div class="profile-hero-actions">
          <button class="btn btn-primary gold-glow" id="btn-profile-explore-timeline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Slide to Interactive Timeline
          </button>
          <button class="btn btn-secondary" id="btn-profile-view-sources">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            Inspect Primary Epigraphic Sources
          </button>
          <button class="btn btn-outline" id="btn-profile-view-map">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
            Slide to Atlas Map
          </button>
        </div>
      </div>

      <!-- Historical Existence Track -->
      <div class="profile-timeline-strip">
        <div class="strip-header">
          <span class="strip-label">Span of Existence Across Subcontinent History</span>
          <span class="strip-years">${civ.period}</span>
        </div>
        <div class="strip-track">
          <div class="strip-fill" style="left: 10%; width: 80%;">
            <span class="strip-tag">${civ.name}</span>
          </div>
        </div>
      </div>

      <!-- Section: Major Rulers & Sovereigns -->
      <div class="profile-section">
        <div class="section-title-wrap">
          <h2 class="section-heading">Prominent Sovereigns & Historical Leaders</h2>
          <span class="section-sub">Documented in stone inscriptions, numismatic coins, copper grants, and royal chronicles</span>
        </div>

        <div class="rulers-card-grid">
          ${(civ.rulers || []).map((r, i) => `
            <div class="ruler-card ${i === 0 ? 'featured-ruler' : ''}">
              ${i === 0 ? '<div class="featured-badge">Featured Sovereign</div>' : ''}
              <div class="ruler-img-wrap">
                <img src="${r.image}" alt="${r.name}" class="ruler-avatar" />
              </div>
              <div class="ruler-info">
                <h3 class="ruler-name">${r.name}</h3>
                <span class="ruler-title">${r.title}</span>
                <span class="ruler-reign"><i class="icon-calendar"></i> Reign / Era: ${r.reign}</span>
                <p class="ruler-summary">${r.summary}</p>
                ${r.achievements ? `
                  <ul class="ruler-achievements">
                    ${r.achievements.map(a => `<li><span class="bullet-dot"></span>${a}</li>`).join("")}
                  </ul>
                ` : ''}
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Section: Major Events -->
      <div class="profile-section">
        <div class="section-title-wrap">
          <h2 class="section-heading">Epoch Events & Historical Turning Points</h2>
          <span class="section-sub">Decisive battles, international university foundings, and peace edicts</span>
        </div>

        <div class="event-cards-stack">
          ${(civ.majorEvents || []).map(ev => `
            <div class="event-mini-card featured-clickable-event" data-event-id="${ev.id}">
              <div class="event-mini-header">
                <span class="event-mini-date">${ev.date}</span>
                <span class="badge gold">Historical Record</span>
              </div>
              <h4 class="event-mini-title">${ev.title}</h4>
              <p class="event-mini-sig">${ev.significance}</p>
              <button class="btn btn-sm btn-gold mt-2 btn-inspect-event" data-target-event="${ev.id}">
                Slide to Battle Dossier →
              </button>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Section: Primary Historical Sources & Epigraphy -->
      <div class="profile-section">
        <div class="section-title-wrap">
          <h2 class="section-heading">Primary Epigraphic & Historical Sources</h2>
          <span class="section-sub">Stone inscriptions, copper charters, foreign travel accounts, and paper archives</span>
        </div>

        <div class="sources-card-grid">
          ${(civ.sources || []).map(src => `
            <div class="source-card">
              <div class="source-card-header">
                <span class="source-type">${src.type}</span>
                <span class="source-date">${src.date}</span>
              </div>
              <h3 class="source-title">${src.title}</h3>
              ${src.author ? `<span class="source-author">Author / Origin: ${src.author}</span>` : ''}
              <blockquote class="source-quote">${src.quote}</blockquote>
              <div class="source-repo"><span class="repo-label">Repository:</span> ${src.repository}</div>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    // Bind In-card Buttons
    container.querySelectorAll('.btn-inspect-event').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const evId = btn.getAttribute('data-target-event');
        if (evId) this.showEvent(evId, true);
      });
    });

    container.querySelectorAll('.featured-clickable-event').forEach(card => {
      card.addEventListener('click', () => {
        const evId = card.getAttribute('data-event-id');
        if (evId) this.showEvent(evId, true);
      });
    });

    document.getElementById('btn-profile-explore-timeline')?.addEventListener('click', () => {
      this.scrollToSection('section-timeline');
    });

    document.getElementById('btn-profile-view-sources')?.addEventListener('click', () => {
      this.openSourcesModal(civ);
    });

    document.getElementById('btn-profile-view-map')?.addEventListener('click', () => {
      this.setScrubberYear(civ.startYear || -261);
      this.scrollToSection('section-map');
    });
  }

  // =========================================================================
  // HISTORICAL EVENT / BATTLE DOSSIER RENDERER (SECTION 5)
  // =========================================================================
  renderEventDetail(eventId) {
    const ev = HISTORICAL_DATA.events.find(e => e.id === eventId) || HISTORICAL_DATA.events[0];
    const container = document.getElementById('event-detail-content');
    if (!container) return;

    this.selectedEventId = ev.id;
    const parentCiv = HISTORICAL_DATA.civilizations.find(c => c.id === ev.civilizationId);
    const battleImg = ev.image || parentCiv?.image;

    container.innerHTML = `
      <div class="event-hero-card">
        ${battleImg ? `
          <div class="profile-hero-photo-banner">
            <img src="${battleImg}" alt="${ev.title}" class="profile-hero-photo" />
            <div class="profile-photo-gradient-overlay"></div>
            <div class="profile-photo-caption-badge">
              <span class="badge crimson">Historical Turning Point</span>
              <span class="caption-text">${ev.title} • ${ev.location} (${ev.date})</span>
            </div>
          </div>
        ` : ''}
        <div class="event-hero-overlay"></div>
        <div class="event-hero-content">
          <div class="event-badges-row">
            <span class="badge crimson">Historical Turning Point</span>
            <span class="badge gold">${ev.civilization}</span>
          </div>

          <h1 class="event-hero-title">${ev.title}</h1>
          <div class="event-hero-meta">
            <span class="meta-item"><i class="icon-clock"></i> Date: ${ev.date}</span>
            <span class="meta-item"><i class="icon-map-pin"></i> Location: ${ev.location}</span>
          </div>

          <p class="event-hero-desc">${ev.overview}</p>

          <div class="event-hero-buttons">
            <button class="btn btn-primary gold-glow" id="btn-event-view-on-map">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
              Slide to Atlas Map at ${ev.date}
            </button>
            <button class="btn btn-secondary" id="btn-event-explore-timeline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Slide to Timeline
            </button>
            <button class="btn btn-outline" id="btn-event-view-civ">
              Slide to ${ev.civilization} Profile →
            </button>
          </div>
        </div>
      </div>

      <div class="event-analysis-grid">
        <div class="event-narrative-col">
          <div class="narrative-card">
            <h2 class="narrative-heading">Detailed Historical Narrative</h2>
            <p>${ev.whatHappened || ev.overview}</p>
          </div>

          <div class="narrative-card significance-card">
            <h2 class="narrative-heading">Subcontinental & Global Significance</h2>
            <p>${ev.significance}</p>
          </div>
        </div>

        <div class="event-sidebar-col">
          <div class="related-entity-card">
            <div class="entity-badge">Civilization Context</div>
            <h3 class="entity-title">${ev.civilization}</h3>
            <p class="entity-desc">Explore complete territorial borders, sovereign lineages, and archaeological excavation records.</p>
            <button class="btn btn-sm btn-secondary w-full" id="btn-goto-civ-profile">
              Slide to Civilization Profile
            </button>
          </div>
        </div>
      </div>

      <!-- Sources -->
      <div class="profile-section">
        <div class="section-title-wrap">
          <h2 class="section-heading">Primary Documentation & Ancient Manuscripts</h2>
          <span class="section-sub">Authentic epigraphic edicts and manuscript citations</span>
        </div>

        <div class="sources-card-grid">
          ${(ev.sources || []).map(src => `
            <div class="source-card">
              <div class="source-card-header">
                <span class="source-type">${src.type}</span>
                <span class="source-date">${src.date}</span>
              </div>
              <h3 class="source-title">${src.title}</h3>
              ${src.author ? `<span class="source-author">Origin: ${src.author}</span>` : ''}
              <p class="source-desc">${src.description}</p>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    document.getElementById('btn-event-view-on-map')?.addEventListener('click', () => {
      this.setScrubberYear(ev.year);
      if (ev.civilizationId) {
        this.selectedCivilizationId = ev.civilizationId;
        this.updateSelectedCivPanel(ev.civilizationId);
        if (this.mapEngine) this.mapEngine.selectCivilization(ev.civilizationId);
      }
      this.scrollToSection('section-map');
    });

    document.getElementById('btn-event-explore-timeline')?.addEventListener('click', () => {
      this.scrollToSection('section-timeline');
    });

    document.getElementById('btn-event-view-civ')?.addEventListener('click', () => {
      if (ev.civilizationId) {
        this.showCivilization(ev.civilizationId, true);
      }
    });

    document.getElementById('btn-goto-civ-profile')?.addEventListener('click', () => {
      if (ev.civilizationId) {
        this.showCivilization(ev.civilizationId, true);
      }
    });
  }

  // =========================================================================
  // HISTORICAL ARCHIVE RENDERER (SECTION 7)
  // =========================================================================
  renderArchiveList() {
    const container = document.getElementById('archive-content');
    if (!container) return;

    let allSources = [];
    HISTORICAL_DATA.civilizations.forEach(c => {
      (c.sources || []).forEach(s => {
        allSources.push({ ...s, civilization: c.name, civId: c.id });
      });
    });

    container.innerHTML = `
      <div class="sources-card-grid" style="grid-template-columns: repeat(2, 1fr); gap: 24px;">
        ${allSources.map(src => `
          <div class="source-card">
            <div class="source-card-header">
              <span class="source-type">${src.type}</span>
              <span class="badge gold">${src.civilization}</span>
            </div>
            <h3 class="source-title">${src.title}</h3>
            ${src.author ? `<span class="source-author">Author / Inscriber: ${src.author}</span>` : ''}
            <blockquote class="source-quote">${src.quote}</blockquote>
            <div class="source-repo"><span class="repo-label">Repository:</span> ${src.repository}</div>
            <button class="btn btn-sm btn-outline mt-3 btn-archive-civ" data-civ-target="${src.civId}">
              Slide to ${src.civilization} Profile →
            </button>
          </div>
        `).join("")}
      </div>
    `;

    container.querySelectorAll('.btn-archive-civ').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetCiv = btn.getAttribute('data-civ-target');
        if (targetCiv) {
          this.showCivilization(targetCiv, true);
        }
      });
    });
  }

  // =========================================================================
  // EPIGRAPHIC SOURCES MODAL
  // =========================================================================
  openSourcesModal(civ) {
    const modal = document.getElementById('sources-inspection-modal');
    if (!modal) return;

    const sources = civ.sources || [];
    const dialog = modal.querySelector('.modal-dialog');
    if (dialog && sources.length > 0) {
      dialog.innerHTML = `
        <button class="modal-close-btn" id="modal-close-epigraphs">✕</button>
        <div class="panel-header-badge" style="margin-bottom: 8px;">
          <span class="badge gold">${civ.name}</span>
          <span class="badge-accent">${civ.period}</span>
        </div>
        <h2 class="inspector-title" style="margin-bottom: 8px;">Primary Epigraphic & Manuscript Archive</h2>
        <p class="inspector-desc" style="margin-bottom: 24px;">Direct verbatim inscriptions, copper charters, and excavation texts recorded in ASI archives.</p>

        <div class="sources-card-grid" style="grid-template-columns: 1fr; gap: 16px; max-height: 60vh; overflow-y: auto;">
          ${sources.map(src => `
            <div class="source-card">
              <div class="source-card-header">
                <span class="source-type">${src.type}</span>
                <span class="source-date">${src.date}</span>
              </div>
              <h3 class="source-title">${src.title}</h3>
              ${src.author ? `<div style="font-size: 13px; color: #94a3b8; margin-bottom: 6px;">Author / Edict: ${src.author}</div>` : ''}
              <blockquote class="source-quote">${src.quote}</blockquote>
              <div class="source-repo"><span class="repo-label">Preservation Archive:</span> ${src.repository}</div>
            </div>
          `).join('')}
        </div>
      `;

      dialog.querySelector('#modal-close-epigraphs')?.addEventListener('click', () => {
        modal.classList.remove('show');
      });
    }

    modal.classList.add('show');
  }
}

// Global Application Instantiation
window.addEventListener('DOMContentLoaded', () => {
  window.appRouter = new EventurionApp();
});
