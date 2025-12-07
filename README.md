# 🚀 QuickBlog – AI-Powered Full Stack Blog Platform

QuickBlog is a full stack blog system built with the MERN stack. Admins post blogs, manage comments, and upload images. The UI stays clean and responsive. The project includes protected routes, token based login, and smooth content management.

---

## ✨ Features

- 🧠 AI-Powered Blog Generation using Google Gemini API
- 🖼️ Optimized blog image uploads and CDN delivery via ImageKit
- 🧑‍💼 Admin Dashboard for blog and comment management (CRUD)
- 🔐 Secure authentication using JWT and protected admin routes
- 📱 Responsive design using Tailwind CSS and Framer Motion
- 🌐 Fully deployed on Vercel

---

## 🧰 Tech Stack

**Frontend:** React.js, Tailwind CSS, Framer Motion, React Router DOM, React Quill, Marked  
**Backend:** Node.js, Express.js, MongoDB  
**APIs & Tools:** Google Gemini API, ImageKit, JWT, Multer, Axios, CORS  
**Deployment:** Vercel

---

## 🚀 Live Demo

🔗 [QuickBlog](https://quick-blog-six-lac.vercel.app/)

---

## 🛠️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/abhirajput-19/quickblog.git

# Go into the client folder
cd quickblog/client/
npm install
npm run dev

# Go into the server folder
cd quickblog/server/
npm install
npm run server
```
> ⚠️ **Note:** This project uses environment variables for both the client and server.  
Please make sure to create `.env` files in both folders with the following keys:

---

## 🔐 Frontend Environment Variables (/client/.env)

```env
VITE_BASE_URL ="http://localhost:3000"
```

---

## 🔐 Backend Environment Variables (/server/.env)

```env
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

---


## 🙋 Author
### Mounika
- [LinkedIn](https://www.linkedin.com/in/vemulamounika1025/) 
- [GitHub](https://github.com/mounika-2510/)









