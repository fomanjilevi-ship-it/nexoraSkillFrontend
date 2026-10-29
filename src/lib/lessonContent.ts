import type { CourseContent } from "@/data/courses";

export interface LessonExplanation {
  introduction: string;
  details: string;
  takeaways: string[];
  exercise: string;
}

export function getLessonExplanation(
  course: CourseContent,
  moduleTitle: string,
  lessonTitle: string,
): LessonExplanation {
  const topic = lessonTitle.toLocaleLowerCase("fr");
  let details: string;
  let takeaways: string[];
  let exercise: string;

  if (/html|sémantique|document|balise|structure/.test(topic)) {
    details =
      "Le navigateur transforme le document en une arborescence d'éléments. Choisissez chaque élément selon son rôle, imbriquez correctement le contenu et donnez un nom explicite aux liens et aux champs. Une structure claire améliore l'accessibilité, le référencement et la maintenance.";
    takeaways = ["Un élément HTML décrit le sens du contenu.", "Les titres suivent un ordre logique.", "Les formulaires ont des libellés associés à leurs champs."];
    exercise = "Créez une page avec un titre principal, deux sections nommées, un lien descriptif et un formulaire avec des libellés.";
  } else if (/css|style|flexbox|grid|mise en page|responsive|typographie|couleur/.test(topic)) {
    details =
      "Les règles CSS associent des sélecteurs à des déclarations. La cascade détermine quelles règles s'appliquent, tandis que Flexbox et Grid organisent les éléments dans l'espace disponible. Concevez d'abord pour les petits écrans, puis adaptez la mise en page avec des points de rupture utiles.";
    takeaways = ["La spécificité et l'ordre déterminent la cascade.", "Flexbox convient aux alignements sur un axe.", "Grid organise des rangées et colonnes."];
    exercise = "Reproduisez la section d'une page avec une grille responsive, des espacements cohérents et un état de survol visible.";
  } else if (/javascript|fonction|promesse|async|événement|fetch|boucle|tableau|objet|variable|dom/.test(topic)) {
    details =
      "JavaScript permet de décrire le comportement de l'interface et de transformer les données. Décomposez le problème en fonctions courtes, vérifiez les entrées et utilisez async/await pour rendre lisible le travail asynchrone. Reliez les événements à des actions explicites plutôt qu'à des effets cachés.";
    takeaways = ["Utilisez const par défaut et let si une réaffectation est nécessaire.", "Les fonctions isolent une responsabilité.", "Une promesse peut réussir ou échouer."];
    exercise = "Ajoutez une interaction qui lit une valeur saisie, la valide, puis affiche un résultat dans la page.";
  } else if (/react|composant|jsx|props|hook|état|state/.test(`${course.technology} ${topic}`.toLocaleLowerCase("fr"))) {
    details =
      "Dans React, une interface se compose de composants qui reçoivent des propriétés et décrivent le rendu à partir de l'état. Gardez les composants focalisés, utilisez l'état pour les données qui évoluent et préférez dériver une valeur plutôt que de la dupliquer.";
    takeaways = ["Les props transmettent des données au composant.", "L'état déclenche un nouveau rendu lorsqu'il change.", "Les hooks s'utilisent au niveau supérieur d'un composant ou d'un hook personnalisé."];
    exercise = "Créez un petit composant avec une propriété, puis ajoutez une interaction dont l'état est visible dans l'interface.";
  } else if (/api|http|route|requête|endpoint|serveur|middleware/.test(topic)) {
    details =
      "Une API web expose des ressources à travers des routes et des méthodes HTTP. Une requête doit être validée avant traitement, et la réponse doit utiliser un statut approprié ainsi qu'une structure stable. Séparez le routage, la logique métier et l'accès aux données.";
    takeaways = ["GET lit une ressource ; POST en crée une.", "Validez les entrées à la frontière de l'API.", "Retournez des erreurs explicites sans exposer de détails internes."];
    exercise = "Décrivez un endpoint pour une ressource de cours : méthode, URL, données attendues, réponse de succès et erreurs possibles.";
  } else if (/type|générique|narrowing|typescript/.test(`${course.technology} ${topic}`.toLocaleLowerCase("fr"))) {
    details =
      "Le système de types décrit les formes de données que le programme accepte. Des types précis permettent de détecter des incohérences avant l'exécution. Préférez les unions discriminées et les gardes de type à des conversions forcées qui masquent les erreurs.";
    takeaways = ["Les types documentent les contrats du programme.", "Le narrowing réduit un type à partir d'une condition vérifiable.", "Les génériques conservent le lien entre les types d'entrée et de sortie."];
    exercise = "Définissez un type pour les états chargement, succès et erreur, puis rendez chaque état exhaustif dans un exemple.";
  } else if (/test|validation|formulaire|erreur/.test(topic)) {
    details =
      "Un test ou une validation vérifie le comportement attendu et rend les cas limites explicites. Distinguez les données valides des données incorrectes, affichez une erreur compréhensible et vérifiez le résultat observable par l'utilisateur.";
    takeaways = ["Testez les cas normaux et les entrées invalides.", "Un message d'erreur doit aider à corriger le problème.", "Un test fiable vérifie un résultat observable."];
    exercise = "Écrivez les cas de test pour une saisie vide, une valeur valide et une valeur hors limites.";
  } else if (/données|modèle|base de données|migration|orm|persistance/.test(topic)) {
    details =
      "La couche de données représente les informations durables de l'application. Les modèles expriment les propriétés et relations métier, tandis que les migrations permettent de faire évoluer le schéma de façon reproductible. Évitez de mélanger les règles métier et les détails de stockage.";
    takeaways = ["Définissez les entités et leurs relations.", "Les migrations versionnent le schéma.", "Validez les données avant de les enregistrer."];
    exercise = "Modélisez une ressource avec ses champs obligatoires, ses relations et les règles qui protègent sa création.";
  } else {
    details =
      `Cette leçon aborde « ${lessonTitle} » dans le module « ${moduleTitle} ». Reliez la notion à l'objectif du cours : ${course.description} Identifiez les entrées, le résultat attendu et les responsabilités de chaque étape avant de coder.`;
    takeaways = ["Comprenez le problème avant de choisir une API.", "Découpez la solution en étapes simples.", "Vérifiez le résultat avec un exemple concret."];
    exercise = `Réalisez un petit exemple autour de « ${lessonTitle} », puis expliquez ce que chaque étape apporte au projet.`;
  }

  return {
    introduction: `Dans cette leçon de ${course.technology ?? course.category}, vous allez étudier « ${lessonTitle} ». Elle s'inscrit dans le module « ${moduleTitle} » et prépare la mise en pratique des notions du cours.`,
    details,
    takeaways,
    exercise,
  };
}
