#!/bin/bash

echo '```text' > directory-structure.md
find . \
  -path './node_modules' -prune -o \
  -path './dist' -prune -o \
  -path './.git' -prune -o \
  -path './logs' -prune -o \
  -print \
| sed -e 's;[^/]*/;│   ;g;s;│   \([^│]\);├── \1;' >> directory-structure.md
echo '```' >> directory-structure.md
