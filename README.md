# 🎫 Trip Swift — Online Ticket Booking Platform

<p align="center">

  A modern full-stack online ticket booking platform built with Next.js, React, Node.js, Express.js, MongoDB, Better Auth, JWT, and Stripe.

</p>

<p align="center">

  <a href="https://trip-swift-client.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🚀%20Live%20Demo-Visit%20Website-brightgreen?style=for-the-badge&logo=vercel" alt="Live Demo" />
  </a>

  <a href="https://github.com/mdabdulawal2001/trip-swift-client" target="_blank">
    <img src="https://img.shields.io/badge/Frontend-GitHub-blue?style=for-the-badge&logo=github" alt="Frontend GitHub" />
  </a>

  <a href="https://github.com/mdabdulawal2001/trip-swift-server" target="_blank">
    <img src="https://img.shields.io/badge/Backend-GitHub-blue?style=for-the-badge&logo=github" alt="Backend GitHub" />
  </a>

  <a href="https://trip-swift-server.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/API-Live-success?style=for-the-badge&logo=vercel" alt="Backend API" />
  </a>

</p>

---

# 📝 Project Overview

**Trip Swift** is a full-stack online ticket booking platform connecting users, vendors, and administrators through a complete ticket management, booking, payment, and transaction workflow.

Users can discover tickets, search and filter routes, request bookings, pay securely through Stripe, manage booked tickets, view transactions, and generate downloadable PDF tickets.

Vendors can create and manage tickets, handle booking requests, and monitor sales and revenue.

Administrators can manage tickets and users, control vendor access, manage fraudulent vendors, and advertise approved tickets on the homepage.

### Core Features

- 🎫 Ticket discovery, search, filtering, sorting & pagination
- 🚌 Bus, 🚆 Train, 🚢 Launch, ✈️ Plane and other transport types
- 👤 User, Vendor & Admin role-based dashboards
- 🔐 Better Auth authentication with Google login
- 🛡️ JWT-protected backend APIs
- 📋 Complete booking workflow
- 💳 Stripe payment integration
- 📊 Vendor revenue analytics
- 📄 PDF ticket generation & download
- 🧾 Transaction history
- 🖼️ ImgBB image upload
- 🌙 Dark / Light mode
- 📱 Fully responsive UI
- ✨ Framer Motion animations
- 🔔 Toast notifications & confirmation dialogs
- 🚀 Production deployment

---

# 🔗 Project Links

<p align="center">

<a href="https://trip-swift-client.vercel.app/" target="_blank">
  <img src="https://img.shields.io/badge/🚀%20Live%20Frontend-Visit%20Website-brightgreen?style=for-the-badge&logo=vercel" alt="Live Frontend" />
</a>

<a href="https://trip-swift-server.vercel.app/" target="_blank">
  <img src="https://img.shields.io/badge/⚙️%20Live%20Backend-API-success?style=for-the-badge&logo=vercel" alt="Live Backend API" />
</a>

<a href="https://github.com/mdabdulawal2001/trip-swift-client" target="_blank">
  <img src="https://img.shields.io/badge/💻%20Frontend-GitHub-black?style=for-the-badge&logo=github" alt="Frontend GitHub" />
</a>

<a href="https://github.com/mdabdulawal2001/trip-swift-server" target="_blank">
  <img src="https://img.shields.io/badge/🛠️%20Backend-GitHub-black?style=for-the-badge&logo=github" alt="Backend GitHub" />
</a>

</p>

---

# 📸 Screenshots

### 🏠 Home Page

<!-- Drag & drop Home Page screenshot here -->

<p align="center">
  <img src="PASTE_HOME_SCREENSHOT_URL_HERE" alt="Trip Swift Home Page" />
</p>

---

### 🎫 All Tickets

<!-- Drag & drop All Tickets screenshot here -->

<p align="center">
  <img src="PASTE_ALL_TICKETS_SCREENSHOT_URL_HERE" alt="Trip Swift All Tickets Page" />
</p>

---

### 🎟️ Ticket Details

<!-- Drag & drop Ticket Details screenshot here -->

