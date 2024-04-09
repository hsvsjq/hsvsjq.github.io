function rowQtyChanged(){
    console.log("row quantity changed")
    
    const rowQty = document.getElementById('row_qty') 
    
    var params = generateParams(['rowQty'])
    var url = location.protocol + '//' + location.host + location.pathname + '?rowQty=' + rowQty.value + '&' + params

    window.location.href = url
    
}

function pageLeft(){
    const urlParams = new URLSearchParams(window.location.search);
    const paramPage = urlParams.get("page")
    var page = 1
    if (paramPage){
        var temp = parseInt(paramPage)
        if(temp >= 2)
            page = temp
    }

    if(page > 1)
        changePage(page - 1)
    
}

function pageRight(){
    const urlParams = new URLSearchParams(window.location.search);
    const paramPage = urlParams.get("page")
    var page = 1
    if (paramPage){
        var temp = parseInt(paramPage)
        if(temp >= 2)
            page = temp
    }

    changePage(page + 1)
}

function generateParams(ignore){
    const urlParams = new URLSearchParams(window.location.search);
    params = ''
    var b = false
    for (const [key, value] of urlParams.entries()) {
        for(i = 0; i < ignore.length; i++){
            if(ignore[i] == key){
                b = delete ignore[i]
                break;
            }
        }
        
        if(b){
            b = false
            continue;
        }

        params += key + '=' + value + '&'

    }
    return params
}

function changePage(page){    
    var params = generateParams(['page'])
    
        
    var url = location.protocol + '//' + location.host + location.pathname + '?page=' + page + '&' + params
    
    window.location.href = url
    
}

function currentTable(){
    const urlParams = new URLSearchParams(window.location.search);
    const paramTable = urlParams.get("table")
    const rowQty = document.getElementById('row_qty') 
    var url = location.protocol + '//' + location.host + location.pathname + '?table=' + paramTable + '&rowQty=' + rowQty.value
    window.location.href = url
}