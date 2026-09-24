/**
 * CAVEIRA HUB // CORE APP ENGINE
 * Tactical Command & Project Dashboard - Red Matrix Edition
 */

// Obfuscated Stream Link
const _EP = atob("aHR0cHM6Ly90Z3Rsd3hmcm94eGhvYXptbG1hdC5zdXBhYmFzZS5jbw==");
const _AK = atob("c2JfcHVibGlzaGFibGVfbU50VHZQNld1WHNkVUJJTDl0QUxTUV9RaFJOeFpKRg==");

// Default Seed Projects (Fallback de contingência)
const DEFAULT_PROJECTS = [
  {
    id: "proj_01",
    title: "SENTINEL SHIELD",
    codename: "OP-SEC-01",
    description: "Firewall e monitor de tráfego de rede com detecção ativa de anomalias em tempo real e regras dinâmicas de contenção.",
    category: "security",
    status: "live",
    progress: 100,
    techs: ["Node.js", "Express", "Redis", "JWT", "Docker", "Socket.io"],
    liveUrl: "https://github.com",
    repoUrl: "https://github.com",
    docUrl: "",
    iconEmoji: "🛡️",
    pinned: true,
    createdAt: 1711200000000
  },
  {
    id: "proj_02",
    title: "GHOST PROTOCOL API",
    codename: "OP-NET-09",
    description: "Microserviço distribuído de alta vazão para orquestração de transações criptografadas e mensageria assíncrona.",
    category: "backend",
    status: "live",
    progress: 100,
    techs: ["Go", "GraphQL", "PostgreSQL", "Kafka", "gRPC"],
    liveUrl: "https://github.com",
    repoUrl: "https://github.com",
    docUrl: "",
    iconEmoji: "👻",
    pinned: true,
    createdAt: 1711280000000
  },
  {
    id: "proj_03",
    title: "VIPER DISCORD BOT",
    codename: "OP-BOT-04",
    description: "Bot automatizado com inteligência para moderação de servidores, logs de auditoria, integrações com webhooks e controle de cargos.",
    category: "bot",
    status: "live",
    progress: 95,
    techs: ["Python", "FastAPI", "Discord.py", "Celery", "Postgres"],
    liveUrl: "https://discord.com",
    repoUrl: "https://github.com",
    docUrl: "",
    iconEmoji: "🐍",
    pinned: false,
    createdAt: 1711360000000
  },
  {
    id: "proj_04",
    title: "SHADOW HUD COMMAND",
    codename: "OP-UI-12",
    description: "Painel web tático responsivo para monitoramento de servidores remotos, status de microserviços e métricas de desempenho.",
    category: "web",
    status: "dev",
    progress: 75,
    techs: ["React", "TypeScript", "Vite", "TailwindCSS", "Recharts"],
    liveUrl: "https://github.com",
    repoUrl: "https://github.com",
    docUrl: "",
    iconEmoji: "⚡",
    pinned: true,
    createdAt: 1711450000000
  },
  {
    id: "proj_05",
    title: "TITAN METRICS AGENT",
    codename: "OP-TOOL-07",
    description: "CLI e utilitário local para telemetria de processos, análise de logs de segurança e testes de latência de endpoints.",
    category: "tool",
    status: "dev",
    progress: 60,
    techs: ["Rust", "Clap", "Tokio", "SQLite"],
    liveUrl: "",
    repoUrl: "https://github.com",
    docUrl: "",
    iconEmoji: "⚙️",
    pinned: false,
    createdAt: 1711520000000
  },
  {
    id: "proj_06",
    title: "RECON MOBILE SUITE",
    codename: "OP-MOB-02",
    description: "Aplicativo mobile para controle remoto de instâncias, visualização de logs operacionais e recebimento de alertas push críticos.",
    category: "mobile",
    status: "soon",
    progress: 25,
    techs: ["React Native", "Expo", "TypeScript", "Firebase"],
    liveUrl: "",
    repoUrl: "https://github.com",
    docUrl: "",
    iconEmoji: "📱",
    pinned: false,
    createdAt: 1711600000000
  }
];

// Storage Keys
const STORAGE_KEY = "caveira_hub_projects_v1";
const THEME_KEY = "caveira_hub_theme";
const SOUND_KEY = "caveira_hub_sound";
const VIEW_KEY = "caveira_hub_view";
const VIEWS_KEY = "caveira_hub_project_views";

// Audio Synthesizer via Web Audio API
class SoundFX {
  constructor() {
    this.enabled = localStorage.getItem(SOUND_KEY) !== "false";
    this.ctx = null;
  }