<p align="center">
  <img src="PASTE_TICKET_DETAILS_SCREENSHOT_URL_HERE" alt="Trip Swift Ticket Details Page" />
</p>

---

### 👤 User Dashboard

<!-- Drag & drop User Dashboard screenshot here -->

<p align="center">
  <img src="PASTE_USER_DASHBOARD_SCREENSHOT_URL_HERE" alt="Trip Swift User Dashboard" />
</p>

---

### 🏪 Vendor Dashboard

<!-- Drag & drop Vendor Dashboard screenshot here -->

<p align="center">
  <img src="PASTE_VENDOR_DASHBOARD_SCREENSHOT_URL_HERE" alt="Trip Swift Vendor Dashboard" />
</p>

---

### 🛡️ Admin Dashboard

<!-- Drag & drop Admin Dashboard screenshot here -->

<p align="center">
  <img src="PASTE_ADMIN_DASHBOARD_SCREENSHOT_URL_HERE" alt="Trip Swift Admin Dashboard" />
</p>

---

### 💳 Stripe Payment

<!-- Drag & drop Stripe Payment screenshot here -->

<p align="center">
  <img src="PASTE_PAYMENT_SCREENSHOT_URL_HERE" alt="Trip Swift Stripe Payment" />
</p>

---

### 📄 PDF Ticket

<!-- Drag & drop PDF Ticket screenshot here -->

<p align="center">
  <img src="PASTE_PDF_TICKET_SCREENSHOT_URL_HERE" alt="Trip Swift PDF Ticket" />
</p>

---

# 🚀 Key Features

## 🎫 Ticket Discovery

Users can:

- Browse approved tickets
- Search by departure and destination
- Filter by transport type
- Sort by price
- View departure date and time
- View available quantity and perks
- Open detailed ticket information
- Navigate through paginated results

Only administrator-approved tickets are displayed publicly.

---

## 🔎 Search, Filter, Sort & Pagination

The **All Tickets** page supports:

| Feature | Options |
| --- | --- |
| Search | From / To location |
| Filter | Transport type |
| Sort | Price: Low → High / High → Low |
| Pagination | Server-side paginated results |

```text
User
 ↓
Search / Filter / Sort
 ↓
Express API
 ↓
MongoDB Query
 ↓
Paginated Results
 ↓
Frontend
```

---

# 🏠 Home Page

The homepage includes:

- Responsive hero section
- Advertised ticket section
- Latest tickets
- Interactive Swiper slider
- Additional travel-focused sections

### 📢 Advertisement

Administrators can advertise up to **6 approved tickets**.

Advertised tickets display:

- Ticket image
- Title
- Price
- Quantity
- Transport type
- Perks
- Details action

---

# 🎫 Ticket Details

Ticket details include:

- Title & image
- From / To location
- Transport type
- Price per unit
- Available quantity
- Departure date & time
- Perks
- Vendor information
- Booking availability
- Countdown timer

### Booking Validation

- Requested quantity cannot exceed available quantity.
- Booking is disabled when quantity reaches `0`.
- Booking is disabled after departure time.
- New booking requests start with `pending` status.
- Booking data is stored in MongoDB.

---

# 📋 Booking Management

```text
User
 ↓
Ticket Details
 ↓
Book Now
 ↓
Quantity Validation
 ↓
Booking Request
 ↓
Pending
 ↓
Vendor Review
 ┌───────────────┐
 ↓               ↓
Accept          Reject
 ↓
Accepted
 ↓
Stripe Payment
 ↓
Paid
 ↓
Ticket Quantity Reduced
 ↓
Transaction Saved
 ↓
PDF Ticket
```

### Booking Statuses

- 🟡 Pending
- 🟢 Accepted
- 🔴 Rejected
- 💳 Paid

---

# 👤 User Dashboard

### Dashboard Pages

- 👤 Dashboard
- 🎟️ My Booked Tickets
- 🎫 Current Ticket
- 🧾 Transaction History

### User Features

- View profile information
- View booked tickets
- View current ticket information
- Monitor booking status
- Pay for accepted bookings
- View transaction history
- Download generated PDF tickets

### 📄 PDF Support

PDF functionality is available across the relevant User Dashboard pages:

