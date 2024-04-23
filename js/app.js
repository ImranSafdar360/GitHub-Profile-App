const APIURL = "https://api.github.com/users/";
const main = document.querySelector("#main");
const searchBox = document.querySelector("#search");
const getUser = async (username) => {
  const response = await fetch(APIURL + username);
  const data = await response.json();
  console.log(data);
  const card = `
    <div id="card">
            <div>
                <img id= "avatar" src="${data.avatar_url}">
            </div>
            <div id="user_info">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>
                <ul id="info">
                    <li>${data.followers}<strong>Followers</strong></li>
                    <li>${data.following}<strong>Following</strong></li>
                    <li>${data.public_repos}<strong>Repos</strong></li>
                </ul>
                <div id="repos">
                    
                </div>
            </div>
        </div>
    `;
  main.innerHTML = card;
  getRepos(username);
};
getUser("taylorotwell");

const getRepos = async (username) => {
  const repos = document.querySelector("#repos");
  const response = await fetch(APIURL + username + "/repos");
  const data = await response.json();
  data.forEach((item) => {
    const elem = document.createElement("a");
    elem.classList.add("repo");
    elem.href = item.html_url;
    elem.innerText = item.name;
    elem.target = "_blank";
    repos.appendChild(elem);
  });
};

const formSubmit = () => {
  if (searchBox.value != "") {
    getUser(searchBox.value);
    searchBox.value = "";
  }
  return false;
};

searchBox.addEventListener("focusout", function () {
  formSubmit();
});
// <a class="repos" href="#" target="_blank">Repos 1</a>
// <a class="repos" href="#" target="_blank">Repos 2</a>
// <a class="repos" href="#" target="_blank">Repos 3</a>
