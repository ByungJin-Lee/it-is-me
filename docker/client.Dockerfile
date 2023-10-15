FROM node:16-alpine as base

FROM base as deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml .pnp.* ./
COPY .yarn ./.yarn

RUN sed -i '1s/pnp/node-modules/g' .yarnrc.yml

RUN yarn install --frozen-lockfile

FROM base as builder
WORKDIR /app

COPY . .
COPY --from=deps /app ./

RUN yarn build

FROM base as runner
WORKDIR /app
ENV NODE_ENV production

# os 
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]