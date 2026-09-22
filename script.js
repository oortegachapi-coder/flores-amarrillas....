/* ============================================================
   FLORES AMARILLAS PARA CINDIA
   JAVASCRIPT PURO
   ============================================================ */


/* ============================================================
   ELEMENTOS PRINCIPALES
   ============================================================ */

const music = document.getElementById("backgroundMusic");

const startButton = document.getElementById("startButton");

const musicButton = document.getElementById("musicButton");

const restartButton =
    document.getElementById("restartButton");

const envelope =
    document.getElementById("envelope");

const letter =
    document.getElementById("letter");

const closeLetterButton =
    document.getElementById("closeLetterButton");

const finishLetterButton =
    document.getElementById("finishLetterButton");

const scenes =
    document.querySelectorAll(".scene");


/* ============================================================
   TEXTO SINCRONIZADO OPCIONAL
   ============================================================

   Puedes agregar aquí frases propias únicamente si tienes
   permiso para sincronizarlas con la canción.

   No se incluye la letra comercial.
   ============================================================ */

const timedText = [
    // { start: 12, end: 18, text: "Un mensaje propio aquí" }
];


/* ============================================================
   ESTADO
   ============================================================ */

let currentScene = "scene1";

let musicPlaying = false;

let petalsInterval = null;

let globalParticlesInterval = null;

let finalParticlesInterval = null;


/* ============================================================
   NAVEGACIÓN ENTRE ESCENAS
   ============================================================ */

function showScene(sceneId) {

    const target =
        document.getElementById(sceneId);

    if (!target) {
        return;
    }

    scenes.forEach(scene => {

        scene.classList.remove("active");

    });

    target.classList.add("active");

    currentScene = sceneId;

    updateSceneEffects(sceneId);

}


/* ============================================================
   EFECTOS SEGÚN ESCENA
   ============================================================ */

function updateSceneEffects(sceneId) {

    if (sceneId === "scene1") {

        startPetals();

    } else {

        stopPetals();

    }

    if (sceneId === "scene6") {

        startFinalParticles();

    } else {

        stopFinalParticles();

    }

}


/* ============================================================
   BOTONES "SIGUIENTE"
   ============================================================ */

const nextButtons =
    document.querySelectorAll(".next-button");

nextButtons.forEach(button => {

    button.addEventListener("click", () => {

        const nextScene =
            button.dataset.next;

        if (nextScene) {

            showScene(nextScene);

        }

    });

});


/* ============================================================
   MÚSICA
   ============================================================ */

function startMusic() {

    if (!music) {
        return;
    }

    /*
       El navegador permite esta reproducción porque esta
       función es llamada desde la interacción del usuario.
    */

    const promise =
        music.play();

    if (promise !== undefined) {

        promise
            .then(() => {

                musicPlaying = true;

                updateMusicButton();

            })
            .catch(() => {

                /*
                   Si el archivo no existe o el navegador
                   bloquea la reproducción, la página continúa
                   funcionando normalmente.
                */

                musicPlaying = false;

                updateMusicButton();

            });

    }

}


/* ============================================================
   PAUSAR / REANUDAR
   ============================================================ */

function toggleMusic() {

    if (!music) {
        return;
    }

    if (music.paused) {

        const promise =
            music.play();

        if (promise !== undefined) {

            promise
                .then(() => {

                    musicPlaying = true;

                    updateMusicButton();

                })
                .catch(() => {

                    musicPlaying = false;

                    updateMusicButton();

                });

        }

    } else {

        music.pause();

        musicPlaying = false;

        updateMusicButton();

    }

}


/* ============================================================
   BOTÓN DE MÚSICA
   ============================================================ */

function updateMusicButton() {

    if (!musicButton) {
        return;
    }

    if (musicPlaying) {

        musicButton.textContent = "♫";

        musicButton.classList.remove("paused");

        musicButton.setAttribute(
            "aria-label",
            "Pausar música"
        );

        musicButton.title =
            "Pausar música";

    } else {

        musicButton.textContent = "♪";

        musicButton.classList.add("paused");

        musicButton.setAttribute(
            "aria-label",
            "Reanudar música"
        );

        musicButton.title =
            "Reanudar música";

    }

}


