# প্রজেক্ট Workflow

এই ডকুমেন্টে এই প্রজেক্টের পুরো কাজ করার ধাপ বাংলায় লেখা হয়েছে। এখানে frontend, backend, authentication, database, এবং route flow একসাথে বোঝানো হয়েছে।

## 1) প্রজেক্টের মোট কাঠামো

এই প্রজেক্ট দুই ভাগে ভাগ করা:

- `backend` - Express, MongoDB, JWT, bcrypt, cookie-parser, multer ব্যবহার করে API বানানো হয়েছে।
- `frontend` - React + Vite ব্যবহার করে UI বানানো হয়েছে।

## 2) কীভাবে প্রজেক্ট রান হয়

### Backend চালানো

- আগে `.env` ফাইলে `MONGO_URI` এবং `JWT_SECRET` থাকতে হবে।
- তারপর `backend` folder-এ গিয়ে `npm install` করতে হবে।
- এরপর `npm start` দিলে `server.js` থেকে backend start হয়।
- `server.js` প্রথমে database-এর সাথে connect করে, তারপর `app.listen(3000)` চালায়।

### Frontend চালানো

- `frontend` folder-এ গিয়ে `npm install` করতে হবে।
- তারপর `npm run dev` দিলে Vite dev server চালু হয়।
- React app `BrowserRouter` দিয়ে route manage করে।

## 3) Backend startup flow

Backend-এর main flow এইভাবে কাজ করে:

1. `server.js` থেকে `.env` load হয়।
2. `connectToDb()` দিয়ে MongoDB connect হয়।
3. `app.js` এ express app configure করা হয়।
4. `cors`, `express.json()`, `cookie-parser`, এবং static public folder set করা হয়।
5. API route গুলো mount করা হয়:
   - `/api/auth`
   - `/api/posts`
   - `/api/users`
6. শেষে server port 3000-এ run করে।

## 4) Frontend startup flow

Frontend-এর startup flow:

1. `main.jsx` এ app render হয়।
2. `BrowserRouter` দিয়ে পুরো app route-enabled হয়।
3. `App.jsx` এর ভিতরে `AuthProvider` বসানো আছে।
4. `AppRoute.jsx` route decide করে।
5. root path `/` এ গেলে `localStorage`-এর token দেখে `/home` অথবা `/login` এ redirect করে।

## 5) Authentication workflow

এই প্রজেক্টে authentication-এর flow সবচেয়ে গুরুত্বপূর্ণ অংশ।

### Register flow

1. User `Register.jsx` page-এ form fill করে।
2. Form submit হলে `axios.post('http://localhost:3000/api/auth/register')` call হয়।
3. Backend-এর `/api/auth/register` route hit হয়।
4. `registerUser` controller কাজ করে:
   - email দিয়ে আগে user আছে কিনা দেখে
   - user থাকলে `400 User already exists` দেয়
   - না থাকলে password `bcrypt.hash()` দিয়ে hash করে
   - নতুন user `userModel.create()` দিয়ে database-এ save করে
   - `JWT_SECRET` দিয়ে token বানায়
   - `jwt_token` cookie set করে
   - response-এ `user` এবং `token` পাঠায়
5. Frontend response থেকে token পেলে `localStorage.setItem('token', token)` করে।
6. এরপর user-কে `/login` এ পাঠানো হয়।

### Login flow

1. User `Login.jsx` page-এ email/password দেয়।
2. Form submit হলে `axios.post('http://localhost:3000/api/auth/login')` call হয়।
3. Backend-এর `/api/auth/login` route hit হয়।
4. `loginUser` controller কাজ করে:
   - email দিয়ে user খোঁজা হয়
   - user না পেলে `404 User not Found` দেয়
   - password `bcrypt.compare()` দিয়ে verify করে
   - password mismatch হলে `400 Invalid Credentials` দেয়
   - ঠিক থাকলে আবার JWT token বানায়
   - `jwt_token` cookie set করে
   - response-এ `user` এবং `token` পাঠায়
5. Frontend token পেলে `localStorage`-এ save করে।
6. তারপর user-কে `/home` page-এ navigate করে।

## 6) Protected user info flow

এই প্রজেক্টে `get-me` route দিয়ে authenticated user-এর basic info আনা হয়।

1. Frontend `getMe()` API call করে `/api/auth/get-me` route hit করতে পারে।
2. `identifyUser` middleware আগে চলে।
3. Middleware `req.cookies.jwt_token` থেকে token নেয়।
4. Token না থাকলে `401 Unauthorized` দেয়।
5. Token থাকলে `jwt.verify()` দিয়ে decode করে।
6. সফল হলে `req.user` এবং `req.userId` সেট করে next middleware/controller-এ পাঠায়।
7. `getMeController` database থেকে user info বের করে `username`, `email`, `bio`, `profilePicture` রিটার্ন করে।

## 7) Token handling-এ বর্তমান অবস্থা

এই কোডে token দুই জায়গায় ব্যবহার করা হচ্ছে:

- `cookie`-তে `jwt_token`
- `localStorage`-এ `token`

এর মানে:

- UI redirect logic `localStorage token` দেখে route decide করছে।
- অথচ protected backend route `cookie jwt_token` দেখে user verify করছে।

এটা বর্তমান কোডের আচরণ। ভবিষ্যতে চাইলে token strategy এক জায়গায় consolidate করা যেতে পারে।

## 8) Route workflow

### Frontend routes

- `/` → token থাকলে `/home`, না থাকলে `/login`
- `/login` → Login page
- `/register` → Register page
- `/home` → basic dashboard page

### Backend auth routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/get-me`

### Backend user routes

- `POST /api/users/follow/:username`
- `POST /api/users/unfollow/:username`
- `POST /api/users/follow/accept/:username`
- `POST /api/users/follow/reject/:username`
- `GET /api/users/follow/requests/pending`

### Backend post routes

- `POST /api/posts/create`
- `GET /api/posts/`
- `GET /api/posts/details/:postId`
- `POST /api/posts/like/:postId`

এগুলোর বেশিরভাগ route-ই `identifyUser` middleware দিয়ে protected করা।

## 9) Database workflow

- `Db.js` ফাইল `mongoose.connect(process.env.MONGO_URI)` চালায়।
- Connection সফল হলে console-এ `Connected to Database` দেখায়।
- `user.model.js` এ user schema define করা হয়েছে।
- User schema-তে name, email, password, bio, profilePicture, followers, following আছে।

## 10) Frontend context workflow

`AuthProvider` state manage করে:

- `user`
- `loading`
- `handleLogin()`
- `handleRegister()`

এখনকার code অনুযায়ী এই context API base auth actions handle করার জন্য বানানো, যদিও Login/Register page-এ direct `axios` use করা হচ্ছে।

## 11) Simple end-to-end flow summary

1. User register করে।
2. Backend user save করে, password hash করে, JWT token বানায়, cookie set করে।
3. Frontend token save করে।
4. User login করে।
5. Successful login-এর পরে `/home` page খোলে।
6. Protected page বা `get-me` ব্যবহার করলে backend cookie token verify করে user identify করে।
7. এরপর post/user related protected route ব্যবহার করা যায়।

## 12) ছোট note

এই project-এ current auth flow কাজ করছে, কিন্তু frontend token check আর backend cookie check আলাদা জায়গায় হচ্ছে। এক flow-তে আনলে future maintenance সহজ হবে।
