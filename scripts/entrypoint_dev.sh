#!/bin/sh

# Development entrypoint

export PORT=8000
yarn prisma:migrate-prod
yarn dev
