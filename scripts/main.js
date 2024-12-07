// scripts/main.js

// Function to load components
async function loadComponents() {
    // Load loading animation
    const loadingResponse = await fetch('/components/loading.html');
    const loadingHtml = await loadingResponse.text();
    document.body.insertAdjacentHTML('beforeend', loadingHtml);

    // Load scroll to top button
    const scrollTopResponse = await fetch('/components/scroll-top.html');
    const scrollTopHtml = await scrollTopResponse.text();
    document.body.insertAdjacentHTML('beforeend', scrollTopHtml);
}

// Load components when page loads
document.addEventListener('DOMContentLoaded', loadComponents);