

const newtonFacts = [

    {
        title: "The Famous Apple",
        text: "Newton is associated with the famous story of an apple falling from a tree and inspiring questions about gravity. The exact details of the story have been embellished over time."
    },

    {
        title: "Universal Gravitation",
        text: "Newton proposed that every object with mass attracts other objects with mass. His law of universal gravitation helped explain both objects falling on Earth and the motion of celestial bodies."
    },

    {
        title: "Three Laws of Motion",
        text: "Newton's three laws describe important relationships between force, motion, and mass. They became fundamental principles of classical mechanics."
    },

    {
        title: "The Study of Light",
        text: "Newton performed experiments with prisms and showed that white light can be separated into a spectrum of colors."
    },

    {
        title: "Mathematics",
        text: "Newton developed methods of calculus during the same period that Gottfried Wilhelm Leibniz was independently developing his own version of calculus."
    },

    {
        title: "The Principia",
        text: "In 1687, Newton published Principia Mathematica, a landmark work containing his laws of motion and theory of universal gravitation."
    },

    {
        title: "A Different Kind of Telescope",
        text: "Newton built a reflecting telescope that used a mirror instead of relying only on lenses. This design helped address problems found in contemporary refracting telescopes."
    },

    {
        title: "A Remarkable Legacy",
        text: "Newton's ideas became some of the foundations of classical physics and influenced scientific thinking for centuries."
    }

];


function showNewtonFact(index) {

    const title =
        document.getElementById("newtonFactTitle");

    const text =
        document.getElementById("newtonFactText");

    title.style.opacity = "0";
    text.style.opacity = "0";


    setTimeout(() => {

        title.textContent =
            newtonFacts[index].title;

        text.textContent =
            newtonFacts[index].text;

        title.style.opacity = "1";
        text.style.opacity = "1";

    }, 200);

}


function randomNewtonFact() {

    const randomIndex =
        Math.floor(
            Math.random() *
            newtonFacts.length
        );

    showNewtonFact(randomIndex);

}


const newtonSection =
    document.querySelector(".newton-section");

if (newtonSection) {

    newtonSection.addEventListener(
        "mousemove",
        function(event) {

            const rect =
                newtonSection.getBoundingClientRect();

            const x =
                (event.clientX - rect.left)
                / rect.width - .5;

            const y =
                (event.clientY - rect.top)
                / rect.height - .5;


            const cards =
                document.querySelectorAll(
                    ".newton-card"
                );


            cards.forEach((card, index) => {

                const movement =
                    (index + 1) * 2;

                card.style.transform =
                    `translate(
                        ${x * movement}px,
                        ${y * movement}px
                    )`;

            });

        }
    );


    newtonSection.addEventListener(
        "mouseleave",
        function() {

            document
                .querySelectorAll(".newton-card")
                .forEach(card => {

                    card.style.transform =
                        "";

                });

        }
    );

}

