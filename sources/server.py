import os
import sys
from flask import Flask, render_template, request, redirect, url_for
import json
import configmodule


app = Flask(__name__)
app.config.from_object('configmodule.DevelopmentConfig')

uploads_dir = os.path.join(app.instance_path, 'uploads')
os.makedirs(uploads_dir, exist_ok=True)


@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        print('no file in request')
        return ""

    file = request.files['file']
    if file.filename == '':
        print('no selected file')
        return""

    if file:
        # file = request.files['file']
        # files = {​​'file': file.read()}
        file.save(os.path.join(uploads_dir, file.filename))

        bashCommand = "python .\\sources\\main.py evaluate .\\results\\covid_inference_train\\model \"" + uploads_dir + "\\" + file.filename + "\" .\\output\\preprocessed-testing.dataset.csv .\\sources\\model_definition.yaml"
        print(bashCommand)
        # os.system(bashCommand)

        f = open("results\\test_statistics.json", "r")
        results = f.read()
        return results


if __name__ == "__main__":
    app.run()
