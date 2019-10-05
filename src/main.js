// css
import '../styles/main.scss';

// icons
import '../icons/question_mark.png';
import '../icons/validation-tick-valid.png';
import '../icons/validation-tick-invalid.png';

import { NoselectRenderer } from './noselect-renderer';
import { UserValidator } from './user-validator';
import { UsernameRenderer } from './username-renderer';
import { EmailRenderer } from './email-renderer';
import { PasswordRenderer } from './password-renderer';
import { ConfirmPasswordRenderer } from './confirm-password-renderer';

const formEl = document.querySelector('form');
const noselectValContent = document.querySelector('.validation-content__noselect');

const usernameEl = document.getElementById('username');
const usernameValContent = document.querySelector('.validation-content__username');

const emailEl = document.getElementById('email');
const emailValContent = document.querySelector('.validation-content__email');

const passwordEl = document.getElementById('password');
const passwordValContent = document.querySelector('.validation-content__password');

const confirmPasswordEl = document.getElementById('confirmPassword');
const confirmPasswordValContent = document.querySelector('.validation-content__confirm-password');

const noselectRenderer = new NoselectRenderer(noselectValContent);
const usernameRenderer = new UsernameRenderer(usernameEl, usernameValContent);
const emailRenderer = new EmailRenderer(emailEl, emailValContent);
const passwordRenderer = new PasswordRenderer(passwordEl, passwordValContent);
const confirmPasswordRenderer = new ConfirmPasswordRenderer(confirmPasswordEl, confirmPasswordValContent);

const userValidator = new UserValidator(formEl, usernameEl, emailEl, passwordEl, confirmPasswordEl);
userValidator.onFormChange(validationState => noselectRenderer.render(validationState));
userValidator.onUsernameChange(validationState => usernameRenderer.render(validationState));
userValidator.onEmailChange(validationState => emailRenderer.render(validationState));
userValidator.onPasswordChange(validationState => passwordRenderer.render(validationState));
userValidator.onConfirmPasswordChange(validationState => confirmPasswordRenderer.render(validationState));
userValidator.init();
