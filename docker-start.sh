#!/bin/bash

docker build -t express-typescript-advanced . &&
docker run -p 3000:3000 express-typescript-advanced