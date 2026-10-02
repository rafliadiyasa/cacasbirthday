const screens = {
  opening: document.getElementById("opening"),
  birthday: document.getElementById("birthday"),
  prayer: document.getElementById("prayer"),
  blow: document.getElementById("blow"),
  finale: document.getElementById("finale")
};
const music = document.getElementById("music");
const musicControl = document.getElementById("musicControl");
const helloText = document.getElementById("helloText");

function showScreen(name){
  Object.values(screens).forEach(s=>s && s.classList.remove("active"));
  if(screens[name]) screens[name].classList.add("active");
}

async function playMusic(){
  try{await music.play(); musicControl.textContent="🔊 Musik";}
  catch(e){musicControl.textContent="▶️ Putar Musik";}
}
window.addEventListener("load", playMusic);
document.addEventListener("pointerdown", ()=>{if(music.paused) playMusic();},{once:true});
musicControl.addEventListener("click", async ()=>{
  if(music.paused){await playMusic();}else{music.pause();musicControl.textContent="🔇 Musik";}
});

const colors=["#ff8fbd","#ffd978","#bca2ff","#8ce2d5","#ffb28d","#fff0f6"];
function confetti(layerId,count=150){
  const layer=document.getElementById(layerId);
  if(!layer) return;
  for(let i=0;i<count;i++){
    const p=document.createElement("i");p.className="confetti-piece";
    p.style.left=Math.random()*100+"%";
    p.style.background=colors[Math.floor(Math.random()*colors.length)];
    p.style.animationDelay=Math.random()*1+"s";
    p.style.animationDuration=2.5+Math.random()*2+"s";
    p.style.transform=`rotate(${Math.random()*360}deg)`;
    layer.appendChild(p);setTimeout(()=>p.remove(),6000);
  }
}

function lightBirthdayCandles(){
  document.querySelectorAll("#birthday .big-flame").forEach(flame=>flame.classList.add("lit"));
}

document.getElementById("lightBtn").addEventListener("click",()=>{
  helloText.style.transition="1s";
  helloText.style.opacity="0";
  helloText.style.transform="scale(.7)";
  lightBirthdayCandles();
  setTimeout(()=>{
    showScreen("birthday");
    confetti("confetti",190);
    makePolaroids();
    createBirthdayStars();
  },650);
});

function makePolaroids(){
  const root=document.getElementById("polaroids");
  root.innerHTML="";
  const positions=[
    ["3%","34%","-12deg"],["15%","57%","9deg"],["28%","33%","-7deg"],
    ["58%","34%","8deg"],["72%","56%","-10deg"],["84%","33%","7deg"],
    ["5%","70%","7deg"],["23%","76%","-8deg"],["63%","75%","10deg"],["82%","69%","-6deg"]
  ];
  const photos = Array.from({length:10}, (_,i)=>`photos/photo${i+1}.jpg`);
  positions.forEach((pos,i)=>{
    const card=document.createElement("div");card.className="polaroid";
    card.style.left=pos[0];card.style.top=pos[1];
    card.style.setProperty("--r",pos[2]);
    const rand=(min,max)=>Math.round(min+Math.random()*(max-min));
    card.style.setProperty("--x1",rand(-24,24)+"px");
    card.style.setProperty("--y1",rand(-18,18)+"px");
    card.style.setProperty("--x2",rand(-38,38)+"px");
    card.style.setProperty("--y2",rand(-30,30)+"px");
    card.style.setProperty("--x3",rand(-30,30)+"px");
    card.style.setProperty("--y3",rand(-42,42)+"px");
    card.style.setProperty("--x4",rand(-42,42)+"px");
    card.style.setProperty("--y4",rand(-22,22)+"px");
    card.style.setProperty("--floatTime",(6.5+Math.random()*5.5).toFixed(2)+"s");
    card.style.animationDelay=(i*.08)+"s";
    card.innerHTML=`<img src="${photos[i]}" alt="Foto Caca ${i+1}" loading="eager"><span>Cacakuu ♡</span>`;
    root.appendChild(card);
  });
}

function createBirthdayStars(){
  let layer=document.getElementById("birthdayStars");
  if(!layer){
    layer=document.createElement("div");
    layer.id="birthdayStars";
    layer.className="birthday-stars-layer";
    document.getElementById("birthday").prepend(layer);
  }
  layer.innerHTML="";
  for(let i=0;i<85;i++){
    const s=document.createElement("i");
    s.style.left=Math.random()*100+"%";
    s.style.top=Math.random()*82+"%";
    s.style.setProperty("--twinkle",(1.6+Math.random()*3.2).toFixed(2)+"s");
    s.style.animationDelay=(-Math.random()*4)+"s";
    layer.appendChild(s);
  }
  for(let i=0;i<4;i++){
    const s=document.createElement("b");
    s.className="birthday-shooting-star";
    s.style.left=(10+Math.random()*75)+"%";
    s.style.top=(8+Math.random()*45)+"%";
    s.style.animationDelay=(i*2.4+Math.random())+"s";
    layer.appendChild(s);
  }
}

