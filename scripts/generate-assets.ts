import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

const CONTENT_PATH = path.join(process.cwd(), "research/00-genesis/PDF_READY_CONTENT.md");
const OUTPUT_PATH = path.join(process.cwd(), "public/assets/marriage-guide.pdf");

async function generatePDF() {
    console.log("🚀 Starting First Dollar Asset Generation...");

    if (!fs.existsSync(CONTENT_PATH)) {
        console.error(`❌ Content file not found at: ${CONTENT_PATH}`);
        process.exit(1);
    }

    const content = fs.readFileSync(CONTENT_PATH, "utf-8");
    const doc = new PDFDocument({ margin: 50 });

    doc.pipe(fs.createWriteStream(OUTPUT_PATH));

    // Basic styling
    const lines = content.split("\n");

    for (const line of lines) {
        if (line.startsWith("# ")) {
            doc.addPage();
            doc.fontSize(24).font("Helvetica-Bold").text(line.replace("# ", ""), { align: "center" });
            doc.moveDown();
        } else if (line.startsWith("## ")) {
            doc.fontSize(18).font("Helvetica-Bold").text(line.replace("## ", ""));
            doc.moveDown(0.5);
        } else if (line.startsWith("### ")) {
            doc.fontSize(14).font("Helvetica-Bold").text(line.replace("### ", ""));
            doc.moveDown(0.5);
        } else if (line.startsWith("---")) {
            doc.moveDown();
            doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
            doc.moveDown();
        } else if (line.trim() === "") {
            doc.moveDown(0.5);
        } else {
            doc.fontSize(12).font("Helvetica").text(line);
        }
    }

    doc.end();
    console.log(`✅ PDF Generated Successfully at: ${OUTPUT_PATH}`);
}

generatePDF();
