# 📁 Express TypeScript Advanced

A boilerplate Node.js application using **TypeScript**, **Express**, **Zod**, **JWT**, **Winston**, and more—optimized for production-ready API development with best practices.

---

## 📂 Project Structure

```txt
express-typescript-advanced/
├── src
│   ├── app.ts
│   ├── server.ts
│   ├── config
│   │   ├── env.config.ts
│   │   └── index.ts
│   ├── common
│   │   ├── dtos/
│   │   │   ├── api-response.dto.ts
│   │   │   └── index.ts
│   │   ├── enums/
│   │   │   ├── cookie-name.enum.ts
│   │   │   ├── environment.enum.ts
│   │   │   ├── sort-order.enum.ts
│   │   │   └── index.ts
│   │   ├── exceptions/
│   │   │   └── http.exception.ts
│   │   ├── interfaces/
│   │   ├── middlewares/
│   │   │   ├── error-handler.middleware.ts
│   │   │   ├── global.middleware.ts
│   │   │   ├── apply.middleware.ts
│   │   │   ├── http-logger.middleware.ts
│   │   │   ├── ip-blacklist.middleware.ts
│   │   │   ├── jwt-check.middleware.ts
│   │   │   ├── not-found.middleware.ts
│   │   │   ├── rate-limiter.middleware.ts
│   │   │   ├── role-check.middleware.ts
│   │   │   ├── validate-body.middleware.ts
│   │   │   ├── validate-pagination-query.middleware.ts
│   │   │   ├── validate-uuid.middleware.ts
│   │   │   └── index.ts
│   │   ├── schema/
│   │   │   ├── boolean.schema.ts
│   │   │   ├── date-time.schema.ts
│   │   │   ├── email.schema.ts
│   │   │   ├── ip.schema.ts
│   │   │   ├── non-empty.schema.ts
│   │   │   ├── nullable.schema.ts
│   │   │   ├── number.schema.ts
│   │   │   ├── pagination.schema.ts
│   │   │   ├── password.schema.ts
│   │   │   ├── ymd-date.schema.ts
│   │   │   ├── uuid.schema.ts
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   ├── cookie.service.ts
│   │   │   ├── jwt.service.ts
│   │   │   ├── logger.service.ts
│   │   │   ├── memory-cache.service.ts
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   ├── generic-fields.type.ts
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   ├── date.util.ts
│   │   │   ├── helpers.util.ts
│   │   │   ├── http.util.ts
│   │   │   ├── with-cache.util.ts
│   │   │   └── index.ts
│   ├── modules/
│   │   ├── user/
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   ├── constants/
│   │   │   │   └── messages.constants.ts
│   │   │   ├── interfaces/
│   │   │   │   ├── index.ts
│   │   │   │   └── user-service.interface.ts
│   │   │   └── schema/
│   │   │       └── user.schema.ts
│   │   └── api.router.ts
├── .env.local
├── .env.development
├── .env.production
├── .env.common
├── .gitignore
├── .dockerignore
├── Dockerfile
├── docker-compose.yaml
├── docker-start.sh
├── generate-dependencies.sh
├── generate-tree.sh
├── nodemon.json
├── package.json
├── package-lock.json
├── tsconfig.json
├── .eslintrc.js
├── .prettierrc
├── jest.config.js
├── README.md
├── dependencies.md
├── directory-structure.md
```

---

## 📦 Installation

```bash
git clone https://github.com/tejasmahajan02/express-typescript-advanced.git
cd express-typescript-advanced
npm install
```

---

## 🔧 Environment Variables

You can manage environments via `.env.*` files. For example:

```env
# .env.local
NODE_ENV=local
PORT=3000
JWT_SECRET=your_jwt_secret
```

---

## 🛠 Available Scripts

| Script                | Description                                     |
| --------------------- | ----------------------------------------------- |
| `npm run build`       | Compile TypeScript to JavaScript                |
| `npm start`           | Start the server (after build)                  |
| `npm run dev`         | Start dev server with hot-reload (TS + nodemon) |
| `npm run start:local` | Start with `NODE_ENV=local`                     |
| `npm run start:dev`   | Start with `NODE_ENV=development`               |
| `npm run start:prod`  | Start with `NODE_ENV=production`                |
| `npm test`            | Run all tests using Jest                        |
| `npm run test:watch`  | Run Jest in watch mode                          |
| `npm run lint`        | Lint code using ESLint                          |

---

```json
{
  "build": "rm -rf dist && npx tsc && node build.copy.js"
}
```

## 🚀 Running the Project

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run build
npm start
```

---

## ✅ Running Tests

```bash
npm run test
```

---

## 📜 License

This project is licensed under the ISC License.

---
