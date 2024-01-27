"use strict";


(function(){

    function DisplayHomePage(){
        console.log("Called DisplayHomePage()");
        let AboutUsButton = document.getElementById("AboutUsBtn")

        AboutUsButton.addEventListener("click", function() {
           location.href = "about.html";
        });

        let MainContent = document.getElementsByTagName("main")[0];
        let MainParagraph = document.createElement("p");

        MainParagraph.setAttribute("id", "MainParagraph" );
        MainParagraph.setAttribute("class", "mt-3" );
        MainParagraph.textContent = "This is my first paragraph";
        MainContent.appendChild(MainParagraph);


        let FirstString = "This is";
        let SecondString = `${FirstString} the main paragraph`;
        MainParagraph.textContent = SecondString;
        MainContent.appendChild(MainParagraph);

        let DocumentBody = document.body;
        let Article = document.createElement("article");
        let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3">This is my article paragraph</p>`;
        Article.setAttribute("class", "container");
        Article.innerHTML = ArticleParagraph;
        DocumentBody.appendChild(Article);
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


    function Start(){
        console.log("App Started");

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