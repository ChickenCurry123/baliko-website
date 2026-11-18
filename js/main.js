(function(){
  var P=window.BALIKO_PRODUCTS||[], WA=window.BALIKO_WA;
  var page=document.body.getAttribute('data-page')||'';
  var links=[['index.html','Beranda','home'],['produk.html','Produk','produk'],['tentang.html','Tentang','tentang'],['kontak.html','Kontak','kontak']];
  var rp=function(n){return 'Rp'+n.toLocaleString('id-ID')};
  var wa=function(t){return 'https://wa.me/'+WA+(t?'?text='+encodeURIComponent(t):'')};

  /* ---------- Ilustrasi ---------- */
  function leaf(x,y,a,l,fill){
    var w=l*.3,t='transform="translate('+x+' '+y+') rotate('+a+')"';
    return '<path '+t+' d="M0 0C'+l*.25+' '+(-w)+' '+l*.75+' '+(-w)+' '+l+' 0C'+l*.75+' '+w+' '+l*.25+' '+w+' 0 0z" fill="'+fill+'"/>'+
           '<path '+t+' d="M2 0H'+l*.85+'" stroke="#fff" stroke-opacity=".6" stroke-width="'+Math.max(1,l/40)+'" fill="none" stroke-linecap="round"/>';
  }
  function sprig(c){
    c=c||['#2D7A3E','#9CCB7E','#CFE8BE'];
    var s='<path d="M100 300V24" stroke="'+c[0]+'" stroke-width="3" stroke-linecap="round" fill="none"/>';
    for(var i=0;i<6;i++){var y=270-i*42,l=78-i*8;s+=leaf(100,y,-32,l,c[i%3])+leaf(100,y-20,-148,l,c[(i+1)%3]);}
    return s+leaf(100,40,-90,44,c[0]);
  }
  function lines(n){
    var w=n.split(' ');if(w.length<2)return [n];
    var b,bs=1e9;
    for(var i=1;i<w.length;i++){var a=w.slice(0,i).join(' '),c=w.slice(i).join(' '),m=Math.max(a.length,c.length);if(m<bs){bs=m;b=[a,c]}}
    return b;
  }
  function pouch(p){
    var L=lines(p.name),mx=Math.max.apply(null,L.map(function(s){return s.length})),fs=mx>12?15:17;
    var t=L.map(function(s,i){return '<text x="100" y="'+(166+i*(fs+4))+'" text-anchor="middle" font-family="Young Serif,serif" font-size="'+fs+'" fill="#0E2A1A">'+s+'</text>'}).join('');
    return '<svg viewBox="0 0 200 270" role="img" aria-label="Kemasan '+p.name+'">'+
    '<path d="M22 20H178L188 36V246Q188 260 174 260H26Q12 260 12 246V36Z" fill="'+p.bg+'"/>'+
    '<path d="M22 20H178L188 36H12Z" fill="#000" fill-opacity=".1"/>'+
    '<circle cx="100" cy="29" r="4.5" fill="#fff" fill-opacity=".85"/>'+
    '<path d="M12 56H188" stroke="#000" stroke-opacity=".14"/>'+
    '<text x="100" y="80" text-anchor="middle" font-family="Young Serif,serif" font-size="15" fill="'+p.ink+'">Baliko</text>'+
    '<rect x="32" y="92" width="136" height="140" rx="10" fill="#fff"/>'+
    '<g transform="translate(88 102) scale(.12)">'+sprig()+'</g>'+t+
    '<text x="100" y="218" text-anchor="middle" font-family="Hanken Grotesk,sans-serif" font-size="10.5" fill="#587061">'+p.size+'</text></svg>';
  }
  var visual=function(p){return p.img?'<img src="'+p.img+'" alt="'+p.name+'" loading="lazy">':pouch(p)};

  document.querySelectorAll('[data-sprig]').forEach(function(el){
    var c=el.getAttribute('data-sprig')==='light'?['#CFE8BE','#9CCB7E','#FFFFFF']:null;
    el.innerHTML='<svg viewBox="0 0 200 300" aria-hidden="true">'+sprig(c)+'</svg>';
  });
  document.querySelectorAll('[data-pouch]').forEach(function(el){
    var p=P[parseInt(el.getAttribute('data-pouch'),10)];if(p)el.innerHTML=pouch(p);
  });

  /* ---------- Header ---------- */
  var logoLeaf='<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 27C4 14 12 5 28 4c1 15-7 24-23 23z" fill="#2D7A3E"/><path d="M8 24C12 17 17 12 23 9" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>';
  var chat='<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.200z"/></svg>';
  var h=document.getElementById('site-header');
  if(h){
    h.outerHTML='<header class="hdr"><div class="wrap in"><a class="logo" href="index.html" aria-label="Baliko, beranda">'+logoLeaf+'Baliko</a>'+
    '<nav id="nav" aria-label="Utama">'+links.map(function(l){return '<a href="'+l[0]+'"'+(l[2]===page?' aria-current="page"':'')+'>'+l[1]+'</a>'}).join('')+'</nav>'+
    '<a class="btn sm cta-h" data-wa href="#" target="_blank" rel="noopener">Pesan</a>'+
    '<button class="menu" aria-expanded="false" aria-controls="nav">Menu</button></div></header>';
    var m=document.querySelector('.menu'),n=document.getElementById('nav');
    var setMenu=function(o){n.classList.toggle('open',o);m.setAttribute('aria-expanded',o);m.textContent=o?'Tutup':'Menu';document.documentElement.classList.toggle('lock',o)};
    m.addEventListener('click',function(){setMenu(!n.classList.contains('open'))});
    n.addEventListener('click',function(e){if(e.target.closest('a'))setMenu(false)});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false)});
    window.addEventListener('resize',function(){if(innerWidth>760)setMenu(false)});
  }

  /* ---------- Footer + tombol WhatsApp HP ---------- */
  var f=document.getElementById('site-footer');
  if(f){
    f.outerHTML='<footer class="ftr"><div class="wrap"><div class="top"><div><p class="big">Herbal dan makanan sehat dari dapur lokal.</p></div>'+
    '<div><h4>Jelajahi</h4><ul>'+links.map(function(l){return '<li><a href="'+l[0]+'">'+l[1]+'</a></li>'}).join('')+'</ul></div>'+
    '<div><h4>Hubungi</h4><ul><li><a href="mailto:halo@baliko.id">halo@baliko.id</a></li><li><a data-wa href="#" rel="noopener">WhatsApp</a></li></ul></div>'+
    '<div><h4>Ikuti</h4><ul><li><a href="https://www.facebook.com/" target="_blank" rel="noopener">Facebook</a></li><li><a href="https://www.instagram.com/" target="_blank" rel="noopener">Instagram</a></li></ul></div></div>'+
    '<div class="bot"><span>© 2026 Baliko Herbal Healthy Food</span><span>Bekasi, Jawa Barat</span></div></div></footer>';
  }
  var fab=document.createElement('a');
  fab.className='fab';fab.setAttribute('data-wa','');fab.target='_blank';fab.rel='noopener';
  fab.setAttribute('aria-label','Chat WhatsApp Baliko');fab.innerHTML=chat+'<span>Pesan</span>';
  document.body.appendChild(fab);
  document.querySelectorAll('[data-wa]').forEach(function(a){a.href=wa('Halo Baliko, saya mau tanya produk')});

  /* ---------- Produk ---------- */
  var box=document.querySelector('[data-products]');
  var dlg=document.createElement('dialog');
  dlg.setAttribute('aria-label','Detail produk');
  document.body.appendChild(dlg);
  dlg.addEventListener('click',function(e){if(e.target===dlg||e.target.closest('.x'))dlg.close()});

  function openProduct(p){
    dlg.innerHTML='<div class="pd"><button class="x" aria-label="Tutup">×</button><div class="l">'+visual(p)+'</div>'+
    '<div class="r"><div><p class="muted" style="margin:0 0 .5rem">'+p.cat+'</p><h2>'+p.name+'</h2></div>'+
    '<p style="margin:0">'+p.desc+'</p>'+
    '<dl><div><dt>Komposisi</dt><dd>'+p.kom+'</dd></div><div><dt>Cara pakai</dt><dd>'+p.how+'</dd></div></dl>'+
    '<div class="buy"><b>'+rp(p.price)+'</b><span class="muted">'+p.size+'</span></div>'+
    '<a class="btn" href="'+wa('Halo Baliko, saya mau pesan '+p.name+' ('+p.size+')')+'" target="_blank" rel="noopener">Pesan via WhatsApp</a></div></div>';
    if(dlg.showModal)dlg.showModal();
  }

  if(box){
    var limit=parseInt(box.getAttribute('data-limit'),10)||P.length;
    var card=function(p,i){
      return '<button class="card" data-i="'+i+'" data-rv><div class="pic'+(p.img?' photo':'')+'">'+visual(p)+'</div>'+
      '<h3>'+p.name+'</h3><div class="meta"><span>'+p.size+'</span><b>'+rp(p.price)+'</b></div></button>';
    };
    var draw=function(cat){
      box.innerHTML=P.map(function(p,i){return {p:p,i:i}}).filter(function(o){return !cat||o.p.cat===cat}).slice(0,limit).map(function(o){return card(o.p,o.i)}).join('');
    };
    draw('');
    box.addEventListener('click',function(e){
      var c=e.target.closest('.card');if(c)openProduct(P[parseInt(c.getAttribute('data-i'),10)]);
    });
    var tabs=document.querySelector('.tabs');
    if(tabs){
      var cats=[];P.forEach(function(p){if(cats.indexOf(p.cat)<0)cats.push(p.cat)});
      tabs.innerHTML=['Semua'].concat(cats).map(function(c,i){return '<button aria-pressed="'+(i===0)+'" data-c="'+(i?c:'')+'">'+c+'</button>'}).join('');
      tabs.addEventListener('click',function(e){
        var b=e.target.closest('button');if(!b)return;
        tabs.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
        draw(b.getAttribute('data-c'));
        if(window.BalikoMotion)window.BalikoMotion.cards(box);
      });
      var q=decodeURIComponent((location.hash||'').slice(1));
      var hit=Array.prototype.filter.call(tabs.querySelectorAll('button'),function(b){return q&&b.getAttribute('data-c')===q})[0];
      if(hit)hit.click();
    }
  }

  /* ---------- Form kontak -> email ---------- */
  var form=document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var d=new FormData(form);
      location.href='mailto:halo@baliko.id?subject='+encodeURIComponent('Pesan dari '+d.get('nama'))+'&body='+encodeURIComponent(d.get('pesan')+'\n\n'+d.get('nama')+' ('+d.get('email')+')');
    });
  }
})();