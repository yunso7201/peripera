$(function(){
	$(".close").click(function(e){
		e.preventDefault();
		if($("input[name=todayClose]").is(":checked")){ // 체크박스가 선택되어 있다면,
			setCookie("close", "yes", 1); // close cookie를 yes 값으로 저장합니다.
			// cookie 이름 : close
			// cookie 값 : yes
		}
		$(".popup").removeClass("active");
	});

	if(GetCookie("close") == "yes"){ // 화면 로딩 시에 close cookie 값이 yes이면,
		// $(".popup").hide(); // 팝업을 닫습니다.
	}else{
		// $(".popup").show(); // 아니라면 팝업을 열어줍니다.
		$(".popup").addClass("active");
	}

	function setCookie(name, value, expiredays){
		var days=expiredays;
		if(days){
			var date=new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires="; expires="+date.toGMTString();
		}else{
			var expires="";
		}
		document.cookie=name+"="+value+expires+"; path=/";
	}
	function GetCookie(name){
		var value=null, search=name+"=";
		if(document.cookie.length > 0){
			var offset=document.cookie.indexOf(search);
			if(offset != -1){
				offset+=search.length;
				var end=document.cookie.indexOf(";", offset);
				if(end == -1) end=document.cookie.length;
				value=unescape(document.cookie.substring(offset, end));
			}
		} return value;
	}

	

	$("#gnb > ul > li").focusin(function(){
		$(this).parents(".menu").stop().addClass("over");
	});
	$("#gnb > ul > li").focusout(function(){
		$(this).parents(".menu").stop().removeClass("over");
	});

	$("#gnb > ul > li:first-child > a").focusin(function(){
		$(".header .menu").addClass("over");
	});
	$("#gnb li:last-child li:last-child").focusout(function(){
		$(".header .menu").removeClass("over");
	});
	$("#gnb > ul > li > a").focusin(function(){ // 수정
		$(this).addClass("over");
	});
	$("#gnb li li:last-child").focusout(function(){ // 수정
		$(this).parent().prev().removeClass("over");
	});

	$(".main_notice .title a").eq(0).addClass("active");
	$(".main_notice .tab_group > div").eq(0).addClass("active");

	var n=0;

	$(".main_notice .title a").click(function(e){
		e.preventDefault();
		n=$(this).index();
		$(".main_notice .title a").removeClass("active");
		$(this).addClass("active");
		$(".main_notice .tab_group > div").removeClass("active");
		$(".main_notice .tab_group > div").eq(n).addClass("active");
	});

	var n;
	var listName="";

	$(".select dt a").click(function(e){
		e.preventDefault();
		/*
		if($(this).hasClass("active") == false){
			$(".select dd a").removeClass("active");
		}
		*/
		$(this).toggleClass("active");
		$(this).parent().next("dd").slideToggle(300);
	});
	$(".select dd a").click(function(e){
		e.preventDefault();
		$(".select dd a").removeClass("active");
		$(this).addClass("active");
		listName=$(this).text();

		var $currentDl=$(this).parents("dl");
		$currentDl.find("dt a").html(listName+"<span></span>");
		$currentDl.find("dt a").removeClass("active");
		$currentDl.find("dd").slideUp(300);

		n=$(this).parent().index();
		var $select=$("."+$currentDl.attr("class")+"_select"); // $("."+"center"+"_select")
		$select.find("option").prop("selected", false);
		$select.find("option").eq(n+1).prop("selected", true);
	});

	var w=180;
	var amount=0;

	$(".direction .prev").click(function(e){
		e.preventDefault();
		leftMoving();
	});
	$(".direction .next").click(function(e){
		e.preventDefault();
		rightMoving();
	});

	function leftMoving(){
		amount-=w;
		$(".rel_site_inner .site_wrapper ul").animate({left:amount}, 500, function(){
			$(this).append($(".rel_site_inner .site_wrapper ul li:first-child"));
			amount+=w;
			$(this).css({left:amount});
		});
	}
	function rightMoving(){
		$(".rel_site_inner .site_wrapper ul").prepend($(".rel_site_inner .site_wrapper ul li:last-child"));
		amount-=w;
		$(".rel_site_inner .site_wrapper ul").css({left:amount});
		amount+=w;
		$(".rel_site_inner .site_wrapper ul").animate({left:amount}, 500);
	}

	// Native Gallery JavaScript
	var keyvisual={
		key1 : "keyvisual1.jpg",
		key2 : "keyvisual2.jpg",
		key3 : "keyvisual3.jpg",
		key4 : "keyvisual4.jpg",
		key5 : "keyvisual5.jpg"
	}

	var dataN=0;
	//<div class="keyvisual">
	var keyContainer=document.getElementsByClassName("keyvisual")[0];

	//<div class="keyvisual_inner">
	var inner=document.createElement("div");  //메모리에 그리기
	inner.setAttribute("class", "keyvisual_inner"); //속성을 추가하기
	keyContainer.appendChild(inner);   //appendChild() 화면그리기

	//<div class="controlls">
	var controlls=document.createElement("div");
	controlls.setAttribute("class", "controlls");
	keyContainer.appendChild(controlls);

	var keyString="";
	var controllString="";

	keyString+='<ul>\n' //문자열 안에서 개행처리하는 특수문자입니다.
	controllString+='<ul>\n'

	for(key in keyvisual){
		//console.log(key+":"+keyvisual[key]);
		//key1 : "keyvisual1.jpg"

		//<li><a href="#"><img src="img/keyvisual2.jpg" alt="keyvisual1"></a></li>
		keyString += '<li><a href="#"><img src="/img/' + keyvisual[key]+ '"alt=" + "keyvisual'+ (dataN+1) + '"></a></li>\n';

		//console.log("dataN :"+dataN); //for in 구문을 for처럼 사용하는 방법
		controllString +='<li><a href="#">' + (dataN+1) + '</a></li>' //추가
		dataN++; //0,1,2 ...
	}

	keyString+='</ul>';
	inner.innerHTML=keyString;
	//console.log(keyString);

	controllString+='</ul>' //추가
	controlls.innerHTML=controllString; //추가

	var $galleryMoving=$(".keyvisual_inner"); // 이동 갤러리의 참조입니다.
	var $controlls=$(".controlls"); // 컨트롤 버튼의 참조입니다.
	var $left=$(".direction .left"); // 왼쪽 버튼의 참조입니다.
	var $right=$(".direction .right"); // 오른쪽 버튼의 참조입니다.
	var galleryNum=5; // 갤러리 이미지 개수입니다.

	var n=0;
	var pos;

	$controlls.find("li").eq(n).addClass("active");

	$controlls.find("a").click(function(e){
		e.preventDefault();
		$controlls.find("li").removeClass("active");
		$(this).parent().addClass("active");

		n=$(this).parent().index();
		console.log(n);
		pos=n*-1*100+"%";
		$galleryMoving.animate({left:pos}, 400);
	});

	$left.click(function(e){
		e.preventDefault();
		if(n > 0){
			n--;
			$controlls.find("li").removeClass("active");
			$controlls.find("li").eq(n).addClass("active");
			pos=n*-1*100+"%";
			$galleryMoving.animate({left:pos}, 400);
		}
	});
	$right.click(function(e){
		e.preventDefault();
		if(n < (galleryNum-1)){
			n++;
			$controlls.find("li").removeClass("active");
			$controlls.find("li").eq(n).addClass("active");
			pos=n*-1*100+"%";
			$galleryMoving.animate({left:pos}, 400);
		}
	});

	var $campusMoving=$(".campus_wrap .campus_wrap_moving");
	var $controls=$(".camedia_controlls");
	var campusNum=3;

	var n=0;
	var campus;

	$controls.find("li").eq(n).find("a").addClass("active");

	$controls.find("a").click(function(e){
		e.preventDefault();
		$controls.find("li").removeClass("active");
		$(this).parent().addClass("active");

		n=$(this).parent().index();
		campus=n*-1*100+"%";
		$campusMoving.animate({left:campus}, 400);
	});
});