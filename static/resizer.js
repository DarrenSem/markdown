// MarkDownLivePreview.com-resizer.js -- bookmarklet to add 'Toggle Editor' (and also width-resizer) - instead of waiting for repo update that might use something like this <script src="./static/resizer.js"></script>
// (09Sep2025 938am) 2209 char  javascript:void function(){"use strict";const e="minedit",t="extra-button",i="mouse",n="width",r=document,o=e=>r.getElementById(e),s=(e,t)=>Object.assign(r.createElement(e||"div"),t),d=(e,...t)=>e.addEventListener(...t),l=(e,...t)=>e.removeEventListener(...t),a=e=>e.preventDefault(),c=setTimeout,g=40,m=window,f=(e="resizer-css")=>{if(o(e))return;const i=["\nbody {\n  margin: 0;\n  height: 100vh;\n  overflow: hidden;\n}\n#container {\n  display: flex;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n#resizer {\n  width: 4px;\n  background-color: green;\n  cursor: col-resize;\n  flex-shrink: 0;\n}\n"],n=r.head.insertAdjacentElement("afterBegin",s("style",{id:e,innerHTML:(x?"":i[0])+"#edit, #preview { flex-grow: 1; overflow: auto; transition: flex 0.02s ease; } .minedit { flex: 0 0 0px !important; } "+("."+t+" { margin-left: 16px; } ")}));return n},p=(e,t)=>{const i=e.getBoundingClientRect();return t?i[t]:i},h=(f=99,h="resizer",u="toggle-button")=>{var b=Math.abs;if(o(h))return;let E=!1,L=0,y=0;const k=200,z=o("copy-button").insertAdjacentElement("afterEnd",s(0,{id:u,innerHTML:"<a href=\"#\">Toggle Editor</a>",className:t})),B=v.insertBefore(s(0,{id:h}),w),M=o("edit"),T=()=>p(M,n),_=()=>p(v,n),j=()=>M.classList.contains(e),A=(t,i)=>{if(t>=f||i){const n=_();n-t>=f&&(i||j()||(L=t/n,O(L,!0)),M.classList.remove(e),M.style.flex="0 0 "+t+"px")}},C=e=>{E&&A(e.clientX-p(v,"left"))},D=()=>{E=!1,l(r,i+"move",C),l(r,i+"up",D),O(L)},H=w._?.Storehouse,N=w._?.localStorageNamespace,I="last_ratio",O=(e,t,i=new Date)=>{(!t||i>y)&&(H?.setItem(N,I,e,new Date(2099,1,1)),y=+i+k)},R=T()/_(),S=H?.getItem(N,I);return x||(d(x||B,"dblclick",e=>{a(e),A(R*_(),!0),O(R)}),d(B,i+"down",e=>{E=!0,a(e),d(r,i+"move",C),d(r,i+"up",D),O(L)}),d(m,"resize",()=>{if(!j()){const e=_(),t=T(),i=e-t<f;A(i?t<f?t:e-f:e*L,i)}}),S&&.01<b(S-R)&&A(_()*S,!0),c(()=>{L=T()/_(),S||O(L)},g)),B.title="drag to resize, double-click to return to center",x&&(x.title=B.title),d(z,"click",t=>{a(t),M.classList.toggle(e)}),B},u=()=>{v=o("container"),w=o("preview"),x=o("split-divider"),v&&w?(f(),h()):location="https://darrensem.github.io/markdown/"};let v,w,x;void(/loading/.test(r.readyState)?d(r,"DOMContentLoaded",u):c(u,g))}();
// original version of my [Toggle Editor] idea was this Issue: https://github.com/tanabe/markdown-live-preview/issues/56