- **User Dashboard**
- **My Booked Tickets**
- **Current Ticket**

Paid ticket information can be generated as a downloadable PDF.

---

# 💳 Stripe Payment

Trip Swift uses Stripe for secure online payments.

### Payment Flow

```text
Accepted Booking
 ↓
Pay Now
 ↓
Stripe Checkout
 ↓
Payment Successful
 ↓
Payment Verification
 ↓
Booking = Paid
 ↓
Ticket Quantity Reduced
 ↓
Transaction Saved
 ↓
PDF Ticket Available
```

### Payment Features

- Secure Stripe checkout
- Booking-specific payment session
- Automatic total calculation
- Payment verification
- Transaction storage
- Ticket quantity update
- Paid ticket PDF generation

```text
Unit Price × Booking Quantity = Total Amount
```

Users cannot complete payment after the departure date/time.

---

# 🧾 Transaction History

Completed payments are stored as transaction records.

Transaction information may include:

- Transaction ID
- Ticket title
- Amount
- Payment date
- Booking information

---

# 📄 PDF Ticket Generation

Trip Swift supports downloadable PDF ticket documents.

Generated PDFs can contain:

- Ticket title
- Passenger information
- From / To location
- Transport type
- Departure date & time
- Booking quantity
- Unit price
- Total price
- Payment information
- Transaction ID

### PDF Flow

```text
Successful Payment
 ↓
Payment Verification
 ↓
Booking Updated
 ↓
Transaction Saved
 ↓
Generate PDF
 ↓
Download Ticket
```

---

# 🏪 Vendor Dashboard

### Dashboard Pages

- 👤 Dashboard
- 📊 Revenue Overview
- 🎫 My Added Tickets
- 📋 Requested Bookings

### Vendor Features

- Add travel tickets
- Manage own tickets
- Update tickets
- Delete tickets
- View verification status
- Accept / reject booking requests
- View sales statistics
- Monitor revenue

### 📄 PDF Support

PDF functionality is available on:

- **Vendor Dashboard**
- **Revenue Overview**
- **My Added Tickets**
- **Requested Bookings**

Relevant ticket, booking, revenue, and transaction information can be generated/downloaded as PDF documents.

---

# ➕ Add Ticket

Vendors can create tickets with:

- Ticket title
- From / To location
- Transport type
- Price
- Quantity
- Departure date & time
- Perks
- Ticket image
- Vendor information

### Verification Flow

```text
Vendor Adds Ticket
 ↓
Pending
 ↓
Admin Review
 ┌───────────────┐
 ↓               ↓
Approved       Rejected
```

---

# 🎫 My Added Tickets

Vendors can view and manage their own tickets.

### Statuses

- 🟡 Pending
- 🟢 Approved
- 🔴 Rejected

Vendors can update or delete tickets according to the ticket status and implemented authorization rules.

### 📄 PDF

The **My Added Tickets** page supports PDF generation/download for relevant ticket information.

---

# 📋 Requested Bookings

Vendors can manage booking requests for their tickets.

Information includes:

- User name
- User email
- Ticket title
- Booking quantity
- Total price
- Booking status

Actions:

- ✅ Accept
- ❌ Reject

### 📄 PDF

The **Requested Bookings** page supports PDF generation/download for relevant booking information.

---

# 📊 Revenue Overview

The Vendor Dashboard provides revenue statistics and visual analytics.

Key metrics include:

- 🎫 Total tickets added
- 🎟️ Total tickets sold
- 💰 Total revenue

### 📄 PDF

The **Revenue Overview** page supports PDF generation/download for relevant revenue and sales information.

---

# 🛡️ Admin Dashboard

### Dashboard Pages

- 👤 Dashboard
- 🎫 Manage Tickets
- 👥 Manage Users
- 📢 Advertise Tickets

### Admin Features

- Review vendor tickets
- Approve / reject tickets
- Manage users and roles
- Mark vendors as fraudulent
- Block / Unblock Users
- Manage homepage advertisements

### 📄 PDF Support

PDF functionality is available on:

- **Admin Dashboard**
- **Manage Tickets**
- **Manage Users**
- **Advertise Tickets**

