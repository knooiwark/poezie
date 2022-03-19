//--------------------------------------------------------------------------------------------------------------
// Fast prototype of a Dutch poem generator (needs some further improvements to get a really good generator)
// Snel prototype van een Nederlands gedichten generator (heeft nog wat verbeteringen nodig om het echt goed en mooi te krijgen)
// Knooiwark - september 2019
//--------------------------------------------------------------------------------------------------------------

var MaakPoezie = document.getElementById('maak-poezie');

MaakPoezie.addEventListener('click', function(){

	var aantal = document.getElementById('aantal').value;
	document.getElementById('poezie-resultaat').innerHTML = Poeziemaker(aantal);
})

// *** STATIC DATA --------------------------------------------------------------------------------------------------------------------
var zinPatronen_org = [
	["lidwoord", "bijvoegelijk naamwoord", "zelfstandig naamwoord", "werkwoord", "voorzetsel", "lidwoord", "zelfstandig naamwoord", "einde"],
	["voornaamwoord", "werkwoord", "bijwoord", "lidwoord", "zelfstandig naamwoord", "voorzetsel", "lidwoord", "zelfstandig naamwoord", "einde"],
	["voorzetsel", "vragend voornaamwoord", "werkwoord", "voornaamwoord", "einde"],
	["voornaamwoord", "werkwoord", "bijwoord", "bijvoegelijk naamwoord", "zelfstandig naamwoord", "bijwoord", "lidwoord", "bijvoegelijk naamwoord", "zelfstandig naamwoord","einde"],
	["lidwoord", "zelfstandig naamwoord", "werkwoord", "bijvoegelijk naamwoord", "zelfstandig naamwoord", "einde"],
	["voornaamwoord", "werkwoord", "voornaamwoord", "bijwoord", "bijvoegelijk naamwoord", "zelfstandig naamwoord", "einde"]
];

var zinPatronen =[
	["lidwoord", "bijvoegelijk naamwoord", "zelfstandig naamwoord", "einde"],
	["voorzetsel", "lidwoord", "zelfstandig naamwoord", "einde"	],
	["voornaamwoord", "werkwoord", "einde"]
]

var voorzetsels = ["aan", "bij", "door", "in", "met", "na", "naar", "om", "op", "van", "voor"];
var lidwoorden = ["de", "het", "een"];
var bijwoorden = ["nu", "toen", "daar", "hier", "soms", "vaak", "nooit"];
var vragend = ["wanneer", "hoe", "wie", "wat", "waar"];
var voornaamwoordenA = ["ik", "jij", "zij", "wij", "het"];
var voornaamwoordenB = ["mijn", "jou", "haar"];

var bijvoegelijk = ["aantrekkelijk", "afschuwlijk", "bang", "bijzonder", "bibberend", "betoverend", "comfortabel", "charmant", "donker", "dapper", "diep", "eenvoudig", "eenzaam", "eerlijk", "elegant", "enorm", "fantatisch", "gelukkig", "goed", "geweldig", "heerlijk", "hevig", "jong", "klein", "koel", "kort", "lang", "lelijk", "leuk", "mager", "meeslepend", "magisch", "mooi", "natuurlijk", "oud", "ongekend", "rauw", "recht", "schitterend", "spannend", "subtiel", "verkeerd", "verschrikkelijk", "verbazingwekkend", "vreemd", "voorzichtig", "vrolijk", "warm", "werkelijk", "wild", "vrij", "ziek", "zout", "zacht", "zwoel", "opvallend", "verdord", "bedekt", "glanzend", "heimelijk", "opgewekt", "onverwacht", "scherp", "wild", "woest", "bewegend", "warm", "voorzichtig", "verstikkend", "somber", "zwijgend", "rustig", "verstard", "verbijsterd", "onschuldig", "bang", "donker", "oud", "broeierig", "verboden", "schemerig", "prachtig", "knarsend", "onzichtbaar", "klinkend"];

var werkwoordenA = ["adem", "bouw", "begrijp", "bereik", "bescherm", "beloof", "beweeg", "bloed", "breek", "denk", "duw", "dans", "duw", "dien", "droom", "draai", "draag", "ervaar", "geniet", "groei", "geloof", "glimlach", "haat", "heb", "herinner", "jaag", "kan", "kom", "kijk", "leef", "lig", "luister", "maak", "mis", "noem", "open", "ontdek", "ren", "spring", "schreeuw", "speel", "slaap", "trek", "verstar", "verander", "val", "vlucht", "vergeet", "vlieg", "word", "zeg", "zie", "zing", "zoek", "zit", "zwijg"];

