// script.js - kontrol pemain, kamera, dan interaksi
const player = document.getElementById('player');
const playerbox = document.getElementById('playerbox');
const container = document.getElementById('container');
const gamearea = document.getElementById('gamearea');
const message = document.getElementById('messege');
const atas = document.getElementById('atas');
const bawah = document.getElementById('bawah');
const kanan = document.getElementById('kanan');
const kiri = document.getElementById('kiri');
const A = document.getElementById('A');
const menuPakaian = document.getElementById("toko");
const pakaianku = document.getElementById("lemari");
const tutupPakaian = document.getElementById("tutupPakaian");
const tutupPakaiandua = document.getElementById("tutupPakaiandua");
const bajuList = document.querySelectorAll(".baju");
const bajukuList = document.querySelectorAll(".bajuku");
const makanan = document.querySelectorAll(".makan");
const fitness = document.querySelectorAll(".olahraga");
const kelasku = document.querySelectorAll(".kelas");
const rambutku = document.querySelectorAll(".rambut");
const membelimobil = document.querySelectorAll(".belimobil");
const kamarlist = document.querySelectorAll(".kamar");

//popup
const rumahpop = document.getElementById('rumah');
const tutuprumah = document.getElementById('tutuprumah');
const rumahmakanpop = document.getElementById('rumahmakanpop');
const tutuprmkn = document.getElementById('tutuprmkn');
const gympop = document.getElementById('gympop');
const tutupgym = document.getElementById('tutupgym');
const sekolahpop = document.getElementById('sekolahpop');
const tutupkelas = document.getElementById('tutupkelas');
const cukurrambutpop = document.getElementById('cukurrambutpop');
const tutupckr = document.getElementById('tutupckr');
const dilerpop = document.getElementById('dilerpop');
const tutupdiler = document.getElementById('tutupdiler');

//bangunan
const pabrik = document.getElementById('pabrik');
const rmkn = document.getElementById('rumahmakan');
const skh = document.getElementById('sekolah');
const gym = document.getElementById('gym');
const pkn = document.getElementById('pakaian');
const rumah = document.getElementById('home');
const rumah2 = document.getElementById('homeDua');
const cukurrambut = document.getElementById('cukurrambut');
const tkmb = document.getElementById('tokomobil');

//npc
const orang1 = document.getElementById('orang1');
const orang2 = document.getElementById('orang2');
const orang3 = document.getElementById('orang3');
const orang4 = document.getElementById('orang4');
const cewek = document.getElementById('cewek');

//isibox
let darahisi = document.getElementById("darahisi");
let uangangka = document.getElementById("jumlahUang");
let cerdas = document.getElementById("jumlahIq");
let ototisi = document.getElementById("jumlahOtot");
let jamisi = document.getElementById("jam");
let menitisi = document.getElementById("menit");
let dayatarikisi = document.getElementById("dayatarik");

//mobil
let mobil = document.getElementById('mobil');
let npcmobil = document.getElementById('npcmobil');
let npcmobilbox = document.getElementById('npcmobilbox');

let darah = 100
let uang = 100
let kecerdasan = 10
let otot = 10
let pakaianPlayer = null; // belum punya
let hargaBaju = 50;
let lemariBaju = [];
let dimobil = false;
let garansi = [];
let arah = 1;
let jam = 0;
let menit = 0;
let clockInterval = null;

let posY = 150;
let posX = 400;
let mobilY = 20;
let npcmobilY_arah = 20;
let orangY_arah = 50
let orangY_arah2 = 100
let statu = "jomblo";
let dayatarik = 0;

function update() {
  let tt = new Date().toLocaleTimeString();
  document.getElementById("statu").innerText = statu;
  requestAnimationFrame(update);
}

update();


function updatedytr(){
  dayatarik = (lemariBaju.length + otot + kecerdasan + 4) / 20;
  dayatarikisi.textContent = dayatarik;
}

updatedytr();

