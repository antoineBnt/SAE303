// ---------------------------SCROLL HORIZONTAL--------------------------
gsap.registerPlugin(ScrollTrigger);

const horizontalScrollContainer = document.querySelector(".horizontal-scroll");
const sections = document.querySelectorAll(".section");

const totalScrollWidth =
  horizontalScrollContainer.scrollWidth - window.innerWidth;

gsap.to(horizontalScrollContainer, {
  x: () => -totalScrollWidth,
  ease: "power0.inOut",
  scrollTrigger: {
    trigger: horizontalScrollContainer,
    pin: true,
    scrub: 1,
    // snap: 1 / (sections.length - 1), pour faire un effet pour les handicapé
    end: () => "+=" + totalScrollWidth,
  },
});

//--------------------RELOAD LA SIZE----------------------
window.addEventListener("resize", function () {
  localStorage.setItem(
    "scrollPosition",
    window.scrollY || document.documentElement.scrollTop
  );
  window.location.reload();
});

window.addEventListener("load", function () {
  const savedScrollPosition = localStorage.getItem("scrollPosition");
  if (savedScrollPosition) {
    window.scrollTo(0, parseInt(savedScrollPosition));
    localStorage.removeItem("scrollPosition");
  }
});
// -----------------------Scroll opacite srolable page accueil---------------------

var scrollIndicator = document.getElementById("scrollIndicator");

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    scrollIndicator.style.opacity = "0";
  } else {
    scrollIndicator.style.opacity = "1";
  }
});

scrollIndicator.style.transition = "opacity 0.2s ease-in-out";

// ---------------ANIMATION PARALLAX----------------

document.addEventListener("scroll", function () {
  let parallaxElements = document.querySelectorAll(".parallax");
  let width = window.innerWidth || document.documentElement.clientWidth;
  let threshold = width * 0.25;

  parallaxElements.forEach((element) => {
    let rect = element.getBoundingClientRect();

    if (rect.right >= threshold && rect.left <= width - threshold) {
      element.classList.add("parallax-active");
    } else {
      element.classList.remove("parallax-active");
    }
  });
});

//------------------STOCKE L'INFORMATION DE LA POUR SAVOIR LE TMEPS PASSÉ SUR UN APPAREIL CONNECTÉ-----------

document.addEventListener("DOMContentLoaded", () => {
  const valeurs = {
    btn1: "Plus de trois ans",
    btn2: "Tous les trois ans",
    btn3: "Tous les deux ans",
    btn4: "Chaque année",
    btn5: "plusieurs fois par années",
  };

  let valeurSelectionnee;

  function handleButtonClick(event) {
    const boutonId = event.target.id;
    valeurSelectionnee = valeurs[boutonId];
    saveAnswers("q1", valeurSelectionnee);
    console.log(`Valeur stockée: ${valeurSelectionnee}`);
  }

  Object.keys(valeurs).forEach((boutonId) => {
    const bouton = document.getElementById(boutonId);
    bouton.addEventListener("click", handleButtonClick);
  });
});

//-----------------JAUGE POUR STOCKER UN NOMBRE-----------

document.addEventListener("DOMContentLoaded", () => {
  const handle = document.querySelector(".handle");
  const bar = document.querySelector(".bar");

  let valeurSelectionnee;

  Draggable.create(handle, {
    type: "x",
    bounds: bar,
    onDrag: function () {
      const maxVal = bar.offsetWidth;
      valeurSelectionnee = Math.round((this.x / maxVal) * 10);
      saveAnswers("q2", valeurSelectionnee);
      console.log(`Valeur stockée: ${valeurSelectionnee}`);
    },
  });
});

//-----------------COMBIEN APPAREIL-------------

