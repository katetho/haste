!function(){let e=document.getElementsByClassName("d-block"),t=document.getElementsByClassName("collapse show");for(let t=0;t<e.length;t++)e[t].addEventListener("click",(function(){this.classList.toggle("active");let e=this.nextElementSibling;s(e),setTimeout(l,0,e)}));function l(e){"0px"!==e.style.height?e.style.height="0px":(e.style.display="block",e.style.height=e.scrollHeight+"px")}function s(e){"0px"!==e.style.height&&(e.style.height=e.scrollHeight+"px")}window.addEventListener("resize",(function(){for(let e=0;e<t.length;e++)"0px"!==t[e].style.height&&(t[e].style.height="auto")}))}(),function(){let e=document.getElementsByClassName("btn-icon-split")[0],t=document.getElementsByClassName("bg-modal")[0],l=document.getElementsByClassName("close-bg-modal")[0],s=document.getElementsByTagName("main")[0],n=document.getElementsByClassName("ticket-form")[0];document.getElementsByClassName("submit")[0].onclick=function(e){let t=n.querySelectorAll("input, select, textarea"),l=0;for(let e of t)if(""===e.value)e.style.borderColor="red";else if(l++,e.style.borderColor="#CFD8DC",l===t.length)for(let e of t)console.log(e.value)},e.onclick=function(){t.style.display="flex",s.className="blur"},l.onclick=function(){t.style.display="none",s.className=""}}();