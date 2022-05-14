#!/bin/sh

# Debug entrypoint

export PORT=8000 

yarn prisma:migrate-prod

node --inspect-brk=0.0.0.0 ./node_modules/.bin/remix dev
