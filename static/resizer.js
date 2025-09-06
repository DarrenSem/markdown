// MarkDownLivePreview.com-resizer.js -- bookmarklet to add 'Toggle Editor' (and also width-resizer, and 'Print') - instead of waiting for repo update that might use something like this <script defer src="resizer.js"></script>
// 3235 char  javascript:void function(){"use strict";const a="extra-button",b="minedit",c="mouse",d="width",e="click",f="editor",g=document,h=a=>g.getElementById(a),i=(a,b)=>[...(b||g).querySelectorAll(a)],j=(a,b)=>Object.assign(g.createElement(a||"div"),b),k=(a,...b)=>a.addEventListener(...b),l=(a,...b)=>a.removeEventListener(...b),m=setTimeout,n=window,o=(a="resizer-css")=>{if(h(a))return;const b=["\nbody {\n  margin: 0;\n  height: 100vh;\n  overflow: hidden;\n}\n#container {\n  display: flex;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n#resizer {\n  width: 4px;\n  background-color: green;\n  cursor: col-resize;\n  flex-shrink: 0;\n}\n"],c=["\n#edit, #preview {\n  flex-grow: 1;\n  overflow: auto;\n  transition: flex 0.02s ease;\n}\n.extra-button {\n  margin-left: 16px;\n}\n.minedit {\n  flex: 0 0 0px !important;\n}\n"],d=g.head.insertAdjacentElement("afterBegin",j("style",{id:a,innerHTML:(x?"":b[0])+c[0]}));return d},p=(a,b)=>{const c=a.getBoundingClientRect();return b?c[b]:c},q=(f=99,i="resizer",m="toggle-button")=>{if(h(i))return;let o;const q=h("copy-button").insertAdjacentElement("afterEnd",j(0,{id:m,innerHTML:`<a href="#">Toggle Editor</a>`,className:a})),r=v.insertBefore(j(0,{id:i}),w),s=h("edit"),t=()=>p(s,d),u=()=>p(v,d),y=()=>s.classList.contains(b),z=(a,c)=>{if(a>=f||c){const d=u();d-a>=f&&(c||y()||(C=a/d),s.classList.remove(b),s.style.flex=`0 0 ${a}px`)}},A=a=>{o&&z(a.clientX-p(v,"left"))},B=()=>{o=!1,l(g,c+"move",A),l(g,c+"up",B)};let C=t()/u();return x||(k(x||r,"dblclick",a=>{a.preventDefault(),z(.5*u(),!0)}),k(r,c+"down",a=>{o=!0,a.preventDefault(),k(g,c+"move",A),k(g,c+"up",B)}),k(n,"resize",()=>{if(!y()){const a=u(),b=t(),c=a-b<f;z(c?b<f?b:a-f:a*C,c)}})),r.title="drag to resize, double-click to return to center",x&&(x.title=r.title),k(q,e,()=>{s.classList.toggle(b)}),r},r=a=>z?.getValue()??i(".sticky-widget-lines,.view-line",h(f)).map(a=>a.style.top.padStart(9,0)+a.innerText).sort().map(a=>a.slice(9)).join("\n"),s=a=>{const b=r().split("\n").map(a=>a.trim()),c=(b.find(a=>(a.match(/^#\s+(.+)/)||[])[1])??b.find(a=>(a.match(/^##\s+(.+)/)||[])[1])??b.filter(a=>a.length)[0]??"").replace(/^##?\s+/,"");return c?.length?c:a},t=(b="print-button",c="print-child")=>{if(h(b))return;const d=g.title,f=h("sync-button").insertAdjacentElement("beforeBegin",j(0,{id:b,innerHTML:`<a href="#">Print</a>`,className:a})),l=()=>{const a=prompt("Printing: what title?",s(g.title)),b=a?.trim();if(null==a)return;g.title=b.length?b:d,h(c)?.remove();const e=h("output"),f=g.head.cloneNode(!0);i("script",f).forEach(a=>a.remove()),f.appendChild(j("style",{textContent:"@media print { body { height: auto !important; } }"}));const k=j("iframe",{id:c});k.style.display="none",g.body.appendChild(k);const l=k.contentWindow,n=k.contentDocument||l.document;k.onload=()=>{m(()=>{l.focus(),l.print(),m(()=>{k?.remove()},9)},9)},n.open(),n.write("<html><head>"+f.innerHTML+"</head><body>"+e.outerHTML+"</body></html>"),n.close()};return k(f,e,l),f},u=()=>{v=h("container"),w=h("preview"),x=h("split-divider"),v&&w?(y=w._?.presetValue,z=w._?.editor??n.ace?.edit(f),o(),q(),t()):location="https://darrensem.github.io/markdown/"};let v,w,x,y,z;void(/loading/.test(g.readyState)?k(g,"DOMContentLoaded",u):m(u,9))}();
// original version of my [Toggle Editor] idea was this Issue: https://github.com/tanabe/markdown-live-preview/issues/56



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

  let isMouseDown;

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
  };

  let ratio = getWidthEditor() / getWidthContainer();

  if (!splitDividerMLP) {

    on( splitDividerMLP || resizer, "dblclick", (evt) => {
      evt.preventDefault(); // prevent text selection during resizing (otherwise bad UX and might event contribute to feeling laggy)
      updateResizer( 0.5 * getWidthContainer(), !!"keepRatio" );
    } );

    on( resizer, MOUSE_PREFIX + "down", (evt) => {
      isMouseDown = true;
      evt.preventDefault(); // prevent text selection during resizing (otherwise bad UX and might event contribute to feeling laggy)
      on( doc, MOUSE_PREFIX + "move", handleResize );
      on( doc, MOUSE_PREFIX + "up", stopResize );
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
        }, 9 );

      }, 9 );

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

  : SET_TIMEOUT( init, 9 ) // Bookmarklet click will occur after DOMContentLoaded event has already fired 

);
