// MarkDownLivePreview.com-printButton.js -- bookmarklet to add 'Print' of preview HTML - instead of waiting for repo update that might use something like this <script src="./static/printButton.js"></script>
// (13Sep2025 823am) 1989 char  javascript:void function(){void function(){"use strict";const a="editor",b=document,c=a=>(a??"").replace(/[\u200d]/g,"").replace(/\s+/g," ").trim(),d=a=>b.getElementById(a),e=(a,c)=>[...(c||b).querySelectorAll(a)],f=(a,c)=>Object.assign(b.createElement(a||"div"),c),g=a=>a?.remove(),h=setTimeout,i=40,j=window,k=b=>q?.getValue()??e(".sticky-widget-lines,.view-line",d(a)).map(a=>a.style.top.padStart(9,0)+a.innerText).sort().map(a=>a.slice(9)).join("\n"),l=a=>{const b=k().split("\n").map(a=>c(a)),d=(b.find(a=>(a.match(/^#\s+(.+)/)||[])[1])??b.find(a=>(a.match(/^##\s+(.+)/)||[])[1])??b.filter(a=>a.length)[0]??"").replace(/^##?\s+/,"");return d?.length?d:a},m=(a="print-button")=>{if(d(a))return;const j="print-"+(location.href.match(/(\/([^/]+))+/)?.[1]??"").replace(/[^a-z]+/gi,""),k=b.title,m=d("sync-button").insertAdjacentElement("beforeBegin",f(0,{id:a,innerHTML:"<style>.extra-button { margin-left: 16px; } </style><a href=\"#\">Print</a>",title:"Print (Save as PDF)",className:"extra-button"}));return m.addEventListener("click",a=>{a.preventDefault();try{let a,m,n;g(d(j));const o=prompt("Printing: what title?",l(b.title)),p=c(o),q=!p.length,r=q?k:p;if(null==o)return null;q&&(b.title=r),a=b.head.cloneNode(!0),e("script",a).forEach(g),a.appendChild(f("style",{textContent:"@media print { body { height: auto !important; } }"}));const s="<!DOCTYPE html><html lang='en'><head>"+(a.innerHTML||"<meta charset='UTF-8'><title>printable</title>")+"</head><body>"+(d("output").outerHTML||"")+"<style></style></body></html>",t=()=>{h(()=>{n.focus(),h(()=>{n.print()},i)},i),m.name=j,n.document.title=r};return m=f("iframe",{id:j,title:j}),m.srcdoc=s,m.style.display="none",b.body.appendChild(m),n=m.contentWindow,m.onload=t,s}catch(a){return a.stack}}),m},n=()=>{o=d("container"),p=d("preview"),o&&p?(q=p._?.editor??j.ace?.edit(a),m()):location="https://darrensem.github.io/markdown/"};let o,p,q;void(/loading/.test(b.readyState)?b.addEventListener("DOMContentLoaded",n):h(n,i))}()}();
// WINDOW instead of IFRAME: 2002 char  javascript:void function(){void function(){"use strict";const a="editor",b=document,c=a=>(a??"").replace(/[\u200d]/g,"").replace(/\s+/g," ").trim(),d=a=>b.getElementById(a),e=(a,c)=>[...(c||b).querySelectorAll(a)],f=(a,c)=>Object.assign(b.createElement(a||"div"),c),g=a=>a?.remove(),h=setTimeout,i=40,j=window,k=b=>q?.getValue()??e(".sticky-widget-lines,.view-line",d(a)).map(a=>a.style.top.padStart(9,0)+a.innerText).sort().map(a=>a.slice(9)).join("\n"),l=a=>{const b=k().split("\n").map(a=>c(a)),d=(b.find(a=>(a.match(/^#\s+(.+)/)||[])[1])??b.find(a=>(a.match(/^##\s+(.+)/)||[])[1])??b.filter(a=>a.length)[0]??"").replace(/^##?\s+/,"");return d?.length?d:a},m=(a="print-button")=>{if(d(a))return;const j="print-"+(location.href.match(/(\/([^/]+))+/)?.[1]??"").replace(/[^a-z]+/gi,""),k=b.title,m=d("sync-button").insertAdjacentElement("beforeBegin",f(0,{id:a,innerHTML:"<style>.extra-button { margin-left: 16px; } </style><a href=\"#\">Print</a>",title:"Print (Save as PDF)",className:"extra-button"}));return m.addEventListener("click",a=>{a.preventDefault();try{let a,m,n;g(d(j));const o=prompt("Printing: what title?",l(b.title)),p=c(o),q=!p.length,r=q?k:p;if(null==o)return null;q&&(b.title=r),a=b.head.cloneNode(!0),e("script",a).forEach(g),a.appendChild(f("style",{textContent:"@media print { body { height: auto !important; } }"}));const s="<!DOCTYPE html><html lang='en'><head>"+(a.innerHTML||"<meta charset='UTF-8'><title>printable</title>")+"</head><body>"+(d("output").outerHTML||"")+"<style></style></body></html>",t=()=>{h(()=>{n.focus(),h(()=>{n.print()},i)},i),m.name=j,n.document.title=r};return n=window.open("","_blank","width=800,height=600"),n&&(n.document.open(),n.document.write(s),n.document.close(),m=n,n.onload=t),s}catch(a){return a.stack}}),m},n=()=>{o=d("container"),p=d("preview"),o&&p?(q=p._?.editor??j.ace?.edit(a),m()):location="https://darrensem.github.io/markdown/"};let o,p,q;void(/loading/.test(b.readyState)?b.addEventListener("DOMContentLoaded",n):h(n,i))}()}();
// original version of my [Toggle Editor] idea was this Issue: https://github.com/tanabe/markdown-live-preview/issues/56


