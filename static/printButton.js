// MarkDownLivePreview.com-printButton.js -- bookmarklet to add 'Print' of preview HTML - instead of waiting for repo update that might use something like this <script src="./static/printButton.js"></script>
// (12Sep2025 1040am) 2302 char  javascript:void function(){"use strict";const a=(a,b,c,e,g)=>{try{const h="print-"+(location.href.match(/(\/([^/]+))+/)?.[1]??"").replace(/[^a-z]+/gi,""),i=Array.isArray;let j,m,n,[o,p,q]=i(a)?a:[a];if(f(h)?.remove(),b){if(n=b(o,p,q),null===n)return n;q||=d.title}const[r,s,t]=i(n)?n:[n],[u,v,w]=n?[r,s,t||q]:[o,p,t||q],x="<!DOCTYPE html>",y="<html lang='en'><head>"+(v||"<meta charset='UTF-8'><title>printable</title>")+"</head><body>"+(u||"")+"<style></style></body></html>",z=()=>{w&&(m.document.title=w),k(()=>{m.focus(),k(()=>{m.print(),k(()=>{c?.(j,y)},0<=e?e:9e3)},l)},l)};return j=d.createElement("iframe"),j.srcdoc=x+y,j.style.display="none",d.body.appendChild(j),m=j.contentWindow,j.onload=z,(g&&(m.onafterprint=a=>g(a,j,y)),j.id=h,j.title=h,y)}catch(a){return a.stack}},b="extra-button",c="editor",d=document,e=a=>(a??"").replace(/[\u200d]/g,"").replace(/\s+/g," ").trim(),f=a=>d.getElementById(a),g=(a,b)=>[...(b||d).querySelectorAll(a)],h=(a,b)=>Object.assign(d.createElement(a||"div"),b),i=(a,...b)=>a.addEventListener(...b),j=a=>a.preventDefault(),k=setTimeout,l=40,m=window,n=a=>t?.getValue()??g(".sticky-widget-lines,.view-line",f(c)).map(a=>a.style.top.padStart(9,0)+a.innerText).sort().map(a=>a.slice(9)).join("\n"),o=a=>{const b=n().split("\n").map(a=>e(a)),c=(b.find(a=>(a.match(/^#\s+(.+)/)||[])[1])??b.find(a=>(a.match(/^##\s+(.+)/)||[])[1])??b.filter(a=>a.length)[0]??"").replace(/^##?\s+/,"");return c?.length?c:a},p=(c="print-button")=>{if(f(c))return;const k=d.title,l=f("sync-button").insertAdjacentElement("beforeBegin",h(0,{id:c,innerHTML:"<style>"+("."+b+" { margin-left: 16px; } ")+"</style><a href=\"#\">Print</a>",title:"Print (Save as PDF)",className:b})),m=()=>{const b=f("output"),c=(a,b,c)=>{const f=prompt("Printing: what title?",o(d.title)),i=e(f);if(null==f)return null;d.title=i.length?i:k;const j=d.head.cloneNode(!0);g("script",j).forEach(a=>a.remove()),j.appendChild(h("style",{textContent:"@media print { body { height: auto !important; } }"}));const l=j.innerHTML,m=d.title;return[a,l,m]};a(b.outerHTML,c)};return i(l,"click",a=>{j(a),m()}),l},q=()=>{r=f("container"),s=f("preview"),r&&s?(t=s._?.editor??m.ace?.edit(c),p()):location="https://darrensem.github.io/markdown/"};let r,s,t;void(/loading/.test(d.readyState)?i(d,"DOMContentLoaded",q):k(q,l))}();
// original version of my [Toggle Editor] idea was this Issue: https://github.com/tanabe/markdown-live-preview/issues/56



