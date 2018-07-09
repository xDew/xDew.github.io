var tempWall,
    action = {
        savedElements: {}, //object to save elements placed
        movedElements: {}, //elements that are placed and moved
        wallpaper: '',
        uploadSelection: '', //save type of upload selection (overlay or background)
        selectedItem: '',
        selectedItems: [],
        blurTimeout: null,
        timeout: '',
        lastNotificationTime: false,
        zoomScale: 1.5,
        isScrollingEdit: false,
        actionQueue: [], //Queue of actions for undo/redo
        queuePosition: -1, //The current position within this ↑ queue, which action was most recently done
        isUndoingRedoing: false, //True while it's either undoing or redoing, prevents more from being added to the stack while it's processing the stack
        sizeQueueTimeout: {
            timeout: null,
            isEditingText: false,
            isTimeoutRunning: false,
            previousCssKey: '',
            previousAction: null,
            initialValue: ''
        }
    };
//keep
action.delete = function () {
    if (action.selectedItems.length > 0) {
        for (var i = 0; i < action.selectedItems.length; i++) {
            action.removeFromScreen(action.selectedItems[i], true);
        }
        action.selectedItems = [];
    } else {
        action.removeFromScreen(action.selectedItem, true);
    }
};

//Instead of having the user enter details everytime, just store it.
action.loadUserCredentials = function(){
    var devName = document.getElementById('fdevname'),
    devEmail = document.getElementById('femail');
    $("#fdevname").change(function(){
        localStorage.name = devName.value;
    });
    $("#femail").change(function(){
        localStorage.email = devEmail.value;
    });
    if(localStorage.name){
        devName.value = localStorage.name;
    }
    if(localStorage.email){
        devEmail.value = localStorage.email;
    }
}

action.saveTheme = function() { //saves info to divs and sends form to create plist
    $('.toolPanel').css('display', 'none');
    $('.elementPanel').css('display', 'none');
    $('#tips').css('display', 'none');
    //$('#X').css('display','block');
    html2canvas(document.querySelector('.screen')).then(function(canvas) {
        document.getElementById('previewCanvas').appendChild(canvas);
        setTimeout(function() {
            var ca = document.getElementById('previewCanvas');
            ca.setAttribute('title', "Theme saved, refresh the page");
            ca.className = 'pCanvas';
            ca = ca.children[0];
            var dataURL = ca.toDataURL();
            $('.phone').css('display', 'none'); //dont hide until html2canvas has rendered it.
            $('#elPanel').css('display', 'none');
            $('#roundmenu').css('display', 'none');
            //$('#X').css('display','none');
            $('.newSVG').empty(); //remove svg
            $("body").append('<form id="saveForm"><h3>Enter theme details</h3><label class="flabel">Your Name</label><input type="text" name="fdevname" id="fdevname" placeholder="Your Name"/><label class="flabel">Your Email</label><input type="text" name="femail" id="femail" placeholder="Email@email.com"/><label class="flabel">Theme Name</label><input type="text" name="fthemename" id="fthemename" placeholder="Theme Name"/></br></br><span class="saveNote"><b>Note:</b> If you are testing this theme put the word test somewhere in the theme name. These automatically get deleted after a period of time. I would always use this method unless you are familiar with the creator.</span></br><div class="fsubmit">Submit</div><label class="errorlabel">*must fill in all inputs</label></form>');
            action.loadUserCredentials();
            $('.fsubmit').on('click', function() {
                document.getElementById('loader').style.display = 'block';
                setTimeout(function(){
                    var devname = $('#fdevname').val();
                    var themename = $('#fthemename').val();
                    var email = $('#femail').val();
                    var wallsrc = $('#wallpaper').attr('src');
                    if (wallsrc) {
                        window.location = 'upload:' + themename;
                    }
                    var formData = new FormData();
                    formData.append('fileName', themename);
                    formData.append('email', email);
                    formData.append('devname', devname);
                    formData.append('Tpreview', dataURL);
                    formData.append('Ticon', action.savedElements.iconName || '');
                    formData.append('Toverlay', (action.savedElements.overlay) ? action.savedElements.overlay : '');
                    formData.append('Telements', JSON.stringify(action.savedElements.placedElements) || '');
                    $.ajax({
                        url: 'http://lockplus.us/creator/php/exportiOS.php',
                        data: formData,
                        processData: false,
                        contentType: false,
                        type: 'POST',
                        success: function(msg) {
                            if (msg === "Exists") {
                                alert('The name you used already exists, please try another');
                                document.getElementById('loader').style.display = 'none';
                            } else if (msg === 'http://lockplus.us/php/dump.php') {
                                location.href = msg;
                            } else {
                                alert("Whoops there was an error, please report to @JunesiPhone " + msg);
                                document.getElementById('loader').style.display = 'none';
                            }
                            imageData = nil;
                            document.getElementById('loader').style.display = 'none';
                        }
                    });
                },300);
            });
        }, 0);
    });
};


