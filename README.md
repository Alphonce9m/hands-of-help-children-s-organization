# Hands of Help

A modern website for Hands of Help, a community organization dedicated to empowering communities through education, digital literacy, and support programs.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://github.com/yourusername/hands-of-help/actions/workflows/ci.yml/badge.svg)](https://github.com/yourusername/hands-of-help/actions)

## Features

- Responsive design for all devices
- Modern UI with Tailwind CSS
- Interactive components
- SEO-friendly
- Fast performance with Next.js

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- ESLint

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# App
NODE_ENV=development
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/handsofhelp?schema=public"

# NextAuth
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# M-Pesa (M-Panga)
MPANGA_API_KEY=your-mpanga-api-key
MPANGA_ENVIRONMENT=sandbox  # or 'production'

# Email (SMTP)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-email-password
SMTP_FROM=Hands of Help <noreply@handsofhelp.org>
```

### Database Setup

1. Create a new PostgreSQL database
2. Run database migrations:
   ```bash
   npx prisma migrate dev --name init
   ```
3. Seed the database (optional):
   ```bash
   npx prisma db seed
   ```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/hands-of-help.git
cd hands-of-help
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── about/          # About page
│   ├── contact/        # Contact page
│   ├── donate/         # Donate page
│   ├── programs/       # Programs page
│   ├── volunteer/      # Volunteer page
│   ├── globals.css     # Global styles
│   └── page.tsx        # Home page
├── components/         # Reusable components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Container.tsx
│   ├── Layout.tsx
│   └── Section.tsx
└── public/            # Static assets
    └── images/
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)
Project Link: [https://github.com/yourusername/hands-of-help](https://github.com/yourusername/hands-of-help)

---

<div align="center">
  Made with ❤️ by Hands of Help Team
</div>