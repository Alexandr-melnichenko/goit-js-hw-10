import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{i as r}from"./assets/vendor-BbbuE1sJ.js";let s=document.querySelector('input[type="number"][name="delay"]');const d=document.querySelector("button"),l=document.querySelectorAll('input[type="radio"][name="state"]'),u=document.querySelector(".form");let t=0,o="";s.addEventListener("input",()=>{const e=Number(s.value);return!isNaN(e)&&e>=0?t=e:t=0,t});l.forEach(e=>{e.addEventListener("click",m)});function m(){for(let e=0;e<l.length;e++)if(l[e].checked){o=l[e].value;break}return console.log("selected radio:",o),o}function p(e){if(e.preventDefault(),!o||!t){r.show({message:"⚠️ Please select a state (fulfilled/rejected) and fill delay input",position:"topCenter",color:"yellow"});return}let i=t,n=o;u.reset(t=0,o=""),new Promise((c,a)=>{console.log("promise delay:",i),console.log("promise radio:",n),setTimeout(()=>{n==="fulfilled"?c():n==="rejected"&&a()},i)}).then(()=>{r.show({message:`✅ Fulfilled promise in ${i}ms`,position:"topCenter",color:"green"})}).catch(()=>{r.show({message:`❌ Rejected promise in ${i}ms`,position:"topCenter",color:"red"})})}d.addEventListener("click",p);
//# sourceMappingURL=2-snackbar.js.map
