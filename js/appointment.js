//Function for Collapsed menu
document
  .getElementById("collapsed-menu")
  .addEventListener("click", function () {
    document
      .getElementsByClassName("nav-items")[0]
      .classList.toggle("toggle-nav");
  });

//get items from local storage
let appointmentDetails = JSON.parse(
  localStorage.getItem("Appointment-details")
);
let sitterSelected = localStorage.getItem("Sitter");
//Client's info

document.getElementById("guardian-name").innerText =
  appointmentDetails.guardianName;
document.getElementById("guardian-number").innerText =
  appointmentDetails.phoneNumber;
document.getElementById("guardian-email").innerText = appointmentDetails.email;
document.getElementById("child-name").innerText = appointmentDetails.childName;
document.getElementById(
  "child-age"
).innerText = `${appointmentDetails.childAge} years`;

//Appointment info
document.getElementById("service-selected").innerText =
  appointmentDetails.serviceType;
document.getElementById("sitter-selected").innerText = sitterSelected;
document.getElementById("date-selected").innerText = appointmentDetails.date;
document.getElementById("time-selected").innerText = appointmentDetails.time;
document.getElementById("duration-selected").innerText =
  appointmentDetails.duration;

// calculations and cost breakdown
function serviceCharge() {
  let rate = null;
  if (appointmentDetails.serviceType === "Day") {
    rate = 5 * 8;
    document.getElementById(
      "cost-serviceinfo"
    ).innerHTML = `<b>${appointmentDetails.serviceType}(8am - 4pm)</b>: Base Rate ($5 per hour): <b>$${rate}</b>`;
  } else if (appointmentDetails.serviceType === "Evening") {
    rate = 5 * 1.1 * 6;
    document.getElementById(
      "cost-serviceinfo"
    ).innerHTML = `<b>${appointmentDetails.serviceType}(4pm - 10pm)</b>: 1.1 X Base Rate ($5 per hour): <b>$${rate}</b>`;
  } else {
    rate = 5 * 1.5 * 10;
    document.getElementById(
      "cost-serviceinfo"
    ).innerHTML = `<b>${appointmentDetails.serviceType}(10pm - 8am)</b>: 1.5 X Base Rate ($5 per hour): <b>$${rate}</b>`;
  }

  return Math.round(rate);
}

function childRate() {
  let rate = serviceCharge();
  let childAge = parseInt(appointmentDetails.childAge);
  if (childAge === 0 || childAge === 1) {
    rate *= 1.2;
    document.getElementById(
      "cost-childinfo"
    ).innerHTML = `<b> Newborn - 1 year</b>: 1.2x Service Rate: <b>$${rate}</b>`;
  } else if (childAge > 1 && childAge < 6) {
    rate *= 1.1;
    document.getElementById(
      "cost-childinfo"
    ).innerHTML = `<b> 1 year - 5 years</b>: 1.1x Service Rate: <b>$${rate}</b>`;
  } else {
    rate = rate;
    document.getElementById(
      "cost-childinfo"
    ).innerHTML = `<b> Over 5 years</b>: 1x Service Rate: <b>$${rate}</b>`;
  }

  return Math.round(rate);
}

function durationRate() {
  let rate = childRate();
  if (appointmentDetails.duration === "1 week") {
    rate *= 7;
    document.getElementById(
      "cost-durationinfo"
    ).innerHTML = `<b> ${appointmentDetails.duration}</b>: charge per day (7 days)`;
  } else if (appointmentDetails.duration === "2 weeks") {
    rate *= 14;
    document.getElementById(
      "cost-durationinfo"
    ).innerHTML = `<b> ${appointmentDetails.duration}</b>: charge per day (14 days)`;
  } else if (appointmentDetails.duration === "3 weeks") {
    rate *= 21;
    document.getElementById(
      "cost-durationinfo"
    ).innerHTML = `<b> ${appointmentDetails.duration}</b>: charge per day (21 days)`;
  } else if (appointmentDetails.duration === "1 month") {
    rate *= 30;
    document.getElementById(
      "cost-durationinfo"
    ).innerHTML = `<b> ${appointmentDetails.duration}</b>: charge per day (30 days)`;
  }
  else{
    rate = rate;
    document.getElementById(
      "cost-durationinfo"
    ).innerHTML = `<b> ${appointmentDetails.duration}</b>: Daily charge of <b>$${rate}</b>`;
  }

  return Math.round(rate);
}

// urgency rate for impromtu booking
function urgencyFee() {
  let rate = durationRate();

  let differenceMilisecond = new Date(appointmentDetails.date) - new Date();
  let millisecondsInADay = 1000 * 60 * 60 * 24;
  let dayDifference = Math.floor(differenceMilisecond / millisecondsInADay);
  if (dayDifference < 5) {
    rate *= 1.2;

    document.getElementById(
      "urgency"
    ).innerHTML = `<b> Urgency Fee: </b>Booking Date within 5 days <b>$${
      (rate / 1.2) * 0.2
    }</b>`;
  } else {
    rate = rate;
  }
  return Math.round(rate);
}

(appointmentDetails.duration === 'N/A') ? document.getElementById("total-cost").innerHTML = `<b>$${urgencyFee()}</b> daily charge`:
document.getElementById("total-cost").innerHTML = `<b>$${urgencyFee()}</b>`;

let confirmBooking = document.getElementById("confirm-booking");
let hourglass = document.getElementById("hourglass");
confirmBooking.addEventListener("click", function () {
  hourglass.classList.remove("hide");
  hourglass.classList.add("display");
  hourglass.addEventListener("animationend", function () {
    this.classList.add("hide");
  });
  setTimeout(function () {
    let appPage = document.getElementById("appointment-details");
    appPage.classList.add('flex-col', 'justify-center', 'align-center')

    appPage.innerHTML = `<h1 class = "confirmText">Booking Confirmed!</h1><br>
        <h3 class = "confirmTexth3">Thank You for choosing Little Sunshine Sitters!</h3>`;
  }, 700);
});
