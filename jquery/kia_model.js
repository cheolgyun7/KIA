$(function(){

    $(".header").load("header_footer.html header")
    $(".footer").load("header_footer.html #s7.section")

    var kia_modelcar = $(".kia_360car>p");
    var kia_all =$(".kia_360car").length;
    console.log(kia_all);
    var kia_slidecar = $("#myRange");
    var kia_output = $("#demo");
    let kia_allpage=$(".center_page>ul>li");
    console.log(kia_allpage);
    let kia_page =$(".center_page>ul>li").length;
    console.log(kia_page);
    let idx;

    var kia_modelIndex = 0;
    let kia_end = kia_modelcar.length;
    console.log(kia_end);
    let kia_min = kia_slidecar.attr("min");
    console.log("min"+kia_min);
    let kia_max = kia_slidecar.attr("max");
    console.log("max"+kia_max);

    kia_output=kia_slidecar.val();
    console.log(kia_output);

    $(".center_page>ul>li").on("click",function(){
        idx=$(this).index();
        console.log(idx);
        $(".kia_360car").eq(idx).addClass('active').siblings().removeClass('active');
        // $(".kia_360car:not(:eq(idx))").addClass('active').siblings().removeClass('active');
    })
    $("#myRange").on("input", function(){
        kia_output=$("#myRange").val();
        console.log(kia_output);
        let imgIndex = kia_slidecar.val()-kia_min;
        console.log(imgIndex);
        for(let i=0; i<kia_end; i++){
            $(".kia_360car>p").eq(imgIndex).show().siblings().hide();
            $(".kia_360car").addClass('active').siblings().removeClass('active');
        }
    })

})