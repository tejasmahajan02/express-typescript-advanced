# generate-dependencies.sh
echo "# Production Dependencies" > dependencies.md
npm ls --prod --depth=0 --parseable=true | tail -n +2 | sed 's/.*node_modules\///' >> dependencies.md

echo "" >> dependencies.md
echo "# Dev Dependencies" >> dependencies.md
npm ls --dev --depth=0 --parseable=true | tail -n +2 | sed 's/.*node_modules\///' >> dependencies.md
