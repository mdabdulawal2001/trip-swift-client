# 🎫 Trip Swift — Online Ticket Booking Platform

<p align="center">
  A modern, full-stack online ticket booking platform built with Next.js, React, Node.js, Express.js, MongoDB, Better Auth, JWT, and Stripe.
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

**Trip Swift** is a modern, full-stack online ticket booking platform designed to connect travelers, vendors, and administrators through a complete ticket management and booking workflow.

Users can discover available travel tickets, search and filter tickets, view detailed journey information, request bookings, make secure payments through Stripe, view transaction history, and download their paid tickets as PDF documents.

Vendors can add and manage travel tickets, monitor verification status, manage booking requests, and track their sales and revenue through a dashboard.

Administrators can manage tickets, manage users and roles, control vendor access, mark fraudulent vendors, and select tickets for homepage advertisement.

The platform supports multiple transportation types such as:

* 🚌 Bus
* 🚆 Train
* 🚢 Launch
* ✈️ Plane
* 🚗 Other supported transport types

Trip Swift was built with a strong focus on:

* 🔐 Authentication & Authorization
* 🛡️ Role-based access control
* 🔒 Protected frontend routes
* 🔑 JWT-protected backend APIs
* 🎫 Complete ticket management
* 📋 Booking management
* 💳 Stripe payment integration
* 📄 PDF transaction history generation and download
* 📊 Revenue analytics
* 🔎 Search, filtering & sorting
* 📄 Pagination
* 🌙 Dark / Light mode
* 📱 Responsive UI
* ✨ Smooth animations
* 🔔 Toast notifications
* ⚠️ Error handling
* 🚀 Production deployment

The project is divided into two independent applications:

* **Frontend:** Next.js App Router application
* **Backend:** Node.js + Express.js REST API connected to MongoDB

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
  <img src="https://img.shields.io/badge/💻%20Frontend-GitHub-black?style=for-the-badge&logo=github" alt="Frontend GitHub Repository" />
</a>

<a href="https://github.com/mdabdulawal2001/trip-swift-server" target="_blank">
  <img src="https://img.shields.io/badge/🛠️%20Backend-GitHub-black?style=for-the-badge&logo=github" alt="Backend GitHub Repository" />
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

Trip Swift provides a complete ticket discovery experience.

Users can:

* 🎫 Browse available tickets
* 🔎 Search by departure location
* 🔎 Search by destination
* 🚌 Filter by transport type
* 💰 Sort by price
* 📅 View departure date and time
* 🎟️ View available ticket quantity
* ✨ View ticket perks
* 📄 Open detailed ticket information
* 📄 Browse tickets using pagination

Only administrator-approved tickets are displayed on the public **All Tickets** page.

---

# 🔎 Search, Filter, Sort & Pagination

The **All Tickets** page includes multiple discovery tools.

### Search

Users can search tickets using:

* From location
* To location

### Filter

Tickets can be filtered by:

* Transport type

### Sort

Tickets can be sorted by:

* 💰 Price — Low to High
* 💰 Price — High to Low

### Pagination

The All Tickets page uses pagination to display tickets in manageable groups rather than loading the entire dataset at once.

```text
User
 ↓
Search / Filter / Sort
 ↓
Frontend Request
 ↓
Express API
 ↓
MongoDB Query
 ↓
Filtered / Sorted Data
 ↓
Pagination
 ↓
Frontend
 ↓
Ticket Cards
```

---

# 🏠 Home Page

The homepage provides the primary entry point for the platform.

### Hero Section

A responsive hero section introduces the platform and guides users toward ticket discovery.

### 🎯 Advertisement Section

Administrators can select up to **6 approved tickets** for homepage advertisement.

Each advertised ticket includes:

* Ticket image
* Ticket title
* Price
* Ticket quantity
* Transport type
* Perks
* See Details button

### 🆕 Latest Tickets

The homepage also displays recently added tickets.

### Additional Sections

The homepage includes additional content sections designed to improve usability and provide a complete travel-booking experience.

### 🖼️ Homepage Slider

