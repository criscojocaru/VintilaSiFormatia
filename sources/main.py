import sys
import csv
from ludwig.api import LudwigModel
# import ludwig


from preprocess import preprocess


def preprocess_dataset(input_file, output_file):
    with open(input_file) as f_in:
        c = csv.reader(f_in, delimiter=",")

        processed_rows = [['source_institution', 'gender', 'age', 'declared_symptoms',
                           'reported_symptoms', 'diagnosis', 'travel_history', 'contact_confirmation', 'test_result']]
        map_of_institution_codes = {}
        map_of_gender_codes = {}

        i = 0
        for row in c:
            if i == 7000:
                break
            elif i != 0:
                # print(row)
                processed_row = preprocess(
                    row, map_of_institution_codes, map_of_gender_codes)
                processed_rows.append(processed_row)
                i += 1
            elif i == 0:
                i += 1

        with open(output_file, 'w+') as f_out:
            csv_writer = csv.writer(f_out)
            for row in processed_rows:
                csv_writer.writerow(row)


if __name__ == "__main__":
    if sys.argv[1] == "train":
        if len(sys.argv) != 5:
            print("Incorrect number of arguments. Please use format:\npython main.py train <path-to-input-csv-file> <path-to-output-csv-file> <ludwig-model-definition>")

        preprocess_dataset(sys.argv[2], sys.argv[3])

        config = sys.argv[4]
        model = LudwigModel(config)
        train_stats = model.train(dataset=sys.argv[3], experiment_name='covid_experiment')

        print(train_stats)
    elif sys.argv[1] == "experiment":
        if len(sys.argv) != 6:
            print("Incorrect number of arguments. Please use format:\npython main.py experiment <path-to-trained-model> <path-to-input-csv-file> <path-to-output-csv-file> <ludwig-model-definition>")

        preprocess_dataset(sys.argv[3], sys.argv[4])

        config = sys.argv[5]
        model = LudwigModel.load(sys.argv[2])
        train_stats = model.experiment(sys.argv[4], experiment_name='covid_experiment')
        print(train_stats)
    else:
        print(
            "Incorrect arguments. Please use format:\n python main.py [train/experiment]")
        # ludwig train --dataset sys.argv[2] --config sys.argv[3]
