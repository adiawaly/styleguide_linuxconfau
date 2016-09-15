
function setupEditor(editor, textarea) {
    const session = editor.getSession();
    //editor.setTheme('ace/theme/tomorrow');
    editor.$blockScrolling = Infinity;
    editor.setOption('scrollPastEnd', false);
    session.setMode('ace/mode/markdown');
    session.setValue(textarea.val());
    session.setUseWrapMode(true);
    session.on('change', () => {
        textarea.val(session.getValue());
    });
    editor.renderer.setShowGutter(true);
    session.setTabSize(4);
    session.setUseSoftTabs(true);
}

function setEditorSize(reportDiv, textArea)
{
  var w = textArea.width();
  var h = textArea.height();
  var border = textArea.css("border");

  reportDiv.width(w);
  reportDiv.height(h);

  reportDiv.css("position", "relative");
  reportDiv.css("border", border);
  textArea.css("display", "none");
}

function loadEditor(id) {
    var i = id;
    var el = `#${i}`;
    const editorId = `markdown-editor-${i}`;
    const reportDiv = $('<div>').attr('id', editorId);
    const $formGroup = $(el).closest('.form-group');
    const $textarea = $(el);

    $textarea.after(reportDiv);
    editor = ace.edit(editorId);

    setupEditor(editor, $textarea);

    $textarea.resize(() => {
        setEditorSize(reportDiv, $textarea);
        editor.resize();
    });

    $textarea.resize();

    return editor;
}
