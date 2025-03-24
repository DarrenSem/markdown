// MarkDownLivePreview.com-resizer.js -- bookmarklet to add [Toggle Editor] (and also horizontal resizer) - instead of waiting for repo update using <script defer src="resizer.js"></script>
// 1710 char javascript:void function(){if(!document.getElementById("resizer")){let a=location,b="markdownlivepreview.com";if(a.hostname!=b)a.href="https://"+b;else{let a=document,b=b=>a.getElementById(b),c=b("container"),d=b("edit"),e=b("preview"),f=!1,g=b("copy-button");a.head.insertAdjacentElement("afterBegin",Object.assign(a.createElement("style"),{id:"resizer.css",innerHTML:"\n  body {\n    margin: 0;\n    height: 100vh;\n    overflow: hidden;\n  }\n  #container {\n    display: flex;\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n  }\n  #edit, #preview {\n    flex-grow: 1;\n    overflow: auto;\n    transition: flex 0.3s ease;\n  }\n  #resizer {\n    width: 4px;\n    background-color: green;\n    cursor: col-resize;\n    flex-shrink: 0;\n  }\n  #toggle-button {\n    margin-left: 16px;\n  }\n  .shrunk {\n    flex: 0 0 0px !important;\n  }\n  "})),e.parentNode.insertBefore(Object.assign(a.createElement("div"),{id:"resizer",title:"drag to resize, double-click to return to center"}),e),g.insertAdjacentElement("afterEnd",Object.assign(a.createElement("div"),{id:"toggle-button",innerHTML:`<a href="#">Toggle Editor</a>`}));let h=b("resizer"),i=b("toggle-button"),j=()=>c.getBoundingClientRect(),k=a=>{if(f){let b=a.clientX-j().left;b>=72&&(d.classList.remove("shrunk"),d.style.flex=`0 0 ${b}px`,e.style.flex=`1 1 auto`)}},l=()=>{f=!1,a.removeEventListener("mousemove",k),a.removeEventListener("mouseup",l)};h.addEventListener("dblclick",()=>{d.classList.remove("shrunk");let a=j().width/2;d.style.flex=`0 0 ${a}px`}),h.addEventListener("mousedown",()=>{f=!0,a.addEventListener("mousemove",k),a.addEventListener("mouseup",l)}),i.addEventListener("click",()=>{d.classList.toggle("shrunk")})}}}();
// original version of my idea was this Issue: https://github.com/tanabe/markdown-live-preview/issues/56

if( !document.getElementById("resizer") ) { document.addEventListener("DOMContentLoaded", () => {

  let loc = location;
  let MLP = "markdownlivepreview.com";
  if( loc.hostname && loc.hostname != MLP && false ) { loc.href = "https://" + MLP; } else {

    let doc = document;
    let q = (id) => doc.getElementById(id);

    let resizerCSS = `
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
  .shrunk {
    flex: 0 0 0px !important;
  }
  `;

    let container = q("container");
    let edit = q("edit");
    let preview = q("preview");

    let MIN_EDIT_WIDTH = 72; // Minimum width for the editor div

    let isMouseDown = false;

    let copy = q("copy-button");

    doc.head.insertAdjacentElement(
      "afterBegin",
      Object.assign(
        doc.createElement("style"), {
          id: "resizer.css",
          innerHTML: resizerCSS
        }
      )
    );

    preview.parentNode.insertBefore(
      Object.assign(
        doc.createElement("div"), {
          id: "resizer",
          title: "drag to resize, double-click to return to center"
        }
      ),
      preview
    );

    copy.insertAdjacentElement(
      "afterEnd",
      Object.assign(
        doc.createElement("div"), {
          id: "toggle-button",
          innerHTML: `<a href="#">Toggle Editor</a>`
        }
      )
    );

    let resizer = q("resizer");
    let toggle = q("toggle-button");

    let containerRect = () => container.getBoundingClientRect();

    let resize = (event) => {
      if (!isMouseDown) return;
      let newEditWidth = event.clientX - containerRect().left;

      if (newEditWidth >= MIN_EDIT_WIDTH) {
        edit.classList.remove("shrunk");
        edit.style.flex = `0 0 ${newEditWidth}px`;
        preview.style.flex = `1 1 auto`;
      };
    };

    let stopResize = () => {
      isMouseDown = false;
      doc.removeEventListener("mousemove", resize);
      doc.removeEventListener("mouseup", stopResize);
    };

    resizer.addEventListener( "dblclick", () => {
      edit.classList.remove("shrunk");
      let editWidth = containerRect().width / 2;
      edit.style.flex = `0 0 ${editWidth}px`; // no need for this apparently: preview.style.flex = `1 1 auto`;
    } );

    resizer.addEventListener( "mousedown", () => {
      isMouseDown = true;
      doc.addEventListener("mousemove", resize);
      doc.addEventListener("mouseup", stopResize);
    } );

    toggle.addEventListener( "click", () => {
      edit.classList.toggle("shrunk");
    } );

  };

} );

};
