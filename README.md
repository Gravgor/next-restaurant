## 🧑‍🍳 Recruitment Task: Simple Restaurant Application

Hi! Your task is to implement a basic restaurant application using a pre-configured **Next.js** template. This exercise is designed to check your skills in working with modern web frameworks, PostgreSQL via Supabase, and Prisma ORM.

### 🚀 Getting Started

1. **Clone the repository** with the provided Next.js template.
2. **Set up the environment** by creating a `.env` file and adding the Supabase PostgreSQL connection strings:

```
DATABASE_URL=supabase_database_url
DIRECT_URL=supabase_direct-url
```

Our task is to create a table in the database to manage meals and orders. In the application, we want to be able to create an order (meal selection and quantity) and then list them on the main page.
Most of the components are already created, you need to focus on creating the data model and integrating it to the application.

### 🗂️ Requirements

#### 1. **Pull repository and set up environment**

Pull this repository and set up Postgres database locally using the
```
docker-compose up
```

It should create a postgres database locally on your computer.

#### 2. **Create the Data Model**

Our database should contain meal and order tables which will allow multiple orders to be added along with multiple meals.

- In `prisma/schema.prisma`, define the proper models.

```
Meal:
  1. ID
  2. name
  3. price
  4. orders
```

```
Order:
  1. ID
  2. date of creation
  3. meals
```

```
OrderMeal (relation table):
  1. all ids representing the relation
  2. quantity
```

#### 3. **Migrate and seed the database**

- Create an `init` migration
- Complete a script to seed the database(`prisma/seed.ts`) with the following meals:

  | Name            | Price (USD) |
  | --------------- | ----------- |
  | Salmon Nigiri   | \$24.49     |
  | Tuna Roll       | \$21.99     |
  | Eel Avocado     | \$22.99     |
  | California Roll | \$23.49     |

and run it (`npm run seed`)

#### 4. **Implement core functionality**

- Create an order:
  - Complete the order form in `create-order.tsx` component (use react-hook-form or any other form library)
  - User should be able to select a meal and increment/decrement the quantity 
  - Provide type safety and form validation (zod or any other validation library can be used)
  - Create an order record in the database and refresh the order list page
- List all orders displaying the `order id`, `creation date` and `all meals` with `quantity`, `meal price` and `total price` of order
