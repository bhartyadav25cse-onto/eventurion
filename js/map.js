// Eventurion Interactive Indian Historical Map Engine
class AsiaMapEngine {
  constructor(svgContainerId, onSelectCivilization) {
    this.container = document.getElementById(svgContainerId);
    this.onSelect = onSelectCivilization;
    this.currentScale = 1;
    this.panX = 0;
    this.panY = 0;
    this.isPanning = false;
    this.startX = 0;
    this.startY = 0;
    this.activeCivilizationId = "maurya";
    this.currentYear = -261;
    this.showTradeRoutes = true;
    this.showTopography = true;

    this.init();
  }

  init() {
    if (!this.container) return;
    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = `
      <div class="map-viewport" id="map-viewport">
        <svg id="asia-map-svg" viewBox="0 0 1000 680" preserveAspectRatio="xMidYMid meet">
          <defs>
            <!-- Glow Filters for Territories & Markers -->
            <filter id="gold-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="crimson-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <!-- Gradients -->
            <radialGradient id="ocean-radial" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stop-color="#0e131b" />
              <stop offset="60%" stop-color="#080b0f" />
              <stop offset="100%" stop-color="#040609" />
            </radialGradient>

            <linearGradient id="uttarapatha-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#c5a059" stop-opacity="0.3" />
              <stop offset="50%" stop-color="#f59e0b" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#c5a059" stop-opacity="0.3" />
            </linearGradient>

            <linearGradient id="dakshinapatha-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#10b981" stop-opacity="0.3" />
              <stop offset="50%" stop-color="#34d399" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#10b981" stop-opacity="0.3" />
            </linearGradient>

            <linearGradient id="spice-route-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.3" />
              <stop offset="50%" stop-color="#0284c7" stop-opacity="0.85" />
              <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.3" />
            </linearGradient>
          </defs>

          <!-- Ocean Base -->
          <rect width="1000" height="680" fill="url(#ocean-radial)" />

          <g id="map-transform-group" transform="translate(0, 0) scale(1)">
            
            <!-- Cartographic Coordinate Grid -->
            <g class="map-grid" opacity="0.14">
              <line x1="150" y1="0" x2="150" y2="680" stroke="#c5a059" stroke-width="0.5" stroke-dasharray="4,4" />
              <line x1="350" y1="0" x2="350" y2="680" stroke="#c5a059" stroke-width="0.5" stroke-dasharray="4,4" />
              <line x1="550" y1="0" x2="550" y2="680" stroke="#c5a059" stroke-width="0.5" stroke-dasharray="4,4" />
              <line x1="750" y1="0" x2="750" y2="680" stroke="#c5a059" stroke-width="0.5" stroke-dasharray="4,4" />
              <line x1="950" y1="0" x2="950" y2="680" stroke="#c5a059" stroke-width="0.5" stroke-dasharray="4,4" />

              <line x1="0" y1="120" x2="1000" y2="120" stroke="#c5a059" stroke-width="0.5" stroke-dasharray="4,4" />
              <line x1="0" y1="260" x2="1000" y2="260" stroke="#c5a059" stroke-width="0.5" stroke-dasharray="4,4" />
              <line x1="0" y1="400" x2="1000" y2="400" stroke="#c5a059" stroke-width="0.5" stroke-dasharray="4,4" />
              <line x1="0" y1="540" x2="1000" y2="540" stroke="#c5a059" stroke-width="0.5" stroke-dasharray="4,4" />
            </g>

            <!-- Geographic Subcontinent Landmass Shape -->
            <path id="india-subcontinent-landmass" class="subcontinent-land" d="
              M 260,200 
              C 310,180 370,160 440,170 
              C 520,160 590,190 620,240 
              C 650,280 620,330 560,350 
              C 540,380 520,430 490,480 
              C 470,540 450,590 430,620 
              C 420,625 410,610 395,570 
              C 380,510 360,450 350,420 
              C 330,390 310,380 290,360 
              C 260,340 270,300 290,280 
              C 310,260 270,230 260,200 Z" 
              fill="#131720" 
              stroke="#2c3547" 
              stroke-width="1.8" 
            />

            <!-- Sri Lanka Island -->
            <ellipse cx="465" cy="625" rx="18" ry="26" fill="#131720" stroke="#2c3547" stroke-width="1.5" />

            <!-- Surrounding Asian Landmass Contours -->
            <path d="M 120,160 Q 240,160 260,200 Q 240,300 180,360 Q 110,380 80,440" 
                  fill="none" stroke="#232b3b" stroke-width="1.2" stroke-dasharray="3,3" />
            <path d="M 620,240 Q 690,260 760,310 Q 740,400 700,470 Q 680,550 710,610" 
                  fill="none" stroke="#232b3b" stroke-width="1.2" stroke-dasharray="3,3" />

            <!-- Mountain Topography (Himalayas, Western Ghats, Eastern Ghats, Vindhyas) -->
            <g id="map-topography" class="map-topography" opacity="0.4">
              <!-- Himalayas & Karakoram Arc -->
              <path d="M 330,200 Q 420,175 510,195 Q 570,225 610,250" fill="none" stroke="#94a3b8" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="3,5" />
              <!-- Vindhya & Satpura Ranges -->
              <path d="M 360,350 Q 430,345 490,360" fill="none" stroke="#64748b" stroke-width="3" stroke-linecap="round" stroke-dasharray="2,4" />
              <!-- Western Ghats (Sahyadris) -->
              <path d="M 355,390 Q 365,470 395,570" fill="none" stroke="#64748b" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="2,4" />
              <!-- Eastern Ghats -->
              <path d="M 490,390 Q 470,470 440,560" fill="none" stroke="#64748b" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="2,4" />
            </g>

            <!-- Major Sacred Rivers of India -->
            <g class="map-rivers" opacity="0.7">
              <!-- Indus River System (Sindhu, Jhelum, Chenab, Ravi, Beas, Sutlej) -->
              <path d="M 360,190 Q 340,240 330,300 Q 310,340 300,370" fill="none" stroke="#38bdf8" stroke-width="1.8" />
              <!-- Saraswati River (Paleo-Channel) -->
              <path d="M 380,220 Q 350,280 320,340" fill="none" stroke="#38bdf8" stroke-width="1" stroke-dasharray="2,3" opacity="0.5" />
              <!-- Ganges River (Ganga) -->
              <path d="M 390,220 Q 430,250 490,270 Q 530,310 535,340" fill="none" stroke="#38bdf8" stroke-width="2.2" />
              <!-- Yamuna River -->
              <path d="M 385,225 Q 415,260 470,275" fill="none" stroke="#38bdf8" stroke-width="1.4" />
              <!-- Brahmaputra River -->
              <path d="M 490,180 Q 560,190 610,230 Q 580,270 540,320" fill="none" stroke="#38bdf8" stroke-width="1.8" />
              <!-- Narmada River -->
              <path d="M 470,360 Q 400,365 340,370" fill="none" stroke="#38bdf8" stroke-width="1.5" />
              <!-- Godavari River -->
              <path d="M 365,410 Q 430,420 480,440" fill="none" stroke="#38bdf8" stroke-width="1.5" />
              <!-- Krishna & Tungabhadra Rivers -->
              <path d="M 370,460 Q 420,465 470,480" fill="none" stroke="#38bdf8" stroke-width="1.5" />
              <!-- Kaveri River -->
              <path d="M 380,530 Q 420,535 450,545" fill="none" stroke="#38bdf8" stroke-width="1.4" />
            </g>

            <!-- Ancient Indian Trade Routes -->
            <g id="map-trade-routes" class="map-trade-routes">
              <!-- Uttarapatha (Northern Highway: Taxila -> Indraprastha -> Pataliputra -> Tamralipti) -->
              <path class="uttarapatha-path" d="M 310,200 Q 370,240 430,260 Q 490,275 530,335" 
                fill="none" stroke="url(#uttarapatha-grad)" stroke-width="2.8" stroke-dasharray="6,4" />
              
              <!-- Dakshinapatha (Southern Highway: Varanasi -> Ujjain -> Pratishthana -> Madurai) -->
              <path class="dakshinapatha-path" d="M 460,275 Q 400,340 410,430 Q 420,510 425,580" 
                fill="none" stroke="url(#dakshinapatha-grad)" stroke-width="2.2" stroke-dasharray="5,4" />

              <!-- Maritime Spice & Cotton Route (Lothal -> Bharuch -> Kalyan -> Muziris -> Poompuhar -> Tamralipti) -->
              <path class="spice-route-path" d="M 320,360 C 330,400 350,460 370,530 C 390,600 425,620 450,560 C 470,480 500,410 535,340" 
                fill="none" stroke="url(#spice-route-grad)" stroke-width="2.2" stroke-dasharray="5,5" />
            </g>

            <!-- Dynamic Civilization Territory Polygons -->
            <g id="map-territories" class="map-territories">
              ${this.renderTerritories()}
            </g>

            <!-- Prominent Ancient Cities & Capitals -->
            <g id="map-places" class="map-places">
              <!-- Pataliputra (Patna) -->
              <g class="place-node" transform="translate(490, 275)">
                <circle r="3.5" fill="#e2c174" />
                <text x="8" y="4" fill="#e2c174" font-size="9" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600">Pataliputra</text>
              </g>

              <!-- Dholavira & Lothal (Indus) -->
              <g class="place-node" transform="translate(325, 345)">
                <circle r="3" fill="#38bdf8" />
                <text x="-65" y="4" fill="#7dd3fc" font-size="8.5" font-family="'Plus Jakarta Sans', sans-serif">Dholavira / Lothal</text>
              </g>

              <!-- Hampi / Vijayanagara -->
              <g class="place-node" transform="translate(415, 475)">
                <circle r="3.5" fill="#e2c174" />
                <text x="8" y="4" fill="#e2c174" font-size="9" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600">Hampi (Vijayanagara)</text>
              </g>

              <!-- Thanjavur (Chola) -->
              <g class="place-node" transform="translate(435, 545)">
                <circle r="3" fill="#e2c174" />
                <text x="7" y="3" fill="#e2c174" font-size="8.5" font-family="'Plus Jakarta Sans', sans-serif">Thanjavur</text>
              </g>

              <!-- Raigad Fort (Maratha) -->
              <g class="place-node" transform="translate(365, 415)">
                <circle r="3" fill="#f59e0b" />
                <text x="-60" y="3" fill="#fde68a" font-size="8.5" font-family="'Plus Jakarta Sans', sans-serif">Raigad (Maratha)</text>
              </g>

              <!-- Chittorgarh (Rajput) -->
              <g class="place-node" transform="translate(385, 325)">
                <circle r="3" fill="#f87171" />
                <text x="-65" y="3" fill="#fca5a5" font-size="8.5" font-family="'Plus Jakarta Sans', sans-serif">Chittorgarh</text>
              </g>

              <!-- Delhi (Indraprastha / Shahjahanabad) -->
              <g class="place-node" transform="translate(410, 245)">
                <circle r="3.5" fill="#f59e0b" />
                <text x="7" y="3" fill="#fde68a" font-size="9" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600">Delhi (Indraprastha)</text>
              </g>

              <!-- Kalinga (Dhauli Hills - Battlefield) -->
              <g class="place-node event-highlight-node" transform="translate(500, 375)" style="cursor: pointer;">
                <circle r="4.5" fill="#ef4444" stroke="#ffffff" stroke-width="1.5" filter="url(#crimson-glow)" />
                <text x="8" y="4" fill="#f87171" font-size="9" font-weight="700" font-family="'Plus Jakarta Sans', sans-serif">Kalinga (261 BCE)</text>
              </g>

              <!-- Taxila (Gandhara) -->
              <g class="place-node" transform="translate(320, 195)">
                <circle r="2.5" fill="#94a3b8" />
                <text x="-35" y="-5" fill="#cbd5e1" font-size="8" font-family="'Plus Jakarta Sans', sans-serif">Taxila</text>
              </g>

              <!-- Nalanda Mahavihara -->
              <g class="place-node" transform="translate(505, 280)">
                <circle r="3" fill="#f59e0b" />
                <text x="7" y="3" fill="#fde68a" font-size="8.5" font-family="'Plus Jakarta Sans', sans-serif">Nalanda</text>
              </g>
            </g>

            <!-- Civilization Interactive Markers -->
            <g id="map-markers" class="map-markers">
              ${this.renderMarkers()}
            </g>

            <!-- Nautical Compass Rose in Arabian Sea -->
            <g class="map-compass" transform="translate(240, 520)" opacity="0.6">
              <circle r="32" fill="none" stroke="#c5a059" stroke-width="0.8" stroke-dasharray="3,3" />
              <circle r="26" fill="none" stroke="#c5a059" stroke-width="0.5" />
              <polygon points="0,-24 4,-6 0,0 -4,-6" fill="#c5a059" />
              <polygon points="0,24 4,6 0,0 -4,6" fill="#64748b" />
              <polygon points="24,0 6,4 0,0 6,-4" fill="#64748b" />
              <polygon points="-24,0 -6,4 0,0 -6,-4" fill="#64748b" />
              <text x="-4" y="-28" fill="#c5a059" font-size="9" font-family="'Cinzel', serif" font-weight="bold">N</text>
            </g>

          </g>
        </svg>

        <!-- Floating Map HUD Controls -->
        <div class="map-hud-controls">
          <button class="map-ctrl-btn" id="map-zoom-in" title="Zoom In">+</button>
          <button class="map-ctrl-btn" id="map-zoom-out" title="Zoom Out">−</button>
          <button class="map-ctrl-btn" id="map-reset-view" title="Reset View">⤢</button>
          <div class="map-ctrl-divider"></div>
          <button class="map-ctrl-toggle active" id="toggle-trade" title="Toggle Ancient Highways & Sea Routes">Trade Corridors</button>
          <button class="map-ctrl-toggle active" id="toggle-topo" title="Toggle Mountains & Ghats">Topography</button>
        </div>
      </div>
    `;
  }

