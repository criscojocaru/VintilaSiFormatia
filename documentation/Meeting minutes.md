# Meeting minutes

1. 07.11.2020

- Crearea structurii de fisiere pe Github
- Crearea unei pagini de wiki pe Github
- Realizarea fisierului README.md cu detaliile necesare
- Stabilirea tehnologiilor ce vor fi folosite
- Planificarea modului de preprocesare a datelor ce vor fi incluse in dataset

2. 08.11.2020

- Preprocesarea datelor din dataset
- Folosirea Ludwig API pentru antrenarea modelului cu setul initial de date
- Folosirea Ludwig API pentru experimentarea pe modelul antrenat cu subseturi noi de date

3. 14.11.2020

- Am determinat ca trebuia sa folosim predict, nu experiment si nici evaluate pentru prezicerea rezultatelor pe baza unui model deja antrenat
- Am incercat sa intelegem rezultatele oferite de Ludwig
- Am mai facut mici modificari asupra codului

4. 21.11.2020

- Am revenit asupra determinarii noastre, si folosim experiment pentru antrenare si evaluate pentru predictii
- Am obtinut si am aflat interpretarea rezultatelor oferite de Ludwig
- Am adaugat un serviciu de flask ce apeleaza predictia pentru a returna catre frontend rezultatele prin intermediul unui call de REST
- Am creat template-ul de Angular, si am creat un modul pentru adaugarea unui fisier csv si transmiterea acestuia catre backend
- Am preluat rezultatele trimise de catre backend catre frontend si le-am salvat
- Am afisat acuratetea si matricea de confuzie

5. 22.11.2020

- Am adaugat toate coloanele pentru evaluare
- Am adaugat date specifice pentru rezultatele pozitive si negative: acuratete, precizie, recall, f1
- Am adaugat predictiile si probabilitatile pentru predictii si le-am afisat in frontend
- Am facut modificari asupra fisierului README
- Am creat prezentarea proiectului
