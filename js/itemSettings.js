let validAmpersandCodes = { 
	"0":{class:"color0",overwrites:true},
	"1":{class:"color1",overwrites:true},
	"2":{class:"color2",overwrites:true},
	"3":{class:"color3",overwrites:true},
	"4":{class:"color4",overwrites:true},
	"5":{class:"color5",overwrites:true},
	"6":{class:"color6",overwrites:true},
	"7":{class:"color7",overwrites:true},
	"8":{class:"color8",overwrites:true},
	"9":{class:"color9",overwrites:true},
	"a":{class:"colorA",overwrites:true},
	"b":{class:"colorB",overwrites:true},
	"c":{class:"colorC",overwrites:true},
	"d":{class:"colorD",overwrites:true},
	"e":{class:"colorE",overwrites:true},
	"f":{class:"colorF",overwrites:true},
	"r":{class:"mcDefault",overwrites:true},
	"k":{class:"mcObfuscated",overwrites:false},
	"l":{class:"mcBold",overwrites:false},
	"m":{class:"mcStrike",overwrites:false},
	"n":{class:"mcUnderline",overwrites:false},
	"o":{class:"mcItalic",overwrites:false},
}
let selectedItem = ""
let defaultString = "Test Item\nThis item is a default\nexample of how to use\nthis program.\n\nIf you want color, use \nthe and symbol, &clike this!\nTo make a new line\njust hit enter"
let inputValue = defaultString
document.getElementById("simpleInput").addEventListener('input', function(e) {
	inputValue = e.target.value
	updateItemPreview(inputValue)
	updateItemOutput(inputValue)

})
function stringToColorParsed(string){
	let sections = string.split("&")
	if(sections.length<=1){
		return sanit(string)
	}
	let rebuilt = sanit(sections[0])
	let activeLayers = 0;
	for (let i = 1;i < sections.length;i++){
		if(validAmpersandCodes[sections[i][0]]!=undefined){
			let value = validAmpersandCodes[sections[i][0]]
			if(value.overwrites==true){
				rebuilt+=("</span>").repeat(activeLayers)+`<span class="${value.class}">${sanit(sections[i].substring(1,sections[i].length))}`
				activeLayers=1
			}else{
				rebuilt+=`<span class="${value.class}">${sanit(sections[i].substring(1,sections[i].length))}`
				activeLayers++
			}
		}else{
			rebuilt+="&"+sanit(sections[i])
		}
	}
	return rebuilt+("</span>").repeat(activeLayers)
}
function updateItemPreview(text){
	document.getElementById("itemDisplayName").innerHTML=""
	document.getElementById("itemDisplayLore").innerHTML=""
	let split = text.split("\n")
	document.getElementById("itemDisplayName").innerHTML=stringToColorParsed(split[0])+"<br>"
	for(let i = 1; i < split.length;i++){
		document.getElementById("itemDisplayLore").innerHTML+=stringToColorParsed(split[i])+"<br>"
	}
}

window.addEventListener("load", (e) => {
	document.getElementById("simpleInput").value = defaultString
	updateItemPreview(defaultString)
	let dropdown = idHand.createItemDropdown({type:"items",change:itemChanged})
	document.getElementById('inputs').appendChild(dropdown);
	selectedItem=dropdown.value
});
function itemChanged(newItem) {
	selectedItem=newItem.target.value
	updateItemOutput(inputValue)
}

function sanit(str) {
	return str.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}
function updateItemOutput(itemData) {
	document.getElementById("output").value = conversion.auto({src:conversion.selected.from.id,dst:conversion.selected.to.id,dat:itemData,item:selectedItem})
}