  renderTerritories() {
    return HISTORICAL_DATA.civilizations.map(civ => {
      const isSelected = civ.id === this.activeCivilizationId;
      const isVisible = (this.currentYear >= civ.startYear && this.currentYear <= civ.endYear);
      const opacity = isVisible ? (isSelected ? 0.45 : 0.22) : 0.04;
      const strokeOpacity = isVisible ? (isSelected ? 0.95 : 0.6) : 0.12;
      const strokeWidth = isSelected ? 2.5 : 1.2;

      let color = '#c5a059';
      if (civ.id === 'indus_valley') color = '#38bdf8';
      else if (civ.id === 'gupta') color = '#f59e0b';
      else if (civ.id === 'chola') color = '#e11d48';
      else if (civ.id === 'vijayanagara') color = '#eab308';
      else if (civ.id === 'maratha') color = '#f97316';
      else if (civ.id === 'mughal') color = '#10b981';
      else if (civ.id === 'sikh_empire') color = '#f59e0b';
      else if (civ.id === 'freedom_movement') color = '#3b82f6';

      return `
        <path id="territory-${civ.id}" 
          class="territory-poly ${isSelected ? 'active-territory' : ''}" 
          d="${civ.territoryPath || 'M 400 350 Q 450 350 450 400 Z'}"
          fill="${color}"
          fill-opacity="${opacity}"
          stroke="${color}"
          stroke-opacity="${strokeOpacity}"
          stroke-width="${strokeWidth}"
          filter="${isSelected ? 'url(#gold-glow)' : 'none'}"
          data-id="${civ.id}"
        />
      `;
    }).join("");
  }

