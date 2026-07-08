export function exportMarkdown(filename, content) {

    const blob = new Blob(
        [content],
        { type: "text/markdown" }
    );

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = filename;

    a.click();

    window.URL.revokeObjectURL(url);
}