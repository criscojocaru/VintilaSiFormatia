import sys
import csv
from ludwig.api import LudwigModel
# import ludwig


from preprocess import preprocess


def get_processed_rows(process_type):
    if (process_type == 1):
        return [['source_institution', 'gender', 'age', 'declared_symptoms',
                 'reported_symptoms', 'diagnosis', 'travel_history', 'contact_confirmation', 'test_result']]
    else:
        return [['source_institution', 'gender', 'age', 'date_symptoms_start', 'declared_symptoms', 'date_hospitalization',
                 'reported_symptoms', 'diagnosis', 'travel_history', 'transit_methods', 'contact_confirmation', 'date_results', 'test_result']]


def preprocess_dataset(input_file, output_file, process_type):
    with open(input_file) as f_in:
        c = csv.reader(f_in, delimiter=",")

        processed_rows = get_processed_rows(process_type)
        map_of_institution_codes = {}
        map_of_gender_codes = {}

        i = 0
        for row in c:
            if i == 7000:
                break
            elif i != 0:
                # print(row)
                processed_row = preprocess(
                    row, map_of_institution_codes, map_of_gender_codes, process_type)
                if ((processed_row[3] != -1 or processed_row[4] != -1 or processed_row[5] != -1) or process_type == 0):
                    processed_rows.append(processed_row)

                i += 1
            elif i == 0:
                i += 1

        with open(output_file, 'w+', newline='') as f_out:
            csv_writer = csv.writer(f_out)
            for row in processed_rows:
                csv_writer.writerow(row)


if __name__ == "__main__":
    if sys.argv[1] == "train":
        if len(sys.argv) != 5:
            print("Incorrect number of arguments. Please use format:\npython main.py train <path-to-input-csv-file> <path-to-output-csv-file> <ludwig-model-definition>")

        preprocess_dataset(sys.argv[2], sys.argv[3], 1)

        config = sys.argv[4]
        model = LudwigModel(config)
        train_stats = model.experiment(dataset=sys.argv[3], training_set=sys.argv[3], validation_set=sys.argv[3],
                                       test_set=sys.argv[3], experiment_name='covid_inference', model_name='train')

        print(train_stats)
    elif sys.argv[1] == "evaluate":
        if len(sys.argv) != 6:
            print("Incorrect number of arguments. Please use format:\npython main.py evaluate <path-to-trained-model> <path-to-input-csv-file> <path-to-output-csv-file> <ludwig-model-definition>")

        preprocess_dataset(sys.argv[3], sys.argv[4], 0)

        config = sys.argv[5]
        model = LudwigModel.load(sys.argv[2])
        train_stats = model.evaluate(dataset=sys.argv[4], skip_save_predictions=False,
                                     skip_save_eval_stats=False, collect_predictions=True, collect_overall_stats=True)
        print(train_stats)
    else:
        print(
            "Incorrect arguments. Please use format:\n python main.py [train/evaluate]")
        # ludwig train --dataset sys.argv[2] --config sys.argv[3]