var werkwoordenB = ["ademt", "bouwt", "begrijpt", "beschermt", "bereikt", "beloofd", "beweegt", "bloedt", "breekt", "denkt", "duwt", "danst", "duwt", "dient", "droomt", "draait", "draagt", "ervaart", "geniet", "groeit", "gelooft", "glanst", "glimlacht", "hebt", "herinnert", "jaagt", "komt", "kijkt", "leeft", "ligt", "luistert", "maakt", "mist", "noemt", "ontdekt", "opent", "rent", "speelt", "springt", "smekend", "schreeuwt", "slaapt", "trekt", "valt", "verandert", "vliegt", "vergeet", "vernielt", "wordt", "zegt", "ziet", "zingt", "zoekt", "zwijgt"];

var werkwoordenC = ["ademen", "bouwen", "begrijpen", "beschermen", "bereiken", "beloven", "bewegen", "bloeden", "breken", "duwen", "denken", "dansen", "duwen", "dienen", "dromen", "draaien", "dragen", "ervaren", "haten", "geloven", "groeien", "genieten", "glimlachen", "hebben", "herinneren", "jagen", "komen", "kijken", "komen", "leven", "liggen", "luisteren", "maken", "missen", "noemen", "openen", "ontdekken", "rennen", "spelen", "springen", "schreeuwen", "slapen", "trekken", "vallen", "veranderen", "vergeten", "vernielen", "vluchten", "verstarren", "vliegen", "worden", "zeggen", "zien", "zingen", "zitten", "zoeken", "zwijgen"];

var zelfstandig_de = ["angst", "aanval", "avond", "aarde", "bloem", "boom", "brand", "droom", "berg", "circel", "drek", "dood", "duivel", "eenzaamheid", "foto", "glimlach", "god", "geur", "grond", "hemel", "heuvel", "hel", "hoop", "herfst", "kunst", "kosmos", "keuze", "liefde", "lach", "lucht", "man", "maan", "muziek", "machine", "moord", "ochtend", "oorzaak", "poes", "poort", "regen", "rots", "ring", "ruimte", "schaduw", "schat", "sneeuw", "stilte", "straf", "sleutel", "toekomst", "test", "vraag", "wens","vogel", "vangst", "vrouw", "vrijheid", "waarheid", "wereld", "wolk", "wind", "zee", "zon"];

var zelfstandig_het = ["antwoord", "afscheid", "bos", "been", "beest", "begin", "bloed", "eiland", "einde", "gevecht", "geld", "geluk", "geluid", "gevaar", "gat", "geloof", "gif", "genot", "gezicht", "hoofd", "kruis", "kind", "lichaam", "land", "middel", "moment", "nut", "niets", "ongeluk", "oog", "offer", "probleem", "paard", "park", "pistool", "resultaat", "teken", "uur", "verschil", "verstand", "vuur", "zwaard"];


var zelfstandig_een = ["aanval", "aarde", "avond", "antwoord", "been", "bloem", "boom", "beest", "begin", "brand", "berg", "circel", "droom", "dood", "eiland", "foto", "glimlach", "god", "gevaar", "geur", "gezicht", "grijns", "geloof", "genot", "gat", "heuvel", "herinnering", "hamer", "hemel", "hel", "hoofd", "idee", "kruis", "kans", "lichaam", "lucht", "moord", "ongeluk", "pistool", "poes", "rots", "ring", "schaduw", "sleutel", "schat", "teken", "traan", "vraag", "vriend", "vogel", "wens", "wolk", "zee", "zwaard"];

var einde = [".", "?", "!"];
var pauze  = [",", "..."];
// *** STATIC DATA --------------------------------------------------------------------------------------------------------------------

