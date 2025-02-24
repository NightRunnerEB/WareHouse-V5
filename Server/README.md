# 📦 Warehouse API (PostgreSQL + Express.js)

Этот проект представляет собой серверное приложение для управления товарами и категориями на складе. Он предоставляет REST API с полным набором CRUD-операций.

## Стек технологий

- Node.js + Express.js
- PostgreSQL
- TypeScript
- `pg` (PostgreSQL клиент)
- REST API
- Postman (для тестирования)

---

## Запуск проекта

1. **Клонируй репозиторий:**

```bash
git clone https://github.com/your-username/warehouse-v5.git
cd warehouse-v5
```

2. **Установи зависимости:**

```bash
npm install
```

3. **Создай .env файл в корне:**

```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=warehouse_db
DB_PASSWORD=1234
DB_PORT=5432
PORT=5000
```

4. **Создай базу данных PostgreSQL (если ещё нет):**

```sql
CREATE DATABASE warehouse_db;
```

5. **Создай таблицы в базе данных:**

```sql
-- Таблица категорий
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

-- Таблица товаров
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price NUMERIC NOT NULL
);
```

6. **Запусти сервер:**

```bash
npm run dev
```

---

## 📫 Доступные маршруты (Endpoints)

### Продукты (`/api/products`)

| Метод | Путь               | Описание                     |
|-------|--------------------|------------------------------|
| GET   | `/`                | Получить все товары (с пагинацией) |
| GET   | `/:id`             | Получить товар по ID         |
| POST  | `/`                | Создать новый товар          |
| PUT   | `/:id`             | Обновить товар по ID         |
| DELETE| `/:id`             | Удалить товар по ID          |

**Пример POST запроса:**

```json
POST /api/products
{
  "name": "iPhone 13",
  "description": "Смартфон Apple",
  "category": "Смартфоны",
  "quantity": 10,
  "price": 99900
}
```

---

### 🗂 Категории (`/api/categories`)

| Метод | Путь               | Описание                     |
|-------|--------------------|------------------------------|
| GET   | `/`                | Получить все категории       |
| GET   | `/:id`             | Получить категорию по ID     |
| POST  | `/`                | Создать новую категорию      |
| PUT   | `/:id`             | Обновить категорию по ID     |
| DELETE| `/:id`             | Удалить категорию по ID      |

**Пример POST запроса:**

```json
POST /api/categories
{
  "name": "Ноутбуки"
}
```

---

## Тестирование с Postman

1. Открой Postman
2. Импортируй коллекцию или создай вручную запросы по эндпоинтам выше
3. Убедись, что сервер запущен по адресу `http://localhost:5000`

---

## Примечания

- Все поля обязательны при создании и обновлении.
- Реализована базовая валидация и обработка ошибок.
- В качестве БД используется PostgreSQL — вы можете изменить настройки в `.env`.
