// MarkDownLivePreview.com-printButton.js -- bookmarklet to add 'Print' of preview HTML - instead of waiting for repo update that might use something like this <script src="./static/printButton.js"></script>
// (09Sep2025 945am) 1751 char  javascript:void function(){"use strict";const a="editor",b=document,c=a=>(a??"").replace(/[\u200d]/g,"").replace(/\s+/g," ").trim(),d=a=>b.getElementById(a),e=(a,c)=>[...(c||b).querySelectorAll(a)],f=(a,c)=>Object.assign(b.createElement(a||"div"),c),g=(a,...b)=>a.addEventListener(...b),h=a=>a.preventDefault(),i=setTimeout,j=40,k=window,l=b=>r?.getValue()??e(".sticky-widget-lines,.view-line",d(a)).map(a=>a.style.top.padStart(9,0)+a.innerText).sort().map(a=>a.slice(9)).join("\n"),m=a=>{const b=l().split("\n").map(a=>c(a)),d=(b.find(a=>(a.match(/^#\s+(.+)/)||[])[1])??b.find(a=>(a.match(/^##\s+(.+)/)||[])[1])??b.filter(a=>a.length)[0]??"").replace(/^##?\s+/,"");return d?.length?d:a},n=(a="print-button",k="print-child")=>{if(d(a))return;let l=d(k);const n=b.title,o=d("sync-button").insertAdjacentElement("beforeBegin",f(0,{id:a,innerHTML:"<style>"+".extra-button { margin-left: 16px; } "+"</style><a href=\"#\">Print</a>",className:"extra-button"})),p=a=>(a??l)?.remove(),q=()=>{p();const a=prompt("Printing: what title?",m(b.title)),h=c(a);if(null==a)return;b.title=h.length?h:n;const o=()=>{i(()=>s.focus(),j),i(()=>s.print(),500)},q=d("output"),r=b.head.cloneNode(!0);e("script",r).forEach(a=>a.remove()),r.appendChild(f("style",{textContent:"@media print { body { height: auto !important; } }"})),l=f("iframe",{id:k}),l.style.display="none",b.body.appendChild(l);const s=l.contentWindow,t="<head>"+r.innerHTML+"</head><body>"+q.outerHTML+"</body>";g(l,"load",o),l.srcdoc="<html>"+t+"</html>"};return g(o,"click",a=>{h(a),q()}),o},o=()=>{p=d("container"),q=d("preview"),p&&q?(r=q._?.editor??k.ace?.edit(a),n()):location="https://darrensem.github.io/markdown/"};let p,q,r;void(/loading/.test(b.readyState)?g(b,"DOMContentLoaded",o):i(o,j))}();
// original version of my [Toggle Editor] idea was this Issue: https://github.com/tanabe/markdown-live-preview/issues/56



!"DEBUG_DISABLE" || ( void function() { // IIFE wrapper to ensure it works as stand-alone Bookmarklet; change to !!"DEBUG_DISABLE" for testing without this 'plugin' code (e.g. to confirm some functionality still works or a bug still occurs)

"use strict";


const CLASS_EXTRA_BUTTON = "extra-button";

const CSS_EXTRA_BUTTON = "." + CLASS_EXTRA_BUTTON + " { margin-left: 16px; } "; // Ensure it doesn't overflow to hide


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

const setupPrintButton = (ID_PRINT_BUTTON = "print-button", ID_PRINT_CHILD = "print-child") => {
  if ( qi(ID_PRINT_BUTTON) ) return;

  let childframe = qi(ID_PRINT_CHILD);

  const originalTitle = doc.title;
  
  const printButton = qi("sync-button").insertAdjacentElement(
    "beforeBegin",
    createDiv( 0, {
      id: ID_PRINT_BUTTON,
      innerHTML: (
        "<style>" + CSS_EXTRA_BUTTON + "</style>" +
        '<a href="#">Print</a>'
      ),
      className: CLASS_EXTRA_BUTTON
    } )
  );
  
  const removeChild = (element) => ( element ?? childframe )?.remove();

  const handlePrintClick = () => {

    // Ensure no existing <iframe> with ID_PRINT_CHILD, before creating a new one
    // ...and in fact, before prompt(), to give full flexibility when removal happens, rather than "during" printing (e.g. "afterprint" event -- especially unreliable on mobile)
    removeChild();

    const newTitle = (
      prompt( "Printing: what title?", getTitle(doc.title) )
    );

    const trimmedTitle = trimmer(newTitle);

    if (newTitle == null) return;

    doc.title = trimmedTitle.length ? trimmedTitle : originalTitle;

    const handleChildLoad = () => {

      if (!"DEBUG_CHILD_REMOVE_AFTER_PRINTING_AFTER_PRINT()_CALLED_") { SET_TIMEOUT( removeChild, 9000 ); } else { ; };
      //// reminder: no using "afterprint" event, because it fires BEFORE the "Print Preview" dialog finishes loading/opening on mobile cell phones sometimes
      //// Therefore, 100% permanently commenting out this line: on( childwin, "afterprint", (evt) => removeChild() );
      //// (Unfortunate, because "Baseline Widely available" Oct 2019+) https://developer.mozilla.org/en-US/docs/Web/API/Window/afterprint_event

      SET_TIMEOUT( () => childwin.focus(), MS_MINIMAL );

      SET_TIMEOUT( () => childwin.print(), 500 );

    };

    const elPreviewHTML = qi("output");

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

    childframe = createDiv( "iframe", {
      id: ID_PRINT_CHILD
    } );

    childframe.style.display = "none"; // 'display: none' to ensure never visible, even though will self-remove immediately after .print() is called

    doc.body.appendChild(childframe);

    const childwin = childframe.contentWindow;

    const innerhtml = (
      ( "<head>" + head.innerHTML + "</head><body>" + elPreviewHTML.outerHTML + "</body>" )
    );

    on( childframe, "load", handleChildLoad );

    ( childframe.srcdoc = "<html>" + innerhtml + "</html>" );
    //// ^ NOTE: childframe.srcdoc="<html...>" actually triggers childframe.onload, unlike childframe.documentElement.outerHTML = "<html...>" )

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
