# Vendor Management App

A modern, multi-user Vendor Management system built with **Next.js**, **MongoDB**, **Tailwind CSS**, and **Google authentication**.

## Features

- **Google Login** (NextAuth.js)
- **Create, edit, delete vendors**
- **All users share a common vendor database** (no user isolation)
- **Duplicate bank account numbers are currently allowed**
- **Responsive, glassmorphic UI** (Tailwind CSS)
- **MongoDB** for persistent storage

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root with:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<your-db>?retryWrites=true&w=majority
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret
```
- Get Google credentials from [Google Cloud Console](https://console.developers.google.com/).
- Set up your MongoDB URI (Atlas or local).

### 3. Run the development server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

## Usage
- **Sign in** with your Google account.
- **Create vendors** with unique bank account numbers (per user).
- **Edit or delete** your vendors.
- Each user's vendor list is private and isolated.

## Project Structure
- `/pages` - Next.js pages (API and frontend)
- `/components` - React UI components
- `/models` - Mongoose models
- `/lib` - Database connection utilities
- `/styles` - Tailwind CSS

## Customization
- Update Tailwind styles in `styles/globals.css`.
- Vendor schema: see `models/Vendor.js`.
- Authentication: see `pages/api/auth/[...nextauth].js`.

## License
MIT

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
