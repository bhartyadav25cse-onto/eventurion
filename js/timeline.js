// Eventurion Interactive Comprehensive Indian History Timeline Engine
class TimelineEngine {
  constructor(containerId, onSelectCivilization, onSelectEvent) {
    this.container = document.getElementById(containerId);
    this.onSelectCiv = onSelectCivilization;
    this.onSelectEvent = onSelectEvent;
    
    this.minYear = -3300;
    this.maxYear = 1950;
    this.totalSpan = this.maxYear - this.minYear; // 5,250 years

    this.activeFilter = "all";
    this.selectedItem = null;

    this.init();
  }

  init() {
    if (!this.container) return;
    this.render();
    this.bindEvents();
    // Default inspect Maurya Empire
    const maurya = HISTORICAL_DATA.civilizations.find(c => c.id === 'maurya');
    if (maurya) this.inspectItem({ type: 'civ', data: maurya });
  }

  yearToPercent(year) {
    return ((year - this.minYear) / this.totalSpan) * 100;
  }

  render() {
    const periodTicks = [
      { year: -3300, label: "3300 BCE (Indus)" },
      { year: -2400, label: "2400 BCE" },
      { year: -1500, label: "1500 BCE (Vedic)" },
      { year: -600, label: "600 BCE (Mahajanapadas)" },
      { year: -322, label: "322 BCE (Maurya)" },
      { year: 0, label: "1 CE (Satavahana)" },
      { year: 319, label: "319 CE (Gupta)" },
      { year: 606, label: "606 CE (Harsha / Chalukya)" },
      { year: 1000, label: "1000 CE (Chola / Pala)" },
      { year: 1336, label: "1336 CE (Vijayanagara)" },
      { year: 1526, label: "1526 CE (Mughal / Rajput)" },
      { year: 1674, label: "1674 CE (Maratha)" },
      { year: 1857, label: "1857 CE (Freedom Uprising)" },
      { year: 1947, label: "1947 CE (Swarajya)" }
    ];

    this.container.innerHTML = `
      <div class="timeline-screen-wrapper">
        
        <!-- Timeline Header -->
        <div class="timeline-header-bar">
          <div class="timeline-titles">
            <span class="eyebrow-tag">CHRONOLOGICAL ARCHIVE OF BHARATAVARSHA</span>
            <h1 class="screen-title">Indian History Through Time</h1>
            <p class="screen-subtitle">Explore 5,000 years of recorded Indian history, sovereign dynasties, classical sciences, and defining historical epics.</p>
          </div>

          <!-- Filter Controls -->
          <div class="timeline-filter-pills">
            <button class="t-filter-btn active" data-filter="all">All Records</button>
            <button class="t-filter-btn" data-filter="empire">Imperial Powers</button>
            <button class="t-filter-btn" data-filter="civilization">Civilizations</button>
            <button class="t-filter-btn" data-filter="event">Major Turning Points</button>
          </div>
        </div>

        <!-- Main Horizontal Timeline Canvas Container -->
        <div class="timeline-scroll-container">
          <div class="timeline-canvas-track" style="min-width: 1600px;">
            
            <!-- Axis Period Labels & Vertical Guide Lines -->
            <div class="timeline-axis-header">
              ${periodTicks.map(tick => {
                const pos = this.yearToPercent(tick.year);
                return `
                  <div class="timeline-tick-col" style="left: ${pos}%">
                    <span class="tick-label">${tick.label}</span>
                    <div class="tick-line"></div>
                  </div>
                `;
              }).join("")}
            </div>

            <!-- Civilization Span Bars Track -->
            <div class="timeline-bars-track">
              <div class="track-section-label">Dynasties, Kingdoms & Sovereign Movements</div>
              ${this.renderCivBars()}
            </div>

            <!-- Major Historical Events Track -->
            <div class="timeline-events-track">
              <div class="track-section-label">Decisive Battles, Consecrations & Treaties</div>
              <div class="event-nodes-line">
                ${this.renderEventMarkers()}
              </div>
            </div>

          </div>
        </div>

        <!-- Selected Item Inspector Bottom Drawer -->
        <div class="timeline-inspector-panel" id="timeline-inspector">
          <!-- Populated dynamically via inspectItem -->
        </div>

      </div>
    `;
  }

