const titles={dashboard:"行銷成效總覽",channels:"渠道成效分析",campaigns:"行銷活動管理",line:"LINE 通知中心",connections:"串接設定"};
const navs=[...document.querySelectorAll(".nav")],pages=[...document.querySelectorAll(".page")];
function showPage(id){pages.forEach(p=>p.classList.toggle("active",p.id===id));navs.forEach(n=>n.classList.toggle("active",n.dataset.page===id));document.querySelector("#pageTitle").textContent=titles[id];document.querySelector(".sidebar").classList.remove("open");window.scrollTo({top:0,behavior:"smooth"});}
navs.forEach(n=>n.addEventListener("click",()=>showPage(n.dataset.page)));
document.querySelectorAll("[data-page-jump]").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.pageJump)));
document.querySelector(".menu").addEventListener("click",()=>document.querySelector(".sidebar").classList.toggle("open"));
const toast=document.querySelector(".toast");let timer;
function notify(message){toast.textContent=message;toast.classList.add("show");clearTimeout(timer);timer=setTimeout(()=>toast.classList.remove("show"),2600)}
document.querySelectorAll("[data-toast]").forEach(b=>b.addEventListener("click",()=>notify(b.dataset.toast)));
document.querySelector("#dateRange").addEventListener("change",e=>notify("已切換至「"+e.target.value+"」示範資料"));
document.querySelector("#searchCampaign").addEventListener("input",e=>{const q=e.target.value.trim();document.querySelectorAll(".campaign-row[data-name]").forEach(r=>r.style.display=r.dataset.name.includes(q)?"grid":"none")});
document.querySelector("#testLine").addEventListener("click",()=>{notify("LINE 測試通知已模擬發送");document.querySelector(".sent").textContent="剛剛發送 · 示範預覽"});
const dialog=document.querySelector("#connectDialog"),modalTitle=document.querySelector("#modalTitle");let selectedSource="";
document.querySelectorAll("[data-source]").forEach(b=>b.addEventListener("click",()=>{selectedSource=b.dataset.source;modalTitle.textContent="安排「"+selectedSource+"」";dialog.showModal()}));
document.querySelector("#confirmPlan").addEventListener("click",()=>setTimeout(()=>notify(selectedSource+" 已加入串接清單"),50));
document.querySelectorAll(".rule input").forEach(i=>i.addEventListener("change",()=>notify(i.checked?"通知規則已啟用":"通知規則已暫停")));
if("registerTool" in navigator){navigator.registerTool({name:"open_connection_settings",description:"開啟行銷數據平台串接設定頁",inputSchema:{type:"object",properties:{}},execute:async()=>{showPage("connections");return{content:[{type:"text",text:"已開啟串接設定頁"}]};}})}
