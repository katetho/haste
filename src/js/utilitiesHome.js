export default function utilities() {
    let accountName = document.getElementsByClassName("fullname")[0];
    let signOut = document.getElementsByClassName("signout")[0];
    accountName.innerHTML = atob(localStorage.un) || ''; //decode from base64
    signOut.onclick = function() {
        localStorage.clear();
        sessionStorage.clear();
    }
}
