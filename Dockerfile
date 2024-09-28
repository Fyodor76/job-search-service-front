# Этап сборки (builder)
FROM node:18-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и yarn.lock
COPY package.json yarn.lock ./

# Устанавливаем зависимости (без dev-зависимостей для продакшн)
RUN yarn install --production

# Копируем все файлы проекта
COPY . .

# Собираем проект
RUN yarn build

# Этап финального образа (runner)
FROM node:18-alpine AS runner

# Рабочая директория
WORKDIR /app

# Копируем собранные файлы из builder
COPY --from=builder /app /app

# Открываем порт для сервера (по умолчанию 3000 для Next.js)
EXPOSE 3000

# Команда для запуска приложения
CMD ["yarn", "start"]
