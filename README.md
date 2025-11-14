# Babel's Library Management System

# Name
KARIMI Riyad
MRABET Mohamed
SABIR Reda
El MOUNTACIR Ilyas
MOUSSA Abderrahmane
CHAFIK Reda

## Description
Babel's Library is a modern, full-stack bookstore management system built using NestJS for the backend and React with TypeScript for the frontend. It allows users to manage books, authors, clients, and sales transactions with a professional, intuitive interface.

This project is divided into two main parts:

- *Backend (nest-api)*: Manages data (books, authors, clients, sales) and handles server-side logic with RESTful APIs.
- *Frontend (react-app)*: A web interface providing a friendly user experience with real-time statistics and responsive design.

## Tech Stack

### Backend
- *NestJS* - Progressive Node.js framework
- *TypeORM* - Object-Relational Mapping for TypeScript
- *SQLite* - Lightweight embedded database
- *Class-validator* - Backend validation

### Frontend
- *React* - JavaScript library for building user interfaces
- *TypeScript* - Type-safe JavaScript superset
- *Ant Design* - Enterprise-class UI design system
- *TanStack Router* - Type-safe routing solution

### Additional Libraries
- *Image Compression* - Browser-based image optimization
- *Lucide React Icons* - Modern icon library

## Installation

### Prerequisites
- Node.js (version 14 or above)
- npm or yarn

### Installation Steps

#### 1. Clone the Repository
bash
git clone https://github.com/yourusername/babels-library.git
cd m1-s1-2025-project-main


#### 2. Backend Setup (NestJS)
bash
cd nest-api
npm install


*Running the Backend Server*
bash
npm run start:dev

The backend server will run by default on http://localhost:3000.

#### 3. Frontend Setup (React + TypeScript)
bash
cd ../react-app
npm install


*Running the Frontend Server*
bash
npm run dev

The frontend server will run by default on http://localhost:5173.

## Features Implemented

### Core Functionality
✅ *Book Management*: Complete CRUD operations with image upload and pagination  
✅ *Author Management*: Profile management with average sales calculation  
✅ *Client Management*: Customer database with email validation (@)  
✅ *Sales Tracking*: Transaction recording with automatic inventory updates  

### User Interface
✅ Professional card-based layouts with 5-column responsive grid  
✅ Real-time statistics dashboard with live data  
✅ Breadcrumb navigation on all pages  
✅ Image compression for uploads  
✅ Modal-based editing interfaces  
✅ Timeline-style sales display  
✅ Empty states and loading indicators  
✅ Hover effects and smooth transitions  

### Data Relationships
✅ Books → Authors (Many-to-One)  
✅ Sales → Books (Many-to-One)  
✅ Sales → Clients (Many-to-One)  
✅ Automatic cascade operations  

## Usage

1. Open the browser and navigate to http://localhost:5173 to access the frontend.
2. Use the dashboard to view real-time statistics for books, authors, clients, and sales.
3. Navigate through different sections:
   - *Books*: Add, edit, delete books with cover images
   - *Authors*: Manage author profiles with automatic sales tracking
   - *Clients*: Maintain customer database with email validation
   - *Sales*: Record transactions with automatic stock updates

## Contributing
Feel free to contribute to the project by creating pull requests or submitting issues on GitHub.