Swiper.js is used to provide interactive homepage slider functionality.

---

# 🎫 Ticket Details

The Ticket Details page provides complete information about a selected ticket.

### Information Displayed

* Ticket title
* Ticket image
* From location
* To location
* Transport type
* Price per unit
* Available quantity
* Departure date
* Departure time
* Perks
* Vendor information
* Booking availability
* Countdown timer

### Booking Rules

The booking system follows the required ticket availability rules.

* Booking quantity cannot exceed available ticket quantity.
* Booking is disabled when ticket quantity reaches `0`.
* Booking is disabled after the departure date/time has passed.
* Booking requests initially receive a `pending` status.
* Booking data is stored in MongoDB.
* Successful booking requests appear in the user's booked tickets.

---

# 📋 Booking Management

Trip Swift implements a complete booking workflow.

```text
User
 ↓
Ticket Details
 ↓
Book Now
 ↓
Select Quantity
 ↓
Booking Request
 ↓
MongoDB
 ↓
Pending
 ↓
Vendor Review
 ┌───────────────┐
 ↓               ↓
Accept          Reject
 ↓               ↓
Accepted        Rejected
 ↓
Pay Now
 ↓
Stripe
 ↓
Successful Payment
 ↓
Paid
 ↓
Ticket Quantity Reduced
 ↓
Transaction Recorded
 ↓
PDF Transaction History Available
```

---

# 👤 User Dashboard

The User Dashboard contains the following sections:

1. **User Profile**
2. **My Booked Tickets**
3. **Transaction History**

---

## 👤 User Profile

Users can view their account information.

Displayed information includes:

* Profile image
* Name
* Email
* Role
* Other available profile information

---

# 🎟️ My Booked Tickets

Users can view all tickets they have booked.

Bookings are displayed in a responsive grid layout.

Each booking card can display:

* Ticket title
* Ticket image
* Booking quantity
* Total price
* From → To
* Departure date/time
* Booking status
* Countdown
* Payment action
* Ticket download option when applicable

### Booking Statuses

* 🟡 Pending
* 🟢 Accepted
* 🔴 Rejected
* 💳 Paid

---

## 💳 Payment Flow

When a vendor accepts a booking request:

```text
Booking Status
      ↓
   Accepted
      ↓
   Pay Now
      ↓
Stripe Checkout
      ↓
Payment Successful
      ↓
Booking Status = Paid
      ↓
Ticket Quantity Reduced
      ↓
Transaction Saved
      ↓
PDF Ticket Available
```

The total payment amount is automatically calculated as:

```text
Unit Price × Booking Quantity
```

Users cannot complete payment if the departure date/time has already passed.

---

# 💳 Stripe Payment Integration

Trip Swift uses Stripe for secure online ticket payments.

### Payment Features

* Secure Stripe payment interface
* Automatic total price calculation
* Booking-specific payment session
* Payment success handling
* Payment status update
* Transaction storage
* Ticket quantity reduction after successful payment
* Transaction history
* PDF Transaction history generation

---

# 📄 Transaction History

Users can view their completed Stripe transactions.

The transaction history contains information such as:

* Transaction ID
* Amount
* Ticket title
* Payment date

Transactions are displayed in a structured table format.

---

# 📥 PDF Transaction History Download

One of the additional features implemented in Trip Swift is **PDF Transaction History generation and download after successful payment**.

After completing payment, users can access their ticket and generate/download a PDF document.

The generated ticket can include:

* Ticket title
* Passenger/user information
* From location
* To location
* Transport type
* Departure date/time
* Booking quantity
* Unit price
* Total price
* Payment information
* Transaction ID

### PDF Generation Flow

```text
Successful Stripe Payment
        ↓
Payment Verified
        ↓
Booking Updated
        ↓
Transaction Saved
        ↓
Generate Ticket PDF
        ↓
User Downloads Ticket
```

---

# 🏪 Vendor Dashboard

The Vendor Dashboard contains the following routes:

1. **Vendor Profile**
2. **Add Ticket**
3. **My Added Tickets**
4. **Requested Bookings**
5. **Revenue Overview**

