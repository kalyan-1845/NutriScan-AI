# NutriScan-AI: Indian Food Recognition REST API
# Unified entry point for model inference

import argparse
import io
import os
import sys
import torch
from pathlib import Path
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image

# Ensure Hub directory is trusted and in path
hub_dir = torch.hub.get_dir()
# We don't need to manually add to path if we use trust_repo=True correctly, 
# but we will force it to be safe for Python 3.12
os.environ['TORCH_HUB_TRUST_REPOS'] = '1'

app = Flask(__name__)
CORS(app) 
models = {}

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "service": "NutriScan-AI"}), 200

@app.route('/v1/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
    
    model_name = request.form.get('model', 'yolov5s')
    
    try:
        im_file = request.files['image']
        im_bytes = im_file.read()
        im = Image.open(io.BytesIO(im_bytes)).convert('RGB')
        
        if model_name not in models:
            models[model_name] = torch.hub.load('ultralytics/yolov5', model_name, pretrained=True, trust_repo=True)
            
        results = models[model_name](im, size=640)
        json_results = results.pandas().xyxy[0].to_json(orient='records')
        
        return json_results, 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='NutriScan-AI API')
    parser.add_argument('--port', default=int(os.environ.get('PORT', 8080)), type=int, help='port number')
    parser.add_argument('--models', nargs='+', default=['yolov5s'], help='models to preload')
    args = parser.parse_args()

    # Preload models
    for m in args.models:
        print(f"Loading model: {m}...")
        try:
            # Re-verify ultralytics is installed in the current venv
            models[m] = torch.hub.load('ultralytics/yolov5', m, pretrained=True, trust_repo=True)
        except Exception as e:
            print(f"Failed to load {m}: {e}")

    app.run(host='0.0.0.0', port=args.port)