!"DEBUG_DISABLE" || ( void function() { // IIFE wrapper to ensure it works as stand-alone Bookmarklet; change to !!"DEBUG_DISABLE" for testing without this 'plugin' code (e.g. to confirm some functionality still works or a bug still occurs)

"use strict";


const CLASS_MIN_EDIT = "minedit";

const CSS_COMMON = (
  ""
  + "#edit, #preview {"
  + " flex-grow: 1; overflow: auto;" // Enable scrolling for content overflow
  + " transition: flex 0.02s ease;"
  + " } "
  + "." + CLASS_MIN_EDIT + " { flex: 0 0 0px !important; } "
);


const CLASS_EXTRA_BUTTON = "extra-button";

const CSS_EXTRA_BUTTON = "." + CLASS_EXTRA_BUTTON + " { margin-left: 16px; } "; // Ensure it doesn't overflow to hide


const MOUSE_PREFIX = "mouse";

const WIDTH_PROP = "width";

const CLICK_EVENT = "click";

const ID_SPLIT_DIVIDER = "split-divider";

const doc = document;

const qi = (id) => doc.getElementById(id);

const createDiv = (tagName, options) => Object.assign( doc.createElement( tagName || "div" ), options );

const on = (el, ...args) => el.addEventListener(...args); // smaller MINIFY if 3+ usage vs. normal, because normal = 25 char for a.addEventListener(b,c,d) vs. 37 for definition ,X=(a,...b)=>a.addEventListener(...b) + 10 per usage: X(a,b,c,d) // 47 57 _67_ versus 25 50 _75_

const off = (el, ...args) => el.removeEventListener(...args); // smaller MINIFY if 3+ usage vs. normal, because normal = 28 char for a.removeEventListener(b,c,d) vs. 40 for definition ,X=(a,...b)=>a.removeEventListener(...b) + 10 per usage: X(a,b,c,d) // 50 60 _70_ versus 28 56 _84_

const PREVENT_DEFAULT = evt => evt.preventDefault(); // smaller MINIFY if 2+ usage vs. normal, because normal = 18 char for a.preventDefault() vs. 24 for definition ,X=a=>a.preventDefault() + 3 per usage: X() // 27 _30_ versus 18 _36_

const SET_TIMEOUT = setTimeout; // smaller MINIFY if 2+ usage vs. normal, because normal = 10 char for setTimeout vs. 13 for definition ,X=setTimeout + 1 per usage: X // 14 _15_ versus 10 _20_

const MS_MINIMAL = 40;

const WINDOW_OBJECT = window;


const setupResizerCSS = (ID_RESIZER_CSS = "resizer-css") => {
  if ( qi(ID_RESIZER_CSS) ) return;

  const CSS_RESIZER_ONLY = [
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
  // ^ NOTE re. workaround using [string] instead of "string": ...using `CSS=["string"]` then `elStyle.innerHTML=CSS[0]`
  // instead of simply `CSS="string"` then `elStyle.innerHTML=CSS`
  // ...because during MINIFY, on occasion for some reason, with certain strings and certain code structure,
  // it will store that string value BUT will then seem to just 'set it and forget it' and NOT USE its variable name,
  // instead the resulting .min.js would have a duplicate occurrence of that string's value (AKA "full contents" appear TWICE)

  const resizerCSS = doc.head.insertAdjacentElement(
    "afterBegin",
    createDiv( "style", {
      id: ID_RESIZER_CSS,
      innerHTML: (
        ( splitDividerMLP ? "" : CSS_RESIZER_ONLY[0] )
        + CSS_COMMON
        + CSS_EXTRA_BUTTON
      )
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
      innerHTML: '<a href="#">Toggle Editor</a>',
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
        editPane.style.flex = "0 0 " + newEditWidth + "px";

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


const init = () => {

  container = qi("container");

  previewPane = qi("preview");

  splitDividerMLP = qi(ID_SPLIT_DIVIDER); // "split-divider" seems to be a recent addition to https://MarkdownLivePreview.com/

  if( !container || !previewPane ) {

    // location = "https://MarkdownLivePreview.com/";
    // location = "https://github.com/tanabe/markdown-live-preview/";
    location = "https://darrensem.github.io/markdown/";

  } else {

    setupResizerCSS();

    setupResizer();

  };

};


let container; // container = qi("container");

let previewPane; // previewPane = qi("preview");

let splitDividerMLP; // splitDividerMLP = qi(ID_SPLIT_DIVIDER); // "split-divider" seems to be a recent addition to https://MarkdownLivePreview.com/


void (

  /loading/.test(doc.readyState) ?

  on( doc, "DOMContentLoaded", init )

  : SET_TIMEOUT( init, MS_MINIMAL ) // Bookmarklet click will occur after DOMContentLoaded event has already fired 

);


}() ); // IIFE wrapper to ensure it works as stand-alone Bookmarklet; change to !!"DEBUG_DISABLE" for testing without this 'plugin' code (e.g. to confirm some functionality still works or a bug still occurs)