---

# 👤 Vendor Profile

Vendors can view their account information including:

* Profile image
* Name
* Email
* Role
* Other available profile information

---

# ➕ Add Ticket

Vendors can add new travel tickets through a dedicated form.

### Ticket Fields

* Ticket title
* From location
* To location
* Transport type
* Price per unit
* Ticket quantity
* Departure date & time
* Perks
* Ticket image
* Vendor name
* Vendor email

### Ticket Verification

New tickets are initially stored with:

```text
verificationStatus = pending
```

After administrator review:

```text
pending
   ↓
 ┌───────┴───────┐
 ↓               ↓
approved       rejected
```

---

# 🎫 My Added Tickets

Vendors can view all tickets they have added.

Each ticket displays relevant ticket information and its verification status.

### Verification Status

* 🟡 Pending
* 🟢 Approved
* 🔴 Rejected

### Ticket Management

Vendors can:

* ✏️ Update tickets
* 🗑️ Delete tickets

If a ticket has been rejected, the update and delete actions are disabled according to the platform workflow.

---

# 📋 Requested Bookings

Vendors can view booking requests submitted for their tickets.

The booking table includes:

* User name
* User email
* Ticket title
* Booking quantity
* Total price
* Booking actions

### Booking Actions

Vendors can:

* ✅ Accept booking requests
* ❌ Reject booking requests

The booking status is updated accordingly.

---

# 📊 Revenue Overview

The Vendor Dashboard includes a revenue overview section.

Charts provide quick visualization of:

* 🎫 Total tickets added
* 🎟️ Total tickets sold
* 💰 Total revenue

This gives vendors a quick overview of their ticket sales performance.

---

# 🛡️ Admin Dashboard

The Admin Dashboard contains the following routes:

1. **Admin Profile**
2. **Manage Tickets**
3. **Manage Users**
4. **Advertise Tickets**

---

# 👤 Admin Profile

Administrators can view their account information including:

* Profile image
* Name
* Email
* Role
* Other available profile information

---

# 🎫 Manage Tickets

Administrators can review tickets submitted by vendors.

Each ticket can be:

* ✅ Approved
* ❌ Rejected

### Approval Flow

```text
Vendor Adds Ticket
        ↓
Verification = Pending
        ↓
Admin Reviews
   ┌────┴────┐
   ↓         ↓
Approve    Reject
   ↓         ↓
Approved   Rejected
   ↓
Visible in
All Tickets
```

Only approved tickets are displayed publicly in the All Tickets page.

---

# 👥 Manage Users

Administrators can view registered users in a table.

Displayed information includes:

* Name
* Email
* Role

Administrators can manage roles through actions such as:

* Make Admin
* Make Vendor

---

# 🚨 Vendor Fraud Management

Administrators can mark a vendor as fraudulent.

When a vendor is marked as fraud:

* The vendor's tickets are hidden from the platform.
* The vendor loses the ability to add new tickets.
* The vendor's platform access is restricted according to the implemented authorization rules.

This provides an additional administrative control layer for platform safety.

---

# 📢 Advertise Tickets

Administrators can manage homepage advertisements.

Only approved tickets can be advertised.

### Advertisement Rules

* Admin can advertise approved tickets.
* Admin can remove advertisements.
* Maximum **6 tickets** can be advertised simultaneously.
* Advertised tickets appear in the homepage Advertisement section.

```text
Approved Tickets
      ↓
Admin Advertisement Panel
      ↓
Advertise / Unadvertise
      ↓
Maximum 6 Advertised Tickets
      ↓
Homepage Advertisement Section
```

---

# 🔐 Authentication

Trip Swift uses **Better Auth** for authentication.

### Authentication Methods

* 📧 Email / Password
* 🌐 Google Authentication
* 🚪 Logout
* 👤 Session management
* 🔒 Protected routes
* 🛡️ Role-based access

---

# 🔑 JWT API Security

In addition to authentication, the backend APIs are protected using JWT-based authorization.

