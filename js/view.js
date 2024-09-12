import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  query,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

import config from "./../config.js";

const url = new URL(document.location.href);

const params = new URLSearchParams(url.search);

const app = initializeApp(config);
const db = getFirestore(app);

const projectsQuery = query(doc(db, "projects", params.get("id")));
const cardContainer = document.getElementById("card-container");

const a = await getDoc(projectsQuery);

const buttonSection = document.querySelector("#button-container");
const projectContainer = document.querySelector("#project-container");

const data = a.data();

projectContainer.innerHTML = `
<img
    class="w-full rounded-xl" style="border-radius: 10px;"
    src="${data.image_url}"
    />
<div class="mt-4">
    <p class="text-xl font-semibold">!${data.name}</p>
    <p class="my-4">
    ${data.description}
    </p>
    <p class="mt-1">Type : ${data.type}</p>
    <p class="mt-1">Tech : ${data.tech}</p>
</div>
`;

const visit = document.querySelector("#button-visit");
visit.setAttribute("href", data.url);

const github = document.querySelector("#button-github");
github.setAttribute("href", data.github);
