
document.addEventListener("DOMContentLoaded", function(event) {
    fetch("https://blog.mikesir87.io/posts.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            renderList("#post-list", data.posts);
            renderList("#talk-list", data.talks);
        });
  });

function renderList(listSelector, data) {
    var node = document.querySelector(listSelector);
    var list = document.createElement("ul");
    for (let i = 0; i < Math.min(5, data.length); i++) {
        var listItem = document.createElement("li");

        var link = document.createElement("a");
        link.href = "https://blog.mikesir87.io" + data[i].href;
        var linkTextNode = document.createTextNode(data[i].title);
        link.appendChild(linkTextNode);
        listItem.appendChild(link);

        var metadata = document.createElement("span");
        metadata.classList.add("metadata");
        var date = new Date(data[i].date * 1000);
        var infoText = document.createTextNode(" - " + 
            (data[i].location ? data[i].location + " - " : "") +
            date.toLocaleDateString({ month: "short", day: "numeric", year: "numeric" }));
        metadata.appendChild(infoText);
        listItem.appendChild(metadata);

        list.appendChild(listItem);
    }

    node.innerHTML = '';
    node.appendChild(list);
}