document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content is loaded");

  function createOption(classData) {
    const option = document.createElement("option");
    option.value = classData.class;
    option.text = classData.class;
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
  const modeToggleBtn = document.getElementById("modeToggleBtn");
    if (modeToggleBtn) {
        modeToggleBtn.addEventListener("click", toggleDarkMode);
    }

  function createParagraph(content) {
    const paragraph = document.createElement("p");
    paragraph.textContent = content;
    return paragraph;
  }

  function updateClassInfo(classData, classInfoDiv) {
    classInfoDiv.innerHTML = ""; // Clears previous content. InnerHTML is not secure but this should be fine for the project.

    const coreAbilityParagraph = createParagraph(`Core Ability: ${classData.core_ability}`);
    const featureParagraph = createParagraph(`Feature: ${classData.feature}`);

    classInfoDiv.appendChild(coreAbilityParagraph);
    classInfoDiv.appendChild(featureParagraph);
  }

  function clearClassInfo(classInfoDiv) {
    classInfoDiv.innerHTML = "";
  }

  // This block of code will fetch all class information from the JSON-Server
  fetch('http://localhost:3000/classes')
    .then(response => {
      if (!response.ok) {
        throw new Error('Response Error');
      }
      return response.json();
    })
    .then(classesData => {
      populateDropdownAndDisplayInfo(classesData);
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
