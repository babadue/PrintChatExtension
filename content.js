document.addEventListener("DOMContentLoaded", function () {
    let printButton = document.createElement("button");
    printButton.innerText = "Print Chat";
    printButton.style.position = "fixed";
    printButton.style.bottom = "20px";
    printButton.style.right = "20px";
    printButton.style.padding = "10px 15px";
    printButton.style.background = "#007bff";
    printButton.style.color = "#fff";
    printButton.style.border = "none";
    printButton.style.borderRadius = "5px";
    printButton.style.cursor = "pointer";
    document.body.appendChild(printButton);
  
    printButton.addEventListener("click", function () {
      let chatContainer = document.querySelector(".text-base" || "main");
      if (chatContainer) {
        let printWindow = window.open("", "", "width=800,height=600");
        printWindow.document.write("<html><head><title>Print Chat</title></head><body>");
        printWindow.document.write(chatContainer.innerHTML);
        printWindow.document.write("</body></html>");
        printWindow.document.close();
        printWindow.print();
      } else {
        alert("Chat container not found.");
      }
    });
  });