  renderMarkers() {
    return HISTORICAL_DATA.civilizations.map(civ => {
      const isSelected = civ.id === this.activeCivilizationId;
      const isVisible = (this.currentYear >= civ.startYear && this.currentYear <= civ.endYear);

      return `
        <g class="civ-marker-node ${isSelected ? 'selected' : ''} ${isVisible ? 'active-era' : 'dimmed-era'}"
           id="marker-${civ.id}" 
           transform="translate(${civ.coords.x}, ${civ.coords.y})"
           data-id="${civ.id}"
           style="cursor: pointer;">
          
          <!-- Outer Pulsing Ring -->
          <circle class="marker-pulse-ring" r="${isSelected ? 20 : 14}" fill="none" 
                  stroke="${isSelected ? '#f59e0b' : '#c5a059'}" stroke-width="1.5" opacity="0.6" />

          <!-- Core Pin -->
          <circle class="marker-core" r="${isSelected ? 8 : 6}" fill="#0f141c" 
                  stroke="${isSelected ? '#f59e0b' : '#c5a059'}" stroke-width="2" />
          
          <circle r="${isSelected ? 4 : 2.5}" fill="${isSelected ? '#f59e0b' : '#e2c174'}" />

          <!-- Label -->
          <g class="marker-label-group" transform="translate(0, ${isSelected ? -16 : -13})">
            <rect x="-60" y="-11" width="120" height="17" rx="4" 
                  fill="#0b0e14" fill-opacity="0.88" stroke="${isSelected ? '#f59e0b' : '#334155'}" stroke-width="1" />
            <text text-anchor="middle" y="0" fill="${isSelected ? '#fde68a' : '#cbd5e1'}" 
                  font-size="8.5" font-family="'Plus Jakarta Sans', sans-serif" font-weight="${isSelected ? '700' : '500'}">
              ${civ.name.length > 20 ? civ.name.substring(0, 18) + '...' : civ.name}
            </text>
          </g>
        </g>
      `;
    }).join("");
  }

