FROM node:18-alpine

# install dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Copy all local files into the image.
COPY . .

# build app
RUN npm run build
#RUN npm prune --production

# second stage
#FROM node:16-alpine

#WORKDIR /app
#COPY --from=0 /app/build ./build
# COPY --from=0 /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "./build"]