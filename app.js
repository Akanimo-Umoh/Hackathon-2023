// notification dropdown
let notificationButton = document.getElementById("notification");
let dropdown = document.getElementById("dropdown");

notificationButton.onclick = function () {
  dropdown.classList.toggle("showDropdown");
};

document.addEventListener("click", function (event) {
  if (
    !notificationButton.contains(event.target) &&
    !dropdown.contains(event.target)
  ) {
    dropdown.classList.remove("showDropdown");
  }
});

// guide dropdown
document.getElementById("dropdownTaskCtn").onclick = function () {
  let mainTaskCtn = document.getElementById("mainTaskCtn");
  mainTaskCtn.classList.toggle("showcontainer");
  document.getElementById("dropdownTaskCtn").classList.toggle("rotate");
};
// document.getElementById("dropdownTaskCtn").onclick = function(){
//     let mainTaskCtn = document.getElementById("mainTaskCtn");
//     if (mainTaskCtn.style.display === "none") {
//         mainTaskCtn.style.display = "block"
//         document.getElementById("dropdownTaskCtn").classList.remove("rotate");
//     } else {
//         mainTaskCtn.style.display = "none";
//         document.getElementById("dropdownTaskCtn").classList.add("rotate");
//     }
// }

// store dropdown
let button = document.getElementById("openStoreDropdown");
let dropdownContent = document.getElementById("dropdownStore");

button.addEventListener("click", function() {
  dropdownContent.classList.toggle("showCtn");
})

document.addEventListener("click", function (event) {
  if (
    !button.contains(event.target) &&
    !dropdownContent.contains(event.target)
  ) {
    dropdownContent.classList.remove("showCtn");
  }
});

// close plan
let closePlan = document.getElementById("exitPlan");
let exitTrial = document.getElementById("exitTrial");

closePlan.onclick = function () {
  exitTrial.style.display = "none";
  const screenWidth = window.innerWidth;
  document.getElementById("setupC").style.marginTop = "104px";
  if(screenWidth < 1439 ) {
    document.getElementById("setupC").style.marginTop = "28px";
  }
};

// task toggle
const mainTextElements = document.querySelectorAll(".mainText");
const detailsElements = document.querySelectorAll(".details");
const circleElements = document.querySelectorAll(".circle");
const taskCtnElements = document.querySelectorAll(".taskCtn");

mainTextElements.forEach((mainText, index) => {
  mainText.addEventListener("click", () => {
    toggleDetails(index);
  });
});

circleElements.forEach((circle, index) => {
  circle.addEventListener("click", () => {
    showDetails(index);
  });
});

function toggleDetails(index) {
  detailsElements.forEach((details, i) => {
    if (i === index) {
      details.classList.toggle(
        "activeDetails",
        !details.classList.contains("activeDetails")
      );
      mainTextElements[i].classList.add("hideMainText");
      taskCtnElements[i].classList.add("activeCtn");
    } else {
      details.classList.remove("activeDetails");
      mainTextElements[i].classList.remove("hideMainText");
      taskCtnElements[i].classList.remove("activeCtn");
    }
  });
}

function showDetails(index) {
  detailsElements.forEach((details, i) => {
    if (i === index) {
      details.classList.add("activeDetails");
      mainTextElements[i].classList.add("hideMainText");
      taskCtnElements[i].classList.add("activeCtn");
    } else {
      details.classList.remove("activeDetails");
      mainTextElements[i].classList.remove("hideMainText");
      taskCtnElements[i].classList.remove("activeCtn");
    }
  });
}

// show icons / progress bar implementation
let currentStep = 0;
const maxStep = 5;

function toggleIcons(setNumber) {
  const defaultIcon = document.getElementById(`defaultIcon${setNumber}`);
  const loadingIcon = document.getElementById(`loadingIcon${setNumber}`);
  const tickIcon = document.getElementById(`tickIcon${setNumber}`);

  if (defaultIcon.style.display !== "none") {
    // Show loading icon, hide default icon
    defaultIcon.style.display = "none";
    loadingIcon.style.display = "block";
    loadingIcon.classList.add("rotate");

    // Increment step after 3 seconds
    setTimeout(() => {
      loadingIcon.style.display = "none";
      loadingIcon.classList.remove("rotate");
      tickIcon.style.display = "block";

      // Update progress bar and number container
      if (currentStep < maxStep) {
        currentStep += 1;
        updateProgressBar();
        updateNumberContainer();
      }
    }, 500);
  } else if (tickIcon.style.display !== "none") {
    // Show default icon, hide tick icon
    tickIcon.style.display = "none";
    defaultIcon.style.display = "block";

    // Decrement step when tick icon is clicked
    if (currentStep > 0) {
      currentStep -= 1;
      updateProgressBar();
      updateNumberContainer();
    }
  }
}

function updateProgressBar() {
  const progress = document.getElementById("progress");
  progress.style.width = `${(currentStep / maxStep) * 100}%`;
}

function updateNumberContainer() {
  const numberContainer = document.getElementById("checkCount");
  numberContainer.textContent = currentStep;
}
