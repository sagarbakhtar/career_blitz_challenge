import requests
from companies import companies, update_jobs

def update_twilio_listings():
    job_listings = []
    data_url = 'https://api.greenhouse.io/v1/boards/twilio/offices'
    r = requests.get(data_url)
    json_response = r.json()
    offices = json_response.get('offices', [])
    for office in offices:
        departments = office.get('departments', [])
        for department in departments:
            jobs = department.get('jobs', [])
            for job in jobs:
                job_lising = {}
                job_lising['position_title'] = job.get('title', '')
                job_location = job.get('location', {})
                job_lising['location'] = job_location.get('name', '')
                job_lising['listing_original_url'] = job.get('absolute_url', '')
                job_listings.append(job_lising)
    update_jobs('twilio', job_listings)

def update_airbnb_listings():
    job_listings = []
    data_url = 'https://careers.airbnb.com/wp-admin/admin-ajax.php?action=fetch_greenhouse_jobs&which-board=airbnb&strip-empty=true'
    r = requests.get(data_url)
    json_response = r.json()
    jobs = json_response.get('jobs', [])
    for job in jobs:
        job_lising = {}
        job_lising['position_title'] = job.get('title', '')
        job_lising['location'] = job.get('location', '')
        job_lising['listing_original_url'] = 'https://careers.airbnb.com/positions/' + str(job.get('id')) + '/'
        job_listings.append(job_lising)
    update_jobs('airbnb', job_listings)

def update_yext_listings():
    job_listings = []
    data_url = 'https://api.greenhouse.io/v1/boards/yext/embed/departments'
    r = requests.get(data_url)
    json_response = r.json()
    departments = json_response.get('departments', [])
    for department in departments:
        jobs = department.get('jobs', [])
        for job in jobs:
            job_lising = {}
            job_lising['position_title'] = job.get('title', '')
            job_location = job.get('location', {})
            job_lising['location'] = job_location.get('name', '')
            job_lising['listing_original_url'] = job.get('absolute_url', '')
            job_listings.append(job_lising)
    update_jobs('yext', job_listings)
        

def update_job_listings():
    print('update')
    switcher = {
        'twilio': update_twilio_listings,
        'airbnb': update_airbnb_listings,
        'yext': update_yext_listings
    }
    
    for company in companies:
        func = switcher.get(company)
        if func:
            func()