  initCtx() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }

  playClick() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") this.ctx.resume();

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {}
  }

  playSuccess() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") this.ctx.resume();

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.setValueAtTime(880, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.16);
    } catch (e) {}
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem(SOUND_KEY, this.enabled);
    return this.enabled;
  }
}

// ========================================================
// MATRIX DIGITAL RAIN ENGINE (HTML5 CANVAS)
// Dynamic Red Rain / Cyber Katakana & Hex Stream
// ========================================================
class MatrixRain {
  constructor(canvasId = "matrixCanvas") {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.characters = "0123456789ABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜXYZ+-*/<>~!@#$%^&";
    this.fontSize = 15;
    this.columns = 0;
    this.drops = [];
    this.activeColor = "#ff003c";
    this.glowColor = "rgba(255, 0, 60, 0.7)";
    this.lastFrame = 0;
    this.fpsInterval = 1000 / 35;

    this.init();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);

    window.addEventListener("resize", () => this.resize());
  }

  setColor(hex, glow) {
    this.activeColor = hex;
    this.glowColor = glow;
  }

  init() {
    this.resize();
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.columns = Math.floor(this.canvas.width / this.fontSize);
    this.drops = [];
    for (let i = 0; i < this.columns; i++) {
      this.drops[i] = Math.floor(Math.random() * -60);
    }
  }

  animate(timestamp) {
    if (!this.ctx) return;

    requestAnimationFrame(this.animate);

    const elapsed = timestamp - this.lastFrame;
    if (elapsed < this.fpsInterval) return;
    this.lastFrame = timestamp - (elapsed % this.fpsInterval);

    // Semi-transparent fade layer to create trailing rain
    this.ctx.fillStyle = "rgba(4, 5, 7, 0.085)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.font = `${this.fontSize}px 'JetBrains Mono', monospace`;

    for (let i = 0; i < this.drops.length; i++) {
      const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
      const x = i * this.fontSize;
      const y = this.drops[i] * this.fontSize;

      const rnd = Math.random();
      // Preto e Vermelho: leading chars em vermelho vivo, trail em vermelho escuro/apagado
      if (rnd > 0.92) {
        // Cabeça da coluna: vermelho vivo brilhante
        this.ctx.fillStyle = "#ff003c";
        this.ctx.shadowBlur = 14;
        this.ctx.shadowColor = "rgba(255, 0, 60, 0.9)";
      } else if (rnd > 0.65) {
        // Trilha média: vermelho médio
        this.ctx.fillStyle = this.activeColor;
        this.ctx.shadowBlur = 4;
        this.ctx.shadowColor = this.glowColor;
      } else if (rnd > 0.30) {
        // Trilha fraca: vermelho escuro/vinho
        this.ctx.fillStyle = "#6b0018";
        this.ctx.shadowBlur = 0;
        this.ctx.shadowColor = "transparent";
      } else {
        // Rastro quase preto: muito escuro
        this.ctx.fillStyle = "#200008";
        this.ctx.shadowBlur = 0;
        this.ctx.shadowColor = "transparent";
      }

      this.ctx.fillText(text, x, y);
      this.ctx.shadowBlur = 0;

      if (y > this.canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }
      this.drops[i]++;
    }
  }
}

// ========================================================
// CYBERPUNK CURSOR PARTICLES ENGINE
// ========================================================
class CursorParticles {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.maxParticles = 60;
    this.mouse = { x: -100, y: -100 };

