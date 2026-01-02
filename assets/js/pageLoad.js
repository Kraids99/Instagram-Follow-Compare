const loadPartial = (sectionId, path) => {
  fetch(path)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load ${path}: ${response.status}`);
      }
      return response.text();
    })
    .then((html) => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.innerHTML = html;
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export {
    loadPartial
};