  renderCivBars() {
    return HISTORICAL_DATA.civilizations.map((civ) => {
      const left = this.yearToPercent(civ.startYear);
      const right = this.yearToPercent(civ.endYear);
      const width = Math.max(right - left, 1.4);
      const isSelected = civ.id === 'maurya';

      let barClass = 'gold';
      if (civ.id === 'indus_valley') barClass = 'blue';
      else if (civ.id === 'gupta') barClass = 'gold';
      else if (civ.id === 'chola') barClass = 'crimson';
      else if (civ.id === 'vijayanagara') barClass = 'gold';
      else if (civ.id === 'maratha') barClass = 'orange';
      else if (civ.id === 'mughal') barClass = 'emerald';
      else if (civ.id === 'sikh_empire') barClass = 'gold';
      else if (civ.id === 'freedom_movement') barClass = 'blue';

      return `
        <div class="timeline-bar-row" data-type="${civ.tag.toLowerCase()}">
          <div class="civ-span-bar ${isSelected ? 'featured-bar highlight-pulse' : ''}" 
               style="left: ${left}%; width: ${width}%;"
               data-id="${civ.id}"
               data-kind="civ">
            <div class="bar-fill ${civ.id}"></div>
            <div class="bar-content">
              <span class="bar-title">${civ.name}</span>
              <span class="bar-dates">${civ.period}</span>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  renderEventMarkers() {
    return HISTORICAL_DATA.events.map(ev => {
      const pos = this.yearToPercent(ev.year);
      const isKalinga = ev.id === 'kalinga-war';

      return `
        <div class="timeline-event-marker ${isKalinga ? 'highlight-event' : ''}" 
             style="left: ${pos}%"
             data-id="${ev.id}"
             data-kind="event">
          <div class="event-pin-dot"></div>
          <div class="event-pin-stem"></div>
          <div class="event-pin-card">
            <span class="pin-year">${ev.date}</span>
            <span class="pin-title">${ev.title.length > 22 ? ev.title.substring(0, 20) + '...' : ev.title}</span>
          </div>
        </div>
      `;
    }).join("");
  }

  inspectItem(item) {
    this.selectedItem = item;
    const inspector = document.getElementById('timeline-inspector');
    if (!inspector) return;

    if (item.type === 'civ') {
      const civ = item.data;
      inspector.innerHTML = `
        <div class="inspector-card">
          <div class="inspector-meta">
            <span class="badge gold">${civ.tag}</span>
            <span class="inspector-dates"><i class="icon-clock"></i> ${civ.period}</span>
            <span class="inspector-region"><i class="icon-pin"></i> ${civ.region} • Capital: ${civ.capital}</span>
          </div>
          <div class="inspector-body">
            <div class="inspector-main">
              <h2 class="inspector-title">${civ.name} <small class="native-name">${civ.nativeName || ''}</small></h2>
              <p class="inspector-desc">${civ.overview}</p>
            </div>
            <div class="inspector-actions">
              <button class="btn btn-primary gold-glow" id="btn-inspect-profile">
                Explore ${civ.name} Profile
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <button class="btn btn-secondary" id="btn-inspect-map">
                View on Atlas Map
              </button>
            </div>
          </div>
        </div>
      `;

      document.getElementById('btn-inspect-profile')?.addEventListener('click', () => {
        if (this.onSelectCiv) this.onSelectCiv(civ.id);
      });

      document.getElementById('btn-inspect-map')?.addEventListener('click', () => {
        if (window.appRouter) {
          window.appRouter.navigate('map', { civId: civ.id, year: civ.startYear });
        }
      });

    } else if (item.type === 'event') {
      const ev = item.data;
      inspector.innerHTML = `
        <div class="inspector-card event-card-active">
          <div class="inspector-meta">
            <span class="badge crimson">Historical Turning Point</span>
            <span class="inspector-dates"><i class="icon-clock"></i> ${ev.date}</span>
            <span class="inspector-region"><i class="icon-pin"></i> ${ev.location}</span>
          </div>
          <div class="inspector-body">
            <div class="inspector-main">
              <h2 class="inspector-title">${ev.title}</h2>
              <p class="inspector-desc">${ev.overview}</p>
            </div>
            <div class="inspector-actions">
              <button class="btn btn-primary crimson-glow" id="btn-inspect-event-page">
                Inspect Detailed Battle / Event Dossier
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <button class="btn btn-secondary" id="btn-inspect-event-map">
                View Location on Map
              </button>
            </div>
          </div>
        </div>
      `;

      document.getElementById('btn-inspect-event-page')?.addEventListener('click', () => {
        if (this.onSelectEvent) this.onSelectEvent(ev.id);
      });

      document.getElementById('btn-inspect-event-map')?.addEventListener('click', () => {
        if (window.appRouter) {
          window.appRouter.navigate('map', { civId: ev.civilizationId, year: ev.year });
        }
      });
    }
  }

  bindEvents() {
    this.container.querySelectorAll('.t-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.container.querySelectorAll('.t-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        this.applyFilter(filter);
      });
    });

    this.container.querySelectorAll('.civ-span-bar').forEach(bar => {
      bar.addEventListener('click', () => {
        const civId = bar.getAttribute('data-id');
        const civ = HISTORICAL_DATA.civilizations.find(c => c.id === civId);
        if (civ) {
          this.container.querySelectorAll('.civ-span-bar').forEach(b => b.classList.remove('active'));
          bar.classList.add('active');
          this.inspectItem({ type: 'civ', data: civ });
        }
      });
    });

    this.container.querySelectorAll('.timeline-event-marker').forEach(marker => {
      marker.addEventListener('click', () => {
        const evId = marker.getAttribute('data-id');
        const ev = HISTORICAL_DATA.events.find(e => e.id === evId);
        if (ev) {
          this.container.querySelectorAll('.timeline-event-marker').forEach(m => m.classList.remove('active'));
          marker.classList.add('active');
          this.inspectItem({ type: 'event', data: ev });
        }
      });
    });
  }

  applyFilter(filter) {
    this.activeFilter = filter;
    const barRows = this.container.querySelectorAll('.timeline-bar-row');
    const eventMarkers = this.container.querySelectorAll('.timeline-event-marker');

    if (filter === 'all') {
      barRows.forEach(r => r.style.display = 'flex');
      eventMarkers.forEach(m => m.style.display = 'block');
    } else if (filter === 'event') {
      barRows.forEach(r => r.style.display = 'none');
      eventMarkers.forEach(m => m.style.display = 'block');
    } else {
      eventMarkers.forEach(m => m.style.display = 'none');
      barRows.forEach(r => {
        const type = r.getAttribute('data-type');
        r.style.display = (type === filter || (filter === 'empire' && type === 'empire')) ? 'flex' : 'none';
      });
    }
  }
}

window.TimelineEngine = TimelineEngine;
