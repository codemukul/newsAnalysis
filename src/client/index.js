import { postInputValue, getData } from './js/requests';
import { handleSubmit, handleChange, inputChecker, updateUI, displayWarn } from './js/formHandler';

import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';

// console.log('CHANGE!!');

const btn = document.getElementById('btn');
const input_data = document.getElementById('input');
const input_form = document.getElementById('form');

input_data.addEventListener('click', handleChange);

input_form.addEventListener('submit', handleSubmit);

export { postInputValue, getData };
export { handleSubmit, handleChange, inputChecker, updateUI, displayWarn };