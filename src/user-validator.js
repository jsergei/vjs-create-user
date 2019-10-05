import { Utils } from './utils';

export class UserValidator {
    constructor(formEl, usernameEl, emailEl, passwordEl, confirmPasswordEl) {
        this._formEl = formEl;
        this._usernameEl = usernameEl;
        this._emailEl = emailEl;
        this._passwordEl = passwordEl;
        this._confirmPasswordEl = confirmPasswordEl;

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

        this._password = {
            firstLetter: false,
            contains2Digits: false,
            containsUppercaseLetter: false,
            lettersAndDigitsOnly: false,
            lengthRange: false,
            valid: false,
            active: false
        };
        this._passwordCallback = () => {};

        this._confirmPassword = {
            match: false,
            passwordRules: false,
            valid: false,
            active: false
        };
        this._confirmPasswordCallback = () => {};
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

        this._registerValidationEvents(this._passwordEl,
            isActive => {
                this._password = {...this._password, active: isActive};
                this._passwordCallback.call(null, this._password);
            },
            this._validatePassword.bind(this));
        this._validatePassword();

        this._registerValidationEvents(this._confirmPasswordEl,
            isActive => {
                this._confirmPassword = {...this._confirmPassword, active: isActive};
                this._validateConfirmPassword();
                this._confirmPasswordCallback.call(null, this._confirmPassword);
            },
            this._validateConfirmPassword.bind(this));
        this._validateConfirmPassword();

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

    onPasswordChange(callback) {
        this._passwordCallback = callback;
    }

    onConfirmPasswordChange(callback) {
        this._confirmPasswordCallback = callback;
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
            active: !this._username.active
                && !this._email.active
                && !this._password.active
                && !this._confirmPassword.active
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

    _validatePassword() {
        const value = this._passwordEl.value;
        const validity = this._passwordEl.validity;

        const newPassword = {
            firstLetter: /^[a-zA-Z].*$/.test(value),
            contains2Digits: /^.(?=.*[0-9]{2,}).*$/.test(value),
            containsUppercaseLetter: /^.(?=.*[A-Z]+).*$/.test(value),
            lettersAndDigitsOnly: /^[a-zA-Z0-9]+$/.test(value),
            lengthRange: !validity.valueMissing && !validity.tooShort && !validity.tooLong,
            valid: validity.valid,
            active: this._password.active
        };

        if (Utils.hasDirectChildChanges(this._password, newPassword)) {
            this._password = newPassword;
            this._passwordCallback.call(null, this._password);
        }
    }

    _validateConfirmPassword() {
        const passwordValue = this._passwordEl.value;
        const confirmPasswordValue = this._confirmPasswordEl.value;

        if (passwordValue === confirmPasswordValue) {
            this._confirmPasswordEl.setCustomValidity('');
        } else {
            this._confirmPasswordEl.setCustomValidity('no match');
        }

        const validity = this._confirmPasswordEl.validity;

        let newConfirmPassword = {
            match: !validity.valueMissing && passwordValue === confirmPasswordValue,
            passwordRules: !validity.valueMissing
                && !validity.tooShort
                && !validity.tooLong
                && !validity.patternMismatch,
            valid: validity.valid,
            active: this._confirmPassword.active
        };

        if (Utils.hasDirectChildChanges(this._confirmPassword, newConfirmPassword)) {
            this._confirmPassword = newConfirmPassword;
            this._confirmPasswordCallback.call(null, this._confirmPassword);
        }
    }
}
