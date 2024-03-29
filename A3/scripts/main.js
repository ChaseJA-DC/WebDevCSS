"use strict";
//Created by Chase Allen - 100897566
//Created on 2024/27/01
/**
 * Function Name: textSlider
 * Description: Toggles the visibility of a hidden social element and animates it.
 */
function textSlider() {
    var hiddenSocial = document.getElementById("hidden-social");
    var hiddenSocialInfo = document.querySelector(".hidden-social-info");
    var exploreButton = document.querySelector(".ExploreBtn");

    // Check if hidden-social is already visible
    if (hiddenSocial.style.display === "none") {
        hiddenSocial.style.display = "block";
        hiddenSocial.style.animation = "1s slide-right forwards";
        exploreButton.style.display = "none";

        // Slide in hidden-social-info
        hiddenSocialInfo.style.bottom = "50%"; // Adjust as needed to position correctly
    } else {
        hiddenSocial.style.animation = "1s slide-left forwards";
        setTimeout(() => {
            hiddenSocial.style.display = "none";
            exploreButton.style.display = "block";

            // Slide out hidden-social-info
            hiddenSocialInfo.style.bottom = "-100%";
        }, 1000);
    }
}
function loadEvents() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../data/events.json', true);
    xhr.onload = function() {
        if (this.status === 200) {
            const events = JSON.parse(this.responseText);
            let output = '';
            events.forEach(function(event) {
                output += `
                    <li>
                        <h3>${event.name}</h3>
                        <p>Date: ${event.date}</p>
                        <p>Location: ${event.location}</p>
                    </li>
                `;
            });
            document.getElementById('eventsList').innerHTML = output;
        } else {
            console.error('Could not load events');
        }
    };
    xhr.send();
}
/**
 * Function Name: createFooterNav
 * Description: Creates and appends a footer navigation element to the body.
 */
