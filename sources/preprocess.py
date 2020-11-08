import re

from constant import *

mapp = {}


def get_highest_value_from_map(map):
	if len(map):
		return max(map.values())
	return 0


def encoding_as_map(string, map_of_codes):
	if map_of_codes[string] == None:
		map_of_codes[string] = get_highest_value_from_map(map_of_codes) + 1
	return map_of_codes[string]


def source_institution(institution, map_of_institution_codes):
	institution = institution.strip().upper()
	return encoding_as_map(institution, map_of_institution_codes)


def gender(gender, map_of_gender_codes):
	gender = gender.strip().upper()
	if gender == "F":
		gender = "FEMININ"
	elif gender == "M":
		gender = "MASCULIN"
	else:
		gender = "ALTUL"
	return encoding_as_map(gender, map_of_gender_codes)


def age(age):
	age = age.upper()
	if not age.isdigit():
		if "an" in age:
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


def date():
	return 0


def symptoms():
	return 0


def travel_history():
	return 0


def contact_confirmation():
	return 0


def test_result():
	return 0
