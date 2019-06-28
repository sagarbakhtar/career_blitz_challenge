from flask import jsonify, Blueprint
from companies import companies, job_listings
api_bp = Blueprint('api', __name__)

@api_bp.route('/companies/', methods=['GET'])
def get_companies():
    return jsonify(companies), 200

@api_bp.route('/job_listing/<company_slug>', methods=['GET'])
def get_job_listing(company_slug):
    company_details = companies.get(company_slug, {})
    listings = job_listings.get(company_slug, [])
    response = {'company_details': company_details, 'job_listings': listings}
    return jsonify(response), 200