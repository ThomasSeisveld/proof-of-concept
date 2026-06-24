Ontwerp en maak een data driven online concept voor een opdrachtgever

De instructies voor deze opdracht staan in: [docs/INSTRUCTIONS.md](https://github.com/fdnd-task/proof-of-concept/blob/main/docs/INSTRUCTIONS.md)

# Into golf "mijn progressie" pagina
IntoGolf bouwt momenteel aan een nieuwe versie van de ikgagolfen.nl webapp.

## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving

<img width="845" height="130" alt="Image" src="https://github.com/user-attachments/assets/6f48052e-5ea3-48b0-8084-31d81d9e58b4" />

IntoGolf is een Nederlands softwarebedrijf dat sinds 2000 beheersystemen ontwikkelt voor golfclubs en -banen. Ze werken samen met clubs aan software die alle dagelijkse processen samenbrengt in één geïntegreerd systeem — van baanplanning en wedstrijdorganisatie tot ledenbeheer en financiën.

Eén van hun producten is ikgagolfen.nl — een platform voor golfers waarmee ze eenvoudig starttijden kunnen reserveren op banen in de buurt, hun handicap kunnen bijhouden, en met vrienden kunnen spelen. De app toont ook je WHS handicap, recente rondes en een vergelijking met clubgenoten.

Design challenge: Ontwikkel de "Mijn progressie" pagina voor de nieuwe ikgagolfen.nl webapp.

<!-- Bij Beschrijving staat kort beschreven wat voor project het is en wat je hebt gemaakt -->
<!-- Voeg een mooie poster visual toe 📸 -->
<!-- Voeg een link toe naar Github Pages 🌐-->

## Kenmerken
<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met JS gedaan en hoe? Misschien heb je iets met NodeJS gedaan, of heb je een framwork of library gebruikt? -->
**Gegeven design:**

<details>
  <summary>Click to expand</summary>

  This content is hidden by default.

https://github.com/user-attachments/assets/62ced4e2-8a45-45d5-998c-d712e91ee1eb
</details>



Ik heb 3 componenten kunnen maken uit het gegeven design. Ik heb vooral het design van de opdrachtgever gebruikt als style
### Mijn handicap

De header en handicap score is helemaal gemaakt met liquid en css. De data komt uit de api en zorgd ervoor dat je je handicap score goed en overzichtelijk kan zien.

<img width="308" height="244" alt="Image" src="https://github.com/user-attachments/assets/b299c840-b16e-45b1-94da-63904d010543" />

---
### Rankinglijst

De rankinglijst is gemaakt zonder het gebruik van javascript en is alleen liquid en css. Door een for loop te gebruiken in een lijst ontstaan waas je vrienden in komen. Je kan hiermee je scores vergelijken en weten wij de beste is.

<img width="311" height="403" alt="Image" src="https://github.com/user-attachments/assets/28bef057-194b-49ca-ab4a-5c49568c74b8" />


---
### Recente ronde lijst

De recente ronde lijst is gemaakt zonder het gebruik van javascript en is alleen liquid en css. Je kan ook rondes toevoegen door de popup te openen en de formulier in de vullen. De popup is een nieuwe html feature dus heeft geen javascript nodig om te werken. 
Ook kan je de rondes verwijderen door op de prullenbak te klikken. 

<img width="310" height="345" alt="Image" src="https://github.com/user-attachments/assets/c2be753f-501d-4032-ac39-431d5c739688" />

<img width="310" height="505" alt="Image" src="https://github.com/user-attachments/assets/dc56bf53-ccb5-46ac-8d58-92b54804b838" />

## Installatie
<!-- Bij Instalatie staat hoe een andere developer aan jouw repo kan werken -->

Om dit project op te starten volg je deze stappen

1. clone het project
2. installeer het project
   ```bash
   npm install
   ```
3. start het project op
   ```bash
   npm run start
   ```
   
## Bronnen

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
