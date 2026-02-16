FROM node:lts as builder

WORKDIR /app

# Copy package.json only (not package-lock.json to avoid platform issues)
COPY package.json ./

# Install dependencies fresh in the container
RUN npm cache clean --force
RUN npm install --no-package-lock --no-save

# Force reinstall rollup with correct platform binaries
RUN npm uninstall rollup && npm install rollup --no-save

# Copy source code
COPY . .

ENV NODE_OPTIONS=--max-old-space-size=4096

ARG VITE_BASE_API
# ARG VITE_APP_GOOGLE_SIGNIN_CLIENT_ID
# ARG VITE_LINKEDIN_CLIENT_ID
# ARG VITE_APP_MAPBOX_ACCESS_TOKEN
# ARG GENERATE_SOURCEMAP

ENV VITE_BASE_API=${VITE_BASE_API}
# ENV VITE_APP_GOOGLE_SIGNIN_CLIENT_ID=${VITE_APP_GOOGLE_SIGNIN_CLIENT_ID}
# ENV VITE_LINKEDIN_CLIENT_ID=${VITE_LINKEDIN_CLIENT_ID}
# ENV VITE_APP_MAPBOX_ACCESS_TOKEN=${VITE_APP_MAPBOX_ACCESS_TOKEN}
# ENV GENERATE_SOURCEMAP=${GENERATE_SOURCEMAP}

# Build the application
RUN npm run build

FROM nginx:latest

COPY --from=builder /app/dist /usr/share/nginx/html

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]