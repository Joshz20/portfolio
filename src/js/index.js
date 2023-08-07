document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".hamburger");
    const navbar = document.getElementById("navbar-default");

    menuButton.addEventListener("click", function () {
      const expanded = menuButton.classList.contains("is-active");
      menuButton.classList.toggle("is-active", !expanded);
      navbar.classList.toggle("hidden");
    });
  });

  // JS FOR 
  const colors = ["#AFBCCF", "#FFAFA3", "#80C4FF", "#FFC470", "#FFADE7","#75D7F0","FFD966","D9B8FF","#85E0A3"];
  const texts = ["kumusta ?", "Bonjour!", "Hello 👋", "こんにちは •⩊•", "Hola!", "你好(nihao)","안녕하세요"];

  let usedTexts = [];

  function createFloatingDiv() {
    if (usedTexts.length >= texts.length) return; // Stop creating divs once all texts are used

    // Create a new floating div with a random color and text
    const floatingDiv = document.createElement("div");
    floatingDiv.className = "floating-div";
    floatingDiv.classList.add("newFloatAnimation"); // Apply the floating animation to the new div

    const unusedTexts = texts.filter(text => !usedTexts.includes(text));
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomText = unusedTexts[Math.floor(Math.random() * unusedTexts.length)];

    usedTexts.push(randomText);

    floatingDiv.textContent = randomText;
    floatingDiv.style.backgroundColor = randomColor;

    const imageContainer = document.querySelector(".image-container");
    const containerRect = imageContainer.getBoundingClientRect();

    // Calculate random positions inside the image container
    const spawnRadius = Math.min(containerRect.width, containerRect.height) * 0.4; // Responsive spawn distance
    const spawnYOffset = containerRect.height * 2.0; // Adjust this value to move the spawn further down

    const angle = Math.random() * 1 * Math.PI;
    const randomX = containerRect.left + containerRect.width / 2.2 + spawnRadius * Math.cos(angle) - floatingDiv.offsetWidth / 2;
    const randomY = containerRect.top + containerRect.height / 2.2 + spawnRadius * Math.sin(angle) - floatingDiv.offsetHeight / 2 + spawnYOffset;

    floatingDiv.style.left = randomX + "px";
    floatingDiv.style.top = randomY + "px";

    document.body.appendChild(floatingDiv);

    floatingDiv.addEventListener("mousedown", function (e) {
      let initialX = e.clientX;
      let initialY = e.clientY;
      let offsetX = 0;
      let offsetY = 0;

      function dragElement(e) {
        e.preventDefault();
        offsetX = initialX - e.clientX;
        offsetY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;

        floatingDiv.style.top = (floatingDiv.offsetTop - offsetY) + "px";
        floatingDiv.style.left = (floatingDiv.offsetLeft - offsetX) + "px";
      }

      function stopDragging() {
        document.removeEventListener("mousemove", dragElement);
        document.removeEventListener("mouseup", stopDragging);
      }

      document.addEventListener("mousemove", dragElement);
      document.addEventListener("mouseup", stopDragging);
    });
  }

  createDefaultDiv();


