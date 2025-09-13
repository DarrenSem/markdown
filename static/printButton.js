// MarkDownLivePreview.com-printButton.js -- bookmarklet to add 'Print' of preview HTML - instead of waiting for repo update that might use something like this <script src="./static/printButton.js"></script>
// (12Sep2025 615pm) 1980 char  javascript:void function(){void function(){"use strict";const a="editor",b=document,c=a=>(a??"").replace(/[\u200d]/g,"").replace(/\s+/g," ").trim(),d=a=>b.getElementById(a),e=(a,c)=>[...(c||b).querySelectorAll(a)],f=(a,c)=>Object.assign(b.createElement(a||"div"),c),g=a=>a?.remove(),h=setTimeout,i=40,j=window,k=b=>q?.getValue()??e(".sticky-widget-lines,.view-line",d(a)).map(a=>a.style.top.padStart(9,0)+a.innerText).sort().map(a=>a.slice(9)).join("\n"),l=a=>{const b=k().split("\n").map(a=>c(a)),d=(b.find(a=>(a.match(/^#\s+(.+)/)||[])[1])??b.find(a=>(a.match(/^##\s+(.+)/)||[])[1])??b.filter(a=>a.length)[0]??"").replace(/^##?\s+/,"");return d?.length?d:a},m=(a="print-button")=>{if(d(a))return;const j="print-"+(location.href.match(/(\/([^/]+))+/)?.[1]??"").replace(/[^a-z]+/gi,""),k=b.title,m=d("sync-button").insertAdjacentElement("beforeBegin",f(0,{id:a,innerHTML:"<style>.extra-button { margin-left: 16px; } </style><a href=\"#\">Print</a>",title:"Print (Save as PDF)",className:"extra-button"}));return m.addEventListener("click",a=>{a.preventDefault();try{let a,m,n;g(d(j));const o=prompt("Printing: what title?",l(b.title)),p=c(o),q=!p.length,r=q?k:p;if(null==o)return null;q&&(b.title=r),a=b.head.cloneNode(!0),e("script",a).forEach(g),a.appendChild(f("style",{textContent:"@media print { body { height: auto !important; } }"}));const s="<!DOCTYPE html><html lang='en'><head>"+(a.innerHTML||"<meta charset='UTF-8'><title>printable</title>")+"</head><body>"+(d("output").outerHTML||"")+"<style></style></body></html>",t=()=>{h(()=>{n.focus(),h(()=>{n.print()},i)},i),n.document.title=r};return m=f("iframe",{id:j,title:j}),m.srcdoc=s,m.style.display="none",b.body.appendChild(m),n=m.contentWindow,m.onload=t,s}catch(a){return a.stack}}),m},n=()=>{o=d("container"),p=d("preview"),o&&p?(q=p._?.editor??j.ace?.edit(a),m()):location="https://darrensem.github.io/markdown/"};let o,p,q;void(/loading/.test(b.readyState)?b.addEventListener("DOMContentLoaded",n):h(n,i))}()}();
// original version of my [Toggle Editor] idea was this Issue: https://github.com/tanabe/markdown-live-preview/issues/56


!"DEBUG_DISABLE" || ( void function() { // IIFE wrapper to ensure it works as stand-alone Bookmarklet; change to !!"DEBUG_DISABLE" for testing without this 'plugin' code (e.g. to confirm some functionality still works or a bug still occurs)

"use strict";


const CLASS_EXTRA_BUTTON = "extra-button";

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
  if ( qi(ID_PRINT_BUTTON) ) return;

  const ID_PRINT_FRAME = "print-" + (location.href.match(/(\/([^/]+))+/)?.[1] ?? "").replace(/[^a-z]+/gi, "");

  const originalTitle = doc.title;

  const printButton = qi("sync-button").insertAdjacentElement(
    "beforeBegin",
    createDiv( 0, {
      id: ID_PRINT_BUTTON,
      innerHTML: (
        "<style>" + "." + CLASS_EXTRA_BUTTON + " { margin-left: 16px; } " + "</style>" +
        '<a href="#">Print</a>'
      ),
      title: "Print (Save as PDF)",
      className: CLASS_EXTRA_BUTTON
    } )
  );

  printButton.addEventListener( "click", (evt) => {
    evt.preventDefault();

    try {

      let printHead, frame, printwin;

      REMOVE_ELEMENT( qi(ID_PRINT_FRAME) );


      // Offer choice of a different document.title (Cancel will abort immediately, before anything is generated)
      const promptTitle = (
        (!"DEBUG_SKIP_PROMPT_FOR_ACCURATE_COMPARISON") && getTitle(doc.title) ||
        prompt( "Printing: what title?", getTitle(doc.title) )
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

        printwin.document.title = printTitle; // final step in case it throws due to browser security policies (cross-origin restrictions)

      };


      if (!"DEBUG_ALWAYS_UPDATE_PARENT_TITLE") { doc.title = printTitle; } else { ; };


      if (!"DEBUG_WINDOW_INSTEAD_OF_IFRAME") {
        // Create a new window with the content
        printwin = window.open("", "_blank", "width=800,height=600");

        // Write the HTML then listen for .onload event
        if (printwin) {
          printwin.name = ID_PRINT_FRAME;
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

  doc.addEventListener( "DOMContentLoaded", init )

  : SET_TIMEOUT( init, MS_MINIMAL ) // Bookmarklet click will occur after DOMContentLoaded event has already fired 

);


}() ); // IIFE wrapper to ensure it works as stand-alone Bookmarklet; change to !!"DEBUG_DISABLE" for testing without this 'plugin' code (e.g. to confirm some functionality still works or a bug still occurs)

