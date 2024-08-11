const backendURL = "https://eazybytesbackend.onrender.com";

async function fetchProjects() {
  try {
    // const response = await fetch(`${backendURL}/projects`);
    const response = await fetch(`${backendURL}/fetch-projects`);

    const data = await response.json();
    // if (!data.error) {
    //   console.log(data.projects);
    // } else {
    //   console.error("Error fetching projects ", error);
    // }
    if (data.error) {
      console.error("Error fetching projects:", data.message);
      return;
    }
    console.log("Fetched stuff :", data);

    const projectsContainer = document.querySelector(".projects-display");

    const projectsHTML = data.projects
      .map(
        (project) => `
        <div class="projects">
          <a href="${project.DPlink}" target="_blank" class="project-link">
            <img src="${project.image}" alt="${project.name}" class="project-image" />
          </a>
          <div class="project-info">
          <p class="project-name">${project.name}</p>
          <a href="${project.GHlink}" class="code-link" target="_blank"> <i class="fa-solid fa-code"></i> Code</a>
          </div>
        </div>
    `
      )
      .join("");

    projectsContainer.innerHTML = projectsHTML;

    console.log("mapped");
  } catch (error) {
    console.error("Error :", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchProjects);

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  //const backendUrlvar = config.backendUrl;
  const name = document.getElementById("FormName").value;
  const email = document.getElementById("FormEmail").value;
  const formMessage = document.getElementById("FormMessage").value;

  const formData = { name, email, formMessage };

  //console.log(formData);

  try {
    // const response = await fetch("http://localhost:9000/submit-form", {
    const response = await fetch(`${backendURL}/submit-form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message);
      console.log("Access Token:", result.accessToken);
      console.log("Form Data:", result.formData);
    } else {
      alert(result.message);
      console.error("Error:", result);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
