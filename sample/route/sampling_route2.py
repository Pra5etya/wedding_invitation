from flask import Blueprint, render_template, send_from_directory, request, abort, session, make_response, send_file
import os

main_bp = Blueprint('main', __name__)

# 🔧 Ekstensi yang diizinkan
ALLOWED_IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.svg', '.webp', '.gif'}
ALLOWED_AUDIO_EXTENSIONS = {'.mp3', '.wav', '.ogg'}

# Daftar Referer yang dipercaya
TRUSTED_REFERERS = [
    'localhost',
    '127.0.0.1',
    '192.168.',                     # support jaringan lokal (prefix IP)
    'invitation-raka-nurul.com'
]

SECRET_SESSION_KEY = 'user_authenticated'


# 🔒 Fungsi: Validasi Referer
def is_trusted_referer():
    referer = request.headers.get('Referer', '')
    print(f"[Referer] {referer}")
    return any(trusted in referer for trusted in TRUSTED_REFERERS)

# 🔒 Fungsi: Validasi ekstensi
def is_allowed_file(filename, allowed_extensions):
    ext = os.path.splitext(filename)[1].lower()
    return ext in allowed_extensions

# 🔒 Fungsi: Validasi path aman
def is_safe_path(filename):
    return '..' not in filename and not filename.startswith('/')

def is_authenticated():
    return session.get(SECRET_SESSION_KEY, False)


# --- Security Header Injection ---
def secure_headers(response):
    response.headers['Content-Security-Policy'] = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
    response.headers['Cache-Control'] = 'no-store'
    response.headers['Pragma'] = 'no-cache'
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    return response




# ✅ Halaman utama
@main_bp.route('/', methods=['GET'])
def index():
    return render_template('index.html')

# ✅ File robots.txt
@main_bp.route('/robots.txt')
def robots():
    return send_from_directory('static', 'robots.txt')




# ✅ Route untuk audio dari private/audio/
@main_bp.route('/audio/<path:filename>')
def protected_audio(filename):
    print(f"\nFilename requested: {filename}")
    print(f"Trusted referer? {is_trusted_referer()}")
    print(f"Allowed extension? {is_allowed_file(filename, ALLOWED_IMAGE_EXTENSIONS)}")
    print(f"Safe path? {is_safe_path(filename)}")
    
    if not (is_safe_path(filename) and is_allowed_file(filename, ALLOWED_AUDIO_EXTENSIONS)):
        abort(403)
    if not is_trusted_referer():
        abort(403)

    return send_from_directory('private/audio', filename)

# ✅ Route untuk gambar dari private/assets/ (subfolder didukung)
@main_bp.route('/assets/<path:filename>')
def protected_image(filename):
    print(f"\nFilename requested: {filename}")
    print(f"Trusted referer? {is_trusted_referer()}")
    print(f"Allowed extension? {is_allowed_file(filename, ALLOWED_IMAGE_EXTENSIONS)}")
    print(f"Safe path? {is_safe_path(filename)}")
    
    if not (is_safe_path(filename) and is_allowed_file(filename, ALLOWED_IMAGE_EXTENSIONS)):
        abort(403)
    if not is_trusted_referer():
        abort(403)

    return send_from_directory('private/assets', filename)
