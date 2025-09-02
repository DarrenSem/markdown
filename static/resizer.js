// MarkDownLivePreview.com-resizer.js -- bookmarklet to add [Toggle Editor] (and also horizontal resizer) - instead of waiting for repo update that might use something like this <script defer src="resizer.js"></script>
// 1748 char  javascript:void function(){"use strict";const a=document,b=b=>a.getElementById(b),c=(b,c)=>Object.assign(a.createElement(b),c),d=(a,...b)=>a.addEventListener(...b),e=(a,...b)=>a.removeEventListener(...b),f=a=>a.preventDefault(),g=(d="resizer-css")=>{if(b(d))return;const e=a.head.insertAdjacentElement("afterBegin",c("style",{id:d,innerHTML:"\n\nbody {\n  margin: 0;\n  height: 100vh;\n  overflow: hidden;\n}\n#container {\n  display: flex;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n#edit, #preview {\n  flex-grow: 1;\n  overflow: auto;\n  transition: flex 0.3s ease;\n}\n#resizer {\n  width: 4px;\n  background-color: green;\n  cursor: col-resize;\n  flex-shrink: 0;\n}\n#toggle-button {\n  margin-left: 16px;\n}\n.minedit {\n  flex: 0 0 0px !important;\n}\n\n"}));return e},h=(g=33,h="resizer",i="toggle-button",j)=>{if(b(h))return;const k=b("container"),l=b("preview"),m=b("copy-button");l.parentNode.insertBefore(c("div",{id:h,title:"drag to resize, double-click to return to center"}),l),m.insertAdjacentElement("afterEnd",c("div",{id:i,innerHTML:`<a href="#">Toggle Editor</a>`}));const n=b(h),o=b(i),p=b("edit"),q=(a,b)=>{j&&(b=a.clientX-k.getBoundingClientRect().left,b>=g&&(p.classList.remove("minedit"),p.style.flex=`0 0 ${b}px`,l.style.flex=`1 1 auto`))},r=()=>{j=!1,e(a,"mousemove",q),e(a,"mouseup",r)};return d(n,"dblclick",a=>{f(a),p.classList.remove("minedit"),p.style.flex=`0 0 ${k.getBoundingClientRect().width/2}px`}),d(n,"mousedown",b=>{j=!0,f(b),d(a,"mousemove",q),d(a,"mouseup",r)}),d(o,"click",()=>{p.classList.toggle("minedit")}),n},i=()=>{b("container")&&b("preview")?(g(),h()):location="https://darrensem.github.io/markdown/"};void(/loading/.test(a.readyState)?d(a,"DOMContentLoaded",i):setTimeout(i,9))}();
// original version of my idea was this Issue: https://github.com/tanabe/markdown-live-preview/issues/56


// 02Sep2025: (wip) init() will also addPrintButton(); addSaveButton(); addLoadButton();


"use strict";

const doc = document;

const qi = (id) => doc.getElementById(id);

const createElement = (tagName, options) => Object.assign( doc.createElement( tagName ), options );

const on = (el, ...args) => el.addEventListener(...args); // smaller MINIFY if 3+ usage vs. normal, because normal = 25 char for a.addEventListener(b,c,d) vs. 37 for definition ,X=(a,...b)=>a.addEventListener(...b) + 10 per usage: X(a,b,c,d) // 47 57 _67_ versus 25 50 _75_

const off = (el, ...args) => el.removeEventListener(...args); // smaller MINIFY if 3+ usage vs. normal, because normal = 28 char for a.removeEventListener(b,c,d) vs. 40 for definition ,X=(a,...b)=>a.removeEventListener(...b) + 10 per usage: X(a,b,c,d) // 50 60 _70_ versus 28 56 _84_

const preventTextSelectionFromStarting = (evt) => evt.preventDefault(); // text selection might contribute to it feeling laggy (perhaps FLEX makes some lag unavoidable)

// const SET_TIMEOUT = setTimeout; // smaller MINIFY if 2+ usage vs. normal, because normal = 10 char for setTimeout vs. 13 for definition ,X=setTimeout + 1 per usage: X // 14 _15_ versus 10 _20_

// const DATE_OBJECT = Date; // smaller MINIFY if 3+ usage vs. normal, because normal = 4 char for Date vs. 7 for definition ,X=Date + 1 per usage: X // 8 9 _10_ vs. 4 8 _12_

