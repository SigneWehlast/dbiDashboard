# dbiDashboard

Dette projekt er et udsnit af en optimeret webapplikation til DBI Egenkontrollen.


## Funktioner på webapplikationen:

- Log ind / opret en bruger
- Se skemaer
- Oprette skemaer
- Se rapporter
- Se brugere


## Installation

For at installere dbiDashboard:

1. Klon repository: https://github.com/SigneWehlast/dbiDashboard
2. Gå ind i filen: 'cd dbiDashboard'
3. Installer med 'npm install'
4. Build projektet: 'npm run build'
5. Kør i developer mode: 'npm run dev'


## Development

Hvis du vil udvikle på dbiDashboard, skal du:

1. Lav en kopi af dbiDashboard projektet
2. Lav en ny branch
3. Lav ændringer
4. Test dine ændringer (eksempel på test er kommandoen npx eslint (på hele projektet) eller npx eslint src/filnavnet.js)
5. Commit ændringerne
6. Push ændringerne
7. Send pull request


## Teknologier og værktøjer anvendt i dbiDashboard

- Chart.js (npm install chart.js)
- ESLint (npm init @eslint/config@latest)
- Firebase (npm install firebase)
- Pinia (npm install pinia)
- Sass (npm install -D sass)
- Vue.js (npm install vue@latest)


## Opbygning af projekt

src/
- assets/
    - icons
    - main.scss
- components/ <!-- Alle komponenterne -->
- configs/
    - firebase.js
- router
    - index.js
- stores
    - AuthStore.js
    - ObjectStore.js
    - ScheduleStore.js
- utils
    - firebaseUtils.js
- views/ <!-- Alle views --> 
- app.vue
- main.js


## Design team

- Johannes, Nikoline og Peter

## Developer team

- Kasper Nielsen, Kristoffer Madsen og Signe Wehlast