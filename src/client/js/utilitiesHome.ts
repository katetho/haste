export default function utilities() {
    let accountName: HTMLElement = document.querySelector('.fullname');
    let signOut: HTMLElement =  document.querySelector('.signout');
    accountName.innerHTML = atob(localStorage.un) || ''; //decode from base64
    signOut.onclick = function() {
        localStorage.clear();
        sessionStorage.clear();
    }
}
