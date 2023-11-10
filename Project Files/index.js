document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content is loaded");

  function populateDropdown() {
    const classDropdown = document.getElementById("classDropdown");
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Select a class";
    classDropdown.add(defaultOption);

    // This block of code will fetch the information from the JSON-Server
    fetch('http://localhost:3000/classes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Response Error');
        }
        return response.json();
      })
      .then(classesData => {
        // Loop through each class in the JSON data and add an option to the dropdown. forEach project goal satisfied
        classesData.forEach(classObj => {
          const option = document.createElement("option");
          option.value = classObj.class;
          option.text = classObj.class;
          classDropdown.add(option);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  populateDropdown();
});