document.addEventListener("DOMContentLoaded", () => {
  const pion = document.querySelector(".appareil__pion");
  const cases = document.querySelectorAll(".appareil__li-top");
  let valeurSelectionnee;

  Draggable.create(pion, {
    onDragEnd: function () {
      let matched = false;
      cases.forEach((caseElement) => {
        if (this.hitTest(caseElement, "50%")) {
          matched = true;
          const subtitle = caseElement
            .querySelector(".appareil__subtitle")
            .textContent.trim();
          valeurSelectionnee = subtitle;
          saveAnswers("q4", valeurSelectionnee);
          console.log(`Valeur sélectionnée: ${valeurSelectionnee}`);

          gsap.to(".appareil__li-top", {
            scale: 1,
            duration: 0.3,
            opacity: 1,
            ease: "power1.inOut",
          });

          gsap.to(caseElement, {
            scale: 1.1,
            duration: 0.3,
            opacity: 0.5,
            ease: "power1.inOut",
          });

          gsap.set(pion, {
            x:
              caseElement.getBoundingClientRect().left +
              window.scrollX -
              pion.getBoundingClientRect().left +
              (caseElement.offsetWidth - pion.offsetWidth) / 2,
            y:
              caseElement.getBoundingClientRect().top +
              window.scrollY -
              pion.getBoundingClientRect().top +
              (caseElement.offsetHeight - pion.offsetHeight) / 2,
          });
        }
      });

      if (!matched) {
        gsap.to(pion, { x: 0, y: 0, duration: 0.3 });
      }
    },
    bounds: ".appareil",
    inertia: true,
  });
});

// ---------------------COMMENT PROCURER APPAREIL------------

document.addEventListener("DOMContentLoaded", () => {
  const pion = document.querySelector(".procurate__pion");
  const cases = document.querySelectorAll(".procurate__svg");
  let valeurSelectionnee;

  Draggable.create(pion, {
    onDragEnd: function () {
      let matched = false;
      cases.forEach((caseElement) => {
        if (this.hitTest(caseElement, "50%")) {
          matched = true;

          valeurSelectionnee = caseElement.getAttribute("data-info").trim();
          saveAnswers("q6", valeurSelectionnee);
          console.log(`Valeur sélectionnée: ${valeurSelectionnee}`);

          gsap.to(".procurate__svg", {
            scale: 1,
            duration: 0.3,
            opacity: 1,
            ease: "power1.inOut",
          });

          gsap.to(caseElement, {
            scale: 0.8,
            duration: 0.3,
            opacity: 0.7,
            ease: "power1.inOut",
          });

          gsap.set(pion, {
            x:
              caseElement.getBoundingClientRect().left +
              window.scrollX -
              pion.getBoundingClientRect().left +
              (caseElement.offsetWidth - pion.offsetWidth) / 2,
            y:
              caseElement.getBoundingClientRect().top +
              window.scrollY -
              pion.getBoundingClientRect().top +
              (caseElement.offsetHeight - pion.offsetHeight) / 2,
          });
        }
      });

      if (!matched) {
        gsap.to(pion, { x: 0, y: 0, duration: 0.3 });
      }
    },
    bounds: ".procurate",
    inertia: true,
  });
});

// ---------------------QUE FAIRE JETER APPAREIL------------

document.addEventListener("DOMContentLoaded", () => {
  const pion = document.querySelector(".general__pion");
  const cases = document.querySelectorAll(".general__svg");
  let valeurSelectionnee;

  Draggable.create(pion, {
    onDragEnd: function () {
      let matched = false;
      cases.forEach((caseElement) => {
        if (this.hitTest(caseElement, "50%")) {
          matched = true;

          valeurSelectionnee = caseElement.getAttribute("data-info").trim();
          saveAnswers("q5", valeurSelectionnee);
          console.log(`Valeur sélectionnée: ${valeurSelectionnee}`);

          gsap.to(".general__svg", {
            scale: 1,
            duration: 0.3,
            opacity: 1,
            ease: "power1.inOut",
          });

          gsap.to(caseElement, {
            scale: 0.8,
            duration: 0.3,
            opacity: 0.7,
            ease: "power1.inOut",
          });

          gsap.set(pion, {
            x:
              caseElement.getBoundingClientRect().left +
              window.scrollX -
              pion.getBoundingClientRect().left +
              (caseElement.offsetWidth - pion.offsetWidth) / 2,
            y:
              caseElement.getBoundingClientRect().top +
              window.scrollY -
              pion.getBoundingClientRect().top +
              (caseElement.offsetHeight - pion.offsetHeight) / 2,
          });
        }
      });

      if (!matched) {
        gsap.to(pion, { x: 0, y: 0, duration: 0.3 });
      }
    },
    bounds: ".general",
    inertia: true,
  });
});

