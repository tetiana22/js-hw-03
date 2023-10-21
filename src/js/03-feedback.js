import throttle from 'lodash.throttle';

 const form = document.querySelector('.feedback-form');
  
 let formState = {};
 const STORAGE_KEY = "feedback-form-state";

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onTextareaInput, 500));

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formState);
  let formState = {};
};

function onTextareaInput(evt) {
  formState[evt.target.name] = evt.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
};

window.addEventListener('DOMContentLoaded', () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return;
  formState = JSON.parse(data);
  Object.entries(formState).forEach(([key, val]) => {
    form.elements[key].value = val;
  });
} catch (error) {
    console.log(error.message);

};
});



