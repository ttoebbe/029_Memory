'use strict';
// WARNING: Contains Figma API token — do NOT commit this file!
// Add to .gitignore or delete after use.

const https = require('https');
const fs    = require('fs');
const path  = require('path');
const url   = require('url');

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const TOKEN    = 'FIGMA_TOKEN_HERE';
const FILE_KEY = 'teDxq4ywNg46iqiWHpHQYM';
const ROOT     = __dirname;
const BATCH    = 50;
const PARALLEL = 5;

// ─── ASSET MAP ───────────────────────────────────────────────────────────────
// fmt: 'svg' | 'png' | 'jpg'   scale: 1 | 2
const ASSETS = [
  // ── Icons (SVG) ────────────────────────────────────────────────────────────
  { id: '46:9',      dest: 'assets/icons/logo.svg',                   fmt: 'svg', scale: 1 },
  { id: '46:10',     dest: 'assets/icons/logo-text.svg',              fmt: 'svg', scale: 1 },
  { id: '46:11',     dest: 'assets/icons/logo-icon.svg',              fmt: 'svg', scale: 1 },
  { id: '2030:350',  dest: 'assets/icons/stadia-controller.svg',      fmt: 'svg', scale: 1 },
  { id: '2285:3914', dest: 'assets/icons/chess-pawn.svg',             fmt: 'svg', scale: 1 },
  { id: '2230:3789', dest: 'assets/icons/move-item.svg',              fmt: 'svg', scale: 1 },
  { id: '2030:96',   dest: 'assets/icons/fiber-manual-record.svg',    fmt: 'svg', scale: 1 },
  { id: '2285:4025', dest: 'assets/icons/palette.svg',                fmt: 'svg', scale: 1 },
  { id: '2062:2559', dest: 'assets/icons/mode-standby.svg',           fmt: 'svg', scale: 1 },
  { id: '2030:341',  dest: 'assets/icons/smart-display.svg',          fmt: 'svg', scale: 1 },
  { id: '2197:4663', dest: 'assets/icons/coderr.svg',                 fmt: 'svg', scale: 1 },
  { id: '2285:3939', dest: 'assets/icons/label.svg',                  fmt: 'svg', scale: 1 },

  // ── Card back (PNG @2x) ────────────────────────────────────────────────────
  { id: '2229:3752', dest: 'assets/images/cards/back/card-back.png',  fmt: 'png', scale: 2 },

  // ── Code-Vibes cards (PNG @2x) ─────────────────────────────────────────────
  { id: '2078:1189', dest: 'assets/images/cards/code-vibes/card-01.png', fmt: 'png', scale: 2 },
  { id: '2078:2206', dest: 'assets/images/cards/code-vibes/card-02.png', fmt: 'png', scale: 2 },
  { id: '2078:2223', dest: 'assets/images/cards/code-vibes/card-03.png', fmt: 'png', scale: 2 },
  { id: '2078:2240', dest: 'assets/images/cards/code-vibes/card-04.png', fmt: 'png', scale: 2 },
  { id: '2078:2257', dest: 'assets/images/cards/code-vibes/card-05.png', fmt: 'png', scale: 2 },
  { id: '2078:2274', dest: 'assets/images/cards/code-vibes/card-06.png', fmt: 'png', scale: 2 },
  { id: '2078:2291', dest: 'assets/images/cards/code-vibes/card-07.png', fmt: 'png', scale: 2 },
  { id: '2078:2308', dest: 'assets/images/cards/code-vibes/card-08.png', fmt: 'png', scale: 2 },
  { id: '2117:1548', dest: 'assets/images/cards/code-vibes/card-09.png', fmt: 'png', scale: 2 },
  { id: '2117:1576', dest: 'assets/images/cards/code-vibes/card-10.png', fmt: 'png', scale: 2 },
  { id: '2117:1603', dest: 'assets/images/cards/code-vibes/card-11.png', fmt: 'png', scale: 2 },
  { id: '2117:1626', dest: 'assets/images/cards/code-vibes/card-12.png', fmt: 'png', scale: 2 },
  { id: '2161:2934', dest: 'assets/images/cards/code-vibes/card-13.png', fmt: 'png', scale: 2 },
  { id: '2161:2997', dest: 'assets/images/cards/code-vibes/card-14.png', fmt: 'png', scale: 2 },
  { id: '2161:3026', dest: 'assets/images/cards/code-vibes/card-15.png', fmt: 'png', scale: 2 },
  { id: '2161:3055', dest: 'assets/images/cards/code-vibes/card-16.png', fmt: 'png', scale: 2 },
  { id: '2161:3730', dest: 'assets/images/cards/code-vibes/card-17.png', fmt: 'png', scale: 2 },
  { id: '2161:3749', dest: 'assets/images/cards/code-vibes/card-18.png', fmt: 'png', scale: 2 },

  // ── Games cards (PNG @2x) ──────────────────────────────────────────────────
  { id: '2078:3698', dest: 'assets/images/cards/games/card-01.png', fmt: 'png', scale: 2 },
  { id: '2078:4168', dest: 'assets/images/cards/games/card-02.png', fmt: 'png', scale: 2 },
  { id: '2078:4181', dest: 'assets/images/cards/games/card-03.png', fmt: 'png', scale: 2 },
  { id: '2078:4194', dest: 'assets/images/cards/games/card-04.png', fmt: 'png', scale: 2 },
  { id: '2078:4207', dest: 'assets/images/cards/games/card-05.png', fmt: 'png', scale: 2 },
  { id: '2078:4233', dest: 'assets/images/cards/games/card-06.png', fmt: 'png', scale: 2 },
  { id: '2078:4220', dest: 'assets/images/cards/games/card-07.png', fmt: 'png', scale: 2 },
  { id: '2078:4246', dest: 'assets/images/cards/games/card-08.png', fmt: 'png', scale: 2 },
  { id: '2078:4273', dest: 'assets/images/cards/games/card-09.png', fmt: 'png', scale: 2 },
  { id: '2078:4286', dest: 'assets/images/cards/games/card-10.png', fmt: 'png', scale: 2 },
  { id: '2106:1710', dest: 'assets/images/cards/games/card-11.png', fmt: 'png', scale: 2 },
  { id: '2106:1725', dest: 'assets/images/cards/games/card-12.png', fmt: 'png', scale: 2 },
  { id: '2106:1742', dest: 'assets/images/cards/games/card-13.png', fmt: 'png', scale: 2 },
  { id: '2161:3924', dest: 'assets/images/cards/games/card-14.png', fmt: 'png', scale: 2 },
  { id: '2161:3937', dest: 'assets/images/cards/games/card-15.png', fmt: 'png', scale: 2 },
  { id: '2161:3950', dest: 'assets/images/cards/games/card-16.png', fmt: 'png', scale: 2 },
  { id: '2161:3963', dest: 'assets/images/cards/games/card-17.png', fmt: 'png', scale: 2 },
  { id: '2168:1935', dest: 'assets/images/cards/games/card-18.png', fmt: 'png', scale: 2 },

  // ── DA-Projects cards (PNG @2x) ────────────────────────────────────────────
  { id: '2197:2177', dest: 'assets/images/cards/da-projects/card-01.png', fmt: 'png', scale: 2 },
  { id: '2197:2593', dest: 'assets/images/cards/da-projects/card-02.png', fmt: 'png', scale: 2 },
  { id: '2197:2688', dest: 'assets/images/cards/da-projects/card-03.png', fmt: 'png', scale: 2 },
  { id: '2197:2783', dest: 'assets/images/cards/da-projects/card-04.png', fmt: 'png', scale: 2 },
  { id: '2197:2878', dest: 'assets/images/cards/da-projects/card-05.png', fmt: 'png', scale: 2 },
  { id: '2197:2973', dest: 'assets/images/cards/da-projects/card-06.png', fmt: 'png', scale: 2 },
  { id: '2197:3068', dest: 'assets/images/cards/da-projects/card-07.png', fmt: 'png', scale: 2 },
  { id: '2197:3163', dest: 'assets/images/cards/da-projects/card-08.png', fmt: 'png', scale: 2 },
  { id: '2197:3258', dest: 'assets/images/cards/da-projects/card-09.png', fmt: 'png', scale: 2 },
  { id: '2197:3353', dest: 'assets/images/cards/da-projects/card-10.png', fmt: 'png', scale: 2 },
  { id: '2197:3448', dest: 'assets/images/cards/da-projects/card-11.png', fmt: 'png', scale: 2 },
  { id: '2197:3543', dest: 'assets/images/cards/da-projects/card-12.png', fmt: 'png', scale: 2 },
  { id: '2197:3638', dest: 'assets/images/cards/da-projects/card-13.png', fmt: 'png', scale: 2 },
  { id: '2197:3733', dest: 'assets/images/cards/da-projects/card-14.png', fmt: 'png', scale: 2 },
  { id: '2197:3828', dest: 'assets/images/cards/da-projects/card-15.png', fmt: 'png', scale: 2 },
  { id: '2197:3923', dest: 'assets/images/cards/da-projects/card-16.png', fmt: 'png', scale: 2 },
  { id: '2197:4835', dest: 'assets/images/cards/da-projects/card-17.png', fmt: 'png', scale: 2 },
  { id: '2197:4888', dest: 'assets/images/cards/da-projects/card-18.png', fmt: 'png', scale: 2 },

  // ── Food cards (PNG @2x) ───────────────────────────────────────────────────
  { id: '2226:3635', dest: 'assets/images/cards/food/card-01.png', fmt: 'png', scale: 2 },
  { id: '2226:3678', dest: 'assets/images/cards/food/card-02.png', fmt: 'png', scale: 2 },
  { id: '2226:3689', dest: 'assets/images/cards/food/card-03.png', fmt: 'png', scale: 2 },
  { id: '2226:3700', dest: 'assets/images/cards/food/card-04.png', fmt: 'png', scale: 2 },
  { id: '2226:3711', dest: 'assets/images/cards/food/card-05.png', fmt: 'png', scale: 2 },
  { id: '2226:3722', dest: 'assets/images/cards/food/card-06.png', fmt: 'png', scale: 2 },
  { id: '2226:3733', dest: 'assets/images/cards/food/card-07.png', fmt: 'png', scale: 2 },
  { id: '2226:3755', dest: 'assets/images/cards/food/card-08.png', fmt: 'png', scale: 2 },
  { id: '2226:3821', dest: 'assets/images/cards/food/card-09.png', fmt: 'png', scale: 2 },
  { id: '2226:3799', dest: 'assets/images/cards/food/card-10.png', fmt: 'png', scale: 2 },
  { id: '2226:3810', dest: 'assets/images/cards/food/card-11.png', fmt: 'png', scale: 2 },
  { id: '2226:3832', dest: 'assets/images/cards/food/card-12.png', fmt: 'png', scale: 2 },
  { id: '2226:3777', dest: 'assets/images/cards/food/card-13.png', fmt: 'png', scale: 2 },
  { id: '2226:3744', dest: 'assets/images/cards/food/card-14.png', fmt: 'png', scale: 2 },
  { id: '2226:3766', dest: 'assets/images/cards/food/card-15.png', fmt: 'png', scale: 2 },
  { id: '2226:3788', dest: 'assets/images/cards/food/card-16.png', fmt: 'png', scale: 2 },
  { id: '2226:3843', dest: 'assets/images/cards/food/card-17.png', fmt: 'png', scale: 2 },
  { id: '2226:3854', dest: 'assets/images/cards/food/card-18.png', fmt: 'png', scale: 2 },

  // ── UI (PNG @2x) ───────────────────────────────────────────────────────────
  { id: '2258:3958', dest: 'assets/images/ui/confetti.png', fmt: 'png', scale: 2 },

  // ── Reference screens (JPG) ────────────────────────────────────────────────
  { id: '53:417',    dest: 'assets/images/screens/home.jpg',                  fmt: 'jpg', scale: 1 },
  { id: '2290:4582', dest: 'assets/images/screens/settings-code-vibes.jpg',   fmt: 'jpg', scale: 1 },
  { id: '2290:4713', dest: 'assets/images/screens/settings-games.jpg',        fmt: 'jpg', scale: 1 },
  { id: '2290:5036', dest: 'assets/images/screens/settings-da-projects.jpg',  fmt: 'jpg', scale: 1 },
  { id: '2290:5163', dest: 'assets/images/screens/settings-food.jpg',         fmt: 'jpg', scale: 1 },
  { id: '2062:3346', dest: 'assets/images/screens/game-code-vibes-16.jpg',    fmt: 'jpg', scale: 1 },
  { id: '2062:3556', dest: 'assets/images/screens/game-code-vibes-24.jpg',    fmt: 'jpg', scale: 1 },
  { id: '2161:1967', dest: 'assets/images/screens/game-code-vibes-36.jpg',    fmt: 'jpg', scale: 1 },
  { id: '2062:3964', dest: 'assets/images/screens/game-games-16.jpg',         fmt: 'jpg', scale: 1 },
  { id: '2078:3985', dest: 'assets/images/screens/game-games-24.jpg',         fmt: 'jpg', scale: 1 },
  { id: '2062:4475', dest: 'assets/images/screens/game-games-36.jpg',         fmt: 'jpg', scale: 1 },
  { id: '2123:1540', dest: 'assets/images/screens/game-over-01.jpg',          fmt: 'jpg', scale: 1 },
  { id: '2258:3945', dest: 'assets/images/screens/winner-01.jpg',             fmt: 'jpg', scale: 1 },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function figmaGet(apiUrl) {
  return new Promise((resolve, reject) => {
    const opts = Object.assign(url.parse(apiUrl), {
      headers: { 'X-Figma-Token': TOKEN },
    });
    let body = '';
    https.get(opts, (res) => {
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch (e) { reject(new Error('JSON parse error: ' + body.slice(0, 200))); }
      });
    }).on('error', reject);
  });
}