// ---------------------FREQUENCE OBJET CONNECTÉ------------

document.addEventListener("DOMContentLoaded", () => {
  const pion = document.querySelector(".function__pion");
  const cases = document.querySelectorAll(".function__li-top");
  let valeurSelectionnee;

  Draggable.create(pion, {
    onDragEnd: function () {
      let matched = false;
      cases.forEach((caseElement) => {
        if (this.hitTest(caseElement, "50%")) {
          matched = true;
          const subtitle = caseElement
            .querySelector(".function__subtitle")
            .textContent.trim();
          valeurSelectionnee = subtitle;
          saveAnswers("q3", valeurSelectionnee);
          console.log(`Valeur sélectionnée: ${valeurSelectionnee}`);

          gsap.to(".function__li-top", {
            scale: 1,
            duration: 0.3,
            opacity: 1,
            ease: "power1.inOut",
          });

          gsap.to(caseElement, {
            scale: 1.1,
            duration: 0.3,
            opacity: 0.5,
            ease: "power1.inOut",
          });

          gsap.set(pion, {
            x:
              caseElement.getBoundingClientRect().left +
              window.scrollX -
              pion.getBoundingClientRect().left +
              (caseElement.offsetWidth - pion.offsetWidth) / 2,
            y:
              caseElement.getBoundingClientRect().top +
              window.scrollY -
              pion.getBoundingClientRect().top +
              (caseElement.offsetHeight - pion.offsetHeight) / 2,
          });
        }
      });

      if (!matched) {
        gsap.to(pion, { x: 0, y: 0, duration: 0.3 });
      }
    },
    bounds: ".function",
    inertia: true,
  });
});

//----------------------------BTN ACTIVE LI SEC4-------------------

const listItems = document.querySelectorAll(".frequence__li");
function removeActiveClass() {
  listItems.forEach((li) => {
    li.classList.remove("active");
  });
}

listItems.forEach((li) => {
  li.addEventListener("click", function () {
    removeActiveClass();

    this.classList.add("active");
  });
});

//----------------LOTTIE ANIMATION CONTROL AVEC INTERSECTION OBSERVER----------------

document.addEventListener("DOMContentLoaded", function () {
  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      const lottieElement = entry.target;
      if (entry.isIntersecting) {
        lottieElement.play();
      } else {
        lottieElement.stop();
      }
    });
  };

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver(observerCallback, options);

  const lottieElements = document.querySelectorAll("lottie-player");
  lottieElements.forEach((element) => {
    observer.observe(element);
  });
});

//----------------TABLEAU D'INFORMATION POUR LES DONNÉES A METTRE DANS LES ORDINATEURS----------

document.addEventListener("DOMContentLoaded", () => {
  const texts = [
    "180 millions de recherches Google par heure.", //barre de nav
    "Ventes de smartphone en milliards : 0.12 en 2007, 0.97 en 2013, 1.56 en 2018",
    "Un appareil numérique utilise jusqu’à 350 fois son poids en matières premières.",
    "Ressources utilisées dans l’industrie du numérique par an : 62,5 millions de tonnes (soit 10 pyramides de Khéops)",
    "Impact environnemental pendant la fabrication : 80%",
    "La fabrication d'un smartphone nécessite 12 760 L d’eau.",
    "Un Français regarde un écran 32h/semaine. 31% de la population ressent une sensation de manque dès les premières heures sans numériques.",
    "Le numérique représente 10% de la consommation électrique.",
    "34 millions de mails sont envoyés toutes les heures. Envoyer 20 mails par jour pendant un an pollue autant que parcourir 1000 km en voiture.",
    "Ont le plus gros impact environnemental.",
    "20 millions de tonnes de déchets numériques par an. (soit 300 kg par habitant)",
    "Le marché de la mode d'occasion en France est passé de 1 milliard d'euros en 2018 à plus de 6 milliards d'euros en 2022.",
    "En France, une personne sur quatre (42 %) a déjà acheté un produit reconditionné.",
    "59 % des consommateurs français sont prêts à se tourner vers le reconditionné.",
  ];

  const typeText = (element, text) => {
    let i = 0;
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, 100);
      }
    }
    type();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const index = parseInt(id.replace("text", "")) - 1;
          typeText(entry.target, texts[index]);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".info-text").forEach((element) => {
    observer.observe(element);
  });
});

