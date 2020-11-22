import datetime
import calendar
import re

from constant import *

mapp = {}


def get_highest_value_from_map(map):
    if len(map):
        return max(map.values())
    return 0


def encoding_as_map(string, map_of_codes):
    if map_of_codes.get(string) == None:
        map_of_codes[string] = get_highest_value_from_map(map_of_codes) + 1
    return map_of_codes.get(string)


def source_institution(institution, map_of_institution_codes):
    institution = institution.strip().upper()
    return encoding_as_map(institution, map_of_institution_codes)


def gender(gender, map_of_gender_codes):
    gender = gender.strip().upper()
    if gender == 'F':
        gender = 'FEMININ'
    elif gender == 'M':
        gender = 'MASCULIN'
    else:
        gender = 'ALTUL'
    return encoding_as_map(gender, map_of_gender_codes)


def age(age):
    age = age.lower()
    if not age.isdigit():
        if 'an' in age:
            match = re.findall(r'\d+ *an', age)
            if len(match):
                age_as_int = int(re.findall(r'\d+', match[0])[0])
            else:
                age_as_int = 0
        elif any(x in age for x in AGE_CONSTANTS):
            age_as_int = 0
        else:
            # default value for ages not matching any known format
            age_as_int = 0
    else:
        age_as_int = int(age)

    if age_as_int >= 0 and age_as_int <= 200:
        return age_as_int
    return 0


def date(date):
    # Processing:
    # YYYY-MM-dd
    # Dd.MM.YYY
    # Dd(./,)MM(./,)YYYY
    year = 2020
    month = 11
    day = 8
    # Encoding:
    dt = datetime.datetime(year, month, day)
    tt = datetime.datetime.timetuple(dt)
    epoch = calendar.timegm(tt)
    return epoch


def symptoms(symptom):
    symptom = symptom.lower()
    if 'cov' in symptom and not 'asimpto' in symptom:
        return 1
    elif 'asimpto' in symptom:
        return 0
    elif any(x in symptom for x in SYMPTOMS_CONSTANTS):
        return 1
    elif len(symptom) == 0:
        return -1
    return 0


def travel_history(history):
    history = history.strip().lower()
    if any(x in history for x in HISTORY_CONSTANTS):
        return 0
    elif history == "0":
        return 0
    elif len(history) == 0:
        return 0
    return 1


def contact_confirmation(contact):
    contact = contact.strip().lower()
    if any(x in contact for x in CONTACT_CONSTANTS):
        return 1
    elif contact == "1":
        return 1
    return 0


def test_result(result):
    result = result.strip().upper()
    if "POZITIV" in result:
        return 1
    return 0


def ignore():
    return -1


def preprocess(row, map_of_institution_codes, map_of_gender_codes, process_type):
    preprocessed_row = []

    preprocessed_row.append(source_institution(
        row[0], map_of_institution_codes))
    preprocessed_row.append(gender(row[1], map_of_gender_codes))
    preprocessed_row.append(age(row[2]))
    if (process_type == 0):
        preprocessed_row.append(ignore())
    preprocessed_row.append(symptoms(row[4]))
    if (process_type == 0):
        preprocessed_row.append(ignore())
    preprocessed_row.append(symptoms(row[6]))
    preprocessed_row.append(symptoms(row[7]))
    preprocessed_row.append(travel_history(row[8]))
    if (process_type == 0):
        preprocessed_row.append(ignore())
    preprocessed_row.append(contact_confirmation(row[10]))
    if (process_type == 0):
        preprocessed_row.append(ignore())
    preprocessed_row.append(test_result(row[12]))

    return preprocessed_row
