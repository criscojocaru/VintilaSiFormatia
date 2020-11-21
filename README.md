# VintilaSiFormatia

## Table of Contents

- [About the Project](#about-the-project)
  - [Used Technologies](#used-technologies)
  - [Wiki webpage](#wiki-webpage)
  - [How does it work?](#how-does-it-work)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Contributing](#contributing)
  - [The Team](#the-team)

## About The Project

This ML project is about inference for patients that are suspects for COVID-19 desease.

### Used Technologies

 * Python
 * Ludwig
 * Flask

### Wiki webpage
https://github.com/criscojocaru/VintilaSiFormatia/wiki

### How does it work?
 * Python script will read the data set and preprocess it
 * After preprocessing, we will train the data using Ludwig

## Getting Started

### Prerequisites

1. Install [Python 3](https://www.python.org/downloads/)

2. Run the following commands in an elevated PowerShell window / CMD window:

python -m pip install --upgrade pip

pip install ludwig

3. (Optional step) If you're using Windows, on build 2004 you have to run:

pip install numpy==1.19.3

4. Also run the following command:

python -m spacy download en

pip install flask

### Installation

### How to run

 * python .\sources\main.py train .\input\mps.dataset.csv .\output\preprocessed.dataset.csv .\sources\model_definition.yaml
 * python .\sources\main.py experiment .\results\covid_inference_train\model\ .\input\experiment.dataset.csv .\output\preprocessed-exp.dataset.csv .\sources\model_definition.yaml

## Contributing

### The team

1. Bengescu Paul, 341C5, Developer
2. Ciudin Andreea-Alexandra, 341C5, Developer
3. Cojocaru Cristina-Gabriela, 342C3, Team Leader
4. Petrescu Ioana-Raluca, 341C5, Analyst
5. Vintila Marius-Mihai, 341C5, Project Manager
