from flask import Flask
from flask_cors import CORS
import os

def create_app():
    app = Flask(__name__)
    CORS(app)

    @app.route('/health')
    def health_check():
        return {'status': 'healthy'}, 200

    return app
app = create_app()

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))  # Railway sets this automatically
    print(f"Starting Flask app on port {port}")
    app.run(host='0.0.0.0', port=port, debug=False)