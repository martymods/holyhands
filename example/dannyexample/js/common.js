function openWin(url, width, height){
    try{
        var left = (screen.width - width) / 2;
        var top = (screen.height - height) / 2;
        var param = 'resizable=0, scrollbars=yes, width=' + width + ', height=' + height + ', left=' + left + ', top=' + top;
        window.open(url, '_blank', param);
    }catch(e){
    ;
    }
    return false;
}

function openCmtForm(a,b){
    var aa=document.getElementById(a);
    var bb=document.getElementById(b)
    aa.style.display="none";
    bb.style.display="block";
}
function closeCmtForm(a,b){
    var aa=document.getElementById(a);
    var bb=document.getElementById(b)
    aa.style.display="block";
    bb.style.display="none";
}

//addComment
function addComment(form){
    form.send.disabled = true;
    var postEmail=form.postEmail.value;
    var postContent=form.postContent.value;
	/*
	var postTitle = form.postTitle.value;
	if (postTitle==null||postTitle==''){
        alert("Please type your Title");
        form.postTitle.focus();
        form.send.disabled = false;
        return false;
    }
	*/
    if (postEmail==null||postEmail==''){
        alert("Please type your email");
        form.postEmail.focus();
        form.send.disabled = false;
        return false;
    }
    if (postContent==null||postContent==''){
        alert("Please type content");
        form.postContent.focus();
        form.send.disabled = false;
        return false;
    }

    myUrl="inc/class.asp?action=addComment";
	var data ="postEmail="+ encodeURIComponent(postEmail)+"&postContent="+encodeURIComponent(postContent);  // + "&postTitle=" + postTitle;
    openUrl(myUrl, data);
}

function openUrl(url, data){
    var xmlHttp,retInfo;
	try
	{
		// Firefox, Opera 8.0+, Safari
		xmlHttp=new XMLHttpRequest();
	}
	catch (e)
	{
		// Internet Explorer
		try
		{
			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e)
		{

			try
			{
			 xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e)
			{
				 alert("您的浏览器不支持AJAX！");
				 return false;
			}
		}
	}
	
    xmlHttp.open("POST",url, false);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			retInfo=xmlHttp.responseText;
			switch(retInfo){
			case "-2":
				alert('error');
				break;
			case "1":
				alert('ok');
				window.location.reload();
				break;
			case "0":
				alert('no ok');
			}
			return;
		}
	}
	xmlHttp.send(data);
}