const prayers=[
 "Semoga setiap langkahmu selalu menemukan jalan menuju bahagia. 🤍",
 "Semoga senyummu tidak pernah kehabisan alasan untuk hadir.",
 "Semoga semua doa yang diam-diam kamu simpan, satu per satu dijawab dengan cara paling indah.",
 "Semoga di usia 21 ini, hatimu semakin tenang, rezekimu semakin luas, dan mimpimu semakin dekat.",
 "Semoga kamu selalu dikelilingi cinta yang tulus, orang-orang baik, dan hari-hari yang membuatmu bersyukur.",
 "Semoga apa yg kita usahakan berdua dalam hubungan dilancarkan dan dipermudah.",
 "Dan semoga… aku selalu punya kesempatan untuk melihat senyummu dari dekat. 💗",
 "Selamat ulang tahun, Caca. Terima kasih telah lahir di dunia ini. I Love you, More than Everything. ♡"
];

let prayerTimer=null;
document.getElementById("prayerBtn").addEventListener("click",()=>{
  showScreen("prayer");
  runPrayers();
});

function runPrayers(){
  if(prayerTimer) clearInterval(prayerTimer);
  const text=document.getElementById("prayerText"),dots=document.getElementById("prayerDots"),btn=document.getElementById("blowPageBtn");
  btn.classList.remove("show");
  dots.innerHTML=prayers.map((_,i)=>`<i class="${i===0?'active':''}"></i>`).join("");
  let i=0;
  text.style.opacity="1";
  text.textContent=prayers[0];
  prayerTimer=setInterval(()=>{
    i++;
    if(i>=prayers.length){
      clearInterval(prayerTimer);
      prayerTimer=null;
      text.style.animation="prayerFadeOut .9s forwards";
      setTimeout(()=>{
        text.textContent="";
        btn.classList.add("show");
      },900);
      return;
    }
    text.style.animation="none";
    void text.offsetWidth;
    text.style.animation="prayerFade .9s";
    text.textContent=prayers[i];
    [...dots.children].forEach((d,n)=>d.classList.toggle("active",n===i));
  },5000);
}

document.getElementById("blowPageBtn").addEventListener("click",()=>{
  showScreen("blow");
  setupBlowPage();
});

function setupBlowPage(){
  createBlowStars();
  document.querySelectorAll(".blow-flame").forEach(f=>f.classList.remove("off"));
  const btn=document.getElementById("blowBtn");
  btn.dataset.blown="0";
  btn.textContent="🕯️ Tiup Lilinnya";
  document.getElementById("blowNote").textContent="Tutup mata, buat satu doa, lalu tiup lilinnya. 💗";
}

function createFinalSky(){
  const layer=document.getElementById("finalSkyStars");
  const shots=document.getElementById("finalShootingStars");
  if(!layer || !shots) return;
  layer.innerHTML="";
  for(let i=0;i<95;i++){
    const s=document.createElement("i");
    s.style.left=Math.random()*100+"%";
    s.style.top=Math.random()*88+"%";
    s.style.setProperty("--size",(1.5+Math.random()*3).toFixed(1)+"px");
    s.style.setProperty("--twinkle",(1.4+Math.random()*3.8).toFixed(2)+"s");
    s.style.animationDelay=(-Math.random()*5)+"s";
    layer.appendChild(s);
  }
  shots.innerHTML="";
  for(let i=0;i<4;i++){
    const shot=document.createElement("i");
    shot.className="final-shooting-star";
    shot.style.left=(10+Math.random()*78)+"%";
    shot.style.top=(5+Math.random()*45)+"%";
    shot.style.animationDelay=(i*3+Math.random()*2)+"s";
    shots.appendChild(shot);
  }
}

function createBlowStars(){
  const layer=document.getElementById("blowStars");
  layer.innerHTML="";
  for(let i=0;i<105;i++){
    const s=document.createElement("i");
    s.style.left=Math.random()*100+"%";
    s.style.top=Math.random()*88+"%";
    s.style.setProperty("--size",(1.5+Math.random()*3.2).toFixed(1)+"px");
    s.style.setProperty("--twinkle",(1.3+Math.random()*3.7).toFixed(2)+"s");
    s.style.animationDelay=(-Math.random()*5)+"s";
    layer.appendChild(s);
  }
  const shots=document.getElementById("shootingStars");
  shots.innerHTML="";
  for(let i=0;i<5;i++){
    const shot=document.createElement("i");
    shot.className="shooting-star";
    shot.style.left=(8+Math.random()*78)+"%";
    shot.style.top=(5+Math.random()*48)+"%";
    shot.style.animationDelay=(i*2.8+Math.random()*2)+"s";
    shots.appendChild(shot);
  }
}

document.getElementById("blowBtn").addEventListener("click",()=>{
  const btn=document.getElementById("blowBtn");
  if(btn.dataset.blown==="1"){
    showScreen("finale");
    createFinalSky();
    confetti("finalConfetti",260);
    setTimeout(()=>confetti("finalConfetti",150),1800);
    return;
  }
  document.querySelectorAll(".blow-flame").forEach(f=>f.classList.add("off"));
  document.getElementById("blowNote").textContent="Harapanmu sudah dilepaskan bersama cahaya lilin. ✨💗";
  btn.dataset.blown="1";
  btn.textContent="✨ Last, Happy Birthday Sayangku";
});
