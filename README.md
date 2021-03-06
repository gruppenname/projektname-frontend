# projektname-frontend
This is the frontend for a small Todo-List in Vuejs.
### Clone Repository

```bash
git clone https://github.com/gruppenname/projektname-frontend.git

```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Ausführung der gesamten Applikation mit Docker-Compose
1. clone das Backend (https://github.com/gruppenname/projektname-backend.git) in das gleiche Verzeichnis wie dieses Frontend
2. Ändere im Frontend Dockerfile die Auskommentierung der ENV damit die lokale Backend-Url genutzt werden kann
3. Stelle sicher dass dein Docker Daemon läuft
4. Navigiere in deiner Konsole zum Backend-Ordner und führe `docker-compose build` und `docker-compose up` aus.



## Deployment
Das Deployment findet in diesem Projekt über Kubernetes statt. Notwendig hierzu ist ein Clusterzugang für den ["Data Science Cluster"](https://labor.beuth-hochschule.de/ris/data-science-cluster/) der Beuth Hochschule für Technik Berlin und die Installation von kubectl.
<img width="700" alt="Screenshot 2021-06-10 at 11 34 11" src="https://user-images.githubusercontent.com/53577336/121501742-caaa9900-c9df-11eb-8a22-1a11a3fa212f.png">

Deployment-Dateien finden sich im Ordner "deployment" .


Das Deployment kann mit `kubectl apply -f deployment/deployment.yaml` deployt werden. Hier ist wichtig, dass zuvor ein Image vom Frontend lokal gebaut und in die registry gepusht wurde.
Danach wird eine stabile IP-Adresse für das Deployment benötigt, wofür der Service deployt werden muss: `kubectl applf -f deployment/service.yaml`
Damit unsere Frontend-Applikation in die Welt sichtbar ist, muss dann ein Ingress erstellt werden. `kubectl applf -f deployment/ingress.yaml`. 
