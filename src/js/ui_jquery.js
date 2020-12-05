//gnb
window.addEventListener("load", function(){
	var gnb=document.getElementById("GNB");

	for(var i=0; i<gnb.children.length; i++){
		if(gnb.children[i].className == "GNB_inner"){
			var inner=gnb.children[i];
		}
	}

	var gnbUl=inner.children[0];
	var depth1Li=inner.children[0].children;

	for(var j=0; j<depth1Li.length; j++){
		depth1Li[j].addEventListener("mouseenter", function(){
			gnbUl.classList.add("over");
		});
		depth1Li[j].addEventListener("mouseleave", function(){
			gnbUl.classList.remove("over");
		});
		depth1Li[j].children[0].addEventListener("focusin", function(e){
			e.target.classList.add("over");
		});
		depth1Li[0].children[0].addEventListener("focusin", function(){
			gnbUl.classList.add("over");
		});

		var depth2Li=depth1Li[j].children[1].children;
		console.log(depth2Li);

		if(j == 5){
			for(var k=0; k<depth2Li.length; k++){
				depth2Li[2].addEventListener("focusout", function(){
					gnbUl.classList.remove("over");
				});
			}
		}

		for(var h=0; h<depth2Li.length; h++){
			if(h == (depth2Li.length-1)){
				depth2Li[h].addEventListener("focusout", function(e){
					// console.log("focusout!!");
					console.log(e.currentTarget);
					var link=e.currentTarget.parentElement.previousElementSibling;
					link.classList.remove("over");
				});
			}
		}
	}
});


$(function(){
	// slide
	var keyvisual={
		key1 : "keyvisual1.jpg",
		key2 : "keyvisual2.jpg"
	}

	var dataN=0;
	// <div class="keyvisual">
	var keyContainer=document.getElementsByClassName("keyvisual")[0];

	// <div class="keyvisual_inner">
	var inner=document.createElement("div"); // 메모리에 그리기
	inner.setAttribute("class", "keyvisual_inner"); // 속성을 추가하기
	keyContainer.appendChild(inner); // appendChild() 화면 그리기

	// <div class="controlls">
	var controlls=document.createElement("div");
	controlls.setAttribute("class", "controlls");
	keyContainer.appendChild(controlls);

	var keyString="";
	var controllString="";

	keyString+='<ul class="keyimage">\n';
	controllString+='<ul>\n';


	for(key in keyvisual){ // for(키 in 오브젝트[키])
		// console.log(key+":"+keyvisual[key]);
		// <li><img src="images/keyvisual1.jpg" alt="Keyimage1"></li>
		keyString+='<li><img src="/img/' + keyvisual[key] + '" alt="keyvisual'+ (dataN+1) + '"></li>\n';

		// <li class="active"><a href="">1</a></li>
		controllString+='<li><a href="">' + (dataN+1) + '</a></li>' // 추가

		// console.log("dataN:" + dataN); // for in 구문을 for처럼 사용하는 방법입니다,.
		dataN++; // 0, 1
	}

	keyString+='</ul>';
	inner.innerHTML=keyString;
	// console.log(keyString);

	controllString+='</ul>';
	controlls.innerHTML=controllString;
	console.log(controllString);

	var n1=0;

	$(".keyimage li").eq(0).addClass("on");
	$(".controlls li").eq(0).addClass("active");

	setInterval(function(){
		if(n1 < 1){
			n1=n1+1;
		}
		else{
			n1=0;
		}

		$(".keyimage li").removeClass("on");
		$(".keyimage li").eq(n1).addClass("on");
		$(".controlls li").removeClass("active");
		$(".controlls li").eq(n1).addClass("active");
	}, 7000);

	// search
	$(".campus_find dl dt a").click(function(e){
		e.preventDefault();
		$(this).toggleClass("active");
		$(this).parent().next("dd").slideToggle(300);
	});
	$(".campus_find .area dl dd a").click(function(e){
		e.preventDefault();
		$(".campus_find .area dl dd a").removeClass("active");
		$(this).addClass("active");

		listName=$(this).text();
		$(".campus_find .area dt a").html(listName+"<span></span>");
		$(".campus_find .area dl dd").slideUp(300);
		$(".campus_find .area dt a").removeClass("active");
	});
	$(".campus_find .store dl dd a").click(function(e){
		e.preventDefault();
		$(".campus_find .store dl dd a").removeClass("active");
		$(this).addClass("active");

		listName=$(this).text();
		$(".campus_find .store dt a").html(listName+"<span></span>");
		$(".campus_find .store dl dd").slideUp(300);
		$(".campus_find .store dt a").removeClass("active");
	});

	// notice
	var n=0;

	$(".main_tab a").click(function(e){
		e.preventDefault();
		n=$(this).parent().index();
		$(".main_tab a").removeClass("on");
		$(this).addClass("on");

		$(".main_panel > div").removeClass("active");
		$(".main_panel > div").eq(n).addClass("active");
	});

	// video
	var video=document.getElementById("my_video");

	$(".control").click(function(e){
		e.preventDefault();
		$(this).fadeOut(300);
		video.play();
	});
	$("#my_video").click(function(){
		$(".control").fadeIn(300);
		video.pause();
	});
	video.addEventListener("ended", function(){
		$(".control").fadeIn(300);
		video.pause();
		video.currentTime=0;
	});
	// focus
	$(".control").focusin(function(e){
		e.preventDefault();
		$(this).fadeOut(300);
		video.play();
	});

	// footer banner
	var w=180;
	var amount=0;

	$(".prev").click(function(e){
		e.preventDefault();
		leftMoving();
	});
	$(".next").click(function(e){
		e.preventDefault();
		rightMoving();
	});

	function rightMoving(){
		$(".site_wrapper ul").prepend($(".site_wrapper ul li:last-child"));
		amount-=w;
		$(".site_wrapper ul").css({left:amount});
		amount+=w;
		$(".site_wrapper ul").animate({left:amount}, 500);
	}
	function leftMoving(){
		amount-=w;
		$(".site_wrapper ul").animate({left:amount}, 500, function(){
			$(this).append($(".site_wrapper ul li:first-child"));
			amount+=w;
			$(this).css({left:amount});
		});
	}

	// popup
	$(".close").click(function(e){
		e.preventDefault();
		$(".popup").fadeOut(300);
		$(".dim").fadeOut(300);
		$("body").addClass("static");
	});

	// cookie popup
	$(".close").click(function(e){
		e.preventDefault();
		if($("input[name=todayClose]").is(":checked")){
			setCookie("close", "yes", 1);
		}
		$(".popup, .dim").fadeOut(300); // 2019-12-11
	});

	if(GetCookie("close") == "yes"){
	}
	else{
		$(".popup, .dim").fadeIn(300); // 2019-12-11
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
});