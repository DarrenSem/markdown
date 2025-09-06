// MarkDownLivePreview.com-resizer.js -- bookmarklet to add 'Toggle Editor' (and also width-resizer, and 'Print') - instead of waiting for repo update that might use something like this <script defer src="resizer.js"></script>
// 3505 char  javascript:void function(){"use strict";const e="extra-button",t="minedit",n="mouse",i="width",r="click",d="editor",o=document,l=e=>o.getElementById(e),a=(e,t)=>[...(t||o).querySelectorAll(e)],s=(e,t)=>Object.assign(o.createElement(e||"div"),t),c=(e,...t)=>e.addEventListener(...t),p=(e,...t)=>e.removeEventListener(...t),m=setTimeout,u=40,f=window,h=(e="resizer-css")=>{if(l(e))return;const t=["\nbody {\n  margin: 0;\n  height: 100vh;\n  overflow: hidden;\n}\n#container {\n  display: flex;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n#resizer {\n  width: 4px;\n  background-color: green;\n  cursor: col-resize;\n  flex-shrink: 0;\n}\n"],n=["\n#edit, #preview {\n  flex-grow: 1;\n  overflow: auto;\n  transition: flex 0.02s ease;\n}\n.extra-button {\n  margin-left: 16px;\n}\n.minedit {\n  flex: 0 0 0px !important;\n}\n"],i=o.head.insertAdjacentElement("afterBegin",s("style",{id:e,innerHTML:(k?"":t[0])+n[0]}));return i},g=(e,t)=>{const n=e.getBoundingClientRect();return t?n[t]:n},v=(d=99,a="resizer",h="toggle-button")=>{var v=Math.abs;if(l(a))return;let y=!1,b=0,w=0;const x=200,z=l("copy-button").insertAdjacentElement("afterEnd",s(0,{id:h,innerHTML:`<a href="#">Toggle Editor</a>`,className:e})),M=L.insertBefore(s(0,{id:a}),E),T=l("edit"),B=()=>g(T,i),C=()=>g(L,i),H=()=>T.classList.contains(t),_=(e,n)=>{if(e>=d||n){const i=C();i-e>=d&&(n||H()||(b=e/i,q(b,!0)),T.classList.remove(t),T.style.flex=`0 0 ${e}px`)}},j=e=>{y&&_(e.clientX-g(L,"left"))},A=()=>{y=!1,p(o,n+"move",j),p(o,n+"up",A),q(b)},D=E._?.Storehouse,N=E._?.localStorageNamespace,S="last_ratio",q=(e,t,n=new Date)=>{(!t||n>w)&&(D?.setItem(N,S,e,new Date(2099,1,1)),w=+n+x)},I=B()/C(),O=D?.getItem(N,S);return k||(c(k||M,"dblclick",e=>{e.preventDefault(),_(I*C(),!0),q(I)}),c(M,n+"down",e=>{y=!0,e.preventDefault(),c(o,n+"move",j),c(o,n+"up",A),q(b)}),c(f,"resize",()=>{if(!H()){const e=C(),t=B(),n=e-t<d;_(n?t<d?t:e-d:e*b,n)}}),O&&.01<v(O-I)&&_(C()*O,!0),m(()=>{b=B()/C(),O||q(b)},u)),M.title="drag to resize, double-click to return to center",k&&(k.title=M.title),c(z,r,()=>{T.classList.toggle(t)}),M},y=e=>M?.getValue()??a(".sticky-widget-lines,.view-line",l(d)).map(e=>e.style.top.padStart(9,0)+e.innerText).sort().map(e=>e.slice(9)).join("\n"),b=e=>{const t=y().split("\n").map(e=>e.trim()),n=(t.find(e=>(e.match(/^#\s+(.+)/)||[])[1])??t.find(e=>(e.match(/^##\s+(.+)/)||[])[1])??t.filter(e=>e.length)[0]??"").replace(/^##?\s+/,"");return n?.length?n:e},w=(t="print-button",n="print-child")=>{if(l(t))return;const i=o.title,d=l("sync-button").insertAdjacentElement("beforeBegin",s(0,{id:t,innerHTML:`<a href="#">Print</a>`,className:e})),p=()=>{const e=prompt("Printing: what title?",b(o.title)),t=e?.trim();if(null==e)return;o.title=t.length?t:i,l(n)?.remove();const r=l("output"),d=o.head.cloneNode(!0);a("script",d).forEach(e=>e.remove()),d.appendChild(s("style",{textContent:"@media print { body { height: auto !important; } }"}));const c=s("iframe",{id:n});c.style.display="none",o.body.appendChild(c);const p=c.contentWindow,f=c.contentDocument||p.document;c.onload=()=>{m(()=>{p.focus(),p.print(),m(()=>{c?.remove()},u)},u)},f.open(),f.write("<html><head>"+d.innerHTML+"</head><body>"+r.outerHTML+"</body></html>"),f.close()};return c(d,r,p),d},x=()=>{L=l("container"),E=l("preview"),k=l("split-divider"),L&&E?(z=E._?.presetValue,M=E._?.editor??f.ace?.edit(d),h(),v(),w()):location="https://darrensem.github.io/markdown/"};let L,E,k,z,M;void(/loading/.test(o.readyState)?c(o,"DOMContentLoaded",x):m(x,u))}();
// original version of my [Toggle Editor] idea was this Issue: https://github.com/tanabe/markdown-live-preview/issues/56



