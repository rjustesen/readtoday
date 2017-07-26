// Place common javascript here
function getDataFromDiv(div) {
    var select = div.find('select'),
        input = div.find('input'),
        textarea = div.find('textarea'),
        requestString = '{';
    for (var i = 0; i < select.length; i++) {
        if ($(select[i]).attr('object') !== 'undefined') {
            requestString += '"' + $(select[i]).attr('object') + '": "' + $(select[i]).val() + '",';
        }
    }
    for (var i = 0; i < input.length; i++) {
        if ($(input[i]).attr('type') !== 'checkbox' && $(input[i]).attr('type') !== 'submit' && $(input[i]).attr('type') !== 'button' && $(input[i]).attr('type') !== 'file' && $(input[i]).attr('type') !== 'radio') {
            if ($(select[i]).attr('object') !== 'undefined') {
                requestString += '"' + $(input[i]).attr('object') + '":"' + encodeURIComponent($(input[i]).val()) + '",';
            }
        } else {
            if (($(input[i]).attr('type') == 'checkbox' || $(input[i]).attr('type') == 'radio')) {
                if ($(select[i]).attr('object') !== 'undefined' && requestString.indexOf($(input[i]).attr('object')) == -1 && $(input[i]).val() == "1") {
                    requestString += '"' + $(input[i]).attr('object') + '":"' + encodeURIComponent($(input[i]).val()) + '",';
                }
            }
        }
    }
    for (var i = 0; i < textarea.length; i++) {
        if ($(textarea[i]).attr('object') !== 'undefined') {
            requestString += '"' + $(textarea[i]).attr('object') + '":"' + encodeURIComponent($(textarea[i]).val()) + '",';
        }
    }
    if (input.length > 0) {
        requestString = requestString.substring(0, requestString.length - 1);
    }
    requestString += '}';
    return requestString;
}

// Clear all text input boxes on in the document
function clearAllText() {
        
    var txt = document.getElementsByTagName('input');
    for (var i = 0; i < txt.length; i++) {
        if (txt[i].type === 'text')
            txt[i].value = "";
    }
}

