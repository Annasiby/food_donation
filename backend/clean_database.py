# import sqlite3
# from datetime import datetime

# def clean_donations():
#     try:
#         # Connect directly to the SQLite database
#         conn = sqlite3.connect('instance/food_donation.db')
#         cursor = conn.cursor()

#         # Fetch all donations
#         cursor.execute("SELECT id, expiry_date FROM Donation")
#         donations = cursor.fetchall()

#         for donation_id, expiry_date in donations:
#             if expiry_date:
#                 try:
#                     # Try parsing the date
#                     if isinstance(expiry_date, str):
#                         # Handle 'YYYY-MM-DD HH:mm:SS.ssssss' format
#                         try:
#                             parsed_date = datetime.strptime(expiry_date, '%Y-%m-%d %H:%M:%S.%f')
#                             new_date = parsed_date.strftime('%Y-%m-%d')
#                         except ValueError:
#                             # Handle 'YYYY-MM-DD' format or set to NULL if invalid
#                             try:
#                                 parsed_date = datetime.strptime(expiry_date, '%Y-%m-%d')
#                                 new_date = expiry_date  # Already correct
#                             except ValueError:
#                                 print(f"Invalid expiry_date for donation {donation_id}: {expiry_date}, setting to NULL")
#                                 new_date = None
#                     else:
#                         # If not a string, assume it's a valid date or set to NULL
#                         new_date = None

#                     # Update the database
#                     cursor.execute(
#                         "UPDATE Donation SET expiry_date = ? WHERE id = ?",
#                         (new_date, donation_id)
#                     )
#                 except Exception as e:
#                     print(f"Error processing donation {donation_id}: {expiry_date}, setting to NULL. Error: {str(e)}")
#                     cursor.execute(
#                         "UPDATE Donation SET expiry_date = ? WHERE id = ?",
#                         (None, donation_id)
#                     )

#         # Commit changes and close connection
#         conn.commit()
#         print("Database cleaned successfully.")
#     except Exception as e:
#         print(f"Failed to clean database: {str(e)}")
#     finally:
#         conn.close()

# if __name__ == "__main__":
#     clean_donations()
# import sqlite3

# def reset_database():
#     db_path = '../instance/food_donation.db'
#     try:
#         conn = sqlite3.connect(db_path)
#         cursor = conn.cursor()
#         cursor.executescript("""
#             DROP TABLE IF EXISTS Donation;
#             DROP TABLE IF EXISTS User;
#             DROP TABLE IF EXISTS Request;
#             CREATE TABLE User (
#                 id INTEGER PRIMARY KEY,
#                 name TEXT NOT NULL,
#                 email TEXT NOT NULL UNIQUE,
#                 password TEXT NOT NULL,
#                 phone TEXT
#             );
#             CREATE TABLE Donation (
#                 id INTEGER PRIMARY KEY,
#                 user_id INTEGER NOT NULL,
#                 food_item TEXT NOT NULL,
#                 quantity INTEGER NOT NULL,
#                 location TEXT NOT NULL,
#                 phone TEXT NOT NULL,
#                 expiry_date DATE,
#                 description TEXT,
#                 status TEXT DEFAULT 'available'
#             );
#             CREATE TABLE Request (
#                 id INTEGER PRIMARY KEY,
#                 user_id INTEGER NOT NULL,
#                 donation_id INTEGER NOT NULL,
#                 requester_name TEXT NOT NULL,
#                 requester_phone TEXT NOT NULL,
#                 created_at DATETIME DEFAULT CURRENT_TIMESTAMP
#             );
#         """)
#         conn.commit()
#         print("Database reset successfully.")
#     except Exception as e:
#         print(f"Error resetting database: {str(e)}")
#     finally:
#         conn.close()

# if __name__ == "__main__":
#     reset_database()
import sqlite3
conn = sqlite3.connect('../instance/food_donation.db')
cursor = conn.cursor()
cursor.execute("SELECT * FROM Request")
print(cursor.fetchall())
conn.close()