function downloadFile(fileUrl, destPath) {
  return new Promise((resolve, reject) => {
    const get = (u, redirects) => {
      if (redirects > 3) return reject(new Error('Too many redirects: ' + u));
      https.get(u, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307) {
          return get(res.headers.location, redirects + 1);
        }
        if (res.statusCode !== 200) {
          return reject(new Error('HTTP ' + res.statusCode + ' for ' + u));
        }
        const out = fs.createWriteStream(destPath);
        res.pipe(out);
        out.on('finish', resolve);
        out.on('error', reject);
      }).on('error', reject);
    };
    get(fileUrl, 0);
  });
}

async function runWithConcurrency(tasks, limit) {
  let i = 0;
  const workers = Array.from({ length: Math.min(limit, tasks.length) }, async () => {
    while (i < tasks.length) {
      const task = tasks[i++];
      await task();
    }
  });
  await Promise.all(workers);
}

function chunk(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
  return result;
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

async function main() {
  // 1. Create all destination directories
  const dirs = [...new Set(ASSETS.map(a => path.dirname(path.join(ROOT, a.dest))))];
  dirs.forEach(d => fs.mkdirSync(d, { recursive: true }));
  console.log('Directories ready.\n');

  // 2. Group by format+scale, request export URLs from Figma in batches
  const groups = {};
  ASSETS.forEach(a => {
    const key = a.fmt + '@' + a.scale;
    if (!groups[key]) groups[key] = [];
    groups[key].push(a);
  });

  const urlMap = {}; // normalised-id (with hyphen) → download URL

  for (const [key, items] of Object.entries(groups)) {
    const [fmt, scaleStr] = key.split('@');
    const scale = Number(scaleStr);
    const chunks = chunk(items, BATCH);
    for (let ci = 0; ci < chunks.length; ci++) {
      const ids = chunks[ci].map(a => a.id).join(',');
      const apiUrl =
        'https://api.figma.com/v1/images/' + FILE_KEY +
        '?ids=' + encodeURIComponent(ids) +
        '&format=' + fmt +
        '&scale=' + scale;
      process.stdout.write(
        'Figma API [' + fmt + ' @' + scale + 'x] batch ' + (ci + 1) + '/' + chunks.length + ' ... '
      );
      const result = await figmaGet(apiUrl);
      if (result.err) throw new Error('Figma API error: ' + result.err);
      Object.assign(urlMap, result.images || {});
      console.log('OK (' + Object.keys(result.images || {}).length + ' URLs)');
    }
  }

  console.log('\nDownloading ' + ASSETS.length + ' assets...\n');

  // 3. Build download tasks (Figma returns IDs with hyphen, not colon)
  const failures = [];
  const tasks = ASSETS.map(asset => async () => {
    const key = asset.id.replace(':', '-');
    const dlUrl = urlMap[key];
    if (!dlUrl) {
      failures.push({ dest: asset.dest, reason: 'no URL returned by Figma (node may not be exportable)' });
      console.log('  SKIP  ' + asset.dest);
      return;
    }
    try {
      await downloadFile(dlUrl, path.join(ROOT, asset.dest));
      console.log('  OK    ' + asset.dest);
    } catch (err) {
      failures.push({ dest: asset.dest, reason: err.message });
      console.log('  FAIL  ' + asset.dest + '  (' + err.message + ')');
    }
  });

  // 4. Download with concurrency cap
  await runWithConcurrency(tasks, PARALLEL);

  // 5. Summary
  console.log('\n' + '─'.repeat(60));
  if (failures.length === 0) {
    console.log('All ' + ASSETS.length + ' assets downloaded successfully.');
  } else {
    console.log((ASSETS.length - failures.length) + '/' + ASSETS.length + ' downloaded.');
    console.log('\nFailed (' + failures.length + '):');
    failures.forEach(f => console.log('  ✗  ' + f.dest + '\n       ' + f.reason));
    process.exit(1);
  }
}

main().catch(err => {
  console.error('\nFatal error:', err.message);
  process.exit(1);
});
