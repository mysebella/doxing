import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  limit,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import config from "./../config.js";

const app = initializeApp(config);
const db = getFirestore(app);

const projectsQuery = query(collection(db, "projects"), limit(3));
const cardContainer = document.getElementById("card-container");

const querySnapshot = await getDocs(projectsQuery);
querySnapshot.forEach((doc) => {
  const data = doc.data();
  const html = `
          <div class="w-full p-2 rounded-lg border-2 border-amber-700 mb-4">
            <img src="${data.image_url}" style="width: 100%; border-radius: 10px;"/>
            <div class="mt-4 mb-2 px-2">
              <a href="view.html?id=${doc.id}" class="font-semibold ">!${data.name}</a>
              <p>Type: ${data.type}</p>
              <p>Tech: ${data.tech}</p>
            </div>
          </div>`;

  cardContainer.innerHTML += html;
});
