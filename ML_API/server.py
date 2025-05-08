from waitress import serve
# from app import app  # Ensure app.py contains the Flask app object named `app`
from main import app

if __name__ == "__main__":
    serve(app, host='0.0.0.0', port=8000)



