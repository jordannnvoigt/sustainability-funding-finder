<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sustainability Funding Finder</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=IBM+Plex+Mono:wght@400;500&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap" rel="stylesheet">
<style>
  :root {
    --forest: #1a3a2a;
    --moss: #2d5a3d;
    --sage: #4a7c59;
    --leaf: #6ba07a;
    --cream: #f5f0e8;
    --parchment: #ede8dc;
    --ink: #1c1c18;
    --muted: #6b6b60;
    --gold: #c9a84c;
    --rust: #b85c38;
    --border: #d4cfc4;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--cream);
    color: var(--ink);
    font-family: 'Source Serif 4', Georgia, serif;
    min-height: 100vh;
  }

  .header {
    background: var(--forest);
    padding: 0 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 3px solid var(--gold);
    height: 64px;
  }

  .header-left { display: flex; align-items: center; gap: 12px; }

  .logo-mark {
    width: 32px; height: 32px;
    background: var(--gold);
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; flex-shrink: 0;
  }

  .header-title {
    font-family: 'Playfair Display', Georgia, serif;
    color: var(--cream); font-size: 18px; font-weight: 600; letter-spacing: 0.02em;
  }

  .header-sub {
    font-family: 'IBM Plex Mono', monospace;
    color: var(--leaf); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
  }

  .hero {
    background: var(--forest);
    padding: 52px 32px 48px;
    position: relative; overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute; top: -60px; right: -60px;
    width: 360px; height: 360px;
    background: radial-gradient(circle, rgba(107,160,122,0.12) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero-eyebrow {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 14px;
  }

  .hero-headline {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(28px, 5vw, 44px); font-weight: 700;
    color: var(--cream); line-height: 1.18;
    max-width: 680px; margin-bottom: 16px;
  }

  .hero-headline em { color: var(--gold); font-style: italic; }

  .hero-body {
    font-size: 15px; color: rgba(245,240,232,0.7);
    max-width: 560px; line-height: 1.65; font-weight: 300;
  }

  .form-section { max-width: 860px; margin: 0 auto; padding: 48px 32px; }

  .form-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--muted); margin-bottom: 6px; display: block;
  }

  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }

  .form-group { display: flex; flex-direction: column; }
  .form-group.full { grid-column: 1 / -1; }

  select, input, textarea {
    font-family: 'Source Serif 4', Georgia, serif;
    font-size: 14px; color: var(--ink);
    background: white; border: 1.5px solid var(--border);
    border-radius: 4px; padding: 10px 14px;
    transition: border-color 0.15s, box-shadow 0.15s;
    appearance: none; -webkit-appearance: none;
  }

  select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236b6b60' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 12px center;
    padding-right: 36px; cursor: pointer;
  }

  select:focus, input:focus, textarea:focus {
    outline: none; border-color: var(--sage);
    box-shadow: 0 0 0 3px rgba(74,124,89,0.12);
  }

  textarea { resize: vertical; min-height: 90px; line-height: 1.55; }

  .section-divider {
    display: flex; align-items: center; gap: 14px; margin: 32px 0 24px;
  }

  .section-divider-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--sage); white-space: nowrap; flex-shrink: 0;
  }

  .section-divider-line { flex: 1; height: 1px; background: var(--border); }

  .submit-btn {
    background: var(--forest); color: var(--cream); border: none;
    padding: 14px 32px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;
    cursor: pointer; border-radius: 4px;
    transition: background 0.2s, transform 0.1s;
    display: flex; align-items: center; gap: 10px; margin-top: 8px;
  }

  .submit-btn:hover:not(:disabled) { background: var(--moss); transform: translateY(-1px); }
  .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .submit-btn .btn-arrow { font-size: 16px; transition: transform 0.2s; }
  .submit-btn:hover:not(:disabled) .btn-arrow { transform: translateX(4px); }

  .results-section { max-width: 860px; margin: 0 auto; padding: 0 32px 64px; }

  .results-header {
    display: flex; align-items: center; gap: 14px;
    padding: 24px 0 20px; border-top: 2px solid var(--forest);
  }

  .results-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 22px; font-weight: 600; color: var(--forest);
  }

  .results-badge {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
    background: var(--gold); color: var(--forest);
    padding: 3px 9px; border-radius: 2px; font-weight: 500;
  }

  .loading-state {
    padding: 48px 0; display: flex; flex-direction: column;
    align-items: center; gap: 20px;
  }

  .loading-leaves { display: flex; gap: 8px; }

  .loading-leaf {
    width: 10px; height: 10px; background: var(--sage);
    border-radius: 50% 0 50% 0;
    animation: leafPulse 1.2s ease-in-out infinite;
  }

  .loading-leaf:nth-child(2) { animation-delay: 0.2s; }
  .loading-leaf:nth-child(3) { animation-delay: 0.4s; }

  @keyframes leafPulse {
    0%, 100% { opacity: 0.2; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2); }
  }

  .loading-text {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px; letter-spacing: 0.08em; color: var(--muted); text-transform: uppercase;
  }

  .result-content { animation: fadeUp 0.4s ease forwards; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .result-content h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 20px; font-weight: 600; color: var(--forest);
    margin: 32px 0 14px; padding-bottom: 8px;
    border-bottom: 1.5px solid var(--border);
    display: flex; align-items: center; gap: 10px;
  }

  .result-content h2::before {
    content: ''; display: inline-block;
    width: 6px; height: 22px; background: var(--gold);
    border-radius: 1px; flex-shrink: 0;
  }

  .result-content h3 {
    font-family: 'Source Serif 4', Georgia, serif;
    font-size: 16px; font-weight: 600; color: var(--ink);
    margin: 20px 0 8px;
  }

  .result-content p {
    font-size: 14.5px; line-height: 1.7; color: #2a2a24; margin-bottom: 12px;
  }

  .result-content ul, .result-content ol { padding-left: 20px; margin-bottom: 14px; }

  .result-content li {
    font-size: 14px; line-height: 1.65; color: #2a2a24; margin-bottom: 5px;
  }

  .result-content strong { color: var(--forest); font-weight: 600; }
  .result-content em { color: var(--muted); font-style: italic; }

  .result-content code {
    font-family: 'IBM Plex Mono', monospace; font-size: 12px;
    background: var(--parchment); padding: 2px 6px;
    border-radius: 3px; color: var(--rust);
  }

  .result-content hr { border: none; border-top: 1px solid var(--border); margin: 24px 0; }

  .error-box {
    background: #fff5f2; border-left: 3px solid var(--rust);
    border-radius: 0 4px 4px 0; padding: 16px 20px; margin: 24px 0;
  }

  .error-box p {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px; color: var(--rust); line-height: 1.55; margin: 0;
  }

  .disclaimer {
    margin-top: 36px; padding: 16px 20px;
    background: var(--parchment);
    border-left: 3px solid var(--gold);
    border-radius: 0 4px 4px 0;
  }

  .disclaimer p {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px; color: var(--muted); line-height: 1.55; margin: 0;
  }

  .footer {
    background: var(--forest); padding: 20px 32px;
    text-align: center; border-top: 1px solid rgba(255,255,255,0.08);
  }

  .footer p {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px; color: rgba(245,240,232,0.4); letter-spacing: 0.06em;
  }

  .footer a { color: var(--leaf); text-decoration: none; }

  @media (max-width: 640px) {
    .form-grid { grid-template-columns: 1fr; }
    .hero { padding: 36px 20px 32px; }
    .form-section, .results-section { padding-left: 20px; padding-right: 20px; }
    .header { padding: 0 20px; }
    .header-sub { display: none; }
  }
