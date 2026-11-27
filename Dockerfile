FROM node:26-alpine AS node-builder

# Обновляем список пакетов и устанавливаем Bash
# Ключ --no-cache предотвращает сохранение пакетов в кэш, что помогает уменьшить размер образа
RUN apk update && apk add --no-cache bash

WORKDIR /app

ENV PATH=/app/node_modules/.bin:$PATH

COPY package.json ./
# COPY package-lock.json ./

RUN npm install
COPY . ./

# Копируем сам скрипт и делаем его исполняемым
COPY startup.sh .
RUN chmod +x startup.sh

# Запускаем скрипт при старте контейнера
CMD ["./startup.sh"]