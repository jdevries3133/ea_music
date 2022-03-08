#!/bin/sh

# Debug entrypoint

export PORT=8000 
export DATABASE_URL=postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:5432/$POSTGRES_DB 

yarn prisma:migrate-prod

node --inspect-brk=0.0.0.0 ./node_modules/.bin/remix dev