The frontend sends the authenticated user's JWT token with protected API requests.

```text
Frontend
   ↓
Authenticated Request
   ↓
Authorization Header
   ↓
Bearer JWT Token
   ↓
Express Middleware
   ↓
Token Verification
   ↓
Authorized Request
   ↓
API Controller
```

Sensitive backend operations are not protected by frontend UI restrictions alone.

The backend independently validates authentication and authorization.

---

# 🛡️ Role-Based Authorization

Trip Swift supports three roles:

```text
                    User
                      │
          ┌───────────┼───────────┐
          ↓           ↓           ↓
        User       Vendor       Admin
       Dashboard  Dashboard    Dashboard
```

### User

User-specific operations include:

* View profile
* Browse tickets
* Book tickets
* View booked tickets
* Pay for accepted bookings
* View transaction history
* Download paid ticket PDFs

### Vendor

Vendor-specific operations include:

* View vendor profile
* Add tickets
* Manage own tickets
* View booking requests
* Accept/reject bookings
* View revenue overview

### Admin

Admin-specific operations include:

* View admin profile
* Manage tickets
* Manage users
* Change user roles
* Manage fraudulent vendors
* Manage advertised tickets

---

# 🧭 Protected Route Flow

```text
User Requests Protected Route
        ↓
Authentication Check
        ↓
Authenticated?
   ┌────┴────┐
   ↓         ↓
  No        Yes
   ↓         ↓
Login      Role Check
             ↓
      ┌──────┼──────┐
      ↓      ↓      ↓
     User  Vendor  Admin
      ↓      ↓      ↓
  Allowed  Allowed Allowed
```

Unauthorized users cannot access role-specific dashboard operations.

---

# 🎨 UI / UX

Trip Swift focuses on a clean, modern, responsive interface.

### UI Features

* 📱 Fully responsive design
* 🖥️ Desktop optimization
* 📱 Mobile optimization
* 📟 Tablet optimization
* 🌙 Dark mode
* ☀️ Light mode
* ✨ Smooth animations
* 🎬 Framer Motion animations
* 🔔 Toast notifications
* ⚠️ User-friendly error feedback
* ⏳ Loading states
* 🧭 Responsive navigation
* 🎯 Reusable components
* 🗂️ Dashboard layouts
* 📊 Data visualization
* 🃏 Consistent ticket cards
* 🪟 Modal-based interactions
* 🚫 Invalid route handling
* 📐 Consistent spacing and alignment

---

# 🌙 Dark / Light Mode

Trip Swift supports both:

* ☀️ Light Mode
* 🌙 Dark Mode

Users can switch between themes through the theme toggle.

Theme state is handled using `next-themes`.

---

# 🖼️ Image Upload

Ticket images are uploaded through **ImgBB** according to the project requirements.

The resulting image URL is stored with the ticket data and used throughout the platform.

---

# 🔔 User Feedback

Trip Swift provides visual feedback for important user actions.

Examples include:

* Successful booking
* Successful payment
* Ticket creation
* Ticket update
* Ticket deletion
* Booking acceptance
* Booking rejection
* Authentication errors
* API errors
* Validation errors

Toast notifications and confirmation dialogs are used where appropriate.

---

# ⏳ Loading & Error Handling

The application provides loading feedback while data is being fetched or submitted.

### Loading States

Loading indicators are used for:

* Ticket fetching
* Dashboard data
* Booking operations
* Payment operations
* Authentication
* Ticket creation/update
* User management
* Advertisement management

### Error Handling

The application includes:

* API error handling
* Authentication error handling
* Invalid route handling
* Form validation
* User-friendly error messages
* Production deployment error handling

---

# 🏗️ Project Architecture

Trip Swift is divided into two independent applications.

