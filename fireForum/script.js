var dbHandler = firebase.database().ref();
var provider = new firebase.auth.GithubAuthProvider();
var andPic = 'sancho.jpg'
var up = '';
var dn = '';
var ref = firebase.database().ref("/Comments");

ref.on("child_added", function(snapshot){addListElement(snapshot.val());})

//function fired upon pressing login button, handles authentication
function loginFunction(){
    //auth with a popup window
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var user = result.user;
        if(user.photoURL != null){
                $('#gitPic').attr('src',user.photoURL);
                up = user.photoURL;
        }
        else{
            up = andPic;
        }
        if(user.displayName != "")
        {
            dn = user.displayName;
        }
        else
        {
            dn = "anon";
        }
    });
    
}

//function to send a new message to the database *WILL FAIL ON AUTH FAILURE*
function fireMessage()
{
    if(dn == '' || up == '')
    {
        alert("Please sign in first!");
        document.getElementById("messageData").value = "";
        return;
    }
    var messageContents = document.getElementById("messageData").value;
        
    document.getElementById("messageData").value  = ""; 
    
    var ref = firebase.database().ref("/Comments");

    ref.push({
        comment: messageContents,
        userPhoto: up,
        DisplayName: dn
        });

}//fireMessage



//Handle logging out. Reset OAUTH stuff
function logoutFunction()
{
    //uses a promise to detect success/error
    firebase.auth().signOut().then(function()
    {
        $('#gitPic').attr('src', andPic);
    },
    function(error)
    {
        console.log("You broke me! Bastard!");
    });
    dn = '';
    up = '';
}//logout function

function addListElement(message)
{
    
//maybe use css3 keyframe animation to make messages animate in when they  load
    //test
    //console.log(message);
        //make all the elements and fill them with data
       
        var list = document.getElementById("messList");
        var messContainer = document.createElement('a');
        messContainer.setAttribute("class", "list-group-item messageLoad");
        
        var messContentElm = document.createElement('p');
        var messContent = document.createTextNode(message.comment);
        messContentElm.appendChild(messContent);
        messContentElm.setAttribute("class","list-group-item-text");
        
        var user_image = document.createElement('img');
        user_image.setAttribute("src", message.userPhoto);
        user_image.setAttribute("class", 'gitPic')
        
        var messDisplayNameElm = document.createElement('small');
        var messDisplayName = document.createTextNode(message.DisplayName);
        messDisplayNameElm.appendChild(messDisplayName);
        
        messContainer.appendChild(user_image);    
        messContainer.appendChild(messContentElm);
        messContainer.appendChild(messDisplayNameElm);

        list.appendChild(messContainer);
}

function clickMeFire(){
    var screenTop = $(document).scrollTop();
    $('popupFire').css('top', $(document).scrollTop);
    $(".overlayFire, .popupFire").fadeToggle();
}

function clickMeTwist(){
    var screenTop = $(document).scrollTop();
    $('popupTwist').css('top', screenTop);
    $(".overlayTwist, .popupTwist").fadeToggle();
}

function overTwist(){
    $(".overlayTwist, .popupTwist").fadeToggle();
}
function overFire(){
    $(".overlayFire, .popupFire").fadeToggle();
}
