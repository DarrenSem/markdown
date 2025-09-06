// MarkDownLivePreview.com-resizer.js -- bookmarklet to add 'Toggle Editor' (and also width-resizer, and 'Print') - instead of waiting for repo update that might use something like this <script defer src="resizer.js"></script>
// 3551 char  javascript:void function(){"use strict";const e="extra-button",t="minedit",n="mouse",i="width",d="click",r="editor",o=document,l=e=>(e??"").replace(/[\u200d]/g,"").replace(/\s+/g," ").trim(),a=e=>o.getElementById(e),s=(e,t)=>[...(t||o).querySelectorAll(e)],c=(e,t)=>Object.assign(o.createElement(e||"div"),t),p=(e,...t)=>e.addEventListener(...t),u=(e,...t)=>e.removeEventListener(...t),m=e=>e.preventDefault(),f=setTimeout,h=40,g=window,y=(e="resizer-css")=>{if(a(e))return;const t=["\nbody {\n  margin: 0;\n  height: 100vh;\n  overflow: hidden;\n}\n#container {\n  display: flex;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n#resizer {\n  width: 4px;\n  background-color: green;\n  cursor: col-resize;\n  flex-shrink: 0;\n}\n"],n=["\n#edit, #preview {\n  flex-grow: 1;\n  overflow: auto;\n  transition: flex 0.02s ease;\n}\n.extra-button {\n  margin-left: 16px;\n}\n.minedit {\n  flex: 0 0 0px !important;\n}\n"],i=o.head.insertAdjacentElement("afterBegin",c("style",{id:e,innerHTML:(M?"":t[0])+n[0]}));return i},b=(e,t)=>{const n=e.getBoundingClientRect();return t?n[t]:n},v=(r=99,l="resizer",s="toggle-button")=>{var y=Math.abs;if(a(l))return;let v=!1,w=0,x=0;const L=200,E=a("copy-button").insertAdjacentElement("afterEnd",c(0,{id:s,innerHTML:`<a href="#">Toggle Editor</a>`,className:e})),T=k.insertBefore(c(0,{id:l}),z),B=a("edit"),C=()=>b(B,i),H=()=>b(k,i),j=()=>B.classList.contains(t),A=(e,n)=>{if(e>=r||n){const i=H();i-e>=r&&(n||j()||(w=e/i,I(w,!0)),B.classList.remove(t),B.style.flex=`0 0 ${e}px`)}},N=e=>{v&&A(e.clientX-b(k,"left"))},_=()=>{v=!1,u(o,n+"move",N),u(o,n+"up",_),I(w)},D=z._?.Storehouse,S=z._?.localStorageNamespace,q="last_ratio",I=(e,t,n=new Date)=>{(!t||n>x)&&(D?.setItem(S,q,e,new Date(2099,1,1)),x=+n+L)},O=C()/H(),P=D?.getItem(S,q);return M||(p(M||T,"dblclick",e=>{m(e),A(O*H(),!0),I(O)}),p(T,n+"down",e=>{v=!0,m(e),p(o,n+"move",N),p(o,n+"up",_),I(w)}),p(g,"resize",()=>{if(!j()){const e=H(),t=C(),n=e-t<r;A(n?t<r?t:e-r:e*w,n)}}),P&&.01<y(P-O)&&A(H()*P,!0),f(()=>{w=C()/H(),P||I(w)},h)),T.title="drag to resize, double-click to return to center",M&&(M.title=T.title),p(E,d,e=>{m(e),B.classList.toggle(t)}),T},w=e=>T?.getValue()??s(".sticky-widget-lines,.view-line",a(r)).map(e=>e.style.top.padStart(9,0)+e.innerText).sort().map(e=>e.slice(9)).join("\n"),x=e=>{const t=w().split("\n").map(e=>l(e)),n=(t.find(e=>(e.match(/^#\s+(.+)/)||[])[1])??t.find(e=>(e.match(/^##\s+(.+)/)||[])[1])??t.filter(e=>e.length)[0]??"").replace(/^##?\s+/,"");return n?.length?n:e},L=(t="print-button",n="print-child")=>{if(a(t))return;const i=o.title,r=a("sync-button").insertAdjacentElement("beforeBegin",c(0,{id:t,innerHTML:`<a href="#">Print</a>`,className:e})),u=()=>{const e=prompt("Printing: what title?",x(o.title)),t=l(e);if(null==e)return;o.title=t.length?t:i,a(n)?.remove();const d=a("output"),r=o.head.cloneNode(!0);s("script",r).forEach(e=>e.remove()),r.appendChild(c("style",{textContent:"@media print { body { height: auto !important; } }"}));const p=c("iframe",{id:n});p.style.display="none",o.body.appendChild(p);const u=p.contentWindow,m=p.contentDocument||u.document;p.onload=()=>{f(()=>{u.focus(),u.print(),f(()=>{p?.remove()},h)},h)},m.open(),m.write("<html><head>"+r.innerHTML+"</head><body>"+d.outerHTML+"</body></html>"),m.close()};return p(r,d,e=>{m(e),u()}),r},E=()=>{k=a("container"),z=a("preview"),M=a("split-divider"),k&&z?(T=z._?.editor??g.ace?.edit(r),y(),v(),L()):location="https://darrensem.github.io/markdown/"};let k,z,M,T;void(/loading/.test(o.readyState)?p(o,"DOMContentLoaded",E):f(E,h))}();
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

const off = (el, ...args) => el.removeEventListener(...args); // smaller MINIFY if 3+ usage vs. normal, because normal = 28 char for a.removeEventListener(b,c,d) vs. 40 for definition ,X=(a,...b)=>a.removeEventListener(...b) + 10 per usage: X(a,b,c,d) // 50 60 _70_ versus 28 56 _84_

const PREVENT_DEFAULT = evt => evt.preventDefault(); // smaller MINIFY if 2+ usage vs. normal, because normal = 18 char for a.preventDefault() vs. 24 for definition ,X=a=>a.preventDefault() + 3 per usage: X() // 27 _30_ versus 18 _36_

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
      PREVENT_DEFAULT(evt); // prevent text selection during resizing (otherwise bad UX and might event contribute to feeling laggy)
      updateResizer( ratioCentered * getWidthContainer(), !!"keepRatio" );
      saveRatio(ratioCentered);
    } );

    on( resizer, MOUSE_PREFIX + "down", (evt) => {
      isMouseDown = true;
      PREVENT_DEFAULT(evt); // prevent text selection during resizing (otherwise bad UX and might event contribute to feeling laggy)
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

  on( toggleButton, CLICK_EVENT, (evt) => {
    PREVENT_DEFAULT(evt);
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
    
    const trimmedTitle = trimmer(newTitle);
    
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

  on( printButton, CLICK_EVENT, (evt) => {
    PREVENT_DEFAULT(evt);
    handlePrintClick();
  } );

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
