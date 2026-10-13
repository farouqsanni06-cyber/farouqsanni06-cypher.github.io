// Courbes de niveau décoratives (générées une fois, sans animation)
(function(){
  var s=document.getElementById('topo'),ns='http://www.w3.org/2000/svg';
  for(var k=1;k<=16;k++){
    var p=document.createElementNS(ns,'path'),pts=[],n=48;
    for(var i=0;i<n;i++){
      var a=i/n*Math.PI*2,r=k*26+Math.sin(a*3+k*.35)*(8+k*1.6)+Math.cos(a*5-k*.2)*(5+k);
      pts.push([860+Math.cos(a)*r*1.5,260+Math.sin(a)*r]);
    }
    p.setAttribute('d','M'+pts.map(function(q){return q[0].toFixed(1)+','+q[1].toFixed(1)}).join('L')+'Z');
    p.setAttribute('fill','none');p.setAttribute('stroke',k%4==0?'#F0B03A':'#5FA3B8');
    p.setAttribute('stroke-width',k%4==0?'1.6':'1');p.setAttribute('stroke-linejoin','round');
    s.appendChild(p);
  }
})();

// Carte du parcours
var lieux=[
 {n:"Université de Rennes 2",t:"etude",d:"Master Géomatique, parcours SIGAT · 2025–2027",c:[48.1195,-1.7020]},
 {n:"Université d'Angers",t:"etude",d:"Licence Géographie et aménagement · 2024–2025",c:[47.4784,-0.5632]},
 {n:"Université Félix Houphouët-Boigny",t:"etude",d:"Licence Géographie · 2019–2022",c:[5.3470,-3.9890]},
 {n:"ASP · Chantepie",t:"exp",d:"Photo-interprète et contrôleur de surface · été 2026",c:[48.0883,-1.6178]},
 {n:"DDSEN49 · Angers",t:"exp",d:"Stage géomaticien cartographe · 2025",c:[47.4710,-0.5520]},
 {n:"France Terre d'Asile · Angers",t:"exp",d:"Stage cartographe · 2024–2025",c:[47.4850,-0.5500]},
 {n:"Southern IT Consulting · Abidjan",t:"exp",d:"Stage géomaticien cartographe · 2023–2024",c:[5.3600,-4.0083]}
];
var map=L.map('map',{scrollWheelZoom:false}).setView([30,-12],2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© OpenStreetMap'}).addTo(map);
var grp=L.featureGroup().addTo(map);
function draw(f){
  grp.clearLayers();
  lieux.forEach(function(l){
    if(f!=='all'&&l.t!==f)return;
    L.circleMarker(l.c,{radius:9,weight:3,color:'#0B3347',fillOpacity:1,fillColor:l.t==='etude'?'#F0B03A':'#1B6A86'})
      .bindPopup('<b>'+l.n+'</b><br>'+l.d).addTo(grp);
  });
  map.fitBounds(grp.getBounds().pad(.25),{maxZoom:6});
}
document.querySelectorAll('.filters button').forEach(function(b){
  b.addEventListener('click',function(){
    document.querySelectorAll('.filters button').forEach(function(x){x.setAttribute('aria-pressed','false')});
    b.setAttribute('aria-pressed','true');draw(b.dataset.f);
  });
});
draw('all');
