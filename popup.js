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

// function printChat() {
//     let chatContainer = document.querySelector(".text-base, main");
//     if (chatContainer) {
//         // Clone the chat container to modify without affecting the page
//         let clonedChat = chatContainer.cloneNode(true);

//         // Remove all images and SVG icons
//         clonedChat.querySelectorAll("img, svg").forEach(el => el.remove());

//         // Remove containers that ONLY held icons (without text)
//         clonedChat.querySelectorAll("div, span, p").forEach(el => {
//             if (!el.textContent.trim() && el.children.length === 0) {
//                 el.remove();
//             }
//         });

//         // Ensure we don't remove entire meaningful sections
//         clonedChat.querySelectorAll("*").forEach(el => {
//             if (el.children.length === 0 && !el.textContent.trim()) {
//                 el.remove(); // Remove only if it's completely empty
//             }
//         });

//         let printWindow = window.open("", "", "width=800,height=600");
//         printWindow.document.write("<html><head><title>Print Chat</title><style>");
//         printWindow.document.write("body { font-family: Arial, sans-serif; }");
//         printWindow.document.write("</style></head><body>");
//         printWindow.document.write(clonedChat.innerHTML);
//         printWindow.document.write("</body></html>");
//         printWindow.document.close();
//         printWindow.print();
//     } else {
//         alert("Chat container not found.");
//     }
// }

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






