#!/bin/sh

# Development entrypoint

echo "DATABASE_URL=postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:5432/$POSTGRES_DB" \
    >> .env

yarn prisma:migrate-prod

exec yarn dev
