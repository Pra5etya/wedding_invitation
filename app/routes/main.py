from flask import Blueprint, render_template

main_bp = Blueprint('main', __name__)

@main_bp.route('/', methods = ['GET'])
def index():
    return render_template('index.html')

@main_bp.route('/sample', methods = ['GET'])
def sample(): 
    return render_template('sample.html')