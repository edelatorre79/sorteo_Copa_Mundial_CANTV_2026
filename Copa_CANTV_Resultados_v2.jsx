import { useState, useEffect, useCallback } from "react";

// ══════════════════════════════════════════════
// DATA: PLAYERS — 16 jugadores x 3 selecciones = 48 equipos
// Mapeo extraído directamente del archivo "3ra Copa CANTV"
// ══════════════════════════════════════════════
const PLAYERS = {
  "Sudáfrica":     { name:"ADRIÁN",   tag:"@wasapeo0609",     console:"PS5",  bg:"#003087" },
  "Marruecos":     { name:"ADRIÁN",   tag:"@wasapeo0609",     console:"PS5",  bg:"#003087" },
  "Ghana":         { name:"ADRIÁN",   tag:"@wasapeo0609",     console:"PS5",  bg:"#003087" },
  "Escocia":       { name:"BENJAMIN", tag:"@Zentrakk",        console:"PS5",  bg:"#003087" },
  "Francia":       { name:"BENJAMIN", tag:"@Zentrakk",        console:"PS5",  bg:"#003087" },
  "Panamá":        { name:"BENJAMIN", tag:"@Zentrakk",        console:"PS5",  bg:"#003087" },
  "México":        { name:"CIRO",     tag:"@Ciro_26A",        console:"PS5",  bg:"#003087" },
  "Senegal":       { name:"CIRO",     tag:"@Ciro_26A",        console:"PS5",  bg:"#003087" },
  "Congo DR":      { name:"CIRO",     tag:"@Ciro_26A",        console:"PS5",  bg:"#003087" },
  "Suecia":        { name:"EDUARDO",  tag:"@YOnL3nn0n",       console:"PS5",  bg:"#003087" },
  "Cabo Verde":    { name:"EDUARDO",  tag:"@YOnL3nn0n",       console:"PS5",  bg:"#003087" },
  "Inglaterra":    { name:"EDUARDO",  tag:"@YOnL3nn0n",       console:"PS5",  bg:"#003087" },
  "Paraguay":      { name:"ELIO",     tag:"@FCBLegends_Vzla", console:"PS5",  bg:"#003087" },
  "Brasil":        { name:"ELIO",     tag:"@FCBLegends_Vzla", console:"PS5",  bg:"#003087" },
  "Argelia":       { name:"ELIO",     tag:"@FCBLegends_Vzla", console:"PS5",  bg:"#003087" },
  "Arabia Saudita":{ name:"GABRIEL",  tag:"@Albornozg14",     console:"PS5",  bg:"#003087" },
  "Noruega":       { name:"GABRIEL",  tag:"@Albornozg14",     console:"PS5",  bg:"#003087" },
  "Portugal":      { name:"GABRIEL",  tag:"@Albornozg14",     console:"PS5",  bg:"#003087" },
  "Turquía":       { name:"JABY",     tag:"@Jabyher225",      console:"PS5",  bg:"#003087" },
  "Nueva Zelanda": { name:"JABY",     tag:"@Jabyher225",      console:"PS5",  bg:"#003087" },
  "Colombia":      { name:"JABY",     tag:"@Jabyher225",      console:"PS5",  bg:"#003087" },
  "España":        { name:"JAVIER",   tag:"@Javi-257",        console:"PC",   bg:"#333333" },
  "Irán":          { name:"JAVIER",   tag:"@Javi-257",        console:"PC",   bg:"#333333" },
  "Irak":          { name:"JAVIER",   tag:"@Javi-257",        console:"PC",   bg:"#333333" },
  "EE.UU.":        { name:"JESUS",    tag:"@jesus20124125",   console:"XBOX", bg:"#107C10" },
  "Suiza":         { name:"JESUS",    tag:"@jesus20124125",   console:"XBOX", bg:"#107C10" },
  "Jordania":      { name:"JESUS",    tag:"@jesus20124125",   console:"XBOX", bg:"#107C10" },
  "Alemania":      { name:"JONATHAN", tag:"@guaricho147",     console:"N/A",  bg:"#555555" },
  "Túnez":         { name:"JONATHAN", tag:"@guaricho147",     console:"N/A",  bg:"#555555" },
  "Egipto":        { name:"JONATHAN", tag:"@guaricho147",     console:"N/A",  bg:"#555555" },
  "Bosnia":        { name:"JOSSUA",   tag:"@JossuaElCrack",   console:"PS5",  bg:"#003087" },
  "Australia":     { name:"JOSSUA",   tag:"@JossuaElCrack",   console:"PS5",  bg:"#003087" },
  "Uruguay":       { name:"JOSSUA",   tag:"@JossuaElCrack",   console:"PS5",  bg:"#003087" },
  "Costa de Marfil":{ name:"JOSTHYN", tag:"@josthyn__20",     console:"N/A",  bg:"#555555" },
  "Austria":       { name:"JOSTHYN",  tag:"@josthyn__20",     console:"N/A",  bg:"#555555" },
  "Croacia":       { name:"JOSTHYN",  tag:"@josthyn__20",     console:"N/A",  bg:"#555555" },
  "Rep. Checa":    { name:"MATEO",    tag:"@MrGuillO1927",    console:"XBOX", bg:"#107C10" },
  "Japón":         { name:"MATEO",    tag:"@MrGuillO1927",    console:"XBOX", bg:"#107C10" },
  "Ecuador":       { name:"MATEO",    tag:"@MrGuillO1927",    console:"XBOX", bg:"#107C10" },
  "Qatar":         { name:"MATÍAS",   tag:"@Mati152014",      console:"PS5",  bg:"#003087" },
  "Países Bajos":  { name:"MATÍAS",   tag:"@Mati152014",      console:"PS5",  bg:"#003087" },
  "Uzbekistán":    { name:"MATÍAS",   tag:"@Mati152014",      console:"PS5",  bg:"#003087" },
  "Canadá":        { name:"RAFAEL",   tag:"@karmados",        console:"PS5",  bg:"#003087" },
  "Haití":         { name:"RAFAEL",   tag:"@karmados",        console:"PS5",  bg:"#003087" },
  "Argentina":     { name:"RAFAEL",   tag:"@karmados",        console:"PS5",  bg:"#003087" },
  "Corea del Sur": { name:"ROGER",    tag:"@siempreyowin",    console:"XBOX", bg:"#107C10" },
  "Curazao":       { name:"ROGER",    tag:"@siempreyowin",    console:"XBOX", bg:"#107C10" },
  "Bélgica":       { name:"ROGER",    tag:"@siempreyowin",    console:"XBOX", bg:"#107C10" },
};

