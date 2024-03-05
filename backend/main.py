from flask import request, jsonify
from config import app, allowed_file
from werkzeug.utils import secure_filename
import os

#File Upload
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'status': 'ERROR: No selected file', 'color': 'red'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'status': 'ERROR: Invalid file name'})

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return jsonify({'status': 'File uploaded successfully'})

    return jsonify({'status': 'ERROR: Invalid file format'})

if __name__ == '__main__':
    app.run()