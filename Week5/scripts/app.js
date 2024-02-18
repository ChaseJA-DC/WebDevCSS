"use strict";

(function(){

    function CheckLogin(){

        if(sessionStorage.getItem("user")){
            $("#login").html(`<a class="nav-link" href="login.html"><i class="fa-solid fa-sign-in-alt"></i>Log Out</a>`)
        }

        $("#login").on("click", function(){
            sessionStorage.clear();
            location.href = "login.html";
        });
    }

    function LoadHeader(html_data) {
        $("header").html(html_data);
        $('li>a:contains(${document.title})').addClass("active")
        CheckLogin();
    }

    function AjaxRequest(method, url, callback){
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.addEventListener("readystatechange", () => {
            if(xhr.readyState === 4 && xhr.status === 200) {
                if (typeof callback == "function") {
                    callback(xhr.responseText);
                } else {
                    console.error("Callback is not a function");
                }
            }
        });
        xhr.send();
    }
    function ContactFormValidation(){

        ValidateField("#fullName",/^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,"Please enter a valid first and last name")
        ValidateField("#contactNumber",/^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,"Please enter a valid phone number")
        ValidateField("#emailAddress",/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,"Please enter a valid email address")



    }
    /*
    * This function validates input for text fields
    * @param input_field_id
    * @param regular_expression
    * @param error_message
    * */
    function ValidateField(input_field_id, regular_expression, error_message) {

        let messageArea = $("#messageArea").hide();

        // Fixed regex to properly match full names, accounting for initials, hyphens, and spaces

        $(input_field_id).on("blur", function() {
            let inputFieldText = $(this).val();
            if (!regular_expression.test(inputFieldText)) {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            } else {
                messageArea.removeAttr("class");
                messageArea.hide();
            }s
        });
    }


    function DisplayHomePage(){
        console.log("Called DisplayHomePage()");

        $("#AboutUsBtn").on("click", () => {
            location.href = "about.html";
        });
        $("main").append('<p id="MainParagraph" class="mt-3">This is my first paragraph</p>');
        $("body").append('<article class="container"><p id="ArticleParagraph" class="mt-3">This is my article paragraph</p></article>');
    }

    function DisplayProductPage(){
        console.log("Called DisplayProductPage()");
    }

    function DisplayAboutUsPage(){
        console.log("Called DisplayAboutUsPage()");
    }

    function DisplayServicePage(){
        console.log("Called DisplayServicePage()");
    }

    function DisplayContactUsPage(){
        console.log("Called DisplayContactUsPage()");

        ContactFormValidation();

        let sendButton = document.getElementById("submitButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");

        sendButton.addEventListener("click", function (){

            if(subscribeCheckbox.checked){
                let contact = new Contact(fullName.value, contactNumber.value, emailAddress.value);
                if(contact.serialize()){
                   let key = contact.fullName.substring(0,1) + Date.now();
                   localStorage.setItem(key, contact.serialize());
                }
            }

        });

    }
    function DisplayContactListPage(){
        console.log("Called DisplayContactListPage()");

        if(localStorage.length > 0){

            let contactList = document.getElementById("contactList");
            let data = "";

            let keys = Object.keys(localStorage);
            let index = 1;

            for(const key of keys){
                let contactData = localStorage.getItem(key);
                let contact = new core.Contact(); // Ensure this is the correct way to instantiate your Contact class
                contact.deserialize(contactData);
                data += `<tr>
                        <th scope="row" class="text-center">${index}</th>
                        <td>${contact.fullName}</td>
                        <td>${contact.contactNumber}</td>
                        <td>${contact.emailAddress}</td>
                        <td>
                            <button class="btn btn-primary edit-btn" data-key="${key}"><i class="fas fa-edit"></i> Edit</button>
                        </td>
                        <td>
                            <button class="btn btn-danger delete-btn" data-key="${key}"><i class="fas fa-trash-alt"></i> Delete</button>
                        </td>
                    </tr>`;
                index++;
            }
            contactList.innerHTML = data;

            // Add click event listeners for edit and delete buttons
            document.querySelectorAll('.edit-btn').forEach(button => {
                button.addEventListener('click', function() {
                    let key = this.getAttribute('data-key');
                    // Navigate to edit page with key as query parameter
                    window.location.href = `edit.html?edit=${key}`;
                });
            });

            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', function() {
                    let key = this.getAttribute('data-key');
                    // Confirm before deleting
                    if(confirm('Are you sure you want to delete this contact?')) {
                        localStorage.removeItem(key);
                        // Refresh the contact list to reflect the deletion
                        DisplayContactListPage();
                    }
                });
            });
        } else {
            contactList.innerHTML = "<tr><td colspan='6' class='text-center'>No contacts found</td></tr>";
        }
    }
    function DisplayEditPage() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const contactKey = urlParams.get('edit');

        if (contactKey) {
            let contactData = localStorage.getItem(contactKey);
            let contact = new core.Contact(); // Access the Contact class using core.Contact
            contact.deserialize(contactData); // Ensure you have a method to parse the string back to a Contact object

            // Populate form fields
            document.getElementById('fullName').value = contact.fullName;
            document.getElementById('contactNumber').value = contact.contactNumber;
            document.getElementById('emailAddress').value = contact.emailAddress;

            // Listen for form submission
            document.getElementById('contact-form').addEventListener('submit', function (e) {
                e.preventDefault();

                // Update contact details based on form input
                contact.fullName = document.getElementById('fullName').value;
                contact.contactNumber = document.getElementById('contactNumber').value;
                contact.emailAddress = document.getElementById('emailAddress').value;

                // Serialize and save updated contact back to localStorage
                localStorage.setItem(contactKey, contact.serialize());

                // Redirect to contact list page
                window.location.href = 'contact-list.html';
            });
        }
    }

    function DisplayRegisterPage(){
        console.log("Called DisplayRegisterPage()");

    }
    function DisplayLoginPage(){
        console.log("Called DisplayLoginPage()");

        let messageArea = $("#messageArea").hide();

        $("#loginButton").on("click", function(){
            let success = false;
            let newUser = new core.User();

            let username = $("#username").val(); // Make sure the ID is correct
            let password = $("#password").val(); // Make sure the ID is correct

            $.get("./data/users.json", function(data){
                for (const user of data.users){
                    console.log(user);
                    // Ensure property names match the case in your JSON
                    if(username === user.Username && password === user.Password){
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }

                if(success){
                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttr("class").hide();
                    location.href = "contact-list.html";
                }else{
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Invalid login information").show();
                }
            });
        });

        $("#cancelButton").on("click", function(){

            document.form[0].reset();
            location.href = "index.html";

        });

    }

    function Start(){
        console.log("App Started");
        AjaxRequest("GET","header.html",LoadHeader);
        switch(document.title){
            case "Home":
                DisplayHomePage();
                break;
            case "Our Products":
                DisplayProductPage();
                break;
            case "About Us":
                DisplayAboutUsPage();
                break;
            case "Our Services":
                DisplayServicePage();
                break;
            case "Contact List":
                DisplayContactListPage();
                break;
            case "Contact Us":
                DisplayContactUsPage();
                break;
            case "Register":
                DisplayRegisterPage();
                break;
            case "Login":
                DisplayLoginPage();
                break;
            case "Edit":
                DisplayEditPage();
                break;
        }


    }
    window.addEventListener("load", Start);

})()

