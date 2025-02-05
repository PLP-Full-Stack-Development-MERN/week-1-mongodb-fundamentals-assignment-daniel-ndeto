// MongoDB Library Database Script

// 1. Connecting to the 'library' database

use library;

// 2. Creating the 'books' collection 

db.createCollection("books")

// 3. Inserting book records
db.books.insertMany([
    {
        title: "A Grain of Wheat",
        author: "Ngũgĩ wa Thiong'o",
        publishedYear: 1967,
        genre: "Historical Fiction",
        ISBN: "978-0435909870"
    },
    {
        title: "Petals of Blood",
        author: "Ngũgĩ wa Thiong'o",
        publishedYear: 1977,
        genre: "Political Fiction",
        ISBN: "978-0141187026"
    },
    {
        title: "The River and the Source",
        author: "Margaret Ogola",
        publishedYear: 1994,
        genre: "Historical Fiction",
        ISBN: "978-9966464948"
    },
    {
        title: "Dust",
        author: "Yvonne Adhiambo Owuor",
        publishedYear: 2013,
        genre: "Literary Fiction",
        ISBN: "978-0345802545"
    },
    {
        title: "Weep Not, Child",
        author: "Ngũgĩ wa Thiong'o",
        publishedYear: 1964,
        genre: "Coming-of-Age, Fiction",
        ISBN: "978-0435908309"
    }
]);


// CRUD Operations

// 4. Retrieving all books

print("All books in the collection:");
db.books.find().pretty();

// 5. Query for books by a specific author ( Ngũgĩ wa Thiong'o)

print("Books by Ngũgĩ wa Thiong'o:");
db.books.find({ author: "Ngũgĩ wa Thiong'o" }).pretty();

// 6. Finding books published after the year 2000

print("Books published after 2000:");
db.books.find({ publishedYear: { $gt: 2000 } }).pretty();

// 7. Updating the publishedYear of "A Grain of Wheat"

db.books.updateOne(
    { title: "A Grain of Wheat" },
    { $set: { publishedYear: 1970 } }  // Updating to a new edition
);

// 8. Adding a new field `rating` to all books with a default value of 4.5
db.books.updateMany({}, { $set: { rating: 4.5 } });

// Deleting Data

// 9. Delete a book by ISBN ("Petals of Blood")

db.books.deleteOne({ ISBN: "978-0141187026" });

// 10. Removing all books of a particular genre of Historical Fiction

db.books.deleteMany({ genre: "Historical Fiction" });


// Aggregation Pipeline

// 11. Counting the total number of books per genre

db.books.aggregate([
    { $group: { _id: "$genre", totalBooks: { $sum: 1 } } }
]).forEach(printjson);

// 12. Calculating the average published year of all books

print("Average published year:");
db.books.aggregate([
    { $group: { _id: null, avgPublishedYear: { $avg: "$publishedYear" } } }
]).forEach(printjson);

// 13. Identifying the top-rated book

print("Top-rated book:");
db.books.find().sort({ rating: -1 }).limit(1).pretty();


// Indexing for Performance

// 14. Create an index on the 'author' field to optimize query performance
db.books.createIndex({ author: 1 });

// 15. benefits of indexing in  mongoDB
/*
1. Indexing improves query performance by reducing search time, making filtering and lookups faster.
For example, searching by 'author' will be much quicker now that it has an index.
*/


