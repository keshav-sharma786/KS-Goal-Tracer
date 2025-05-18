const checkBoxList = document.querySelectorAll(".custom-checkbox");

const inputFields = document.querySelectorAll(".goal-input");

const errorLabel = document.querySelector(".error-label");

const progressBar = document.querySelector(".progress-bar");

const progressValue = document.querySelector(".progress-value");

const progressLabel = document.querySelector(".progress-label");

const allQuotes = [
  "Raise the bar by completing your goals",
  "Well begun is half done",
  "Just a step away, keep going!",
  "Congratulations you completed all your goals!",
];

// making allGoals object
const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
  first: {
    name: "",
    completed: false,
  },
  second: {
    name: "",
    completed: false,
  },
  third: {
    name: "",
    completed: false,
  },
};

const audioElement = new Audio("GoalCompletedBgm.mp3");
const audioElement2 = new Audio("finalgoalcompleted.mp3");

let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;

// this is basically when our page will get reloaded.
progressValue.style.width = `${(completedGoalsCount / 3) * 100}%`;

progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`;

progressLabel.innerText = allQuotes[completedGoalsCount];

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    // here basically we have to show that if all the goals are not filled by the user then we have add the error-label class
    // we will apply the every method of the javascript
    const allGoalsAdded = [...inputFields].every((input) => {
      return input.value;
    });
    // console.log(allFieldsFilled);
    if (allGoalsAdded) {
      checkbox.parentElement.classList.toggle("completed");
      // as user checkmarks after writing all of his goals,we are required to increase the width of the progress bar as well

      // updating the completing action inside the local storage as well
      const inputId = checkbox.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;
      progressValue.style.width = `${(completedGoalsCount / 3) * 100}%`;
      if (completedGoalsCount === 3) {
        audioElement.play();
      }

      // else if(completedGoalsCount === 1) audioElement.play();
      // else if(completedGoalsCount === 2) {
      //   // audioElement.pause();
      //   audioElement.play();
      // }
      progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`;
      progressLabel.innerText = allQuotes[completedGoalsCount];
      // playing the audio as well

      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      errorLabel.style.display = "block";
    }
  });
});

// adding the focus event on all the input fields
// if the user starts typing all the goals then we want our error should be removed
inputFields.forEach((input) => {
  input.value = allGoals[input.id].name;

  if (allGoals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }
  // input here basically represents the each element of the array
  input.addEventListener("focus", () => {
    errorLabel.style.display = "none";
  });

  input.addEventListener("input", (e) => {
    if (allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    }
    allGoals[input.id].name = input.value;
    
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
