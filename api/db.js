import mysql from "mysql";

// Create a reusable function to establish a MySQL connection
function createDBConnection() {
  const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });
  
  
  // Handle MySQL connection errors
  db.on("error", (err) => {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("MySQL connection lost. Reconnecting...");
      createDBConnection(); // Reconnect when the connection is lost
    } else {
      console.error("MySQL error:", err);
    }
  });

  return db;
}

// Use the function to create a connection
const db = createDBConnection();

// Ensure the connection is established before using it
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

export { db };
