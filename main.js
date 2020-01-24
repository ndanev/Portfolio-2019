window.addEventListener("load", loadProjects);

function loadProjects() {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "./db.json", true);

    xhr.onload = function() {
        if (this.status == 200) {
            var projects = JSON.parse(this.responseText);

            var output = "";

            for (var i in projects) {
                output += `<div class="col-md-4">
                        <div class="project-card">
                            <a target="_blank" href="${projects[i].website}">
                                <img src="${projects[i].img}">
                            </a>

                            <a class="card-btn" target="_blank" href="${projects[i].website}">
                                ${projects[i].title}
                            </a>

                        </div>

                    </div>`;
            }
        }

        document.getElementById("project-cards").innerHTML = output;
    };

    xhr.send();
}

// // TYPE EFFECT //
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = "";
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type Speed
        let typeSpeed = 300;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === "") {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init On DOM Load
document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
    const txtElement = document.querySelector(".txt-type");
    const words = JSON.parse(txtElement.getAttribute("data-words"));
    const wait = txtElement.getAttribute("data-wait");
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}
