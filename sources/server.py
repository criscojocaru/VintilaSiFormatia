import os
import sys
from flask import Flask, render_template, request, redirect, url_for
import json

app = Flask(__name__)

uploads_dir = os.path.join(app.instance_path, 'input')
os.makedirs(uploads_dir, exist_ok=True)


@app.route('/upload', methods=['POST'])
def upload():
    profile = request.files['profile']
    profile.save(os.path.join(uploads_dir, "experiment.dataset.csv"))

    bashCommand = "python .\\sources\\main.py evaluate .\\results\\covid_inference_train\\model\\ .\\input\\experiment.dataset.csv .\\output\\preprocessed-exp.dataset.csv .\\sources\\model_definition.yaml > results.json"
    os.system(bashCommand)

    f = open("results.json", "r")
    results = f.read()
    return results


if __name__ == "__main__":
    app.run()
