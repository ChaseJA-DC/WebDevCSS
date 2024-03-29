"use strict";




function processAccordion() {
    document.addEventListener('DOMContentLoaded', (): void => {
        // Modal functionality
        document.querySelectorAll('[data-toggle="modal"]').forEach((trigger: Element) => {
            trigger.addEventListener('click', (): void => {
                const modalId: string | null = trigger.getAttribute('data-target');
                if (modalId) {
                    const modal: HTMLElement | null = document.querySelector(modalId);
                    if (modal) {
                        modal.style.display = "flex";
                    }
                }
            });
        });

        document.querySelectorAll('.close-button').forEach((button: Element) => {
            button.addEventListener('click', (): void => {
                const modal: HTMLElement | null = button.closest('.modal');
                if (modal) {
                    modal.style.display = "none";
                }
            });
        });

        window.onclick = (event: MouseEvent): void => {
            const target: HTMLElement = event.target as HTMLElement;
            if (target.classList.contains('modal')) {
                target.style.display = "none";
            }
        };


        // Accordion functionality
        const accordionBtns: NodeListOf<Element> = document.querySelectorAll('.accordion_container .accordion .header');
        const accordionBodys: NodeListOf<Element> = document.querySelectorAll('.accordion_container .accordion .body');

        accordionBtns.forEach((accordionBtn: Element): void => {
            accordionBtn.addEventListener('click', function(this: Element): void {
                processAccordion(this);
            });
        });

        function processAccordion(x: Element): void {
            setHeightToZero();

            const nextSibling: HTMLElement = x.nextElementSibling as HTMLElement;
            if (nextSibling && nextSibling.offsetHeight > 0) {
                nextSibling.style.height = '0px';
                x.closest('.accordion')?.classList.remove('active');
            } else {
                nextSibling.style.height = `${nextSibling.scrollHeight + 30}px`;
                x.closest('.accordion')?.classList.add('active');
            }
        }

        function setHeightToZero(): void {
            accordionBodys.forEach((accordionBody: Element): void => {
                const body: HTMLElement = accordionBody as HTMLElement;
                body.style.height = '0px';
                body.closest('.accordion')?.classList.remove('active');
            });
        }
    });
}