// #region Bookmarklet version history
if (false) { // #region Bookmarklet version history


  //// 02Nov2026 842am: after tweaking onDblClick's REMOVE_ELEMENT logic, verified still BookMarklet-able, about to finalize margin-bottom
  // 2784 char  javascript:void function(){void function(){"use strict";const a="editor",b=document,c=a=>(a??"").replace(/[\u200d]/g,"").replace(/\s+/g," ").trim(),d=a=>b.getElementById(a),e=(a,c)=>[...(c||b).querySelectorAll(a)],f=(a,c)=>Object.assign(b.createElement(a||"div"),c),g=a=>a?.remove(),h=setTimeout,i=40,j=window,k=b=>q?.getValue()??e(".sticky-widget-lines,.view-line",d(a)).map(a=>a.style.top.padStart(9,0)+a.innerText).sort().map(a=>a.slice(9)).join("\n"),l=a=>{const b=k().split("\n").map(a=>c(a)),d=(b.find(a=>(a.match(/^#\s+(.+)/)||[])[1])??b.find(a=>(a.match(/^##\s+(.+)/)||[])[1])??b.filter(a=>a.length)[0]??"").replace(/^##?\s+/,"");return d?.length?d:a},m=(a="print-button")=>{if(d(a))return;const j=prompt,k="print-"+(location.href.match(/(\/([^/]+))+/)?.[1]??"").replace(/[^a-z]+/gi,""),m=b.title,n=d("sync-button").insertAdjacentElement("beforeBegin",f(0,{id:a,innerHTML:"\n<style>\n.extra-button {\nmargin-left: 16px; \n/* ^ Ensure it doesn't overflow to hide */\n}\n</style>\n<a href=\"#\">Print</a>",title:"Print (Save as PDF)",className:"extra-button"})),o=a=>{try{let a,n,o;g(d(k));const p=j("Printing: what title?",l(b.title)),q=c(p),r=!q.length,s=r?m:q;if(null==p)return null;r&&(b.title=s),a=b.head.cloneNode(!0),e("script",a).forEach(g),a.appendChild(f("style",{textContent:"@media print { body { height: auto !important; } }"}));const t="<!DOCTYPE html><html lang='en'><head>"+(a.innerHTML||"<meta charset='UTF-8'><title>printable</title>")+"</head><body>"+(d("output").outerHTML||"")+"<style></style></body></html>",u=()=>{h(()=>{o.focus(),h(()=>{o.print()},i)},i),n.name=k,o.document.title=s};return h(a=>{b.title=a},4e3,b.title),b.title=s,(n=f("iframe",{id:k,title:k}),n.srcdoc=t,n.style.display="none",b.body.appendChild(n),o=n.contentWindow,n.onload=u,t)}catch(a){return a.stack}},p="CSS_EXTRA",q=a=>{a.preventDefault(),clearTimeout(r);let b;b="1.2";let c;c="0.7em";let e,f=d(p),g=f?.localName||"style",h=f?.innerHTML||"",i=f?.outerHTML||"",k="\n#output>p {line-height: "+b+"; margin-bottom: "+c+"; }\n",l=j("DoubleClick: append what HTML?\n\n(if no starting <tag> then defaults to <style> wrapper)\n",h||k),m=l==k._,n=(l||"").match(/^(\s*<\s*([\w-]+)([^>]*)>\s*)?([\s\S]*?)(\s*<\s*\/\s*\2\s*>\s*)?$/i),[o,q,s,t,u,v]=n||[];m||f?.remove(),l?.length&&(q||(s="style"),e="<"+s+" id=\""+p+"\""+(t||"")+">"+(u||"")+(q&&v||"</"+s+">"),document.head.insertAdjacentHTML("beforeend",e)),r=null};let r,s=500;return n.addEventListener("click",a=>{a.preventDefault(),r||(r=setTimeout(()=>{r=null,o(a)},s))}),n.addEventListener("dblclick",q),n},n=()=>{o=d("container"),p=d("preview"),o&&p?(q=p._?.editor??j.ace?.edit(a),m()):location="https://darrensem.github.io/markdown/"};let o,p,q;void(/loading/.test(b.readyState)?b.addEventListener("DOMContentLoaded",n):h(n,i))}()}();
  //
  //// 01Nov2026 820am: add btnPrint.onDblClick => prompt("<style id=" + ID_CSS_EXTRA + "> #output>p { line-height:1.2; } </style>")



  //
  //// TODO: FUTURE => JANUARY 2026 = /WIP/ -- do TEMP_COMPARE *later* after this /wip/ update!!!
  //



  //// 13Sep2025 823am: ALWAYS set frame.name = ID_PRINT_FRAME (not just for WINDOW)
  // 1989 char  javascript:void function(){void function(){"use strict";const a="editor",b=document,c=a=>(a??"").replace(/[\u200d]/g,"").replace(/\s+/g," ").trim(),d=a=>b.getElementById(a),e=(a,c)=>[...(c||b).querySelectorAll(a)],f=(a,c)=>Object.assign(b.createElement(a||"div"),c),g=a=>a?.remove(),h=setTimeout,i=40,j=window,k=b=>q?.getValue()??e(".sticky-widget-lines,.view-line",d(a)).map(a=>a.style.top.padStart(9,0)+a.innerText).sort().map(a=>a.slice(9)).join("\n"),l=a=>{const b=k().split("\n").map(a=>c(a)),d=(b.find(a=>(a.match(/^#\s+(.+)/)||[])[1])??b.find(a=>(a.match(/^##\s+(.+)/)||[])[1])??b.filter(a=>a.length)[0]??"").replace(/^##?\s+/,"");return d?.length?d:a},m=(a="print-button")=>{if(d(a))return;const j="print-"+(location.href.match(/(\/([^/]+))+/)?.[1]??"").replace(/[^a-z]+/gi,""),k=b.title,m=d("sync-button").insertAdjacentElement("beforeBegin",f(0,{id:a,innerHTML:"<style>.extra-button { margin-left: 16px; } </style><a href=\"#\">Print</a>",title:"Print (Save as PDF)",className:"extra-button"}));return m.addEventListener("click",a=>{a.preventDefault();try{let a,m,n;g(d(j));const o=prompt("Printing: what title?",l(b.title)),p=c(o),q=!p.length,r=q?k:p;if(null==o)return null;q&&(b.title=r),a=b.head.cloneNode(!0),e("script",a).forEach(g),a.appendChild(f("style",{textContent:"@media print { body { height: auto !important; } }"}));const s="<!DOCTYPE html><html lang='en'><head>"+(a.innerHTML||"<meta charset='UTF-8'><title>printable</title>")+"</head><body>"+(d("output").outerHTML||"")+"<style></style></body></html>",t=()=>{h(()=>{n.focus(),h(()=>{n.print()},i)},i),m.name=j,n.document.title=r};return m=f("iframe",{id:j,title:j}),m.srcdoc=s,m.style.display="none",b.body.appendChild(m),n=m.contentWindow,m.onload=t,s}catch(a){return a.stack}}),m},n=()=>{o=d("container"),p=d("preview"),o&&p?(q=p._?.editor??j.ace?.edit(a),m()):location="https://darrensem.github.io/markdown/"};let o,p,q;void(/loading/.test(b.readyState)?b.addEventListener("DOMContentLoaded",n):h(n,i))}()}();
  // WINDOW instead of IFRAME: 2002 char  javascript:void function(){void function(){"use strict";const a="editor",b=document,c=a=>(a??"").replace(/[\u200d]/g,"").replace(/\s+/g," ").trim(),d=a=>b.getElementById(a),e=(a,c)=>[...(c||b).querySelectorAll(a)],f=(a,c)=>Object.assign(b.createElement(a||"div"),c),g=a=>a?.remove(),h=setTimeout,i=40,j=window,k=b=>q?.getValue()??e(".sticky-widget-lines,.view-line",d(a)).map(a=>a.style.top.padStart(9,0)+a.innerText).sort().map(a=>a.slice(9)).join("\n"),l=a=>{const b=k().split("\n").map(a=>c(a)),d=(b.find(a=>(a.match(/^#\s+(.+)/)||[])[1])??b.find(a=>(a.match(/^##\s+(.+)/)||[])[1])??b.filter(a=>a.length)[0]??"").replace(/^##?\s+/,"");return d?.length?d:a},m=(a="print-button")=>{if(d(a))return;const j="print-"+(location.href.match(/(\/([^/]+))+/)?.[1]??"").replace(/[^a-z]+/gi,""),k=b.title,m=d("sync-button").insertAdjacentElement("beforeBegin",f(0,{id:a,innerHTML:"<style>.extra-button { margin-left: 16px; } </style><a href=\"#\">Print</a>",title:"Print (Save as PDF)",className:"extra-button"}));return m.addEventListener("click",a=>{a.preventDefault();try{let a,m,n;g(d(j));const o=prompt("Printing: what title?",l(b.title)),p=c(o),q=!p.length,r=q?k:p;if(null==o)return null;q&&(b.title=r),a=b.head.cloneNode(!0),e("script",a).forEach(g),a.appendChild(f("style",{textContent:"@media print { body { height: auto !important; } }"}));const s="<!DOCTYPE html><html lang='en'><head>"+(a.innerHTML||"<meta charset='UTF-8'><title>printable</title>")+"</head><body>"+(d("output").outerHTML||"")+"<style></style></body></html>",t=()=>{h(()=>{n.focus(),h(()=>{n.print()},i)},i),m.name=j,n.document.title=r};return n=window.open("","_blank","width=800,height=600"),n&&(n.document.open(),n.document.write(s),n.document.close(),m=n,n.onload=t),s}catch(a){return a.stack}}),m},n=()=>{o=d("container"),p=d("preview"),o&&p?(q=p._?.editor??j.ace?.edit(a),m()):location="https://darrensem.github.io/markdown/"};let o,p,q;void(/loading/.test(b.readyState)?b.addEventListener("DOMContentLoaded",n):h(n,i))}()}();


  //// 12Sep2025 924am: printHTML re-arranged order of some of the const and let variables
  // 2313 char  2313 char  javascript:void function(){void function(){"use strict";const a=(a,b,c,e,g)=>{try{const h="print-"+(location.href.match(/(\/([^/]+))+/)?.[1]??"").replace(/[^a-z]+/gi,""),k=Array.isArray;let l,m,n,[o,p,q]=k(a)?a:[a];if(f(h)?.remove(),b){if(n=b(o,p,q),null===n)return n;q||=d.title}const[r,s,t]=k(n)?n:[n],[u,v,w]=n?[r,s,t||q]:[o,p,t||q],x="<!DOCTYPE html>",y="<html lang='en'><head>"+(v||"<meta charset='UTF-8'><title>printable</title>")+"</head><body>"+(u||"")+"<style></style></body></html>",z=()=>{w&&(m.document.title=w),i(()=>{m.focus(),i(()=>{m.print(),i(()=>{c?.(l,y)},0<=e?e:9e3)},j)},j)};return l=d.createElement("iframe"),l.srcdoc=x+y,l.style.display="none",d.body.appendChild(l),m=l.contentWindow,l.onload=z,(g&&(m.onafterprint=a=>g(a,l,y)),l.id=h,l.title=h,y)}catch(a){return a.stack}},b="extra-button",c="editor",d=document,e=a=>(a??"").replace(/[\u200d]/g,"").replace(/\s+/g," ").trim(),f=a=>d.getElementById(a),g=(a,b)=>[...(b||d).querySelectorAll(a)],h=(a,b)=>Object.assign(d.createElement(a||"div"),b),i=setTimeout,j=40,k=window,l=a=>r?.getValue()??g(".sticky-widget-lines,.view-line",f(c)).map(a=>a.style.top.padStart(9,0)+a.innerText).sort().map(a=>a.slice(9)).join("\n"),m=a=>{const b=l().split("\n").map(a=>e(a)),c=(b.find(a=>(a.match(/^#\s+(.+)/)||[])[1])??b.find(a=>(a.match(/^##\s+(.+)/)||[])[1])??b.filter(a=>a.length)[0]??"").replace(/^##?\s+/,"");return c?.length?c:a},n=(c="print-button-frame")=>{if(f(c))return;const g=f("sync-button").insertAdjacentElement("beforebegin",h(0,{id:c,innerHTML:"<style>"+("."+b+" { margin-left: 16px; } ")+"</style><a href=\"#\">Print/PDF</a>",title:"Print (Save as PDF)",className:b})),i=document.title;g.addEventListener("click",a=>{a.preventDefault(),j(i)});const j=b=>{const c=(a,c,f)=>{const g=prompt("Printing: what title?",m(d.title));if(null==g)return null;const h=e(g),i=h.length?h:b;d.title=i;const j=d.head.cloneNode(!0);j.querySelectorAll("script").forEach(a=>a.remove());const k=j.innerHTML+"<style>@media print { body { height: auto !important; } }</style>";return[a,k,i]};a(f("output").outerHTML,c)};return g},o=()=>{p=f("container"),q=f("preview"),p&&q?(r=q._?.editor??k.ace?.edit(c),n()):location="https://darrensem.github.io/markdown/"};let p,q,r;void(/loading/.test(d.readyState)?d.addEventListener("DOMContentLoaded",o):i(o,j))}()}();
  //// 12Sep2025 201pm: setupPrintButton_MINIMAL_version (complete removal of 'printHTML' LIBRARY FUNCTION)
  // 2020 char  javascript:void function(){void function(){"use strict";const a="editor",b=document,c=a=>(a??"").replace(/[\u200d]/g,"").replace(/\s+/g," ").trim(),d=a=>b.getElementById(a),e=(a,c)=>[...(c||b).querySelectorAll(a)],f=(a,c)=>Object.assign(b.createElement(a||"div"),c),g=setTimeout,h=40,i=window,j=b=>p?.getValue()??e(".sticky-widget-lines,.view-line",d(a)).map(a=>a.style.top.padStart(9,0)+a.innerText).sort().map(a=>a.slice(9)).join("\n"),k=a=>{const b=j().split("\n").map(a=>c(a)),d=(b.find(a=>(a.match(/^#\s+(.+)/)||[])[1])??b.find(a=>(a.match(/^##\s+(.+)/)||[])[1])??b.filter(a=>a.length)[0]??"").replace(/^##?\s+/,"");return d?.length?d:a},l=(a="print-button")=>{if(d(a))return;const i="print-"+(location.href.match(/(\/([^/]+))+/)?.[1]??"").replace(/[^a-z]+/gi,""),j=b.title,l=d("sync-button").insertAdjacentElement("beforeBegin",f(0,{id:a,innerHTML:"<style>.extra-button { margin-left: 16px; } </style><a href=\"#\">Print</a>",title:"Print (Save as PDF)",className:"extra-button"}));return l.addEventListener("click",a=>{a.preventDefault();try{let a,l,m;d(i)?.remove();const n=prompt("Printing: what title?",k(b.title)),o=c(n),p=!o.length,q=p?j:o;if(null==n)return null;p&&(b.title=q),a=b.head.cloneNode(!0),e("script",a).forEach(a=>a.remove()),a.appendChild(f("style",{textContent:"@media print { body { height: auto !important; } }"}));const r="<html lang='en'><head>"+(a.innerHTML||"<meta charset='UTF-8'><title>printable</title>")+"</head><body>"+(d("output").outerHTML||"")+"<style></style></body></html>",s=()=>{m.document.title=q,g(()=>{m.focus(),g(()=>{m.print()},h)},h)};return l=b.createElement("iframe"),l.srcdoc="<!DOCTYPE html>"+r,l.style.display="none",b.body.appendChild(l),m=l.contentWindow,l.onload=s,(l.id=i,l.title=i,r)}catch(a){return console.error(a),a.stack}}),l},m=()=>{n=d("container"),o=d("preview"),n&&o?(p=o._?.editor??i.ace?.edit(a),l()):location="https://darrensem.github.io/markdown/"};let n,o,p;void(/loading/.test(b.readyState)?b.addEventListener("DOMContentLoaded",m):g(m,h))}()}();
  //// 12Sep2025 325pm: commented out console.error + html now always prefixed by DOCTYPE ( "<!DOCTYPE html>" )
  // 2000 char  javascript:void function(){void function(){"use strict";const a="editor",b=document,c=a=>(a??"").replace(/[\u200d]/g,"").replace(/\s+/g," ").trim(),d=a=>b.getElementById(a),e=(a,c)=>[...(c||b).querySelectorAll(a)],f=(a,c)=>Object.assign(b.createElement(a||"div"),c),g=setTimeout,h=40,i=window,j=b=>p?.getValue()??e(".sticky-widget-lines,.view-line",d(a)).map(a=>a.style.top.padStart(9,0)+a.innerText).sort().map(a=>a.slice(9)).join("\n"),k=a=>{const b=j().split("\n").map(a=>c(a)),d=(b.find(a=>(a.match(/^#\s+(.+)/)||[])[1])??b.find(a=>(a.match(/^##\s+(.+)/)||[])[1])??b.filter(a=>a.length)[0]??"").replace(/^##?\s+/,"");return d?.length?d:a},l=(a="print-button")=>{if(d(a))return;const i="print-"+(location.href.match(/(\/([^/]+))+/)?.[1]??"").replace(/[^a-z]+/gi,""),j=b.title,l=d("sync-button").insertAdjacentElement("beforeBegin",f(0,{id:a,innerHTML:"<style>.extra-button { margin-left: 16px; } </style><a href=\"#\">Print</a>",title:"Print (Save as PDF)",className:"extra-button"}));return l.addEventListener("click",a=>{a.preventDefault();try{let a,l,m;d(i)?.remove();const n=prompt("Printing: what title?",k(b.title)),o=c(n),p=!o.length,q=p?j:o;if(null==n)return null;p&&(b.title=q),a=b.head.cloneNode(!0),e("script",a).forEach(a=>a.remove()),a.appendChild(f("style",{textContent:"@media print { body { height: auto !important; } }"}));const r="<!DOCTYPE html><html lang='en'><head>"+(a.innerHTML||"<meta charset='UTF-8'><title>printable</title>")+"</head><body>"+(d("output").outerHTML||"")+"<style></style></body></html>",s=()=>{m.document.title=q,g(()=>{m.focus(),g(()=>{m.print()},h)},h)};return l=b.createElement("iframe"),l.srcdoc=r,l.style.display="none",b.body.appendChild(l),m=l.contentWindow,l.onload=s,(l.id=i,l.title=i,r)}catch(a){return a.stack}}),l},m=()=>{n=d("container"),o=d("preview"),n&&o?(p=o._?.editor??i.ace?.edit(a),l()):location="https://darrensem.github.io/markdown/"};let n,o,p;void(/loading/.test(b.readyState)?b.addEventListener("DOMContentLoaded",m):g(m,h))}()}();
  //// 12Sep2025 549pm: REMOVE_ELEMENT = (element) => element?.remove() will MINIFY (-2) because able to '.forEach(REMOVE_ELEMENT)' instead of '.forEach(script => script.remove())'
  // 1998 char  javascript:void function(){void function(){"use strict";const a="editor",b=document,c=a=>(a??"").replace(/[\u200d]/g,"").replace(/\s+/g," ").trim(),d=a=>b.getElementById(a),e=(a,c)=>[...(c||b).querySelectorAll(a)],f=(a,c)=>Object.assign(b.createElement(a||"div"),c),g=a=>a?.remove(),h=setTimeout,i=40,j=window,k=b=>q?.getValue()??e(".sticky-widget-lines,.view-line",d(a)).map(a=>a.style.top.padStart(9,0)+a.innerText).sort().map(a=>a.slice(9)).join("\n"),l=a=>{const b=k().split("\n").map(a=>c(a)),d=(b.find(a=>(a.match(/^#\s+(.+)/)||[])[1])??b.find(a=>(a.match(/^##\s+(.+)/)||[])[1])??b.filter(a=>a.length)[0]??"").replace(/^##?\s+/,"");return d?.length?d:a},m=(a="print-button")=>{if(d(a))return;const j="print-"+(location.href.match(/(\/([^/]+))+/)?.[1]??"").replace(/[^a-z]+/gi,""),k=b.title,m=d("sync-button").insertAdjacentElement("beforeBegin",f(0,{id:a,innerHTML:"<style>.extra-button { margin-left: 16px; } </style><a href=\"#\">Print</a>",title:"Print (Save as PDF)",className:"extra-button"}));return m.addEventListener("click",a=>{a.preventDefault();try{let a,m,n;g(d(j));const o=prompt("Printing: what title?",l(b.title)),p=c(o),q=!p.length,r=q?k:p;if(null==o)return null;q&&(b.title=r),a=b.head.cloneNode(!0),e("script",a).forEach(g),a.appendChild(f("style",{textContent:"@media print { body { height: auto !important; } }"}));const s="<!DOCTYPE html><html lang='en'><head>"+(a.innerHTML||"<meta charset='UTF-8'><title>printable</title>")+"</head><body>"+(d("output").outerHTML||"")+"<style></style></body></html>",t=()=>{n.document.title=r,h(()=>{n.focus(),h(()=>{n.print()},i)},i)};return m=b.createElement("iframe"),m.srcdoc=s,m.style.display="none",b.body.appendChild(m),n=m.contentWindow,m.onload=t,(m.id=j,m.title=j,s)}catch(a){return a.stack}}),m},n=()=>{o=d("container"),p=d("preview"),o&&p?(q=p._?.editor??j.ace?.edit(a),m()):location="https://darrensem.github.io/markdown/"};let o,p,q;void(/loading/.test(b.readyState)?b.addEventListener("DOMContentLoaded",n):h(n,i))}()}();
  //// 12Sep2025 615pm: oops 'document.createElement("iframe")' now changed to createDiv() + moved setting of .id and .title to that call's initial {options}
  // 1980 char  javascript:void function(){void function(){"use strict";const a="editor",b=document,c=a=>(a??"").replace(/[\u200d]/g,"").replace(/\s+/g," ").trim(),d=a=>b.getElementById(a),e=(a,c)=>[...(c||b).querySelectorAll(a)],f=(a,c)=>Object.assign(b.createElement(a||"div"),c),g=a=>a?.remove(),h=setTimeout,i=40,j=window,k=b=>q?.getValue()??e(".sticky-widget-lines,.view-line",d(a)).map(a=>a.style.top.padStart(9,0)+a.innerText).sort().map(a=>a.slice(9)).join("\n"),l=a=>{const b=k().split("\n").map(a=>c(a)),d=(b.find(a=>(a.match(/^#\s+(.+)/)||[])[1])??b.find(a=>(a.match(/^##\s+(.+)/)||[])[1])??b.filter(a=>a.length)[0]??"").replace(/^##?\s+/,"");return d?.length?d:a},m=(a="print-button")=>{if(d(a))return;const j="print-"+(location.href.match(/(\/([^/]+))+/)?.[1]??"").replace(/[^a-z]+/gi,""),k=b.title,m=d("sync-button").insertAdjacentElement("beforeBegin",f(0,{id:a,innerHTML:"<style>.extra-button { margin-left: 16px; } </style><a href=\"#\">Print</a>",title:"Print (Save as PDF)",className:"extra-button"}));return m.addEventListener("click",a=>{a.preventDefault();try{let a,m,n;g(d(j));const o=prompt("Printing: what title?",l(b.title)),p=c(o),q=!p.length,r=q?k:p;if(null==o)return null;q&&(b.title=r),a=b.head.cloneNode(!0),e("script",a).forEach(g),a.appendChild(f("style",{textContent:"@media print { body { height: auto !important; } }"}));const s="<!DOCTYPE html><html lang='en'><head>"+(a.innerHTML||"<meta charset='UTF-8'><title>printable</title>")+"</head><body>"+(d("output").outerHTML||"")+"<style></style></body></html>",t=()=>{h(()=>{n.focus(),h(()=>{n.print()},i)},i),n.document.title=r};return m=f("iframe",{id:j,title:j}),m.srcdoc=s,m.style.display="none",b.body.appendChild(m),n=m.contentWindow,m.onload=t,s}catch(a){return a.stack}}),m},n=()=>{o=d("container"),p=d("preview"),o&&p?(q=p._?.editor??j.ace?.edit(a),m()):location="https://darrensem.github.io/markdown/"};let o,p,q;void(/loading/.test(b.readyState)?b.addEventListener("DOMContentLoaded",n):h(n,i))}()}();
  // WINDOW instead of IFRAME: 2002 char  javascript:void function(){void function(){"use strict";const a="editor",b=document,c=a=>(a??"").replace(/[\u200d]/g,"").replace(/\s+/g," ").trim(),d=a=>b.getElementById(a),e=(a,c)=>[...(c||b).querySelectorAll(a)],f=(a,c)=>Object.assign(b.createElement(a||"div"),c),g=a=>a?.remove(),h=setTimeout,i=40,j=window,k=b=>q?.getValue()??e(".sticky-widget-lines,.view-line",d(a)).map(a=>a.style.top.padStart(9,0)+a.innerText).sort().map(a=>a.slice(9)).join("\n"),l=a=>{const b=k().split("\n").map(a=>c(a)),d=(b.find(a=>(a.match(/^#\s+(.+)/)||[])[1])??b.find(a=>(a.match(/^##\s+(.+)/)||[])[1])??b.filter(a=>a.length)[0]??"").replace(/^##?\s+/,"");return d?.length?d:a},m=(a="print-button")=>{if(d(a))return;const j="print-"+(location.href.match(/(\/([^/]+))+/)?.[1]??"").replace(/[^a-z]+/gi,""),k=b.title,m=d("sync-button").insertAdjacentElement("beforeBegin",f(0,{id:a,innerHTML:"<style>.extra-button { margin-left: 16px; } </style><a href=\"#\">Print</a>",title:"Print (Save as PDF)",className:"extra-button"}));return m.addEventListener("click",a=>{a.preventDefault();try{let a,m,n;g(d(j));const o=prompt("Printing: what title?",l(b.title)),p=c(o),q=!p.length,r=q?k:p;if(null==o)return null;q&&(b.title=r),a=b.head.cloneNode(!0),e("script",a).forEach(g),a.appendChild(f("style",{textContent:"@media print { body { height: auto !important; } }"}));const s="<!DOCTYPE html><html lang='en'><head>"+(a.innerHTML||"<meta charset='UTF-8'><title>printable</title>")+"</head><body>"+(d("output").outerHTML||"")+"<style></style></body></html>",t=()=>{h(()=>{n.focus(),h(()=>{n.print()},i)},i),n.document.title=r};return n=window.open("","_blank","width=800,height=600"),n&&(n.name=j,n.document.open(),n.document.write(s),n.document.close(),m=n,n.onload=t),s}catch(a){return a.stack}}),m},n=()=>{o=d("container"),p=d("preview"),o&&p?(q=p._?.editor??j.ace?.edit(a),m()):location="https://darrensem.github.io/markdown/"};let o,p,q;void(/loading/.test(b.readyState)?b.addEventListener("DOMContentLoaded",n):h(n,i))}()}();


  //// 10Sep2025 947pm: Bookmarklet-able version USING the REUSABLE and SUPER-FLEXIBLE 'printHTML' LIBRARY FUNCTION! [#CodeAllDay #SillyMe because yesterday 3 hours #DENTIST #EXTRACTION]
  // 2307 char  javascript:void function(){void function(){"use strict";const a=(a,b,c,e,g)=>{try{let h,k,l,m="print-"+(location.href.match(/(\/([^/]+))+/)?.[1]??"").replace(/[^a-z]+/gi,""),n=Array.isArray,[o,p,q]=n(a)?a:[a];if(f(m)?.remove(),b){if(l=b(o,p,q),null===l)return l;q||=d.title}const[r,s,t]=n(l)?l:[l],[u,v,w]=l?[r,s,t||q]:[o,p,t||q],x="<!DOCTYPE html>",y="<html lang='en'><head>"+(v||"<meta charset='UTF-8'><title>printable</title>")+"</head><body>"+(u||"")+"<style></style></body></html>",z=()=>{w&&(k.document.title=w),i(()=>{k.focus(),i(()=>{k.print(),i(()=>{c?.(h,y)},0<=e?e:9e3)},j)},j)};return h=d.createElement("iframe"),h.srcdoc=x+y,h.style.display="none",d.body.appendChild(h),k=h.contentWindow,h.onload=z,(g&&(k.onafterprint=a=>g(a,h,y)),h.id=m,h.title=m,y)}catch(a){return a.stack}},b="extra-button",c="editor",d=document,e=a=>(a??"").replace(/[\u200d]/g,"").replace(/\s+/g," ").trim(),f=a=>d.getElementById(a),g=(a,b)=>[...(b||d).querySelectorAll(a)],h=(a,b)=>Object.assign(d.createElement(a||"div"),b),i=setTimeout,j=40,k=window,l=a=>r?.getValue()??g(".sticky-widget-lines,.view-line",f(c)).map(a=>a.style.top.padStart(9,0)+a.innerText).sort().map(a=>a.slice(9)).join("\n"),m=a=>{const b=l().split("\n").map(a=>e(a)),c=(b.find(a=>(a.match(/^#\s+(.+)/)||[])[1])??b.find(a=>(a.match(/^##\s+(.+)/)||[])[1])??b.filter(a=>a.length)[0]??"").replace(/^##?\s+/,"");return c?.length?c:a},n=(c="print-button-frame")=>{if(f(c))return;const g=f("sync-button").insertAdjacentElement("beforebegin",h(0,{id:c,innerHTML:"<style>"+("."+b+" { margin-left: 16px; } ")+"</style><a href=\"#\">Print/PDF</a>",title:"Print (Save as PDF)",className:b})),i=document.title;g.addEventListener("click",a=>{a.preventDefault(),j(i)});const j=b=>{const c=(a,c,f)=>{const g=prompt("Printing: what title?",m(d.title));if(null==g)return null;const h=e(g),i=h.length?h:b;d.title=i;const j=d.head.cloneNode(!0);j.querySelectorAll("script").forEach(a=>a.remove());const k=j.innerHTML+"<style>@media print { body { height: auto !important; } }</style>";return[a,k,i]};a(f("output").outerHTML,c)};return g},o=()=>{p=f("container"),q=f("preview"),p&&q?(r=q._?.editor??k.ace?.edit(c),n()):location="https://darrensem.github.io/markdown/"};let p,q,r;void(/loading/.test(d.readyState)?d.addEventListener("DOMContentLoaded",o):i(o,j))}()}();


  //// 09Sep2025 910am: first stand-alone Bookmarklet-able version
  // 1742 char  javascript:void function(){"use strict";const a="editor",b=document,c=a=>(a??"").replace(/[\u200d]/g,"").replace(/\s+/g," ").trim(),d=a=>b.getElementById(a),e=(a,c)=>[...(c||b).querySelectorAll(a)],f=(a,c)=>Object.assign(b.createElement(a||"div"),c),g=(a,...b)=>a.addEventListener(...b),h=a=>a.preventDefault(),i=setTimeout,j=40,k=window,l=b=>r?.getValue()??e(".sticky-widget-lines,.view-line",d(a)).map(a=>a.style.top.padStart(9,0)+a.innerText).sort().map(a=>a.slice(9)).join("\n"),m=a=>{const b=l().split("\n").map(a=>c(a)),d=(b.find(a=>(a.match(/^#\s+(.+)/)||[])[1])??b.find(a=>(a.match(/^##\s+(.+)/)||[])[1])??b.filter(a=>a.length)[0]??"").replace(/^##?\s+/,"");return d?.length?d:a},n=(a="print-button",k="print-child")=>{if(d(a))return;let l=d(k);const n=b.title,o=d("sync-button").insertAdjacentElement("beforeBegin",f(0,{id:a,innerHTML:"<style>"+".extra-button { margin-left: 16px; } "+"</style><a href=\"#\">Print</a>",className:"extra-button"})),p=a=>(a??l)?.remove(),q=()=>{p();const a=prompt("Printing: what title?",m(b.title)),h=c(a);if(null==a)return;b.title=h.length?h:n;const o=()=>{i(()=>{s.focus(),s.print()},j)},q=d("output"),r=b.head.cloneNode(!0);e("script",r).forEach(a=>a.remove()),r.appendChild(f("style",{textContent:"@media print { body { height: auto !important; } }"})),l=f("iframe",{id:k}),l.style.display="none",b.body.appendChild(l);const s=l.contentWindow,t="<head>"+r.innerHTML+"</head><body>"+q.outerHTML+"</body>";g(l,"load",o),l.srcdoc="<html>"+t+"</html>"};return g(o,"click",a=>{h(a),q()}),o},o=()=>{p=d("container"),q=d("preview"),p&&q?(r=q._?.editor??k.ace?.edit(a),n()):location="https://darrensem.github.io/markdown/"};let p,q,r;void(/loading/.test(b.readyState)?g(b,"DOMContentLoaded",o):i(o,j))}();
  //// 09Sep2025 945am: SET_TIMEOUT delay before calling childwin.focus (MS_MINIMAL = 40) and then childwin.print (500)
  // 1751 char  javascript:void function(){"use strict";const a="editor",b=document,c=a=>(a??"").replace(/[\u200d]/g,"").replace(/\s+/g," ").trim(),d=a=>b.getElementById(a),e=(a,c)=>[...(c||b).querySelectorAll(a)],f=(a,c)=>Object.assign(b.createElement(a||"div"),c),g=(a,...b)=>a.addEventListener(...b),h=a=>a.preventDefault(),i=setTimeout,j=40,k=window,l=b=>r?.getValue()??e(".sticky-widget-lines,.view-line",d(a)).map(a=>a.style.top.padStart(9,0)+a.innerText).sort().map(a=>a.slice(9)).join("\n"),m=a=>{const b=l().split("\n").map(a=>c(a)),d=(b.find(a=>(a.match(/^#\s+(.+)/)||[])[1])??b.find(a=>(a.match(/^##\s+(.+)/)||[])[1])??b.filter(a=>a.length)[0]??"").replace(/^##?\s+/,"");return d?.length?d:a},n=(a="print-button",k="print-child")=>{if(d(a))return;let l=d(k);const n=b.title,o=d("sync-button").insertAdjacentElement("beforeBegin",f(0,{id:a,innerHTML:"<style>"+".extra-button { margin-left: 16px; } "+"</style><a href=\"#\">Print</a>",className:"extra-button"})),p=a=>(a??l)?.remove(),q=()=>{p();const a=prompt("Printing: what title?",m(b.title)),h=c(a);if(null==a)return;b.title=h.length?h:n;const o=()=>{i(()=>s.focus(),j),i(()=>s.print(),500)},q=d("output"),r=b.head.cloneNode(!0);e("script",r).forEach(a=>a.remove()),r.appendChild(f("style",{textContent:"@media print { body { height: auto !important; } }"})),l=f("iframe",{id:k}),l.style.display="none",b.body.appendChild(l);const s=l.contentWindow,t="<head>"+r.innerHTML+"</head><body>"+q.outerHTML+"</body>";g(l,"load",o),l.srcdoc="<html>"+t+"</html>"};return g(o,"click",a=>{h(a),q()}),o},o=()=>{p=d("container"),q=d("preview"),p&&q?(r=q._?.editor??k.ace?.edit(a),n()):location="https://darrensem.github.io/markdown/"};let p,q,r;void(/loading/.test(b.readyState)?g(b,"DOMContentLoaded",o):i(o,j))}();


} else { ; }; // end if (false) { // #region Bookmarklet version history
// #endregion Bookmarklet version history



