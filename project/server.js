console.log("MY SERVER FILE IS LOADED");

const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());


// Home Route
app.get("/", (req, res) => {
    res.send("PRATHISH HOTEL PROJECT 2026");
});


// Test Route
app.get("/test", (req, res) => {
    res.send("TEST WORKING");
});


// Register Route
app.post("/register", (req, res) => {

    const { name, email, phone, password } = req.body;

    const sql =
    "INSERT INTO users(name,email,phone,password) VALUES (?,?,?,?)";

    db.query(sql, [name, email, phone, password], (err, result) => {

        if (err) {
            console.log(err);
            res.send("Registration Failed");
        } else {
            res.send("Registration Successful");
        }

    });

});


// Login Route
app.post("/login", (req, res) => {

    const { email, password } = req.body;

    const sql =
    "SELECT * FROM users WHERE email=? AND password=?";

    db.query(sql, [email, password], (err, result) => {

        if (err) {
            console.log(err);
            res.send("Login Failed");
        }
        else if (result.length > 0) {
            res.send("Login Successful");
        }
        else {
            res.send("Invalid Email or Password");
        }

    });

});


// Get All Hotels

app.get("/hotels", (req, res) => {


const sql = "SELECT * FROM hotels";

db.query(sql, (err, result) => {

    if (err) {
        console.log("HOTELS ERROR:");
        console.log(err);
        return res.send(err.message);
    }

    res.json(result);

});


});


// Book Hotel
app.post("/book", (req, res) => {

    const { hotel_id, hotel_name, customer_name } = req.body;

    const sql =
    "INSERT INTO bookings(hotel_id, hotel_name, customer_name) VALUES (?,?,?)";

    db.query(sql, [hotel_id, hotel_name, customer_name], (err, result) => {

        if (err) {
            console.log(err);
            res.send("Booking Failed");
        } else {
            res.send("Booking Successful");
        }

    });

});


// Get All Bookings
app.get("/bookings", (req, res) => {

    const sql = "SELECT * FROM bookings ORDER BY id DESC";

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            res.send("Error Fetching Bookings");
        } else {
            res.json(result);
        }

    });

});

// Cancel Booking
app.delete("/cancel-booking/:id", (req, res) => {

    const bookingId = req.params.id;

    const sql = "DELETE FROM bookings WHERE id=?";

    db.query(sql, [bookingId], (err, result) => {

        if (err) {
            console.log(err);
            res.send("Cancellation Failed");
        } else {
            res.send("Booking Cancelled Successfully");
        }

    });

});
// Get All Users
app.get("/users", (req, res) => {

    const sql = "SELECT * FROM users";

    db.query(sql, (err, result) => {

        if(err){
            console.log("USERS ERROR:");
            console.log(err);
            return res.send(err.message);
        }

        res.json(result);

    });

});

// Get All Bookings For Admin
app.get("/admin-bookings", (req, res) => {

    const sql = "SELECT * FROM bookings";

    db.query(sql, (err, result) => {

        if(err){
            console.log(err);
            res.send("Error Fetching Bookings");
        }
        else{
            res.json(result);
        }

    });

});
// Get All Users
app.get("/users", (req, res) => {

    const sql = "SELECT * FROM users";

    db.query(sql, (err, result) => {

        if(err){
            console.log("USERS ERROR:");
            console.log(err);
            return res.send(err.message);
        }

        res.json(result);

    });

});

// Get All Bookings For Admin
app.get("/admin-bookings", (req, res) => {

    const sql = "SELECT * FROM bookings";

    db.query(sql, (err, result) => {

        if(err){
            console.log(err);
            res.send("Error Fetching Bookings");
        }
        else{
            res.json(result);
        }

    });
});
    // ADD HOTEL
app.post("/add-hotel", (req, res) => {

    const {
        hotel_name,
        location,
        price,
        image_url
    } = req.body;

    const sql =
    "INSERT INTO hotels(hotel_name,location,price,image_url) VALUES (?,?,?,?)";

    db.query(
        sql,
        [hotel_name, location, price, image_url],
        (err, result) => {

            if(err){
                console.log(err);
                res.send("Hotel Add Failed");
            }
            else{
                res.send("Hotel Added Successfully");
            }

        }
    );

});


// DELETE HOTEL
app.delete("/delete-hotel/:id", (req, res) => {

    const id = req.params.id;

    const sql =
    "DELETE FROM hotels WHERE id=?";

    db.query(sql,[id],(err,result)=>{

        if(err){
            console.log(err);
            res.send("Delete Failed");
        }
        else{
            res.send("Hotel Deleted Successfully");
        }

    });

});
// Delete Booking
app.delete("/delete-booking/:id", (req, res) => {

    const id = req.params.id;

    const sql = "DELETE FROM bookings WHERE id=?";

    db.query(sql, [id], (err, result) => {

        if(err){
            console.log(err);
            res.send("Delete Failed");
        }
        else{
            res.send("Booking Deleted Successfully");
        }

    });

});


// Approve Booking
app.put("/approve-booking/:id", (req, res) => {

    const id = req.params.id;

    const sql =
    "UPDATE bookings SET status='Approved' WHERE id=?";

    db.query(sql, [id], (err, result) => {

        if(err){
            console.log(err);
            res.send("Approval Failed");
        }
        else{
            res.send("Booking Approved");
        }

    });

});


// Reject Booking
app.put("/reject-booking/:id", (req, res) => {

    const id = req.params.id;

    const sql =
    "UPDATE bookings SET status='Rejected' WHERE id=?";

    db.query(sql, [id], (err, result) => {

        if(err){
            console.log(err);
            res.send("Reject Failed");
        }
        else{
            res.send("Booking Rejected");
        }

    });

});


// Start Server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});