function updatenpcmobil() {
  setInterval(() => {
    npcmobilY_arah += 40 * arah;
    npcmobil.style.top = npcmobilY_arah + "px";

    // kalau turun 16 langkah → lalu ganti arah
    if (npcmobilY_arah >= 16 * 40) arah = -1;

    // kalau naik kembali ke 0 → ganti arah turun
    if (npcmobilY_arah <= 0) arah = 1;
  }, 500);
}

function updateorang() {
  setInterval(() => {
    orangY_arah += 20 * arah;
    orangY_arah2 += 20 * arah;
    orang1.style.top = orangY_arah + "px";
    orang2.style.top = orangY_arah + "px";
    orang3.style.top = orangY_arah2 + "px";
    orang4.style.top = orangY_arah2 + "px";

    // kalau turun 60 langkah → lalu ganti arah
    if (orangY_arah >= 60 * 20) arah = -1;

    // kalau naik kembali ke 0 → ganti arah turun
    if (orangY_arah <= 0) arah = 1;

    // kalau turun 60 langkah → lalu ganti arah
    if (orangY_arah2 >= 60 * 20) arah = -1;

    // kalau naik kembali ke 0 → ganti arah turun
    if (orangY_arah2 <= 0) arah = 1;
  }, 500);
}


function updatecerdas() {
  cerdas.textContent = kecerdasan;
}

function updateotot() {
  ototisi.textContent = otot;
}

function updatedarah() {
  darahisi.style.width = darah + "%";
}

function updateuang() {
  uangangka.textContent = uang;
}

function iscolliding(obj1, obj2) {
  const p = obj1.getBoundingClientRect();
  const h = obj2.getBoundingClientRect();

  return !(
    p.right < h.left ||
    p.left > h.right ||
    p.bottom < h.top ||
    p.top > h.bottom
  );
}

function startGameClock() {
  if (clockInterval) return;
  
  clockInterval=setInterval(() => {
    let siang = 1;
    menit += 1;

    if (menit >= 60) {
      menit = 0;
      jam += 1;

      if (jam >= 10) {jam = 0;}
      if (jam >= 5) {siang = 0;} else {siang = 1;} 
      if (siang === 0) {
        container.style.background = "linear-gradient(#042304, #023312)";
        gamearea.style.filter = "brightness(0.45)";
      } else {
        gamearea.style.filter = "brightness(1)"; 
        container.style.background = "linear-gradient(#136e15, #2eea6a)";
      }
    }
    
    jamisi.textContent = jam;
    menitisi.textContent = menit;
  }, 1000);
}

function pauseClock() {
  clearInterval(clockInterval);
  clockInterval = null;
}

function setwaktu (J, M) {
  jam = J;
  menit = M;

  jamisi.textContent = jam;
  menitisi.textContent = menit;
}

function tabrakan (){
  if (iscolliding(playerbox, npcmobilbox)) {
    alert("kamu tertabrak mobil");
    location.reload();
  }
}

function loopGame(){
  tabrakan();
  requestAnimationFrame(loopGame);
}

loopGame();
updateorang();
startGameClock();
updatenpcmobil();

//control
atas.addEventListener("click",function(){
  if (dimobil == true) {
    mobilY -= 40;
    mobil.style.top = mobilY + "px";
    posY -= 40;
  } else {
    posY -= 10;
  }
  player.style.top = posY + "px";
  gamearea.style.transform = "translateY(" + (-posY + 200) + "px)";
})
bawah.addEventListener("click",function(){
    if (dimobil == true) {
    mobilY += 40;
    mobil.style.top = mobilY + "px";
    posY += 40;
  } else {
    posY += 10;
  }
  player.style.top = posY + "px";
  gamearea.style.transform = "translateY(" + (-posY + 0) + "px)";
})
kanan.addEventListener("click",function(){
  if (dimobil == true) {
    return;
  } else {
    posX += 10;
  }
  player.style.left = posX + "px";
})
kiri.addEventListener("click",function(){
  if (dimobil == true) {
    return;
  } else {
    posX -= 10;
  }
  player.style.left = posX + "px";
})

 //tombol interaksi tambah uang (pabrik)
