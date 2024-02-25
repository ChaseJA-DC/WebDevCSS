"use strict";
document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('form'); // Select the form

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Form validation
        var fullName = document.getElementById('fullName').value.trim();
        var contactNumber = document.getElementById('contactNumber').value.trim();
        var emailAddress = document.getElementById('emailAddress').value.trim();
        var message = document.getElementById('message').value.trim();

        var isValid = true;
        var errorMessage = "";

        if(fullName === "") {
            errorMessage += "Full Name is required.\n";
            isValid = false;
        }
        if(contactNumber === "") {
            errorMessage += "Contact Number is required.\n";
            isValid = false;
        }
        if(emailAddress === "") {
            errorMessage += "Email Address is required.\n";
            isValid = false;
        } else if(!/\S+@\S+\.\S+/.test(emailAddress)) {
            errorMessage += "Email Address is invalid.\n";
            isValid = false;
        }
        if(message === "") {
            errorMessage += "Message is required.\n";
            isValid = false;
        }

        if (!isValid) {
            alert(errorMessage);
            return;
        }

        // Display thank you message
        alert('Thank you for your message. You will be redirected to the home page in 5 seconds.');

        // Redirect after 5 seconds
        setTimeout(function() {
            window.location.href = 'index.html'; // Replace with your home page URL
        }, 5000);
    });
});

class Contact{

    constructor(fullName = "", contactNumber = "", emailAddress = "") {
        this._fullName = fullName;
        this._contactNumber = contactNumber;
        this._emailAddress = emailAddress;
    }

    get fullName() {
        return this._fullName;
    }

    set fullName(value) {
        this._fullName = value;
    }

    get contactNumber() {
        return this._contactNumber;
    }

    set contactNumber(value) {
        this._contactNumber = value;
    }

    get emailAddress() {
        return this._emailAddress;
    }

    set emailAddress(value) {
        this._emailAddress = value;
    }

    toString() {
        return `FullName: ${this._fullName}\n Contact Number ${this._contactNumber}\n 
                EmailAddress: ${this._emailAddress}`
    }

    /**
      Serialize for writing to localStorage
    */
   serialize(){
       if(this._fullName !== "" && this._contactNumber !== "" && this._emailAddress !== ""){
           return `${this.fullName}, ${this.contactNumber}, ${this.emailAddress}`;
       }
       console.error("One or more of the Contact properties is missing or invalid");
       return null;
   }

    /**
     * Deserialize is used to read data from localStorage
     */
   deserialize(data){
       let propertyArray =  data.split(",");
       this._fullName = propertyArray[0];
       this._contactNumber = propertyArray[1];
       this._emailAddress = propertyArray[2];
   }

}
