const fs = require("fs");
const path = require("path");

const dirs = [
  "public/images/clients",
  "public/images/industries",
  "public/images/testimonials",
  "public/icons",
];

dirs.forEach((d) => fs.mkdirSync(d, { recursive: true }));

const clients = [
  { file: "nexus", label: "NEXUS" },
  { file: "wlpi", label: "WLPI" },
  { file: "opportunity", label: "OPPORTUNITY" },
  { file: "blue-genesis", label: "BLUE GENESIS" },
  { file: "future", label: "FUTURE" },
  { file: "brightpath", label: "BrightPath" },
];

clients.forEach(({ file, label }) => {
  const isMixedCase = label !== label.toUpperCase();
  const displayLabel = isMixedCase ? label : label;
  const fontSize = label.length > 10 ? 14 : 18;
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="44" viewBox="0 0 180 44">
  <rect x="0" y="8" width="6" height="28" rx="1" fill="#1e293b"/>
  <rect x="10" y="14" width="6" height="22" rx="1" fill="#c5a358"/>
  <text x="24" y="30" fill="#1e293b" font-family="Arial,Helvetica,sans-serif" font-size="${fontSize}" font-weight="800" letter-spacing="${isMixedCase ? 1 : 2.5}">${displayLabel}</text>
</svg>`;
  fs.writeFileSync(path.join("public/images/clients", `${file}.svg`), svg);
});

const industries = {
  hospitality: {
    colors: ["#1a2332", "#c5a358", "#0a0f1a"],
    shapes: `<rect x="280" y="180" width="120" height="200" rx="4" fill="#0f172a" opacity="0.6"/><rect x="300" y="160" width="80" height="220" rx="2" fill="#1e293b" opacity="0.5"/><rect x="100" y="280" width="200" height="8" fill="#c5a358" opacity="0.3"/>`,
  },
  restaurants: {
    colors: ["#2d1f14", "#c5a358", "#1a1208"],
    shapes: `<circle cx="400" cy="380" r="80" fill="#c5a358" opacity="0.15"/><ellipse cx="400" cy="370" rx="70" ry="20" fill="#1a1208" opacity="0.5"/><rect x="80" y="300" width="160" height="6" rx="3" fill="#c5a358" opacity="0.4"/>`,
  },
  education: {
    colors: ["#1e2a3a", "#4a90c4", "#0f1824"],
    shapes: `<polygon points="400,400 320,250 480,250" fill="#0f1824" opacity="0.5"/><rect x="340" y="250" width="120" height="150" fill="#1e2a3a" opacity="0.4"/>`,
  },
  healthcare: {
    colors: ["#1a2e2a", "#5ec4a8", "#0d1a17"],
    shapes: `<rect x="350" y="300" width="100" height="100" rx="8" fill="#5ec4a8" opacity="0.15"/><rect x="390" y="320" width="20" height="60" rx="4" fill="#5ec4a8" opacity="0.3"/><rect x="370" y="340" width="60" height="20" rx="4" fill="#5ec4a8" opacity="0.3"/>`,
  },
  "real-estate": {
    colors: ["#1f2430", "#8fa4c4", "#0c1018"],
    shapes: `<rect x="300" y="200" width="180" height="250" fill="#0c1018" opacity="0.4"/><rect x="320" y="220" width="40" height="40" fill="#8fa4c4" opacity="0.2"/><rect x="380" y="220" width="40" height="40" fill="#8fa4c4" opacity="0.2"/>`,
  },
  ecommerce: {
    colors: ["#241a30", "#c5a358", "#120c18"],
    shapes: `<rect x="320" y="280" width="140" height="100" rx="8" fill="#c5a358" opacity="0.12"/><circle cx="360" cy="320" r="25" fill="#c5a358" opacity="0.2"/><rect x="400" y="305" width="50" height="8" rx="2" fill="#c5a358" opacity="0.25"/>`,
  },
};

Object.entries(industries).forEach(([name, { colors, shapes }]) => {
  const [c1, c2, c3] = colors;
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="45%" stop-color="${c2}" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="${c3}"/>
    </linearGradient>
    <radialGradient id="glow" cx="70%" cy="30%" r="50%">
      <stop offset="0%" stop-color="${c2}" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="${c3}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="800" height="600" fill="url(#bg)"/>
  <rect width="800" height="600" fill="url(#glow)"/>
  ${shapes}
  <rect x="0" y="520" width="800" height="80" fill="#05080f" opacity="0.3"/>
</svg>`;
  fs.writeFileSync(path.join("public/images/industries", `${name}.svg`), svg);
});

const testimonials = {
  hotel: { colors: ["#1a2332", "#c5a358"], label: "Hospitality" },
  healthcare: { colors: ["#1a2e2a", "#5ec4a8"], label: "Healthcare" },
  restaurant: { colors: ["#2d1f14", "#c5a358"], label: "Restaurants" },
};

Object.entries(testimonials).forEach(([name, { colors, label }]) => {
  const [c1, c2] = colors;
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="60%" stop-color="${c2}" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#05080f"/>
    </linearGradient>
  </defs>
  <rect width="800" height="1000" fill="url(#bg)"/>
  <rect x="0" y="650" width="800" height="350" fill="#05080f" opacity="0.75"/>
  <text x="40" y="80" fill="${c2}" font-family="Arial,sans-serif" font-size="14" font-weight="700" letter-spacing="3" opacity="0.5">${label.toUpperCase()}</text>
</svg>`;
  fs.writeFileSync(path.join("public/images/testimonials", `${name}.svg`), svg);
});

console.log("Assets created");