//-------------------BILAN----------

const answers = {
  q1: {
    r1: { id: "r1", reponse: "Tous les deux ans", coef: 6, giveAdvice: "yes" },
    r2: { id: "r2", reponse: "Tous les trois ans", coef: 15, giveAdvice: "no" },
    r3: { id: "r3", reponse: "Plus de trois ans", coef: 17, giveAdvice: "no" },
    r4: { id: "r4", reponse: "Chaque année", coef: 3, giveAdvice: "yes" },
    r5: {
      id: "r5",
      reponse: "plusieurs fois par années",
      coef: 1,
      giveAdvice: "yes",
    },
    conseil1:
      "Utiliser des coques de protection : Les coques de protection peuvent aider à protéger votre smartphone des chocs et des rayures, prolongeant ainsi sa durée de vie en évitant les dommages physiques.",
    conseil2:
      "Installer des mises à jour logicielles : Les mises à jour logicielles fournies par le fabricant peuvent améliorer la performance et la sécurité de votre smartphone. Assurez-vous de les installer régulièrement.",
    conseil3:
      "Gérer l'espace de stockage : Surveillez l'espace de stockage disponible sur votre téléphone. Libérez de l'espace en supprimant des applications inutilisées, des photos ou des vidéos dont vous n'avez plus besoin.",
  },
  q2: {
    r1: { id: "r1", reponse: 0, coef: 17, giveAdvice: "no" },
    r2: { id: "r2", reponse: 1, coef: 16, giveAdvice: "no" },
    r3: { id: "r3", reponse: 2, coef: 15, giveAdvice: "no" },
    r4: { id: "r4", reponse: 3, coef: 11, giveAdvice: "no" },
    r5: { id: "r5", reponse: 4, coef: 8, giveAdvice: "yes" },
    r6: { id: "r6", reponse: 5, coef: 6, giveAdvice: "yes" },
    r7: { id: "r7", reponse: 6, coef: 4, giveAdvice: "yes" },
    r8: { id: "r8", reponse: 7, coef: 2, giveAdvice: "yes" },
    r9: { id: "r9", reponse: 8, coef: 1, giveAdvice: "yes" },
    r10: { id: "r10", reponse: 9, coef: 1, giveAdvice: "yes" },
    r11: { id: "r11", reponse: 10, coef: 0.5, giveAdvice: "yes" },
    r12: { id: "r12", reponse: 11, coef: 0.5, giveAdvice: "yes" },
    conseil1:
      "Éteindre les appareils inutilisés : Lorsque vous n'utilisez pas un appareil connecté, assurez-vous de l'éteindre complètement. De nombreux appareils continuent de consommer de l'énergie même en mode veille.",
    conseil2:
      "Optimiser les paramètres de gestion de l'énergie : Configurez les paramètres d'économie d'énergie sur vos appareils pour réduire leur consommation d'énergie lorsqu'ils sont en veille.",
    conseil3:
      "Utiliser des prises programmables ou des bandelettes d'alimentation intelligentes : Branchez vos appareils sur des prises programmables ou des bandelettes d'alimentation intelligentes pour faciliter l'extinction simultanée de plusieurs appareils lorsque vous ne les utilisez pas.",
  },
  q3: {
    r1: { id: "r1", reponse: "Jamais", coef: 16, giveAdvice: "no" },
    r2: { id: "r2", reponse: "Rarement", coef: 14, giveAdvice: "no" },
    r3: { id: "r3", reponse: "Parfois", coef: 12, giveAdvice: "no" },
    r4: { id: "r4", reponse: "Régulierement", coef: 10, giveAdvice: "no" },
    r5: { id: "r5", reponse: "Souvent", coef: 8, giveAdvice: "no" },
  },
  q4: {
    r1: {
      id: "r1",
      reponse: "Je n'en utilise pas",
      coef: 16,
      giveAdvice: "no",
    },
    r2: {
      id: "r2",
      reponse: "Cadre professionnel",
      coef: 14,
      giveAdvice: "no",
    },
    r3: { id: "r3", reponse: "Divertissement", coef: 3, giveAdvice: "no" },
    //maj quotidien
    r4: {
      id: "r4",
      reponse: "Pour mon quotidien",
      coef: 9,
      giveAdvice: "no",
    },
    r5: { id: "r5", reponse: "Autre", coef: 5, giveAdvice: "no" },
  },
  q5: {
    r1: {
      id: "r1",
      reponse: "Je les vends d’occasion",
      coef: 15,
      giveAdvice: "no",
    },
    r2: { id: "r2", reponse: "Je les donnes", coef: 12, giveAdvice: "no" },
    r3: { id: "r3", reponse: "Je les jettes", coef: 1, giveAdvice: "yes" },
    r4: {
      id: "r4",
      reponse: "Je les vends a des services de reconditionnements",
      coef: 17,
      giveAdvice: "no",
    },
    r5: {
      id: "r5",
      reponse: "Aucune des propositions",
      coef: 4,
      giveAdvice: "no",
    },
    conseil1:
      "Recyclage électronique : La plupart des municipalités proposent des programmes de recyclage électronique. Recherchez un centre de recyclage électronique local où vous pouvez déposer votre appareil hors d'usage. Assurez-vous que le centre de recyclage est certifié et suit des pratiques respectueuses de l'environnement.",
    conseil2:
      "Programmes de reprise du fabricant : Certains fabricants et détaillants proposent des programmes de reprise ou de recyclage. Renseignez-vous auprès du fabricant de votre appareil pour savoir s'il propose un programme de recyclage ou de reprise.",
    conseil3:
      "Donner ou vendre pour les pièces : Si certaines parties de votre appareil sont encore en bon état, vous pourriez le donner ou le vendre pour les pièces détachées. Des personnes intéressées par la réparation d'appareils pourraient être intéressées par les composants encore fonctionnels.",
  },
  q6: {
    r1: {
      id: "r1",
      reponse: "Je récupère ceux que l’on me donne",
      coef: 17,
      giveAdvice: "no",
    },
    r2: {
      id: "r2",
      reponse: "Je choisis des produits reconditionnés",
      coef: 16,
      giveAdvice: "no",
    },
    r3: {
      id: "r3",
      reponse: "J’achete mes produits neufs en magasins ou via des sites web",
      coef: 5,
      giveAdvice: "yes",
    },
    r4: {
      id: "r4",
      reponse: "Aucune des ses façons",
      coef: 8,
      giveAdvice: "no",
    },
    conseil1:
      "Faire des recherches approfondies : Avant d'acheter un appareil reconditionné, faites des recherches sur la marque, le modèle et le vendeur. Lisez des avis et des témoignages pour avoir une idée de la qualité du produit et du service client.",
    conseil2:
      "Vérifier la garantie : Assurez-vous que l'appareil reconditionné est livré avec une garantie. La garantie est un indicateur de la confiance du vendeur dans la qualité du produit. Optez pour des garanties plus longues lorsque c'est possible.",
    conseil3:
      "Acheter auprès de vendeurs réputés : Choisissez des vendeurs reconnus pour leur sérieux dans la vente d'appareils reconditionnés. Optez pour des entreprises spécialisées dans le reconditionnement qui ont une bonne réputation.",
  },
};