```text
Trip Swift
│
├── trip-swift-client
│   │
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
│   ├── PDF Ticket Generation
│   ├── Search / Filter / Sort
│   ├── Pagination
│   ├── Dark / Light Mode
│   ├── Responsive UI
│   └── API Integration
│
└── trip-swift-server
    │
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

# 🔄 Complete Application Flow

```text
                         ┌─────────────┐
                         │     User    │
                         └──────┬──────┘
                                │
                                ↓
                       Next.js Frontend
                                │
          ┌─────────────────────┼─────────────────────┐
          ↓                     ↓                     ↓
   Authentication           Tickets               Dashboard
          │                     │                     │
          ↓                     ↓                     ↓
      Better Auth           REST API            Role Based
                                │
              ┌─────────────────┼─────────────────┐
              ↓                 ↓                 ↓
           MongoDB           Stripe          User Actions
              │                 │                 │
              └─────────────────┼─────────────────┘
                                ↓
                          Updated UI
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
Booking Status = Paid
 ↓
Ticket Quantity Reduced
 ↓
Transaction Saved
 ↓
PDF Ticket Generated
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
  ↓
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
↓
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

# 🧠 Booking Quantity Validation

The platform validates ticket availability during booking.

```text
Requested Quantity
        ↓
Compare With
Available Quantity
        ↓
Requested ≤ Available?
    ┌────┴────┐
    ↓         ↓
   Yes        No
    ↓         ↓
Allow       Reject
Booking     Request
```

This prevents users from requesting more tickets than are currently available.

---

# 📊 Revenue Flow

Vendor revenue is calculated from successful ticket sales.

```text
Paid Booking
     ↓
Booking Quantity
     ×
Unit Price
     ↓
Total Sale
     ↓
Revenue Calculation
     ↓
Vendor Dashboard
     ↓
Charts & Statistics
```

---

# 🛡️ Backend Security

The backend independently validates protected operations.

Security checks include:

1. Authentication
2. JWT validation
3. User identity
4. Role validation
5. Resource ownership
6. Request validation
7. Ticket availability validation

This prevents users from relying solely on frontend restrictions.

For example, hiding or disabling a button on the frontend is not considered sufficient protection for sensitive backend operations.

---

# 🧩 Frontend Features

## 🔐 Authentication

* Email/password registration
* Email/password login
* Google authentication
* Logout
* Session handling
* Protected routes
* Role-based dashboard access
* Loading states
* Authentication feedback

---

## 🎫 Ticket Features

* Ticket listing
* Ticket details
* Ticket search
* Transport filter
* Price sorting
* Pagination
* Ticket countdown
* Ticket quantity validation
* Vendor ticket creation
* Vendor ticket update
* Vendor ticket deletion
* Admin ticket approval
* Admin ticket rejection
* Homepage advertisement

---

## 📋 Booking Features

* Book tickets
* Select booking quantity
* Pending booking status
* Vendor accept/reject
* Accepted booking payment
* Rejected booking handling
* Departure-time validation
* Available quantity validation
* Paid booking status

---

## 💳 Payment Features

* Stripe integration
* Secure payment session
* Automatic total amount calculation
* Payment success handling
* Transaction storage
* Transaction history
* Ticket quantity reduction
* PDF ticket download

---

## 👤 User Features

* User profile
* My Booked Tickets
* Transaction History
* Payment
* PDF ticket download

---

## 🏪 Vendor Features

* Vendor profile
* Add ticket
* My Added Tickets
* Update ticket
* Delete ticket
* Verification status
* Requested Bookings
* Accept booking
* Reject booking
* Revenue Overview

---

## 🛡️ Admin Features

* Admin profile
* Manage tickets
* Approve tickets
* Reject tickets
* Manage users
* Make Admin
* Make Vendor
* Mark Vendor as Fraud
* Advertise tickets
* Unadvertise tickets
* Maximum 6 advertised tickets

---

# 🛠️ Technologies Used

## 🎨 Frontend

<p align="center">
  <img src="https://skillicons.dev/icons?i=nextjs,react,tailwindcss,javascript" alt="Frontend Technologies" />
</p>

