import sys
import csv
from ludwig.api import LudwigModel


from preprocess import preprocess


if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Incorrect number of arguments. Please use format:\npython main.py <path-to-input-csv-file> <path-to-output-csv-file> <ludwig-model-definition>")

    with open(sys.argv[1]) as f_in:
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

        with open(sys.argv[2], 'w+') as f_out:
            csv_writer = csv.writer(f_out)
            for row in processed_rows:
                csv_writer.writerow(row)

        # config = {
        #     input_features:
        #     [
        #         {name: source_institution, type: category},
        #         {name: gender, type: category},
        #         {name: age, type: numerical},
        #         {name: declared_symptoms, type: category},
        #         {name: reported_symptoms, type: category},
        #         {name: diagnosis, type: category},
        #         {name: travel_history, type: category},
        #         {name: contact_confirmation, type: category},
        #         {name: test_result, type: category},
        #     ],
        #     output_features: [{name: test_result, type: category}],
        # }
        # model = LudwigModel(config)
        # train_stats = model.train(processed_rows)

        ludwig train --dataset sys.argv[2] --config sys.argv[3]
