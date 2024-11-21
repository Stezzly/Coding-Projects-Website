
// Function to copy code from editor to clipboard
function copyCode(editorId) {
    const editor = document.querySelector(`#${editorId}`).nextSibling.CodeMirror;
    if (editor) {
        const code = editor.getValue();
        navigator.clipboard.writeText(code).then(() => {
            showToast("Code copied to clipboard!");
        }).catch(err => {
            showToast("Failed to copy code!");
            console.error('Copy failed', err);
        });
    }
}

// Function to toggle result display in an iframe
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
        const content = editor.getValue();
        iframe.contentWindow.document.open();
        if (editorId.includes('html')) {
            iframe.contentWindow.document.write(content);
        } else if (editorId.includes('css')) {
            iframe.contentWindow.document.write(`<style>${content}</style><div style="width:100%;height:100%;">CSS applied to this content</div>`);
        }
        iframe.contentWindow.document.close();
        resultContainer.style.display = 'block';
        toggleBtn.textContent = 'Hide Result';
    } else {
        resultContainer.style.display = 'none';
        toggleBtn.textContent = 'Show Result';
    }
}

// Function to show toast notifications
function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message; // Setting the message
        toast.style.opacity = '1';
        setTimeout(() => {
            toast.style.opacity = '0';
        }, 2000);
    }
}



// Function to initialize or refresh CodeMirror instances within a given container
function initializeCodeMirrorWithin(container) {
    if (container.style.display !== 'none') {
        container.querySelectorAll('textarea').forEach(textarea => {
            if (!textarea.codeMirrorInstance) {  // Initialize only if not already done
                const editor = CodeMirror.fromTextArea(textarea, {
                    lineNumbers: true,
                    mode: textarea.id.includes('html') ? "htmlmixed" : (textarea.id.includes('css') ? "css" : "javascript"),
                    theme: "default",
                    indentUnit: 4,
                    tabSize: 4,
                    lineWrapping: true
                });
                textarea.codeMirrorInstance = editor;
                // Load content if applicable
                const file = textarea.getAttribute('data-file');
                if (file) {
                    fetch(file)
                        .then(response => response.text())
                        .then(content => {
                            const cleanedContent = content.replace(/<!-- Code injected by live-server -->[\s\S]*?<\/script>/, '');
                            editor.setValue(cleanedContent);
                        })
                        .catch(error => {
                            console.error('Error loading file:', error);
                            editor.setValue("// Error loading file. Check console for details.");
                        });
                }
            } else {
                textarea.codeMirrorInstance.refresh(); // Refresh if already initialized
            }
        });
    }
}
w