A.addEventListener("click",function(){
  if (iscolliding(player,pabrik)) {
    uang += 5;
    updateuang();
  }
})

//tombol interaksi tambah darah, kurang uang (rumahmakan)
A.addEventListener("click",function(){
  if (iscolliding(player,rmkn)) {
    if (uang <= 10 || darah >= 100) { 
      updatedytr();
      return;
  } else {
    updatedytr();
    rumahmakanpop.style.display = "flex";

  }
}
})

tutuprmkn.addEventListener("click", () => {
  rumahmakanpop.style.display = "none";
});

//tombol interaksi tambah kecerdasan, kurang uang,kurang darah(sekolah)
A.addEventListener("click",function(){
  if (iscolliding(player,skh)) {
    if (kecerdasan >= 100 || uang <= 100 || darah <= 20) {
      updatedytr();
      return;
    } else {
      updatedytr ();
      sekolahpop.style.display = "flex";

  }
}
})

tutupkelas.addEventListener("click", () => {
  sekolahpop.style.display = "none";
});

//tombol interaksi tambah otot, kurang uang, kurang darah (gym)
A.addEventListener("click",function(){
  if (iscolliding(player,gym)) {
    if (otot >= 100 || uang <= 50 || darah <= 10) {
      updatedytr();
      return;
    } else {
      updatedytr();
      gympop.style.display = "flex";

  }
}
})

tutupgym.addEventListener("click", () => {
  gympop.style.display = "none";
});

//tombol interaksi beli pakaian (pakaian)
A.addEventListener("click", function() {
  if (iscolliding(player, pkn)) {
    updatedytr();
    menuPakaian.style.display = "flex";
  }
});

tutupPakaian.addEventListener("click", () => {
  menuPakaian.style.display = "none";
});

//tombol interaksi rumah lemari (rumah)
A.addEventListener("click", function() {
  if (iscolliding(player, rumah)) {
    pakaianku.style.display = "flex";
  }
});

tutupPakaiandua.addEventListener("click", () => {
  pakaianku.style.display = "none";
});

// rumahDua

A.addEventListener("click", function() {
  if (iscolliding(player, rumah2)) {
    updatedytr();
    rumahpop.style.display = "flex";
  }
});

tutuprumah.addEventListener("click", () => {
  rumahpop.style.display = "none";
});

//tombol interaksi cukur rambut (ckr)
A.addEventListener("click", function() {
  if (iscolliding(player, cukurrambut)) {
    cukurrambutpop.style.display = "flex";
  }
});

tutupckr.addEventListener("click", () => {
  cukurrambutpop.style.display = "none";
});

//tombol interaksi toko mobil (diler mobil)
A.addEventListener("click", function() {
  if (iscolliding(player, tkmb)) {
    dilerpop.style.display = "flex";
  }
});

tutupdiler.addEventListener("click", () => {
  dilerpop.style.display = "none";
});

//interaksi mobil
A.addEventListener("click", function(){
  if (iscolliding(player, mobil)) {
    if(!dimobil) {
      dimobil = true;
    } else {
      dimobil = false;
    }
  }
})

//interaksi npc
A.addEventListener("click", function(){
  if (iscolliding(player, cewek)) {
    updatedytr();
    if(dayatarik >= 10) {
      alert("anda telah memperoleh pasangan");
      statu.textContent = "memiliki pasangan";
    } else {
      alert("maaf, coba lagi");
    }
  }
})

//popup rumah dua
kamarlist.forEach(kamar => {
  kamar.addEventListener("click", function() {
    let kmrku = this.dataset.id;

    let totalMenit = jam * 60 + menit;
    let batasAwal = 5 * 60;     // 05:00 → 300 menit
    let batasAkhir = 9 * 60 + 40; // 09:30 → 570 menit

    if (kmrku === "tidur") {
      if (totalMenit >= batasAwal && totalMenit <= batasAkhir) {
      pauseClock();
      setwaktu(9, 55);
      startGameClock();
      } else {
        alert("tidurlah di malam hari di jam 5.00 hingga 9.40 ")
        return;
      }
    } else {
      pakaianku.style.display = "flex";
    }
    rumahpop.style.display = "none";
  })
})

