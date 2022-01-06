// Copyright Gabriel Aplok 2020.

const name = document.getElementById("name");
const description = document.getElementById("description");
const min_engine_version = document.getElementById("min_engine_version");
const type = document.getElementById("type");
const generate = document.getElementById("generate");
const output = document.getElementById("output");
const copyToClipboard = document.getElementById("copyToClipboard");
const downloadFile = document.getElementById("downloadFile");

generate.addEventListener("click", () => {
	output.value = generateJSON(generateUUID(), generateUUID(), generateUUID());
});

copyToClipboard.addEventListener("click", () => {
	output.select();
	output.setSelectionRange(0, output.value.length);
	document.execCommand("copy");
});

downloadFile.addEventListener("click", () => {
	const a = document.createElement('a');
	const file = new Blob([output.value], {
		type: "text/plain"
	});
	a.href = URL.createObjectURL(file);
	a.download = "manifest.json";
	a.click();
	URL.revokeObjectURL(a.href);
});

generateUUID = function() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c == 'x' ? r: (r & 0x3 | 0x8)).toString(16);
	});

	return uuid;
};

generateJSON = function(uuid1, uuid2, uuid3) {
	let manifest = {};

	manifest.format_version = 2;
	manifest.header = {};
	manifest.header.name = name.value;
	manifest.header.description = description.value;
	manifest.header.uuid = uuid1;
	manifest.header.version = [1, 0, 0];
	manifest.header.min_engine_version = JSON.parse(min_engine_version.value);
	manifest.modules = [{}];
	manifest.modules[0].type = type.value;
	manifest.modules[0].uuid = uuid2;
	manifest.modules[0].version = [1, 0, 0];

	if (type.value === "data") manifest.dependencies = [{}];
	if (type.value === "data") manifest.dependencies[0].uuid = uuid3;
	if (type.value === "data") manifest.dependencies[0].version = [1, 0, 0];

	return JSON.stringify(manifest, null, "\t");
}