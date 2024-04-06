function rowQtyChanged(){
    console.log("row quantity changed")
    
    const rowQty = document.getElementById('row_qty') 
    const urlParams = new URLSearchParams(window.location.search);
    const paramChartDiffId = urlParams.get("chartDiffId")
    const paramChartId = urlParams.get("chartId")

    var url = location.protocol + '//' + location.host + location.pathname + '?RowQty=' + rowQty.value
    if(paramChartDiffId) url += '&chartDiffId=' + paramChartDiffId
    if(paramChartId) url += '&chartId=' + paramChartId


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
    const paramChartDiffId = urlParams.get("chartDiffId")
    const paramChartId = urlParams.get("chartId")
    const paramRowQty = urlParams.get("RowQty")
    
    var url = location.protocol + '//' + location.host + location.pathname + '?page=' + page
    if(paramChartDiffId) url += '&chartDiffId=' + paramChartDiffId
    if(paramChartId) url += '&chartId=' + paramChartId
    if(paramRowQty) url += '&RowQty=' + paramRowQty
    window.location.href = url
    
}