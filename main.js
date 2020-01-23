window.addEventListener("load", loadProjects);

function loadProjects() {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "./db.json", true);

    xhr.onload = function() {
        if (this.status == 200) {
            var projects = JSON.parse(this.responseText);

            console.log(projects);

            var output = "";

            for (var i in projects) {
                output +=
                    '<div class="col-md-4">' +
                    '<div class="project-card">' +
                    '<a target="_blank" href=" ' +
                    projects[i].website +
                    ' ">' +
                    '<img src="' +
                    projects[i].img +
                    '">' +
                    "</a>" +
                    "<a target='_blank' class='card-btn' href=" +
                    projects[i].website +
                    ">" +
                    projects[i].title +
                    "</a>" +
                    "</div>" +
                    "</div>";
            }
        }

        document.getElementById("project-cards").innerHTML = output;
    };

    xhr.send();
}
