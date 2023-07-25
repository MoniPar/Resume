// display user data on screen
function userInformationHTML(user) {  // user is the object returned from GitHub API
    return `
    <h2>${user.name}
        <span class="small-name">
            (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
        </span>
    </h2>
    <div class="gh-content">
        <div class="gh-avatar">
            <a href="${user.html_url} target="_blank">
                <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
            </a>
        </div>
        <p>Followers: ${user.followers} - Following: ${user.following} <br> Repos: ${user.public_repos}</p>
    </div>`;
}

// display repo data on screen
function repoInformationHTML(repos) {  // repos object returned as an array from GitHub API
    // check if repo is empty
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No repos!</div>`;
    }
    // iterate through array and return repo link and name
    var listItemsHTML = repos.map(function(repo) {
        return `<li>
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        </li>`;
    });

    // use the join method on the array returned and add a new line
    return `<div class="clearfix repo-list">
        <p><strong>Repo List:</strong></p>
        <ul>${listItemsHTML.join("\n")}</ul>
    </div>`
}

function fetchGitHubInformation(event) {
    // clear displayed data when text box is empty
    $("#gh-user-data").html("");
    $("#gh-repo-data").html("");

    // create a variable to hold the username typed in the text field
    var username = $("#gh-username").val();
    // add placeholder text to the text field
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return;
    }
    // add loader if text has been inputted in the field
    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/images/loader.gif" alt="loading..." />
        </div>`
    );

    $.when(
        // we get a response from the GitHub API
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then (
        // display it in the gh-user-data div
        function(firstResponse, secondResponse) {
            var userData = firstResponse[0];
            var repoData = secondResponse[0];
            // select the gh-user-data div and set the HTML to the results of the userInformationHTML func
            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(repoInformationHTML(repoData)); 
        }, function(errorResponse) {  // func for if the prev doesn't work out
            if (errorResponse.status === 404) {
                // select div and set HTML to an error message
                $("#gh-user-data").html(`<h2>No info found for user ${username}</h2>`);
            } else {
                // if not a 404 error
                console.log(errorResponse);
                // set div to the JSON response we got back
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`
                );
            }
        }
    )
}

// execute the fetchGitHubInformation function when the DOM is fully loaded
$(document).ready(fetchGitHubInformation);