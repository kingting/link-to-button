function fetchAndDisplayScript(elementId, url, button) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      const element = document.getElementById(elementId);
      element.style.display = 'block';
      element.textContent = data;
      button.disabled = true;
    })
    .catch(error => {
      console.error('Error fetching the script:', error);
    });
}
