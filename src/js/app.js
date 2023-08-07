 // Icons
 const sunIcon = document.querySelector(".sun");
 const moonIcon = document.querySelector(".moon");

 // Theme vars
 const userTheme = localStorage.getItem("theme");
 const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

 // Icon toggling
 const iconToggle = () => {
   moonIcon.classList.toggle("display-none");
   sunIcon.classList.toggle("display-none");

   // Call the iconToggleFunction to update particle settings based on the current theme
   iconToggleFunction();
 };

 // Initial theme check
 const themeCheck = () => {
   if (userTheme === "dark" || (!userTheme && systemTheme)) {
     document.documentElement.classList.add("dark");
     moonIcon.classList.add("display-none");
     isDarkMode = true; // Update the isDarkMode variable
     return;
   }
   sunIcon.classList.add("display-none");
 };

 // Manual switch
 const themeSwitch = () => {
   if (document.documentElement.classList.contains("dark")) {
     document.documentElement.classList.remove("dark");
     localStorage.setItem("theme", "light");
     isDarkMode = false; // Update the isDarkMode variable
   } else {
     document.documentElement.classList.add("dark");
     localStorage.setItem("theme", "dark");
     isDarkMode = true; // Update the isDarkMode variable
   }
   iconToggle();
 };

 // Call theme switch on clicking buttons
 sunIcon.addEventListener("click", themeSwitch);
 moonIcon.addEventListener("click", themeSwitch);

 // Invoke theme check on initial load
 themeCheck();

 let particleSettings;
 let isDarkMode = false;

 function applyParticleSettings(settings) {
   particlesJS('particles-js', settings);
 }

 fetch("particles.json")
   .then((response) => response.json())
   .then((data) => {
     particleSettings = data;

     particleSettings.particles.color.value = "#000000";
     particleSettings.particles.line_linked.color = "#000000";
     applyParticleSettings(particleSettings);

     // Corrected event listener assignment
     // We don't need this event listener here anymore
   })
   .catch((error) => console.error("Error loading particle settings:", error));

 // Define the body variable
 const body = document.querySelector("body");

 function iconToggleFunction() {
   body.classList.toggle("dark");
   isDarkMode = body.classList.contains("dark");

   if (isDarkMode) {
     particleSettings.particles.color.value = "#ffffff";
     particleSettings.particles.line_linked.color = "#ffffff";
   } else {
     particleSettings.particles.color.value = "#000000";
     particleSettings.particles.line_linked.color = "#000000";
     particleSettings.particles.line_linked.width = "1";
     particleSettings.particles.line_linked.opacity = "1.0"
   }

   applyParticleSettings(particleSettings);
 }