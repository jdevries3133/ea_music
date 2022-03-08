#!/bin/sh

# Debug entrypoint

echo "DATABASE_URL=postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:5432/$POSTGRES_DB" \
    >> .env

yarn prisma:migrate-prod

exec node --inspect-brk=0.0.0.0 ./node_modules/.bin/remix dev
