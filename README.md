<img width="1918" height="968" alt="Screenshot 2026-07-10 001327" src="https://github.com/user-attachments/assets/ffac2d1c-1479-4741-aa7b-064e28a4fb69" />
# 🚀 Planivo

**Plan smarter. Collaborate better. Deliver faster.**

Planivo is a full-stack project management application designed to help teams organize projects, manage tasks, collaborate efficiently, and track progress in real time. It provides secure authentication, role-based access control, project collaboration, task tracking, and notes through an intuitive and responsive interface.

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

* Register <img width="1918" height="968" alt="Screenshot 2026-07-10 001327" src="https://github.com/user-attachments/assets/c2159879-67d2-48fa-ab6d-697d7996961d" />

* Dashboard <img width="1893" height="961" alt="Screenshot 2026-07-10 003153" src="https://github.com/user-attachments/assets/a6648177-1784-4f48-9e0a-9a12189e79a7" />

* Projects <img width="1905" height="950" alt="Screenshot 2026-07-10 003201" src="https://github.com/user-attachments/assets/c97f136d-c3bd-4461-8215-b8fbbe6197d7" />

* Project Details <img width="1891" height="963" alt="Screenshot 2026-07-10 003210" src="https://github.com/user-attachments/assets/3d4858c5-66a5-4652-8b02-50811b0753de" />

* Tasks <img width="1918" height="962" alt="Screenshot 2026-07-10 003221" src="https://github.com/user-attachments/assets/b4a70b86-b10b-4e15-a5cb-13e3614d494b" />

* Task Details <img width="1892" height="946" alt="Screenshot 2026-07-10 003231" src="https://github.com/user-attachments/assets/3ce7619c-d0dd-40b2-89a0-1571afce2053" />

* Member Management <img width="1002" height="896" alt="Screenshot 2026-07-10 002106" src="https://github.com/user-attachments/assets/33af93ca-e969-45df-8191-915e9b5d48ad" />

* Role-Based UI (Member) <img width="1911" height="963" alt="Screenshot 2026-07-10 004233" src="https://github.com/user-attachments/assets/8d22e6cb-9744-418c-88d2-745e38ab9899" />

* Profile <img width="1917" height="961" alt="Screenshot 2026-07-10 001906" src="https://github.com/user-attachments/assets/57c9d8e6-33da-4144-bf26-9f5e054e457f" />

* Verification Mail <img width="1831" height="773" alt="Screenshot 2026-07-10 001506" src="https://github.com/user-attachments/assets/460983bc-b7ea-4683-a55d-3a5ada3b18ef" />

* Request Password Change Mail <img width="1917" height="970" alt="Screenshot 2026-07-10 001550" src="https://github.com/user-attachments/assets/058b7f7b-5815-4060-b477-8d593afaea6d" />

* Email Verification Link <img width="1918" height="962" alt="Screenshot 2026-07-10 001521" src="https://github.com/user-attachments/assets/5455b359-e19d-4980-ae28-1e486769dc06" />

* Reset Password Link <img width="1918" height="962" alt="Screenshot 2026-07-10 001633" src="https://github.com/user-attachments/assets/4456f206-31cc-4392-bbc7-e2357b74de60" />



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
