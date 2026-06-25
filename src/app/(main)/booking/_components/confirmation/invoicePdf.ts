export async function downloadInvoice(
    invoiceRef: { current: HTMLDivElement | null } | React.RefObject<HTMLDivElement> | null
) {
    const ref = invoiceRef as any;
    if (!ref || !ref.current) {
        console.warn('Invoice ref is null — hidden InvoicePreview may not be mounted yet.');
        return;
    }

    const el: HTMLDivElement = ref.current;

    const { toPng } = await import('html-to-image');
    const { jsPDF } = await import('jspdf');

    // Capture at the element's natural rendered width (794px container, p-6 padding inside)
    // pixelRatio:2 gives 2× resolution for crisp PDF output.
    // style overrides remove the mt-14 top margin so the PDF starts flush at the top.
    const dataUrl = await toPng(el, {
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        width: el.offsetWidth,
        style: {
            marginTop: '10px',
        },
    });

    const img = new Image();
    img.src = dataUrl;
    await new Promise<void>((res) => { img.onload = () => res(); });

    const a4Width = 595.28; // A4 width in pt
    const pdfHeight = (img.height * a4Width) / img.width;

    const pdf = new jsPDF({ orientation: 'p', unit: 'pt', format: [a4Width, pdfHeight] });
    pdf.addImage(dataUrl, 'PNG', 0, 0, a4Width, pdfHeight);
    pdf.save(`invoice-${Date.now()}.pdf`);
}
