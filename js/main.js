import router from "./router.js"
import { ajoutLivres, afficherLivres } from "./parametres.js"
import { alimenterDropdown } from "./accueil.js"
import { bookSelected } from "./accueil.js"
import { submitTaskform } from "./accueil.js"
import { afficherCartes } from "./ecrits.js"
import { verifDate } from "./accueil.js"
import { ecritureLibre } from "./accueil.js"
import { majdDashboard } from "./parametres.js"
import { showToast } from "./utils.js"


router()
ajoutLivres()
afficherLivres()
alimenterDropdown()
bookSelected()
submitTaskform()
afficherCartes()
verifDate()
ecritureLibre()
majdDashboard()
showToast()