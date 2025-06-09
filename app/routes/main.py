from flask import Blueprint, render_template, send_from_directory, request, abort

main_bp = Blueprint('main', __name__)

# Konfigurasi daftar file yang boleh diakses
ALLOWED_AUDIO = {'lagu1.mp3', 'lagu2.mp3'}
ALLOWED_IMAGE = {'keluarga.jpg', 'mempelai.jpg'}


# main
@main_bp.route('/', methods = ['GET'])
def index():
    return render_template('index.html')

# indexing in google
@main_bp.route('/robots.txt')
def robots():
    return send_from_directory('static', 'robots.txt')

# Route untuk akses audio 
@main_bp.route('/audio/<filename>')
def protected_audio(filename):
    if filename not in ALLOWED_AUDIO:
        abort(403)  # File tidak diizinkan

    referer = request.headers.get('Referer', '')
    if 'localhost' not in referer and 'namasitus.com' not in referer:
        abort(403)  # Cegah hotlinking

    return send_from_directory('private_assets/audio', filename)

# Route untuk akses gambar
@main_bp.route('/image/<filename>')
def protected_image(filename):
    if filename not in ALLOWED_IMAGE:
        abort(403)

    referer = request.headers.get('Referer', '')
    if 'localhost' not in referer and 'namasitus.com' not in referer:
        abort(403)

    return send_from_directory('private_assets/images', filename)