!"DEBUG_DISABLE" || ( void function() { // IIFE wrapper to ensure it works as stand-alone Bookmarklet; change to !!"DEBUG_DISABLE" for testing without this 'plugin' code (e.g. to confirm some functionality still works or a bug still occurs)

"use strict";


// 774 char  P=(a,b,c,d,e)=>{try{const f="print-"+(location.href.match(/(\/([^/]+))+/)?.[1]??"").replace(/[^a-z]+/gi,""),g=Array.isArray,h=document,i=setTimeout,j=40;let k,l,m,[n,o,p]=g(a)?a:[a];if(h.querySelector("#"+f)?.remove(),b){if(m=b(n,o,p),null===m)return m;p||=h.title}const[q,r,s]=g(m)?m:[m],[t,u,v]=m?[q,r,s||p]:[n,o,s||p],w="<html lang='en'><head>"+(u||"<meta charset='UTF-8'><title>printable</title>")+"</head><body>"+(t||"")+"<style></style></body></html>";return k=h.createElement("iframe"),k.srcdoc="<!DOCTYPE html>"+w,k.style.display="none",h.body.appendChild(k),l=k.contentWindow,k.onload=()=>{v&&(l.document.title=v),i(()=>{l.focus(),i(()=>{l.print(),i(()=>{c?.(k,w)},0<=d?d:9e3)},j)},j)},(e&&(l.onafterprint=a=>e(a,k,w)),k.id=f,k.title=f,w)}catch(a){return a.stack}};
/**
* @param { string | string [] } bodyHeadTitle string `body` or `[body, head, title]` -- values will be overridden if `fnBefore()` returns truthy
* @param { function } fnBefore opt. function `fnBefore(body, head, title)` -- returns `null` to abort, or `body` only (head=""), or `[body, head, title]`
* @param { function } fnAfter opt. function `fnAfter(frame, html)` -- called after executing `frame.print()` and waiting `msDelayAfter`
* @param { number } msDelayAfter opt. `ms` to wait (default `9000`) before `fnAfter(frame, html)` -- after executing `frame.print()`
* @param { function } afterprint opt. function `afterprint(evt, frame, html)` WARNING: avoid using "afterprint" event -- unreliable
* @returns { string | Error | null } `html` contents written inside the new `iframe`, or Error thrown, or `null` returned by `fnBefore()`
*/
const printHTML = (bodyHeadTitle, fnBefore, fnAfter, msDelayAfter, afterprint) => {
  // ^ WARNING: avoid using "afterprint" event -- unreliable: it might fire BEFORE the "Print Preview" dialog finishes loading/opening on mobile cell phones (sometimes)

  try {

    const ID_PRINT_FRAME = "print-" + (location.href.match(/(\/([^/]+))+/)?.[1] ?? "").replace(/[^a-z]+/gi, "");

    const IS_ARRAY = Array.isArray;

    // const DOC_OBJECT = document;

    // const SET_TIMEOUT = setTimeout;

    // const MS_MINIMAL = 40;

    let frame, printwin, beforeBodyHeadTitle;

    let [body, head, title] = ( IS_ARRAY(bodyHeadTitle) ? bodyHeadTitle : [bodyHeadTitle] );

    // DOC_OBJECT.querySelector("#" + ID_PRINT_FRAME)?.remove();
    qi(ID_PRINT_FRAME)?.remove();

    if (fnBefore) {
      beforeBodyHeadTitle = fnBefore(body, head, title);
      if (beforeBodyHeadTitle === null) return beforeBodyHeadTitle;
      // title ||= DOC_OBJECT.title;
      title ||= doc.title;
    };

    const [newBody, newHead, newTitle] = ( IS_ARRAY(beforeBodyHeadTitle) ? beforeBodyHeadTitle : [beforeBodyHeadTitle] );

    const [finalBody, finalHead, finalTitle] = (

      // fnBefore() returned truthy = the desired final value for 'body' (w. head="") or both ['body', 'head']
      beforeBodyHeadTitle

      // will always override BOTH ['body', 'head']; non-array is presumed ['body', ''] AKA head is empty blank
      ? [newBody, newHead, newTitle || title]

      // fnBefore() returned falsy = use arrayBodyHead (1st arg); non-array is presumed ['body', ''] AKA head is empty blank
      : [body, head, newTitle || title]
    );

    const DOCTYPE_HTML = "<!DOCTYPE html>";

    const html = (
      "<html lang='en'><head>"
      + (finalHead || "<meta charset='UTF-8'><title>printable</title>")
      + "</head><body>"
      + (finalBody || "")
      + "<style></style>"
      // ^ WARNING: BUG/QUIRK if printwin = window.open(), printwin.onload event MIGHT fail to trigger (aka NEVER FIRES!) IF [ missing printwin.document.open() ] AND [ printwin.document includes zero <STYLE> tags ] -- SOMETIMES a problem (e.g. fails in Edge but ok in Chrome?)
      + "</body></html>"
    );

    // Wait for content to load before printing
    const handleChildLoad = () => {

      if (finalTitle) printwin.document.title = finalTitle;

      SET_TIMEOUT( () => {
        printwin.focus();

        SET_TIMEOUT( () => {
          printwin.print();

          SET_TIMEOUT( () => {
            fnAfter?.(frame, html);

          }, !(msDelayAfter >= 0) ? 9000 : msDelayAfter );

        }, MS_MINIMAL );

      }, MS_MINIMAL );

    };


    if (!"DEBUG_WINDOW_INSTEAD_OF_IFRAME") {
      // Create a new window with the content
      printwin = window.open("", "_blank", "width=800,height=600");

      // Write the HTML then listen for .onload event
      if (printwin) {
        printwin.document.open();
        // ^ WARNING: BUG/QUIRK -- if printwin = window.open(), printwin.onload event MIGHT fail to trigger (aka NEVER FIRES!) IF [ missing printwin.document.open() ] AND [ printwin.document includes zero <STYLE> tags ] -- SOMETIMES a problem (e.g. fails in Edge but ok in Chrome?)
        printwin.document.write(DOCTYPE_HTML + html);
        printwin.document.close();

        frame = printwin;
        printwin.onload = handleChildLoad;
        // ^ REMINDER: printwin.onload event fails to trigger (NEVER FIRES!) if attached BEFORE printwin.document.write()
      };
    } else {
      // Create a new <iframe> element with the content
      // frame = DOC_OBJECT.createElement("iframe");
      frame = doc.createElement("iframe");

      // Write the HTML then listen for .onload event
      frame.srcdoc = DOCTYPE_HTML + html;
      // ^ NOTE: frame.srcdoc="<html...>" actually triggers frame.onload, unlike frame.documentElement.outerHTML = "<html...>" )
      frame.style.display = "none";
      // ^ "display: none" BEFORE document.body.appendChild() to ensure never visible
      // DOC_OBJECT.body.appendChild(frame);
      doc.body.appendChild(frame);

      printwin = frame.contentWindow;
      frame.onload = handleChildLoad;
    };

    if (afterprint) printwin.onafterprint = (evt) => afterprint(evt, frame, html); // e.g. afterprint = (evt, frame, html) => frame.remove ? frame.remove() : evt.target?.close() );
    // ^ WARNING: avoid using "afterprint" event -- unreliable: it might fire BEFORE the "Print Preview" dialog finishes loading/opening on mobile cell phones (sometimes)
    // Therefore, should never rely on something like this working as expected: printwin.addEventListener( "afterprint", (evt) => frame.remove ? frame.remove() : evt.target?.close() );
    // (Unfortunate, because that event is "Baseline Widely available" Oct 2019+) https://developer.mozilla.org/en-US/docs/Web/API/Window/afterprint_event

    frame.id = ID_PRINT_FRAME;

    frame.title = ID_PRINT_FRAME;
    // ^ .title attribute is different than document.title (<iframe> should always provide it for a11y)

    return html;

  } catch (err) {
    // console.error(err);
    return err.stack;
  };

};

const CLASS_EXTRA_BUTTON = "extra-button";

const CSS_EXTRA_BUTTON = "." + CLASS_EXTRA_BUTTON + " { margin-left: 16px; } ";


const CLICK_EVENT = "click";

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

const on = (el, ...args) => el.addEventListener(...args); // smaller MINIFY if 3+ usage vs. normal, because normal = 25 char for a.addEventListener(b,c,d) vs. 37 for definition ,X=(a,...b)=>a.addEventListener(...b) + 10 per usage: X(a,b,c,d) // 47 57 _67_ versus 25 50 _75_

const PREVENT_DEFAULT = evt => evt.preventDefault(); // smaller MINIFY if 2+ usage vs. normal, because normal = 18 char for a.preventDefault() vs. 24 for definition ,X=a=>a.preventDefault() + 3 per usage: X() // 27 _30_ versus 18 _36_

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
  if ( qi(ID_PRINT_BUTTON) ) return;

  const originalTitle = doc.title;

  const printButton = qi("sync-button").insertAdjacentElement(
    "beforeBegin",
    createDiv( 0, {
      id: ID_PRINT_BUTTON,
      innerHTML: (
        "<style>" + CSS_EXTRA_BUTTON + "</style>" +
        '<a href="#">Print</a>'
      ),
      title: "Print (Save as PDF)",
      className: CLASS_EXTRA_BUTTON
    } )
  );

  const handlePrintClick = () => {

    const elPreviewHTML = qi("output");

    const fnBefore = (bodyArg, headArg, titleArg) => {

      // Offer choice of a different document.title (Cancel will abort immediately, before anything is generated)
      const newTitle = (
        (!"DEBUG_SKIP_PROMPT_FOR_ACCURATE_COMPARISON") && getTitle(doc.title) ||
        prompt( "Printing: what title?", getTitle(doc.title) )
      );

      const trimmedTitle = trimmer(newTitle);

      if (newTitle == null) return null;

      doc.title = trimmedTitle.length ? trimmedTitle : originalTitle;

      // Sanitize the <head> contents of all <script> tags then return the final contents to be printed
      const head = doc.head.cloneNode(true);
      qs("script", head).forEach(script => script.remove());

      head.appendChild(
        createDiv( "style", {
          textContent: // reminder: textContent instead of innerText when assigning CSS text inside <style> elements, to ensure it preserves the exact textual content needed for the browser to parse CSS properly (no possible changes to whitespace hidden content display: none etc.)
          "@media print {"
          + " body { height: auto !important; }"
          + " }"
        } )
      );

      const finalHead = head.innerHTML;

      const finalTitle = doc.title;

      return [bodyArg, finalHead, finalTitle];
    };

    // printHTML( [ "bodyArg_html", "headArg_html", "titleArg_override" ], fnBefore );
    // // Sanitize the <head> contents of all <script> tags then return the final contents to be printed
    // const head = document.head.cloneNode(true);
    // head.querySelectorAll("script").forEach(script => script.remove());
    // const finalHead = head.innerHTML + "<style>@media print { body { height: auto !important; } }</style>";
    // printHTML( [ elPreviewHTML.outerHTML, finalHead ] );

    printHTML( elPreviewHTML.outerHTML, fnBefore );

  };

  on( printButton, CLICK_EVENT, (evt) => {
    PREVENT_DEFAULT(evt);
    handlePrintClick();
  } );

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

  on( doc, "DOMContentLoaded", init )

  : SET_TIMEOUT( init, MS_MINIMAL ) // Bookmarklet click will occur after DOMContentLoaded event has already fired 

);


}() ); // IIFE wrapper to ensure it works as stand-alone Bookmarklet; change to !!"DEBUG_DISABLE" for testing without this 'plugin' code (e.g. to confirm some functionality still works or a bug still occurs)

