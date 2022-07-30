
function swap_register()
{
    document.querySelector(".left_side").classList.add("register_on");
    document.querySelector(".right_side").classList.add("register_on");
    swap_welcome_login();

    set_zindex(0);
}

function swap_login()
{
    document.querySelector(".left_side").classList.remove("register_on");
    document.querySelector(".right_side").classList.remove("register_on");
    swap_welcome_register();

    set_zindex(99);
}

function set_zindex(index)
{
    setTimeout(function(){
        document.querySelector(".face_one").style.zIndex = index;
    },300)
}

function swap_welcome_login()
{

    document.querySelector(".face_welcome.face_one").classList.add("invis");
    document.querySelector(".face_welcome.face_two").classList.remove("invis");

}

function swap_welcome_register()
{
    document.querySelector(".face_welcome.face_one").classList.remove("invis");
    document.querySelector(".face_welcome.face_two").classList.add("invis");
}

function login()
{
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#pass").value;

    $.ajax({
        url: '/account/login',
        type: "POST",
        data:{
            username,
            password
        },
        success: function(response){
            console.log(response);
        }
    })
}