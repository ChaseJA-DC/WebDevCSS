"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function processAccordion() {
    document.addEventListener('DOMContentLoaded', function () {
        // Modal functionality
        document.querySelectorAll('[data-toggle="modal"]').forEach(function (trigger) {
            trigger.addEventListener('click', function () {
                var modalId = trigger.getAttribute('data-target');
                if (modalId) {
                    var modal = document.querySelector(modalId);
                    if (modal) {
                        modal.style.display = "flex";
                    }
                }
            });
        });
        document.querySelectorAll('.close-button').forEach(function (button) {
            button.addEventListener('click', function () {
                var modal = button.closest('.modal');
                if (modal) {
                    modal.style.display = "none";
                }
            });
        });
        window.onclick = function (event) {
            var target = event.target;
            if (target.classList.contains('modal')) {
                target.style.display = "none";
            }
        };
        // Accordion functionality
        var accordionBtns = document.querySelectorAll('.accordion_container .accordion .header');
        var accordionBodys = document.querySelectorAll('.accordion_container .accordion .body');
        accordionBtns.forEach(function (accordionBtn) {
            accordionBtn.addEventListener('click', function () {
                processAccordion(this);
            });
        });
        function processAccordion(x) {
            var _a, _b;
            setHeightToZero();
            var nextSibling = x.nextElementSibling;
            if (nextSibling && nextSibling.offsetHeight > 0) {
                nextSibling.style.height = '0px';
                (_a = x.closest('.accordion')) === null || _a === void 0 ? void 0 : _a.classList.remove('active');
            }
            else {
                nextSibling.style.height = "".concat(nextSibling.scrollHeight + 30, "px");
                (_b = x.closest('.accordion')) === null || _b === void 0 ? void 0 : _b.classList.add('active');
            }
        }
        function setHeightToZero() {
            accordionBodys.forEach(function (accordionBody) {
                var _a;
                var body = accordionBody;
                body.style.height = '0px';
                (_a = body.closest('.accordion')) === null || _a === void 0 ? void 0 : _a.classList.remove('active');
            });
        }
    });
}
(function () {
    /**
     * Binds click, mouseover and mouseout events to anchor tags with class 'link' and a matching data attribute
     * Applies CSS changes for visual feedback and handles link activation on click
     * @param link
     */
    function AddLinkEvents(link) {
        var linkQuery = $("a.link[data=".concat(link, "]"));
        linkQuery.off("click");
        linkQuery.off("mouseover");
        linkQuery.off("mouseout");
        linkQuery.css("text-decoration", "underline");
        linkQuery.css("color", "blue");
        linkQuery.on("click", function () {
            LoadLink("".concat(link));
        });
        linkQuery.on("mouseover", function () {
            $(this).css("cursor", "pointer");
            $(this).css("font-weight", "bold");
        });
        linkQuery.on("mouseout", function () {
            $(this).css("font-weight", "normal");
        });
    }
    /**
     * Sets up event listeners for navigation links found within the list items of unsorted lists
     * Removes any existing click and mouseover events before adding new ones to control navigation behanviour and
     * visual cue.
     * @returns {void}
     */
    function AddNavigationEvents() {
        var navLinks = $("ul>li>a"); //find all navigation links
        navLinks.off("click");
        navLinks.off("mouseover");
        navLinks.on("click", function () {
            LoadLink($(this).attr("data"));
        });
        navLinks.on("mouseover", function () {
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
    function LoadLink(link, data) {
        if (data === void 0) { data = ""; }
        router.ActiveLink = link;
        AuthGuard();
        router.LinkData = data;
        history.pushState({}, "", router.ActiveLink);
        document.title = capitalizeFirstCharacter(router.ActiveLink);
        $("ul>li>a").each(function () {
            $(this).removeClass("active");
        });
        $("li>a:contains(".concat(document.title, ")")).addClass("active");
        LoadContent();
    }
    function AuthGuard() {
        var protected_route = ["contact-list"];
        if (protected_route.indexOf(router.ActiveLink) > -1) {
            if (!sessionStorage.getItem("user")) {
                router.ActiveLink = "login";
            }
        }
    }
    function CheckLogin() {
        if (sessionStorage.getItem("user")) {
            $("#login").html("<a id=\"logout\" class=\"nav-link\" href=\"#\"><i class=\"fas fa-sign-out-alt\"></i> Logout</a>");
        }
        $("#logout").on("click", function () {
            sessionStorage.clear();
            $("#login").html("<a class=\"nav-link\" data=\"login\"><i class=\"fas fa-sign-in-alt\"></i> Login</a>");
            AddNavigationEvents();
            LoadLink("login");
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
    function ValidateField(input_field_id, regular_expression, error_message) {
        var messageArea = $("#messageArea").hide();
        $(input_field_id).on("blur", function () {
            //fail validation
            var inputFieldText = $(this).val();
            if (!regular_expression.test(inputFieldText)) {
                //pattern fails
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else {
                //pass validation
                messageArea.removeAttr("class").hide();
            }
        });
    }
    function AddContact(fullName, contactNumber, emailAddress) {
        var contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize()) {
            var key = contact.fullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }
    function DisplayHomePage() {
        console.log("Called DisplayHomePage()");
        textSlider();
    }
    function DisplayProductPage() {
        console.log("Called DisplayProductPage()");
    }
    function DisplayPortfolioPage() {
        console.log("Called DisplayPortfolioPage()");
    }
    function DisplayAboutUsPage() {
        console.log("Called DisplayAboutUsPage()");
    }
    function DisplayServicePage() {
        console.log("Called DisplayServicePage()");
        FetchStatistics();
    }
    function DisplayContactUsPage() {
        console.log("Called DisplayContactUsPage()");
        $("a[data='contact-list']").off("click");
        $("a[data='contact-list']").on("click", function () {
            LoadLink("contact-list");
        });
        ContactFormValidation();
        var sendButton = document.getElementById("sendButton");
        var subscribeCheckbox = document.getElementById("subscribeCheckbox");
        sendButton.addEventListener("click", function () {
            var fullName = document.forms[0].fullName.value;
            var contactNumber = document.forms[0].contactNumber.value;
            var emailAddress = document.forms[0].emailAddress.value;
            if (subscribeCheckbox.checked) {
                AddContact(fullName, contactNumber, emailAddress);
            }
        });
    }
    function DisplayContactListPage() {
        console.log("Called DisplayContactListPage()");
        if (localStorage.length > 0) {
            var contactList = document.getElementById("contactList");
            var data = "";
            var keys = Object.keys(localStorage);
            var index = 1;
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                var contactData = localStorage.getItem(key);
                var contact = new core.Contact();
                contact.deserialize(contactData);
                data += "<tr><th scope=\"row\" class=\"text-center\">".concat(index, "</th>\n                         <td>").concat(contact.fullName, "</td>\n                         <td>").concat(contact.contactNumber, "</td>\n                         <td>").concat(contact.emailAddress, "</td>\n                         <td class=\"text-center\">\n                            <button value=\"").concat(key, "\" class=\"btn btn-primary btn-sm edit\">\n                                 <i class=\"fas fa-edit fa-sm\"> Edit</i>\n                            </button>\n                         </td>\n                         <td class=\"text-center\">\n                            <button value=\"").concat(key, "\" class=\"btn btn-danger btn-sm delete\">\n                                 <i class=\"fas fa-trash-alt fa-sm\"> Delete</i>\n                            </button>\n                        </td>\n                        </tr>");
                index++;
            }
            contactList.innerHTML = data;
        }
        $("#addButton").on("click", function () {
            LoadLink("edit", "add");
        });
        $("button.edit").on("click", function () {
            LoadLink("edit", $(this).val());
        });
        $("button.delete").on("click", function () {
            if (confirm("Delete Contact, Please confirm")) {
                localStorage.removeItem($(this).val());
            }
            LoadLink("contact-list");
        });
    }
    function DisplayEditPage() {
        console.log("DisplayEdit Page Called ...");
        ContactFormValidation();
        //let page = location.hash.substring(1);
        var page = router.LinkData;
        switch (page) {
            case "add":
                // add contact chosen
                $("main>h1").text("Add Contact");
                $("#editButton").html("<i class=\"fas fa-plus-circle fa-sm\"/> Add");
                $("#editButton").on("click", function (event) {
                    //prevent form submission
                    event.preventDefault();
                    var fullName = document.forms[0].fullName.value;
                    var contactNumber = document.forms[0].contactNumber.value;
                    var emailAddress = document.forms[0].emailAddress.value;
                    AddContact(fullName, contactNumber, emailAddress);
                    LoadLink("contact-list");
                });
                $("#cancelButton").on("click", function () {
                    LoadLink("contact-list");
                });
                break;
            default:
                //edit contact chosen
                var contact_1 = new core.Contact();
                contact_1.deserialize(localStorage.getItem(page));
                //pre-populate form
                $("#fullName").val(contact_1.fullName);
                $("#contactNumber").val(contact_1.contactNumber);
                $("#emailAddress").val(contact_1.emailAddress);
                $("#editButton").on("click", function (event) {
                    //prevent form submission
                    event.preventDefault();
                    contact_1.fullName = $("#fullName").val();
                    contact_1.contactNumber = $("#contactNumber").val();
                    contact_1.emailAddress = $("#emailAddress").val();
                    localStorage.setItem(page, contact_1.serialize());
                    LoadLink("contact-list");
                });
                $("#cancelButton").on("click", function () {
                    LoadLink("contact-list");
                });
                break;
        }
    }
    function DisplayLoginPage() {
        console.log("Called DisplayLoginPage()");
        var messageArea = $("#messageArea");
        messageArea.hide();
        $("#loginButton").on("click", function () {
            var success = false;
            var newUser = new core.User();
            $.get("./data/users.json", function (data) {
                for (var _i = 0, _a = data.users; _i < _a.length; _i++) {
                    var user = _a[_i];
                    console.log(user);
                    var username = document.forms[0].username.value;
                    var password = document.forms[0].password.value;
                    if (username === user.Username && password === user.Password) {
                        success = true;
                        newUser.fromJSON(user);
                        break;
                    }
                }
                if (success) {
                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttr("class").hide();
                    LoadLink("contact-list");
                }
                else {
                    $("#username").trigger("focus").trigger("select");
                    messageArea
                        .addClass("alert alert-danger")
                        .text("Error: Invalid Login Credentials")
                        .show();
                }
            });
        });
        $("#cancelButton").on("click", function () {
            document.forms[0].reset();
            LoadLink("home");
        });
    }
    function FetchStatistics() {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_1, statsElement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch('./data/statistics.json')];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        DisplayStatistics(data.visitors);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error fetching visitor statistics:', error_1);
                        statsElement = document.getElementById('statistics');
                        if (statsElement) {
                            statsElement.textContent = 'Failed to load statistics.';
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    // DisplayStatistics function with null checks
    function DisplayStatistics(visitors) {
        var container = document.getElementById('statistics');
        if (container) {
            container.innerHTML = ''; // Clear the container before adding new statistics
            visitors.forEach(function (visitor) {
                var entry = document.createElement('p');
                entry.textContent = "Date: ".concat(visitor.date, ", Visits: ").concat(visitor.visits);
                container.appendChild(entry);
            });
        }
    }
    //
    function DisplayRegisterPage() {
        console.log("Called DisplayRegisterPage()");
        AddLinkEvents("login");
    }
    function Display404Page() {
        console.log("Called Display404Page()");
    }
    function ActiveLinkCallback() {
        switch (router.ActiveLink) {
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
    function capitalizeFirstCharacter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function LoadHeader() {
        $.get("./views/components/header.html", function (html_data) {
            $("header").html(html_data);
            document.title = capitalizeFirstCharacter(router.ActiveLink);
            $("li>a:contains(".concat(document.title, ")")).addClass("active").attr("aria-current", "page");
            AddNavigationEvents();
            CheckLogin();
        });
    }
    function LoadContent() {
        var page_name = router.ActiveLink;
        var callback = ActiveLinkCallback();
        $.get("./views/content/".concat(page_name, ".html"), function (html_data) {
            $("main").html(html_data);
            CheckLogin();
            callback();
        });
    }
    var lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);
    var images = document.querySelectorAll('img');
    images.forEach(function (image) {
        image.addEventListener('click', function (e) {
            lightbox.classList.add('active');
            var img = document.createElement('img');
            img.src = image.src;
            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild);
            }
            lightbox.appendChild(img);
        });
    });
    lightbox.addEventListener('click', function (e) {
        if (e.target !== e.currentTarget)
            return;
        lightbox.classList.remove('active');
    });
    function LoadFooter() {
        $.get("./views/components/footer.html", function (html_data) {
            $("footer").html(html_data);
            $("li>a:contains(".concat(document.title, ")")).addClass("active").attr("aria-current", "page");
            AddNavigationEvents();
            CheckLogin();
        });
    }
    function textSlider() {
        var hiddenSocial = document.getElementById("hidden-social");
        var hiddenSocialInfo = document.querySelector(".hidden-social-info");
        var exploreButton = document.querySelector(".ExploreBtn");
        if (hiddenSocial && hiddenSocialInfo && exploreButton) {
            // Check if hidden-social is already visible
            if (hiddenSocial.style.display === "none") {
                hiddenSocial.style.display = "block";
                hiddenSocial.style.animation = "1s slide-right forwards";
                exploreButton.style.display = "none";
                // Slide in hidden-social-info
                hiddenSocialInfo.style.bottom = "50%";
            }
            else {
                hiddenSocial.style.animation = "1s slide-left forwards";
                setTimeout(function () {
                    hiddenSocial.style.display = "none";
                    exploreButton.style.display = "block";
                    // Slide out hidden-social-info
                    hiddenSocialInfo.style.bottom = "-100%";
                }, 1000);
            }
        }
    }
    // Attach the function to the window object to ensure it's globally accessible
    window.textSlider = textSlider;
    function Start() {
        console.log("App Started");
        LoadHeader();
        LoadLink("home");
        LoadFooter();
    }
    window.addEventListener("load", Start);
})();