Relevant dashboard, ticket, user, and advertisement information can be generated/downloaded as PDF documents.

---

# 🎫 Manage Tickets

Administrators can review vendor-submitted tickets.

```text
Vendor
 ↓
Pending Ticket
 ↓
Admin Review
 ┌───────────────┐
 ↓               ↓
Approve         Reject
 ↓
Approved
 ↓
Public All Tickets
```

Only approved tickets are publicly available.

---

# 👥 Manage Users

Administrators can view registered users with information such as:

- Name
- Email
- Role

Available role management includes:

- Make Admin
- Make Vendor

---

# 🚨 Vendor Fraud Management

Administrators can mark vendors as fraudulent.

Depending on authorization rules, fraudulent vendors may:

- Have their tickets hidden
- Lose ticket creation privileges
- Have restricted platform access

---

# 📢 Advertise Tickets

Administrators can manage homepage advertisements.

Rules:

- Only approved tickets can be advertised.
- Advertisements can be removed.
- Maximum **6 tickets** can be advertised simultaneously.
- Advertised tickets appear on the homepage.

```text
Approved Tickets
 ↓
Admin Advertisement Panel
 ↓
Advertise / Unadvertise
 ↓
Maximum 6 Tickets
 ↓
Homepage
```

---

# 🔐 Authentication & Authorization

Trip Swift uses **Better Auth** for authentication.

### Authentication

- Email / Password
- Google Authentication
- Logout
- Session management
- Protected routes
- Role-based dashboard access

### JWT API Security

Protected API requests use JWT authorization.

```text
Frontend
 ↓
Authenticated Request
 ↓
Bearer JWT
 ↓
Express Middleware
 ↓
Token Verification
 ↓
Authorization
 ↓
Controller
```

Backend operations independently validate authentication and authorization.

---

# 🛡️ Role-Based Access

Trip Swift supports three roles:

```text
                    User
                      │
          ┌───────────┼───────────┐
          ↓           ↓           ↓
        User        Vendor       Admin
      Dashboard    Dashboard    Dashboard
```

### User

- Browse tickets
- Book tickets
- View booked/current tickets
- Make payments
- View transactions
- Download PDFs

### Vendor

- Add tickets
- Manage own tickets
- Handle booking requests
- Accept / reject bookings
- View revenue
- Generate relevant PDFs

### Admin

- Manage tickets
- Manage users
- Change roles
- Manage fraudulent vendors
- Manage advertisements
- Generate relevant PDFs

---

# 🧭 Protected Route Flow

```text
User Requests Protected Route
 ↓
Authentication Check
 ↓
Authenticated?
 ┌───────────────┐
 ↓               ↓
 No              Yes
 ↓               ↓
Login          Role Check
                 ↓
        ┌────────┼────────┐
        ↓        ↓        ↓
       User    Vendor    Admin
        ↓        ↓        ↓
      Allow    Allow    Allow
```

---

# 🎨 UI / UX

Trip Swift provides a responsive and modern interface with:

- 📱 Mobile, tablet & desktop layouts
- 🌙 Dark / Light mode
- ✨ Framer Motion animations
- 🔔 Toast notifications
- ⚠️ Error feedback
- ⏳ Loading states
- 🧭 Responsive navigation
- 🎯 Reusable components
- 📊 Data visualization
- 🃏 Consistent ticket cards
- 🪟 Modal interactions
- 🚫 Invalid route handling
- 📐 Consistent spacing and layout

---

# 🌙 Theme Support

The application supports:

- ☀️ Light Mode
- 🌙 Dark Mode

Theme management is handled using `next-themes`.

---

# 🖼️ Image Upload

Ticket images are uploaded through **ImgBB**.

The resulting image URL is stored with the ticket data and used throughout the application.

---

# 🔔 Feedback & Error Handling

The application provides feedback for:

- Booking operations
- Payments
- Ticket creation/update/deletion
- Booking acceptance/rejection
- Authentication
- API requests
- Form validation
- User management
- Advertisement management

Loading states are provided for data fetching and important asynchronous operations.

---

# 🏗️ Project Architecture

