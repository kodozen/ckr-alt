#!/bin/zsh
# Baut die Seite für https://ckrreinigung.at und legt ein fertiges
# Paket zum Hochladen auf den Schreibtisch.
set -e
cd "$(dirname "$0")/.."
export BASIS_PFAD=/ BASIS_URL=https://ckrreinigung.at NODE_ENV=production
npx --yes pnpm@10.4.1 exec vite build >/dev/null
npx --yes pnpm@10.4.1 exec vite build --config vite.ssr.config.ts >/dev/null
node tools/vorrendern.mjs

# Prüfsumme des eingebetteten Skripts für die Content-Security-Policy
HASH=$(node -e '
const fs=require("fs"); const h=fs.readFileSync("dist/public/index.html","utf8");
const s=[...h.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
if(s.length!==1){console.error("Erwartet genau ein eingebettetes Skript, gefunden: "+s.length);process.exit(1)}
console.log("'"'"'sha256-"+require("crypto").createHash("sha256").update(s[0]).digest("base64")+"'"'"'");')
sed "s#__SKRIPT_HASH__#${HASH}#" tools/onecom/htaccess.vorlage > dist/public/.htaccess

ZIEL="$HOME/Desktop/ckr-yeni-site"
rm -rf "$ZIEL" "$ZIEL.zip"
cp -R dist/public "$ZIEL"
rm -rf "$ZIEL/__manus__"
(cd "$ZIEL" && zip -qr "$ZIEL.zip" . -x '.DS_Store')
echo "Paket: $ZIEL  ($(du -sh "$ZIEL" | cut -f1)), Zip: $ZIEL.zip"
