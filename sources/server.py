import os
import sys
from flask import Flask, render_template, request, redirect, url_for
import json
import csv
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
        file.save(os.path.join(uploads_dir, file.filename))

        bashCommand = "python .\\sources\\main.py evaluate .\\results\\covid_inference_train\\model \"" + uploads_dir + \
            "\\" + file.filename + \
            "\" .\\output\\preprocessed-testing.dataset.csv .\\sources\\model_definition_evaluate.yaml"
        print(bashCommand)
        os.system(bashCommand)

        f = open("results\\test_statistics.json", "r")
        results = f.read()
        f.close()

        results_json = json.loads(results)

        predictions = []
        with open(uploads_dir + "\\" + file.filename) as f_in:
            c = csv.reader(f_in, delimiter=",")
            i = 0
            for row in c:
                if i != 0:
                    x = {'gender': row[1], 'age': row[2]}
                    predictions.append(x)
                i += 1

        with open("results\\test_result_predictions.csv") as f_in:
            lin = [line.split() for line in f_in]
            nr = 0
            for i in lin:
                if i:
                    predictions[nr]['prediction'] = i[0]
                    nr += 1

        with open("results\\test_result_probability.csv") as f_in:
            lin = [line.split() for line in f_in]
            nr = 0
            for i in lin:
                if i:
                    predictions[nr]['probability'] = i[0]
                    nr += 1

        results_json['predictions'] = predictions
        return json.dumps(results_json)


if __name__ == "__main__":
    app.run()