Trip Swift consists of two independent applications:

```text
Trip Swift
│
├── trip-swift-client
│   ├── Next.js App Router
│   ├── Authentication
│   ├── Protected Routes
│   ├── User Dashboard
│   ├── Vendor Dashboard
│   ├── Admin Dashboard
│   ├── Ticket Management
│   ├── Booking Management
│   ├── Stripe Payment
│   ├── Transaction History
│   ├── PDF Generation
│   ├── Search / Filter / Sort
│   ├── Pagination
│   ├── Theme Management
│   └── API Integration
│
└── trip-swift-server
    ├── Express.js
    ├── MongoDB
    ├── Better Auth
    ├── JWT Middleware
    ├── Role Authorization
    ├── Ticket API
    ├── Booking API
    ├── Payment API
    ├── User API
    ├── Admin API
    ├── Vendor API
    └── Revenue API
```

---

# 🔄 Client ↔ Server Communication

```text
Next.js Client
 ↓
HTTP Request
 ↓
Express.js API
 ↓
JWT Authentication
 ↓
Role / Authorization Check
 ↓
Controller Logic
 ↓
MongoDB
 ↓
API Response
 ↓
Next.js Client
 ↓
UI Update
```

---

# 💳 Payment Architecture

```text
User
 ↓
Accepted Booking
 ↓
Pay Now
 ↓
Frontend
 ↓
Backend Payment API
 ↓
Stripe
 ↓
Payment Completed
 ↓
Payment Verification
 ↓
Booking = Paid
 ↓
Quantity Reduced
 ↓
Transaction Saved
 ↓
PDF Ticket
```

---

# 🎫 Ticket Lifecycle

```text
Vendor
 ↓
Add Ticket
 ↓
Pending
 ↓
Admin Review
 ┌───────────────┐
 ↓               ↓
Approved       Rejected
 ↓
All Tickets
 ↓
User Booking
 ↓
Pending
 ↓
Vendor Review
 ┌───────────────┐
 ↓               ↓
Accepted       Rejected
 ↓
Stripe Payment
 ↓
Paid
 ↓
Ticket Quantity Reduced
 ↓
Transaction History
 ↓
PDF Ticket
```

---

# 📊 Revenue Flow

```text
Paid Booking
 ↓
Booking Quantity
 ×
Unit Price
 ↓
Total Sale
 ↓
Revenue
 ↓
Vendor Dashboard
 ↓
Charts & Statistics
```

---

# 🛡️ Backend Security

Protected backend operations validate:

1. Authentication
2. JWT token
3. User identity
4. Role authorization
5. Resource ownership
6. Request validation
7. Ticket availability

Frontend restrictions alone are not treated as sufficient protection for sensitive operations.

---

# 🧩 Frontend Features

| Category | Features |
| --- | --- |
| Authentication | Email/password, Google login, logout, sessions |
| Tickets | Listing, details, search, filter, sorting, pagination |
| Booking | Quantity validation, pending, accept/reject, payment |
| Payment | Stripe, verification, transactions, PDF |
| User | Dashboard, booked tickets, current ticket, transactions |
| Vendor | Add/manage tickets, bookings, revenue |
| Admin | Tickets, users, roles, fraud management, advertisements |
| UI | Responsive design, dark mode, animation, toast, loading states |

---

# 🛠️ Technologies Used

## 🎨 Frontend

<p align="center">

  <img src="https://skillicons.dev/icons?i=nextjs,react,tailwindcss,javascript" alt="Frontend Technologies" />

</p>

| Technology | Purpose |
| --- | --- |
| **Next.js 16** | React framework with App Router |
| **React 19** | Component-based UI |
| **Tailwind CSS 4** | Responsive styling |
| **HeroUI** | UI components |
| **Framer Motion** | Animations |
| **Better Auth** | Authentication & sessions |
| **Next Themes** | Dark / Light mode |
| **Lucide React** | Icons |
| **React Icons** | Additional icons |
| **React Hot Toast** | Notifications |
| **Swiper** | Homepage slider |
| **Stripe.js** | Stripe frontend integration |
| **SweetAlert2** | Alerts & confirmations |
| **jsPDF** | PDF generation |
| **jsPDF AutoTable** | PDF table formatting |

