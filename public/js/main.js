!function(){let e=document.getElementsByClassName("d-block"),t=document.getElementsByClassName("collapse show");for(let t=0;t<e.length;t++)e[t].addEventListener("click",(function(){this.classList.toggle("active");let e=this.nextElementSibling;n(e),setTimeout(l,0,e)}));function l(e){"0px"!==e.style.height?e.style.height="0px":(e.style.display="block",e.style.height=e.scrollHeight+"px")}function n(e){"0px"!==e.style.height&&(e.style.height=e.scrollHeight+"px")}window.addEventListener("resize",(function(){for(let e=0;e<t.length;e++)"0px"!==t[e].style.height&&(t[e].style.height="auto")}))}(),function(){let e=document.getElementsByClassName("new-ticket")[0],t=document.getElementsByClassName("bg-modal")[0],l=document.getElementsByClassName("modal-contents")[0],n=document.getElementsByClassName("close-bg-modal")[0],o=document.getElementsByTagName("main")[0],s=document.getElementsByClassName("ticket-form")[0],i=document.getElementsByClassName("submit")[0],c=document.getElementById("deadline");i.onclick=function(e){let t=s.querySelectorAll("input, select, textarea"),l=0;for(let e of t)if(""===e.value)e.style.borderColor="red";else if(l++,e.style.borderColor="#CFD8DC",l===t.length)for(let e of t)console.log(e.value)},e.onclick=function(){t.style.display="flex",o.className="blur";let e=l.getBoundingClientRect().width,n=l.getBoundingClientRect().height;scrollTo({top:l.offsetTop-n/5,left:l.offsetLeft-e/5,behavior:"smooth"})},n.onclick=function(){t.style.display="none",o.className=""},c.onfocus=function(){this.type="date"},c.onblur=function(){this.type="text"}}();