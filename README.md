# 🚀 Planivo

**Plan smarter. Collaborate better. Deliver faster.**

Planivo is a full-stack project management application designed to help teams organize projects, manage tasks, collaborate efficiently, and track progress in real time. It provides secure authentication, role-based access control, project collaboration, task tracking, notes, and calendar integration through an intuitive and responsive interface.

---

## ✨ Features

### 🔐 Authentication & Security

* Secure JWT Authentication (Access Token + Refresh Token)
* Email Verification
* Forgot Password & Password Reset via Email
* Protected Routes
* Password Hashing using bcrypt
* Secure Cookie-based Authentication

---

### 👥 Project Management

* Create, update and delete projects
* View all projects you are a member of
* Project dashboard with detailed overview
* Project member management
* Role-based project permissions

---

### 👨‍👩‍👧‍👦 Role-Based Access Control (RBAC)

Each project has independent member roles.

#### Admin

* Manage project details
* Delete project
* Add and remove members
* Create, update and delete tasks
* Create, update and delete notes
* Manage subtasks

#### Project Admin

* Create, update and delete tasks
* Create, update and delete notes
* Manage subtasks

#### Member

* View tasks
* Update subtask status
* View notes

Both backend authorization and frontend permission-aware rendering are implemented to ensure secure and intuitive collaboration.

---

### ✅ Task Management

* Create tasks
* Edit tasks
* Delete tasks
* Assign tasks
* Set priorities
* Set due dates
* Track task status
* Task details page

---

### 📋 Subtasks

* Create subtasks
* Delete subtasks
* Mark subtasks as completed
* Track overall task progress

---

### 📝 Notes

* Create project notes
* Edit notes
* Delete notes
* View notes within projects

---

### 👥 Member Management

* Invite project members
* Remove members
* Change member roles
* Prevent unauthorized role modifications

---

### 📅 Calendar

* Calendar view
* Track upcoming deadlines
* Organize work visually

---

### 👤 User Profile

* View profile
* Update profile information
* Change avatar
* View personal project information

---

### 🎨 User Interface

* Responsive design
* Modern dashboard
* Clean project layout
* Permission-aware interface
* Interactive modals
* Reusable UI components

---

## 🛠 Tech Stack

### Frontend

* React
* React Router
* Redux Toolkit
* Axios
* React Hook Form
* Tailwind CSS
* Lucide React

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Multer
* Cloudinary
* Nodemailer

---

## 📂 Project Structure

```
Planivo
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── layouts
│   │   ├── redux
│   │   ├── services
│   │   ├── utils
│   │   └── hooks
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middlewares
│   ├── utils
│   ├── config
│   └── services
```

---

## 🔑 Role-Based Permission Matrix

| Feature                    | Admin | Project Admin | Member |
| -------------------------- | :---: | :-----------: | :----: |
| Update/Delete Project      |   ✅   |       ❌       |    ❌   |
| Manage Project Members     |   ✅   |       ❌       |    ❌   |
| Create Tasks               |   ✅   |       ✅       |    ❌   |
| Update Tasks               |   ✅   |       ✅       |    ❌   |
| Delete Tasks               |   ✅   |       ✅       |    ❌   |
| View Tasks                 |   ✅   |       ✅       |    ✅   |
| Update Subtask Status      |   ✅   |       ✅       |    ✅   |
| Create/Delete Subtasks     |   ✅   |       ✅       |    ✅   |
| Create/Update/Delete Notes |   ✅   |       ✅       |    ❌   |
| View Notes                 |   ✅   |       ✅       |    ✅   |

---

## 🔒 Security Features

* JWT Authentication
* Refresh Token Rotation
* Password Hashing
* Email Verification
* Reset Password Tokens
* Protected Backend APIs
* Project Membership Validation
* Role-Based Authorization Middleware
* Frontend Permission-Based Rendering

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone <repository-url>
cd Planivo
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## ⚙️ Environment Variables

### Backend

```
PORT=

MONGODB_URI=

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=

REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=

CORS_ORIGIN=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASS=

CLIENT_URL=
```

### Frontend

```
VITE_API_BASE_URL=
```

---

## 📸 Screenshots

Add screenshots for:

* Login <img width="1918" height="971" alt="Screenshot 2026-07-10 001310" src="https://github.com/user-attachments/assets/42a91dfe-06fe-466f-b82a-1f326c4373b8" />

* Register
* Dashboard
* Projects
* Project Details
* Task Details
* Calendar
* Notes
* Member Management
* Role-Based UI (Admin vs Member)
* Profile

---

## 🌟 Highlights

* Full-stack MERN architecture
* Secure JWT authentication
* Project-scoped Role-Based Access Control (RBAC)
* RESTful API design
* Modular backend architecture
* Responsive UI
* Reusable React components
* Centralized permission management
* Modern dashboard experience

---

## 📈 Future Improvements

* Real-time collaboration using Socket.IO
* Activity logs
* File attachments
* Comments on tasks
* Notifications
* Drag-and-drop Kanban board
* Search & filtering
* Team workspaces
* Dark mode
* Analytics dashboard

---

## 👨‍💻 Author

**Vaibhav Bansal**

Mechanical Engineering (IDD)
IIT (BHU) Varanasi

If you found this project helpful, consider giving it a ⭐ on GitHub.
