export function downloadInvoice(
  invoiceRef:
    | { current: HTMLDivElement | null }
    | React.RefObject<HTMLDivElement>
    | null,
) {
  const ref = invoiceRef as any;
  if (!ref || !ref.current) {
    console.warn(
      "Invoice ref is null — hidden InvoicePreview may not be mounted yet.",
    );
    return;
  }

  const el: HTMLDivElement = ref.current;

  // Collect all stylesheet rules from the current page so Tailwind classes work in the new window
  const styleSheets = Array.from(document.styleSheets)
    .map((sheet) => {
      try {
        return Array.from(sheet.cssRules)
          .map((rule) => rule.cssText)
          .join("\n");
      } catch {
        // cross-origin sheets — skip
        return "";
      }
    })
    .join("\n");

  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Invoice</title>
        <style>
          ${styleSheets}

          @media print {
            @page {
              size: A4 portrait;
              margin: 0;
            }
            body {
              margin: 0;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }

          body {
            margin: 0;
            background: #fff;
          }
        </style>
      </head>
      <body>
        ${el.outerHTML}
      </body>
    </html>
  `);

  printWindow.document.close();

  // Wait for images/fonts to load before printing
  printWindow.onload = () => {
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  // Fallback: if onload doesn't fire (common with document.write), trigger after a short delay
  setTimeout(() => {
    if (!printWindow.closed) {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  }, 800);
}