(function createFooterNav() {
    document.addEventListener('DOMContentLoaded', () => {
        // Create the footer nav element
        const footerNav = document.createElement('nav');
        footerNav.className = 'footer-nav';
        footerNav.innerHTML = `
        <ul class="nav justify-content-center glass2 ">
            <li class="nav-item">
                <a class="nav-link" href="privacypolicy.html">Privacy Policy</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="tos.html">Terms of Service</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="contact.html">Contact</a>
            </li>
        </ul>
    `;

        // Append the footer nav to the body
        document.body.appendChild(footerNav);
    });

    /**
     * Function Name: updateNavbar
     * Description: Updates the navbar by adding a 'Careers' link and changing 'Blog' to 'News'.
     */
    document.addEventListener('DOMContentLoaded', () => {
        // Locate the navbar
        const navbar = document.querySelector('.navbar-nav');

        // Create the 'Careers' link element
        const careersLink = document.createElement('li');
        careersLink.className = 'nav-item';
        careersLink.innerHTML = '<a class="nav-link" href="careers.html"><i class="fa-solid fa-briefcase"></i> Careers</a>';

        // Append the 'Careers' link to the navbar
        navbar.appendChild(careersLink);

        // Find and update the 'Blog' link to 'News'
        const blogLink = navbar.querySelector('a[href="blog.html"]');
        if (blogLink) {
            blogLink.innerHTML = '<i class="fa-solid fa-newspaper"></i> News';
        }

        // Check if the user is signed in and update the navbar link accordingly
        const userLoggedIn = sessionStorage.getItem("user");
        if (userLoggedIn) {
            // Create the 'Logout' link element
            const logoutLink = document.createElement('li');
            logoutLink.className = 'nav-item';
            logoutLink.innerHTML = '<a class="nav-link" href="#"><i class="fa-solid fa-sign-out-alt"></i> Logout</a>';

            // Add click event listener to logout link
            logoutLink.addEventListener('click', () => {
                // Clear user session
                sessionStorage.clear();
                // Redirect to login page after logout
                location.href = "login.html";
            });

            // Append the 'Logout' link to the navbar
            navbar.appendChild(logoutLink);
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        // Locate the navbar
        const navbar = document.querySelector('.navbar-nav');

        // Create the logout link element
        const logoutLink = document.createElement('li');
        logoutLink.className = 'nav-item';
        logoutLink.innerHTML = '<a class="nav-link" href="#"><i class="fa-solid fa-sign-out-alt"></i> Logout</a>';

        // Add click event listener to logout link
        logoutLink.addEventListener('click', () => {
            // Clear user session
            sessionStorage.clear();
            // Redirect to login page after logout
            location.href = "login.html";
        });

        // Append the logout link to the navbar
        navbar.appendChild(logoutLink);
    });

    /**
     * Function Name: toggleReadMore
     * Description: Toggles the visibility of additional content when clicking "Read More" links.
     */
    $(document).ready(function () {
        $(".read-more-btn").click(function () {
            $(this).siblings(".additional-content").toggle();
        });
    });
    /// Get all "Read More" links
    const readMoreLinks = document.querySelectorAll('.read-more');

    // Add click event listener to each link
    readMoreLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Toggle the visibility of the full article content
            const article = link.parentElement;
            const fullContent = article.querySelector('.full-content');
            fullContent.classList.toggle('visible');

            // Change the link text based on visibility
            if (fullContent.classList.contains('visible')) {
                link.textContent = 'Read Less';
            } else {
                link.textContent = 'Read More';
            }
        });
    });
    /**
     * Function Name: toggleModal
     * Description: Toggles the display of modal elements.
     */
    document.addEventListener('DOMContentLoaded', () => {
        // Open modal
        document.querySelectorAll('[data-toggle="modal"]').forEach(trigger => {
            trigger.addEventListener('click', () => {
                const modalId = trigger.getAttribute('data-target');
                const modal = document.querySelector(modalId);
                modal.style.display = "flex";
            });
        });

        // Close modal
        document.querySelectorAll('.close-button').forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal');
                modal.style.display = "none";
            });
        });

        // Close modal when clicking outside of it
        window.onclick = function (event) {
            if (event.target.classList.contains('modal')) {
                event.target.style.display = "none";
            }
        };
    });

    let accordion_btns  = document.querySelectorAll('.accordion_container .accordion .header'),
        accordion_bodys = document.querySelectorAll('.accordion_container .accordion .body');

    if(accordion_btns && accordion_bodys)
    {
        accordion_btns = Array.isArray(accordion_btns) ? accordion_btns : Object.values(accordion_btns);
        accordion_btns.forEach(accordion_btn=>{
            accordion_btn.addEventListener('click', function(){
                process_accordion(this);
            });
        });

        function process_accordion(x) {
            set_height_0();

            let next_sibling = x.nextElementSibling;
            if(next_sibling.offsetHeight>0)
            {
                next_sibling.style.height = '0px';
                x.closest('.accordion').classList.remove('active');
            } else {
                next_sibling.style.height = next_sibling.scrollHeight+30+'px';
                x.closest('.accordion').classList.add('active');
            }
        }

        function set_height_0() {
            accordion_bodys = Array.isArray(accordion_bodys) ? accordion_bodys : Object.values(accordion_bodys);
            accordion_bodys.forEach(accordion_body=>{
                accordion_body.style.height = '0px';
                accordion_body.closest('.accordion').classList.remove('active');
            });
        }
    }

    //Create a function for click events with variables for different buttons and logic

    let currentProjects = 0;
    const projectsPerLoad = 3; // Number of projects to load each time
    const allProjects = [
        { title: "Blog Platform", description: "A simple blog where users can create,edit and delete blog posts.", imageUrl: "image1.jpg" },
        { title: "Weather App", description: "An application that displays real-time weather information based on the user's location", imageUrl: "image2.jpg" },
        { title: "E-Commerce Storefront", description: "A mock e-commerce website with product listings and a shopping cart.", imageUrl: "image3.jpg" },
        { title: "Interactive Quiz App", description: "An interactive web-based quiz application", imageUrl: "image3.jpg" },
        { title: "Event Planner Tool", description: "An event planning tool that allows users to create and manage events.", imageUrl: "image3.jpg" },
        { title: "Restaurant Reservation System", description: "A web application for a fictional restaurant that allows customers to make online reservations.", imageUrl: "image3.jpg" },

    ];

    function createProjectCard(project, index) {
        const card = document.createElement("div");
        card.className = "project-card glass fade-in";
        card.style.marginBottom = "40px";
        card.style.marginTop = "10px";

        // Determine the FontAwesome icon class based on the project type
        let iconClass;
        switch (project.title) {
            case "Blog Platform":
                iconClass = "fa-solid fa-blog";
                break;
            case "Weather App":
                iconClass = "fa-solid fa-cloud";
                break;
            case "E-Commerce Storefront":
                iconClass = "fa-solid fa-store";
                break;
            case "Interactive Quiz App":
                iconClass = "fa-solid fa-question";
                break;
            case "Event Planner Tool":
                iconClass = "fa-solid fa-calendar";
                break;
            case "Restaurant Reservation System":
                iconClass = "fa-solid fa-utensils";
                break;
            // Add more cases for other projects with their corresponding icons
            default:
                iconClass = "fa-solid fa-circle-question"; // Default icon if none match
        }

        card.innerHTML = `
        <h3>${project.title}</h3>
        <br>
        <i class="${iconClass} icon"></i>
        <p>${project.description}</p>
    `;
        return card;
    }

    /**
     * Function Name: loadProjects
     * Description: Loads a set number of projects onto a web page.
     */
    function loadProjects() {
        // Get a reference to the "portfolio" HTML element
        const portfolio = document.getElementById("portfolio");

        // Calculate the total number of projects to load on this call
        const totalLoad = Math.min(currentProjects + projectsPerLoad, allProjects.length);

        // Loop through the projects to be loaded
        for (; currentProjects < totalLoad; currentProjects++) {
            // Create a project card element for the current project and append it to the "portfolio"
            portfolio.appendChild(createProjectCard(allProjects[currentProjects], currentProjects));
        }
    }



    function DisplayHomePage() {
        console.log("Called DisplayHomePage()");
        let ExploreBtn = document.getElementById("ExploreBtn");
        let AboutUsSection = document.getElementById("AboutUsSection");


    }
    function DisplayGalleryPage(){
        console.log("Gallery Page Function Called");
        LightBox();
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
        console.log("Called DisplayContactUdPage()");

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
            let data ="";

            let keys = Object.keys(localStorage);
            let index = 1;

            for(const key of keys){
                let contactData = localStorage.getItem(key);
                let contact = new Contact();
                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center">${index}</th>
                    <td>${contact.fullName}</td>
                    <td>${contact.contactNumber}</td>
                    <td>${contact.emailAddress}</td>
                    <td></td>
                    <td></td>
                    </tr>`;
                index++;
            }
            contactList.innerHTML = data;
        }
    }

    // Main function to determine which page to display based on document title
    // Function to set up the Lightbox feature
    function initializeLightbox() {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        document.body.appendChild(lightbox);

        // Use a more specific selector if needed to only target gallery images
        const images = document.querySelectorAll('img');
        images.forEach(image => {
            image.addEventListener('click', e => {
                lightbox.classList.add('active');
                const img = document.createElement('img');
                img.src = image.src;
                while (lightbox.firstChild) {
                    lightbox.removeChild(lightbox.firstChild);
                }
                lightbox.appendChild(img);
            });
        });

        lightbox.addEventListener('click', e => {
            if (e.target !== e.currentTarget) return;
            lightbox.classList.remove('active');
        });
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
                        sessionStorage.setItem("username", username);
                        break;
                    }
                }

                if(success){
                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttr("class").hide();
                    location.href = "index.ejs";
                }else{
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Invalid login information").show();
                }
            });
        });

        $("#cancelButton").on("click", function(){

            document.form[0].reset();
            location.href = "index.ejs";

        });

    }
    function Start(){
        console.log("App Started");
        // Switch statement to call the appropriate display function

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
            case "Gallery":
                initializeLightbox();
                break;
            case "Login":
                DisplayLoginPage();
                break;
            case "Portfolio":
                loadProjects();
                break;
        }



    }
    window.addEventListener("load", Start);


})()

// App.js content integrated below
"use strict";

(function(){

    function CheckLogin() {
        const navbar = document.querySelector('.navbar-nav');
        const welcomeMessage = document.getElementById("welcomeMessage");

        if (sessionStorage.getItem("user")) {
            // User is logged in, update navigation bar
            navbar.innerHTML = `
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="index.html"><i class="fa-solid fa-house"></i> Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="portfolio.html"><i class="fa-solid fa-wallet"></i> Portfolio</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="service.html"><i class="fa-solid fa-shop"></i> Services</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="team.html"><i class="fa-solid fa-user-group"></i> Team</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="blog.html"><i class="fa-solid fa-blog"></i> Blog</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="events.html"><i class="fa-solid fa-calendar-days"></i> Events</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="gallery.html"><i class="fa-solid fa-camera"></i> Gallery</a>
            </li>
            <li class="nav-item">
                    <a class="nav-link" href="quote.html"><i class="fa-solid fa-quote-left"></i></i> Quote</a>
            </li>
            <li class="nav-item" id="login">
                <a class="nav-link" href="#"><i class="fa-solid fa-sign-in-alt"></i> Logout</a>
            </li>
        `;
            // Add click event listener to logout link
            const logoutLink = document.querySelector('#login');
            logoutLink.addEventListener('click', () => {
                // Clear user session
                sessionStorage.clear();
                // Redirect to login page after logout
                location.href = "login.html";
            });

            // Display welcome message with the user's name
            const username = sessionStorage.getItem("username");
            if (username) {
                welcomeMessage.textContent = `Welcome, ${username}!`;
            }
        } else {
            // User is not logged in, update navigation bar
            navbar.innerHTML = `
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="index.html"><i class="fa-solid fa-house"></i> Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="portfolio.html"><i class="fa-solid fa-wallet"></i> Portfolio</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="service.html"><i class="fa-solid fa-shop"></i> Services</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="team.html"><i class="fa-solid fa-user-group"></i> Team</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="blog.html"><i class="fa-solid fa-blog"></i> Blog</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="events.html"><i class="fa-solid fa-calendar-days"></i> Events</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="gallery.html"><i class="fa-solid fa-camera"></i> Gallery</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="quote.html"><i class="fa-solid fa-quote-left"></i> Quote</a>
            </li>
            <li class="nav-item" id="login">
                <a class="nav-link" href="login.html"><i class="fa-solid fa-sign-in-alt"></i> Login</a>
            </li>
        `;

            // Clear welcome message
            welcomeMessage.textContent = "";
        }
    }
    function filterEvents() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("searchInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0]; // Assuming you want to search by the first column
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }


    window.addEventListener("load", () => {
        CheckLogin();
    });

    window.addEventListener("load", () => {
        CheckLogin();
    });


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



    function DisplayHomePage(){
        console.log("Called DisplayHomePage()");

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


    function DisplayRegisterPage(){
        console.log("Called DisplayRegisterPage()");

        let sendButton = document.getElementById("submitButton");

        sendButton.addEventListener("click", function (event){
            event.preventDefault(); // Prevent the form from submitting until validation is complete

            if(RegisterFormValidation()) {
                // If form is valid, proceed with submission logic here
                console.log("Form is valid, proceed with submission.");
            } else {
                console.log("Form validation failed, please correct the errors.");
            }
        });
    }

    function ValidateField(input_field_id, regular_expression, error_message) {
        let messageArea = $("#messageArea").hide();

        $(input_field_id).on("blur", function() {
            let inputFieldText = $(this).val();
            if (!regular_expression.test(inputFieldText)) {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            } else {
                messageArea.removeAttr("class").hide();
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
    function DisplayEventsPage() {
        console.log("Called DisplayEventsPage()");
        loadEvents();
        filterEvents();
        searchEvents();
    }
    // Define a JavaScript function to handle form data processing
    function processFormData(formData) {
        // Example: Log the form data to the console
        console.log("Form Data:", formData);
    }

    document.addEventListener("DOMContentLoaded", function() {
        // Event listener for the feedback form submission
        document.getElementById("submitFeedback").addEventListener("click", function() {
            // Prevent the default form submission
            event.preventDefault();

            // Gather the form data
            var formData = {
                rating: document.getElementById("rating").value,
                comments: document.getElementById("comments").value
            };

            // Call the JavaScript function to process the form data
            processFormData(formData);
        });
    });
    function DisplayEditPage() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const contactKey = urlParams.get('edit');

        if (contactKey) {
            let contactData = localStorage.getItem(contactKey);
            let contact = new core.Contact(); // Access the Contact class using core.Contact
            contact.deserialize(contactData); // Ensure you have a method to parse the string back to a Contact object

            // Populate form fields
            document.getElementById('fullName').value = contact.
                fullName;
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
                window.location.href = 'eventplanner.html';
            });
        }
    }
    function RegisterFormValidation() {
        // Validate First Name and Last Name
        ValidateField("#FirstName", /^[A-Za-z\s]+$/, "Please enter a valid first name");
        ValidateField("#lastName", /^[A-Za-z\s]+$/, "Please enter a valid last name");

        // Validate Email Address
        ValidateField("#emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid email address");

        // Validate Password (assuming a general strong password requirement here)
        ValidateField("#password", /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must be at least 8 characters long and contain at least one letter and one number");

        // Confirm Password (this validation would compare the values of password and confirmPassword fields directly)
        ValidateField("#confirmPassword", function(value) {
            return value === $('#password').val();
        }, "Passwords must match");

        // Validate Address (basic non-empty validation, can be expanded based on specific requirements)
        ValidateField("#address", /.+/, "Please enter your address");

        // Validate Phone Number
        ValidateField("#phoneNumber", /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/, "Please enter a valid phone number in the format: 123-456-7890");
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
                    location.href = "index.ejs";
                }else{
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Invalid login information").show();
                }
            });
        });

        $("#cancelButton").on("click", function(){

            document.form[0].reset();
            location.href = "index.ejs";

        });

    }
    function enforceLogin() {
        // Assuming your login page's title is "Login"
        if (!sessionStorage.getItem("user") && document.title !== "Login") {
            // Redirect the user to the login page if not logged in and not already on the login page
            location.href = "login.html";
        }
    }
    function Start(){
        console.log("App Started");
        enforceLogin();
        AjaxRequest("GET","header.html",LoadHeader);
        CheckLogin();

        const username = sessionStorage.getItem("username");

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
                break;
            case "Login":
                DisplayLoginPage();
                break;
            case "Edit":
                DisplayEditPage();
                break;
            case "Register":
                DisplayRegisterPage();
                RegisterFormValidation();
                break;
            case "Events":
                DisplayEventsPage();
                break;
        }
        // Display welcome message with the user's name
        const welcomeMessage = document.getElementById("welcomeMessage");
        if (username) {
            welcomeMessage.textContent = `Welcome, ${username}!`;
        }

    }
    window.addEventListener("load", Start);

})()

