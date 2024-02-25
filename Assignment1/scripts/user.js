"use strict";

(function (core){

    class User{

        constructor(displayName = "", contactNumber = "", emailAddress = "") {
            this._displayName = displayName;
            this._emailAddress = emailAddress;
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
            return `DisplayName: ${this._displayName}\n Contact Number ${this._contactNumber}\n 
                EmailAddress: ${this._emailAddress}`
        }

        /**
         Serialize for writing to localStorage
         */
        serialize(){
            if(this._displayName !== "" && this._emailAddress !== "" && this._username !== ""){
                return `${this._displayName}, ${this.emailAddress}, ${this._username}`;
            }
            console.error("One or more of the Contact properties is missing or invalid");
            return null;
        }

        /**
         * Deserialize is used to read data from localStorage
         */
        deserialize(data){
            let propertyArray =  data.split(",");
            this._displayName = propertyArray[0];
            this._emailAddress = propertyArray[1];
            this._username = propertyArray[2];
        }

        toJSON(){
            return {
                DisplayName : this._displayName,
                EmailAddress: this._emailAddress,
                UserName: this._username,
                Password : this.Password
            }
        }

        fromJSON(data){
            this._displayName = data.DisplayName;
            this._emailAddress = data.EmailAddress;
            this._username = data.UserName;
            this._password = data.Password;
        }
    }

core.User = User;
})(core || (core = {}) );