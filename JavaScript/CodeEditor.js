document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('textarea').forEach(textarea => {
        const editor = CodeMirror.fromTextArea(textarea, {
            lineNumbers: true,
            mode: textarea.id.includes('html') ? "htmlmixed" : "css",
            theme: "default",
            indentUnit: 4,
            tabSize: 4,
            lineWrapping: true
        });

        const file = textarea.getAttribute('data-file');
        if (file) {
            fetch(file)
                .then(response => response.text())
                .then(content => {
                    // Remove live-server script before setting value
                    const cleanedContent = content.replace(/<!-- Code injected by live-server -->[\s\S]*?<\/script>/, '');
                    editor.setValue(cleanedContent);
                })
                .catch(error => {
                    console.error('Error loading file:', error);
                    editor.setValue("// Error loading file. Check console for details.");
                });
        }
    });
});




function copyCode(editorId) {
    const editor = document.querySelector(`#${editorId}`).nextSibling.CodeMirror;
    const code = editor.getValue();
    navigator.clipboard.writeText(code).then(() => {
        showToast();
    });
}

function toggleResult(editorId) {
    const editor = document.querySelector(`#${editorId}`).nextSibling.CodeMirror;
    const resultContainer = document.getElementById(`${editorId.replace('Editor', 'ResultContainer')}`);
    const toggleBtn = document.querySelector(`#${editorId}`).parentNode.querySelector('.toggle-btn');
    let iframe = document.getElementById(`${editorId.replace('Editor', 'Iframe')}`);

    // Ensure iframe exists, if not, create it
    if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = `${editorId.replace('Editor', 'Iframe')}`;
        iframe.style.width = "100%";
        iframe.style.height = "300px";
        resultContainer.appendChild(iframe);
    }

    if (resultContainer.style.display === 'none') {
        let content = editor.getValue();
        if (editorId === 'htmlCodeEditor') {
            iframe.contentWindow.document.open();
            iframe.contentWindow.document.write(content);
            iframe.contentWindow.document.close();
        } else if (editorId === 'cssCodeEditor') {
            iframe.contentWindow.document.open();
            iframe.contentWindow.document.write(`<style>${content}</style><div style="width:100%;height:100%;">CSS is applied to this content</div>`);
            iframe.contentWindow.document.close();
        }
        resultContainer.style.display = 'block';
        toggleBtn.textContent = 'Hide Result';
    } else {
        resultContainer.style.display = 'none';
        toggleBtn.textContent = 'Show Result';
    }
}


function showToast() {
    const toast = document.getElementById('toast');
    toast.style.opacity = '1';
    setTimeout(() => {
        toast.style.opacity = '0';
    }, 2000);
}