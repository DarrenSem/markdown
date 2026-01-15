document.addEventListener("DOMContentLoaded", () => {
    let hasEdited = false;
    let scrollBarSync = false;

    let editElement = document.querySelector('#edit');
    let previewElement = document.querySelector('#preview');
    let outputElement = document.querySelector('#output');

    let reLinkTitle = /( (MarkDown editor('s)?|MarkDown|editor)('s)?( markdown)?( contents)?|( contents))/i;
    let copyButtonLink = document.querySelector("#copy-button a");
    let defaultCopyTitle = copyButtonLink.title;
    let saveButtonLink = document.querySelector("#save-button a");
    let defaultSaveTitle = saveButtonLink.title;
    let loadButtonLink = document.querySelector("#load-button a");
    let lastClickedPreview = false;

    let originalTitle = document.title;
    let lastSavedTitle;

    const localStorageNamespace = 'com.markdownlivepreview';
    const localStorageKey = 'last_state';
    const localStorageScrollBarKey = 'scroll_bar_settings';
    const confirmationMessage = 'Are you sure you want to reset? Your changes will be lost.';


    // ----- common helper functions -----

    const trimmer = (v) => {
        return (
            (v ?? "")
            .replace(/[\u200d]/g, "") // (8205) Zero Width Joiner
            .replace(/\s+/g, " ") // (160) No-Break Space [\u00a0], (9) Tab [\u0009], (10) LF [\u000a], (13) CR [\u000d],  etc.
            .trim()
        );
    };

    let getPreviewPaneLabel = (prefix, suffix) => prefix + "preview pane's" + suffix;


    // default template
    const defaultInput = `# Markdown syntax guide

## Headers

# This is a Heading h1
## This is a Heading h2
###### This is a Heading h6

## Emphasis

*This text will be italic*  
_This will also be italic_

**This text will be bold**  
__This will also be bold__

_You **can** combine them_

## Lists

### Unordered

* Item 1
* Item 2
* Item 2a
* Item 2b

### Ordered

1. Item 1
2. Item 2
3. Item 3
    1. Item 3a
    2. Item 3b

## Images

![This is an alt text.](./image/sample.webp "This is a sample image.")

## Links

You may be using [Markdown Live Preview](https://markdownlivepreview.com/).

## Blockquotes

> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.
>
>> Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.

## Tables

| Left columns  | Right columns |
| ------------- |:-------------:|
| left foo      | right foo     |
| left bar      | right bar     |
| left baz      | right baz     |

## Blocks of code

${"`"}${"`"}${"`"}
let message = 'Hello world';
alert(message);
${"`"}${"`"}${"`"}

## Inline code

This web site is using ${"`"}markedjs/marked${"`"}.
`;


    let setupEditor = () => {
        let editor = ace.edit('editor');
        editor.getSession().setUseWrapMode(true);
        editor.setOptions({
            maxLines: Infinity,
            indentedSoftWrap: false,
            fontSize: 14,
            autoScrollEditorIntoView: true,
            theme: 'ace/theme/chrome',
        });

        var MarkdownMode = ace.require("ace/mode/markdown").Mode;
        editor.session.setMode(new MarkdownMode());

        editor.on('change', () => {
            let changed = editor.getValue() != defaultInput;
            if (changed) {
                hasEdited = true;
            }
            let value = editor.getValue();
            convert(value);
            saveLastContent(value);
        });

        return editor;
    };

    // Render markdown text as html
    let convert = (markdown) => {
        let options = {
            headerIds: false,
            mangle: false
        };
        let html = marked.parse(markdown, options);
        let sanitized = DOMPurify.sanitize(html);
        outputElement.innerHTML = sanitized;
    };

    // Reset input text
    let reset = () => {
        let changed = editor.getValue() != defaultInput;
        if (hasEdited || changed) {
            var confirmed = window.confirm(confirmationMessage);
            if (!confirmed) {
                return;
            }
        }
        presetValue(defaultInput);
        document.querySelectorAll('.column').forEach((element) => {
            element.scrollTo({top: 0});
        });
    };

    let presetValue = (value) => {
        editor.setValue(value);
        editor.moveCursorTo(0, 0);
        editor.focus();
        editor.navigateLineEnd();
        hasEdited = false;
    };
    // TODO: ^ since this is called from 2 different placecs, and it also currently will always say "makeClean"...
    // ...therefore refactoring must first THOROUGHLY examine logic, for all combos of localStorage or file or default


    // ----- sync scroll position -----

    let initScrollBarSync = (settings) => {
        let checkbox = document.querySelector('#sync-scroll-checkbox');
        checkbox.checked = settings;
        scrollBarSync = settings;

        checkbox.addEventListener('change', (event) => {
            let checked = event.currentTarget.checked;
            scrollBarSync = checked;
            saveScrollBarSettings(checked);
        });

        editElement.addEventListener('scroll', (event) => {
            if (!scrollBarSync) {
                return;
            }
            let editorElement = event.currentTarget;
            let ratio = editorElement.scrollTop / (editorElement.scrollHeight - editorElement.clientHeight);

            let targetY = (previewElement.scrollHeight - previewElement.clientHeight) * ratio;
            previewElement.scrollTo(0, targetY);
        });
    };

    let enableScrollBarSync = () => {
        scrollBarSync = true;
    };

    let disableScrollBarSync = () => {
        scrollBarSync = false;
    };


    // ----- clipboard utils -----

    let TEXT_HTML = "text/html";

    let TEXT_PLAIN = "text/plain";

    let copyToClipboard = (textOrHtml, successHandler, errorHandler) => {

        const promise = (
            lastClickedPreview
            ? navigator.clipboard.write( [ new ClipboardItem( { // cf. https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/write https://developer.mozilla.org/en-US/docs/Web/API/ClipboardItem
                [TEXT_HTML]: new Blob([textOrHtml], { type: TEXT_HTML }),
                [TEXT_PLAIN]: new Blob([textOrHtml], { type: TEXT_PLAIN }), // PlainText fallback if RichText not supported
            } ) ] )
            : navigator.clipboard.writeText(textOrHtml)
        );

        promise.then(
            () => {
                successHandler( textOrHtml );
            },

            (err) => {
                errorHandler( err, textOrHtml );
            }
        );
    };

    let notifyCopied = (text, err) => {
        let msDelay = err ? 60000 : 2000;
        let action = (
           err
            ? (
                lastClickedPreview
                ? "HTML not copied!"
                : "Not copied!"
            )
            : (
                lastClickedPreview
                ? "HTML copied!"
                : "Copied!"
            )
        );
        copyButtonLink.innerHTML = (
            action + " (" + text?.length + ")"
            + ( err ? " " + err.stack : "" )
        );

        clearTimeout(notifyCopied.T);
        notifyCopied.T = setTimeout( () => {
            copyButtonLink.innerHTML = "Copy";
        }, msDelay );
    };


    // ----- file utils -----

    let exportSaveFile = (text, savedTitle = "") => {

        if (!"DEBUG_TEST_ASCII_32_THROUGH_127") {
            savedTitle = ""
            + ` !"#$%&'()*+,-./`
            + "0123456789:;<=>?"
            + "@ABCDEFGHIJKLMNO"
            + "PQRSTUVWXYZ[" + "\\" + "]^_"
            + "`abcdefghijklmno"
            + "pqrstuvwxyz{|}~";
        } else { ; };
        // console.log(saveTitle, saveTitle.length);

        const filename = trimmer(
            savedTitle
            .replace(/[^\x20-\x7E]+/g, "-") // For simplicity replace everything except ASCII printable characters between ' ' and '~' (32..126)
            .replace( /[\\\/:*?"<>|%&^`-]+/g, "-" )  // A file name can't contain any of \ / : * ? " < > | but also shell commands might not like % & ^ `
        );

        const extension = (
            /\./.test(filename)
            ? ""
            : ( lastClickedPreview ? ".html" : ".md" )
        );

        const savedFilename = ( filename.length ? filename : "markdown" ) + extension;
        // console.log(savedFilename, filename, filename.length, extension);

        const failOrFilename = [ , savedFilename ];

        document.title = savedFilename;

        let href;
        try {
            // let content;
            // let contentType;
            // let blob = new Blob( [content], { type: contentType } );
            // let type = blob.type || contentType || ( TEXT_PLAIN + ";charset=utf-8" );
            // href = URL.createObjectURL( new Blob( [blob], { type } ) );
            href = URL.createObjectURL( new Blob( [text], { type: TEXT_PLAIN + ";charset=utf-8" } ) );

            let link = document.createElement("a");
            link.href = href;
            link.download = savedFilename;
            link.click();
        } catch (err) {
            console.error(savedFilename, err);
            failOrFilename[0] = err;
        };
        URL.revokeObjectURL(href);

        if ( failOrFilename[0] ) {
            document.title = lastSavedTitle;
        } else {
            lastSavedTitle = savedFilename;
        };

        return failOrFilename;
    };

    let importLoadFile = (filename) => {

        text = 'TODO: importLoadFile "' + filename + '"...';

        const failOrText = [ , text ];

        return failOrText
    };

    let notifySaved = (filename, err, text) => {
        let msDelay = err ? 60000 : 5000;
        let action = (
            err
            ? (
                lastClickedPreview
                ? "HTML NOT SAVED!"
                : "NOT SAVED!"
            )
            : "SAVED"
        );
        saveButtonLink.innerHTML = (
            action + " (" + text?.length + ")"
            + ( err ? " " + err.stack : ' "' + filename + '"' )
        );

        clearTimeout(notifySaved.T);
        notifySaved.T = setTimeout( () => {
            saveButtonLink.innerHTML = "Save";
        }, msDelay );
    };

    let notifyLoaded = (filename, err, text) => {
        let msDelay = err ? 60000 : 5000;
        let action = (
            err
            ? "NOT LOADED!"
            : "LOADED"
        );
        loadButtonLink.innerHTML = (
            action + " (" + text?.length + ")"
            + ( err ? " " + err.stack : ' "' + filename + '"' )
        );

        clearTimeout(notifyLoaded.T);
        notifyLoaded.T = setTimeout( () => {
            loadButtonLink.innerHTML = "Load";
        }, msDelay );
    };


    // ----- setup -----

    // setup navigation actions
    let setupResetButton = () => {
        document.querySelector("#reset-button").addEventListener('click', (event) => {
            event.preventDefault();
            reset();
        });
    };

    let setupCopyButton = (editor) => {
        document.querySelector("#copy-button").addEventListener('click', (event) => {
            event.preventDefault();

            // setTimeout( () => {

            copyToClipboard(
                lastClickedPreview ? outputElement.innerHTML : editor.getValue(),
                ( text ) => {
                    // console.log(text);
                    // debugger;
                    notifyCopied(text);
                },
                ( err, text ) => {
                    console.error(err);
                    notifyCopied(text, err);
                }
            );

        // }, 3000 );

        });
    };

    let setupSaveButton = (editor) => {
        document.querySelector("#save-button").addEventListener('click', (event) => {
            event.preventDefault();

            const promptWhat = (
                lastClickedPreview
                ? getPreviewPaneLabel("Saving ", " HTML:")
                : "Saving:"
            ) + " what document.title?";

            // Offer choice of a different document.title (Cancel will abort immediately, before anything is generated)
            const promptTitle = (
                (!"DEBUG_SKIP_PROMPT_FOR_ACCURATE_COMPARISON") && getTitle( lastSavedTitle || document.title ) ||
                prompt( promptWhat + "\n\n(Empty blank = restore original '" + originalTitle + "')", getTitle( lastSavedTitle || document.title ) )
            );

            const trimmedTitle = trimmer(promptTitle);

            const restoreTitle = !trimmedTitle.length;

            const newSavedTitle = restoreTitle ? originalTitle : trimmedTitle;

            if (promptTitle == null) return null;

            const text = lastClickedPreview ? outputElement.innerHTML : editor.getValue();

            const [ err, filename ] = exportSaveFile(text, newSavedTitle);

            notifySaved(filename, err, text);

        });
    };

    let setupLoadButton = (editor) => {
        document.querySelector("#load-button").addEventListener('click', (event) => {
            event.preventDefault();




            const readerFinally = () => {

                // const [ err, text ] = importLoadFile(filename); // TODO: HMMM... how to sync the STYLE of this but keep it SIMPLE too??

                // notifyLoaded(filename, err, text);

                // if (!err && text?.length) {
                // presetValue(text);
                presetValue(reader.result);
    // TODO: ^ since this is called from 2 different placecs, and it also currently will always say "makeClean"...
    // ...therefore refactoring must first THOROUGHLY examine logic, for all combos of localStorage or file or default
                // };

                // lastSavedTitle = filename; // TODO:
                // document.title = lastSavedTitle; // TODO:

            };

            const handleFileInputChange = (event) => {
                // console.log("handleFileInputChange event", event);
                // debugger;


                let reader = new FileReader();
                // TODO: ^ might only need reader variable if reader.result (instead could use evt.target.xyz right?) WHAT ABOUT ERRORS?
                reader.onerror = (evt) => {
                    const { loaded, total, lengthComputable } = evt;
                    console.log("reader.onerror evt", evt, { loaded, total, lengthComputable, } );
                    debugger;
                    // maybe a 0-byte file? NOPE, and empty file is perfectly valid (and helpful, on my cell!)
                    // readerFinally(err, text);
                };

                reader.onload = (evt) => {
                    const { loaded, total, lengthComputable } = evt;
                    console.log("reader.onload evt", evt, { loaded, total, lengthComputable, } );
                    // debugger;

                    presetValue(reader.result); // TODO: temp, until readerFInally is clear...
                    // readerFinally(err, text);

                };

                // debugger; // let file = (fileInput.files).find(file => file.size);
                let file = Array.from(fileInput.files).find (file => file.size); if (file) {
                let filename = file.name;
                let size = file.size;
                let type = file.type;
                console.log("handleFileInputChange:", { filename, size, type } ); }; // if (file) {
                // debugger;

                reader.readAsText(file);

            };


            const fileInput = document.createElement("input");

            fileInput.id = "load-file-selector";
            fileInput.type = "file";
            fileInput.multiple = true;

            // fileInput.accept = ".md,.txt,.log,.ini,.properties,json,.htm*";
            fileInput.accept = ".md";


            //// document.querySelectorAll('input[type="file"]').forEach( el => el.remove() );
            //// fileInput.style.display = "none";
            //// ^ "display: none" BEFORE document.body.appendChild() to ensure never visible
            //// document.body.appendChild(fileInput);
            fileInput.onchange = handleFileInputChange;


            fileInput.click();
            // document.querySelector('input[type="file"]').click(); // TODO: manually test this first
            // document.querySelector("load-file-selector").click(); // TODO: manually test this first

        });
    };


    // ----- local state -----

    let loadLastContent = () => {
        let lastContent = Storehouse.getItem(localStorageNamespace, localStorageKey);
        return lastContent;
    };

    let saveLastContent = (content) => {
        let expiredAt = new Date(2099, 1, 1);
        Storehouse.setItem(localStorageNamespace, localStorageKey, content, expiredAt);
    };

    let loadScrollBarSettings = () => {
        let lastContent = Storehouse.getItem(localStorageNamespace, localStorageScrollBarKey);
        return lastContent;
    };

    let saveScrollBarSettings = (settings) => {
        let expiredAt = new Date(2099, 1, 1);
        Storehouse.setItem(localStorageNamespace, localStorageScrollBarKey, settings, expiredAt);
    };

    let getLinkTitle = (defaultTitle, isPreview, isSaveButton) => {
        if (isPreview) {
            return (
                defaultTitle
                .replace( reLinkTitle, getPreviewPaneLabel(" ", " :") )
                .replace( /:(.*?)( file|)$/, (
                    isSaveButton
                    ? "contents to .HTML$2"
                    : "html$1"
                ) )
            );
        } else {
            return defaultTitle;
        };
    };

    let updatelastClicked = (isPreview) => {
        lastClickedPreview = isPreview;
        copyButtonLink.title = getLinkTitle(defaultCopyTitle, isPreview);
        saveButtonLink.title = getLinkTitle(defaultSaveTitle, isPreview, !!"isSaveButton");
    };

    editElement.addEventListener('click', (event) => updatelastClicked(false));

    previewElement.addEventListener('click', (event) => updatelastClicked(true));

    let getEditorText = () => editor?.getValue() ?? "";

    let getTitle = (defaultTitle) => {

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


    // ----- entry point -----

    let lastContent = loadLastContent();

    let editor = setupEditor();

    if (lastContent) {
        presetValue(lastContent);
    } else {
        presetValue(defaultInput);
    }

    setupResetButton();
    setupCopyButton(editor);

    setupSaveButton(editor);

    setupLoadButton(editor);

    initScrollBarSync( loadScrollBarSettings() || false );


    // ----- extra (CopyRich Save and Load) -----




    document.querySelector("#preview")._ = {
        editor,
        Storehouse,
        localStorageNamespace,
    };

});
