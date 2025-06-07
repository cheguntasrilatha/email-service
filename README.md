# Email Service Provider

A resilient email sending service built with TypeScript featuring:
- ✅ Retry with exponential backoff
- ✅ Fallback between providers
- ✅ Idempotency to avoid duplicate emails
- ✅ Rate limiting
- ✅ Status tracking
- ✅ Circuit breaker pattern
- ✅ Logging
- ✅ REST API endpoint

## 📦 Setup

```bash
git clone https://github.com/your-username/email-service.git
cd email-service
npm install
```

## 🚀 Run Service Locally

```bash
npm start
```

## 🌍 API Usage

POST `/send-email`

```json
{
  "to": "user@example.com",
  "subject": "Welcome!",
  "body": "Thanks for signing up!",
  "idempotencyKey": "unique-123"
}
```

## 🧪 Run Unit Tests

```bash
npm test
```

## 📦 Deployment (e.g., Railway)
- Push repo to GitHub
- Create new Railway project
- Set build command: `npm install`
- Set start command: `npm start`
- Access deployed endpoint at `https://your-app.railway.app/send-email`

## 🧾 Assumptions
- Providers randomly fail to simulate fallback
- Max 5 emails per 10s (rate limit)
- Status tracked in-memory (can be extended to DB)

---

