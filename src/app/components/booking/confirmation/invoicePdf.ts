export async function downloadInvoice(
    invoiceRef: { current: HTMLDivElement | null } | React.RefObject<HTMLDivElement> | null
) {
    // ── DOWNLOAD: capture the hidden off-screen InvoicePreview via its ref ──
    const ref = invoiceRef as any;
    if (!ref || !ref.current) {
        console.warn('Invoice ref is null — hidden InvoicePreview may not be mounted yet.');
        return;
    }

    // ── DOWNLOAD: lazy-load heavy libs only when user actually clicks download ──
    const html2canvas = (await import('html2canvas')).default;
    const { jsPDF } = await import('jspdf');

    // ── DOWNLOAD: rasterise the DOM node at 2× for crisp PDF output ──
    const canvas = await html2canvas(ref.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
    });

    // ── DOWNLOAD: convert canvas → base64 PNG → embed in A4 PDF ──
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'pt', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    // ── DOWNLOAD: trigger browser save dialog ──
    pdf.save(`invoice-${Date.now()}.pdf`);
}