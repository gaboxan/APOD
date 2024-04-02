from node:18 as build-step

RUN mkdir -p /app

WORkDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

FROM nginx:latest

COPY --from=build-step /app/dist/Apod/browser /usr/share/nginx/html