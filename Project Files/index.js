document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content is loaded");

  function createOption(classData) {
    const option = document.createElement("option");
    option.value = classData.class;
    option.text = classData.class;

    const image = document.createElement("img");
    image.src = classData.image;
    image.alt = `${classData.class} Image`;
    image.classList.add("class-image");
    option.appendChild(image);

    return option;
}

  function populateDropdownAndDisplayInfo(classesData) {
    const classDropdown = document.getElementById("classDropdown");
    const classInfoDiv = document.getElementById("classInfo");
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Select a class";
    classDropdown.add(defaultOption);


    // Loop through each class in the JSON data and add an option to the dropdown. Satisfies the project requirement.
    // In this forEach, it adds an option and creates it using the information in the db.json file.
    classesData.forEach(classData => {
      const option = createOption(classData);
      classDropdown.add(option);
    });

    classDropdown.addEventListener("change", () => {
      const selectedClass = classDropdown.value;

      if (selectedClass !== "") {
        // Find the selected class in the fetched data
        const selectedClassData = classesData.find(classData => classData.class === selectedClass);

        // Display Core Ability and Feature beneath the dropdown
        updateClassInfo(selectedClassData, classInfoDiv);
      } else {
        // Clear the class info if the default option is selected
        clearClassInfo(classInfoDiv);
      }
    });
  }

  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
  }
  const modeToggleBtn = document.getElementById("mode-toggle");
    if (modeToggleBtn) {
        modeToggleBtn.addEventListener("click", toggleDarkMode);
    }

  // Creates paragraph tags for text
  function createParagraph(content) {
    const paragraph = document.createElement("p");
    paragraph.textContent = content;
    return paragraph;
  }

  function updateClassInfo(classData, classInfoDiv) {
    classInfoDiv.textContent = "";

    // Create and append an image element. This will allow me to put an image to each option in the dropdown.
    // When the option in the dropdown is selected, it will display the image appended.
    const defaultImageURL = "https://static.wixstatic.com/media/ffd5a4_8922ef99dccd47de9298692aae596f4d~mv2.jpg/v1/fill/w_599,h_1000,al_c,q_85,usm_0.66_1.00_0.01/ffd5a4_8922ef99dccd47de9298692aae596f4d~mv2.jpg";
    const image = document.createElement("img");
    image.src = classData.image ? classData.image : defaultImageURL;
    image.alt = `${classData.class || "Default"} Image`;
    image.classList.add("class-image");

    const classImageContainer = document.getElementById("class-image-container");
    classImageContainer.innerHTML = ""; // Clear previous content

    // Check if the selected class has an image. If not, show the default image.
    if (classData) {
      // Create and append an image if a class is selected
      const image = document.createElement("img");
      image.src = classData.image ? classData.image : defaultImageURL;
      image.alt = `${classData.class || "Default"} Image`;
      image.classList.add("class-image");
      classImageContainer.appendChild(image);

      // Create and append paragraphs for core ability and feature
      const coreAbilityParagraph = createParagraph(`Core Ability: ${classData.core_ability}`);
      const featureParagraph = createParagraph(`Feature: ${classData.feature}`);
      classInfoDiv.appendChild(coreAbilityParagraph);
      classInfoDiv.appendChild(featureParagraph);
    } else {
      // If no class is selected (default option), display the default image
      const defaultImage = document.createElement("img");
      defaultImage.src = defaultImageURL;
      defaultImage.alt = "Default Image";
      defaultImage.classList.add("class-image");
      classImageContainer.appendChild(defaultImage);
    }
  }

  //The function below is just used as a callback to erase old class information and to replace it with other class information
  function clearClassInfo(classInfoDiv) {
    classInfoDiv.innerHTML = "";
  }

  // This block of code will fetch all class information from the JSON-Server
  // Previously I had my db.json file in the Project Files folder. Moving it to global made things work correctly.
  fetch('http://localhost:3000/classes')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Response Error: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then(classesData => {
      populateDropdownAndDisplayInfo(classesData);
    })
    .catch(error => {
      console.error('Something happened in the fetch! Error:', error);
    });
});
