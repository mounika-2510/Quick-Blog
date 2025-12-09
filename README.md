# 🚀 QuickBlog – AI Powered Full Stack Blog Platform

QuickBlog is a full stack blog system built with the MERN stack. Admins post blogs, manage comments, and upload images. The UI stays simple and responsive. The project includes protected routes, token based login, and structured content management.

# ✨ Features

🤖 AI generated blog content using Google Gemini API

🖼️ Image upload and CDN delivery using ImageKit

🛠️ Admin dashboard with blog and comment management

🔐 JWT based authentication with protected routes

📱 Responsive design using Tailwind CSS and Framer Motion

🌍 Deployed on Vercel

# 🧰 Tech Stack

Frontend: React.js, Tailwind CSS, Framer Motion, React Router DOM, React Quill, Marked
Backend: Node.js, Express.js, MongoDB
APIs and Tools: Google Gemini API, ImageKit, JWT, Multer, Axios, CORS
Deployment: Vercel

# 🚀 Live Demo

🔗 https://quick-blog-six-lac.vercel.app/

# 📦 Installation and Setup

## Clone the repository
```
git clone https://github.com/mounika-2510/Quick-Blog.git
```

## Go into the client folder
```
cd Quick-Blog/client
npm install
npm run dev
```
## Go into the server folder
```
cd ../server
npm install
npm run server
```
Create .env files in both folders before running the project.

## 🔐 Frontend Environment Variables (/client/.env)
```
VITE_BASE_URL="http://localhost:3000"
```

## 🔐 Backend Environment Variables (/server/.env)
```
PORT=3000
JWT_SECRET=[your_jwt_secret_key]
ADMIN_EMAIL=[your_admin_email]
ADMIN_PASSWORD=[your_admin_password]
MONGODB_URI=[your_mongodb_connection_string]
IMAGEKIT_PUBLIC_KEY=[your_imagekit_public_key]
IMAGEKIT_PRIVATE_KEY=[your_imagekit_private_key]
IMAGEKIT_URL_ENDPOINT=[your_imagekit_url_endpoint]
GEMINI_API_KEY=[your_google_gemini_api_key]
```
## 🧑‍💼 Admin Credentials

- Email: admin@gmail.com
- Password: 123456
