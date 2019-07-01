from flask import Flask, render_template
from flask_cors import CORS
from apscheduler.schedulers.background import BackgroundScheduler
from .update_job_listings import update_job_listings
from .api import api_bp

#Load job listings data and then keep updating every hour
update_job_listings()
if __name__ == '__main__':
    scheduler = BackgroundScheduler()
    scheduler.add_job(update_job_listings, 'interval', hours = 1)
    scheduler.start()

app = Flask(__name__, static_folder = '../build/static', template_folder = '../build')
CORS(app)
app.register_blueprint(api_bp, url_prefix = '/api')

@app.route('/')
def index():
    return render_template('index.html')