</style>
</head>
<body>

<header class="header">
  <div class="header-left">
    <div class="logo-mark">🌿</div>
    <div>
      <div class="header-title">Sustainability Funding Finder</div>
    </div>
  </div>
  <div class="header-sub">AI-Powered · IRA &amp; Beyond</div>
</header>

<section class="hero">
  <div class="hero-eyebrow">Free Tool · Powered by Claude AI</div>
  <h1 class="hero-headline">Find the funding your <em>project deserves</em></h1>
  <p class="hero-body">The clean energy funding landscape — IRA incentives, state programs, utility rebates, PACE financing — is vast and constantly shifting. Describe your project and get a structured, prioritized breakdown of what's available to you.</p>
</section>

<main class="form-section">
  <div class="section-divider">
    <span class="section-divider-label">Project Details</span>
    <div class="section-divider-line"></div>
  </div>

  <div class="form-grid">
    <div class="form-group">
      <label class="form-label">Project Type</label>
      <select id="projectType">
        <option value="">Select project type…</option>
        <option value="Commercial/Industrial Solar">Solar — Commercial/Industrial</option>
        <option value="Residential Solar">Solar — Residential</option>
        <option value="Community/Shared Solar">Solar — Community/Shared</option>
        <option value="Agrivoltaics">Agrivoltaics</option>
        <option value="Green Roof / Living Roof">Green Roof / Living Roof</option>
        <option value="EV Infrastructure / Charging">EV Infrastructure / Charging</option>
        <option value="Affordable Housing + Clean Energy">Affordable Housing + Clean Energy</option>
        <option value="Energy Efficiency Retrofit">Energy Efficiency Retrofit</option>
        <option value="Geothermal">Geothermal</option>
        <option value="Battery Storage">Battery Storage</option>
        <option value="Wind Energy">Wind Energy</option>
        <option value="Urban Agriculture / Food Systems">Urban Agriculture / Food Systems</option>
        <option value="Water / Stormwater Infrastructure">Water / Stormwater Infrastructure</option>
        <option value="Mixed-Use Green Development">Mixed-Use Green Development</option>
        <option value="Other / Multiple Project Types">Other / Multiple</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">Entity Type</label>
      <select id="entityType">
        <option value="">Select entity type…</option>
        <option value="Nonprofit Organization">Nonprofit Organization</option>
        <option value="Small For-Profit Business">For-Profit — Small Business</option>
        <option value="Real Estate Developer">For-Profit — Real Estate Developer</option>
        <option value="Large Corporation">For-Profit — Large Corporation</option>
        <option value="Municipality / Local Government">Municipality / Local Government</option>
        <option value="Tribal Nation">Tribal Nation / Tribal Entity</option>
        <option value="Cooperative or Credit Union">Cooperative or Credit Union</option>
        <option value="Community Organization / CBO">Community Organization / CBO</option>
        <option value="Individual Homeowner">Individual Homeowner</option>
        <option value="Farmer / Agricultural Producer">Farmer / Agricultural Producer</option>
        <option value="School or University">School or University</option>
        <option value="Housing Authority">Housing Authority</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">State</label>
      <select id="state">
        <option value="">Select state…</option>
        <option>Alabama</option><option>Alaska</option><option>Arizona</option><option>Arkansas</option>
        <option>California</option><option>Colorado</option><option>Connecticut</option><option>Delaware</option>
        <option>Florida</option><option>Georgia</option><option>Hawaii</option><option>Idaho</option>
        <option>Illinois</option><option>Indiana</option><option>Iowa</option><option>Kansas</option>
        <option>Kentucky</option><option>Louisiana</option><option>Maine</option><option>Maryland</option>
        <option>Massachusetts</option><option>Michigan</option><option>Minnesota</option><option>Mississippi</option>
        <option>Missouri</option><option>Montana</option><option>Nebraska</option><option>Nevada</option>
        <option>New Hampshire</option><option>New Jersey</option><option>New Mexico</option><option>New York</option>
        <option>North Carolina</option><option>North Dakota</option><option>Ohio</option><option>Oklahoma</option>
        <option>Oregon</option><option>Pennsylvania</option><option>Rhode Island</option><option>South Carolina</option>
        <option>South Dakota</option><option>Tennessee</option><option>Texas</option><option>Utah</option>
        <option>Vermont</option><option>Virginia</option><option>Washington</option><option>West Virginia</option>
        <option>Wisconsin</option><option>Wyoming</option><option>Washington D.C.</option><option>Puerto Rico</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">County / Metro Area (optional)</label>
      <input type="text" id="county" placeholder="e.g. Hennepin County, Twin Cities metro…">
    </div>

    <div class="form-group">
      <label class="form-label">Project Budget Range</label>
      <select id="budget">
        <option value="">Select budget range…</option>
        <option value="Under $50,000">Under $50,000</option>
        <option value="$50,000–$250,000">$50,000 – $250,000</option>
        <option value="$250,000–$1 million">$250,000 – $1 million</option>
        <option value="$1 million–$5 million">$1 million – $5 million</option>
        <option value="$5 million–$25 million">$5 million – $25 million</option>
        <option value="Over $25 million">Over $25 million</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">New Construction or Retrofit?</label>
      <select id="constructionType">
        <option value="">Select…</option>
        <option value="New Construction">New Construction</option>
        <option value="Retrofit / Renovation">Retrofit / Renovation</option>
        <option value="Both / Mixed">Both / Mixed</option>
        <option value="Still in Planning">Still in Planning</option>
      </select>
    </div>

    <div class="form-group full">
      <label class="form-label">Additional Project Details (optional but helpful)</label>
      <textarea id="details" placeholder="Describe your project, any specific challenges, population served, rural vs. urban, relevant certifications, or anything else that might affect funding eligibility…"></textarea>
    </div>
  </div>

  <button class="submit-btn" id="submitBtn" onclick="findFunding()">
    <span>Find Funding Sources</span>
    <span class="btn-arrow">→</span>
  </button>
