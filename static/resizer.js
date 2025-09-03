// MarkDownLivePreview.com-resizer.js -- bookmarklet to add [Toggle Editor] (and also horizontal resizer) - instead of waiting for repo update that might use something like this <script defer src="resizer.js"></script>
// 1823 char  javascript:void function(){"use strict";const a=document,b=b=>a.getElementById(b),c=(b,c)=>Object.assign(a.createElement(b||"div"),c),d=(a,...b)=>a.addEventListener(...b),e=(a,...b)=>a.removeEventListener(...b),f="minedit",g="mouse",h=(d="resizer-css")=>{if(b(d))return;const e=["\nbody {\n  margin: 0;\n  height: 100vh;\n  overflow: hidden;\n}\n#container {\n  display: flex;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n#resizer {\n  width: 4px;\n  background-color: green;\n  cursor: col-resize;\n  flex-shrink: 0;\n}\n"],f=["\n#edit, #preview {\n  flex-grow: 1;\n  overflow: auto;\n  transition: flex 0.02s ease;\n}\n#toggle-button {\n  margin-left: 16px;\n}\n.minedit {\n  flex: 0 0 0px !important;\n}\n"],g=a.head.insertAdjacentElement("afterBegin",c("style",{id:d,innerHTML:(n?"":e[0])+f[0]}));return g},i=(a,b)=>{const c=a.getBoundingClientRect();return b?c[b]:c},j=(h=33,j="resizer",k="toggle-button")=>{if(b(j))return;let o;const p=b("copy-button").insertAdjacentElement("afterEnd",c(0,{id:k,innerHTML:`<a href="#">Toggle Editor</a>`})),q=l.insertBefore(c(0,{id:j}),m),r=b("edit"),s=a=>{a>=h&&(r.classList.remove(f),r.style.flex=`0 0 ${a}px`,m.style.flex=`1 1 auto`)},t=a=>{o&&s(a.clientX-i(l,"left"))},u=()=>{o=!1,e(a,g+"move",t),e(a,g+"up",u)};return n||(d(q,"dblclick",a=>{a.preventDefault(),r.classList.remove(f),r.style.flex=`0 0 ${i(l,"width")/2}px`}),d(q,g+"down",b=>{o=!0,b.preventDefault(),d(a,g+"move",t),d(a,g+"up",u)}),s(i(l,"width")-i(r,"width"))),q.title="drag to resize, double-click to return to center",n&&(n.title=q.title),d(p,"click",()=>{r.classList.toggle(f)}),q},k=()=>{l=b("container"),m=b("preview"),n=b("split-divider"),l&&m?(h(),j()):location="https://darrensem.github.io/markdown/"};let l,m,n;void(/loading/.test(a.readyState)?d(a,"DOMContentLoaded",k):setTimeout(k,9))}();
// original version of my idea was this Issue: https://github.com/tanabe/markdown-live-preview/issues/56


"use strict";

const doc = document;

const qi = (id) => doc.getElementById(id);

const createElement = (tagName, options) => Object.assign( doc.createElement( tagName || "div" ), options );

const on = (el, ...args) => el.addEventListener(...args); // smaller MINIFY if 3+ usage vs. normal, because normal = 25 char for a.addEventListener(b,c,d) vs. 37 for definition ,X=(a,...b)=>a.addEventListener(...b) + 10 per usage: X(a,b,c,d) // 47 57 _67_ versus 25 50 _75_

const off = (el, ...args) => el.removeEventListener(...args); // smaller MINIFY if 3+ usage vs. normal, because normal = 28 char for a.removeEventListener(b,c,d) vs. 40 for definition ,X=(a,...b)=>a.removeEventListener(...b) + 10 per usage: X(a,b,c,d) // 50 60 _70_ versus 28 56 _84_

// const SET_TIMEOUT = setTimeout; // smaller MINIFY if 2+ usage vs. normal, because normal = 10 char for setTimeout vs. 13 for definition ,X=setTimeout + 1 per usage: X // 14 _15_ versus 10 _20_

// const DATE_OBJECT = Date; // smaller MINIFY if 3+ usage vs. normal, because normal = 4 char for Date vs. 7 for definition ,X=Date + 1 per usage: X // 8 9 _10_ vs. 4 8 _12_

const CLASS_MIN_EDIT = "minedit";

const MOUSE_PREFIX = "mouse";

const ID_SPLIT_DIVIDER = "split-divider";

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
#toggle-button {
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
    createElement( "style", {
      id: ID_RESIZER_CSS,
      innerHTML: ( divider ? "" : cssResizerOnly[0] ) + cssCommon[0]
    } )
  );

  return resizerCSS;
};

