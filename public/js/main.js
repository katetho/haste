function Ticket(e,t,s,n,l){this.title=e,this.department=t,this.priority=s,this.deadline=n,this.description=l}function getTickets(){let e=new XMLHttpRequest;e.open("GET","http://localhost:3002/",!0),e.send(),e.onreadystatechange=function(){if(200==this.status&&4==this.readyState){let e=this.responseText,t=(new DOMParser).parseFromString(e,"text/html");document.getElementsByClassName("collapsable-section")[0].innerHTML=t.getElementsByClassName("collapsable-section")[0].innerHTML}}}function postTicket(e){let t=new XMLHttpRequest;return t.open("POST","http://localhost:3002/tickets",!0),t.setRequestHeader("Content-Type","application/json"),t.onreadystatechange=function(){if(200==this.status&&4==this.readyState){let e=this.responseText,t=(new DOMParser).parseFromString(e,"text/html");document.getElementsByClassName("collapsable-section")[0].innerHTML=t.getElementsByClassName("collapsable-section")[0].innerHTML}},t.send(JSON.stringify(e)),this.responseText}!function(){let e=document.getElementsByClassName("d-block"),t=document.getElementsByClassName("collapse show");for(let t=0;t<e.length;t++)e[t].addEventListener("click",(function(){this.classList.toggle("active");let e=this.nextElementSibling;n(e),setTimeout(s,0,e)}));function s(e){"0px"!==e.style.height?e.style.height="0px":(e.style.display="block",e.style.height=e.scrollHeight+"px")}function n(e){"0px"!==e.style.height&&(e.style.height=e.scrollHeight+"px")}window.addEventListener("resize",(function(){for(let e=0;e<t.length;e++)"0px"!==t[e].style.height&&(t[e].style.height="auto")}))}(),function(){let e=document.getElementsByClassName("new-ticket")[0],t=document.getElementsByClassName("bg-modal")[0],s=document.getElementsByClassName("modal-contents")[0],n=document.getElementsByClassName("close-bg-modal")[0],l=document.getElementsByTagName("main")[0],o=document.getElementsByClassName("ticket-form")[0],i=document.getElementsByClassName("submit")[0],a=document.getElementById("deadline");function c(){let e=s.getBoundingClientRect().width,t=s.getBoundingClientRect().height;scrollTo({top:s.offsetTop-t/5,left:s.offsetLeft-e/5,behavior:"smooth"})}i.onclick=async function(e){let s=o.querySelectorAll("input, select, textarea"),n=0;for(let e of s)if(""===e.value)e.style.borderColor="red";else if(n++,e.style.borderColor="#CFD8DC",n===s.length){let e=[];for(let t of s)e.push(t.value);await postTicket(new Ticket(...e));t.style.display="none",l.className=""}},e.onclick=function(){t.style.display="flex",l.className="blur",c()},window.onresize=function(){c()},n.onclick=function(){t.style.display="none",l.className=""},a.onfocus=function(){this.type="date"},a.onblur=function(){this.type="text"},localStorage.setItem("Modified",document.lastModified)}();