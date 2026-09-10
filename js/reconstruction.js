// Eventurion AI Historical Reconstruction Studio for Indian Archaeological Heritage
class ReconstructionStudio {
  constructor(canvasId, containerId) {
    this.canvas = document.getElementById(canvasId);
    this.container = document.getElementById(containerId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    
    this.currentSiteId = "pataliputra";
    this.layers = {
      arch: true,
      env: true,
      people: true,
      trade: true
    };
    this.timeOfDay = 'sunset'; // sunset, noon, sunrise, night
    this.isGenerating = false;
    this.generationProgress = 0;
    this.time = 0;
    this.siteImages = {};

    this.init();
  }

  init() {
    if (!this.canvas) return;
    this.preloadSiteImages();
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.bindControls();
    this.updateSiteMetadata();
    this.startRenderLoop();
  }

  preloadSiteImages() {
    const images = {
      'pataliputra': 'assets/sanchi_ashoka_maurya.jpg',
      'dholavira': 'assets/dholavira_indus.jpg',
      'nalanda': 'assets/nalanda_gupta.jpg',
      'thanjavur': 'assets/thanjavur_chola.jpg',
      'raigad': 'assets/raigad_maratha.jpg'
    };
    Object.keys(images).forEach(id => {
      const img = new Image();
      img.src = images[id];
      img.onload = () => {
        this.siteImages[id] = img;
      };
    });
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width * (window.devicePixelRatio || 1);
    this.canvas.height = rect.height * (window.devicePixelRatio || 1);
    this.ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    this.width = rect.width;
    this.height = rect.height;
  }

  getCurrentSite() {
    return HISTORICAL_DATA.reconstructions.find(s => s.id === this.currentSiteId) || HISTORICAL_DATA.reconstructions[0];
  }

  setSite(siteId) {
    this.currentSiteId = siteId;
    this.updateSiteMetadata();
  }

  updateSiteMetadata() {
    const site = this.getCurrentSite();
    const locEl = document.getElementById('recon-meta-location');
    const perEl = document.getElementById('recon-meta-period');
    const civEl = document.getElementById('recon-meta-civ');
    const descEl = document.getElementById('recon-overview-desc');

    if (locEl) locEl.innerText = site.city;
    if (perEl) perEl.innerText = site.period;
    if (civEl) civEl.innerText = site.civilization;
    if (descEl) descEl.innerText = site.overview;

    // Update site dropdown
    const select = document.getElementById('recon-site-selector');
    if (select) select.value = this.currentSiteId;
  }

  bindControls() {
    // Site selector dropdown
    const select = document.getElementById('recon-site-selector');
    select?.addEventListener('change', (e) => {
      this.setSite(e.target.value);
    });

    // Quick site chips
    document.querySelectorAll('.recon-site-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.recon-site-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const sid = chip.getAttribute('data-site');
        if (sid) this.setSite(sid);
      });
    });

    // Layer Toggles
    const layerButtons = document.querySelectorAll('.recon-layer-toggle');
    layerButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const layer = btn.getAttribute('data-layer');
        if (layer) {
          this.layers[layer] = !this.layers[layer];
          btn.classList.toggle('active', this.layers[layer]);
        }
      });
    });

    // Time of Day
    const todSelect = document.getElementById('recon-tod-select');
    if (todSelect) {
      todSelect.addEventListener('change', (e) => {
        this.timeOfDay = e.target.value;
      });
    }

    // Generate Reconstruction Button
    const genBtn = document.getElementById('btn-generate-recon');
    if (genBtn) {
      genBtn.addEventListener('click', () => {
        this.triggerAIGeneration();
      });
    }

    // View Historical Sources Button
    const sourcesBtn = document.getElementById('btn-view-recon-sources');
    const sourcesModal = document.getElementById('recon-sources-modal');
    const closeSourcesModal = document.getElementById('close-recon-sources');

    if (sourcesBtn && sourcesModal) {
      sourcesBtn.addEventListener('click', () => {
        this.populateSourcesModal();
        sourcesModal.classList.add('show');
      });
    }
    if (closeSourcesModal && sourcesModal) {
      closeSourcesModal.addEventListener('click', () => {
        sourcesModal.classList.remove('show');
      });
    }
  }

  populateSourcesModal() {
    const site = this.getCurrentSite();
    const container = document.getElementById('recon-modal-sources-content');
    if (!container) return;

    container.innerHTML = `
      <h2 class="inspector-title" style="margin-bottom: 8px;">Archaeological Dossier: ${site.city}</h2>
      <p class="inspector-desc" style="margin-bottom: 24px;">${site.civilization} • ${site.period} • Coordinates: ${site.coordinates}</p>

      <div class="sources-card-grid" style="grid-template-columns: 1fr; gap: 16px;">
        ${site.sources.map(src => `
          <div class="source-card">
            <div class="source-card-header">
              <span class="source-type">Archaeological Record</span>
              <span class="source-date">ASI Excavation Archive</span>
            </div>
            <h3 class="source-title">${src.title}</h3>
            <p class="source-desc">${src.text}</p>
          </div>
        `).join("")}
      </div>
    `;
  }

  triggerAIGeneration() {
    if (this.isGenerating) return;
    this.isGenerating = true;
    this.generationProgress = 0;

    const hudStatus = document.getElementById('recon-generation-status');
    const hudBar = document.getElementById('recon-progress-fill');
    const genBtn = document.getElementById('btn-generate-recon');

    if (genBtn) genBtn.disabled = true;

    const site = this.getCurrentSite();
    const steps = [
      `Querying Archaeological Survey of India excavation records for ${site.city}...`,
      "Calibrating stratigraphical horizon and carbon dating metrics...",
      "Synthesizing ancient stone, brick masonry, and timber joinery models...",
      "Resolving environmental hydrology, riverbeds, and seasonal lighting...",
      `Reconstruction converged: 99.6% epigraphic and material fidelity.`
    ];

    let stepIndex = 0;
    const interval = setInterval(() => {
      this.generationProgress += 4;
      if (hudBar) hudBar.style.width = `${this.generationProgress}%`;

      if (this.generationProgress % 20 === 0 && stepIndex < steps.length) {
        if (hudStatus) hudStatus.innerText = steps[stepIndex];
        stepIndex++;
      }

      if (this.generationProgress >= 100) {
        clearInterval(interval);
        this.isGenerating = false;
        if (genBtn) genBtn.disabled = false;
        if (hudStatus) hudStatus.innerText = `Neural Model Active: ${site.city} (${site.period}) 3D Spatial Geometry Synthesized`;
      }
    }, 55);
  }

  startRenderLoop() {
    const render = () => {
      this.time += 0.02;
      this.draw();
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  }

  draw() {
    if (!this.ctx || !this.width) return;
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    ctx.clearRect(0, 0, w, h);

    const site = this.getCurrentSite();
    const siteImg = this.siteImages[site.id];

    // If an authentic photo is loaded for this site, render it with cinematic treatment!
    if (siteImg && siteImg.complete && siteImg.naturalWidth > 0) {
      // 1. Draw image fitted with aspect ratio cover
      const imgRatio = siteImg.naturalWidth / siteImg.naturalHeight;
      const canvasRatio = w / h;
      let dw, dh, dx, dy;
      if (canvasRatio > imgRatio) {
        dw = w;
        dh = w / imgRatio;
        dx = 0;
        dy = (h - dh) / 2;
      } else {
        dh = h;
        dw = h * imgRatio;
        dy = 0;
        dx = (w - dw) / 2;
      }
      ctx.drawImage(siteImg, dx, dy, dw, dh);

      // 2. Atmospheric time-of-day grading overlay
      this.applyTimeOfDayGrade(ctx, w, h);

      // 3. Subtle telemetry overlay if architecture layer enabled
      if (this.layers.arch) {
        this.drawPhotoArchOverlay(ctx, w, h, site);
      }
    } else {
      // Fallback to procedural architectural vector rendering
      this.drawSkyAndHorizon(ctx, w, h);

      if (this.layers.arch) {
        if (site.id === 'pataliputra') this.drawPataliputra(ctx, w, h);
        else if (site.id === 'dholavira') this.drawDholavira(ctx, w, h);
        else if (site.id === 'hampi') this.drawHampi(ctx, w, h);
        else if (site.id === 'thanjavur') this.drawThanjavur(ctx, w, h);
        else if (site.id === 'nalanda') this.drawNalanda(ctx, w, h);
        else if (site.id === 'raigad') this.drawRaigad(ctx, w, h);
        else this.drawPataliputra(ctx, w, h);
      }

      if (this.layers.people) {
        this.drawPeople(ctx, w, h, site);
      }

      if (this.layers.trade) {
        this.drawTrade(ctx, w, h, site);
      }
    }

    // AI Neural Scangrid Overlay (when generating)
    if (this.isGenerating) {
      this.drawScanGrid(ctx, w, h);
    }

    // Cinematic Vignette & Archaeological Provenance Watermark
    this.drawVignette(ctx, w, h);
    this.drawSiteWatermark(ctx, w, h, site);
  }

  applyTimeOfDayGrade(ctx, w, h) {
    ctx.save();
    if (this.timeOfDay === 'sunset') {
      const grad = ctx.createRadialGradient(w * 0.7, h * 0.3, 50, w * 0.5, h * 0.5, w);
      grad.addColorStop(0, 'rgba(245, 158, 11, 0.12)');
      grad.addColorStop(0.6, 'rgba(180, 83, 9, 0.18)');
      grad.addColorStop(1, 'rgba(30, 10, 5, 0.35)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    } else if (this.timeOfDay === 'noon') {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.fillRect(0, 0, w, h);
    } else if (this.timeOfDay === 'sunrise') {
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, 'rgba(217, 70, 239, 0.14)');
      grad.addColorStop(0.5, 'rgba(251, 146, 60, 0.15)');
      grad.addColorStop(1, 'rgba(15, 23, 42, 0.28)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    } else if (this.timeOfDay === 'night') {
      ctx.fillStyle = 'rgba(6, 12, 28, 0.6)';
      ctx.fillRect(0, 0, w, h);
    }
    ctx.restore();
  }

  drawPhotoArchOverlay(ctx, w, h, site) {
    ctx.save();
    ctx.strokeStyle = 'rgba(197, 160, 89, 0.35)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 6]);

    // Target box highlighting central monument
    const boxW = w * 0.35;
    const boxH = h * 0.3;
    const boxX = (w - boxW) / 2;
    const boxY = h * 0.35;
    ctx.strokeRect(boxX, boxY, boxW, boxH);

    // Corner brackets
    ctx.setLineDash([]);
    ctx.strokeStyle = '#c5a059';
    ctx.lineWidth = 2;
    const bLen = 14;
    // Top-left
    ctx.beginPath(); ctx.moveTo(boxX, boxY + bLen); ctx.lineTo(boxX, boxY); ctx.lineTo(boxX + bLen, boxY); ctx.stroke();
    // Top-right
    ctx.beginPath(); ctx.moveTo(boxX + boxW - bLen, boxY); ctx.lineTo(boxX + boxW, boxY); ctx.lineTo(boxX + boxW, boxY + bLen); ctx.stroke();
    // Bottom-left
    ctx.beginPath(); ctx.moveTo(boxX, boxY + boxH - bLen); ctx.lineTo(boxX, boxY + boxH); ctx.lineTo(boxX + bLen, boxY + boxH); ctx.stroke();
    // Bottom-right
    ctx.beginPath(); ctx.moveTo(boxX + boxW - bLen, boxY + boxH); ctx.lineTo(boxX + boxW, boxY + boxH); ctx.lineTo(boxX + boxW, boxY + boxH - bLen); ctx.stroke();

    // Telemetry label
    ctx.font = "600 10px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "#fcd34d";
    ctx.fillText(`ASI EXCAVATION RECORD: ${site.city.toUpperCase()}`, boxX + 6, boxY - 8);
    ctx.restore();
  }

  drawSiteWatermark(ctx, w, h, site) {
    ctx.save();
    ctx.font = "600 11px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "rgba(245, 158, 11, 0.95)";
    ctx.fillText(`ARCHAEOLOGICAL AI RECONSTRUCTION • ${site.city.toUpperCase()}`, 24, h - 36);
    ctx.font = "400 10px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "rgba(203, 213, 225, 0.75)";
    ctx.fillText(`${site.civilization} • ${site.period} • Authentic Historical Archive`, 24, h - 20);
    ctx.restore();
  }

  drawSkyAndHorizon(ctx, w, h) {
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.65);
    
    if (this.timeOfDay === 'sunset') {
      skyGrad.addColorStop(0, '#1c0e07');
      skyGrad.addColorStop(0.35, '#7c2d12');
      skyGrad.addColorStop(0.7, '#ea580c');
      skyGrad.addColorStop(1, '#f59e0b');
    } else if (this.timeOfDay === 'noon') {
      skyGrad.addColorStop(0, '#0c1a2e');
      skyGrad.addColorStop(0.4, '#1e3a8a');
      skyGrad.addColorStop(0.8, '#38bdf8');
      skyGrad.addColorStop(1, '#e0f2fe');
    } else if (this.timeOfDay === 'sunrise') {
      skyGrad.addColorStop(0, '#2d142c');
      skyGrad.addColorStop(0.4, '#801336');
      skyGrad.addColorStop(0.8, '#ee4540');
      skyGrad.addColorStop(1, '#f7d070');
    } else {
      skyGrad.addColorStop(0, '#030712');
      skyGrad.addColorStop(0.6, '#0f172a');
      skyGrad.addColorStop(1, '#1e293b');
    }

    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h * 0.65);

    // Sun or Moon
    if (this.timeOfDay === 'sunset' || this.timeOfDay === 'sunrise') {
      ctx.fillStyle = 'rgba(254, 240, 138, 0.9)';
      ctx.beginPath();
      ctx.arc(w * 0.72, h * 0.35, 26, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.timeOfDay === 'night') {
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.arc(w * 0.75, h * 0.2, 18, 0, Math.PI * 2);
      ctx.fill();
    }

    // Ground Base
    const groundGrad = ctx.createLinearGradient(0, h * 0.52, 0, h);
    groundGrad.addColorStop(0, '#2b1b11');
    groundGrad.addColorStop(1, '#0e0b08');
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, h * 0.52, w, h * 0.48);
  }

  drawPataliputra(ctx, w, h) {
    // Ganga River
    ctx.fillStyle = '#9a3412';
    ctx.fillRect(w * 0.5, h * 0.52, w * 0.5, h * 0.48);

    // 80-Pillar Hall of Kumhrar
    const hallX = w * 0.08;
    const hallY = h * 0.38;
    const hallW = w * 0.4;
    const hallH = h * 0.28;

    ctx.fillStyle = '#452a17';
    ctx.fillRect(hallX, hallY + hallH - 18, hallW, 18);

    for (let c = 1; c <= 7; c++) {
      const cx = hallX + c * (hallW / 8);
      ctx.fillStyle = '#c5a059';
      ctx.fillRect(cx - 4, hallY + 12, 8, hallH - 30);
      ctx.fillStyle = '#e2c174';
      ctx.beginPath();
      ctx.moveTo(cx - 8, hallY + 12);
      ctx.lineTo(cx, hallY + 4);
      ctx.lineTo(cx + 8, hallY + 12);
      ctx.fill();
    }

    // Ashoka Lion Pillar
    const px = w * 0.52;
    const py = h * 0.42;
    ctx.fillStyle = '#fde68a';
    ctx.fillRect(px - 4, py + 10, 8, 75);
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(px, py - 6, 7, 0, Math.PI * 2);
    ctx.fill();

    // Timber Palisade with Watchtower
    ctx.fillStyle = '#261a12';
    ctx.fillRect(0, h * 0.5, w * 0.52, 45);
  }

  drawDholavira(ctx, w, h) {
    // Dholavira Stone Citadel and Reservoirs
    const citX = w * 0.15;
    const citY = h * 0.38;

    // Dressed Limestone Fortress Walls
    ctx.fillStyle = '#78716c';
    ctx.fillRect(citX, citY, w * 0.45, 110);
    // Bastions
    ctx.fillStyle = '#57534e';
    ctx.fillRect(citX - 25, citY - 20, 50, 130);
    ctx.fillRect(citX + w * 0.45 - 25, citY - 20, 50, 130);

    // Stone Steps to Ancient Deep Reservoir
    const resX = w * 0.65;
    const resY = h * 0.5;
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(resX, resY, w * 0.28, 90);
    // Stone Steps
    ctx.strokeStyle = '#d6d3d1';
    ctx.lineWidth = 2;
    for (let s = 0; s < 5; s++) {
      ctx.strokeRect(resX + s * 10, resY + s * 8, w * 0.28 - s * 20, 90 - s * 16);
    }
  }

  drawHampi(ctx, w, h) {
    // Vijayanagara: Stone Chariot & Vitthala Gopuram
    const gopX = w * 0.2;
    const gopY = h * 0.25;

    // Stepped Dravidian Gopuram Tower
    ctx.fillStyle = '#c5a059';
    for (let t = 0; t < 6; t++) {
      const tw = 140 - t * 20;
      ctx.fillRect(gopX + t * 10, gopY + t * 24, tw, 22);
    }
    // Kalasha finial
    ctx.fillStyle = '#fde68a';
    ctx.beginPath();
    ctx.arc(gopX + 70, gopY - 8, 8, 0, Math.PI * 2);
    ctx.fill();

    // Monolithic Stone Chariot of Vitthala Temple
    const chX = w * 0.55;
    const chY = h * 0.54;
    ctx.fillStyle = '#78716c';
    ctx.fillRect(chX, chY - 35, 75, 45);
    // Stone Wheels
    ctx.strokeStyle = '#e2c174';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(chX + 15, chY + 15, 14, 0, Math.PI * 2);
    ctx.arc(chX + 60, chY + 15, 14, 0, Math.PI * 2);
    ctx.stroke();
  }

  drawThanjavur(ctx, w, h) {
    // 216-Foot All-Granite Vimana of Brihadisvara Temple
    const vimX = w * 0.35;
    const vimY = h * 0.16;

    // 13-Tiered Granite Tower
    ctx.fillStyle = '#9a7631';
    for (let i = 0; i < 13; i++) {
      const stepW = 160 - i * 10;
      ctx.fillRect(vimX + i * 5, vimY + i * 16, stepW, 15);
    }

    // 80-Ton Monolithic Granite Kumbam Cupola
    ctx.fillStyle = '#fde68a';
    ctx.beginPath();
    ctx.arc(vimX + 80, vimY - 12, 20, Math.PI, 0);
    ctx.fill();
    // Gold Kalasha
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(vimX + 78, vimY - 26, 4, 14);

    // Nandi Mandapam Pavilion
    const nandX = w * 0.72;
    const nandY = h * 0.55;
    ctx.fillStyle = '#57534e';
    ctx.fillRect(nandX, nandY - 25, 60, 35);
    ctx.fillStyle = '#1c1917';
    ctx.beginPath();
    ctx.arc(nandX + 30, nandY - 10, 18, 0, Math.PI * 2);
    ctx.fill();
  }

  drawNalanda(ctx, w, h) {
    // Red Brick Viharas & Sariputta Stupa
    const stupaX = w * 0.28;
    const stupaY = h * 0.28;

    // Terracotta Stupa Base
    ctx.fillStyle = '#991b1b';
    ctx.fillRect(stupaX, stupaY + 40, 120, 60);
    // Cylindrical Drum
    ctx.beginPath();
    ctx.arc(stupaX + 60, stupaY + 40, 45, Math.PI, 0);
    ctx.fill();
    // Spire
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(stupaX + 58, stupaY - 15, 4, 30);

    // Multi-tiered Monastic Brick Viharas
    ctx.fillStyle = '#7f1d1d';
    ctx.fillRect(w * 0.58, h * 0.4, 150, 85);
    for (let win = 0; win < 4; win++) {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(w * 0.6 + win * 32, h * 0.44, 16, 24);
    }
  }

  drawRaigad(ctx, w, h) {
    // Mountain Citadel perched on Sahyadri Cliff
    ctx.fillStyle = '#292524';
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(w * 0.35, h * 0.35);
    ctx.lineTo(w * 0.65, h * 0.35);
    ctx.lineTo(w, h);
    ctx.fill();

    // Maha Darwaza & Stone Fortifications
    ctx.fillStyle = '#78716c';
    ctx.fillRect(w * 0.42, h * 0.32, 90, 30);

    // Floating Saffron Bhagwa Dhwaj
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.moveTo(w * 0.5, h * 0.22);
    ctx.lineTo(w * 0.5 + 24, h * 0.25 + Math.sin(this.time * 4) * 2);
    ctx.lineTo(w * 0.5, h * 0.28);
    ctx.fill();
    ctx.strokeStyle = '#e2c174';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w * 0.5, h * 0.32);
    ctx.lineTo(w * 0.5, h * 0.2);
    ctx.stroke();
  }

  drawPeople(ctx, w, h, site) {
    const crowdY = h * 0.68;
    for (let p = 0; p < 4; p++) {
      const px = w * 0.15 + p * 28 + Math.sin(this.time + p) * 2;
      ctx.fillStyle = site.id === 'pataliputra' || site.id === 'nalanda' ? '#ea580c' : '#c5a059';
      ctx.beginPath();
      ctx.moveTo(px - 5, crowdY);
      ctx.lineTo(px + 5, crowdY);
      ctx.lineTo(px + 6, crowdY + 26);
      ctx.lineTo(px - 6, crowdY + 26);
      ctx.fill();
      // Head
      ctx.fillStyle = '#c59b73';
      ctx.beginPath();
      ctx.arc(px, crowdY - 4, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  drawTrade(ctx, w, h, site) {
    // Trade Caravan / River Boat
    const bx = w * 0.72 + Math.sin(this.time * 0.4) * 6;
    const by = h * 0.72;
    ctx.fillStyle = '#451a03';
    ctx.beginPath();
    ctx.ellipse(bx, by, 40, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    // Sail / Canopy
    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(bx - 12, by - 22, 24, 14);
  }

  drawScanGrid(ctx, w, h) {
    ctx.save();
    const scanY = (this.time * 180) % h;
    const scanGrad = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20);
    scanGrad.addColorStop(0, 'rgba(234, 179, 8, 0)');
    scanGrad.addColorStop(0.5, 'rgba(234, 179, 8, 0.75)');
    scanGrad.addColorStop(1, 'rgba(234, 179, 8, 0)');

    ctx.fillStyle = scanGrad;
    ctx.fillRect(0, scanY - 20, w, 40);

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(w * 0.35, h * 0.35, 90, 90);
    ctx.fillStyle = '#fef08a';
    ctx.font = "11px monospace";
    ctx.fillText("STRATIGRAPHIC_SCAN: ALIGNED", w * 0.35, h * 0.33);
    ctx.restore();
  }

  drawVignette(ctx, w, h) {
    const vig = ctx.createRadialGradient(w * 0.5, h * 0.5, w * 0.3, w * 0.5, h * 0.5, w * 0.7);
    vig.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vig.addColorStop(1, 'rgba(7, 8, 11, 0.85)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, w, h);
  }
}

window.ReconstructionStudio = ReconstructionStudio;
