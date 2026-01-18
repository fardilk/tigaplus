FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
RUN apk add --no-cache certbot

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443

CMD ["sh", "-c", "certbot certonly --standalone -d tigaplus.com --email fardil.khalidi@gmail.com --agree-tos --non-interactive || true && nginx -g 'daemon off;'"]