from app import app, db

# Create tables within app context
with app.app_context():
    db.create_all()
    print("Database initialized successfully!")
