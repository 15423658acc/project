declare module 'html2pdf.js' {
    const html2pdf: {
      (): {
        set: (options: {
          margin?: number;
          filename?: string;
          image?: { type: string; quality: number };
          html2canvas?: { scale: number };
          jsPDF?: { unit: string; format: string; orientation: string };
        }) => any;
        from: (element: HTMLElement) => any;
        save: () => void;
      };
    };
    export default html2pdf;
  }