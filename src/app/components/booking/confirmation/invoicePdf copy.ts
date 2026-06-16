export async function downloadInvoice(invoiceRef: { current: HTMLDivElement | null } | React.RefObject<HTMLDivElement> | null) {
    const ref = invoiceRef as any;
    if (!ref || !ref.current) return;

    const html2canvas = (await import('html2canvas')).default;
    const { jsPDF } = await import('jspdf');

    const canvas = await html2canvas(ref.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'pt', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`invoice-${Date.now()}.pdf`);
}