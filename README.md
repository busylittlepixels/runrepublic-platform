<!-- PROJECT LOGO -->
<p align="center">

  <h3 align="center">Run Republic Platform</h3>

  
# Platform Starter Kit Example

Run Republic Platform showcases the new Run Republic Platform API. It was built using the [T3 Stack](https://create.t3.gg/) with [Supabase](https://supabase.com/) as the Postgres Database and Image Storage host.

## How to use

**1. Clone the repository**

HTTPS:

```bash
git clone https://github.com/busylittlepixels/runrepublic-platform.git
```

GitHub CLI:

```bash
gh repo clone busylittlepixels/runrepublic-platform
```

**2. Move into the Starter**

```bash
cd runrepublic-platform/
```

**3. Install dependencies**

<!-- note(richard): We require pnpm since we have this version deployed; if we separate example source from our deployed version, we free up the package manager choice. -->

> [!IMPORTANT]  
> **Package Manager:** This repository is deployed as-is and therefore contains a `pnpm-lock.yaml` file. As a result, you currently have to use `pnpm` as your package manager to ensure that the dependencies are installed correctly.

```bash
pnpm install
```

**4. Set Environment Variables**

We provide most environment variables out of the box (including Cal-related variables).

So get started by copying the `.env.example`:

```bash
cp .env.example .env
```

_4.1 Database_

This project uses Postgres with Supabase. You can create a free project at [database.new](https://database.new/).

Then, get the Database URL from the [Supabase dashboard](https://supabase.com/dashboard/project/_/settings/database) and update the respective values in your `.env` file:

```.env
POSTGRES_PRISMA_URL="postgres://postgres.YOUR-PROJECT-REF:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1" # Transaction Mode
POSTGRES_URL_NON_POOLING="postgres://postgres.YOUR-PROJECT-REF:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"  # Session Mode
```

When working locally you can use the DB URL: `postgresql://postgres:postgres@127.0.0.1:54322/postgres` outputted by the `supabase start` command for both vairables.

[Only needed when deploying manually] Initialize the database:

Note that if you used the Vercel Deploy link from above, the Supabase Vercel integration sets this up automatically for you!

```bash
pnpm db:init
pnpm db:seed # Will throw an error if DB is already seeded, which you can ignore.
```

Prisma will create a `_prisma_migrations` table on the `public` database schema. In Supabase, the public schema is exposed via the API by default. To secure the table, navigate to the [Table Editor](https://supabase.com/dashboard/project/_/editor), click on "RLS diasbaled" > "Enable RLS for this table".

Alternatively, you can run the follow SQL statement on your database, e.g. via the [SQL Editor](https://supabase.com/dashboard/project/_/sql/new) in the Supabase Dashboard:

```sql
ALTER TABLE "public"."_prisma_migrations" ENABLE ROW LEVEL SECURITY;
```

Lastly, in your [Supabase Dashboard](https://supabase.com/dashboard/project/_/storage/buckets) create a public `avatars` bucket to store the profile pictures.

_4.2 Authentication_

Generate a NextAuth secret and add it to your `.env` file:

```bash
openssl rand -hex 32
```

```.env
# Next Auth
# You can generate a new secret on the command line with
# openssl rand -base64 32
# <https://next-auth.js.org/configuration/options#secret>

AUTH_SECRET="SQhGk****"
```

```.env
# 3/ *REFRESH URL.* You have to expose an endpoint that will be used from calcom: https://runrepublic.com/docs/platform/quick-start#4.-backend:-setting-up-refresh-token-endpoint

NEXT_PUBLIC_REFRESH_URL="https://<your-project>.vercel.app/api/cal/refresh"
```

**4. Development Server**
From here, you're all set. Just start the development server & get going.

```bash
pnpm dev
```

## What's next? 
If you are not familiar with the different technologies used in this project, please refer to the respective docs.

- [Run Republic Platform](https://runrepublic.com/platform)
- [Next.js](https://nextjs.org)
- [Supabase](https://supabase.com)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More about Run Republic Platform

Visit our documentation at [Run Republic/docs/platform](https://runrepublic.com/docs/platform) or join our [Discord](https://go.Run Republic/discord).

Contact sales to purchase a commercial API key here: [Run Republic/sales](https://runrepublic.com/sales).

## Learn More about T3

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