// ══════════════════════════════════════════════
// DATA: GRUPOS OFICIALES FIFA WORLD CUP 2026
// (Sorteo final — 5 dic 2025, Washington DC)
// Calendario y orden de partidos según fixture oficial
// ══════════════════════════════════════════════
const FIFA_GROUPS = {
  A: { teams:["México","Sudáfrica","Corea del Sur","Rep. Checa"],
    matches:[
      {id:"A1",t1:"México",t2:"Sudáfrica",date:"Jun 11"},
      {id:"A2",t1:"Corea del Sur",t2:"Rep. Checa",date:"Jun 11"},
      {id:"A3",t1:"Rep. Checa",t2:"Sudáfrica",date:"Jun 18"},
      {id:"A4",t1:"México",t2:"Corea del Sur",date:"Jun 18"},
      {id:"A5",t1:"México",t2:"Rep. Checa",date:"Jun 24"},
      {id:"A6",t1:"Corea del Sur",t2:"Sudáfrica",date:"Jun 24"},
    ]
  },
  B: { teams:["Canadá","Bosnia","Qatar","Suiza"],
    matches:[
      {id:"B1",t1:"Canadá",t2:"Bosnia",date:"Jun 12"},
      {id:"B2",t1:"Qatar",t2:"Suiza",date:"Jun 13"},
      {id:"B3",t1:"Suiza",t2:"Bosnia",date:"Jun 18"},
      {id:"B4",t1:"Canadá",t2:"Qatar",date:"Jun 18"},
      {id:"B5",t1:"Canadá",t2:"Suiza",date:"Jun 24"},
      {id:"B6",t1:"Bosnia",t2:"Qatar",date:"Jun 24"},
    ]
  },
  C: { teams:["Brasil","Marruecos","Haití","Escocia"],
    matches:[
      {id:"C1",t1:"Brasil",t2:"Marruecos",date:"Jun 13"},
      {id:"C2",t1:"Haití",t2:"Escocia",date:"Jun 13"},
      {id:"C3",t1:"Escocia",t2:"Marruecos",date:"Jun 19"},
      {id:"C4",t1:"Brasil",t2:"Haití",date:"Jun 19"},
      {id:"C5",t1:"Escocia",t2:"Brasil",date:"Jun 24"},
      {id:"C6",t1:"Marruecos",t2:"Haití",date:"Jun 24"},
    ]
  },
  D: { teams:["EE.UU.","Paraguay","Australia","Turquía"],
    matches:[
      {id:"D1",t1:"EE.UU.",t2:"Paraguay",date:"Jun 12"},
      {id:"D2",t1:"Australia",t2:"Turquía",date:"Jun 13"},
      {id:"D3",t1:"EE.UU.",t2:"Australia",date:"Jun 19"},
      {id:"D4",t1:"Turquía",t2:"Paraguay",date:"Jun 19"},
      {id:"D5",t1:"EE.UU.",t2:"Turquía",date:"Jun 25"},
      {id:"D6",t1:"Paraguay",t2:"Australia",date:"Jun 25"},
    ]
  },
  E: { teams:["Alemania","Curazao","Costa de Marfil","Ecuador"],
    matches:[
      {id:"E1",t1:"Alemania",t2:"Curazao",date:"Jun 14"},
      {id:"E2",t1:"Costa de Marfil",t2:"Ecuador",date:"Jun 14"},
      {id:"E3",t1:"Alemania",t2:"Costa de Marfil",date:"Jun 20"},
      {id:"E4",t1:"Ecuador",t2:"Curazao",date:"Jun 20"},
      {id:"E5",t1:"Ecuador",t2:"Alemania",date:"Jun 25"},
      {id:"E6",t1:"Curazao",t2:"Costa de Marfil",date:"Jun 25"},
    ]
  },
  F: { teams:["Países Bajos","Japón","Suecia","Túnez"],
    matches:[
      {id:"F1",t1:"Países Bajos",t2:"Japón",date:"Jun 14"},
      {id:"F2",t1:"Suecia",t2:"Túnez",date:"Jun 14"},
      {id:"F3",t1:"Países Bajos",t2:"Suecia",date:"Jun 20"},
      {id:"F4",t1:"Túnez",t2:"Japón",date:"Jun 20"},
      {id:"F5",t1:"Túnez",t2:"Países Bajos",date:"Jun 25"},
      {id:"F6",t1:"Japón",t2:"Suecia",date:"Jun 25"},
    ]
  },
  G: { teams:["Bélgica","Egipto","Irán","Nueva Zelanda"],
    matches:[
      {id:"G1",t1:"Bélgica",t2:"Egipto",date:"Jun 15"},
      {id:"G2",t1:"Irán",t2:"Nueva Zelanda",date:"Jun 15"},
      {id:"G3",t1:"Bélgica",t2:"Irán",date:"Jun 21"},
      {id:"G4",t1:"Nueva Zelanda",t2:"Egipto",date:"Jun 21"},
      {id:"G5",t1:"Nueva Zelanda",t2:"Bélgica",date:"Jun 26"},
      {id:"G6",t1:"Egipto",t2:"Irán",date:"Jun 26"},
    ]
  },
  H: { teams:["España","Cabo Verde","Arabia Saudita","Uruguay"],
    matches:[
      {id:"H1",t1:"España",t2:"Cabo Verde",date:"Jun 15"},
      {id:"H2",t1:"Arabia Saudita",t2:"Uruguay",date:"Jun 15"},
      {id:"H3",t1:"España",t2:"Arabia Saudita",date:"Jun 21"},
      {id:"H4",t1:"Uruguay",t2:"Cabo Verde",date:"Jun 21"},
      {id:"H5",t1:"Uruguay",t2:"España",date:"Jun 26"},
      {id:"H6",t1:"Cabo Verde",t2:"Arabia Saudita",date:"Jun 26"},
    ]
  },
  I: { teams:["Francia","Senegal","Irak","Noruega"],
    matches:[
      {id:"I1",t1:"Francia",t2:"Senegal",date:"Jun 16"},
      {id:"I2",t1:"Irak",t2:"Noruega",date:"Jun 16"},
      {id:"I3",t1:"Francia",t2:"Irak",date:"Jun 22"},
      {id:"I4",t1:"Noruega",t2:"Senegal",date:"Jun 22"},
      {id:"I5",t1:"Noruega",t2:"Francia",date:"Jun 26"},
      {id:"I6",t1:"Senegal",t2:"Irak",date:"Jun 26"},
    ]
  },
  J: { teams:["Argentina","Argelia","Austria","Jordania"],
    matches:[
      {id:"J1",t1:"Argentina",t2:"Argelia",date:"Jun 16"},
      {id:"J2",t1:"Austria",t2:"Jordania",date:"Jun 17"},
      {id:"J3",t1:"Argentina",t2:"Austria",date:"Jun 22"},
      {id:"J4",t1:"Jordania",t2:"Argelia",date:"Jun 22"},
      {id:"J5",t1:"Jordania",t2:"Argentina",date:"Jun 27"},
      {id:"J6",t1:"Argelia",t2:"Austria",date:"Jun 27"},
    ]
  },
  K: { teams:["Portugal","Congo DR","Uzbekistán","Colombia"],
    matches:[
      {id:"K1",t1:"Portugal",t2:"Congo DR",date:"Jun 17"},
      {id:"K2",t1:"Uzbekistán",t2:"Colombia",date:"Jun 17"},
      {id:"K3",t1:"Portugal",t2:"Uzbekistán",date:"Jun 23"},
      {id:"K4",t1:"Colombia",t2:"Congo DR",date:"Jun 23"},
      {id:"K5",t1:"Colombia",t2:"Portugal",date:"Jun 27"},
      {id:"K6",t1:"Congo DR",t2:"Uzbekistán",date:"Jun 27"},
    ]
  },
  L: { teams:["Inglaterra","Croacia","Ghana","Panamá"],
    matches:[
      {id:"L1",t1:"Inglaterra",t2:"Croacia",date:"Jun 17"},
      {id:"L2",t1:"Ghana",t2:"Panamá",date:"Jun 17"},
      {id:"L3",t1:"Inglaterra",t2:"Ghana",date:"Jun 23"},
      {id:"L4",t1:"Panamá",t2:"Croacia",date:"Jun 23"},
      {id:"L5",t1:"Panamá",t2:"Inglaterra",date:"Jun 27"},
      {id:"L6",t1:"Croacia",t2:"Ghana",date:"Jun 27"},
    ]
  },
};

