window.idHand = {
    items: {
    	"stone_button":{name:"Stone Button",old:{id:"stone_button",extra:0}},
        "stone":{name:"Stone",old:{id:"stone",extra:1}},
    },
    createItemDropdown: function(info) {
        let dropdown = document.createElement("select")
        if (info.type=="items"){
            dropdown.innerHTML=Object.entries(idHand.items).map(([key, value]) => `<option value="${key}">${value.name}</option>`).join("")
            if(info.change){
                dropdown.addEventListener('change', info.change)


            }
            return dropdown
        }
    },
    toOld: function(id){
        if(idHand.items[id]!=undefined){
            return idHand.items[id].old
        }else if(new RegExp(`^minecraft:([a-zA-Z_]+)$`)){
            let trimmedId = id.match(new RegExp(`^minecraft:([a-zA-Z_]+)$`))[1]
            if(idHand.items[trimmedId]!=undefined){
                return idHand.items[trimmedId].old
            }else{
                throw new Error("Unknown ID or format")
            }
        }else{
            throw new Error("Unknown ID or format")
        }
    }
};
