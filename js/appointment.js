let appointmentDetails = JSON.parse(localStorage.getItem('Appointment-details'))
let sitterSelected = localStorage.getItem('Sitter')
document.getElementById('service-selected').innerText = `${appointmentDetails.serviceType} sitters`
document.getElementById('sitter-selected').innerText = sitterSelected