const FLAGS = {
  "México":"🇲🇽","Sudáfrica":"🇿🇦","Corea del Sur":"🇰🇷","Rep. Checa":"🇨🇿",
  "Canadá":"🇨🇦","Bosnia":"🇧🇦","Qatar":"🇶🇦","Suiza":"🇨🇭",
  "Brasil":"🇧🇷","Marruecos":"🇲🇦","Haití":"🇭🇹","Escocia":"🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  "EE.UU.":"🇺🇸","Paraguay":"🇵🇾","Australia":"🇦🇺","Turquía":"🇹🇷",
  "Alemania":"🇩🇪","Curazao":"🇨🇼","Costa de Marfil":"🇨🇮","Ecuador":"🇪🇨",
  "Países Bajos":"🇳🇱","Japón":"🇯🇵","Suecia":"🇸🇪","Túnez":"🇹🇳",
  "Bélgica":"🇧🇪","Egipto":"🇪🇬","Irán":"🇮🇷","Nueva Zelanda":"🇳🇿",
  "España":"🇪🇸","Cabo Verde":"🇨🇻","Arabia Saudita":"🇸🇦","Uruguay":"🇺🇾",
  "Francia":"🇫🇷","Senegal":"🇸🇳","Irak":"🇮🇶","Noruega":"🇳🇴",
  "Argentina":"🇦🇷","Argelia":"🇩🇿","Austria":"🇦🇹","Jordania":"🇯🇴",
  "Portugal":"🇵🇹","Congo DR":"🇨🇩","Uzbekistán":"🇺🇿","Colombia":"🇨🇴",
  "Inglaterra":"🏴󠁧󠁢󠁥󠁮󠁧󠁿","Croacia":"🇭🇷","Ghana":"🇬🇭","Panamá":"🇵🇦",
};

// ══════════════════════════════════════════════
// STANDINGS CALCULATION (FIFA criteria)
// PTS → DIF → GF → H2H PTS → H2H DIF → H2H GF → sorteo
// ══════════════════════════════════════════════
function calcStats(teams, results) {
  const stats = {};
  teams.forEach(t => { stats[t] = {team:t,pj:0,g:0,e:0,p:0,gf:0,gc:0,pts:0}; });
  results.forEach(r => {
    if(r.g1 === "" || r.g2 === "" || r.g1 === null || r.g2 === null) return;
    const g1 = parseInt(r.g1), g2 = parseInt(r.g2);
    if(isNaN(g1) || isNaN(g2)) return;
    const s1 = stats[r.t1], s2 = stats[r.t2];
    if(!s1 || !s2) return;
    s1.pj++; s2.pj++;
    s1.gf += g1; s1.gc += g2;
    s2.gf += g2; s2.gc += g1;
    if(g1 > g2){ s1.g++; s1.pts+=3; s2.p++; }
    else if(g2 > g1){ s2.g++; s2.pts+=3; s1.p++; }
    else { s1.e++; s2.e++; s1.pts+=1; s2.pts+=1; }
  });
  return stats;
}

function sortStandings(teams, stats, results) {
  const sorted = [...teams];
  sorted.sort((a,b) => {
    const sa = stats[a], sb = stats[b];
    if(sb.pts !== sa.pts) return sb.pts - sa.pts;
    const da = sa.gf - sa.gc, db = sb.gf - sb.gc;
    if(db !== da) return db - da;
    if(sb.gf !== sa.gf) return sb.gf - sa.gf;
    // Head to head
    const h2h = getH2H([a,b], results);
    const ha = h2h[a], hb = h2h[b];
    if(hb.pts !== ha.pts) return hb.pts - ha.pts;
    const hda = ha.gf-ha.gc, hdb = hb.gf-hb.gc;
    if(hdb !== hda) return hdb - hda;
    if(hb.gf !== ha.gf) return hb.gf - ha.gf;
    return a.localeCompare(b);
  });
  return sorted;
}

function getH2H(teams, results) {
  const h = {};
  teams.forEach(t => { h[t] = {pts:0,gf:0,gc:0}; });
  results.forEach(r => {
    if(!teams.includes(r.t1) || !teams.includes(r.t2)) return;
    if(r.g1 === "" || r.g2 === "") return;
    const g1 = parseInt(r.g1), g2 = parseInt(r.g2);
    if(isNaN(g1)||isNaN(g2)) return;
    h[r.t1].gf+=g1; h[r.t1].gc+=g2;
    h[r.t2].gf+=g2; h[r.t2].gc+=g1;
    if(g1>g2){ h[r.t1].pts+=3; }
    else if(g2>g1){ h[r.t2].pts+=3; }
    else { h[r.t1].pts+=1; h[r.t2].pts+=1; }
  });
  return h;
}

