$(document).ready(function() {
    console.log("ready!");
});
var timer;
var typing = false;
var socket = io();
$('form').submit(function() {

    
    message = {
        "name": $("#name").val(),
        "text": $('#m').val()
    }
    //socket.emit('chat message', message);
    //$('#m').val("");
    if ($('#m').val() != "" ){
    	console.log("message sent");
        socket.emit('chat message', message);
        $('#m').val("");
    }
    
    return false;
});
socket.on('chat message', function(msg) {
    $('#messages').append($('<li class="message">').text(msg['name'] + " : " + msg['text']));
});

socket.on('typing', function(msg) {
    if (msg.type == 'started') {
        var $typingDiv = $('<li class="typing message">').text(msg['name'] + " is typing...");
        $typingDiv.data('name', msg.name);
        $('#messages').append($typingDiv);
    }
    if (msg.type == 'stopped') {
        removeChatTyping(msg);
    }
    if (msg.type == 'finished') {
        removeChatTypingNow(msg);
    }
});


$('#m').keydown(function(e) {
    clearTimeout(timer);
    if (e.which == 13) {
        if (typing == true) {
            console.log("has finished typing");
            socket.emit('typing', {
                "name": $("#name").val(),
                "type": 'finished'
            });
            typing = false;
        }

    } else {
        if (typing == false) {
            typing = true;
            console.log("started typing")
            socket.emit('typing', {
                "name": $("#name").val(),
                "type": 'started',

            });


        }
        timer = setTimeout(timerFunction, 1400);
    }
});

function timerFunction() {
    if (typing == true) {
        console.log("has stopped typing");

        socket.emit('typing', {
            "name": $("#name").val(),
            "type": 'stopped'

        });

        typing = false;
    }
}


function addChatTyping(data) {
    data.typing = true;
    data.message = 'is typing';
    addChatMessage(data);
}

// Removes the visual chat typing message
function removeChatTyping(data) {
    getTypingMessages(data).fadeOut(function() {
        $(this).remove();
    });
}

function removeChatTypingNow(data) {

    getTypingMessages(data).remove();

}


function getTypingMessages(data) {
    return $('.typing').filter(function(i) {
        console.log($(this).data('name') === data.name);
        console.log(i);
        return $(this).data('name') === data.name;
    });
}