// true && ( () => { // IIFE wrapper to make it easy to disable everything (to confirm something still occurs without my resizer)

"use strict";


const CLASS_EXTRA_BUTTON = "extra-button";

const CLASS_MIN_EDIT = "minedit";

const MOUSE_PREFIX = "mouse";

const WIDTH_PROP = "width";

const CLICK_EVENT = "click";

const ID_SPLIT_DIVIDER = "split-divider";

const ID_EDITOR = "editor";

const doc = document;

const qi = (id) => doc.getElementById(id);

const qs = (sel, root) => [... (root || doc).querySelectorAll(sel) ];

const createDiv = (tagName, options) => Object.assign( doc.createElement( tagName || "div" ), options );

const on = (el, ...args) => el.addEventListener(...args); // smaller MINIFY if 3+ usage vs. normal, because normal = 25 char for a.addEventListener(b,c,d) vs. 37 for definition ,X=(a,...b)=>a.addEventListener(...b) + 10 per usage: X(a,b,c,d) // 47 57 _67_ versus 25 50 _75_

const off = (el, ...args) => el.removeEventListener(...args); // smaller MINIFY if 3+ usage vs. normal, because normal = 28 char for a.removeEventListener(b,c,d) vs. 40 for definition ,X=(a,...b)=>a.removeEventListener(...b) + 10 per usage: X(a,b,c,d) // 50 60 _70_ versus 28 56 _84_

const SET_TIMEOUT = setTimeout; // smaller MINIFY if 2+ usage vs. normal, because normal = 10 char for setTimeout vs. 13 for definition ,X=setTimeout + 1 per usage: X // 14 _15_ versus 10 _20_

const MS_MINIMAL = 40;

// const DATE_OBJECT = Date; // smaller MINIFY if 3+ usage vs. normal, because normal = 4 char for Date vs. 7 for definition ,X=Date + 1 per usage: X // 8 9 _10_ vs. 4 8 _12_

const WINDOW_OBJECT = window;

const setupResizerCSS = (ID_RESIZER_CSS = "resizer-css") => {
  if ( qi(ID_RESIZER_CSS) ) return;

  const cssResizerOnly = [
`
body {
  margin: 0;` /* Remove default margin */ + `
  height: 100vh;` /* Ensure full height usage */ + `
  overflow: hidden;` /* Prevent body scrollbars */ + `
}
#container {
  display: flex;
  width: 100%;
  height: 100%;` /* Full height of the parent */ + `
  overflow: hidden;
}
#resizer {
  width: 4px;` /* Updated resizer width */ + `
  background-color: green;
  cursor: col-resize;
  flex-shrink: 0;` /* Prevent shrinking */ + `
}
`
  ];

  const cssCommon = [
`
#edit, #preview {
  flex-grow: 1;
  overflow: auto;` /* Enable scrolling for content overflow */ + `
  transition: flex 0.02s ease;
}
.extra-button {
  margin-left: 16px;` /* Ensure it doesn't overflow to hide */ + `
}
.minedit {
  flex: 0 0 0px !important;
}
`
  ];

  // ^ NOTE re. workaround using [string] instead of "string": ...using `CSS=["string"]` then `elStyle.innerHTML=CSS[0]`
  // instead of simply `CSS="string"` then `elStyle.innerHTML=CSS`
  // ...because during MINIFY, on occasion for some reason, with certain strings and certain code structure,
  // it will store that string value BUT will then seem to just 'set it and forget it' and NOT USE its variable name,
  // instead the resulting .min.js would have a duplicate occurrence of that string's value (AKA "full contents" appear TWICE)

  const resizerCSS = doc.head.insertAdjacentElement(
    "afterBegin",
    createDiv( "style", {
      id: ID_RESIZER_CSS,
      innerHTML: ( splitDividerMLP ? "" : cssResizerOnly[0] ) + cssCommon[0]
    } )
  );

  return resizerCSS;
};

