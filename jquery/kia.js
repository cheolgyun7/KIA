$(function () {
    AOS.init();

    var wWidth = $(window).width();
    var kiaCarWidth = $(".kia_cars_name li").outerWidth();
    var kiaCarCount = $(".kia_cars_name li").length;
    var curIndex = 0;
    console.log(wWidth);
    //banner의 마지막 자식 요소를 복사
    var lastChild = $(".kia_cars_name>li:last").clone();
    //banner의 첫번째 자식 요소를 복사
    var firstChild = $(".kia_cars_name>li:first").clone();
    //banner 붙이기
    $(".kia_cars_name").append(firstChild);
    $(".kia_cars_name").prepend(lastChild);
    //banner너비값 = bannerWidth*li의 갯수
    //복사본에 의해 전체 사이즈가 변경
    var kiaCarTotalWidth = kiaCarWidth * (kiaCarCount + 2);
    $(".kia_cars_name").width(kiaCarTotalWidth);
    $(".kia_cars_name>li").outerWidth(kiaCarWidth);

    var $menu = $('nav>#menu>.kia_sub');
    var $kia_content = $(".fullpage>.section");
    var $kia_count = $(".fullpage>.section").length;
    var idx;
    let sPosY = new Array();

    for (i = 0; i < $kia_count; i++) {
        sPosY[i] = $(".fullpage>.section").eq(i).offset().top;
    }
    // console.log(sPosY)
    // // $menu를 클릭하면 해당요소만 클래스명이 on추가되도록
    $menu.click(function (e) {
        e.preventDefault();
        idx = $(this).index();
        // console.log(idx);
        moveScroll();
    })

    // ############## hamBtn - click ##############
    var hamburger = $(".m-nav__hamBtn-icon");
    hamburger.on("click", function (e) {
        e.preventDefault();
        $(this).toggleClass("active");
        $("#menu").stop().slideToggle(400);
    });
    // 서브메뉴에서 승용누르면 승용나오고 rv누르면 rv나오게 하는거
    $(".kia_sub_menu_title>.kia_sub_title>li").on("click", function (e) {
        e.preventDefault();
        mWidth = $(window).width();
        let mNum = $(this).index();
        // console.log(mNum);
        $(".kia_sub_car").eq(mNum).show()
            .siblings().hide();
        $(this).addClass('active').siblings().removeClass('active');
    })
    var kiaModel = $("#menu>li>a")
    kiaModel.on("click", function (e) {
       mWidth = $(window).width();
        if (mWidth < 960) {
            e.preventDefault();
            // console.log(kiaModel)
            $(this).toggleClass("active");
            $("#menu>.kia_sub:hover>.kia_sub_menu1").stop().slideToggle(400);
        }
    })
    // ============================ 풀페이지 ================================

    //화면이 이동해야될 위치값을 저장할 변수 만들기

    let moveTop = null;
    //화면의 방향을 위 아래로 이동할지를 체크하는 변수만들기
    var delta;

    $(".fullpage>.section").each(function (i) {
        $(this).on("mousewheel DOMMouseScroll", function (e) {
            if (wWidth > 960) {
                //이벤트 정보를 저장할 변수
                let event = e.originalEvent;
                if (event.detail) {
                    //파이어폭스
                    delta = event.detail * -40;
                }
                else {
                    //다른 브라우저
                    delta = event.wheelDelta;
                }
                //마우스휠을 아래로 내리면 delta -120 위로 올리면 delta 120
                if (delta < 0) {
                    if ($(this).next().length) {
                        moveTop = $(this).next().offset().top
                    }
                    idx = i + 1;
                }
                else {

                    if ($(this).prev().length) {
                        moveTop = $(this).prev().offset().top
                    }
                    idx = i - 1;
                }
                moveScroll();
            }
        })
    })
    function moveScroll() {
        $("html,body").stop().animate({
            scrollTop: sPosY[idx]
        }, 1000, function () {
            $menu.eq(idx).addClass('on').siblings().removeClass('on');
        })
    }
    $(window).scroll(function () {
        scrollTop = $(window).scrollTop();
        // console.log(scrollTop);
        if (scrollTop >= sPosY[0] && scrollTop < sPosY[1]) {
            idx = 0;
        }
        else if (scrollTop >= sPosY[1] && scrollTop < sPosY[2]) {
            idx = 1;
        }
        else if (scrollTop >= sPosY[2] && scrollTop < sPosY[3]) {
            idx = 2;
        }
        else if (scrollTop >= sPosY[3] && scrollTop < sPosY[4]) {
            idx = 3;
        }
        else if (scrollTop >= sPosY[4] && scrollTop < sPosY[5]) {
            idx = 4;
        }
        else if (scrollTop >= sPosY[5] && scrollTop < sPosY[6]) {
            idx = 5;
        }
        $menu.eq(idx).addClass('on').siblings().removeClass('on');
    })

    //  // ============================ 풀페이지 ================================
    // // 동영상슬라이드 재생,일시정지

    var video = $('#video');
    $(".kia_play").click(function () {
        video.get(0).play();
    })
    $(".kia_pause").click(function () {
        video.get(0).pause();
    })



    //% li의 사이즈 배너 한개의 사이즈로 고정
    function moveBanner() {
        // console.log("m:"+kiaCarWidth)
        // console.log(curIndex)
        $(".kia_cars_name").stop().animate({
            marginLeft: -curIndex * kiaCarWidth
        }, 1000)
        if (curIndex == kiaCarCount) {
            $(".bannerBtn>li").eq(0).addClass("active")
                .siblings().removeClass("active");
        }
        $(".bannerBtn>li").eq(curIndex).addClass("active")
            .siblings().removeClass("active");
        // console.log(kiaCarTotalWidth);
    }

    //bannerBtn>li를 클릭하면 해당하는 버튼은 클래스 active를 줘서
    //형제는 active를 제거
    $(".bannerBtn>li").on("click", function () {
        curIndex = $(this).index();
        moveBanner();
    })

    //left
    $(".leftBtn>a").on("click", function () {
        if (curIndex == 0) {
            curIndex = 5;
            $(".kia_cars_name").css("margin-left", -100 * curIndex + "%")
        }
        curIndex--;
        moveBanner();
    })

    $(".rightBtn>a").on("click", function () {
        if (curIndex == kiaCarCount) {
            curIndex = 0;
            $(".kia_cars_name").css("margin-left", 0);
        }
        // console.log(curIndex);
        curIndex++;
        moveBanner();
    })


    $(".kia_btn>li").on('click', function (e) {
        e.preventDefault();
        //선택한 번호의 순서를 찾아서 저장할 변수
        var selectIndex = $(this).index();
        $(".kia_eximg>ul>li").eq(selectIndex).fadeIn(2000)
            .siblings().fadeOut(1000);
        $(this).addClass('active')
            .siblings().removeClass('active');
    })

    //     // // interior페이지==========================================

    var icurIndex = 0;
    let timer = setInterval(autoBanner, 5000);
    function autoBanner() {
        if (icurIndex < 2) {
            icurIndex++;
        }
        else {
            icurIndex = 0;
        }
        // console.log(curIndex);
        $(".kia_inimg>ul>li ").eq(icurIndex).fadeIn(1000)
            .siblings().fadeOut(1000);
    }


    //  이벤트 페이지 =================================================================


    //보여지는 배너가 누구인지를 체크할 변수 만들기
    let showBanner = 0;
    // console.log(showBanner);
    //총 배너의 갯수
    let total = $(".kia_slides>li").length;
    // console.log(total);
    //배너 하나의 너비
    let kia_liWidth = $(".kia_slides>.b1").width();
    // let kia_allWidth = $(".kia_slides").outerWidth();
    // console.log(kia_allWidth);
    // console.log(kia_liWidth);
    //이동하는 시간
    let speed = 1000;
    //보여지는 배너가 누구인지를 숫자로 보여주기 count
    $(".count").text(showBanner + 1);
    //전체 배너의 개수 total 에 보여주기
    $(".total").text(total);
    //첫번째 배너를 복사하여 배너의 마지막에 붙이기
    let firstLi = $(".kia_slides>.b1").clone(); //첫번째 레이어 복사
    let lastLi = $(".kia_slides>.b4").clone();//마지막 레이어 복사
    $(".kia_slides").append(firstLi); //뒤에 붙이기
    $(".kia_slides").prepend(lastLi); //앞에 붙이기
    // console.log(total);
    //배너의 너비값 조절하기
    $(".kia_slides").width(kia_liWidth * (total + 2));

    function kia_moveBanner() {
        //0
        $(".kia_slides").stop().animate({
            "margin-left": -showBanner * kia_liWidth
        }, speed)
        if (showBanner == total) {
            $(".count").text(1)
        }
        else {
            $(".count").text(showBanner + 1);
        }

    }
    //오른쪽 버튼을 클릭하면 배너를 하나씩 왼쪽으로 이동하기
    $(".erightBtn").on("click", function () {
        if (showBanner == total) {
            showBanner = 0;
            $(".kia_slides").css("margin-left", -100 * showBanner + "%")
        }
        showBanner++;
        kia_moveBanner();
    })
    //왼쪽  버튼을 글릭하면 배너를 하나씩 오른쪽으로 이동하기

    $(".eleftBtn").on("click", function () {
        if (showBanner == 0) {
            showBanner = 4;
            $(".kia_slides").css("margin-left", -100 * showBanner + "%")
        }
        showBanner--;
        kia_moveBanner();
    })
    // 자동으로 배너 이동하기
    let etimer = setInterval(function () {
        $(".erightBtn").trigger("click");
    }, 3000) 
    $(".kia_slides>li").on("mouseover",function(){
        clearInterval(etimer);
    })
    // $(".Playstop").on("click",function(){
    //     if($(this).hasClass("active")){
    //         $(this).removeClass("active");
    //         etimer=setInterval(function(){
    //             $(".erightBtn").trigger("click");
    //         },3000)
    //     }
    //     else{
    //         $(this).addClass("active");
    //         clearInterval(etimer);
    //     }
    //     let bannerAni = $(".kia_slides>li").is(":animated");
    //     console.log(bannerAni);
    // })

    // ========================== 구매 및 체험 차량 리사이즈 =============================
    function resizeWin() {
        //윈도우의 크기가 1260 아래로 내려갔을때만 resize를 적용하기
        if (wWidth < 1260) {
            $(".kia_cars_name>li").outerWidth(wWidth);
            kiaCarWidth = $(".kia_cars_name>li").outerWidth();
            // console.log(kiaCarWidth)
            $(".kia_cars_name").width(kiaCarWidth * (kiaCarCount + 2));
            // console.log($(".kia_cars_name").outerWidth())
            curIndex = 0;
            $(".kia_cars_name").css("margin-left", 0);
        }
    }


    $(window).resize(function () {
        wWidth = $(window).width();
        resizeWin();
        evResizeWin();
    })

    // =========================== 이벤트 페이지 슬라이드 리사이즈 ========================
    // evResizeWin이라는 함수 생성을함
    function evResizeWin() {
        showBanner = 0;
        $(".kia_slides").css("margin-left", 0);

        if (wWidth < 1260) {
            $(".kia_slides>li").outerWidth(wWidth);
        }
        else {
            $(".kia_slides>li").outerWidth(1260);
        }

        kia_liWidth = $(".kia_slides>li").outerWidth();
        console.log(kia_liWidth);

        $(".kia_slides").width(kia_liWidth * (total + 2));        
    }
})