  bindEvents() {
    const svg = document.getElementById('asia-map-svg');
    const transformGroup = document.getElementById('map-transform-group');

    const updateTransform = () => {
      if (transformGroup) {
        transformGroup.setAttribute('transform', `translate(${this.panX}, ${this.panY}) scale(${this.currentScale})`);
      }
    };

    document.getElementById('map-zoom-in')?.addEventListener('click', () => {
      this.currentScale = Math.min(this.currentScale + 0.25, 2.5);
      updateTransform();
    });

    document.getElementById('map-zoom-out')?.addEventListener('click', () => {
      this.currentScale = Math.max(this.currentScale - 0.25, 0.75);
      updateTransform();
    });

    document.getElementById('map-reset-view')?.addEventListener('click', () => {
      this.currentScale = 1;
      this.panX = 0;
      this.panY = 0;
      updateTransform();
    });

    // Toggle Highways & Topo
    const tradeBtn = document.getElementById('toggle-trade');
    const tradeGroup = document.getElementById('map-trade-routes');
    tradeBtn?.addEventListener('click', () => {
      this.showTradeRoutes = !this.showTradeRoutes;
      tradeBtn.classList.toggle('active', this.showTradeRoutes);
      if (tradeGroup) tradeGroup.style.display = this.showTradeRoutes ? 'block' : 'none';
    });

    const topoBtn = document.getElementById('toggle-topo');
    const topoGroup = document.getElementById('map-topography');
    topoBtn?.addEventListener('click', () => {
      this.showTopography = !this.showTopography;
      topoBtn.classList.toggle('active', this.showTopography);
      if (topoGroup) topoGroup.style.display = this.showTopography ? 'block' : 'none';
    });

    // Panning
    if (svg) {
      svg.addEventListener('mousedown', (e) => {
        if (e.target.closest('.civ-marker-node') || e.target.closest('.territory-poly') || e.target.closest('.event-highlight-node')) return;
        this.isPanning = true;
        this.startX = e.clientX - this.panX;
        this.startY = e.clientY - this.panY;
        svg.style.cursor = 'grabbing';
      });

      window.addEventListener('mousemove', (e) => {
        if (!this.isPanning) return;
        this.panX = e.clientX - this.startX;
        this.panY = e.clientY - this.startY;
        updateTransform();
      });

      window.addEventListener('mouseup', () => {
        this.isPanning = false;
        if (svg) svg.style.cursor = 'grab';
      });
    }

    // Click Handlers
    this.rebindMarkersAndTerritories();

    // Kalinga battlefield pin click
    const kalingaNode = this.container.querySelector('.event-highlight-node');
    kalingaNode?.addEventListener('click', () => {
      if (window.appRouter) {
        window.appRouter.navigate('event', { eventId: 'kalinga-war' });
      }
    });
  }

