//set min date to current date
const today = new Date().toISOString().slice(0, 10);
let date = document.getElementById("date");
date.setAttribute("min", `${today}`);

//Function for Collapsed menu
document
  .getElementById("collapsed-menu")
  .addEventListener("click", function () {
    document
      .getElementsByClassName("nav-items")[0]
      .classList.toggle("toggle-nav");
  });

//retrieve elements:
let guardianName = document.getElementById("guardian-name");
let phoneNumber = document.getElementById("phone");
let email = document.getElementById("email");
let childName = document.getElementById("child-name");
let childAge = document.getElementById("age");
let time = document.getElementById("time");
let duration = document.getElementById("duration");
let serviceType = document.getElementById("service-type");
let submit = document.getElementById("submit");
//other elements
let hourglass = document.getElementById("hourglass");
let sittersSection = document.getElementById("sitters");

// change input fields of names to capital case
function capitalCase() {
    if (this.value) {
        let properText = this.value[0].toUpperCase() +
            this.value.slice(1);
        this.value = properText
    }
}
guardianName.addEventListener('input', capitalCase)
childName.addEventListener('input', capitalCase)

//Validate for empty strings
function emptyFields(event) {
  if (event.target.value === "") {
    event.target.classList.add("error-border");
    document.getElementById("error-msg").classList.remove("hide");
    document.getElementById("error-msg").classList.add("error-msg", "display");
  } else {
    event.target.classList.remove("error-border");
    document.getElementById("error-msg").classList.add("hide");
    document
      .getElementById("error-msg")
      .classList.remove("error-msg", "display");
  }
}

//validte values inputed
let validNum = false;
let validEmail = false;
const numRegex = /^[+\d]?(?:\d[-.\s()]?){7,14}\d$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|mil|int|gov.ng|[a-zA-Z]{2})$/;

// Keep track of validated email and number
function validateFields() {
  const confirmedFields = validNum && validEmail;
  return confirmedFields;
}

//Check format for email and number
function checkFormat(element, regex, validity) {
  validity = regex.test(element.value);
  validity
    ? (element.classList.remove("error-border"),
      element.previousElementSibling.classList.add("hide"),
      element.previousElementSibling.classList.remove("error-msg", "display"))
    : (element.classList.add("error-border"),
      element.previousElementSibling.classList.add("display", "error-msg"),
      element.previousElementSibling.classList.remove("hide"));
  return validity;
}

//validate phone number
phoneNumber.addEventListener("input", function () {
  validNum = checkFormat(phoneNumber, numRegex, validNum);
  validateFields();
});

//validate email
email.addEventListener("input", function () {
  validEmail = checkFormat(email, emailRegex, validEmail);
  validateFields();
});

// add event listener to document and check for empty fields

window.addEventListener("mouseup", function () {
  let inputs = document.querySelectorAll("input");
  let select = document.querySelectorAll("select");
  //create a list for inputs and select element
  let allFields = [inputs, select];
  let numOfEmpty = 0;
  for (var field of allFields) {
    for (var i of field) {
      if (i.value === "") {
        numOfEmpty++;
      }
    }
  }
  if (numOfEmpty === 0) {
    // check if all fields are filled
    validNum = checkFormat(phoneNumber, numRegex, validNum);
    validEmail = checkFormat(email, emailRegex, validEmail);
    validateFields();

    if (validateFields()) {
      submit.classList.remove("hide");
      submit.classList.add("display");
      // create local storage to store info
      let appointmentDetails = {
        guardianName: guardianName.value,
        phoneNumber: phoneNumber.value,
        email: email.value,
        childName: childName.value,
        childAge: childAge.value,
        date: new Date(date.value).toDateString(),
        time: time.value,
        duration: duration.value,
        serviceType: serviceType.value,
      };
      this.localStorage.setItem(
        "Appointment-details",
        JSON.stringify(appointmentDetails)
      );
      console.log("Success");
    } else {
      submit.classList.add("hide");
      submit.classList.remove("display");
      hourglass.classList.add("hide");
      hourglass.classList.remove("display");
      console.log("Validation Failed");
    }

    //add event listener to button
    submit.addEventListener("click", function () {
      hourglass.classList.remove("hide");
      hourglass.classList.add("display");
      hourglass.addEventListener("animationend", function () {
        this.classList.add("hide");
      });
      setTimeout(function () {
        window.location.href = "#sitters";
        sittersSection.classList.remove("hide");
        sittersSection.classList.add("display");
        bookSitter();
      }, 700);
    });
  } else {
    submit.classList.add("hide")
    sittersSection.classList.add("hide")
    console.log("Number of empty fields: " + numOfEmpty);
  }
});

