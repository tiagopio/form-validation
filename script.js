class ValidateForm {
   constructor() {
      // Get the form element with the class "form" and assign it to the instance property "form".
      this.form = document.querySelector('.form');
      // Bind the "this" keyword to the "handleSubmit" method when the form is submitted.
      this.events();

   }

   events() {
      // Listen for a "submit" event on the form and call the "handleSubmit" method.
      this.form.addEventListener('touchend', e => {
         this.handleSubmit(e);
      });
   }

   handleSubmit(e) {
      // Prevent the default form submission behavior.
      e.preventDefault();
      // Check if all fields are valid.
      const validFields = this.isValidFields();
      // Check if password fields are valid.
      const validPasswords = this.isValidPasswords();

      // If all fields and passwords are valid, show an alert and submit the form.
      if (validFields && validPasswords) {
         alert('Form sent.');
         this.form.reset();
      }
   }

   isValidPasswords() {
      let valid = true;

      // Get the password and repeat password input elements.
      const password = this.form.querySelector('.password');
      const repeatPassword = this.form.querySelector('.repeat-password');

      // If the password and repeat password values do not match, set "valid" to false and show an error message.
      if (password.value !== repeatPassword.value ) {

         valid = false;
         this.setErrorFor(password, 'Passwords does not match.');
         this.setErrorFor(repeatPassword, 'Passwords does not match.');

      }

      // If the password length is less than 6 or greater than 12, set "valid" to false and show an error message.
      if (password.value.length < 6 || password.value.length > 12) {

         valid = false;
         this.setErrorFor(password, 'Password must be beetween 6 and 12 characters.');

      }

      return valid;
   }

   isValidFields() {

      let valid = true;

      // Remove any existing error messages.
      for (let errorText of this.form.querySelectorAll('.error-text')) {
         errorText.remove();
      }

      // Iterate over each input element with the class "validate".
      for (let field of this.form.querySelectorAll('.validate')) {
         // Get the label text for the input element.
         const label = field.previousElementSibling.innerText;
         if (!field.value) {
            // If the input element value is empty, set "valid" to false and show an error message.
            this.setErrorFor(field, `"${label}" cannot be blank.`);
            valid = false;
         }
         
         // If the input element has the class "cpf", validate the value as a CPF and set "valid" to false if it is invalid.
         if (field.classList.contains('cpf')) {
            if (!this.validateCPF(field)) valid = false;
         }

         // If the input element has the class "user", validate the value as a username and set "valid" to false if it is invalid.
         if (field.classList.contains('user')) {
            if (!this.validateUser(field)) valid = false;
         }

      }

      return valid;
   }

   validateUser(field) {
      const user = field.value;
      let valid = true;

      // Check if the username is between 3 and 12 characters long
      if (user.length < 3 || user.length > 12) {
         this.setErrorFor(field, 'Username must be between 3 and 12 characters long.');
         valid = false;
      }

      // Check if the username contains only letters and/or numbers
      if (!user.match(/^[a-zA-Z0-9]+$/g)) {
         this.setErrorFor(field, 'Username must only contain letters and/or numbers.');
         valid = false;
      }

      return valid;
   }

   validateCPF(field) {
      // Create a new instance of the ValidateCpf class passing the field value as a parameter
      const cpf = new ValidateCpf(field.value);

      // Check if the CPF is valid using the validate method of the ValidateCpf class
      if (!cpf.validate()) {
         this.setErrorFor(field, 'Invalid CPF.');
         return false;
      }

      return true;
   }

   setErrorFor(field, message) {
      // Create a new div element to hold the error message.
      const div = document.createElement('div');
      div.innerHTML = message;

      // Add a class to the div for styling purposes.
      div.classList.add('error-text');

      // Insert the div after the form field in the DOM
      field.insertAdjacentElement('afterend', div);
   }
}

// Create a new instance of the ValidateForm class, which will attach a submit event listener to the form and handle form validation
const validate = new ValidateForm();