function Poeziemaker(aantal){

	var aantalZinpatronen;
	var aantalSoortZinnen = zinPatronen.length;
	var aantalZinnen = aantal;
	var actueelWoord;
	var actueelLidwoord;
	var actueelPersoonsvorm;
	var actueelBijvoeglijkNaamwoord = false;
	var actueelZelfstandigNaamwoord;
	var actueelVragend = false;

	var zinnen = [];
	var zin = "";

	for (var i = 0; i < aantalZinnen; i++) {

		var len = zinPatronen.length;
		var zinPatroon = zinPatronen[Math.floor(Math.random()*len)];	// neem een willekeurige zinPatroon
		//var zinPatroon = zinPatronen[0];

		for (var j = 0; j < zinPatroon.length; j++) {

			// *** Voorzetsels
			if (zinPatroon[j] === "voorzetsel"){
				actueelWoord = voorzetsels[Math.floor(Math.random() * voorzetsels.length)];
				zin += actueelWoord + " ";
			}

			// *** Lidwoorden
			else if (zinPatroon[j] === "lidwoord"){
				actueelWoord = lidwoorden[Math.floor(Math.random() * lidwoorden.length)];
				actueelLidwoord = actueelWoord;
				zin += actueelWoord + " ";
			}

			// *** Bijwoorden
			else if (zinPatroon[j] === "bijwoord"){
				actueelWoord = bijwoorden[Math.floor(Math.random() * bijwoorden.length)];
				zin += actueelWoord + " ";
			}

			// *** Vragend voornaamwoorden
			else if (zinPatroon[j] === "vragend voornaamwoord"){
				actueelWoord = vragend[Math.floor(Math.random() * vragend.length)];
				actueelVragend = true;
				zin += actueelWoord + " ";
			}

			// ***Voornaamwoorden
			else if (zinPatroon[j] === "voornaamwoord"){
				actueelWoord = voornaamwoordenA[Math.floor(Math.random() * voornaamwoordenA.length)];
				actueelPersoonsvorm = actueelWoord;
				zin += actueelWoord + " ";
			}

			// *** Bijvoegelijke naamwoorden
			else if (zinPatroon[j] === "bijvoegelijk naamwoord"){

				actueelBijvoeglijkNaamwoord = true;

				if (actueelLidwoord === "de"){
					actueelWoord = bijvoegelijk[Math.floor(Math.random() * bijvoegelijk.length)];
					zin += actueelWoord + "e ";
				}
				else if (actueelLidwoord === "het"){
					actueelWoord = bijvoegelijk[Math.floor(Math.random() * bijvoegelijk.length)];
					zin += actueelWoord + "e ";
				}
				else if (actueelLidwoord === "een"){
					actueelWoord = bijvoegelijk[Math.floor(Math.random() * bijvoegelijk.length)];
					zin += actueelWoord;
				}
			}

			// *** Werkwoorden
			else if (zinPatroon[j] === "werkwoord"){

				if (actueelPersoonsvorm === "ik"){
					actueelWoord = werkwoordenA[Math.floor(Math.random() * werkwoordenA.length)];
					zin += actueelWoord + " ";
				}
				else if (actueelPersoonsvorm === "jij" || actueelPersoonsvorm === "het" || actueelVragend || actueelLidwoord === "de"){
					actueelWoord = werkwoordenB[Math.floor(Math.random() * werkwoordenB.length)];
					zin += actueelWoord + " ";
				}
				else if (actueelPersoonsvorm === "zij" || actueelPersoonsvorm === "wij"){
					actueelWoord = werkwoordenC[Math.floor(Math.random() * werkwoordenC.length)];
					zin += actueelWoord + " ";
				}
			}

			// *** Zelfstandige naamwoorden
			else if (zinPatroon[j] === "zelfstandig naamwoord"){

				// Wanneer lidwoord = de
				if(actueelLidwoord === "de"){
					actueelWoord= zelfstandig_de[Math.floor(Math.random() * zelfstandig_de.length)];
					actueelZelfstandigNaamwoord = "de";
					zin += actueelWoord + " ";
				}
				// Wanneer lidwoord = het
				else if(actueelLidwoord === "het"){
					actueelWoord = zelfstandig_het[Math.floor(Math.random() * zelfstandig_het.length)];
					actueelZelfstandigNaamwoord = "het";
					zin += actueelWoord + " ";
				}
				// Wanneer lidwoord = een
				else if(actueelLidwoord === "een"){
					// random een "de" of "het" woord kiezen
					var rand = Math.floor(Math.random()*2);

					// "de" scenario (e toevoegen aan bijvoeglijk naamwoord als die er is)
					if (rand === 0){
						if (actueelBijvoeglijkNaamwoord){
							zin += "e ";
						}
						actueelWoord = zelfstandig_de[Math.floor(Math.random() * zelfstandig_de.length)];
						actueelZelfstandigNaamwoord = "de";
					}
					// "het" scenario
					else if (rand === 1){
						zin += " ";
						actueelWoord = zelfstandig_het[Math.floor(Math.random() * zelfstandig_het.length)];
						actueelZelfstandigNaamwoord = "het";
					}
					zin += actueelWoord + " ";
				}
				// Wanneer er nog geen lidwoord in de zin staat voor dit zelfstandig naamwoord
				else{
				 var r =	Math.floor(Math.random()* 2);

				 if (r === 0){
					 actueelWoord= zelfstandig_de[Math.floor(Math.random() * zelfstandig_de.length)];
				 }
				 else if (r === 1){
					 actueelWoord = zelfstandig_het[Math.floor(Math.random() * zelfstandig_het.length)];
				 }
				 zin += actueelWoord + " ";
				}
			}
			// *** Einde van de zin
			else if (zinPatroon[j] === "einde"){
				actueelWoord = actueelWoord.replace(/\s/g, '');
				zin += "<br>";
			}
		}

		zin = zin.charAt(0).toUpperCase() + zin.slice(1);
		zinnen[i] = zin;
		zin = [];
		actueelVragend = false;
		actueelBijvoeglijkNaamwoord = false;
	}
	zinnen = zinnen.toString();
	zinnen = zinnen.replace(/,/g, '');

	return zinnen;
}
