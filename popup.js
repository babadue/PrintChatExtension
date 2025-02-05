document.addEventListener("DOMContentLoaded", function () {
    let printButton = document.getElementById("printChat");
    if (printButton) {
        printButton.addEventListener("click", () => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: printChat
                });
            });
        });
    } else {
        console.error("Print button not found in popup.");
    }
});

function printChat() {
    let pageContent = document.body.cloneNode(true); // Clone entire page content

    // Remove all images and SVG icons
    pageContent.querySelectorAll("img, svg").forEach(el => el.remove());

    // Remove empty divs, spans, and paragraphs
    pageContent.querySelectorAll("div, span, p").forEach(el => {
        if (!el.textContent.trim() && el.children.length === 0) {
            el.remove();
        }
    });

    // Open a new print window
    let printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write("<html><head><title>Print Page</title><style>");
    printWindow.document.write("body { font-family: Arial, sans-serif; }");
    printWindow.document.write("</style></head><body>");
    printWindow.document.write(pageContent.innerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
}