  rebindMarkersAndTerritories() {
    this.container.querySelectorAll('.civ-marker-node, .territory-poly').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-id');
        if (id) {
          this.selectCivilization(id);
        }
      });
    });
  }

  selectCivilization(civId) {
    this.activeCivilizationId = civId;
    const civ = HISTORICAL_DATA.civilizations.find(c => c.id === civId);
    if (!civ) return;

    // Center map smoothly towards selected civilization
    this.panX = (500 - civ.coords.x) * 0.5;
    this.panY = (340 - civ.coords.y) * 0.5;
    const transformGroup = document.getElementById('map-transform-group');
    if (transformGroup) {
      transformGroup.setAttribute('transform', `translate(${this.panX}, ${this.panY}) scale(${this.currentScale})`);
    }

    const territoriesGroup = document.getElementById('map-territories');
    if (territoriesGroup) territoriesGroup.innerHTML = this.renderTerritories();

    const markersGroup = document.getElementById('map-markers');
    if (markersGroup) markersGroup.innerHTML = this.renderMarkers();

    this.rebindMarkersAndTerritories();

    if (this.onSelect) {
      this.onSelect(civ);
    }
  }

  setYear(year) {
    this.currentYear = year;
    const territoriesGroup = document.getElementById('map-territories');
    if (territoriesGroup) territoriesGroup.innerHTML = this.renderTerritories();

    const markersGroup = document.getElementById('map-markers');
    if (markersGroup) markersGroup.innerHTML = this.renderMarkers();

    this.rebindMarkersAndTerritories();
  }
}

window.AsiaMapEngine = AsiaMapEngine;