---

## ⚙️ Backend

<p align="center">
  <img src="https://skillicons.dev/icons?i=nodejs,express,mongodb,javascript" alt="Backend Technologies" />
</p>

| Technology      | Purpose                               |
| --------------- | ------------------------------------- |
| **Node.js**     | JavaScript runtime                    |
| **Express.js**  | REST API framework                    |
| **MongoDB**     | NoSQL database                        |
| **Better Auth** | Authentication and session management |
| **CORS**        | Cross-origin request handling         |
| **dotenv**      | Environment variable management       |
| **JWT**         | authorization handling                |
| **Stripe**      | payment management handling           |



The exact dependency versions are available in the backend repository's `package.json`.

---

# 📦 Frontend Dependencies

```text
@better-auth/mongo-adapter
@gravity-ui/icons
@heroui/react
@heroui/styles
@stripe/stripe-js
better-auth
framer-motion
jspdf
jspdf-autotable
lucide-react
mongodb
next
next-themes
react
react-dom
react-hot-toast
react-icons
stripe
sweetalert2
swiper
```

### Development Dependencies

```text
@tailwindcss/postcss
eslint
eslint-config-next
tailwindcss
```

---

# 🧩 Important Packages

| Package | Usage |
| --- | --- |
| `next` | Application framework |
| `react` | UI development |
| `@heroui/react` | UI components |
| `better-auth` | Authentication |
| `@better-auth/mongo-adapter` | MongoDB adapter |
| `framer-motion` | Animations |
| `next-themes` | Theme management |
| `lucide-react` | Icons |
| `react-icons` | Additional icons |
| `react-hot-toast` | Toast notifications |
| `swiper` | Homepage slider |
| `@stripe/stripe-js` | Stripe client |
| `stripe` | Stripe backend integration |
| `jspdf` | PDF generation |
| `jspdf-autotable` | PDF tables |
| `sweetalert2` | Confirmation dialogs |
| `mongodb` | Database interaction |
| `@gravity-ui/icons` | Additional icons |
| `tailwindcss` | Styling |
| `eslint` | Code quality |

---

# 📂 Repository Structure

## Frontend Repository

<p align="center">

<a href="https://github.com/mdabdulawal2001/trip-swift-client">
  <img src="https://img.shields.io/badge/Frontend-GitHub-black?style=for-the-badge&logo=github" alt="Frontend Repository" />
</a>

</p>

```text
trip-swift-client
│
├── app/
├── components/
├── lib/
├── public/
├── ...
├── package.json
└── README.md
```

## Backend Repository

<p align="center">

<a href="https://github.com/mdabdulawal2001/trip-swift-server">
  <img src="https://img.shields.io/badge/Backend-GitHub-black?style=for-the-badge&logo=github" alt="Backend Repository" />
</a>

</p>

```text
trip-swift-server
│
├── routes/
├── middleware/
├── controllers/
├── lib/
├── ...
├── package.json
└── README.md
```

---

# 🚀 Deployment

Trip Swift is deployed as separate Vercel applications.

### Frontend

<p align="center">

<a href="https://trip-swift-client.vercel.app/" target="_blank">
  <img src="https://img.shields.io/badge/Frontend-Live-brightgreen?style=for-the-badge&logo=vercel" alt="Frontend Live" />
</a>

</p>

### Backend API

<p align="center">

<a href="https://trip-swift-server.vercel.app/" target="_blank">
  <img src="https://img.shields.io/badge/Backend%20API-Live-success?style=for-the-badge&logo=vercel" alt="Backend API Live" />
</a>

</p>

---

# 📦 How to Run Locally

## 1️⃣ Frontend

```bash
git clone https://github.com/mdabdulawal2001/trip-swift-client.git

cd trip-swift-client

npm install

npm run dev
```

## 2️⃣ Backend

Open another terminal:

```bash
git clone https://github.com/mdabdulawal2001/trip-swift-server.git

cd trip-swift-server

npm install

npm run dev
```

---

# 🔐 Environment Variables

## Frontend

Create `.env.local`:

