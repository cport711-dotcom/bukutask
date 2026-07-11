
const categories = [
  {name:"Moving",icon:"📦",count:18},
  {name:"Cleaning",icon:"🧹",count:24},
  {name:"Handyman",icon:"🛠️",count:16},
  {name:"Yard Work",icon:"🌿",count:11},
  {name:"Tech Help",icon:"💻",count:9},
  {name:"Delivery",icon:"🚚",count:13},
  {name:"Furniture Assembly",icon:"🪑",count:8},
  {name:"Event Help",icon:"🎪",count:7},
  {name:"Photography",icon:"📸",count:5},
  {name:"Pet Services",icon:"🐾",count:10},
  {name:"Office Support",icon:"🗂️",count:6},
  {name:"Remote Work",icon:"🌐",count:14}
];

const starterJobs = [
  {id:1,title:"Help move a sofa upstairs",category:"Moving",location:"Houston, TX",budget:75,payType:"Fixed price",date:"Today",workers:2,description:"Need two careful movers to bring a sectional sofa from the garage to a second-floor living room.",verified:true},
  {id:2,title:"Set up home Wi-Fi and printer",category:"Tech Help",location:"Spring, TX",budget:60,payType:"Fixed price",date:"Tomorrow",workers:1,description:"Need help connecting a new router, two smart TVs, and a wireless printer.",verified:true},
  {id:3,title:"Front yard cleanup",category:"Yard Work",location:"Katy, TX",budget:120,payType:"Fixed price",date:"Jul 14",workers:1,description:"Trim shrubs, remove leaves, edge the walkway, and bag all yard debris.",verified:false},
  {id:4,title:"Assemble queen bed frame",category:"Furniture Assembly",location:"Houston, TX",budget:55,payType:"Fixed price",date:"Jul 13",workers:1,description:"New boxed bed frame needs assembly. Please bring basic tools.",verified:true},
  {id:5,title:"Small office deep cleaning",category:"Cleaning",location:"Cypress, TX",budget:180,payType:"Fixed price",date:"Jul 16",workers:2,description:"Clean a 1,400 sq. ft. office including floors, restrooms, break room, and interior glass.",verified:true},
  {id:6,title:"Pickup and deliver dining table",category:"Delivery",location:"Houston, TX",budget:95,payType:"Fixed price",date:"Jul 15",workers:2,description:"Pickup table and six chairs from a furniture store and deliver 11 miles away.",verified:false}
];

