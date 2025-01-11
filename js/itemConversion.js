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
            return JSON.stringify(inp)
        },
        act: function(inp){
            //Coming soon
        },
        "1.20.4": function(inp){

            return `/give @p ${inp.id}${JSON.stringify(inp.tag)}`
        },
        "1.21": function(inp){
            let componentTmp = ""
            if(inp.tag.display.Name){
                componentTmp+=`custom_name='${inp.tag.display.Name.replace(/\\u([a-zA-Z0-9]{4})/g, (whole, hex)=>{return `\\\\u${hex}`})}',`
            }
            if(inp.tag.display.Lore){
                componentTmp+=`lore=[${inp.tag.display.Lore.map(line => `'${line.replace(/\\u([a-zA-Z0-9]{4})/g, (whole, hex)=>{return `\\\\u${hex}`})}'`).join(",")}],`
            }
            return `/give @p ${inp.id}[${componentTmp}]`
        },
    },
    from: {
    	basic: function(inp){
    		let sections = inp.split("\n")
    		let outp = {Count:1,id:conversion.itemType,tag:{display:{Lore:[],Name:sections[0].length>0?`{"italic":false,"extra":[{"text":"${sections[0].replace(/&([a-zA-Z0-9])/g,(whole,color)=>{return `\\u00a7${color}`}).replace(/\"/g,`\\u0022`)}"}],"text":""}`:null}}}
    		for(let i = 1; i < sections.length; i++){
    			outp.tag.display.Lore.push(`{"italic":false,"extra":[{"text":"${sections[i].replace(/&([a-zA-Z0-9])/g,(whole,color)=>{return `\\u00a7${color}`}).replace(/\"/g,`\\u0022`)}"}],"text":""}`)
    		}
            if (outp.tag.display.Name==null){
                delete outp.tag.display.Name
            }
            if (outp.tag.display.Lore.length==0){
                delete outp.tag.display.Lore
            }
    		return outp

    	}
    },
    types:{
        to:[
            {id:"item",display:"Item Data"},
            {id:"1.20.4",display:"Tags(1.13?-1.20.4)"},
            {id:"1.21",display:"Components(1.20.5+)"}
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