```env
NEXT_PUBLIC_SERVER_API_URL=your_backend_api_url

BETTER_AUTH_SECRET=your_secret_key

NEXT_PUBLIC_BETTER_AUTH_URL=your_better_auth_url

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

STRIPE_SECRET_KEY=your_stripe_secret_key

NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Backend

Create `.env`:

```env
PORT=your_backend_port

MONGODB_URI=your_mongodb_connection_string

BETTER_AUTH_SECRET=your_secret_key

NEXT_PUBLIC_BETTER_AUTH_URL=your_better_auth_url

STRIPE_SECRET_KEY=your_stripe_secret_key

PAYMENT_CONFIRM_SECRET=your_payment_confirm_secret

NEXT_PUBLIC_IMGBB_API_KEY=your_imagebb_api_key
```

> ⚠️ Never commit real secrets, database credentials, OAuth credentials, Stripe keys, JWT secrets, or API keys to GitHub.

---

# 🔄 Core Data Flows

## Ticket CRUD

```text
Vendor
 ↓
Add Ticket
 ↓
Frontend
 ↓
Express API
 ↓
JWT Verification
 ↓
Role Validation
 ↓
MongoDB
 ↓
Pending
 ↓
Admin Review
 ↓
Approved / Rejected
```

## Booking

```text
User
 ↓
Select Ticket
 ↓
Book Now
 ↓
Quantity Validation
 ↓
Create Booking
 ↓
Pending
 ↓
Vendor Review
 ↓
Accepted / Rejected
```

## Payment

```text
Accepted Booking
 ↓
Pay Now
 ↓
Stripe
 ↓
Payment Success
 ↓
Booking = Paid
 ↓
Quantity Reduced
 ↓
Transaction Created
 ↓
PDF Ticket
```

---

# ✨ Additional Features

- 💳 Stripe payment integration
- 📄 PDF ticket generation and download
- 🧾 Transaction records
- 🖼️ ImgBB image upload
- 🖼️ Swiper homepage slider
- 🌙 Dark / Light theme
- 🔐 JWT backend authorization
- 🛡️ Role-based access control
- 📊 Revenue analytics
- 🔎 Search, filter, sort & pagination
- 📱 Responsive UI

---

# 🧠 What I Learned

Building Trip Swift strengthened practical experience in:

- Next.js App Router & React architecture
- Better Auth & Google authentication
- JWT authentication and authorization
- Express.js REST API development
- MongoDB data management
- Role-based access control
- Ticket CRUD operations
- Booking workflows
- Stripe payment integration
- Transaction management
- PDF generation with jsPDF
- Search, filtering, sorting & pagination
- Dashboard development
- Revenue analytics
- Responsive UI development
- Tailwind CSS & HeroUI
- Framer Motion & Swiper
- Error handling and loading states
- Vercel deployment
- Environment variable management
- Production API communication

---

# 🔮 Future Improvements

- 💺 Interactive seat selection
- ❌ Booking cancellation
- 🔔 Real-time notifications
- 📧 Email booking confirmation
- 📧 Payment receipt emails
- 🔐 Password reset
- 📊 Advanced analytics
- 📈 Detailed revenue reports
- 🧾 Enhanced PDF ticket templates
- 🔎 Advanced search
- 📱 Progressive Web App support
- 🧪 Automated testing
- ♿ Improved accessibility
- 🚀 Performance optimization
- 🗺️ Route / map integration
- 🎫 QR code on generated tickets

---

# 👨‍💻 Developer

<p align="center">

  Developed with ❤️ by

</p>

<h2 align="center">

  MD. ABDUL AWAL TOHA

</h2>

<p align="center">

<a href="https://github.com/mdabdulawal2001" target="_blank">
  <img src="https://img.shields.io/badge/GitHub-MD._ABDUL_AWAL_TOHA-blue?style=for-the-badge&logo=github" alt="GitHub Profile" />
</a>

</p>

---

# ⭐ Support

<p align="center">

If you like this project, consider giving the repositories a ⭐ <b>Star</b> on GitHub.

</p>

<p align="center">

  <b>Thanks for visiting Trip Swift! 🚀</b>

</p>