const policyCopy = {
  terms: `<span class="eyebrow">Draft policy</span><h2>Terms of Service</h2>
  <p><strong>Important:</strong> This starter policy is not a substitute for legal advice. A licensed attorney should review it before public launch.</p>
  <h3>1. Marketplace role</h3><p>BukuTask provides technology that allows users to post jobs, apply for work, communicate, and review completed job relationships. BukuTask is not an employer, staffing agency, contractor, or guarantor of user performance.</p>
  <h3>2. Eligibility</h3><p>Users must be at least 18 years old, provide accurate information, and have legal authority to enter agreements.</p>
  <h3>3. Independent relationships</h3><p>Users independently decide whether to accept work, the price, schedule, tools, method, and other terms. Users are responsible for licenses, taxes, insurance, and compliance applicable to their work.</p>
  <h3>4. Subscriptions</h3><p>Premium is billed monthly until canceled. Users must receive the price, renewal terms, and cancellation method before purchase. Cancellation must be available through the account or payment provider.</p>
  <h3>5. Prohibited activity</h3><p>Illegal, unsafe, deceptive, exploitative, discriminatory, or unlicensed regulated work is prohibited.</p>
  <h3>6. Reviews</h3><p>Reviews must reflect genuine job relationships. Fake, purchased, retaliatory, or coercive reviews are prohibited.</p>
  <h3>7. Enforcement</h3><p>BukuTask may remove content, restrict features, suspend accounts, preserve evidence, and cooperate with lawful authorities when reasonably necessary.</p>`,
  privacy: `<span class="eyebrow">Draft policy</span><h2>Privacy Policy</h2>
  <p><strong>Important:</strong> This policy must be customized to the final company name, legal entity, vendors, state coverage, retention schedule, and launch features.</p>
  <h3>Information collected</h3><p>Account details, contact information, login-provider identifiers, profile information, job listings, photos, messages, reviews, device information, IP address, approximate location, subscription status, support requests, and verification results.</p>
  <h3>Identity verification</h3><p>Government ID and selfie checks should be handled by a specialized third-party provider. BukuTask should store only the minimum verification result and necessary audit information.</p>
  <h3>How information is used</h3><p>To operate the marketplace, prevent fraud, verify accounts, process subscriptions, moderate content, provide support, comply with law, and improve service reliability.</p>
  <h3>Sharing</h3><p>Information may be shared with authentication, hosting, storage, analytics, fraud-prevention, messaging, payment, and identity-verification providers. BukuTask should not sell sensitive personal information.</p>
  <h3>User choices</h3><p>Users should be able to access, correct, download, or delete account information where required, manage marketing preferences, and submit privacy requests.</p>
  <h3>Retention and security</h3><p>Data should be retained only as long as reasonably necessary for the disclosed purpose, disputes, fraud prevention, tax, accounting, and legal obligations. Reasonable administrative, technical, and physical safeguards should be used.</p>
  <h3>Children</h3><p>BukuTask is intended for adults 18 and older and should not knowingly collect information from children.</p>`,
  community: `<span class="eyebrow">Marketplace rules</span><h2>Community Guidelines</h2>
  <ul><li>Be honest about identity, experience, licenses, job scope, and payment expectations.</li><li>Treat users respectfully. Harassment, threats, hate, intimidation, and discrimination are prohibited.</li><li>Keep private information private. Never post home access codes, government IDs, financial records, or another person's confidential information.</li><li>Use reviews only for genuine job experiences.</li><li>Do not pressure users to move communication off-platform for deceptive purposes.</li><li>Report suspected scams, unsafe conditions, or prohibited listings.</li></ul>`,
  prohibited: `<span class="eyebrow">Safety policy</span><h2>Prohibited Services</h2>
  <ul><li>Illegal goods or services, stolen property, controlled substances, weapons, or explosives.</li><li>Sexual services, exploitation, trafficking, or content involving minors.</li><li>Academic cheating, impersonation, test-taking, forged credentials, or fake documents.</li><li>Hacking, unauthorized access, surveillance, harassment, or identity theft.</li><li>Money forwarding, gift-card payment schemes, check-cashing, or deceptive financial activity.</li><li>Unlicensed medical, legal, financial, electrical, plumbing, structural, transportation, or other regulated services where licensing is legally required.</li><li>Jobs involving threats, discrimination, dangerous conditions, or intentional property damage.</li><li>Fake reviews, artificial engagement, account manipulation, or platform abuse.</li></ul>`
};

let jobs = JSON.parse(localStorage.getItem("bukutask_jobs") || "null") || starterJobs;
let postLog = JSON.parse(localStorage.getItem("bukutask_post_log") || "[]");

const categoryGrid = document.getElementById("categoryGrid");
const categoryFilter = document.getElementById("categoryFilter");
const postCategory = document.getElementById("postCategory");
const jobGrid = document.getElementById("jobGrid");
const jobCount = document.getElementById("jobCount");
const emptyState = document.getElementById("emptyState");
const toast = document.getElementById("toast");

function initCategories(){
  categoryGrid.innerHTML = categories.slice(0,6).map(c=>`
    <button class="category-card" data-category="${c.name}">
      <div class="category-icon">${c.icon}</div>
      <strong>${c.name}</strong>
      <small>${c.count} available</small>
    </button>`).join("");
  const options = categories.map(c=>`<option value="${c.name}">${c.name}</option>`).join("");
  categoryFilter.insertAdjacentHTML("beforeend",options);
  postCategory.innerHTML = `<option value="">Choose a category</option>${options}`;
}

function renderJobs(list=jobs){
  jobGrid.innerHTML = list.map(j=>`
    <article class="job-card">
      <div class="job-top"><span class="job-category">${escapeHtml(j.category)}</span><span class="job-budget">$${Number(j.budget).toLocaleString()} ${j.payType === "Hourly" ? "/hr" : ""}</span></div>
      <h3>${escapeHtml(j.title)}</h3>
      <p>${escapeHtml(j.description)}</p>
      <div class="job-meta"><span>📍 ${escapeHtml(j.location)}</span><span>📅 ${escapeHtml(j.date)}</span><span>👥 ${j.workers}</span></div>
      <div class="job-footer"><span class="verified">${j.verified ? "✓ Verified poster" : "New poster"}</span><button class="apply-btn" data-apply="${j.id}">View & Apply →</button></div>
    </article>`).join("");
  jobCount.textContent = list.length;
  emptyState.classList.toggle("hidden",list.length>0);
}

