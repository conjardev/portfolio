const maxAmount = 15
var added = 0

function card(url, nameText, descriptionText) {
    // Create List Element
    let li = document.createElement("li")
    let link = document.createElement("a")
    link.href = url
    link.target = "_BLANK"
    link.ariaLabel = nameText

    let title = document.createElement("h3")
    title.innerHTML = nameText

    let description = document.createElement("h4")
    description.innerHTML = descriptionText

    li.appendChild(link)

    li.appendChild(title)
    li.appendChild(description)
    $("section.projects ul")[0].appendChild(li)
}

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "https://api.github.com/users/conjardev/repos",
        success: function(data){
            for (i=0;i<data.length;i++) {

                if (i > maxAmount) {
                    card(
                        "https://github.com/conjardev",
                        "More on my GitHub",
                        "Click here to go there"
                    )
                    break;
                }

                let repo = data[i]

                if (["conjardev","portfolio","auto-smartrevise"].includes(repo["name"])) {
                    continue;
                }

                card(repo["html_url"], repo["name"], repo["description"])
                added += 1
            }

            if ((data.length - added) > 0) {
                    card(
                        "https://github.com/conjardev",
                        "More on my GitHub",
                        "Click here to go there"
                    )
            }
        },
        error: function() {
            card(
                "https://github.com/conjardev",
                "Find on my GitHub",
                "Click here to go there"
            )

            console.warn("API request rate limited, showing limited results")

            $("section.projects ul")[0].style.display = "flex"
            $("section.projects ul")[0].style.width = "70%"
            $("section.projects ul")[0].style.minWidth = "max-content"
        }
    })
});