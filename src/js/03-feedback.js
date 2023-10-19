import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea')
};

refs.form.addEventListener('submit', onFormSubmit);
refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
  console.log({ email: '', message: '' });
};

function onTextareaInput(evt) {
  const message = refs.form.elements.message.value;
  const email = refs.form.elements.email.value;
  localStorage.setItem('feedback-form-state', JSON.stringify({ email, message }));
};

window.addEventListener('DOMContentLoaded', () => {
  const savedData = localStorage.getItem('feedback-form-state');
  if (savedData) {
    const { email, message } = JSON.parse(savedData);
    refs.form.elements.email.value = email;
    refs.form.elements.message.value = message;
  }
});


