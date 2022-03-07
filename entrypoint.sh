#!/bin/sh

# Production entrypoint

echo "DATABASE_URL=postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:5432/$POSTGRES_DB" \
    >> .env

yarn prisma:generate
yarn prisma:migrate-prod

exec yarn start
