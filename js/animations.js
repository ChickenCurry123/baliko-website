/* GSAP. Dimuat paling akhir, setelah main.js menggambar header, produk, dan ilustrasi. */
(function(){
  if(!window.gsap||!window.ScrollTrigger)return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  gsap.registerPlugin(ScrollTrigger);
  var q=function(s){return document.querySelector(s)};

  /* Daun jatuh, sengaja halus */
  (function(){
    var layer=document.createElement('div');
    layer.setAttribute('aria-hidden','true');
    layer.style.cssText='position:fixed;inset:0;z-index:-1;pointer-events:none;overflow:hidden';
    document.body.appendChild(layer);
    var svg='<svg viewBox="0 0 24 24" width="100%" height="100%"><path d="M3 21C3 10 10 3 21 3c0 11-7 18-18 18z" fill="#9CCB7E" fill-opacity=".35" stroke="#2D7A3E" stroke-opacity=".45"/><path d="M5 19C9 14 13 10 18 6" stroke="#2D7A3E" stroke-opacity=".4" fill="none"/></svg>';
    var n=innerWidth<700?5:9;
    for(var i=0;i<n;i++){
      var s=16+Math.random()*18,el=document.createElement('div');
      el.innerHTML=svg;
      el.style.cssText='position:absolute;top:0;left:'+(Math.random()*100)+'%;width:'+s+'px;height:'+s+'px;will-change:transform';
      layer.appendChild(el);
      gsap.fromTo(el,{y:'-10vh'},{y:'110vh',duration:16+Math.random()*14,ease:'none',repeat:-1}).progress(Math.random());
      gsap.to(el,{x:(Math.random()<.5?-1:1)*(30+Math.random()*70),duration:3+Math.random()*3,ease:'sine.inOut',yoyo:true,repeat:-1});
      gsap.fromTo(el,{rotation:-60},{rotation:60,duration:3.5+Math.random()*3,ease:'sine.inOut',yoyo:true,repeat:-1});
    }
  })();

  /* Judul dipecah per kata */
  function split(el){
    var t=el.textContent.trim();
    el.setAttribute('aria-label',t);
    el.innerHTML=t.split(/\s+/).map(function(w){return '<span class="w" aria-hidden="true"><span>'+w+'</span></span>'}).join(' ');
    return el.querySelectorAll('.w>span');
  }

  /* Urutan pembuka halaman */
  var h1=q('main h1');
  if(h1){
    var tl=gsap.timeline({defaults:{ease:'power4.out'}});
    tl.from(split(h1),{yPercent:115,duration:1,stagger:.06});
    if(q('.hero-p'))tl.from('.hero-p',{opacity:0,y:18,duration:.7},'-=.55');
    if(q('.hero .acts'))tl.from('.hero .acts > *',{opacity:0,y:14,duration:.6,stagger:.08},'-=.45');
    if(q('.ph p'))tl.from('.ph p',{opacity:0,y:18,duration:.7},'-=.55');
    if(q('.arch')){
      tl.from('.arch',{clipPath:'inset(100% 0% 0% 0%)',duration:1.3,ease:'power3.inOut'},0.1);
      tl.from('.arch .sprig',{yPercent:12,duration:1.5},0.2);
      tl.from('.hp',{y:50,opacity:0,duration:1,ease:'power3.out'},0.7);
      gsap.to('.arch .sprig',{rotation:3,duration:4.5,ease:'sine.inOut',yoyo:true,repeat:-1,delay:1.5});
    }
  }

  /* Muncul saat di-scroll */
  var rv=gsap.utils.toArray('[data-rv]');
  if(rv.length){
    gsap.set(rv,{opacity:0,y:28});
    ScrollTrigger.batch(rv,{start:'top 90%',once:true,onEnter:function(b){
      gsap.to(b,{opacity:1,y:0,duration:.8,stagger:.09,ease:'power3.out',overwrite:true});
    }});
  }

  /* Dipanggil main.js saat filter produk diganti */
  window.BalikoMotion={cards:function(box){
    gsap.fromTo(box.children,{opacity:0,y:22},{opacity:1,y:0,duration:.55,stagger:.05,ease:'power3.out',clearProps:'transform'});
  }};

  window.addEventListener('load',function(){ScrollTrigger.refresh()});
})();