export default function postAuth(userCredentials) {
    let fields = document.querySelectorAll('input');
    let username = "";
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/users/signin",true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(userCredentials))
    xhr.onload = function() {
      if(xhr.status===200) {
        username=xhr.response;
        window.location.replace('/')
      }
      if(xhr.status===401) { //user doesn't exist
      let wrong = JSON.parse(xhr.response);
      for (let field of fields) { //or missing[field] for es5
        if (wrong.includes(field.type)) {
            field.style.borderColor = 'red';
            let tooltipTxt = field.parentNode.getAttribute('data');
            field.parentNode.setAttribute('data-tooltip', tooltipTxt);
        }
        else {
            field.parentNode.removeAttribute('data-tooltip');
            field.style.borderColor = '#CFD8DC';
        }
      }
        //tooltip+red border
      }
      if(xhr.status===422) { //missing data
        let missing = JSON.parse(xhr.response);
        for (let field of fields) { //or missing[field] for es5
          if (missing.includes(field.type)) {
              field.style.borderColor = 'red';
          }
          else {
              field.style.borderColor = '#CFD8DC';
          }
        }
        //tooltip+red border
      }
    }
    return username;
  }
