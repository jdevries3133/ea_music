#!/bin/sh

# Development entrypoint

export PORT=8000
export DATABASE_URL=postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:5432/$POSTGRES_DB

yarn prisma:migrate-prod

yarn dev
