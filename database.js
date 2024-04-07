function rowQtyChanged(){
    console.log("row quantity changed")
    
    const rowQty = document.getElementById('row_qty') 
    const urlParams = new URLSearchParams(window.location.search);
    const paramTable = urlParams.get("table")
    const paramQuery = urlParams.get("query")
    
    var url = location.protocol + '//' + location.host + location.pathname + '?RowQty=' + rowQty.value
    if(paramTable) url += '&table=' + paramTable
    if(paramQuery) url += '&query=' + paramQuery

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

//TODO unify and organize address generations

function changePage(page){
    const urlParams = new URLSearchParams(window.location.search);
    const paramTable = urlParams.get("table")
    const paramQuery = urlParams.get("query")

    const paramRowQty = urlParams.get("RowQty")
    
    var url = location.protocol + '//' + location.host + location.pathname + '?page=' + page
    if(paramRowQty) url += '&RowQty=' + paramRowQty
    if(paramTable) url += '&table=' + paramTable
    if(paramQuery) url += '&query=' + paramQuery

    window.location.href = url
    
}

function currentTable(){
    const urlParams = new URLSearchParams(window.location.search);
    const paramTable = urlParams.get("table")
    var url = location.protocol + '//' + location.host + location.pathname + '?table=' + paramTable
    window.location.href = url
}