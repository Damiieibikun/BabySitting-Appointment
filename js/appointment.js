let appointmentDetails = JSON.parse(localStorage.getItem('Appointment-details'))
let sitterSelected = localStorage.getItem('Sitter')
//Client's info

document.getElementById('guardian-name').innerText = appointmentDetails.guardianName
document.getElementById('guardian-number').innerText = appointmentDetails.phoneNumber
document.getElementById('guardian-email').innerText = appointmentDetails.email
document.getElementById('child-name').innerText = appointmentDetails.childName
document.getElementById('child-age').innerText = `${appointmentDetails.childAge} years`

//Appointment info
document.getElementById('service-selected').innerText = appointmentDetails.serviceType
document.getElementById('sitter-selected').innerText = sitterSelected
document.getElementById('date-selected').innerText = appointmentDetails.date
document.getElementById('time-selected').innerText = appointmentDetails.time
document.getElementById('duration-selected').innerText = appointmentDetails.duration