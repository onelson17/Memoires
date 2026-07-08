import router from "./router.js"
import { ajoutLivres, afficherLivres } from "./parametres.js"
import { alimenterDropdown } from "./accueil.js"
import { bookSelected } from "./accueil.js"
import { submitTaskform } from "./accueil.js"

router()
ajoutLivres()
afficherLivres()
alimenterDropdown()
bookSelected()
submitTaskform()