/* ============================================================
   BOTÓN COMENZAR
   ============================================================ */

if (startButton) {

    startButton.addEventListener("click", () => {

        /*
           IMPORTANTE:
           El audio comienza solamente después de este clic.
        */

        startMusic();

        showScene("scene2");

        createBurst();

    });

}


/* ============================================================
   BOTÓN DE MÚSICA
   ============================================================ */

if (musicButton) {

    musicButton.addEventListener(
        "click",
        toggleMusic
    );

}


/* ============================================================
   PETALOS
   ============================================================ */

function createPetal() {

    const container =
        document.getElementById("coverPetals");

    if (!container) {
        return;
    }

    const petal =
        document.createElement("span");

    petal.className = "petal";

    const size =
        Math.random() * 10 + 8;

    const left =
        Math.random() * 100;

    const duration =
        Math.random() * 7 + 6;

    const delay =
        Math.random() * 1;

    petal.style.left =
        `${left}%`;

    petal.style.width =
        `${size}px`;

    petal.style.height =
        `${size * 1.45}px`;

    petal.style.animationDuration =
        `${duration}s`;

    petal.style.animationDelay =
        `${delay}s`;

    petal.style.opacity =
        `${Math.random() * .5 + .45}`;

    container.appendChild(petal);

    setTimeout(() => {

        petal.remove();

    }, (duration + delay) * 1000 + 1000);

}


function startPetals() {

    if (petalsInterval) {
        return;
    }

    for (let i = 0; i < 15; i++) {

        createPetal();

    }

    petalsInterval =
        setInterval(() => {

            createPetal();

        }, 600);

}


function stopPetals() {

    if (!petalsInterval) {
        return;
    }

    clearInterval(petalsInterval);

    petalsInterval = null;

}


/* ============================================================
   PARTÍCULAS GLOBALES
   ============================================================ */

function createGlobalParticle() {

    const container =
        document.getElementById(
            "globalParticles"
        );

    if (!container) {
        return;
    }

    const particle =
        document.createElement("span");

    particle.className =
        "global-particle";

    const symbols = [
        "✦",
        "✧",
        "♥",
        "·",
        "✦"
    ];

    particle.textContent =
        symbols[
            Math.floor(
                Math.random() * symbols.length
            )
        ];

    particle.style.left =
        `${Math.random() * 100}%`;

    particle.style.bottom =
        `-${Math.random() * 20 + 5}px`;

    particle.style.fontSize =
        `${Math.random() * 12 + 8}px`;

    particle.style.opacity =
        `${Math.random() * .35 + .2}`;

    particle.style.animationDuration =
        `${Math.random() * 10 + 8}s`;

    particle.style.color =
        Math.random() > .5
            ? "#fff1a0"
            : "#ffffff";

    container.appendChild(particle);

    setTimeout(() => {

        particle.remove();

    }, 20000);

}


function startGlobalParticles() {

    if (globalParticlesInterval) {
        return;
    }

    globalParticlesInterval =
        setInterval(
            createGlobalParticle,
            1300
        );

}


startGlobalParticles();


/* ============================================================
   EXPLOSIÓN DE PARTÍCULAS AL COMENZAR
   ============================================================ */

function createBurst() {

    const container =
        document.getElementById(
            "globalParticles"
        );

    if (!container) {
        return;
    }

    for (let i = 0; i < 25; i++) {

        const particle =
            document.createElement("span");

        particle.className =
            "global-particle";

        particle.textContent =
            Math.random() > .5
                ? "✦"
                : "♥";

        particle.style.left =
            `${50 + (Math.random() * 20 - 10)}%`;

        particle.style.bottom =
            `${40 + (Math.random() * 20 - 10)}%`;

        particle.style.fontSize =
            `${Math.random() * 15 + 10}px`;

        particle.style.animationDuration =
            `${Math.random() * 2 + 2}s`;

        container.appendChild(particle);

        setTimeout(() => {

            particle.remove();

        }, 4500);

    }

}


/* ============================================================
   CARTA / SOBRE
   ============================================================ */

function openLetter() {

    if (!envelope || !letter) {
        return;
    }

    envelope.classList.add("open");

    setTimeout(() => {

        letter.classList.add("show");

        letter.setAttribute(
            "aria-hidden",
            "false"
        );

    }, 550);

}


