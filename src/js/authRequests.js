export default function postAuth(userCredentials) {
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
        console.log(JSON.parse(xhr.response))
        //tooltip+red border
      }
      if(xhr.status===422) { //missing data
        console.log(JSON.parse(xhr.response))
        //tooltip+red border
      }
    }
    return username;
  }
