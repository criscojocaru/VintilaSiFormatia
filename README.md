# VintilaSiFormatia

## Table of Contents

- [About the Project](#about-the-project)
  - [Used Technologies](#used-technologies)
  - [Wiki webpage](#wiki-webpage)
  - [How does it work?](#how-does-it-work)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
    - [Backend Prerequisites](#backend-prerequisites)
    - [Frontend Prerequisites](#frontend-prerequisites)
  - [Installation](#installation)
  - [How to run](#how-to-run)
    - [Training and evaluation](#training-and-evaluation)
      - [Training](#training)
      - [Evaluation](#evaluation)
    - [Overall Application](#overall-application)
      - [Backend](#backend)
      - [Frontend](#frontend)
- [Contributing](#contributing)
  - [The Team](#the-team)

## About The Project

This ML project is about inference for patients that are suspects for COVID-19 desease.

### Used Technologies

 * Python
 * Ludwig
 * Flask
 * Angular

### Wiki webpage
https://github.com/criscojocaru/VintilaSiFormatia/wiki

### How does it work?
 * Python script will read the training data set and preprocess it
 * After preprocessing, we will train the model using Ludwig
 * The user accesses the website and loads the dataset
 * Call from frontend towards backend is made to evaluate the dataset on the trained model
 * Results are returned and showed in an easy to understand way

## Getting Started

### Prerequisites

#### Backend Prerequisites

1. Install [Python 3](https://www.python.org/downloads/)

2. Run the following commands in an elevated PowerShell window / CMD window:

python -m pip install --upgrade pip

pip install ludwig

3. (Optional step) If you're using Windows, on build 2004 you have to run:

pip install numpy==1.19.3

4. Also run the following commands:

python -m spacy download en

pip install flask

#### Frontend Prerequisites

1. Install [Node.js](https://nodejs.org/en/), LTS. Make sure to also install npm and select Add to PATH

### Installation

1. Navigate to /sources/Angular_UI in a PowerShell elevated prompt

2. Run the following command:

npm ci

### How to run

#### Training and evaluation

##### Training

 * python .\sources\main.py train .\input\training.dataset.csv .\output\preprocessed.dataset.csv .\sources\model_definition_train.yaml

##### Evaluation

 * python .\sources\main.py evaluate .\results\covid_inference_train\model .\input\testing.dataset.csv .\output\preprocessed-exp.dataset.csv .\sources\model_definition_evaluate.yaml

#### Overall application

##### Backend

1. Navigate to the project's root in a PowerShell prompt

2. Run the following command:

python sources/server.py

##### Frontend

1. Navigate to the /sources/Angular_UI folder in a PowerShell prompt

2. Run the following command:

npm start

3. Access the website application at the link: http://localhost:4200/covid-inference

## Contributing

### The team

1. Bengescu Paul, 341C5, Developer
2. Ciudin Andreea-Alexandra, 341C5, Developer
3. Cojocaru Cristina-Gabriela, 342C3, Team Leader
4. Petrescu Ioana-Raluca, 341C5, Analyst
5. Vintila Marius-Mihai, 341C5, Project Manager
