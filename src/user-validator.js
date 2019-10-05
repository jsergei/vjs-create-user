import { Utils } from './utils';

export class UserValidator {
    constructor(formEl, usernameEl, emailEl) {
        this._formEl = formEl;
        this._usernameEl = usernameEl;
        this._emailEl = emailEl;

        this._form = {
            valid: false,
            active: false
        };
        this._formCallback = () => {};

        this._username = {
            firstSymbol: false,
            following3Symbols: false,
            remainingAny: false,
            lengthRange: false,
            valid: false,
            active: false
        };
        this._usernameCallback = () => {};

        this._email = {
            valid: false,
            active: false
        };
        this._emailCallback = () => {};
    }

    init() {
        this._registerValidationEvents(this._usernameEl,
            isActive => {
                this._username = {...this._username, active: isActive};
                this._usernameCallback.call(null, this._username);
            },
            this._validateUsername.bind(this));
        this._validateUsername();

        this._registerValidationEvents(this._emailEl,
            isActive => {
                this._email = {...this._email, active: isActive};
                this._emailCallback.call(null, this._email);
            },
            this._validateEmail.bind(this));
        this._validateEmail();

        this._validateForm();
    }

    onFormChange(callback) {
        this._formCallback = callback;
    }

    onUsernameChange(callback) {
        this._usernameCallback = callback;
    }

    onEmailChange(callback) {
        this._emailCallback = callback;
    }

    _registerValidationEvents(controlEl, activator, validator) {
        controlEl.addEventListener('focus', () => {
            activator.call(this, true);
            this._validateForm();
        });

        controlEl.addEventListener('blur', () => {
            activator.call(this, false);
            this._validateForm();
        });

        controlEl.addEventListener('input', () => {
            validator.call(this);
            this._validateForm();
        });
    }

    _validateForm() {
        let newForm = {
            valid: this._formEl.checkValidity(),
            active: !this._username.active && !this._email.active
        };
        if (Utils.hasDirectChildChanges(this._form, newForm)) {
            this._form = newForm;
            this._formCallback.call(null, this._form);
        }
    }

    _validateUsername() {
        const value = this._usernameEl.value;
        const validity = this._usernameEl.validity;
        const newUsername = {
            firstSymbol: /^[a-zA-Z_].*$/.test(value),
            following3Symbols: /^.(?=[a-zA-Z]{3,}).*$/.test(value),
            remainingAny: /^.{4,4}[a-zA-Z0-9-_\.]*$/.test(value),
            lengthRange: !validity.valueMissing && !validity.tooShort && !validity.tooLong,
            valid: validity.valid,
            active: this._username.active
        };
        if (Utils.hasDirectChildChanges(this._username, newUsername)) {
            this._username = newUsername;
            this._usernameCallback.call(null, this._username);
        }
    }

    _validateEmail() {
        const validity = this._emailEl.validity;
        let newEmail = {
            valid: validity.valid,
            active: this._email.active
        };
        if (Utils.hasDirectChildChanges(this._email, newEmail)) {
            this._email = newEmail;
            this._emailCallback.call(null, this._email);
        }
    }
}
