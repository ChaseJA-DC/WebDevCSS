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


    document.getElementById("loadMore").addEventListener("click", loadProjects);

    // Initial load
    loadProjects();
    function DisplayHomePage() {
        console.log("Called DisplayHomePage()");
        let ExploreBtn = document.getElementById("ExploreBtn");
        let AboutUsSection = document.getElementById("AboutUsSection");


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
        }



    }
    window.addEventListener("load", Start);


})()