#!/bin/sh

# Production entrypoint

export PORT=8000
yarn prisma:migrate-prod
yarn start
