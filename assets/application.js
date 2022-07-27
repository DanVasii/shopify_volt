// Put your applicaiton javascript here
var search_timeout = null;
jQuery(function(){
    

    $("#search").on("input",function(elem){
        if (search_timeout)
            clearTimeout(search_timeout);
        search_timeout = setTimeout(()=>{
            search(elem.target.value);
        },500)
    })
})



function search(input_value)
{
    console.log(input_value);
}