// Réponses données par l'utilisateur
let userAnswers = {
  q1: "",
  q2: "",
  q3: "",
  q4: "",
  q5: "",
  q6: "",
};

// Fonction qui sauvegarde les réponses de l'utilisateurs dans "userAnswers"
let saveAnswers = function (nbQ, rep) {
  for (let i in answers[nbQ]) {
    if (rep == answers[nbQ][i].reponse) {
      userAnswers[nbQ] = answers[nbQ][i].id;
    }
  }
  console.log(userAnswers);
  print();
};

// Fonction qui renvoie le score de l'internaute
let getScore = function () {
  let score = 0;
  for (let i in userAnswers) {
    score = score + answers[i][userAnswers[i]].coef;
  }
  return score;
};

// Fonction qui renvoie des conseils à l'internaute en fonction de ces réponses
let getAdvice = function () {
  let advices = [];
  for (let element in userAnswers) {
    if (answers[element][userAnswers[element]].giveAdvice == "yes") {
      let nb = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
      advices.push(answers[element]["conseil" + nb]);
    }
  }
  if (advices.length === 0) {
    advices.push("Je n'ai pas de conseil à te donner. Continu comme ça !");
  }
  return advices;
};

// Fonction qui renvoie le score, l'appréciation et les conseils
let returnScore = function () {
  let score = getScore();
  let advice = getAdvice();
  let appreciation = "";
  let result = [];

  if (score > 25) {
    if (score > 50) {
      if (score > 75) {
        appreciation = "Excellent, ne change rien !";
      } else {
        appreciation = "Sur la bonne voie...";
      }
    } else {
      appreciation = "Peux mieux faire...";
    }
  } else {
    appreciation = "Rien ne va ! ";
  }

  result.push(score);
  result.push(appreciation);
  result.push(advice);

  return result;
};

