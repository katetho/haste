!function(){let e=document.getElementsByClassName("d-block"),t=document.getElementsByClassName("collapse show");for(let t=0;t<e.length;t++)e[t].addEventListener("click",(function(){this.classList.toggle("active");let e=this.nextElementSibling;n(e),setTimeout(l,0,e)}));function l(e){"0px"!==e.style.height?e.style.height="0px":(e.style.display="block",e.style.height=e.scrollHeight+"px")}function n(e){"0px"!==e.style.height&&(e.style.height=e.scrollHeight+"px")}window.addEventListener("resize",(function(){for(let e=0;e<t.length;e++)"0px"!==t[e].style.height&&(t[e].style.height="auto")}))}();let dropDowns=document.getElementsByClassName("nav-link"),navbarSide=document.getElementsByClassName("navbar-nav")[0],pageTopBtn=document.getElementById("sidebarToggleTop"),pageTop=document.getElementById("page-top");pageTopBtn.onclick=function(){pageTop.classList.toggle("sidebar-toggled"),navbarSide.classList.toggle("toggled")};for(let e=0;e<dropDowns.length;e++)dropDowns[e].addEventListener("click",showToggle);function showToggle(e){let t=e.currentTarget;t.classList.toggle("show"),t.nextElementSibling&&t.nextElementSibling.classList.toggle("show"),t["aria-expanded"]=!t["aria-expanded"]}function Ticket(e,t,l,n,s){this.title=e,this.department=t,this.priority=l,this.deadline=n,this.description=s}function postTicket(e){let t=new XMLHttpRequest;t.open("POST","http://localhost:3002/tickets",!0),t.setRequestHeader("Content-Type","application/json"),t.responseType="document",t.onload=function(){if(200==this.status){let e=this.response;document.getElementsByClassName("collapsable-section")[0].innerHTML=e.getElementsByClassName("collapsable-section")[0].innerHTML}},t.send(JSON.stringify(e))}!function(){let e=document.getElementsByClassName("new-ticket")[0],t=document.getElementsByClassName("bg-modal")[0],l=document.getElementsByClassName("modal-contents")[0],n=document.getElementsByClassName("close-bg-modal")[0],s=document.getElementsByTagName("main")[0],o=document.getElementsByClassName("ticket-form")[0],i=document.getElementsByClassName("submit")[0],a=document.getElementById("deadline"),c=document.getElementsByClassName("tooltiptext")[0];function d(){let e=l.getBoundingClientRect().width,t=l.getBoundingClientRect().height;scrollTo({top:l.offsetTop-t/5,left:l.offsetLeft-e/5,behavior:"smooth"})}i.onclick=function(e){let l=o.querySelectorAll("input, select, textarea"),n=l[0],i=0;for(let e of l)if(""===e.value)e.style.borderColor="red";else if(i++,e.style.borderColor="#CFD8DC",i===l.length){let e=[];for(let t of l){let l=t.value;"description"!==t.id&&"title"!==t.id||(l=l.slice(0,1).toUpperCase()+l.slice(1,l.length)),e.push(l)}n.value.length>35?(n.style.borderColor="red",c.style.opacity=1):(postTicket(new Ticket(...e)),t.style.display="none",s.className="")}},e.onclick=function(){c.style.opacity=0,t.style.display="flex",s.className="blur",d()},window.onresize=function(){d()},n.onclick=function(){t.style.display="none",s.className=""},a.onfocus=function(){this.type="date"},a.onblur=function(){this.type="text"},localStorage.setItem("Modified",document.lastModified)}();