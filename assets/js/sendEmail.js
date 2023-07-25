// function sendMail(contactForm) {
//     emailjs.send("service_8syvbi4", "template_f0755yc", {
//         "from_name": contactForm.name.value,
//         "from_email": contactForm.emailaddress.value,
//         "project_request": contactForm.projectsummmary.value
//     })
//     .then(
//         function(response) {
//             console.log("SUCCESS", response);
//         },
//         function(error) {
//             console.log("FAILED", error);
//         }
//     );
//     return false;  // to block from loading a new page
// }

const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'service_8syvbi4';
   const templateID = 'template_f0755yc';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      console.log('Your email has been sent!');
    }, (err) => {
      btn.value = 'Send Email';
      console.log(JSON.stringify(err));
    });
});