</main>

<div class="results-section" id="resultsSection" style="display:none;">
  <div class="results-header">
    <div class="results-title">Funding Analysis</div>
    <div class="results-badge">AI Analysis</div>
  </div>
  <div id="resultsContent"></div>
</div>

<footer class="footer">
  <p>A tool for sustainability practitioners · Powered by Claude AI · Programs change — verify with sources before applying</p>
</footer>

<script>
  // ─── CONFIGURATION ────────────────────────────────────────────────────────
  // After deploying to Vercel, this will be '/api/fund' (relative URL, no change needed).
  // If you host the HTML separately from the API, replace with your full Vercel URL:
  // e.g. 'https://your-project.vercel.app/api/fund'
  const API_ENDPOINT = '/api/fund';
  // ──────────────────────────────────────────────────────────────────────────

  function parseMarkdown(text) {
    const lines = text.split('\n');
    let html = '';
    let inUl = false;

    for (let line of lines) {
      // Close open list if needed
      if (inUl && !line.match(/^[-*] /)) {
        html += '</ul>';
        inUl = false;
      }

      if (line.match(/^## /)) {
        html += `<h2>${fmt(line.replace(/^## /, ''))}</h2>`;
      } else if (line.match(/^### /)) {
        html += `<h3>${fmt(line.replace(/^### /, ''))}</h3>`;
      } else if (line.match(/^[-*] /)) {
        if (!inUl) { html += '<ul>'; inUl = true; }
        html += `<li>${fmt(line.replace(/^[-*] /, ''))}</li>`;
      } else if (line.match(/^\d+\. /)) {
        html += `<li>${fmt(line.replace(/^\d+\. /, ''))}</li>`;
      } else if (line.match(/^---/)) {
        html += '<hr>';
      } else if (line.trim() === '') {
        html += '';
      } else {
        html += `<p>${fmt(line)}</p>`;
      }
    }

    if (inUl) html += '</ul>';
    return html;
  }

  function fmt(str) {
    return str
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code>$1</code>');
  }

  async function findFunding() {
    const projectType = document.getElementById('projectType').value;
    const entityType  = document.getElementById('entityType').value;
    const state       = document.getElementById('state').value;
    const county      = document.getElementById('county').value.trim();
    const budget      = document.getElementById('budget').value;
    const constructionType = document.getElementById('constructionType').value;
    const details     = document.getElementById('details').value.trim();

    if (!projectType || !entityType || !state) {
      alert('Please fill in Project Type, Entity Type, and State to continue.');
      return;
    }

    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.querySelector('span').textContent = 'Analyzing…';

    const resultsSection = document.getElementById('resultsSection');
    const resultsContent = document.getElementById('resultsContent');
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    resultsContent.innerHTML = `
      <div class="loading-state">
        <div class="loading-leaves">
          <div class="loading-leaf"></div>
          <div class="loading-leaf"></div>
          <div class="loading-leaf"></div>
        </div>
        <div class="loading-text">Scanning federal, state &amp; utility programs…</div>
      </div>`;

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectType, entityType, state, county, budget, constructionType, details }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: response.statusText }));
        throw new Error(err.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      const html = parseMarkdown(data.result || '');

      resultsContent.innerHTML = `
        <div class="result-content">${html}</div>
        <div class="disclaimer">
          <p>⚠ This analysis is generated by AI and reflects programs as of its training data. Funding programs change frequently — verify current status, deadlines, and eligibility directly with program administrators before applying. This is not financial or legal advice.</p>
        </div>`;

    } catch (err) {
      resultsContent.innerHTML = `
        <div class="error-box">
          <p>⚠ Error: ${err.message}. Please try again or check your connection.</p>
        </div>`;
    }

    btn.disabled = false;
    btn.querySelector('span').textContent = 'Find Funding Sources';
  }
</script>
</body>
</html>
