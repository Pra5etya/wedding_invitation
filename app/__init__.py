from flask import Flask

from app.routes import register_routes  # Akses dari __init__ routes

def create_app():
    app = Flask(__name__)
    
    # bluepirnt
    register_routes(app)
    
    return app
