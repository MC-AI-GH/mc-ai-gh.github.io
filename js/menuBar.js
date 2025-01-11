let settings = { 
	guiScale:4,
	editorTypeInd:0,
	outputTypeInd:0
}
document.getElementById("guiScale").addEventListener("click", (e) => {
	if(settings.guiScale==4){
		settings.guiScale=1
	}else{
		settings.guiScale++
	}
	e.target.innerHTML=`GUI Scale : ${settings.guiScale}`
	document.getElementById("itemDisplay").setAttribute('data-GUIScale', `${settings.guiScale}`);
});

document.getElementById("changeEditor").addEventListener("click", (e) => {
	if(settings.editorTypeInd==conversion.types.from.length-1){
		settings.editorTypeInd=0
	}else{
		settings.editorTypeInd++
	}
	let editorTypeSelected = conversion.types.from[settings.editorTypeInd]
	e.target.innerHTML=`Editor : ${editorTypeSelected.display}`
	conversion.selected.from=editorTypeSelected
});
document.getElementById("changeOutput").addEventListener("click", (e) => {
	if(settings.outputTypeInd==conversion.types.to.length-1){
		settings.outputTypeInd=0
	}else{
		settings.outputTypeInd++
	}
	let outputTypeSelected = conversion.types.to[settings.outputTypeInd]
	e.target.innerHTML=`Output : ${outputTypeSelected.display}`
	conversion.selected.to=outputTypeSelected
});







window.addEventListener("load", (e) => {
	document.getElementById("changeEditor").innerHTML=`Editor : ${conversion.selected.from.display}`
	document.getElementById("changeOutput").innerHTML=`Output : ${conversion.selected.to.display}`
});
