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

const formEl = document.querySelector('form');
const noselectValContent = document.querySelector('.validation-content__noselect');

const usernameEl = document.getElementById('username');
const usernameValContent = document.querySelector('.validation-content__username');

const emailEl = document.getElementById('email');
const emailValContent = document.querySelector('.validation-content__email');

const noselectRenderer = new NoselectRenderer(noselectValContent);
const usernameRenderer = new UsernameRenderer(usernameEl, usernameValContent);
const emailRenderer = new EmailRenderer(emailEl, emailValContent);

const userValidator = new UserValidator(formEl, usernameEl, emailEl);
userValidator.onFormChange(validationState => noselectRenderer.render(validationState));
userValidator.onUsernameChange(validationState => usernameRenderer.render(validationState));
userValidator.onEmailChange(validationState => emailRenderer.render(validationState));
userValidator.init();