// Fonction qui affiche les info dans le html
let print = function () {
  let permission = true;
  for (let element in userAnswers) {
    if (userAnswers[element] == "") {
      permission = false;
    }
  }
  if (permission == true) {
    let data = returnScore();
    let template = document.querySelector(".template");
    let html = template.innerHTML;

    let conseils = "";
    for (let element in data[2]) {
      conseils += data[2][element] + "<br><br>";
    }

    html = html.replace("{{score}}", data[0]);
    html = html.replace("{{appreciation}}", data[1]);
    html = html.replace("{{conseil}}", conseils);

    document.querySelector(".Bilan").innerHTML = html;
  }
};

saveAnswers("q2", 0);

//---------------------METTRE DES IMAGES ALEATOIREMENT-------

const images = [
  "images/tech-1.svg",
  "images/tech-2.svg",
  "images/tech-3.svg",
  "images/tech-4.svg",
  "images/tech-5.svg",
];

function distribuerImages() {
  const containers = document.querySelectorAll(".SVG__TECH");
  const nombreImagesParConteneur = 10;

  containers.forEach((container) => {
    const grilleSize = Math.floor(
      container.clientWidth / nombreImagesParConteneur
    );

    for (let i = 0; i < nombreImagesParConteneur; i++) {
      const src = images[i % images.length];

      const img = document.createElement("img");
      img.src = src;
      img.style.width = "6rem";
      img.style.position = "absolute";
      img.style.zIndex = 1;
      img.style.opacity = 0.2;
      container.style.position = "relative";

      const posX = i * grilleSize + (grilleSize - img.width);
      const posY = container.clientHeight - img.height;

      img.style.left = `${posX}px`;
      img.style.top = `${posY}px`;

      container.appendChild(img);
    }
  });
}

window.onload = distribuerImages;

//-------------------------------LOADER

window.onload = function () {
  var loader = document.querySelector(".loader");
  var section1 = document.querySelector("#section1");

  setTimeout(function () {
    loader.style.display = "none";
    section1.classList.remove("no-scroll");
  }, 6000); // 4 secondes
};

document.addEventListener("DOMContentLoaded", function () {
  var section1 = document.querySelector("#section1");
  section1.classList.add("no-scroll");
});
