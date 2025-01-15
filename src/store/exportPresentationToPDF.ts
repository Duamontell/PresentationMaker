import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Slide } from "./types";

export const exportPresentationToPDF = async (slides: Slide[], fileName: string = "presentation.pdf") => {
	const pdf = new jsPDF({
		orientation: "landscape",
		unit: "px",
		format: [1920, 1080],
	});

	for (let i = 0; i < slides.length; i++) {
		const slideCanvasContainer = document.createElement("div");
		slideCanvasContainer.id = "pdf-div"
		slideCanvasContainer.style.width = "1065px";
		slideCanvasContainer.style.height = "599px";
		slideCanvasContainer.style.backgroundColor = slides[i].backgroundColor;
		slideCanvasContainer.style.backgroundImage = slides[i].backgroundImage;
		slideCanvasContainer.style.position = "relative";
		slideCanvasContainer.style.display = "none";

		slides[i].content.forEach((element) => {
			const el = document.createElement("div");
			console.log(element.position.x);

			if (element.type === "text") {
				el.style.position = "absolute";
				el.style.top = `${element.position.y}px`;
				el.style.left = `${element.position.x}px`;
				el.style.width = `${element.size.width}px`;
				el.style.height = `${element.size.height}px`;
				el.style.fontFamily = `${element.fontFamily}`;
				el.style.fontSize = `${element.fontSize}px`;
				el.style.color = `${element.fontColor}`;;
				el.textContent = element.content;
				el.style.overflowWrap = "break-word"
			} else if (element.type === "image") {
				const img = document.createElement("img");
				img.src = element.src;
				img.style.position = "absolute";
				img.style.top = `${element.position.y}px`;
				img.style.left = `${element.position.x}px`;
				img.style.width = `${element.size.width}px`;
				img.style.height = `${element.size.height}px`;
				el.appendChild(img);
			}

			slideCanvasContainer.appendChild(el);
		});

		document.body.appendChild(slideCanvasContainer);

		const canvas = await html2canvas(slideCanvasContainer, {
			onclone: function (clonedDoc) {
				const pdfDiv = clonedDoc.getElementById('pdf-div')
				if (pdfDiv) {
					pdfDiv.style.display = "block"
				}
			}
		});
		const imgData = canvas.toDataURL("image/png");
		const imgProps = pdf.getImageProperties(imgData);
		const pdfWidth = pdf.internal.pageSize.getWidth();
		const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

		document.body.removeChild(slideCanvasContainer);

		if (i > 0) pdf.addPage();
		pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight,);
	}

	pdf.save(fileName);
};