// ══════════════════════════════════════════════
// HTML GENERATION FUNCTIONS
// ══════════════════════════════════════════════
function generateStandingsHTML(allResults) {
  const groupKeys = Object.keys(FIFA_GROUPS);
  let groupsHTML = "";
  groupKeys.forEach(gk => {
    const grp = FIFA_GROUPS[gk];
    const results = (allResults[gk]||[]).filter(r=>r.g1!==""&&r.g2!=="");
    const stats = calcStats(grp.teams, results);
    const sorted = sortStandings(grp.teams, stats, results);
    groupsHTML += `
    <div class="group-block">
      <div class="group-title">GRUPO ${gk}</div>
      <table class="standings-table">
        <thead><tr>
          <th class="t-team">SELECCIÓN</th>
          <th>PJ</th><th>G</th><th>E</th><th>P</th>
          <th>GF</th><th>GC</th><th>DIF</th><th class="t-pts">PTS</th>
          <th class="t-player">JUGADOR</th>
        </tr></thead>
        <tbody>
          ${sorted.map((team,idx)=>{
            const s = stats[team];
            const p = PLAYERS[team];
            const qualify = idx<2 ? "qualify" : "";
            const isTop = idx===0 ? "first" : idx===1 ? "second" : "";
            return `<tr class="row ${qualify} ${isTop}">
              <td class="t-team"><span class="flag">${FLAGS[team]||""}</span>${team}</td>
              <td>${s.pj}</td><td>${s.g}</td><td>${s.e}</td><td>${s.p}</td>
              <td>${s.gf}</td><td>${s.gc}</td>
              <td class="${s.gf-s.gc>0?"pos":s.gf-s.gc<0?"neg":""}">${s.gf-s.gc>0?"+":""}${s.gf-s.gc}</td>
              <td class="t-pts">${s.pts}</td>
              <td class="t-player">${p?`<span class="console-dot" style="background:${p.bg}">${p.console}</span>${p.name}`:"-"}</td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>
    </div>`;
  });

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>3ra Copa CANTV — Posiciones</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#07111f;color:#fff;font-family:-apple-system,system-ui,Helvetica,Arial,sans-serif;padding-bottom:40px}
.hero{background:linear-gradient(135deg,#0d1e3a,#071020);border-bottom:3px solid #c9a84c;padding:20px;text-align:center}
.hero h1{font-size:26px;font-weight:900;color:#fff;letter-spacing:2px}
.hero h2{font-size:13px;color:#c9a84c;letter-spacing:4px;margin-top:4px}
.updated{font-size:10px;color:rgba(255,255,255,.3);margin-top:6px;letter-spacing:1px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(480px,1fr));gap:20px;max-width:1200px;margin:20px auto;padding:0 16px}
.group-block{background:#0d1e3a;border:1px solid rgba(201,168,76,.25);border-radius:10px;overflow:hidden}
.group-title{background:#c9a84c;color:#07111f;font-size:14px;font-weight:900;letter-spacing:3px;padding:8px 14px;text-align:center}
.standings-table{width:100%;border-collapse:collapse;font-size:12px}
.standings-table th{background:rgba(201,168,76,.12);color:rgba(201,168,76,.8);font-size:10px;letter-spacing:1px;padding:6px 6px;text-align:center;border-bottom:1px solid rgba(201,168,76,.2)}
.standings-table td{padding:7px 6px;text-align:center;border-bottom:1px solid rgba(255,255,255,.05)}
.t-team{text-align:left!important;padding-left:10px!important;min-width:130px;font-weight:600}
.t-pts{font-weight:900;color:#c9a84c!important;font-size:14px!important}
.t-player{text-align:left!important;font-size:11px;color:rgba(255,255,255,.6);min-width:120px}
.flag{margin-right:5px}
.pos{color:#4ade80;font-weight:700}
.neg{color:#f87171;font-weight:700}
.row:hover td{background:rgba(201,168,76,.06)}
.qualify td{border-left:2px solid transparent}
.first td{border-left:2px solid #ffd700}
.second td{border-left:2px solid rgba(255,215,0,.4)}
.console-dot{font-size:8px;font-weight:800;padding:1px 4px;border-radius:3px;margin-right:4px;font-family:monospace;color:#fff}
.footer{text-align:center;color:rgba(255,255,255,.15);font-size:10px;margin-top:24px;letter-spacing:1px}
@media(max-width:520px){.grid{grid-template-columns:1fr}.t-player{display:none}}
</style>
</head>
<body>
<div class="hero">
  <div style="font-size:11px;letter-spacing:3px;color:rgba(201,168,76,.7);margin-bottom:4px">FIFA WORLD CUP 2026</div>
  <h1>3RA COPA CANTV</h1>
  <h2>TABLA DE POSICIONES</h2>
  <div class="updated">Actualizado: ${new Date().toLocaleString("es-MX")}</div>
</div>
<div class="grid">${groupsHTML}</div>
<div class="footer">Criterios FIFA: PTS → DIF → GF → H2H PTS → H2H DIF → H2H GF</div>
</body>
</html>`;
}

function generateBracketHTML(allResults) {
  const qualifiers = {};
  const thirdPlaces = [];
  const groupKeys = Object.keys(FIFA_GROUPS);

  groupKeys.forEach(gk => {
    const grp = FIFA_GROUPS[gk];
    const results = (allResults[gk]||[]).filter(r=>r.g1!==""&&r.g2!=="");
    const stats = calcStats(grp.teams, results);
    const sorted = sortStandings(grp.teams, stats, results);
    qualifiers[gk] = { first: sorted[0], second: sorted[1], third: sorted[2] };
    const s3 = stats[sorted[2]];
    if(s3) thirdPlaces.push({ group:gk, team:sorted[2], pts:s3.pts, gd:s3.gf-s3.gc, gf:s3.gf });
  });

  thirdPlaces.sort((a,b)=> b.pts!==a.pts?b.pts-a.pts:b.gd!==a.gd?b.gd-a.gd:b.gf-a.gf);
  const best8thirds = thirdPlaces.slice(0,8);

  const label = (team, group) => {
    if(!team) return `<div class="slot tbd">Por definir</div>`;
    const p = PLAYERS[team];
    const flag = FLAGS[team]||"";
    return `<div class="slot">
      <div class="slot-team">${flag} ${team}</div>
      ${p?`<div class="slot-player">${p.name} <span class="slot-tag">${p.tag}</span></div>`:""}
      <div class="slot-group">Grupo ${group}</div>
    </div>`;
  };

  const pairings = [
    { a:{ team:qualifiers.A?.first, grp:"A"}, b:{team:qualifiers.B?.second, grp:"B"} },
    { a:{ team:qualifiers.C?.first, grp:"C"}, b:{team:qualifiers.D?.second, grp:"D"} },
    { a:{ team:qualifiers.E?.first, grp:"E"}, b:{team:qualifiers.F?.second, grp:"F"} },
    { a:{ team:qualifiers.G?.first, grp:"G"}, b:{team:qualifiers.H?.second, grp:"H"} },
    { a:{ team:qualifiers.I?.first, grp:"I"}, b:{team:qualifiers.J?.second, grp:"J"} },
    { a:{ team:qualifiers.K?.first, grp:"K"}, b:{team:qualifiers.L?.second, grp:"L"} },
    { a:{ team:qualifiers.B?.first, grp:"B"}, b:{team:qualifiers.A?.second, grp:"A"} },
    { a:{ team:qualifiers.D?.first, grp:"D"}, b:{team:qualifiers.C?.second, grp:"C"} },
    { a:{ team:qualifiers.F?.first, grp:"F"}, b:{team:qualifiers.E?.second, grp:"E"} },
    { a:{ team:qualifiers.H?.first, grp:"H"}, b:{team:qualifiers.G?.second, grp:"G"} },
    { a:{ team:qualifiers.J?.first, grp:"J"}, b:{team:qualifiers.I?.second, grp:"I"} },
    { a:{ team:qualifiers.L?.first, grp:"L"}, b:{team:qualifiers.K?.second, grp:"K"} },
    { a:{ team:best8thirds[0]?.team, grp:best8thirds[0]?.group||"?"}, b:{team:null, grp:"?"} },
    { a:{ team:best8thirds[1]?.team, grp:best8thirds[1]?.group||"?"}, b:{team:null, grp:"?"} },
    { a:{ team:best8thirds[2]?.team, grp:best8thirds[2]?.group||"?"}, b:{team:null, grp:"?"} },
    { a:{ team:best8thirds[3]?.team, grp:best8thirds[3]?.group||"?"}, b:{team:null, grp:"?"} },
  ];

  const matchCards = pairings.map((m,i)=>`
    <div class="match-card">
      <div class="match-num">Octavo R32-${String(i+1).padStart(2,"0")}</div>
      ${label(m.a.team, m.a.grp)}
      <div class="vs-sep">VS</div>
      ${label(m.b.team, m.b.grp)}
    </div>`).join("");

  const thirds3HTML = thirdPlaces.length ? `
  <div class="thirds-section">
    <div class="thirds-title">MEJORES TERCEROS — CLASIFICACIÓN AL OCTAVOS</div>
    <table class="thirds-table">
      <thead><tr><th>#</th><th>GRUPO</th><th>SELECCIÓN</th><th>PTS</th><th>DIF</th><th>GF</th><th>ESTADO</th></tr></thead>
      <tbody>
        ${thirdPlaces.map((t,i)=>{
          const classifica = i<8;
          return `<tr class="${classifica?"top8":""}">
            <td>${i+1}</td>
            <td>${t.group}</td>
            <td>${FLAGS[t.team]||""} ${t.team}</td>
            <td class="${classifica?"pts-ok":""}">${t.pts}</td>
            <td>${t.gd>=0?"+":""}${t.gd}</td>
            <td>${t.gf}</td>
            <td>${classifica?'<span class="badge-ok">✓ CLASIFICA</span>':'<span class="badge-out">✗</span>'}</td>
          </tr>`;
        }).join("")}
      </tbody>
    </table>
  </div>` : "";

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>3ra Copa CANTV — Octavos de Final</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#07111f;color:#fff;font-family:-apple-system,system-ui,Helvetica,Arial,sans-serif;padding-bottom:40px}
.hero{background:linear-gradient(135deg,#0d1e3a,#071020);border-bottom:3px solid #c9a84c;padding:20px;text-align:center}
.hero h1{font-size:26px;font-weight:900;color:#fff;letter-spacing:2px}
.hero h2{font-size:13px;color:#c9a84c;letter-spacing:4px;margin-top:4px}
.updated{font-size:10px;color:rgba(255,255,255,.3);margin-top:6px}
.bracket-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px;max-width:1200px;margin:20px auto;padding:0 16px}
.match-card{background:#0d1e3a;border:1px solid rgba(201,168,76,.25);border-radius:10px;padding:12px;position:relative}
.match-num{font-size:9px;color:rgba(201,168,76,.5);letter-spacing:2px;margin-bottom:8px;font-weight:700}
.slot{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:6px;padding:8px 10px;margin:4px 0}
.slot.tbd{border-style:dashed;border-color:rgba(255,255,255,.2)}
.slot-team{font-size:14px;font-weight:700;color:#fff}
.slot-player{font-size:11px;color:#c9a84c;margin-top:2px}
.slot-tag{color:rgba(255,255,255,.4);font-family:monospace;font-size:10px}
.slot-group{font-size:9px;color:rgba(255,255,255,.3);margin-top:2px;letter-spacing:1px}
.vs-sep{text-align:center;font-size:11px;font-weight:900;color:rgba(255,255,255,.25);padding:4px 0;letter-spacing:3px}
.thirds-section{max-width:700px;margin:24px auto;padding:0 16px}
.thirds-title{font-size:12px;letter-spacing:2px;color:#c9a84c;font-weight:800;text-align:center;padding:12px 0;border-bottom:1px solid rgba(201,168,76,.3);margin-bottom:12px}
.thirds-table{width:100%;border-collapse:collapse;font-size:12px;background:#0d1e3a;border-radius:8px;overflow:hidden}
.thirds-table th{background:rgba(201,168,76,.12);color:rgba(201,168,76,.7);font-size:10px;padding:8px;text-align:center;letter-spacing:1px}
.thirds-table td{padding:8px;text-align:center;border-bottom:1px solid rgba(255,255,255,.05)}
.top8{background:rgba(74,222,128,.05)}
.pts-ok{color:#4ade80;font-weight:900}
.badge-ok{background:#4ade80;color:#07111f;font-size:9px;padding:2px 6px;border-radius:3px;font-weight:800}
.badge-out{color:rgba(255,255,255,.3);font-size:12px}
.note{max-width:700px;margin:16px auto;padding:0 16px;font-size:11px;color:rgba(255,255,255,.35);text-align:center;line-height:1.6}
.footer{text-align:center;color:rgba(255,255,255,.12);font-size:10px;margin-top:24px;letter-spacing:1px}
</style>
</head>
<body>
<div class="hero">
  <div style="font-size:11px;letter-spacing:3px;color:rgba(201,168,76,.7);margin-bottom:4px">FIFA WORLD CUP 2026</div>
  <h1>3RA COPA CANTV</h1>
  <h2>OCTAVOS DE FINAL — PROYECCIÓN</h2>
  <div class="updated">Actualizado: ${new Date().toLocaleString("es-MX")}</div>
</div>
<div class="bracket-grid">${matchCards}</div>
${thirds3HTML}
<div class="note">⚡ Proyección basada en resultados actuales según criterios FIFA (PTS → DIF → GF → H2H). Los 4 cruces inferiores (mejores terceros) se completan conforme avanzan los grupos.</div>
<div class="footer">3RA COPA CANTV · GRUPOS OFICIALES FIFA WORLD CUP 2026</div>
</body>
</html>`;
}

// ══════════════════════════════════════════════
// MAIN APP COMPONENT
// ══════════════════════════════════════════════
export default function CopaCantv() {
  const [results, setResults] = useState({});
  const [activeGroup, setActiveGroup] = useState("A");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("results"); // results | standings | bracket

  // Load from storage
  useEffect(() => {
    async function load() {
      try {
        const r = await window.storage.get("cantv-results-2026");
        if(r && r.value) setResults(JSON.parse(r.value));
      } catch(e) {}
      setLoading(false);
    }
    load();
  }, []);

  // Init group results
  useEffect(() => {
    const gk = activeGroup;
    const grp = FIFA_GROUPS[gk];
    if(!grp) return;
    setResults(prev => {
      if(prev[gk]) return prev;
      const init = {};
      grp.matches.forEach(m => { init[m.id] = {t1:m.t1, t2:m.t2, g1:"", g2:"", date:m.date}; });
      return {...prev, [gk]: Object.values(init)};
    });
  }, [activeGroup]);

  const handleScore = useCallback((gk, matchId, field, val) => {
    setResults(prev => {
      const grpResults = [...(prev[gk]||[])];
      const mIdx = grpResults.findIndex((_,i)=> {
        const matches = FIFA_GROUPS[gk].matches;
        return matches[i]?.id === matchId;
      });
      if(mIdx >= 0) {
        const updated = [...grpResults];
        updated[mIdx] = {...updated[mIdx], [field]: val};
        return {...prev, [gk]: updated};
      }
      return prev;
    });
  }, []);

  const handleSave = async () => {
    try {
      const toSave = {};
      Object.keys(FIFA_GROUPS).forEach(gk => {
        const grp = FIFA_GROUPS[gk];
        const grpRes = results[gk] || [];
        toSave[gk] = grp.matches.map((m, i) => ({
          ...m,
          g1: grpRes[i]?.g1 ?? "",
          g2: grpRes[i]?.g2 ?? "",
        }));
      });
      await window.storage.set("cantv-results-2026", JSON.stringify(toSave));

      const standingsHTML = generateStandingsHTML(toSave);
      await window.storage.set("cantv-standings-html", standingsHTML, true);

      const bracketHTML = generateBracketHTML(toSave);
      await window.storage.set("cantv-bracket-html", bracketHTML, true);

      setSaved(true);
      setTimeout(()=>setSaved(false), 2500);
    } catch(e) {
      alert("Error al guardar: " + e.message);
    }
  };

  const getGroupStats = useCallback((gk) => {
    const grp = FIFA_GROUPS[gk];
    const grpRes = results[gk] || [];
    const mapped = grp.matches.map((m,i) => ({...m, g1:grpRes[i]?.g1??"", g2:grpRes[i]?.g2??""}));
    const stats = calcStats(grp.teams, mapped);
    return sortStandings(grp.teams, stats, mapped).map(t => ({team:t,...stats[t]}));
  }, [results]);

  if(loading) return (
    <div style={{background:"#07111f",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",color:"#c9a84c",fontSize:18,letterSpacing:3}}>
      CARGANDO...
    </div>
  );

  const grpKeys = Object.keys(FIFA_GROUPS);

  const StandingsView = () => (
    <div style={{padding:"0 0 20px"}}>
      {grpKeys.map(gk => {
        const grp = FIFA_GROUPS[gk];
        const grpRes = results[gk]||[];
        const mapped = grp.matches.map((m,i)=>({...m,g1:grpRes[i]?.g1??"",g2:grpRes[i]?.g2??""}));
        const stats = calcStats(grp.teams, mapped);
        const sorted = sortStandings(grp.teams, stats, mapped);
        return (
          <div key={gk} style={{marginBottom:16}}>
            <div style={{background:"#c9a84c",color:"#07111f",fontWeight:900,fontSize:13,letterSpacing:3,padding:"6px 14px",textAlign:"center"}}>GRUPO {gk}</div>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
              <thead>
                <tr style={{background:"rgba(201,168,76,.1)"}}>
                  <th style={{textAlign:"left",padding:"5px 8px",color:"rgba(201,168,76,.8)",fontSize:9,letterSpacing:1}}>SELECCIÓN</th>
                  {["PJ","G","E","P","GF","GC","DIF","PTS"].map(h=>(
                    <th key={h} style={{padding:"5px 5px",color:"rgba(201,168,76,.8)",fontSize:9,letterSpacing:1,textAlign:"center"}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sorted.map((team,idx)=>{
                  const s = stats[team];
                  const dif = s.gf-s.gc;
                  const isQ = idx<2;
                  return (
                    <tr key={team} style={{background: idx===0?"rgba(255,215,0,.05)":idx===1?"rgba(255,215,0,.02)":"transparent", borderBottom:"1px solid rgba(255,255,255,.05)"}}>
                      <td style={{padding:"6px 8px",fontWeight:600,color:isQ?"#fff":"rgba(255,255,255,.6)",borderLeft:`2px solid ${idx===0?"#ffd700":idx===1?"rgba(255,215,0,.3)":"transparent"}`}}>
                        {FLAGS[team]||""} {team}
                      </td>
                      <td style={{textAlign:"center",padding:"6px 4px"}}>{s.pj}</td>
                      <td style={{textAlign:"center",padding:"6px 4px"}}>{s.g}</td>
                      <td style={{textAlign:"center",padding:"6px 4px"}}>{s.e}</td>
                      <td style={{textAlign:"center",padding:"6px 4px"}}>{s.p}</td>
                      <td style={{textAlign:"center",padding:"6px 4px"}}>{s.gf}</td>
                      <td style={{textAlign:"center",padding:"6px 4px"}}>{s.gc}</td>
                      <td style={{textAlign:"center",padding:"6px 4px",color:dif>0?"#4ade80":dif<0?"#f87171":"#fff",fontWeight:700}}>{dif>0?"+":""}{dif}</td>
                      <td style={{textAlign:"center",padding:"6px 4px",fontWeight:900,color:"#c9a84c",fontSize:14}}>{s.pts}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );

  const BracketView = () => {
    const qualifiers = {};
    const thirdPlaces = [];
    grpKeys.forEach(gk => {
      const grp = FIFA_GROUPS[gk];
      const grpRes = results[gk]||[];
      const mapped = grp.matches.map((m,i)=>({...m,g1:grpRes[i]?.g1??"",g2:grpRes[i]?.g2??""}));
      const stats = calcStats(grp.teams, mapped);
      const sorted = sortStandings(grp.teams, stats, mapped);
      qualifiers[gk] = {first:sorted[0], second:sorted[1]};
      const s3 = stats[sorted[2]];
      if(s3) thirdPlaces.push({group:gk, team:sorted[2], pts:s3.pts, gd:s3.gf-s3.gc, gf:s3.gf});
    });
    thirdPlaces.sort((a,b)=>b.pts!==a.pts?b.pts-a.pts:b.gd!==a.gd?b.gd-a.gd:b.gf-a.gf);

    const SlotComp = ({team, grp}) => {
      if(!team) return <div style={{background:"rgba(255,255,255,.03)",border:"1px dashed rgba(255,255,255,.15)",borderRadius:6,padding:"8px 10px",marginBottom:4,fontSize:12,color:"rgba(255,255,255,.3)"}}>Por definir</div>;
      const p = PLAYERS[team];
      return (
        <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.1)",borderRadius:6,padding:"8px 10px",marginBottom:4}}>
          <div style={{fontSize:14,fontWeight:700}}>{FLAGS[team]||""} {team}</div>
          {p && <div style={{fontSize:11,color:"#c9a84c",marginTop:2}}>{p.name} <span style={{color:"rgba(255,255,255,.35)",fontFamily:"monospace",fontSize:10}}>{p.tag}</span></div>}
          <div style={{fontSize:9,color:"rgba(255,255,255,.3)",marginTop:1,letterSpacing:1}}>Grupo {grp} · {grp?qualifiers[grp]?.first===team?"1°":"2°":""}</div>
        </div>
      );
    };

    const pairings = [
      {a:{team:qualifiers.A?.first,grp:"A"}, b:{team:qualifiers.B?.second,grp:"B"}},
      {a:{team:qualifiers.C?.first,grp:"C"}, b:{team:qualifiers.D?.second,grp:"D"}},
      {a:{team:qualifiers.E?.first,grp:"E"}, b:{team:qualifiers.F?.second,grp:"F"}},
      {a:{team:qualifiers.G?.first,grp:"G"}, b:{team:qualifiers.H?.second,grp:"H"}},
      {a:{team:qualifiers.I?.first,grp:"I"}, b:{team:qualifiers.J?.second,grp:"J"}},
      {a:{team:qualifiers.K?.first,grp:"K"}, b:{team:qualifiers.L?.second,grp:"L"}},
      {a:{team:qualifiers.B?.first,grp:"B"}, b:{team:qualifiers.A?.second,grp:"A"}},
      {a:{team:qualifiers.D?.first,grp:"D"}, b:{team:qualifiers.C?.second,grp:"C"}},
      {a:{team:qualifiers.F?.first,grp:"F"}, b:{team:qualifiers.E?.second,grp:"E"}},
      {a:{team:qualifiers.H?.first,grp:"H"}, b:{team:qualifiers.G?.second,grp:"G"}},
      {a:{team:qualifiers.J?.first,grp:"J"}, b:{team:qualifiers.I?.second,grp:"I"}},
      {a:{team:qualifiers.L?.first,grp:"L"}, b:{team:qualifiers.K?.second,grp:"K"}},
      {a:{team:thirdPlaces[0]?.team,grp:thirdPlaces[0]?.group}, b:{team:null,grp:"?"}},
      {a:{team:thirdPlaces[1]?.team,grp:thirdPlaces[1]?.group}, b:{team:null,grp:"?"}},
      {a:{team:thirdPlaces[2]?.team,grp:thirdPlaces[2]?.group}, b:{team:null,grp:"?"}},
      {a:{team:thirdPlaces[3]?.team,grp:thirdPlaces[3]?.group}, b:{team:null,grp:"?"}},
    ];

    return (
      <div style={{padding:"0 0 20px"}}>
        <div style={{textAlign:"center",fontSize:11,color:"rgba(255,255,255,.35)",padding:"10px 16px 16px",lineHeight:1.6}}>
          Proyección basada en resultados actuales. Los equipos sin partidos se ubican por criterio provisional.
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:10,padding:"0 12px"}}>
          {pairings.map((m,i)=>(
            <div key={i} style={{background:"#0d1e3a",border:"1px solid rgba(201,168,76,.2)",borderRadius:10,padding:10}}>
              <div style={{fontSize:9,color:"rgba(201,168,76,.5)",letterSpacing:2,fontWeight:700,marginBottom:8}}>OCTAVO R32-{String(i+1).padStart(2,"0")}</div>
              <SlotComp team={m.a.team} grp={m.a.grp} />
              <div style={{textAlign:"center",fontSize:10,fontWeight:900,color:"rgba(255,255,255,.2)",padding:"2px 0",letterSpacing:3}}>VS</div>
              <SlotComp team={m.b.team} grp={m.b.grp} />
            </div>
          ))}
        </div>
        <div style={{maxWidth:600,margin:"20px auto",padding:"0 12px"}}>
          <div style={{background:"#0d1e3a",borderRadius:10,overflow:"hidden",border:"1px solid rgba(201,168,76,.2)"}}>
            <div style={{background:"rgba(201,168,76,.12)",padding:"8px 14px",fontSize:11,color:"#c9a84c",fontWeight:800,letterSpacing:2}}>RANKING MEJORES TERCEROS</div>
            {thirdPlaces.map((t,i)=>(
              <div key={t.team} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 12px",borderBottom:"1px solid rgba(255,255,255,.05)",background:i<8?"rgba(74,222,128,.04)":"transparent"}}>
                <span style={{fontSize:11,color:"rgba(255,255,255,.4)",width:18}}>{i+1}°</span>
                <span style={{fontSize:12,flex:1}}>{FLAGS[t.team]||""} {t.team} <span style={{color:"rgba(255,255,255,.35)",fontSize:10}}>Gr.{t.group}</span></span>
                <span style={{fontSize:11,color:"#c9a84c",fontWeight:900,width:30}}>{t.pts}pts</span>
                <span style={{fontSize:10,color:t.gd>=0?"#4ade80":"#f87171",width:30}}>{t.gd>=0?"+":""}{t.gd}</span>
                {i<8?<span style={{fontSize:9,background:"#4ade80",color:"#07111f",padding:"1px 5px",borderRadius:3,fontWeight:800}}>✓</span>:<span style={{fontSize:10,color:"rgba(255,255,255,.25)"}}>✗</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{background:"#07111f",minHeight:"100vh",color:"#fff",fontFamily:"-apple-system,system-ui,Helvetica,Arial,sans-serif"}}>
      {/* HERO */}
      <div style={{background:"linear-gradient(135deg,#0d1e3a,#071020)",borderBottom:"3px solid #c9a84c",padding:"18px 16px",textAlign:"center"}}>
        <div style={{fontSize:10,letterSpacing:4,color:"rgba(201,168,76,.65)",marginBottom:4}}>FIFA WORLD CUP 2026 · USA · CAN · MEX</div>
        <h1 style={{fontSize:26,fontWeight:900,letterSpacing:2,color:"#fff",lineHeight:1.1}}>3RA COPA CANTV</h1>
        <div style={{fontSize:12,color:"#c9a84c",letterSpacing:3,marginTop:3}}>GESTIÓN DE RESULTADOS</div>
      </div>

      {/* TABS */}
      <div style={{display:"flex",borderBottom:"1px solid rgba(255,255,255,.08)",background:"#0a1628"}}>
        {[{id:"results",label:"RESULTADOS"},{id:"standings",label:"POSICIONES"},{id:"bracket",label:"OCTAVOS"}].map(tab=>(
          <button key={tab.id} onClick={()=>setActiveTab(tab.id)} style={{
            flex:1,padding:"12px 0",background:"transparent",border:"none",
            borderBottom:activeTab===tab.id?"2px solid #c9a84c":"2px solid transparent",
            color:activeTab===tab.id?"#c9a84c":"rgba(255,255,255,.4)",
            fontSize:10,fontWeight:800,letterSpacing:2,cursor:"pointer",transition:"all .2s"
          }}>{tab.label}</button>
        ))}
      </div>

      {activeTab === "results" && (
        <div>
          {/* Group selector */}
          <div style={{padding:"12px 12px 0",overflowX:"auto"}}>
            <div style={{display:"flex",gap:6,minWidth:"max-content"}}>
              {grpKeys.map(gk=>{
                const grpRes = results[gk]||[];
                const played = grpRes.filter(r=>r.g1!==""&&r.g2!=="").length;
                const total = FIFA_GROUPS[gk].matches.length;
                return (
                  <button key={gk} onClick={()=>setActiveGroup(gk)} style={{
                    padding:"8px 14px",background:activeGroup===gk?"#c9a84c":"#0d1e3a",
                    border:`1px solid ${activeGroup===gk?"#c9a84c":"rgba(201,168,76,.3)"}`,
                    borderRadius:6,color:activeGroup===gk?"#07111f":"#c9a84c",
                    fontWeight:800,fontSize:12,letterSpacing:1,cursor:"pointer",
                    position:"relative",minWidth:52
                  }}>
                    {gk}
                    {played>0&&<span style={{position:"absolute",top:-4,right:-4,background:"#4ade80",color:"#07111f",fontSize:8,borderRadius:10,padding:"1px 4px",fontWeight:900}}>{played}/{total}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Matches */}
          <div style={{padding:12}}>
            {(() => {
              const gk = activeGroup;
              const grp = FIFA_GROUPS[gk];
              const grpRes = results[gk]||grp.matches.map(m=>({...m,g1:"",g2:""}));
              return (
                <div>
                  <div style={{fontSize:10,letterSpacing:3,color:"rgba(201,168,76,.6)",textAlign:"center",marginBottom:12,fontWeight:700}}>
                    GRUPO {gk} — {grp.teams.map(t=>t).join(" · ")}
                  </div>
                  {grp.matches.map((m,i)=>{
                    const r = grpRes[i]||{g1:"",g2:""};
                    const p1 = PLAYERS[m.t1], p2 = PLAYERS[m.t2];
                    const hasResult = r.g1!==""&&r.g2!=="";
                    const jornada = i<2?"JORNADA 1":i<4?"JORNADA 2":"JORNADA 3";
                    const showJornada = i===0||i===2||i===4;
                    return (
                      <div key={m.id}>
                        {showJornada && <div style={{fontSize:9,letterSpacing:2,color:"rgba(255,255,255,.25)",padding:"8px 4px 4px",fontWeight:700}}>{jornada}</div>}
                        <div style={{background:"#0d1e3a",border:`1px solid ${hasResult?"rgba(74,222,128,.3)":"rgba(255,255,255,.06)"}`,borderRadius:10,padding:12,marginBottom:8}}>
                          <div style={{fontSize:9,color:"rgba(255,255,255,.3)",letterSpacing:2,marginBottom:8}}>{m.date}</div>
                          <div style={{display:"flex",alignItems:"center",gap:8}}>
                            {/* Team 1 */}
                            <div style={{flex:1}}>
                              <div style={{fontSize:13,fontWeight:700,marginBottom:3}}>{FLAGS[m.t1]||""} {m.t1}</div>
                              {p1&&<div style={{fontSize:10,color:"rgba(201,168,76,.7)"}}>{p1.name} <span style={{fontSize:9,color:"rgba(255,255,255,.35)",fontFamily:"monospace"}}>{p1.tag}</span></div>}
                            </div>
                            {/* Scores */}
                            <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                              <input
                                type="number" min="0" max="99"
                                value={r.g1}
                                onChange={e=>handleScore(gk,m.id,"g1",e.target.value)}
                                style={{width:44,height:40,background:"#07111f",border:`1px solid ${hasResult?"#4ade80":"rgba(255,255,255,.15)"}`,borderRadius:6,color:"#fff",fontSize:20,fontWeight:900,textAlign:"center",outline:"none"}}
                              />
                              <span style={{color:"rgba(255,255,255,.3)",fontWeight:700,fontSize:12}}>:</span>
                              <input
                                type="number" min="0" max="99"
                                value={r.g2}
                                onChange={e=>handleScore(gk,m.id,"g2",e.target.value)}
                                style={{width:44,height:40,background:"#07111f",border:`1px solid ${hasResult?"#4ade80":"rgba(255,255,255,.15)"}`,borderRadius:6,color:"#fff",fontSize:20,fontWeight:900,textAlign:"center",outline:"none"}}
                              />
                            </div>
                            {/* Team 2 */}
                            <div style={{flex:1,textAlign:"right"}}>
                              <div style={{fontSize:13,fontWeight:700,marginBottom:3}}>{m.t2} {FLAGS[m.t2]||""}</div>
                              {p2&&<div style={{fontSize:10,color:"rgba(201,168,76,.7)"}}><span style={{fontSize:9,color:"rgba(255,255,255,.35)",fontFamily:"monospace"}}>{p2.tag}</span> {p2.name}</div>}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Mini standings preview */}
                  <div style={{marginTop:16,background:"#0a1628",borderRadius:8,overflow:"hidden",border:"1px solid rgba(201,168,76,.15)"}}>
                    <div style={{padding:"6px 12px",fontSize:9,color:"rgba(201,168,76,.6)",letterSpacing:2,fontWeight:700}}>POSICIÓN ACTUAL — GRUPO {gk}</div>
                    {getGroupStats(gk).map((s,idx)=>(
                      <div key={s.team} style={{display:"flex",alignItems:"center",gap:6,padding:"6px 12px",borderBottom:"1px solid rgba(255,255,255,.04)",borderLeft:`2px solid ${idx===0?"#ffd700":idx===1?"rgba(255,215,0,.3)":"transparent"}`}}>
                        <span style={{fontSize:10,color:"rgba(255,255,255,.3)",width:16}}>{idx+1}</span>
                        <span style={{fontSize:12,flex:1,fontWeight:idx<2?700:400,color:idx<2?"#fff":"rgba(255,255,255,.55)"}}>{FLAGS[s.team]||""} {s.team}</span>
                        <span style={{fontSize:10,color:"rgba(255,255,255,.4)",width:16}}>{s.pj}</span>
                        <span style={{fontSize:10,color:s.gf-s.gc>0?"#4ade80":s.gf-s.gc<0?"#f87171":"rgba(255,255,255,.4)",width:24,textAlign:"right"}}>{s.gf-s.gc>0?"+":""}{s.gf-s.gc}</span>
                        <span style={{fontSize:14,fontWeight:900,color:"#c9a84c",width:24,textAlign:"right"}}>{s.pts}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Save button */}
          <div style={{position:"sticky",bottom:0,padding:"10px 12px",background:"rgba(7,17,31,.95)",borderTop:"1px solid rgba(201,168,76,.2)",backdropFilter:"blur(8px)"}}>
            <button onClick={handleSave} style={{
              width:"100%",padding:"13px",background:saved?"#4ade80":"#c9a84c",
              color:"#07111f",border:"none",borderRadius:8,
              fontWeight:900,fontSize:13,letterSpacing:2,cursor:"pointer",
              transition:"all .3s"
            }}>
              {saved ? "✓ GUARDADO Y GENERADO" : "💾 GRABAR Y GENERAR HTMLS"}
            </button>
          </div>
        </div>
      )}

      {activeTab === "standings" && <StandingsView />}
      {activeTab === "bracket" && <BracketView />}

      {activeTab !== "results" && (
        <div style={{textAlign:"center",fontSize:10,color:"rgba(255,255,255,.2)",padding:"0 16px 20px",letterSpacing:1}}>
          Los HTMLs se generan al presionar "Grabar" en la pestaña Resultados
        </div>
      )}
    </div>
  );
}
