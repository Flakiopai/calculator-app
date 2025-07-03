const display = document.getElementById("display");
const liveRegion = document.createElement("div");

// Create a live region for screen readers
liveRegion.setAttribute("aria-live", "polite");
liveRegion.setAttribute("aria-atomic", "true");
liveRegion.className = "visually-hidden";
document.body.appendChild(liveRegion);

function appendValue(value) {
  display.value += value;
  updateLiveRegion(display.value);
}

function clearDisplay() {
  display.value = "";
  updateLiveRegion("Cleared");
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
  updateLiveRegion(display.value || "Empty");
}

function calculate() {
  try {
    // Use Function constructor instead of eval for slightly safer evaluation
    const result = Function('"use strict"; return (' + display.value + ')')();
    display.value = result;
    updateLiveRegion("Result: " + result);
  } catch {
    display.value = "Error";
    updateLiveRegion("Error in calculation");
  }
}

function updateLiveRegion(message) {
  liveRegion.textContent = message;
}

