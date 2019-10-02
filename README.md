# Kmom10 / Projekt - AirAndWeather
## Specifikation

I denna app kan användaren se Väder, Luftkvalitet samt UV strålning vid sin nuvarande position. Man får se nuvarande och en prognos för framtida UV index och väderlekar.

I kart vyn kan man även se luftkvalitet, temperatur, moln och väderlek kring den plats man tittar på.

Man kan registrera ett konto och välja sin hudtyp i dagens utgåva av appen. Man får även se en formel över hur lång tid man kan vistas i solen utan att bränna sig.

I nästa utgåva av appen är det tänkt att användaren även ska kunna få information om hur lång tid det är säkert att vistas i solen med vald hudtyp.


## Datakällor

Desa är de datakällor som används
API:er som anropas för att hämta information
* [Världens luftföroreningar: Luftkvalitetsindex i realtid
](https://api.waqi.info/feed/)
* [Open Weathermap UV Index](http://api.openweathermap.org/data/2.5/uvi)
* [Open Weathermap weather data](http://api.openweathermap.org/data/2.5/)

Information till kartan hämtas också ifrån följande
* [Tiles till luftkvalitet](https://tiles.waqi.info/tiles/usepa-aqi/)
* [Tiles för temperatur](https://tile.openweathermap.org/map/temp_new/)
* [Tiles för moln](https://tile.openweathermap.org/map/clouds_new/)
* [Tiles för vind](https://tile.openweathermap.org/map/wind_new/)
* [Tiles för utfällning(nederbörd)](https://tile.openweathermap.org/map/precipitation_new/)

För att kunna logga in används [Auth av Emil Folino](https://auth.emilfolino.se)

## Arkitektur

Det här projektet är byggt med JavaScript med hjälp av ramverket Mithril och Cordova för Android och webbläsaren. Sass används för att styla appen.
Fokuset för appen är att man skall använda mobila enheter, men den ska även fungera i en webbläsare.

Vyerna är så gott det går tänkt att vara simpla utan för mycket logik, map är nog den vy med mest logik för att hantera kartan och utritandet utav positioner på kartan. T.ex. att uppdatera utskriften av väderleksrapporter när man flyttar runt på kartan.


Modeller för allt finns sparat i 'www/js/models' och alla vyer ligger sparade i 'www/js/views'

Det finns totalt sett 7 olika modeller i 'www/js/models'
* airq - Används för att läsa information från waqi för luftkvalitet.
* auth - Sköter allt som har med användarens inloggning och hämtar sparad information.
* functions - Funktioner som används i anndra modeller och vyer, handlar mestadels om att formatera tid och datum.
* position - Avläser användarens position och lagrar denna i sig själv.
* skintype - Avhandlar allt som har med hudtyper att göra. Innehåller information av användarens hudtyp och alla varianter av hudar.
* uvi - Avläser och lagar information om uv index. Nuvarande och prognoser.
* weather - Läser in och lagrar väderleksrapporter.

Position modellen hanterar förutom position även anrop till varje modell för att trigga nerladdning och sparning utav information i varje modell för att ha detta redo för varje vy. Detta valet borde arbetas om för att göra färre anrop till alla API:er i framtiden.

De vyer som finns är följande
* weather/days - visar prognos för 5 dagar frammåt, dag och kväll.
* weather/tomorrow - visar prognos för imorgon.
* weather/today - visar dagens prognos.
* home - Visar nuvarande väder, UV index samt luftkvalitet på den plats man befinner sig på.
* layout - Hanterar layout av appen samt navigation.
* login - Hanterar inloggning av användare i ett form.
* map - Visar en karta med luftkvalitet, temperatur, moln, väder etc.
* profile - Visar hudtyper och användarens sparade hudtyp. Kan endast nås om man är inloggad.
* register - Låter en användare registrera sig.
* uvi - Visar UVI prognoser.

Layout i view mappen hanterar att varje vy får en navbar och content del, och hanterar navigeringen mellan vyer.

Map har en del logik för att lägga till olika lager till kartan för att kunna hämta temperatur kartor, tiles med luftkvalitet etc. Det finns även en event lyssnare som uppdaterar väderinformationen kring den plats man är på. Då APIt bara retunrerar max 50 platser och inte har någon filtreringsmekanism inbyggt och det inte fanns tillräckligt tid för att filtrerar platserna själv har valet gjorts att inte visa desa rapporter om zoom är mindre än 10, detta då det blev för rörigt på kartan annars.

i 'www/css' finns alla sass filer för att styla appen.

Sedan finns även en index.js fil som läser in och presenterar allt för användaren.
