```markdown
# MongoDB Library Database Project

## Introduction
This project demonstrates the use of MongoDB for managing a book collection. It covers database setup, CRUD operations, indexing, and aggregation queries.

## Prerequisites
Ensure you have the following installed:
- [MongoDB](https://www.mongodb.com/try/download/community)
- MongoDB Shell (`mongosh`)
- MongoDB Compass (Optional, for GUI-based management)

## Setting Up MongoDB
### **1. Install MongoDB**
Follow the official installation guide for your operating system:
- Windows: [MongoDB Installation Guide](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
- macOS: Install via Homebrew:
  ```sh
  brew tap mongodb/brew
  brew install mongodb-community@6.0
  ```
- Linux: [MongoDB Installation Guide](https://docs.mongodb.com/manual/administration/install-on-linux/)

### **2. Start MongoDB Server**
Run the following command to start MongoDB:
```sh
mongod --dbpath /data/db
```
Alternatively, if using MongoDB Atlas (cloud database), create a free cluster and get the connection string from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### **3. Connect to MongoDB**
Use the MongoDB shell:
```sh
mongosh
```
If using MongoDB Atlas, connect with:
```sh
mongosh "your_connection_string"
```

## Running the `library_database.js` Script
### **1. Load the Script**
To execute all database operations, run the following command inside the MongoDB shell:
```sh
load("library_database.js")
```
This will:
- Create the `library` database
- Insert book records
- Perform CRUD operations
- Create an index for optimized searching
- Execute aggregation queries

## MongoDB Operations in the Script
### **1. Insert Book Records**
Five books are added with fields:
- `title`
- `author`
- `publishedYear`
- `genre`
- `ISBN`

### **2. CRUD Operations**
- **Retrieve all books:** `db.books.find().pretty()`
- **Find books by author:** `db.books.find({ author: "Ngũgĩ wa Thiong'o" }).pretty()`
- **Find books published after 2000:** `db.books.find({ publishedYear: { $gt: 2000 } }).pretty()`
- **Update a book:** `db.books.updateOne({ title: "A Grain of Wheat" }, { $set: { publishedYear: 1970 } })`
- **Delete a book by ISBN:** `db.books.deleteOne({ ISBN: "978-0141187026" })`
- **Remove books of a genre:** `db.books.deleteMany({ genre: "Historical Fiction" })`

### **3. Aggregation Queries**
- **Total books per genre:**
  ```sh
  db.books.aggregate([
      { $group: { _id: "$genre", totalBooks: { $sum: 1 } } }
  ]).forEach(printjson)
  ```
- **Average published year:**
  ```sh
  db.books.aggregate([
      { $group: { _id: null, avgPublishedYear: { $avg: "$publishedYear" } } }
  ]).forEach(printjson)
  ```
- **Top-rated book:** `db.books.find().sort({ rating: -1 }).limit(1).pretty()`

### **4. Indexing**
- Create an index on `author` for faster queries:
  ```sh
  db.books.createIndex({ author: 1 })
  ```

## Verification and Testing
### **1. Check Inserted Data**
```sh
db.books.find().pretty()
```
### **2. Confirm Indexing**
```sh
db.books.getIndexes()
```
### **3. Run Aggregation Queries**
```sh
// Find total books per genre
db.books.aggregate([{ $group: { _id: "$genre", totalBooks: { $sum: 1 } } }]).forEach(printjson)
```

## Submission Instructions
1. Push your code to GitHub:
   ```sh
   git init
   git add .
   git commit -m "MongoDB Library Database Project"
   git branch -M main
   git remote add origin https://github.com/yourusername/mongodb-library.git
   git push -u origin main
   ```
2. Share the GitHub repository link.

## Conclusion
This project covers fundamental MongoDB operations with a book collection. It demonstrates CRUD operations, aggregation, and indexing to optimize queries.

