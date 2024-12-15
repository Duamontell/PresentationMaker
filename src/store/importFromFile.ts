import { dispatch } from './editor';
import { loadEditor } from './loadEditor';
import Ajv from 'ajv';
import addFormats from "ajv-formats"

export const importFromFile = (event: React.ChangeEvent<HTMLInputElement>) => {
	const file = event.target.files?.[0];
	const ajv = new Ajv();
	addFormats(ajv);

	if (file) {
		const reader = new FileReader();

		reader.onload = () => {
			const fileContent = reader.result as string;
			const importedEditorData = JSON.parse(fileContent);
			console.log(importedEditorData);

			const schema = {
				type: "object",
				properties: {
					presentation: {
						type: "object",
						properties: {
							id: { type: "string" },
							title: { type: "string" },
							author: { type: "string" },
							createdDate: {
								type: "string",
								format: "date-time"
							},
							updateDate: {
								type: "string",
								format: "date-time"
							},
							slides: { type: "array", items: {} }
						},
						required: ["id", "title", "author", "createdDate", "updateDate", "slides"],
						additionalProperties: false
					},
					selection: {
						type: "object",
						properties: {
							selectedSlideId: { type: "string" },
							selectedElementId: { type: "string" }
						},
						additionalProperties: false
					},
				},
				required: ["presentation"],
				additionalProperties: false
			}

			const validate = ajv.compile(schema);
			const valid = validate(importedEditorData);
			if (valid) {
				dispatch(loadEditor, importedEditorData);
			} else {
				console.log("Ошибка импорта")
			}

			// dispatch(loadEditor, importedEditorData);

		};

		reader.readAsText(file);
	}
};