const getRect = (el, propName) => {
  const rect = el.getBoundingClientRect();
  return propName ? rect[propName] : rect;
};

const setupResizer = (MIN_WIDTH_EDITOR_PANE = 33, ID_RESIZER = "resizer", ID_TOGGLE_BUTTON = "toggle-button") => {
  if ( qi(ID_RESIZER) ) return;

  let isMouseDown;

  const toggleButton = qi("copy-button").insertAdjacentElement(
    "afterEnd",
    createElement( 0, {
      id: ID_TOGGLE_BUTTON,
      innerHTML: `<a href="#">Toggle Editor</a>`
    } )
  );

  const resizer = container.insertBefore( // inserts before a reference node as a child of a specified parent node https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore#parameters
    createElement( 0, {
      id: ID_RESIZER
    } ),
    previewPane // The node before which newNode is inserted. If this is null, then newNode is inserted at the end of node's child nodes
  );

  const editPane = qi("edit");

  const updateResizer = (newEditWidth) => {
    if (newEditWidth >= MIN_WIDTH_EDITOR_PANE) {
      editPane.classList.remove(CLASS_MIN_EDIT);
      editPane.style.flex = `0 0 ${newEditWidth}px`;
      previewPane.style.flex = `1 1 auto`;
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
  };

  if (!divider) {
    on( resizer, "dblclick", (evt) => {
      evt.preventDefault(); // prevent text selection during resizing (otherwise bad UX and might event contribute to feeling laggy)
      editPane.classList.remove(CLASS_MIN_EDIT);
      editPane.style.flex = `0 0 ${ getRect(container, "width") / 2 }px`; // no need for this apparently: preview.style.flex = `1 1 auto`;
    } );

    on( resizer, MOUSE_PREFIX + "down", (evt) => {
      isMouseDown = true;
      evt.preventDefault(); // prevent text selection during resizing (otherwise bad UX and might event contribute to feeling laggy)
      on( doc, MOUSE_PREFIX + "move", handleResize );
      on( doc, MOUSE_PREFIX + "up", stopResize );
    } );

    updateResizer( getRect(container, "width") - getRect(editPane, "width") );

  };

  resizer.title = "drag to resize, double-click to return to center";
  if (divider) divider.title = resizer.title;

  on( toggleButton, "click", () => {
    editPane.classList.toggle(CLASS_MIN_EDIT);
  } );

  return resizer;
};


const setupPrintButton = (ID_PRINT_BUTTON = "print-button") => {
  // if ( qi(ID_PRINT_BUTTON) ) return;


  //// TODO: I think the plan is HOW QUICKLY can I make it say "select all the text in the PREVIEW window, then click window.print()" ???

  //// or just open in new text window (since I can change the TITLE!) with ==> document.querySelector('#output').innerHTML



  // console.warn("TODO: add " + ID_PRINT_BUTTON);
  // debugger;
};

const setupSaveButton = (ID_SAVE_BUTTON = "save-button") => {
  // if ( qi(ID_SAVE_BUTTON) ) return;

  // console.warn("TODO: add " + ID_SAVE_BUTTON);
  // debugger;
};

const setupLoadButton = (ID_LOAD_BUTTON = "load-button") => {
  // if ( qi(ID_LOAD_BUTTON) ) return;

  // console.warn("TODO: add " + ID_LOAD_BUTTON);
  // debugger;
};


const init = () => {

  container = qi("container");

  previewPane = qi("preview");

  divider = qi(ID_SPLIT_DIVIDER); // "split-divider" seems to be a recent addition to https://MarkdownLivePreview.com/

  if( !container || !previewPane ) {

    // location = "https://MarkdownLivePreview.com/";
    // location = "https://github.com/tanabe/markdown-live-preview/";
    location = "https://darrensem.github.io/markdown/";

  } else {

    setupResizerCSS();

    setupResizer();

    // 02Sep2025: (wip) init() will soon also setupPrintButton(); setupSaveButton(); setupLoadButton();

    // setupPrintButton();

    // setupSaveButton();

    // setupLoadButton();

  };

};


let container; // container = qi("container");

let previewPane; // previewPane = qi("preview");

let divider; // divider = qi(ID_SPLIT_DIVIDER); // "split-divider" seems to be a recent addition to https://MarkdownLivePreview.com/


void (

  /loading/.test(doc.readyState) ?

  on( doc, "DOMContentLoaded", init )

  : setTimeout( init, 9 ) // Bookmarklet click will occur after DOMContentLoaded event has already fired 

);
