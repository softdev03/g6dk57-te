document.addEventListener('DOMContentLoaded',()=>{
  const singleContactForms = document.querySelectorAll('.single-contact-form');
  singleContactForms.forEach(form=>{
    const openForm = form.querySelector('.open-form');
    const submitButton = form.querySelector('.form-area button');
    const serviceItemsList = form.querySelectorAll('.service-items');
    const closeIcon = form.querySelector('.form-heading img');
    openForm?.addEventListener('click',(e)=>{
      form.classList.add('show');
    });
    const fields = form.querySelectorAll('.field:not(.secondary)');
    submitButton.addEventListener('click',(e)=>{
      e.preventDefault();
      let hasError = false;
      for (const field of fields) {
        if(!checkValidation(field)) {
          hasError = true;
        }
      }
      if(!hasError) {
        form.querySelector('form').submit();
      }
    });
    closeIcon?.addEventListener('click',()=>{
      form.classList.remove('show');
    });
    serviceItemsList.forEach(serviceItemList=>{
      serviceItemList.addEventListener('change',()=>{
        serviceItemsList.forEach(otherServiceItemList=>{
          if(otherServiceItemList !== serviceItemList) {
            otherServiceItemList.selectedIndex = serviceItemList.selectedIndex;
          }
        });
      });
    });
    for (const field of fields) {
      const input = field.querySelector('input');
      input?.addEventListener('change',()=>{
        if(!checkValidation(field)) {
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      }); 
    }
  });
});
const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^(\+?\d{1,2})?[-.\s]?(\(?\d{3}\)?)[-.\s]?\d{3}[-.\s]?\d{4}$/;
  return phoneRegex.test(phone);
}
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
const isValidURL = (domain) => {
  const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,}$/;
  return domainRegex.test(domain);
}
const checkValidation = (field) => {
  const input = field.querySelector('input');
  if(!input) return true; // No input to validate
  if(!field.classList.contains('website') && input.value === '') {
    field.classList.add('error');
    return false;
  } else {
    if(field.classList.contains('website')) {
      if(!isValidURL(input.value) && input.value !== '') {
        field.classList.add('error');
        return false;
      } else {
        field.classList.remove('error');
      }
    } else {
      if(field.classList.contains('phone')) {
        if(!isValidPhoneNumber(input.value)) {
          field.classList.add('error');
          return false;
        } else {
          field.classList.remove('error');
        }
      } else if(field.classList.contains('email')) {
        if(!isValidEmail(input.value)) {
          field.classList.add('error');
          return false;
        } else {
          field.classList.remove('error');
        }
      } else {
        field.classList.remove('error');
      }
    }
  }
  return true;
}