    this.resize();
    window.addEventListener("resize", () => this.resize());
    window.addEventListener("mousemove", (e) => this.onMouseMove(e));
    window.addEventListener("touchmove", (e) => this.onTouchMove(e), { passive: true });

    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  onMouseMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
    this.addParticle(e.clientX, e.clientY);
  }

  onTouchMove(e) {
    if (e.touches && e.touches[0]) {
      this.mouse.x = e.touches[0].clientX;
      this.mouse.y = e.touches[0].clientY;
      this.addParticle(e.touches[0].clientX, e.touches[0].clientY);
    }
  }

  addParticle(x, y) {
    if (this.particles.length > this.maxParticles) return;
    const speed = 1.6;
    const angle = Math.random() * Math.PI * 2;
    this.particles.push({
      x: x + (Math.random() - 0.5) * 6,
      y: y + (Math.random() - 0.5) * 6,
      vx: Math.cos(angle) * (Math.random() * speed),
      vy: Math.sin(angle) * (Math.random() * speed) - 0.4,
      size: Math.random() * 2.2 + 1,
      life: 1,
      decay: Math.random() * 0.035 + 0.02,
      color: Math.random() > 0.35 ? "#ff003c" : "#ff3366"
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;

      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = p.life;
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = "#ff003c";
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    requestAnimationFrame(this.animate);
  }
}

// App State
class CaveiraHubApp {
  constructor() {
    this.sound = new SoundFX();
    this.matrix = new MatrixRain("matrixCanvas");
    this.particles = new CursorParticles("particleCanvas");
    this.initPWA();
    this.remoteFeed = null;
    this.feedStream = null;
    this.isFeedLive = false;
    this.prevMetrics = { total: 0, live: 0, dev: 0, techs: 0 };

    this.filters = {
      search: "",
      status: "all",
      category: "all",
      sort: "recent",
      onlyPinned: false
    };
    this.viewMode = localStorage.getItem(VIEW_KEY) || "grid";

    // Initial local cache
    this.projects = this.loadLocalProjects();

    this.cacheDom();
    this.initTheme();
    this.initClock();
    this.bindEvents();
    this.render();

    // Start Silent Data Stream
    this.initDataStream();
  }

  cacheDom() {
    // Header & Telemetry
    this.hudClock = document.getElementById("hudClock");
    this.sysStatusText = document.getElementById("sysStatusText");

    // Metrics
    this.metricTotal = document.getElementById("metricTotal");
    this.metricLive = document.getElementById("metricLive");
    this.metricDev = document.getElementById("metricDev");
    this.metricTechs = document.getElementById("metricTechs");

    // Filters & Deck
    this.searchInput = document.getElementById("searchInput");
    this.btnClearSearch = document.getElementById("btnClearSearch");
    this.sortSelect = document.getElementById("sortSelect");
    this.viewGrid = document.getElementById("viewGrid");
    this.viewList = document.getElementById("viewList");
    this.chkOnlyPinned = document.getElementById("chkOnlyPinned");
    this.statusChips = document.querySelectorAll("#statusChips .filter-chip");
    this.categoryChips = document.querySelectorAll("#categoryChips .filter-chip");
    this.countAll = document.getElementById("countAll");
    this.countLive = document.getElementById("countLive");
    this.countDev = document.getElementById("countDev");
    this.countSoon = document.getElementById("countSoon");
    this.resultsCount = document.getElementById("resultsCount");

    // Projects Grid & Empty State
    this.projectsGrid = document.getElementById("projectsGrid");
    this.emptyState = document.getElementById("emptyState");
    this.emptyTitle = document.getElementById("emptyTitle");
    this.emptyDesc = document.getElementById("emptyDesc");
    this.btnResetFilters = document.getElementById("btnResetFilters");

    // Quick Data Tools
    this.btnDataTools = document.getElementById("btnDataTools");
    this.dataMenu = document.getElementById("dataMenu");
    this.btnExportJSON = document.getElementById("btnExportJSON");

    // Details Modal
    this.detailsModal = document.getElementById("detailsModal");
    this.detailsTitle = document.getElementById("detailsTitle");
    this.detailsBody = document.getElementById("detailsBody");
    this.btnCloseDetails = document.getElementById("btnCloseDetails");
  }

  // ========================================================
  // DATA FEED ENGINE (SILENT & ENCAPSULATED)
  // ========================================================
  async initDataStream() {
    if (window.supabase) {
      try {
        this.remoteFeed = window.supabase.createClient(_EP, _AK);
        await this.syncRemoteData();
      } catch (err) {
        this.setFeedStatus(false);
      }
    } else {
      this.setFeedStatus(false);
    }
  }

  setFeedStatus(live) {
    this.isFeedLive = live;
    if (this.sysStatusText) {
      this.sysStatusText.textContent = live ? "OPERACIONAL" : "LOCAL";
    }
  }

  async syncRemoteData() {
    if (!this.remoteFeed) return;

    if (this.projects.length === 0) {
      this.showSkeletons(6);
    }

    try {
      const { data, error } = await this.remoteFeed
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (Array.isArray(data)) {
        this.projects = data.map(item => ({
          id: String(item.id),
          title: item.title,
          codename: item.codename || "",
          description: item.description || "",
          category: item.category || "web",
          status: item.status || "live",
          progress: item.progress !== undefined ? item.progress : 100,
          techs: Array.isArray(item.techs) 
            ? item.techs 
            : (typeof item.techs === "string" 
                ? item.techs.replace(/[{}"']/g, "").split(",").map(t => t.trim()).filter(Boolean) 
                : []),
          liveUrl: item.live_url || "",
          repoUrl: item.repo_url || "",
          docUrl: item.doc_url || "",
          iconEmoji: item.icon_emoji || "💀",
          imageUrl: item.image_url || "",
          pinned: Boolean(item.pinned),
          createdAt: item.created_at ? new Date(item.created_at).getTime() : Date.now()
        }));

        this.setFeedStatus(true);
        this.render();

        // Realtime Subscription
        this.listenFeed();
      }
    } catch (err) {
      this.setFeedStatus(false);
    }
  }

  listenFeed() {
    if (!this.remoteFeed || this.feedStream) return;

    try {
      this.feedStream = this.remoteFeed
        .channel("feed:live")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "projects" },
          () => {
            this.sound.playSuccess();
            this.syncRemoteData();
          }
        )
        .subscribe();
    } catch (e) {}
  }

  // Progressive Web App Registration
  initPWA() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js")
          .catch(() => {});
      });
    }
  }

  // Views Tracking
  getProjectViews(id) {
    try {
      const raw = localStorage.getItem(VIEWS_KEY);
      const views = raw ? JSON.parse(raw) : {};
      return views[id] || 0;
    } catch (e) {
      return 0;
    }
  }

  incrementProjectViews(id) {
    try {
      const raw = localStorage.getItem(VIEWS_KEY);
      const views = raw ? JSON.parse(raw) : {};
      views[id] = (views[id] || 0) + 1;
      localStorage.setItem(VIEWS_KEY, JSON.stringify(views));
      const badge = document.querySelector(`.project-card[data-id="${id}"] .card-views-count`);
      if (badge) badge.textContent = views[id];
    } catch (e) {}
  }

  // Filter directly by clicked tech
  filterByTech(tech) {
    this.sound.playClick();
    this.searchInput.value = tech;
    this.filters.search = tech.toLowerCase();
    this.btnClearSearch.classList.remove("hidden");
    this.render();
    const target = document.getElementById("projectsSection") || this.projectsGrid;
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // Tactical animated count up
  animateValue(el, start, end, duration = 650) {
    if (!el) return;
    if (start === end) {
      el.textContent = end;
      return;
    }
    const range = end - start;
    const startTime = performance.now();
    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + range * ease);
      el.textContent = current;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = end;
      }
    };
    requestAnimationFrame(step);
  }

  // 3D Tilt on Cards (Desabilitado em telas touch para não interferir na rolagem)
  attachCardInteractions() {
    if (window.matchMedia("(hover: none)").matches) return;

    const cards = this.projectsGrid.querySelectorAll(".project-card:not(.skeleton-card)");
    cards.forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        card.style.transform = `perspective(700px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  // Skeleton Loading Display
  showSkeletons(count = 6) {
    let skeletons = "";
    for (let i = 0; i < count; i++) {
      skeletons += `
        <article class="project-card skeleton-card">
          <div class="card-header">
            <div class="card-title-group" style="width: 100%;">
              <div class="skeleton-shimmer skeleton-icon"></div>
              <div style="flex: 1;">
                <div class="skeleton-shimmer skeleton-text-sm"></div>
                <div class="skeleton-shimmer skeleton-text-md"></div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="skeleton-shimmer skeleton-desc"></div>
            <div class="skeleton-shimmer skeleton-desc-short"></div>
            <div class="skeleton-shimmer skeleton-progress"></div>
            <div style="display: flex; gap: 0.4rem; margin-top: 0.8rem;">
              <div class="skeleton-shimmer skeleton-tag"></div>
              <div class="skeleton-shimmer skeleton-tag"></div>
              <div class="skeleton-shimmer skeleton-tag"></div>
            </div>
          </div>
          <div class="card-footer">
            <div class="skeleton-shimmer skeleton-btn"></div>
            <div class="skeleton-shimmer skeleton-btn"></div>
          </div>
        </article>
      `;
    }
    this.projectsGrid.innerHTML = skeletons;
  }

  // ========================================================
  // LOCAL CACHE FALLBACK
  // ========================================================
  loadLocalProjects() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [...DEFAULT_PROJECTS];
    }
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...DEFAULT_PROJECTS];
    } catch (e) {
      return [...DEFAULT_PROJECTS];
    }
  }

  // Clock Telemetry
  initClock() {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      if (this.hudClock) {
        this.hudClock.textContent = `${h}:${m}:${s} BRT`;
      }
    };
    updateTime();
    setInterval(updateTime, 1000);
  }

  // Color Palette Theme
  initTheme() {
    let savedTheme = localStorage.getItem(THEME_KEY) || "matrix-red";
    // Force red theme — override legacy amber saves
    if (savedTheme === "amber") savedTheme = "matrix-red";
    this.setTheme(savedTheme);
  }

  setTheme(themeName) {
    document.body.className = `theme-${themeName}`;
    localStorage.setItem(THEME_KEY, themeName);

    // Synchronize Matrix Rain colors
    if (this.matrix) {
      if (themeName === "matrix-red" || themeName === "crimson") {
        this.matrix.setColor("#ff003c", "rgba(255, 0, 60, 0.7)");
      } else if (themeName === "cyan") {
        this.matrix.setColor("#00f0ff", "rgba(0, 240, 255, 0.7)");
      } else if (themeName === "emerald") {
        this.matrix.setColor("#00ff66", "rgba(0, 255, 102, 0.7)");
      } else if (themeName === "amber") {
        this.matrix.setColor("#ff1a1a", "rgba(255, 26, 26, 0.7)");
      } else if (themeName === "purple") {
        this.matrix.setColor("#d946ef", "rgba(217, 70, 239, 0.7)");
      }
    }
  }

  // Event Listeners
  bindEvents() {

    this.btnCloseDetails.addEventListener("click", () => this.closeModals());

    // Search Input
    this.searchInput.addEventListener("input", (e) => {
      this.filters.search = e.target.value.trim().toLowerCase();
      if (this.filters.search.length > 0) {
        this.btnClearSearch.classList.remove("hidden");
      } else {
        this.btnClearSearch.classList.add("hidden");
      }
      this.render();
    });

    this.btnClearSearch.addEventListener("click", () => {
      this.sound.playClick();
      this.searchInput.value = "";
      this.filters.search = "";
      this.btnClearSearch.classList.add("hidden");
      this.searchInput.focus();
      this.render();
    });

    // Keyboard shortcut '/' to search
    window.addEventListener("keydown", (e) => {
      if (e.key === "/" && document.activeElement !== this.searchInput && !this.isAnyModalOpen()) {
        e.preventDefault();
        this.searchInput.focus();
      } else if (e.key === "Escape") {
        this.closeModals();
      }
    });

    // Sort Select
    this.sortSelect.addEventListener("change", (e) => {
      this.sound.playClick();
      this.filters.sort = e.target.value;
      this.render();
    });

    // View Switchers
    this.viewGrid.addEventListener("click", () => {
      this.sound.playClick();
      this.setViewMode("grid");
    });
    this.viewList.addEventListener("click", () => {
      this.sound.playClick();
      this.setViewMode("list");
    });

    // Only Pinned Checkbox
    this.chkOnlyPinned.addEventListener("change", (e) => {
      this.sound.playClick();
      this.filters.onlyPinned = e.target.checked;
      this.render();
    });

    // Status Filter Chips
    this.statusChips.forEach(chip => {
      chip.addEventListener("click", () => {
        this.sound.playClick();
        this.statusChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        this.filters.status = chip.dataset.value;
        this.render();
      });
    });

    // Category Filter Chips
    this.categoryChips.forEach(chip => {
      chip.addEventListener("click", () => {
        this.sound.playClick();
        this.categoryChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        this.filters.category = chip.dataset.value;
        this.render();
      });
    });

    // Reset Filters Button (Empty State)
    this.btnResetFilters.addEventListener("click", () => {
      this.sound.playClick();
      this.resetAllFilters();
    });

    // Data Tools Menu Toggle
    this.btnDataTools.addEventListener("click", (e) => {
      e.stopPropagation();
      this.sound.playClick();
      this.dataMenu.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!this.dataMenu.contains(e.target) && e.target !== this.btnDataTools) {
        this.dataMenu.classList.add("hidden");
      }
    });

    // Export Backup JSON
    this.btnExportJSON.addEventListener("click", () => {
      this.sound.playSuccess();
      this.exportJSON();
      this.dataMenu.classList.add("hidden");
    });

    // Modal click out
    this.detailsModal.addEventListener("click", (e) => {
      if (e.target === this.detailsModal) this.closeModals();
    });
  }

  isAnyModalOpen() {
    return !this.detailsModal.classList.contains("hidden");
  }

  closeModals() {
    this.sound.playClick();
    this.detailsModal.classList.add("hidden");
  }

  setViewMode(mode) {
    this.viewMode = mode;
    localStorage.setItem(VIEW_KEY, mode);
    if (mode === "grid") {
      this.projectsGrid.className = "projects-grid view-grid-mode";
      this.viewGrid.classList.add("active");
      this.viewList.classList.remove("active");
    } else {
      this.projectsGrid.className = "projects-grid view-list-mode";
      this.viewGrid.classList.remove("active");
      this.viewList.classList.add("active");
    }
  }

  resetAllFilters() {
    this.searchInput.value = "";
    this.filters.search = "";
    this.btnClearSearch.classList.add("hidden");
    this.filters.status = "all";
    this.filters.category = "all";
    this.filters.onlyPinned = false;
    this.chkOnlyPinned.checked = false;

    this.statusChips.forEach(c => c.classList.toggle("active", c.dataset.value === "all"));
    this.categoryChips.forEach(c => c.classList.toggle("active", c.dataset.value === "all"));

    this.render();
  }

  // Toggle client-side favorite
  togglePin(id) {
    const proj = this.projects.find(p => p.id === id);
    if (proj) {
      this.sound.playClick();
      proj.pinned = !proj.pinned;
      this.render();
    }
  }

  // Inspection / Details Modal
  openInspectionModal(id) {
    const proj = this.projects.find(p => p.id === id);
    if (!proj) return;
    this.sound.playClick();
    this.incrementProjectViews(id);

    const views = this.getProjectViews(id);
    this.detailsTitle.textContent = `${proj.title} // ${proj.codename}`;
    
    let statusText = "OPERACIONAL (LIVE)";
    let statusClass = "live";
    if (proj.status === "dev") {
      statusText = "EM DESENVOLVIMENTO (WIP)";
      statusClass = "dev";
    } else if (proj.status === "soon") {
      statusText = "EM BREVE / CONCEITO";
      statusClass = "soon";
    }

    const techPills = proj.techs.map(t => `<button type="button" class="tech-tag tech-tag-btn" onclick="window.caveiraHub.closeModals(); window.caveiraHub.filterByTech('${this.escapeHTML(t)}')">${this.escapeHTML(t)}</button>`).join("");

    this.detailsBody.innerHTML = `
      <div class="detail-badge-row">
        <span class="card-emoji-icon">${proj.iconEmoji || "💀"}</span>
        <div>
          <span class="status-indicator ${statusClass}">
            <span class="pip-dot"></span> ${statusText}
          </span>
          <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-dim); margin-top: 2px;">
            CATEGORIA: ${proj.category.toUpperCase()} • PROGRESSO: ${proj.progress}% • 👁️ ${views} VIEWS
          </div>
        </div>
      </div>

      ${proj.imageUrl ? `
        <div class="card-screenshot-wrap modal-screenshot-wrap">
          <img src="${this.escapeHTML(this.resolveImageUrl(proj.imageUrl))}" alt="${this.escapeHTML(proj.title)}" class="card-screenshot-img modal-screenshot-img" onerror="this.closest('.card-screenshot-wrap').style.display='none';">
          <div class="card-screenshot-overlay"></div>
        </div>
      ` : ''}

      <div class="detail-desc-box">
        ${this.escapeHTML(proj.description)}
      </div>

      <div class="detail-meta-grid">
        <div class="detail-meta-item">
          <span class="meta-item-label">ARSENAL DE TECNOLOGIAS (CLIQUE PARA FILTRAR)</span>
          <div class="card-tech-stack" style="margin-top: 0.4rem;">
            ${techPills}
          </div>
        </div>
        <div class="detail-meta-item">
          <span class="meta-item-label">ESTATÍSTICAS DA OPERAÇÃO</span>
          <div class="meta-item-value">Conclusão: ${proj.progress}% | Acessos: ${views}</div>
          <div class="card-progress-bar-wrap" style="margin-top: 0.4rem; width: 100%;">
            <div class="progress-track" style="width: 100%; height: 6px;">
              <div class="progress-fill" style="width: ${proj.progress}%;"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="detail-actions-row">
        ${proj.liveUrl ? `<a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-tactical-link primary-action" onclick="window.caveiraHub.incrementProjectViews('${proj.id}')">🌐 ACESSAR SISTEMA LIVE</a>` : ''}
        ${proj.repoUrl ? `<a href="${proj.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn-tactical-link" onclick="window.caveiraHub.incrementProjectViews('${proj.id}')">📂 REPOSITÓRIO GITHUB</a>` : ''}
        ${proj.docUrl ? `<a href="${proj.docUrl}" target="_blank" rel="noopener noreferrer" class="btn-tactical-link" onclick="window.caveiraHub.incrementProjectViews('${proj.id}')">📖 NOTAS & DOCS</a>` : ''}
      </div>
    `;

    this.detailsModal.classList.remove("hidden");
  }

  // Backup Data Export
  exportJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.projects, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `caveira_hub_export_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  // Metrics update with animated counting
  updateMetrics() {
    const total = this.projects.length;
    const live = this.projects.filter(p => p.status === "live").length;
    const dev = this.projects.filter(p => p.status === "dev").length;
    const soon = this.projects.filter(p => p.status === "soon").length;

    // Tech count
    const techSet = new Set();
    this.projects.forEach(p => {
      if (Array.isArray(p.techs)) {
        p.techs.forEach(t => techSet.add(t.trim().toLowerCase()));
      }
    });

    this.animateValue(this.metricTotal, this.prevMetrics.total, total);
    this.animateValue(this.metricLive, this.prevMetrics.live, live);
    this.animateValue(this.metricDev, this.prevMetrics.dev, dev);
    this.animateValue(this.metricTechs, this.prevMetrics.techs, techSet.size);

    this.prevMetrics = {
      total,
      live,
      dev,
      techs: techSet.size
    };

    // Chips counts
    this.countAll.textContent = total;
    this.countLive.textContent = live;
    this.countDev.textContent = dev;
    this.countSoon.textContent = soon;
  }

  // Filter & Sort
  getFilteredProjects() {
    let list = [...this.projects];

    // Search query
    if (this.filters.search) {
      const q = this.filters.search;
      list = list.filter(p => {
        const titleMatch = (p.title || "").toLowerCase().includes(q);
        const codenameMatch = (p.codename || "").toLowerCase().includes(q);
        const descMatch = (p.description || "").toLowerCase().includes(q);
        const techMatch = (p.techs || []).some(t => t.toLowerCase().includes(q));
        return titleMatch || codenameMatch || descMatch || techMatch;
      });
    }

    // Status
    if (this.filters.status !== "all") {
      list = list.filter(p => p.status === this.filters.status);
    }

    // Category
    if (this.filters.category !== "all") {
      list = list.filter(p => p.category === this.filters.category);
    }

    // Only Pinned
    if (this.filters.onlyPinned) {
      list = list.filter(p => p.pinned);
    }

    // Sorting
    list.sort((a, b) => {
      if (this.filters.sort === "stars") {
        if (a.pinned !== b.pinned) return b.pinned ? 1 : -1;
      }
      if (this.filters.sort === "title") {
        return a.title.localeCompare(b.title);
      }
      if (this.filters.sort === "status") {
        const order = { live: 1, dev: 2, soon: 3 };
        return (order[a.status] || 9) - (order[b.status] || 9);
      }
      return (b.createdAt || 0) - (a.createdAt || 0);
    });

    return list;
  }

  // Render Grid Cards
  render() {
    this.updateMetrics();
    const filtered = this.getFilteredProjects();
    this.resultsCount.textContent = `Exibindo ${filtered.length} de ${this.projects.length} projetos`;

    if (filtered.length === 0) {
      this.projectsGrid.innerHTML = "";
      if (this.projects.length === 0 && this.isFeedLive) {
        if (this.emptyTitle) this.emptyTitle.textContent = "SISTEMA TÁTICO INICIALIZADO";
        if (this.emptyDesc) this.emptyDesc.textContent = "Terminal conectado com sucesso. Aguardando novas entradas de projetos no catálogo.";
        if (this.btnResetFilters) this.btnResetFilters.classList.add("hidden");
      } else {
        if (this.emptyTitle) this.emptyTitle.textContent = "NENHUM PROJETO ENCONTRADO";
        if (this.emptyDesc) this.emptyDesc.textContent = "Nenhum sistema corresponde aos filtros ou à busca inserida.";
        if (this.btnResetFilters) this.btnResetFilters.classList.remove("hidden");
      }
      this.emptyState.classList.remove("hidden");
      return;
    }

    this.emptyState.classList.add("hidden");

    let html = "";
    filtered.forEach((p, idx) => {
      const isPinned = p.pinned ? "pinned" : "";
      const statusClass = p.status || "live";
      const views = this.getProjectViews(p.id);
      
      let statusLabel = "OPERACIONAL";
      if (p.status === "dev") statusLabel = "EM DEV";
      if (p.status === "soon") statusLabel = "EM BREVE";

      const techBadges = (p.techs || [])
        .slice(0, 4)
        .map(t => `<button type="button" class="tech-tag tech-tag-btn" onclick="window.caveiraHub.filterByTech('${this.escapeHTML(t)}')" title="Filtrar por ${this.escapeHTML(t)}">${this.escapeHTML(t)}</button>`)
        .join("");

      const extraTechs = (p.techs && p.techs.length > 4) 
        ? `<span class="tech-tag">+${p.techs.length - 4}</span>` 
        : "";

      html += `
        <article class="project-card ${isPinned} status-${statusClass}" data-id="${p.id}" style="animation-delay: ${idx * 45}ms;">
          <div class="card-header">
            <div class="card-title-group">
              <span class="card-emoji-icon">${p.iconEmoji || "💀"}</span>
              <div class="card-meta-text">
                <span class="card-codename">${this.escapeHTML(p.codename || "OP-SYS")}</span>
                <h3 class="card-title">${this.escapeHTML(p.title)}</h3>
              </div>
            </div>
            <div class="card-actions-top">
              <span class="card-views-badge" title="Visualizações registradas">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <span class="card-views-count">${views}</span>
              </span>
              <button class="btn-star ${p.pinned ? 'starred' : ''}" title="${p.pinned ? 'Desmarcar' : 'Fixar no topo'}" onclick="window.caveiraHub.togglePin('${p.id}')">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="${p.pinned ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </button>
            </div>
          </div>

          ${p.imageUrl ? `
            <div class="card-screenshot-wrap">
              <img src="${this.escapeHTML(this.resolveImageUrl(p.imageUrl))}" alt="${this.escapeHTML(p.title)}" class="card-screenshot-img" loading="lazy" onerror="this.closest('.card-screenshot-wrap').style.display='none';">
              <div class="card-screenshot-overlay"></div>
            </div>
          ` : ''}

          <div class="card-body">
            <p class="card-desc">${this.escapeHTML(p.description)}</p>

            <div class="card-telemetry-row">
              <span class="status-indicator ${statusClass}">
                <span class="pip-dot"></span> ${statusLabel}
              </span>
              <div class="card-progress-bar-wrap">
                <span>${p.progress}%</span>
                <div class="progress-track">
                  <div class="progress-fill" style="width: ${p.progress}%;"></div>
                </div>
              </div>
            </div>

            <div class="card-tech-stack">
              ${techBadges}
              ${extraTechs}
            </div>
          </div>

          <div class="card-footer">
            <div class="card-links-group">
              ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-tactical-link primary-action" onclick="window.caveiraHub.incrementProjectViews('${p.id}')">ACESSAR</a>` : ''}
              ${p.repoUrl ? `<a href="${p.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn-tactical-link" title="Repositório" onclick="window.caveiraHub.incrementProjectViews('${p.id}')">CÓDIGO</a>` : ''}
            </div>
            <button class="btn-tactical-link" onclick="window.caveiraHub.openInspectionModal('${p.id}')">
              DETALHES
            </button>
          </div>
        </article>
      `;
    });

    this.projectsGrid.innerHTML = html;
    this.attachCardInteractions();
  }

  resolveImageUrl(url) {
    if (!url) return "";
    url = String(url).trim();

    // 1. Se colou o link copiado da barra do painel do Supabase (ex: supabase.com/dashboard/.../preview=foto.png)
    if (url.includes("supabase.com/dashboard/") && url.includes("preview=")) {
      try {
        const u = new URL(url);
        const previewFile = u.searchParams.get("preview");
        if (previewFile) {
          return `${_EP}/storage/v1/object/public/projects/${encodeURIComponent(previewFile)}`;
        }
      } catch (e) {}
    }

    // 2. Se já for URL pública direta (qualquer link direto da internet)
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    // 3. Se for caminho local explícito (ex: ./logo.jpg)
    if (url.startsWith("./") || url.startsWith("/")) {
      return url;
    }

    // 4. Se for ID curto do Imgur
    if (/^[a-zA-Z0-9_-]{5,8}$/.test(url) && !url.includes(".")) {
      return `https://i.imgur.com/${url}.jpg`;
    }

    // 5. Arquivo enviado para o Storage do Supabase (bucket 'projects')
    return `${_EP}/storage/v1/object/public/projects/${encodeURIComponent(url)}`;
  }

  escapeHTML(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

// Global bootstrap
document.addEventListener("DOMContentLoaded", () => {
  window.caveiraHub = new CaveiraHubApp();
});