function escapeHtml(value=""){
  return String(value).replace(/[&<>"']/g, s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[s]));
}

function filterJobs(){
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  const category = categoryFilter.value;
  const location = document.getElementById("locationFilter").value.trim().toLowerCase();
  const filtered = jobs.filter(j =>
    (!q || `${j.title} ${j.description} ${j.category}`.toLowerCase().includes(q)) &&
    (!category || j.category === category) &&
    (!location || j.location.toLowerCase().includes(location))
  );
  renderJobs(filtered);
  document.getElementById("jobs").scrollIntoView({behavior:"smooth"});
}

function openModal(id){
  document.getElementById(id).classList.remove("hidden");
  document.body.style.overflow="hidden";
}
function closeModals(){
  document.querySelectorAll(".modal-backdrop").forEach(m=>m.classList.add("hidden"));
  document.body.style.overflow="";
}
function showToast(message){
  toast.textContent=message;
  toast.classList.remove("hidden");
  setTimeout(()=>toast.classList.add("hidden"),3500);
}

document.querySelectorAll("[data-open-post]").forEach(b=>b.addEventListener("click",e=>{e.preventDefault();openModal("postModal")}));
document.getElementById("loginBtn").addEventListener("click",()=>openModal("loginModal"));
document.querySelectorAll("[data-close-modal]").forEach(b=>b.addEventListener("click",closeModals));
document.querySelectorAll(".modal-backdrop").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)closeModals()}));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModals()});
document.getElementById("searchBtn").addEventListener("click",filterJobs);
document.getElementById("searchInput").addEventListener("keydown",e=>{if(e.key==="Enter")filterJobs()});
document.getElementById("categoryFilter").addEventListener("change",filterJobs);

categoryGrid.addEventListener("click",e=>{
  const card=e.target.closest("[data-category]");
  if(!card)return;
  categoryFilter.value=card.dataset.category;
  filterJobs();
});

document.getElementById("postForm").addEventListener("submit",e=>{
  e.preventDefault();
  const now=Date.now();
  postLog=postLog.filter(t=>now-t<24*60*60*1000);
  if(postLog.length>=2){
    document.getElementById("postStatus").textContent="Free plan limit reached: 2 new jobs per rolling 24 hours. Upgrade to Premium for unlimited posting.";
    return;
  }
  const fd=new FormData(e.target);
  const photos=fd.getAll("photos").filter(f=>f && f.size);
  if(photos.length>5){
    document.getElementById("postStatus").textContent="Please upload no more than 5 photos.";
    return;
  }
  if(photos.some(f=>f.size>5*1024*1024)){
    document.getElementById("postStatus").textContent="Each photo must be 5 MB or smaller.";
    return;
  }
  const job={
    id:Date.now(),
    title:fd.get("title"),
    category:fd.get("category"),
    location:fd.get("location"),
    budget:Number(fd.get("budget")),
    payType:fd.get("payType"),
    date:fd.get("date"),
    workers:Number(fd.get("workers")),
    description:fd.get("description"),
    verified:false
  };
  jobs.unshift(job);
  postLog.push(now);
  localStorage.setItem("bukutask_jobs",JSON.stringify(jobs));
  localStorage.setItem("bukutask_post_log",JSON.stringify(postLog));
  renderJobs();
  e.target.reset();
  document.getElementById("postStatus").textContent="";
  closeModals();
  showToast("Your job was published in this browser.");
  document.getElementById("jobs").scrollIntoView({behavior:"smooth"});
});

document.querySelectorAll("[data-demo-login]").forEach(btn=>btn.addEventListener("click",()=>{
  closeModals(); showToast(`${btn.dataset.demoLogin} login is ready for backend integration.`);
}));
document.getElementById("emailLoginForm").addEventListener("submit",e=>{
  e.preventDefault(); closeModals(); showToast("Demo account session created. Connect authentication before launch.");
});

document.getElementById("upgradeBtn").addEventListener("click",()=>{
  showToast("Connect a PayPal Business subscription plan before accepting live payments.");
});

jobGrid.addEventListener("click",e=>{
  const b=e.target.closest("[data-apply]");
  if(b) showToast("Application flow is ready for account and messaging integration.");
});

document.querySelectorAll("[data-policy]").forEach(b=>b.addEventListener("click",()=>{
  document.getElementById("policyContent").innerHTML=policyCopy[b.dataset.policy];
  openModal("policyModal");
}));

initCategories();
renderJobs();
