// Put your applicaiton javascript here

const ZERO_RESULTS = "Nu am găsit rezultate";
var search_timeout = null;
jQuery(function(){
    

    $("#search").on("input",function(elem){
        if (search_timeout)
            clearTimeout(search_timeout);
        search_timeout = setTimeout(()=>{
            search(elem.target.value);
        },500)
    })

    $("#search").on("focusout",function(){
        hide_search()
    })

    $("#search").on("focusin",function(){
        if (search_items_count()!=0)
        {
            show_search();
        }
    })

})



function search(input_value)
{
    if (input_value=="")
    {
        remove_search_items();
        hide_search();
        return ;
    }
    $.ajax({
        url: "/search/suggest.json",
        type: "GET",
        data: {
                "q": input_value,
                "resources": {
                  "type": "product",
                  "limit": "5",
                  "options": {
                    "unavailable_products": "hide",
                    "fields": "title"
                  }
                }
        },
        success: function(data)
        {
            //remove all 
            remove_search_items();
            show_search();
            if (data.resources.results.products.length!=0)
            {
                data.resources.results.products.forEach(prod=>{
                    add_search_item(build_search_item(prod.title,prod.url,prod.image))
                })
            }
            else{
                //show nothing found 
                add_search_item(build_search_item(ZERO_RESULTS,null,null,false));
            }
        }

    })
}

function build_search_item(text = null,url = null,image_path = null,found = true)
{
    let link = document.createElement("a");
    link.href = url;

    if (url == null || !url)
        link.className = "disabled";

    let item = document.createElement("div");
    item.className = found ? 'search_item' : 'search_item not_found';
        
        if (image_path!=null)
        {
            //build img 
            let img = document.createElement("img");
            img.src = image_path;

            item.appendChild(img);
        }

        if (text!=null)
        {
            //build text 
            let txt = document.createTextNode(text);
            item.appendChild(txt);
        }

        link.appendChild(item);
        return link;
}

function remove_search_items()
{
    Array.from(document.querySelectorAll(".search_list a")).forEach(item=>{
        item.remove();
    })
}

function add_search_item(node)
{
    if (node)
    document.querySelector(".search_list").appendChild(node);
}

function show_search()
{
    document.querySelector(".search_wrapper").style.maxHeight = "300px";
}

function hide_search()
{
    document.querySelector(".search_wrapper").style.maxHeight = "0px";
}

function search_items_count()
{
    return document.querySelectorAll(".search_list a").length;
}


function cta()
{
    let menu = document.querySelector(".contact_us_menu");
    let body = document.querySelector("body");
    if (menu && body)
    {
        if (menu.classList.contains("opened"))
        {
            //close
            menu.classList.remove("opened");
            menu.classList.add("closed"); 

            //add ugly background 
            if (body.classList.contains("opened_menu"))
                body.classList.remove('opened_menu');
        }
        else 
        {
            //open 
            menu.classList.remove("closed");
            menu.classList.add("opened"); 
            if (!body.classList.contains("opened_menu"))
            body.classList.add('opened_menu');
        }
    }
}