// css
import '../styles/main.scss';

// icons
import '../icons/question_mark.png';
import '../icons/validation-tick-valid.png';
import '../icons/validation-tick-invalid.png';

import { UsernameValidator } from './validation';

const usernameEl = document.getElementById('username');
const usernameValContent = document.querySelector('.validation-content__username');
let usernameValidator = new UsernameValidator(usernameEl, usernameValContent);

usernameValidator.init();