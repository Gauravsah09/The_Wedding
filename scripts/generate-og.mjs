import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

/**
 * Generates high-resolution 1200x630 Open Graph preview image (public/og.png)
 * for WhatsApp, iMessage, Facebook, and Twitter rich link unfurls.
 */
async function generateOgImage() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const svgTemplate = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>
      .serif { font-family: 'Georgia', 'Cormorant Garamond', serif; }
      .sans { font-family: 'Helvetica Neue', 'Arial', sans-serif; }
      .devanagari { font-family: 'Noto Serif Devanagari', 'Mangal', serif; }
      .gold { fill: #C9A227; }
      .maroon { fill: #4A0E1C; }
    </style>

    <!-- Base Ivory Canvas -->
    <rect width="1200" height="630" fill="#FAF6EE"/>

    <!-- Decorative Gold Outer Border -->
    <rect x="24" y="24" width="1152" height="582" rx="6" stroke="#C9A227" stroke-width="2" stroke-opacity="0.5" fill="none"/>
    <rect x="36" y="36" width="1128" height="558" rx="4" stroke="#C9A227" stroke-width="1" stroke-opacity="0.3" stroke-dasharray="4 4" fill="none"/>

    <!-- Corner Filigrees -->
    <g stroke="#C9A227" stroke-width="2" fill="none">
      <path d="M40 70 L40 40 L70 40" />
      <path d="M1160 70 L1160 40 L1130 40" />
      <path d="M40 560 L40 590 L70 590" />
      <path d="M1160 560 L1160 590 L1130 590" />
    </g>

    <!-- Top Auspicious Inscription -->
    <text x="600" y="95" text-anchor="middle" class="devanagari gold" font-size="24" letter-spacing="4">
      ॥ श्री गणेशाय नमः ॥
    </text>

    <!-- Ganesha Line Art Motif (Centred, noble, unobstructed) -->
    <g transform="translate(540, 115) scale(0.6)" stroke="#C9A227" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M100 16 L100 24 M96 22 L104 22" />
      <path d="M100 24 L114 42 L86 42 Z" />
      <path d="M82 42 Q100 38 118 42 L124 54 Q100 49 76 54 Z" />
      <path d="M74 54 Q100 50 126 54" />
      <path d="M100 58 L100 78 M95 65 Q100 70 105 65" />
      <circle cx="100" cy="84" r="3" fill="#C9A227" />
      <path d="M76 54 C50 56 34 76 34 102 C34 126 52 142 76 138 C80 137 84 133 86 128" />
      <path d="M124 54 C150 56 166 76 166 102 C166 126 148 142 124 138 C120 137 116 133 114 128" />
      <path d="M96 92 C95 116 88 136 78 152 C68 168 62 178 72 192 C80 202 96 204 108 198 C116 193 118 182 112 176 C105 170 95 174 95 180" />
      <path d="M104 92 C106 114 104 132 100 148 C96 160 90 166 94 172" />
      <path d="M84 126 L76 130" />
      <path d="M126 174 C122 170 122 163 128 158 C134 153 140 156 142 163 C144 170 138 176 132 176 Z" />
    </g>

    <!-- Invitation Heading -->
    <text x="600" y="275" text-anchor="middle" class="serif maroon" font-size="22" letter-spacing="5" font-style="italic">
      WE JOYFULLY INVITE YOU TO CELEBRATE THE WEDDING OF
    </text>

    <!-- Bride & Groom Names -->
    <text x="600" y="360" text-anchor="middle" class="serif maroon" font-size="58" font-weight="bold" letter-spacing="3">
      Ritu Kumari
    </text>
    <text x="600" y="415" text-anchor="middle" class="serif gold" font-size="44" font-style="italic">
      &amp;
    </text>
    <text x="600" y="475" text-anchor="middle" class="serif maroon" font-size="58" font-weight="bold" letter-spacing="3">
      Gaurav Sah
    </text>

    <!-- Date & Place Hairline Divider -->
    <line x1="420" y1="510" x2="780" y2="510" stroke="#C9A227" stroke-width="1.5" stroke-opacity="0.6"/>
    <circle cx="600" cy="510" r="4" fill="#C9A227"/>

    <!-- Event Date & Place -->
    <text x="600" y="555" text-anchor="middle" class="serif maroon" font-size="28" font-weight="600" letter-spacing="3">
      30 NOVEMBER 2026
    </text>
    <text x="600" y="585" text-anchor="middle" class="sans maroon" font-size="16" letter-spacing="3" opacity="0.8">
      HOTEL VALENTINO HI-WAY, MUZAFFARPUR
    </text>
  </svg>
  `;

  const outputPath = path.join(publicDir, 'og.png');
  await sharp(Buffer.from(svgTemplate))
    .png({ quality: 95 })
    .toFile(outputPath);

  console.log(`✓ Generated Open Graph preview at ${outputPath}`);
}

generateOgImage().catch((err) => {
  console.error('Failed to generate OG image:', err);
  process.exit(1);
});
