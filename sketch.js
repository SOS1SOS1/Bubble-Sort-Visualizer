
/*
*** Bubble Sort ***
-	Orders values by repetitively comparing neighboring elements and swapping
  if needed
-	Scans list, exchanging adjacent elements if they’re in the wrong order
    - this bubbles the highest value to the top
-	Scans again, bubbling the second highest value to the top
-	Repeat until all elements are sorted
*/

let numbers = new Array(20);  // numbers to sort
let compareIndex = -1;  // index for number being compared
let endIndex = numbers.length-1;  // last index number needs to be compared with
let swapNeeded = false;  // false if no swap was needed on last comparison
let sorted = true;  // true initially and once list is sorted
let sortNumbers = false;  // true once sort button is pressed

// buttons for sorting and generating new numbers
let newNumbersButton;
let sortButton;

// width and height of the canvas
let w = window.innerWidth;
let h = 550;

// centers the bars that represent the numbers in the array
let start_x = w/2 - Math.floor((numbers.length-1) * 17 / 2);

function setup() {
  createCanvas(w, h);

  // sets up numbers array with random numbers (1-100)
  for (let i = 0; i < numbers.length; i++) {
    numbers[i] = Math.ceil(Math.random() * 100);
  }
  console.log("Initial Numbers: " + numbers);

  // sets the frame rate, used to control the speed of the animation
  frameRate(30);
}

function getRandomNumbers(newNumbersButton_id, sizeInput_id) {
  var newNumbersButton = document.getElementById(newNumbersButton_id);
  newNumbersButton.style.opacity =  "0.5";

  if (sorted) {
    var size = document.getElementById(sizeInput_id).value;
    if (numbers.length != size && size != '' && size > 0) {
      numbers = Array(int(size));
      start_x = w/2 - Math.floor((numbers.length-1) * 17 / 2);
    }

    // sets up numbers array with random numbers (1-100)
    for (let i = 0; i < numbers.length; i++) {
      numbers[i] = Math.ceil(Math.random() * 100);
    }
    console.log("Initial Numbers: " + numbers);
  }
}

function doSort(sortButton_id, speedInput_id) {
  var sortButton = document.getElementById(sortButton_id);
  sortButton.style.opacity =  "0.5";

  var speed = document.getElementById(speedInput_id).value;
  if (speed != '' && speed >= 1) {
    frameRate(int(speed));
  }

  if (sorted) {
    sorted = false;
    sortNumbers = true;
    compareIndex = -1;
    endIndex = numbers.length-1;
  }
}

function changeOpacity(id) {
    var element = document.getElementById(id);
    element.style.opacity =  "1";
}

function draw() {// background of canvas
  background(255);
  // line width
  strokeWeight(12);
  // rounds ends of lines
  strokeCap(SQUARE);

  for (let i = 0; i < numbers.length; i++) {
    if (i == compareIndex || i == compareIndex+1) {
      if (!sorted && sortNumbers) {
        // sets stroke color to light gray for numbers being compared
        stroke(130, 130, 130);
      } else {
        stroke(78, 162, 163);
      }
    } else {
      // sets stroke color to teal for numbers not being compared
      stroke(78, 162, 163);
    }

    let x = i * 17 + start_x;
    let length = numbers[i] * 5;
    line(x, 0, x, length);
  }

  if (!sorted && sortNumbers) {
    bubbleSort();
  }
}

function bubbleSort() {
  // increments the index for what number to compare
  compareIndex++;

  // if compareIndex is the end index
  if (compareIndex == endIndex) {
    // it decrements the index
    endIndex--;
    // if a swap was needed on the last comparison
    if (swapNeeded) {
      // resets swapNeeded variable and compareIndex
      swapNeeded = false;
      compareIndex = 0;
    } else {
      // otherwise the list is sorted
      sorted = true;
    }
  }

  // compares number with number after it, if left one is greater than right, it swaps them
  if (numbers[compareIndex] > numbers[compareIndex+1]) {
    let temp = numbers[compareIndex];
    numbers[compareIndex] = numbers[compareIndex+1];
    numbers[compareIndex+1] = temp;
    swapNeeded = true;
  }
}