// #region TODO: section
if (false) { // #region TODO: section

  // TO DO: ?

} else { ; }; // end if (false) { // #region TODO: section
// #endregion TODO: section



!"DEBUG_DISABLE" || ( void function() { // IIFE wrapper to ensure it works as stand-alone Bookmarklet; change to !!"DEBUG_DISABLE" for testing without this 'plugin' code (e.g. to confirm some functionality still works or a bug still occurs)

"use strict";


const CLASS_EXTRA_BUTTON = "extra-button";

// const CSS_EXTRA_BUTTON = "." + CLASS_EXTRA_BUTTON + " { margin-left: 16px; } ";


// const CLICK_EVENT = "click";

const ID_EDITOR = "editor";

const doc = document;

const trimmer = (v) => {
  return (
    (v ?? "")
    .replace(/[\u200d]/g, "") // (8205) Zero Width Joiner
    .replace(/\s+/g, " ") // (160) No-Break Space [\u00a0], (9) Tab [\u0009], (10) LF [\u000a], (13) CR [\u000d],  etc.
    .trim()
  );
};

const qi = (id) => doc.getElementById(id);

const qs = (sel, root) => [... (root || doc).querySelectorAll(sel) ];

const createDiv = (tagName, options) => Object.assign( doc.createElement( tagName || "div" ), options );

// const on = (el, ...args) => el.addEventListener(...args); // smaller MINIFY if 3+ usage vs. normal, because normal = 25 char for a.addEventListener(b,c,d) vs. 37 for definition ,X=(a,...b)=>a.addEventListener(...b) + 10 per usage: X(a,b,c,d) // 47 57 _67_ versus 25 50 _75_

// const PREVENT_DEFAULT = evt => evt.preventDefault(); // smaller MINIFY if 2+ usage vs. normal, because normal = 18 char for a.preventDefault() vs. 24 for definition ,X=a=>a.preventDefault() + 4 per usage: X(a) // 28 _32_ versus 18 _36_

// const APPEND_CHILD = (parentNode, childNode) => parentNode.appendChild(childNode); // smaller MINIFY if 3+ usage vs. normal, because normal = 16 char for a.appendChild(b) vs. 22 for definition ,X=a=>a.appendChild(b) + 6 per usage: X(a,b) // 28 34 _40_ versus 16 32 _48_

// const REMOVE_ELEMENT = (element) => element?.remove(); // smaller MINIFY if 3+ usage vs. normal (ONLY), because normal = 11 char for a?.remove() vs. 17 for definition ,X=a=>a?.remove() + 4 per usage: X(a) // 21 25 _29_ versus 11 22 _33_
const REMOVE_ELEMENT = (element) => element?.remove(); // smaller MINIFY if 2+ usage IF even just 1 of 'normal' usage BUT ALSO 1+ of '.forEach' usage, because normal = 11 char for a?.remove() and .forEach = 24 char for .forEach(a=>a?.remove()) vs. 17 for definition ,X=a=>a?.remove() + 4 per normal usage: X(a) and {17}_or_even_{11} per .forEach usage: {.forEach(a=>X(a))}_or_even_{.forEach(X)} = {38_or_even_32} _[42 / {55_or_even_49}]_ versus 35 _[46 / 59]_

const SET_TIMEOUT = setTimeout; // smaller MINIFY if 2+ usage vs. normal, because normal = 10 char for setTimeout vs. 13 for definition ,X=setTimeout + 1 per usage: X // 14 _15_ versus 10 _20_

const MS_MINIMAL = 40;

const WINDOW_OBJECT = window;

const getEditorText = (method) => {

  // const editorElement = qi(ID_EDITOR);
  // const collLineGroupsAce = qs(".ace_line_group", editorElement);
  // const collLineGroupsMonaco_before_sticky = qs('[role="presentation"] [role="presentation"].view-lines > .view-line', editorElement);
  // const collLineGroupsMonaco = qs('.sticky-widget-lines,.view-line', editorElement);

  return (

    editor?.getValue() ?? // NOTE: for Ace editor this method stores "\r\n" for line breaks; all other methods store "\n"

    // WINDOW_OBJECT.Storehouse?.getItem("com.markdownlivepreview", "last_state") ??

    (

        // collLineGroupsAce[0]
        // ? collLineGroupsAce
        // .map( lineDiv => {
        //   return qs( ".ace_line", lineDiv )
        //   .map( linePart => linePart.innerText ) // NOTE: identical result using .textContent (since Ace editor would have done the whitespace-handling already)
        //   .join(""); // unlike Monaco HTML, we do not have to use lineDiv.innerText because Ace editor DOES have a way of indicating word-wrap-same-line
        // } ) :

        // collLineGroupsMonaco[0] ?
        // collLineGroupsMonaco
        // .map( lineDiv => {
        //   // return lineDiv.innerText;
        //   // ^ only option is to use lineDiv.innerText because Monaco editor object is created within a CLOSURE, plus its HTML has NO WAY of indicating word-wrap-same-line
        //   return lineDiv.style.top.padStart(9, 0) + lineDiv.innerText;
        //   // ^ ensure top-to-bottom of the [already limited] visible lines (due to how Monaco's handles the view)
        // } )
        // .sort().map( s => s.slice(9) )
        // : []

        // qs( '[role="presentation"] [role="presentation"].view-lines > .view-line', qi(ID_EDITOR) )
        // qs( ".view-lines", qi(ID_EDITOR) )
        // qs( ".view-lines > .view-line", qi(ID_EDITOR) )
        qs( ".sticky-widget-lines,.view-line", qi(ID_EDITOR) )

        .map( lineDiv => {
          // return lineDiv.innerText;
          // ^ only option is to use lineDiv.innerText because Monaco editor object is created within a CLOSURE, plus its HTML has NO WAY of indicating word-wrap-same-line
          return lineDiv.style.top.padStart(9, 0) + lineDiv.innerText;
          // ^ ensure top-to-bottom of the [already limited] visible lines (due to how Monaco's handles the view)
        } )
        .sort().map( s => s.slice(9) )

      ).join("\n")

    );

};

const getTitle = (defaultTitle) => {

  const trimmedLines = getEditorText()
  .split("\n")
  .map( line => trimmer(line) );

  const titleLine = (
    trimmedLines.find( line => (line.match(/^#\s+(.+)/) || [])[1] )
    ?? trimmedLines.find( line => (line.match(/^##\s+(.+)/) || [])[1] )
    ?? trimmedLines.filter( line => line.length )[0]
    ?? ""
  )
  .replace(/^##?\s+/, "");

  return titleLine?.length ? titleLine : defaultTitle;
};

const setupPrintButton = (ID_PRINT_BUTTON = "print-button") => {

  // debugger;

  if ( qi(ID_PRINT_BUTTON) ) return;

  const PROMPT_OBJECT = prompt;

  const ID_PRINT_FRAME = "print-" + (location.href.match(/(\/([^/]+))+/)?.[1] ?? "").replace(/[^a-z]+/gi, "");

  const originalTitle = doc.title;

  const printButton = qi("sync-button").insertAdjacentElement(
    "beforeBegin",
    createDiv( 0, {
      id: ID_PRINT_BUTTON,
      innerHTML: (

        "\n<style>\n"
        + "." + CLASS_EXTRA_BUTTON + " {\n"
        + "margin-left: 16px; "
        + "\n/* ^ Ensure it doesn't overflow to hide */\n"
        + "}\n"
        + "</style>\n"
        
        + '<a href="#">Print</a>'
      ),
      title: "Print (Save as PDF)",
      className: CLASS_EXTRA_BUTTON
    } )
  );



  const handlePrintSingleClick = (evt) => {

    try {

      let printHead, frame, printwin;

      REMOVE_ELEMENT( qi(ID_PRINT_FRAME) );


      // Offer choice of a different document.title (Cancel will abort immediately, before anything is generated)
      const promptTitle = (
        (!"DEBUG_SKIP_PROMPT_FOR_ACCURATE_COMPARISON") && getTitle(doc.title) ||
        PROMPT_OBJECT( "Printing: what title?", getTitle(doc.title) )
      );

      const trimmedTitle = trimmer(promptTitle);

      const restoreTitle = !trimmedTitle.length;

      const printTitle = restoreTitle ? originalTitle : trimmedTitle;

      if (promptTitle == null) return null;

      if (restoreTitle) { doc.title = printTitle; };


      // Sanitize the <head> contents of all <script> tags then return the final contents to be printed
      printHead = doc.head.cloneNode(true);
      qs("script", printHead).forEach(REMOVE_ELEMENT);

      printHead.appendChild(
        createDiv( "style", {
          textContent: // reminder: textContent instead of innerText when assigning CSS text inside <style> elements, to ensure it preserves the exact textual content needed for the browser to parse CSS properly (no possible changes to whitespace hidden content display: none etc.)
          "@media print {"
          + " body { height: auto !important; }"
          + " }"
        } )
      );

      const html = "<!DOCTYPE html>" + (
        "<html lang='en'><head>"
        + ( printHead.innerHTML || "<meta charset='UTF-8'><title>printable</title>" )
        + "</head><body>"
        + ( qi("output").outerHTML || "" )
        + "<style></style>"
        // ^ WARNING: BUG/QUIRK if printwin = window.open(), printwin.onload event MIGHT fail to trigger (aka NEVER FIRES!) IF [ missing printwin.document.open() ] AND [ printwin.document includes zero <STYLE> tags ] -- SOMETIMES a problem (e.g. fails in Edge but ok in Chrome?)
        + "</body></html>"
      );

      // Wait for content to load before printing
      const handleChildLoad = () => {

        SET_TIMEOUT( () => {
          printwin.focus();

          SET_TIMEOUT( () => {
            printwin.print();

          }, MS_MINIMAL );

        }, MS_MINIMAL );

        frame.name = ID_PRINT_FRAME;

        printwin.document.title = printTitle; // final step in case it throws due to browser security policies (cross-origin restrictions)

      };


      if (!"DEBUG_SKIP_UPDATE_PARENT_TITLE") { ; } else {

        SET_TIMEOUT( previousTitle => {
          doc.title = previousTitle;
        }, 4000 , doc.title );
        // }, MS_MINIMAL * 100 , doc.title );

        doc.title = printTitle;

      };


      if (!"DEBUG_WINDOW_INSTEAD_OF_IFRAME") {
        // Create a new window with the content
        printwin = window.open("", "_blank", "width=800,height=600");

        // Write the HTML then listen for .onload event
        if (printwin) {
          printwin.document.open();
          // ^ WARNING: BUG/QUIRK -- if printwin = window.open(), printwin.onload event MIGHT fail to trigger (aka NEVER FIRES!) IF [ missing printwin.document.open() ] AND [ printwin.document includes zero <STYLE> tags ] -- SOMETIMES a problem (e.g. fails in Edge but ok in Chrome?)
          printwin.document.write(html);
          printwin.document.close();

          frame = printwin;
          printwin.onload = handleChildLoad;
          // ^ REMINDER: printwin.onload event fails to trigger (NEVER FIRES!) if attached BEFORE printwin.document.write()
        };
      } else {
        // Create a new <iframe> element with the content
        frame = createDiv( "iframe", {
          id: ID_PRINT_FRAME,
          title: ID_PRINT_FRAME
          // ^ .title attribute is different than [window.]document.title (<iframe> should always provide it for a11y, but window.title is not typically used)
        } );

        // Write the HTML then listen for .onload event
        frame.srcdoc = html;
        // ^ NOTE: frame.srcdoc="<html...>" actually triggers frame.onload, unlike frame.documentElement.outerHTML = "<html...>" )
        frame.style.display = "none";
        // ^ "display: none" BEFORE document.body.appendChild() to ensure never visible
        doc.body.appendChild(frame);

        printwin = frame.contentWindow;
        frame.onload = handleChildLoad;
      };

      // if (afterprint) printwin.onafterprint = (evt) => afterprint(evt, frame, html); // e.g. afterprint = (evt, frame, html) => frame.remove ? frame.remove() : evt.target?.close() );
      // ^ WARNING: avoid using "afterprint" event -- unreliable: it might fire BEFORE the "Print Preview" dialog finishes loading/opening on mobile cell phones (sometimes)
      // Therefore, should never rely on something like this working as expected: printwin.addEventListener( "afterprint", (evt) => frame.remove ? frame.remove() : evt.target?.close() );
      // (Unfortunate, because that event is "Baseline Widely available" Oct 2019+) https://developer.mozilla.org/en-US/docs/Web/API/Window/afterprint_event

      return html;

    } catch (err) {
      // console.error(err);
      return err.stack;
    };

  }; // end const handlePrintSingleClick = (evt) => {


  const ID_CSS_EXTRA = "CSS_EXTRA";

  const handlePrintDoubleClick = (evt) => {

    evt.preventDefault();

    clearTimeout(timerPrintSingleClick);


    let LINE_HEIGHT; // line-height: XYZ;
    // LINE_HEIGHT = "1.5"; // original (XYZ = 24px)
    LINE_HEIGHT = "1.2"; // lines closer together but still easily skimmable
    
    let PARAGRAPH_SPACING; // margin-bottom: XYZ;
    // PARAGRAPH_SPACING = "1.0em"; // original (XYZ = 16px)
    PARAGRAPH_SPACING = "0.7em"; // paragraphs closer together but still easily skimmable
    

    let currentExtra = qi(ID_CSS_EXTRA);

    let extraTag = currentExtra?.localName || "style"; // let extraTag = currentExtra?.tagName || "STYLE";

    let extraHTML = currentExtra?.innerHTML || "";

    let extraOuter = currentExtra?.outerHTML || "";

    // console.warn( "\n\n" + ":handlePrintDoubleClick()", { currentExtra, extraTag, extraHTML, extraOuter } );
    // debugger;

    let defaultHTML = (
      "\n#output>p {"
      + "line-height: " + LINE_HEIGHT + "; "
      + "margin-bottom: " + PARAGRAPH_SPACING + "; "
      + "}\n"
    );
    // ^ if no wrapper tag then presumes <style>...</style>

    let newHTML = PROMPT_OBJECT( "DoubleClick: append what HTML?\n\n(if no starting <tag> then defaults to <style> wrapper)\n", extraHTML || defaultHTML );
    let isCancel = newHTML == defaultHTML._;

    let finalHTML;
    let z_matches = (newHTML || "").match(/^(\s*<\s*([\w-]+)([^>]*)>\s*)?([\s\S]*?)(\s*<\s*\/\s*\2\s*>\s*)?$/i);
    let [full, tag0, tagName, tagAttributes, innerHTML, tag1] = z_matches || [];

    // console.log( "BEFORE:", { currentExtra, finalHTML, full, tag0, tagName, tagAttributes, innerHTML, tag1, z_matches } );
    // debugger;


    if (!isCancel) {
      REMOVE_ELEMENT(currentExtra);
    };

    if (newHTML?.length) {
    // if (newHTML?.trim()) {

      if (!tag0) {
        tagName = "style";
      };

      finalHTML = (
        "<" + tagName
        + " id=" + '"' + ID_CSS_EXTRA + '"'
        // ^ CRITICAL to set ID before tagAttributes possibly does (1st value is "winner")
        + ( tagAttributes || "" )
        + ">"
        + ( innerHTML || "" )
        + ( ( tag0 && tag1 ) || "</" + tagName + ">" )
      );

      // console.log( " AFTER:", { currentExtra, finalHTML, full, tag0, tagName, tagAttributes, innerHTML, tag1, z_matches } );
      // debugger;

      document.head.insertAdjacentHTML("beforeend", finalHTML);

    }; // end if (newHTML?.length) {


    timerPrintSingleClick = null;
    // ^ CRITICAL to have as final step, to allow single-clicks again

  }; // end const handlePrintDoubleClick = (evt) => {


  let timerPrintSingleClick;

  // let MS_DELAY_SINGLE_CLICK = 3500;
  let MS_DELAY_SINGLE_CLICK = 500;

  printButton.addEventListener( "click", (evt) => {

    evt.preventDefault();

    if (timerPrintSingleClick) return; // TODO: confirm if this is even needed???
    //// ^ use this line if you want a 2nd single-click to keep using the EXISTING timer
    // clearTimeout(timerPrintSingleClick);
    //// ^ use this line if you want a 2nd single-click to RESTART the timer
    // ^ (tbh, the choice is really only noticeable if MS_DELAY_SINGLE_CLICK is very long)


    // if (evt.detail < 2) { timerPrintSingleClick = setTimeout( () => {
    timerPrintSingleClick = setTimeout( () => {

      timerPrintSingleClick = null;

      handlePrintSingleClick(evt);

    }, MS_DELAY_SINGLE_CLICK ); // end timerPrintSingleClick = setTimeout( () => {
    // } else { handlePrintDoubleClick(evt); }; // end // if (evt.detail < 2) {


  } ); // end printButton.addEventListener( "click", (evt) => {

  printButton.addEventListener( "dblclick", handlePrintDoubleClick );

  return printButton;

};

const init = () => {

  container = qi("container");

  previewPane = qi("preview");

  if( !container || !previewPane ) {

    // location = "https://MarkdownLivePreview.com/";
    // location = "https://github.com/tanabe/markdown-live-preview/";
    location = "https://darrensem.github.io/markdown/";

  } else {

    editor = previewPane._?.editor ?? WINDOW_OBJECT.ace?.edit(ID_EDITOR);

    setupPrintButton();

  };

};


let container; // container = qi("container");

let previewPane; // previewPane = qi("preview");

let editor;


void (

  /loading/.test(doc.readyState) ?

  doc.addEventListener( "DOMContentLoaded", init )

  : SET_TIMEOUT( init, MS_MINIMAL ) // Bookmarklet click will occur after DOMContentLoaded event has already fired 

);


}() ); // IIFE wrapper to ensure it works as stand-alone Bookmarklet; change to !!"DEBUG_DISABLE" for testing without this 'plugin' code (e.g. to confirm some functionality still works or a bug still occurs)