const getRect = (el, propName) => {
  const rect = el.getBoundingClientRect();
  return propName ? rect[propName] : rect;
};

const setupResizer = (MIN_WIDTH_EDITOR_PANE = 99, ID_RESIZER = "resizer", ID_TOGGLE_BUTTON = "toggle-button") => {
  if ( qi(ID_RESIZER) ) return;

  let isMouseDown = false;

  let ratio = 0;

  let throttleSaveRatio = 0;

  const MS_THROTTLE_SAVE_RATIO = 200;

  const toggleButton = qi("copy-button").insertAdjacentElement(
    "afterEnd",
    createDiv( 0, {
      id: ID_TOGGLE_BUTTON,
      innerHTML: `<a href="#">Toggle Editor</a>`,
      className: CLASS_EXTRA_BUTTON
    } )
  );

  const resizer = container.insertBefore( // inserts before a reference node as a child of a specified parent node https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore#parameters
    createDiv( 0, {
      id: ID_RESIZER
    } ),
    previewPane // The node before which newNode is inserted. If this is null, then newNode is inserted at the end of node's child nodes
  );

  const editPane = qi("edit");

  const getWidthEditor = () => getRect(editPane, WIDTH_PROP);

  const getWidthContainer = () => getRect(container, WIDTH_PROP);

  const isEditorMinified = () => editPane.classList.contains(CLASS_MIN_EDIT);

  const updateResizer = (newEditWidth, keepRatio) => {

    if ( newEditWidth >= MIN_WIDTH_EDITOR_PANE || keepRatio) {

      const widthContainer = getWidthContainer();

      if ( widthContainer - newEditWidth >= MIN_WIDTH_EDITOR_PANE ) {

        if ( !keepRatio && !isEditorMinified() ) {
          ratio = newEditWidth / widthContainer;
          saveRatio( ratio, !!"throttled" );
        };

        editPane.classList.remove(CLASS_MIN_EDIT);
        editPane.style.flex = `0 0 ${ newEditWidth }px`;

      };

    };

  };

  const handleResize = (evt) => {
    if (isMouseDown) {
      updateResizer( evt.clientX - getRect(container, "left") );
    };
  };

  const stopResize = () => {
    isMouseDown = false;
    off( doc, MOUSE_PREFIX + "move", handleResize );
    off( doc, MOUSE_PREFIX + "up", stopResize );
    saveRatio(ratio);
  };

  const storageObject = previewPane._?.Storehouse;

  const storageNS = previewPane._?.localStorageNamespace;

  const storageKeyRatio = "last_ratio";

  const saveRatio = ( ratioToSave, throttled, _now = new Date() ) => {
    if (!throttled || ( _now > throttleSaveRatio) ) {
      storageObject?.setItem(storageNS, storageKeyRatio, ratioToSave, new Date(2099, 1, 1));
      throttleSaveRatio = +_now + MS_THROTTLE_SAVE_RATIO;
    };
  };

  const ratioCentered = getWidthEditor() / getWidthContainer();

  const ratioLoaded = storageObject?.getItem(storageNS, storageKeyRatio);
  
  if (!splitDividerMLP) {

    on( splitDividerMLP || resizer, "dblclick", (evt) => {
      evt.preventDefault(); // prevent text selection during resizing (otherwise bad UX and might event contribute to feeling laggy)
      updateResizer( ratioCentered * getWidthContainer(), !!"keepRatio" );
      saveRatio(ratioCentered);
    } );

    on( resizer, MOUSE_PREFIX + "down", (evt) => {
      isMouseDown = true;
      evt.preventDefault(); // prevent text selection during resizing (otherwise bad UX and might event contribute to feeling laggy)
      on( doc, MOUSE_PREFIX + "move", handleResize );
      on( doc, MOUSE_PREFIX + "up", stopResize );
      saveRatio(ratio);
    } );

    on( WINDOW_OBJECT, "resize", () => {

      if ( !isEditorMinified() ) {

        const widthContainer = getWidthContainer();

        const widthEditor = getWidthEditor();

        const keepRatio = ( widthContainer - widthEditor ) < MIN_WIDTH_EDITOR_PANE;

        updateResizer(
          keepRatio
          ? ( widthEditor < MIN_WIDTH_EDITOR_PANE ? widthEditor : widthContainer - MIN_WIDTH_EDITOR_PANE )
          : widthContainer * ratio
          , keepRatio
        );

      };

    } );

    if ( ratioLoaded && ( Math.abs(ratioLoaded - ratioCentered) > 0.01 ) ) {
      updateResizer( getWidthContainer() * ratioLoaded, !!"keepRatio" );
    };

    SET_TIMEOUT( () => {
      ratio = getWidthEditor() / getWidthContainer();
      if (!ratioLoaded) {
        saveRatio(ratio);
      };
    }, MS_MINIMAL);

  };

  resizer.title = "drag to resize, double-click to return to center";
  if (splitDividerMLP) splitDividerMLP.title = resizer.title;

  on( toggleButton, CLICK_EVENT, () => {
    editPane.classList.toggle(CLASS_MIN_EDIT);
  } );

  return resizer;
};

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
  .map( line => line.trim() );

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

  const originalTitle = doc.title;
  
  const printButton = qi("sync-button").insertAdjacentElement(
    "beforeBegin",
    createDiv( 0, {
      id: ID_PRINT_BUTTON,
      innerHTML: `<a href="#">Print</a>`,
      className: CLASS_EXTRA_BUTTON
    } )
  );
  
  const handlePrintClick = () => {

    const newTitle = prompt( "Printing: what title?", getTitle(doc.title) );
    
    const trimmedTitle = newTitle?.trim();
    
    if (newTitle == null) return;
    
    doc.title = trimmedTitle.length ? trimmedTitle : originalTitle;


    qi(ID_PRINT_CHILD)?.remove();

    const elPreviewHTML = qi("output");

    const head = doc.head.cloneNode(true);
    qs("script", head).forEach(script => script.remove());

    head.appendChild(
      createDiv( "style", {
        textContent: // textContent instead of innerText when assigning CSS text inside <style> elements, to ensure it preserves the exact textual content needed for the browser to parse CSS properly (no possible changes to whitespace hidden content display: none etc.)
        "@media print {"
        + " body { height: auto !important; }"
        + " }"
      } )
    );

    const childframe = createDiv( "iframe", {
      id: ID_PRINT_CHILD
    } );

    childframe.style.display = "none"; // 'display: none' to ensure never visible, even though will self-remove immediately after .print() is called

    doc.body.appendChild(childframe);

    const childwin = childframe.contentWindow;

    const childdoc = childframe.contentDocument || childwin.document;

    childframe.onload = () => {

      SET_TIMEOUT( () => {

        childwin.focus();
        childwin.print();

        SET_TIMEOUT( () => {
          childframe?.remove();
        }, MS_MINIMAL );

      }, MS_MINIMAL );

    };

    childdoc.open();
    childdoc.write( "<html><head>" + head.innerHTML + "</head><body>" + elPreviewHTML.outerHTML + "</body></html>" );
    childdoc.close();

  };

  on( printButton, CLICK_EVENT, handlePrintClick );

  return printButton;
};

const init = () => {

  container = qi("container");

  previewPane = qi("preview");

  splitDividerMLP = qi(ID_SPLIT_DIVIDER); // "split-divider" seems to be a recent addition to https://MarkdownLivePreview.com/

  if( !container || !previewPane ) {

    // location = "https://MarkdownLivePreview.com/";
    // location = "https://github.com/tanabe/markdown-live-preview/";
    location = "https://darrensem.github.io/markdown/";

  } else {

    editor = previewPane._?.editor ?? WINDOW_OBJECT.ace?.edit(ID_EDITOR);

    setupResizerCSS();

    setupResizer();

    setupPrintButton();

  };

};


let container; // container = qi("container");

let previewPane; // previewPane = qi("preview");

let splitDividerMLP; // splitDividerMLP = qi(ID_SPLIT_DIVIDER); // "split-divider" seems to be a recent addition to https://MarkdownLivePreview.com/

let editor;


void (

  /loading/.test(doc.readyState) ?

  on( doc, "DOMContentLoaded", init )

  : SET_TIMEOUT( init, MS_MINIMAL ) // Bookmarklet click will occur after DOMContentLoaded event has already fired 

);


// } )(); // IIFE wrapper to make it easy to disable everything (to confirm something still occurs without my resizer)
