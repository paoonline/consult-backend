# 📦 Prisma Schema Overview

This project uses **Prisma ORM** to manage PostgreSQL schemas with clear relations, enums, and data modeling.

---

## ⚙️ Configuration

```ts
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

- Uses **Prisma Client** to interact with the database.
- Uses **PostgreSQL** as the underlying database engine.

---

## 📚 Core Models

### 🔐 `login`

Stores login history of a user by email.

| Field       | Type      | Notes                    |
|-------------|-----------|--------------------------|
| `id`        | String    | Primary key (UUID)       |
| `email_id`  | String    | Email used for login     |
| `login_date`| DateTime? | Optional. Defaults to now() |

---

### 💰 `PaymentTransaction`

Stores payment information for consult transactions.

| Field                    | Type              | Notes                                 |
|--------------------------|-------------------|---------------------------------------|
| `id`                     | String            | Primary key                           |
| `price`                  | Float             | Default = 0.00                        |
| `payment_date`           | DateTime          | Default = now()                       |
| `consult_transaction_id` | String            | Unique. FK to `ConsultTransaction`    |
| `customer_id`            | String?           | FK to `Customer` (payer)              |
| `consult_id`             | String?           | FK to `Customer` (receiver)           |

> ✅ Indexed by: `customer_id`, `consult_id`  
> 🧭 Table: `payment_transaction`

---

### 🤝 `ConsultTransaction`

Represents a consulting session between customer and consultant.

| Field                  | Type                  | Notes                                  |
|------------------------|-----------------------|----------------------------------------|
| `customer_id`          | String                | FK to `Customer` (client)              |
| `consult_id`           | String                | FK to `Customer` (consultant)          |
| `start_date`, `end_date` | DateTime           | Time range of consultation            |
| `time_list`            | TimeLimitType         | Enum                                   |
| `is_pass`              | Boolean               | Default: false                         |
| `paymentTransaction`   | PaymentTransaction?   | One-to-one                             |
| `consultNotification`  | ConsultNotification?  | One-to-one                             |

> 🧭 Table: `consult_transaction`

---

### 👤 `Customer`

Main user model representing either a customer or consultant.

- **One-to-one**: `CustomerDetail`  
- **One-to-many**: `ConsultTransaction`, `PaymentTransaction`, `DeviceToken`  
- **Many-to-many**: `Skill`

| Field           | Type             | Notes                         |
|-----------------|------------------|-------------------------------|
| `email`         | String           | Unique                        |
| `password`, `job`, `phone_number` | String | Basic profile info |
| `customer_type` | CustomerType     | Enum                          |
| `online_status` | Boolean          | Default: false                |
| `verify_email`  | Boolean          | Default: false                |

> 🧭 Table: `customer`

---

### 🔔 `ConsultNotification`

Push notification related to a consult transaction.

| Field                    | Type              | Notes                              |
|--------------------------|-------------------|------------------------------------|
| `title`, `description`   | String            | Notification content               |
| `is_push_noti`           | Boolean           | Push status                        |
| `consult_transaction_id` | String            | FK to `ConsultTransaction`         |
| `device_token_id`        | String            | FK to `DeviceToken`                |

> 🧭 Table: `notification`

---

### 📱 `DeviceToken`

Represents FCM device token registration.

| Field        | Type          | Notes                          |
|--------------|---------------|--------------------------------|
| `token`      | String        | Unique                         |
| `platform`   | PlatformType  | Enum: web, ios, android        |
| `customer_id`| String        | FK to `Customer`               |
| `active`     | Boolean       | Default: true                  |

---

### 🗒️ `Note`

Simple note linked to a consult transaction.

| Field                  | Type     | Notes                      |
|------------------------|----------|----------------------------|
| `description`          | String   | Note content               |
| `note_date`            | DateTime | Default: now()             |
| `consult_transaction_id` | String | FK to `ConsultTransaction` |

> 🧭 Table: `note`

---

### 💬 `ConsultComment`

Review or rating left by a customer.

| Field                    | Type         | Notes                              |
|--------------------------|--------------|------------------------------------|
| `description`, `rate`    | String, Int  | Comment content and rating         |
| `consult_transaction_id` | String       | FK to `ConsultTransaction`         |
| `customer_detail_id`     | String       | FK to `CustomerDetail`             |

> 🧭 Table: `consult_comment`

---

### 📄 `CustomerDetail`

Extended profile data, including pricing and rating.

- One-to-one with `Customer`
- One-to-many with `Booking`, `ConsultComment`

> 🧭 Table: `customer_detail`

---

### 🧠 `Skill`

Many-to-many relation to represent user expertise.

> 🧭 Table: `skill`

---

### 📅 `Booking`

Time slot booked by a customer.

| Field              | Type     | Notes                        |
|--------------------|----------|------------------------------|
| `time`             | DateTime | Booking time                 |
| `customer_detail_id` | String | FK to `CustomerDetail`       |

> 🧭 Table: `booking`

---

## 🔘 Enums

### `CustomerType`

```ts
CONSULT
CUSTOMER
```

---

### `TimeLimitType`

```ts
ONE_HR
TWO_HR
```

---

### `PlatformType`

```ts
web
ios
android
```

---

## 📌 Developer Notes

- Use `npx prisma migrate dev` to apply schema changes
- Use `npx prisma generate` to update Prisma Client
- DB connection URL is stored in `.env` as `DATABASE_URL`
- All models use UUIDs (`@default(uuid())`) for primary keys