function closeLetter() {

    if (!envelope || !letter) {
        return;
    }

    letter.classList.remove("show");

    letter.setAttribute(
        "aria-hidden",
        "true"
    );

    setTimeout(() => {

        envelope.classList.remove("open");

    }, 400);

}


if (envelope) {

    envelope.addEventListener(
        "click",
        openLetter
    );

    envelope.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                openLetter();

            }

        }
    );

}


if (closeLetterButton) {

    closeLetterButton.addEventListener(
        "click",
        closeLetter
    );

}


/* ============================================================
   CONTINUAR DESDE LA CARTA
   ============================================================ */

if (finishLetterButton) {

    finishLetterButton.addEventListener(
        "click",
        () => {

            closeLetter();

            setTimeout(() => {

                showScene("scene6");

            }, 500);

        }
    );

}


/* ============================================================
   ESCENA FINAL
   ============================================================ */

function createFinalParticle() {

    const container =
        document.getElementById(
            "finalParticles"
        );

    if (!container) {
        return;
    }

    const particle =
        document.createElement("span");

    particle.textContent =
        Math.random() > .3
            ? "🌻"
            : "♥";

    particle.style.position =
        "absolute";

    particle.style.left =
        `${Math.random() * 100}%`;

    particle.style.top =
        `${Math.random() * 100}%`;

    particle.style.fontSize =
        `${Math.random() * 13 + 8}px`;

    particle.style.opacity =
        `${Math.random() * .5 + .25}`;

    particle.style.animation =
        `floatAround ${Math.random() * 5 + 5}s ease-in-out infinite`;

    container.appendChild(particle);

    setTimeout(() => {

        particle.remove();

    }, 12000);

}


function startFinalParticles() {

    if (finalParticlesInterval) {
        return;
    }

    for (let i = 0; i < 15; i++) {

        createFinalParticle();

    }

    finalParticlesInterval =
        setInterval(
            createFinalParticle,
            800
        );

}


function stopFinalParticles() {

    if (!finalParticlesInterval) {
        return;
    }

    clearInterval(
        finalParticlesInterval
    );

    finalParticlesInterval = null;

}


/* ============================================================
   BOTÓN VOLVER A VER
   ============================================================ */

if (restartButton) {

    restartButton.addEventListener(
        "click",
        () => {

            /*
               No reiniciamos el audio.
               La música continúa desde donde estaba.
            */

            showScene("scene1");

        }
    );

}


/* ============================================================
   TEXTO SINCRONIZADO
   ============================================================

   Está preparado para frases propias.
   No contiene letras de canciones.
   ============================================================ */

function updateTimedText() {

    if (!music) {
        return;
    }

    if (!timedText.length) {
        return;
    }

    const currentTime =
        music.currentTime;

    const current =
        timedText.find(item =>
            currentTime >= item.start &&
            currentTime <= item.end
        );

    /*
       Si posteriormente quieres mostrar textos
       sincronizados, puedes conectar "current"
       a un elemento visual.
    */

}


/* ============================================================
   ACTUALIZACIÓN DEL TEXTO SINCRONIZADO
   ============================================================ */

if (music) {

    music.addEventListener(
        "timeupdate",
        updateTimedText
    );

}


/* ============================================================
   MANEJO SILENCIOSO DEL AUDIO
   ============================================================ */

if (music) {

    music.addEventListener(
        "error",
        () => {

            /*
               No mostramos errores al visitante.
               La experiencia visual continúa.
            */

            musicPlaying = false;

            updateMusicButton();

        }
    );

}


/* ============================================================
   INICIALIZACIÓN
   ============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        showScene("scene1");

        updateMusicButton();

        startGlobalParticles();

    }
);


/* ============================================================
   PREVENIR DOBLE TAP ACCIDENTAL
   ============================================================ */

let lastTouchTime = 0;

document.addEventListener(
    "touchend",
    event => {

        const now =
            Date.now();

        if (
            now - lastTouchTime < 300
        ) {

            event.preventDefault();

        }

        lastTouchTime = now;

    },
    {
        passive: false
    }
);


/* ============================================================
   FIN
   ============================================================ */
