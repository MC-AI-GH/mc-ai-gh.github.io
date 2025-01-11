let settings = {
	guiScale:4,
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