//popup toko pakaian
bajuList.forEach(baju => {
  baju.addEventListener("click", function() {
    let id = this.dataset.id;

    if (pakaianPlayer !== id) {

      if (uang < hargaBaju) {
        return;
      }
      else  {
      
      if (!lemariBaju.includes(id)) {
      lemariBaju.push(id);
      }

      uang -= hargaBaju;
      updateuang();
      
      pakaianPlayer = id;
      if (id === "baju1" || id === "baju2" || id === "baju3") {
      document.querySelector("#bodyP img").src = `aset/${id}.png`;
      } else {
      document.querySelector("#downP img").src = `aset/${id}.png`;        
      }
    }
  }
    updatedytr();
    menuPakaian.style.display = "none";
  });
});

//pop up lemari rumah
bajukuList.forEach(bajuku => {
  bajuku.addEventListener("click", function() {

    let id = this.dataset.id;

    if (!lemariBaju.includes(id)) {
      alert("Belum beli baju ini!");
      return;
    }

    pakaianPlayer = id;
      if (id === "baju1" || id === "baju2" || id === "baju3") {
      document.querySelector("#bodyP img").src = `aset/${id}.png`;
      } else {
      document.querySelector("#downP img").src = `aset/${id}.png`;        
      }
    pakaianku.style.display = "none";
  });
});

//popup rumah makan
makanan.forEach(makan => {
  makan.addEventListener("click", function() {

    let idmkn = this.dataset.id;

  if (idmkn === "mkn1") {
  
    alert("id 1");
    darah += 5;
    updatedarah();
  
    uang -= 5;
    updateuang();

  } else {

    alert("id 2");
    darah += 10;
    updatedarah();
  
    uang -= 10;
    updateuang();
  }
    rumahmakanpop.style.display = "none";
  });
});

//popupgym
fitness.forEach(olahraga => {
  olahraga.addEventListener("click", function() {

    let idolah = this.dataset.id;

      if (idolah === "olah1") {
  
    alert("id 1");
    otot += 5;
    updateotot();
    uang -= 25 ;
    updateuang();
    darah -= 5;
    updatedarah();

  } else {

    alert("id 2");
    otot += 10;
    updateotot();
    uang -= 50 ;
    updateuang();
    darah -= 10;
    updatedarah();

  }
    updatedytr();
    gympop.style.display = "none";
  });
});

//popup sekolah
kelasku.forEach(kelas => {
  kelas.addEventListener("click", function() {

    let idkls = this.dataset.id;

      if (idkls === "kelas1") {
  
    alert("id 1");
    kecerdasan += 5;
    updatecerdas();
    darah -= 10;
    updatedarah();
    uang -= 50;
    updateuang();

  } else {

    alert("id 2");
    kecerdasan += 10;
    updatecerdas();
    darah -= 20;
    updatedarah();
    uang -= 100;
    updateuang();
  }
    updatedytr();
    sekolahpop.style.display = "none";
  });
});

//pop up cukur rambut
rambutku.forEach(rambut => {
  rambut.addEventListener("click", function() {
    if (uang <= 75) {
      return

    } else {

    uang -=75;
    updateuang();
    let idckr = this.dataset.id;
    document.querySelector("#headP img").src = `aset/${idckr}.png`;

    cukurrambutpop.style.display = "none";
    }
  });
});

//pop up diler mobil
membelimobil.forEach(belimobil => {
  belimobil.addEventListener("click", function() {
    if (uang <= 250) {
      return

    } else {

      let idCar = this.dataset.id;

      if (idCar === "belimobil1") {
      
      if (!garansi.includes(idCar === "belimobil1")) {
      uang -=250;
      updateuang();
      garansi.push(idCar);
      mobil.style.display = "flex";
    }    
  } else {
    uang -=250;
    updateuang();
    homeDua.style.display = "flex";
  }}
    
    dilerpop.style.display = "none";

  });
});