function bookSitter() {
  // view sitters info
  let appointmentDetails = JSON.parse(
    localStorage.getItem("Appointment-details")
  );
  let serviceSelected = appointmentDetails.serviceType;
  document.getElementById(
    "service-selected"
  ).innerText = `${serviceSelected} sitters`;

  //get element for sitters info
  let sittersGrid = document.getElementById("sitters-grid");
  sittersGrid.innerHTML = "";

  //object constructor for sitters
  function Sitter(id, name, experience, history, skills) {
    this.id = id;
    this.name = name;
    this.experience = experience;
    this.history = history;
    this.skills = skills;
  }

  // sitters info
  let listSitters = [];
  let sitter1 = new Sitter(
    1,
    "Brian",
    "3 years experience",
    "Waiter",
    "Content Creator"
  );
  listSitters.push(sitter1);
  let sitter2 = new Sitter(
    2,
    "Anne",
    "2 years experience",
    "Former pre-school Teacher",
    "Speaks French and Spanish"
  );
  listSitters.push(sitter2);
  let sitter3 = new Sitter(
    3,
    "Gabrielle",
    "1 year experience",
    "Speech Therapist",
    "Biligual"
  );
  listSitters.push(sitter3);
  let sitter4 = new Sitter(
    4,
    "Amaka",
    "2 years experience",
    "Nurse",
    "Speaks Igbo and Spanish"
  );
  listSitters.push(sitter4);
  let sitter5 = new Sitter(
    5,
    "Divine",
    "3 years experience",
    "Student",
    "Computer Science Undergard"
  );
  listSitters.push(sitter5);
  let sitter6 = new Sitter(
    6,
    "Santi",
    "3 years experience",
    "Research Assistant",
    "Speaks Hindi and German"
  );
  listSitters.push(sitter6);
  let sitter7 = new Sitter(
    7,
    "Amy",
    "4 years experience",
    "Baby Sitter",
    "Baking"
  );
  listSitters.push(sitter7);
  let sitter8 = new Sitter(
    8,
    "Sandra",
    "1 year experience",
    "College Student",
    "Speaks Mandirin, Cantonese, French and Italian"
  );
  listSitters.push(sitter8);
  let sitter9 = new Sitter(
    9,
    "Emily",
    "15 year experience",
    "Stay Home Mom",
    "Baking, Cooking and Painting"
  );
  listSitters.push(sitter9);

  //create random  array for sitters
  var numOfSitters;

  serviceSelected === "Day"
    ? (numOfSitters = listSitters.slice(0, 3))
    : serviceSelected === "Evening"
    ? (numOfSitters = listSitters.slice(3, 6))
    : (numOfSitters = listSitters.slice(6, 9));

  // select avaliabilty at random
  let randNum = Math.floor(Math.random() * 4);
  console.log("random number: " + randNum);
  if (randNum !== 0) {
    sittersGrid.classList.add("grid-3fr");
    sittersGrid.classList.remove("grid-1fr");
    for (var i of numOfSitters) {
      let sitterItem = document.createElement("div");
      sitterItem.className = "grid-row1fr sitter-items";
      sitterItem.id = i.name;

      let imgDiv = document.createElement("div");
      imgDiv.classList.add("sitter-images");
      imgDiv.style.backgroundImage = `url('images/img${i.id}.jpg')`;
      sitterItem.appendChild(imgDiv);

      let p1 = document.createElement("p");
      p1.id = "sitter-name";
      p1.innerText = i.name;
      sitterItem.appendChild(p1);

      let p2 = document.createElement("p");
      p2.innerText = "Experience:";
      sitterItem.appendChild(p2);

      let ul = document.createElement("ul");
      let li1 = document.createElement("li");
      li1.innerText = i.experience;
      ul.appendChild(li1);

      let li2 = document.createElement("li");
      li2.innerText = i.history;
      ul.appendChild(li2);

      let li3 = document.createElement("li");
      li3.innerText = i.skills;
      ul.appendChild(li3);

      sitterItem.appendChild(ul);

      let bookButton = document.createElement("button");
      bookButton.setAttribute("onclick", "clicked(event)");
      bookButton.id = i.name;
      bookButton.className = "book-sitter";
      bookButton.innerText = "Book Sitter";
      sitterItem.appendChild(bookButton);
      sittersGrid.appendChild(sitterItem);
    }
  } else {
    sittersGrid.classList.remove("grid-3fr");
    sittersGrid.classList.add("grid-1fr");
    let sitterItem = document.createElement("div");
    sitterItem.className = "flex-col sitter-items";

    let imgDiv = document.createElement("div");
    imgDiv.classList.add("sitter-images");
    imgDiv.style.backgroundImage = `url('images/img${randNum}.jpg')`;
    sitterItem.appendChild(imgDiv);

    let p0 = document.createElement("p");
    p0.id = "no-sitter";
    p0.innerText = `Sorry We currently dont have ${serviceSelected}sitters avaliable for the selected time. Please check again soon!`;
    p0.style.fontWeight = 400;
    sitterItem.appendChild(p0);
    sittersGrid.appendChild(sitterItem);
  }
}

function clicked(event) {
  sitterChosen = event.target.id;
  localStorage.setItem("Sitter", sitterChosen);
  let waitImg = document.createElement("img");
  waitImg.setAttribute("src", "images/logos/wait.png");
  waitImg.id = "hourglass";
  waitImg.classList.add("waitSitters");
  document.getElementById(sitterChosen).appendChild(waitImg);
  setTimeout(function () {
    window.location.href = "Appointment.html";
  }, 700);
}



