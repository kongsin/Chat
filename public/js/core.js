var io = io();
var currentId;
var currentToken;

io.on('token', function(params) {
    if (currentToken == null) {
        currentToken = params;
        var msg_data = '{"id":"'+currentId+'", "token":"'+currentToken+'"}';
        setCookie("chat",msg_data, 100);
        window.location = "http://192.168.43.114:3000/chats";
    }
});

io.on('message', function(message) {
  var newParagraph = document.createElement("p");       // Create a text node                            // Append the text to <li>
  newParagraph.innerHTML = message.id+" : "+message.msg;
  document.getElementById("messages").appendChild(newParagraph);
});

function sendMessage() {
	var cookie = JSON.parse(getCookie("chat"));
  var message = document.getElementById("message").value;
	var msg_data = {
		id : cookie.id,
		token : cookie.token,
		msg : message
	};
	io.emit("chat", msg_data);
	document.getElementById("message").value = "";
}

function chanalSubmit() {
    var ch = document.getElementById("chanal");
    currentId = ch.value;
    var data = {
        id : currentId
    };
    io.emit('chanal', data);
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}