| Technology          | Purpose                               |
| ------------------- | ------------------------------------- |
| **Next.js 16**      | React framework using the App Router  |
| **React 19**        | Component-based UI development        |
| **Tailwind CSS 4**  | Utility-first responsive styling      |
| **HeroUI**          | Modern reusable UI components         |
| **Framer Motion**   | Smooth UI animations                  |
| **Better Auth**     | Authentication and session management |
| **Next Themes**     | Dark / Light theme management         |
| **Lucide React**    | Modern icon system                    |
| **React Icons**     | Additional icon library               |
| **React Hot Toast** | Toast notifications                   |
| **Swiper**          | Homepage slider / carousel            |
| **Stripe.js**       | Stripe frontend integration           |
| **SweetAlert2**     | Confirmation and alert dialogs        |
| **jsPDF**           | PDF ticket generation                 |
| **jsPDF AutoTable** | Structured PDF table generation       |

---

## ⚙️ Backend

The backend uses a separate Node.js and Express.js REST API with MongoDB.

Core backend technologies include:

* Node.js
* Express.js
* MongoDB
* Better Auth
* JWT authentication / authorization
* Stripe
* CORS
* dotenv

> The exact backend dependency versions may vary. Please check the backend repository's `package.json` for the complete and current dependency list.

---

# 📦 Frontend Dependencies Used

Based on the project's current `package.json`:

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

---

# 📦 Development Dependencies

```text
@tailwindcss/postcss
eslint
eslint-config-next
tailwindcss
```

---

# 🧩 Important Packages & Their Uses

| Package                      | Usage                           |
| ---------------------------- | ------------------------------- |
| `next`                       | Application framework           |
| `react`                      | UI development                  |
| `@heroui/react`              | UI components                   |
| `better-auth`                | Authentication                  |
| `@better-auth/mongo-adapter` | MongoDB adapter for Better Auth |
| `framer-motion`              | Animations                      |
| `next-themes`                | Dark / Light mode               |
| `lucide-react`               | Icons                           |
| `react-icons`                | Additional icons                |
| `react-hot-toast`            | Toast notifications             |
| `swiper`                     | Homepage slider                 |
| `@stripe/stripe-js`          | Stripe client integration       |
| `stripe`                     | Stripe payment integration      |
| `jspdf`                      | PDF ticket generation           |
| `jspdf-autotable`            | PDF table formatting            |
| `sweetalert2`                | Confirmation dialogs and alerts |
| `mongodb`                    | MongoDB database interaction    |
| `@gravity-ui/icons`          | Additional icon support         |
| `tailwindcss`                | Styling                         |
| `eslint`                     | Code quality and linting        |

---

# 🏗️ Data Flow

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
Pending Ticket
 ↓
Admin Review
 ↓
Approved / Rejected
```

---

## Booking Flow

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

---

## Payment Flow

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

> The exact folder structure may evolve as the project is improved.

---

# 🚀 Deployment

Trip Swift is deployed as two separate Vercel applications.

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

Separating the frontend and backend keeps application responsibilities independent and allows the REST API to be consumed by the Next.js frontend.

---

# 📦 How to Run Locally

## 1️⃣ Clone the Frontend

```bash
git clone https://github.com/mdabdulawal2001/trip-swift-client.git
cd trip-swift-client
npm install
```

## 2️⃣ Clone the Backend

Open another terminal:

```bash
git clone https://github.com/mdabdulawal2001/trip-swift-server.git
cd trip-swift-server
npm install
```

---

# 🔐 Environment Variables

Create the required environment files according to your local configuration.

## Frontend

Create a `.env.local` file:

```env
NEXT_PUBLIC_SERVER_API_URL=your_backend_api_url

BETTER_AUTH_SECRET=your_secret_key

NEXT_PUBLIC_BETTER_AUTH_URL=your_better_auth_url

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret
```

> Use the exact environment variable names from your current project configuration if they differ from the example above.

---

## Backend

Create a `.env` file according to the backend configuration:

```env
PORT=your_backend_port

MONGODB_URI=your_mongodb_connection_string

BETTER_AUTH_SECRET=your_secret_key

NEXT_PUBLIC_BETTER_AUTH_URL=your_better_auth_url

STRIPE_SECRET_KEY=your_stripe_secret_key

STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

JWT_SECRET=your_jwt_secret
```

> ⚠️ **Security Notice:** Never commit real secrets, database credentials, OAuth credentials, Stripe secret keys, JWT secrets, API keys, or production environment variables to GitHub.

---

# ▶️ Run Development Servers

## Frontend

```bash
npm run dev
```

## Backend

```bash
npm run dev
```

Then open the frontend in your browser.

---

# ✨ Additional Features Beyond the Core Requirements

Several features were implemented beyond the mandatory project requirements to provide a more complete booking experience.

### 💳 Stripe Payment

Secure online payment flow was implemented using Stripe.

### 📄 PDF Ticket Download

Users can generate and download their paid ticket as a PDF.

### 🧾 Transaction Records

Successful payments are stored and displayed through the User Dashboard.

### 🖼️ Image Upload

Ticket images are handled through ImgBB.

### 🖼️ Homepage Slider

Swiper.js is used to provide an interactive homepage slider.

### 🌙 Theme Switching

Users can switch between Dark and Light themes.

### 🔐 Backend Authorization

Protected API operations are independently validated on the server using authentication, JWT, and role-based authorization.

---

# 🧠 What I Learned

Building Trip Swift helped strengthen my understanding of modern full-stack web development.

### Authentication & Authorization

* Implementing Better Auth
* Email/password authentication
* Google authentication
* Session management
* Protected routes
* Role-based authorization
* JWT-protected APIs
* Backend authorization
* User identity validation

### Backend Development

* Building REST APIs with Express.js
* Connecting Express.js with MongoDB
* Creating protected endpoints
* Authentication middleware
* Authorization middleware
* Ticket CRUD
* Booking APIs
* Payment APIs
* User management APIs
* Admin APIs
* Vendor APIs

### Database

* Working with MongoDB
* Managing users
* Managing tickets
* Managing bookings
* Managing transactions
* Connecting resources with authenticated users
* Handling ticket quantity
* Managing ticket verification status
* Managing booking status

### Booking System

* Ticket availability validation
* Booking quantity validation
* Vendor booking approval
* Vendor booking rejection
* Booking status management
* Departure-time validation
* Payment eligibility validation

### Payment Integration

* Stripe payment integration
* Payment session creation
* Payment verification
* Transaction storage
* Updating booking status after payment
* Updating ticket quantity
* Generating paid ticket documents

### PDF Generation

* Generating PDF documents using jsPDF
* Creating structured tables with jsPDF AutoTable
* Generating downloadable ticket documents
* Including transaction and booking information

### Search & Filtering

* Location-based search
* Transport type filtering
* Price sorting
* Pagination
* Server-side query handling

### Dashboard Development

* User dashboard
* Vendor dashboard
* Admin dashboard
* Role-based navigation
* Booking management
* Revenue overview
* Data visualization

### Frontend Development

* Next.js App Router
* React component architecture
* Reusable components
* HeroUI
* Tailwind CSS
* Responsive design
* Dark / Light mode
* Framer Motion
* Swiper.js
* Toast notifications
* SweetAlert2
* Loading states
* Error handling

### Deployment

* Deploying frontend and backend separately
* Vercel deployment
* Environment variable management
* Production API communication
* MongoDB production connection
* CORS configuration
* Authentication configuration
* Stripe production integration

---

# 🔮 Future Improvements

Possible future improvements include:

* 💺 Interactive seat selection / seat map
* ❌ Booking cancellation before vendor acceptance
* 🔔 Real-time booking notifications
* 📧 Email booking confirmation
* 📧 Payment receipt emails
* 🔐 Password reset / forgot password
* 📊 More advanced analytics
* 📈 Detailed vendor revenue reports
* 🧾 Improved PDF ticket templates
* 🔎 Advanced ticket search
* 📱 Progressive Web App support
* 🧪 Automated testing
* ♿ Improved accessibility
* 🚀 Performance optimization
* 🔔 Notification center
* 🗺️ Route/map integration
* 🎫 QR code on generated tickets

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
