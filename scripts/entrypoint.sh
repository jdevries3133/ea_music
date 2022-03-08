#!/bin/sh

# Production entrypoint

export DATABASE_URL=postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:5432/$POSTGRES_DB
export PORT=8000

yarn prisma:migrate-prod

yarn start
