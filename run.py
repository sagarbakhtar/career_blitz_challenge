from flask import Flask, render_template
from api import api_bp

app = Flask(__name__, static_folder = 'build/static', template_folder = 'build')
app.register_blueprint(api_bp, url_prefix = '/api')

@app.route('/')
def hello_world():
    return render_template('index.html')

app.run(debug=True)