const addResizerCSS = (ID_RESIZER_CSS = "resizer-css") => {
  if ( qi(ID_RESIZER_CSS) ) return;

  const RESIZER_CSS = `

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
#edit, #preview {
  flex-grow: 1;
  overflow: auto;` /* Enable scrolling for content overflow */ + `
  transition: flex 0.3s ease;
}
#resizer {
  width: 4px;` /* Updated resizer width */ + `
  background-color: green;
  cursor: col-resize;
  flex-shrink: 0;` /* Prevent shrinking */ + `
}
#toggle-button {
  margin-left: 16px;` /* Ensure it doesn't overflow to hide */ + `
}
.minedit {
  flex: 0 0 0px !important;
}

`;

  const resizerCSS = doc.head.insertAdjacentElement(
    "afterBegin",
    createElement( "style", {
      id: ID_RESIZER_CSS,
      innerHTML: RESIZER_CSS
    } )
  );

  return resizerCSS;

};


const addResizer = (MIN_WIDTH_EDITOR_PANE = 33, ID_RESIZER = "resizer", ID_TOGGLE_BUTTON = "toggle-button", _isMouseDown) => {
  if ( qi(ID_RESIZER) ) return;

  const container = qi("container");

  const previewPane = qi("preview");

  const copyButton = qi("copy-button");

  previewPane.parentNode.insertBefore(
    createElement( "div", {
      id: ID_RESIZER,
      title: "drag to resize, double-click to return to center"
    } ),
    previewPane
  );

  copyButton.insertAdjacentElement(
    "afterEnd",
    createElement( "div", {
      id: ID_TOGGLE_BUTTON,
      innerHTML: `<a href="#">Toggle Editor</a>`
    } )
  );

  const resizer = qi(ID_RESIZER);

  const toggleButton = qi(ID_TOGGLE_BUTTON);


  const editPane = qi("edit");

  const handleResize = (evt, _newEditWidth) => {

    if (_isMouseDown) {

      _newEditWidth = evt.clientX - container.getBoundingClientRect().left;

      if (_newEditWidth >= MIN_WIDTH_EDITOR_PANE) {

        // if ( _newEditWidth !== parseInt( getComputedStyle( editPane ).width ) ) { // no impact on it feeling laggy (perhaps FLEX makes some lag unavoidable)
          editPane.classList.remove("minedit");
          editPane.style.flex = `0 0 ${_newEditWidth}px`;
          previewPane.style.flex = `1 1 auto`;
        // };

      };

    };

  };

  const stopResize = () => {
    _isMouseDown = false;
    off( doc, "mousemove", handleResize );
    off( doc, "mouseup", stopResize );
  };

  on( resizer, "dblclick", (evt) => {
    preventTextSelectionFromStarting(evt);  // text selection might contribute to it feeling laggy (perhaps FLEX makes some lag unavoidable)
    editPane.classList.remove("minedit");
    editPane.style.flex = `0 0 ${ container.getBoundingClientRect().width / 2 }px`; // no need for this apparently: preview.style.flex = `1 1 auto`;
  } );

  on( resizer, "mousedown", (evt) => {
    _isMouseDown = true;
    preventTextSelectionFromStarting(evt); // text selection might contribute to it feeling laggy (perhaps FLEX makes some lag unavoidable)
    on( doc, "mousemove", handleResize );
    on( doc, "mouseup", stopResize );
  } );

  on( toggleButton, "click", () => {
    editPane.classList.toggle("minedit");
  } );


  return resizer;
};


const addPrintButton = (ID_PRINT_BUTTON = "print-button") => {
  // if ( qi(ID_PRINT_BUTTON) ) return;

  // console.warn("TODO: add " + ID_PRINT_BUTTON);
  // debugger;
};

const addSaveButton = (ID_SAVE_BUTTON = "save-button") => {
  // if ( qi(ID_SAVE_BUTTON) ) return;

  // console.warn("TODO: add " + ID_SAVE_BUTTON);
  // debugger;
};

const addLoadButton = (ID_LOAD_BUTTON = "load-button") => {
  // if ( qi(ID_LOAD_BUTTON) ) return;

  // console.warn("TODO: add " + ID_LOAD_BUTTON);
  // debugger;
};


const init = () => {

  if( !qi("container") || !qi("preview") ) {

    // location = "https://markdownlivepreview.com";
    // location = "https://github.com/tanabe/markdown-live-preview/";
    location = "https://darrensem.github.io/markdown/";

  } else {

    addResizerCSS();

    addResizer();

    // 02Sep2025: (wip) init() will also addPrintButton(); addSaveButton(); addLoadButton();

    // addPrintButton();

    // addSaveButton();

    // addLoadButton();

  };

};


void (

  /loading/.test(doc.readyState) ?

  on( doc, "DOMContentLoaded", init )

  : setTimeout( init, 9 ) // Bookmarklet click will occur after DOMContentLoaded event has already fired 

);