(function(){

    /**
     * Binds click, mouseover and mouseout events to anchor tags with class 'link' and a matching data attribute
     * Applies CSS changes for visual feedback and handles link activation on click
     * @param link
     */
    function AddLinkEvents(link:string):void{

        let linkQuery = $(`a.link[data=${link}]`);

        linkQuery.off("click");
        linkQuery.off("mouseover");
        linkQuery.off("mouseout");

        linkQuery.css("text-decoration", "underline");
        linkQuery.css("color", "blue");

        linkQuery.on("click", function() {
            LoadLink(`${link}`);
        });

        linkQuery.on("mouseover", function() {
           $(this).css("cursor", "pointer");
           $(this).css("font-weight", "bold");
        });

        linkQuery.on("mouseout", function() {
           $(this).css("font-weight", "normal");
        });

    }

    /**
     * Sets up event listeners for navigation links found within the list items of unsorted lists
     * Removes any existing click and mouseover events before adding new ones to control navigation behanviour and
     * visual cue.
     * @returns {void}
     */
    function AddNavigationEvents():void{

        let navLinks = $("ul>li>a"); //find all navigation links

        navLinks.off("click");
        navLinks.off("mouseover");

        navLinks.on("click", function() {
            LoadLink($(this).attr("data") as string);
        });

        navLinks.on("mouseover", function() {
           $(this).css("cursor", "pointer");
        });
    }

    /**
     * Updates the application current active link, manages authentication and updates the browser history and page title
     * It also updates navigation UI to reflect the current active link and loads the corresponding content
     * @param link
     * @param data
     * @returns {void}
     */
    function LoadLink(link:string, data:string = ""):void{

        router.ActiveLink = link;
        AuthGuard();
        router.LinkData = data;

        history.pushState( {}, "", router.ActiveLink);

        document.title = capitalizeFirstCharacter(router.ActiveLink);

        $("ul>li>a").each( function() {
           $(this).removeClass("active");
        });

        $(`li>a:contains(${document.title})`).addClass("active");

        LoadContent();
    }

     function AuthGuard() {
         let protected_route = ["contact-list"];

         if(protected_route.indexOf(router.ActiveLink)>-1) {
             if (!sessionStorage.getItem("user")) {
                 router.ActiveLink = "login";
             }
         }
     }

    function CheckLogin() {

        if(sessionStorage.getItem("user")){
            $("#login").html(`<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`)
        }

        $("#logout").on("click", function () {
            sessionStorage.clear();

            $("#login").html(`<a class="nav-link" data="login"><i class="fas fa-sign-in-alt"></i> Login</a>`)

            AddNavigationEvents();
            LoadLink("login")
        });

    }

    function ContactFormValidation() {
        ValidateField("#fullName",  /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-Z][a-z]+))*$/, "Please enter a valid event name");
        ValidateField("#contactNumber", /^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date (YYYY-MM-DD)");
        ValidateField("#emailAddress", /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i, "Please enter a valid time (HH:MM AM/PM)");
    }



    /**
     * This function validate input form text field
     * @param input_field_id
     * @param regular_expression
     * @param error_message
     */
    function ValidateField(input_field_id:string, regular_expression:RegExp, error_message:string){

        let messageArea  = $("#messageArea").hide();

        $(input_field_id).on("blur", function () {
            //fail validation
            let inputFieldText = $(this).val() as string;
            if(!regular_expression.test(inputFieldText)){
               //pattern fails
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }else{
                //pass validation
                messageArea.removeAttr("class").hide();
            }
        });
    }
    function AddContact(fullName:string, contactNumber:string, emailAddress:string){
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize()){
            let key = contact.fullName.substring(0,1) + Date.now();
            localStorage.setItem(key, contact.serialize() as string);
        }
    }

    function DisplayHomePage(){
        console.log("Called DisplayHomePage()");
        textSlider();
    }

    function DisplayProductPage(){
        console.log("Called DisplayProductPage()");
    }
    function DisplayPortfolioPage(){
        console.log("Called DisplayPortfolioPage()");
    }
    function DisplayAboutUsPage(){
        console.log("Called DisplayAboutUsPage()");
    }

    function DisplayServicePage(){
        console.log("Called DisplayServicePage()");
        FetchStatistics();
    }


    function DisplayContactUsPage(){
        console.log("Called DisplayContactUsPage()");

        $("a[data='contact-list']").off("click");
        $("a[data='contact-list']").on("click", function() {
            LoadLink("contact-list");
        });

        ContactFormValidation();

        let sendButton = document.getElementById("sendButton") as HTMLElement;
        let subscribeCheckbox = document.getElementById("subscribeCheckbox") as HTMLInputElement;

        sendButton.addEventListener("click", function () {

            let fullName:string = document.forms[0].fullName.value;
            let contactNumber:string = document.forms[0].contactNumber.value;
            let emailAddress:string = document.forms[0].emailAddress.value;

            if(subscribeCheckbox.checked){
                AddContact(fullName, contactNumber, emailAddress);
            }
        });
    }

    function DisplayContactListPage(){
        console.log("Called DisplayContactListPage()");

        if(localStorage.length > 0 ){
            let contactList = document.getElementById("contactList") as HTMLElement;
            let data = "";

            let keys = Object.keys(localStorage);
            let index = 1;

            for(const key of keys){
                let contactData = localStorage.getItem(key) as string;
                let contact:core.Contact = new core.Contact();
                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center">${index}</th>
                         <td>${contact.fullName}</td>
                         <td>${contact.contactNumber}</td>
                         <td>${contact.emailAddress}</td>
                         <td class="text-center">
                            <button value="${key}" class="btn btn-primary btn-sm edit">
                                 <i class="fas fa-edit fa-sm"> Edit</i>
                            </button>
                         </td>
                         <td class="text-center">
                            <button value="${key}" class="btn btn-danger btn-sm delete">
                                 <i class="fas fa-trash-alt fa-sm"> Delete</i>
                            </button>
                        </td>
                        </tr>`;
                index++;
            }
            contactList.innerHTML = data;
        }

        $("#addButton").on("click", () => {
             LoadLink("edit", "add");
        });

        $("button.edit").on("click", function () {
             LoadLink("edit", $(this).val() as string);
        });

        $("button.delete").on("click",  function (){
            if(confirm("Delete Contact, Please confirm")){
                localStorage.removeItem( $(this).val() as string);
            }
            LoadLink("contact-list");
        });

    }

    function DisplayEditPage(){
        console.log("DisplayEdit Page Called ...");

        ContactFormValidation();

        //let page = location.hash.substring(1);
        let page = router.LinkData;

        switch(page){
            case "add":
                 // add contact chosen
                $("main>h1").text("Add Contact");
                $("#editButton").html(`<i class="fas fa-plus-circle fa-sm"/> Add`);

                $("#editButton").on("click", (event) => {
                      //prevent form submission
                      event.preventDefault();
                      let fullName:string = document.forms[0].fullName.value;
                      let contactNumber:string = document.forms[0].contactNumber.value;
                      let emailAddress:string = document.forms[0].emailAddress.value;

                      AddContact(fullName, contactNumber, emailAddress);
                      LoadLink("contact-list");
                });

                $("#cancelButton").on("click", () => {
                    LoadLink("contact-list");
                 });
                break;

            default:
                //edit contact chosen
                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page) as string);

                //pre-populate form
                $("#fullName").val(contact.fullName);
                $("#contactNumber").val(contact.contactNumber);
                $("#emailAddress").val(contact.emailAddress);

                $("#editButton").on("click", (event) => {
                    //prevent form submission
                    event.preventDefault();
                    contact.fullName = $("#fullName").val() as string;
                    contact.contactNumber = $("#contactNumber").val() as string;
                    contact.emailAddress = $("#emailAddress").val() as string;

                    localStorage.setItem(page, contact.serialize() as string);
                    LoadLink("contact-list");
                });

                $("#cancelButton").on("click", () => {
                    LoadLink("contact-list");
                });

                break
        }
    }

    function DisplayLoginPage(){
        console.log("Called DisplayLoginPage()");

        let messageArea = $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click", function () {

            let success = false;
            let newUser = new core.User();

            $.get( "./data/users.json", function(data) {

                for(const user of data.users){
                    console.log(user);

                    let username:string = document.forms[0].username.value;
                    let password:string = document.forms[0].password.value;

                    if(username === user.Username && password === user.Password){
                        success = true;
                        newUser.fromJSON(user);
                        break;
                    }
                }

                if(success){
                    sessionStorage.setItem("user", newUser.serialize() as string);
                    messageArea.removeAttr("class").hide();
                    LoadLink("contact-list");
                }else{

                    $("#username").trigger("focus").trigger("select");
                    messageArea
                        .addClass("alert alert-danger")
                        .text("Error: Invalid Login Credentials")
                        .show();
                }
            });
        });

        $("#cancelButton").on("click", function() {
            document.forms[0].reset();
            LoadLink("home");
        });

    }
    async function FetchStatistics() {
        try {
            const response = await fetch('./data/statistics.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            DisplayStatistics(data.visitors);
        } catch (error) {
            console.error('Error fetching visitor statistics:', error);
            const statsElement = document.getElementById('statistics');
            if (statsElement) {
                statsElement.textContent = 'Failed to load statistics.';
            }
        }
    }

// DisplayStatistics function with null checks
    function DisplayStatistics(visitors: any[]) {
        const container = document.getElementById('statistics');
        if (container) {
            container.innerHTML = ''; // Clear the container before adding new statistics
            visitors.forEach(visitor => {
                const entry = document.createElement('p');
                entry.textContent = `Date: ${visitor.date}, Visits: ${visitor.visits}`;
                container.appendChild(entry);
            });
        }
    }

//
    function DisplayRegisterPage(){
        console.log("Called DisplayRegisterPage()");
        AddLinkEvents("login");
    }

    function Display404Page(){
        console.log("Called Display404Page()");
    }

    function ActiveLinkCallback() : Function{
        switch(router.ActiveLink){
            case "home": return DisplayHomePage;
            case "about": return DisplayAboutUsPage;
            case "services": return DisplayServicePage;
            case "products": return DisplayProductPage;
            case "portfolio": return DisplayPortfolioPage;
            case "contact": return DisplayContactUsPage;
            case "contact-list": return DisplayContactListPage;
            case "login": return DisplayLoginPage;
            case "register": return DisplayRegisterPage;
            case "edit": return DisplayEditPage;
            case "404": return Display404Page;
            default:
                console.error("ERROR callback does not exist " + router.ActiveLink);
                return new Function();
        }
    }

    function capitalizeFirstCharacter(str:string){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function LoadHeader() {
        $.get("./views/components/header.html", function(html_data){
            $("header").html(html_data);
            document.title = capitalizeFirstCharacter(router.ActiveLink);

            $(`li>a:contains(${document.title})`).addClass("active").attr("aria-current", "page");
            AddNavigationEvents();
            CheckLogin();
        });
    }

    function LoadContent(){
        let page_name = router.ActiveLink;
        let callback = ActiveLinkCallback();

        $.get(`./views/content/${page_name}.html`, function(html_data){
            $("main").html(html_data);
            CheckLogin();
            callback();
        });
    }
    const lightbox = document.createElement('div')
    lightbox.id = 'lightbox'
    document.body.appendChild(lightbox)

    const images = document.querySelectorAll('img')
    images.forEach(image => {
        image.addEventListener('click', e => {
            lightbox.classList.add('active')
            const img = document.createElement('img')
            img.src = image.src
            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild)
            }
            lightbox.appendChild(img)
        })
    })

    lightbox.addEventListener('click', e => {
        if (e.target !== e.currentTarget) return
        lightbox.classList.remove('active')
    })
    function LoadFooter(){
        $.get("./views/components/footer.html", function(html_data){
            $("footer").html(html_data);

            $(`li>a:contains(${document.title})`).addClass("active").attr("aria-current", "page");
            AddNavigationEvents();
            CheckLogin();
        });
    }
    function textSlider(): void {
        const hiddenSocial = document.getElementById("hidden-social");
        const hiddenSocialInfo = document.querySelector(".hidden-social-info") as HTMLElement;
        const exploreButton = document.querySelector(".ExploreBtn") as HTMLElement;

        if (hiddenSocial && hiddenSocialInfo && exploreButton) {
            // Check if hidden-social is already visible
            if (hiddenSocial.style.display === "none") {
                hiddenSocial.style.display = "block";
                hiddenSocial.style.animation = "1s slide-right forwards";
                exploreButton.style.display = "none";

                // Slide in hidden-social-info
                hiddenSocialInfo.style.bottom = "50%";
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
    }

// Attach the function to the window object to ensure it's globally accessible
    (window as any).textSlider = textSlider;

    function Start(){
        console.log("App Started");

        LoadHeader();
        LoadLink("home");
        LoadFooter();

    }
    window.addEventListener("load", Start);

})()