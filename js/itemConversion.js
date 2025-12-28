window.conversion = {
    itemType:"stone",
    auto: function(info) {
        try{
            if(info.src!=info.dst&&info.dst!=undefined&&info.src!=undefined){
                if(info.item!=undefined&&info.item.length>0){
                    conversion.itemType=info.item
                }
        	   return conversion.to[info.dst](conversion.from[info.src](info.dat))
            }else{
                throw new Error()
            }
        }catch(e){
            console.log(e)
            return "Error"
        }
    },
    to: {
        item: function(inp){
            return JSON.stringify(inp.data)
        },
        act: function(inp){
            //let oldInfo = idHand.toOld(inp.id)
            //return `${oldInfo.id} ${inp.Count!=undefined? inp.Count : 1} ${oldInfo.extra} ${JSON.stringify(inp.tag)}`
            //Coming soon
        },
        "1.20.4": function(inp){

            return `/give @p ${inp.data.id}${JSON.stringify(inp.data.tag)}`
        },
        "1.21": function(inp){
            let componentTmp = ""
            if(inp.display.name){
                componentTmp+=`custom_name='${inp.display.name}',`
            }
            if(inp.display.lore){
                componentTmp+=`lore=[${inp.display.lore.map(line => `'${line}'`).join(",")}],`
            }
            return `/give @p ${inp.data.id}[${componentTmp}]`
        },
        "1.21_alt": function(inp){
            let componentTmp = ""
            if(inp.display.name){
                componentTmp+=`custom_name='${inp.display.name}',`
            }
            if(inp.display.lore){
                componentTmp+=`lore=[${inp.display.lore.map(line => `{extra: ["${line}"], text: "", italic: 0b}`).join(",")}],`
            }
            return `/give @p ${inp.data.id}[${componentTmp}]`
        }
    },
    from: {
    	basic: function(inp){
    		let sections = inp.split("\n")
    		let outp = {
                    data:{Count:1,id:conversion.itemType,tag:{display:{Lore:[],Name:sections[0].length>0?`{"italic":false,"extra":[{"text":"${sections[0].replace(/&([a-zA-Z0-9])/g,(whole,color)=>{return `\\u00a7${color}`}).replace(/\"/g,`\\u0022`)}"}],"text":""}`:null}}},
                    display:{name:sections[0].replace(/\\/g,"\\\\").replace(/(?<!\\)&([0-9a-fk-or])/gi,"\\u00A7$1").replace(/\\&([0-9a-fk-or])/gi, "&$1").replace(/'/g,"\\'"),lore:[]}
                }
            for(let i = 1; i < sections.length; i++){
    		  outp.data.tag.display.Lore.push(`{"italic":false,"extra":[{"text":"${sections[i].replace(/&([a-zA-Z0-9])/g,(whole,color)=>{return `\\u00a7${color}`}).replace(/\"/g,`\\u0022`)}"}],"text":""}`)
    		  outp.display.lore.push(sections[i].replace(/\\/g,"\\\\").replace(/(?<!\\)&([0-9a-fk-or])/gi,"\\u00A7$1").replace(/\\&([0-9a-fk-or])/gi, "&$1").replace(/'/g,"\\'"))
            }
            if (outp.data.tag.display.Name==null){
                delete outp.data.tag.display.Name
            }
            if (outp.data.tag.display.Lore.length==0){
                delete outp.data.tag.display.Lore
            }
            console.log(outp)
    		return outp

    	}
    },
    types:{
        to:[
            {id:"item",display:"Item Data"},
            {id:"1.20.4",display:"Tags(1.13?-1.20.4)"},
            {id:"1.21",display:"Components(1.20.5+)"},
            {id:"1.21_alt",display:"Components Hypixelified"}
        ],
        from:[
            {id:"basic",display:"Basic"}
        ]
    },
    selected:{
        to:{id:"item",display:"Item Data"},
        from:{id:"basic",display:"Basic"}
    }


};
