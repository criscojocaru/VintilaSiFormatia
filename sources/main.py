import sys
import csv


from preprocess import preprocess


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Incorrect number of arguments. Please use format:\npython main.py <path-to-input-csv-file> <path-to-output-csv-file>")

    with open(sys.argv[1]) as f_in:
        c = csv.reader(f_in, delimiter=",")

        processed_rows = []
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
