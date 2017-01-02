/**
 * Write a chat app that can send and receive messages.
 * 
 * Work in pairs; you can find your assigned partner in Slack.
 * 
 * Your goal is to create a working chat app that can be used to send and receive messages. Your application should 
 * display messages that other users have sent, and allow you to send a message yourself. Every user should specify a 
 * username, which should also be sent with each message.
 * 
 * You should use AJAX requests for both GET and POST requests. No refreshing should be necessary for your app to work. 
 * 
 * You also need to style your app on both mobile and desktop.
 * 
 * Teams
 * 
 * It is not ok to have your partner do everything. Its ok for one person to handle most of the CSS and one to handle 
 * most of the JS, but it is not ok to only do CSS or only do JS.
 * 
 * Key features
 * 
 * Allow users to send chats.
 * 
 * Either automatically update messages periodically (interval) or have a button that gets new messages.
 * Styled using a Foundation grid with a small mode (mobile) and large mode (desktop).
 * 
 * API
 * 
 * You'll need to use two different API calls to build your app.
 * 
 * GET http://api.queencityiron.com/chats can be used to get all messages.
 * 
 * POST http://api.queencityiron.com/chats can be used to submit a new message. Messages need to have a from and message 
 * property.
 * 
 * Hard mode
 * 
 * Add some keywords that have special meaning in the messages. For example, you could say that any message starting 
 * with !important gets a red background, or any name following an @, such as @luke would be highlighted in a different 
 * color if its the user's name. You get to pick the meaning as well as the keywords, and feel free to make multiple.
 */

// BEGIN MY NOTES:

// 1. Create a function that 'GETS' info from server upon load

// 2. Function loads all current messages from server and shows them in the "main" section of HTML

// 3. Once loaded, create an a eventListener for clicks that loads ONLY the new messages ('GET' w/ a for loop?)
//     maybe reviews all messages but excludes all but the new? Maybe based on ID?

// 4. Also, create a listener that takes the value of the message box and 'POST's it to the server, as well as
//         adding it as an <li> to the <ul> of the body

// 5. Bonus points for auto-load feature.


window.addEventListener('load', function () {
    console.log("Hi Mom!")      // make sure our function is running

    let ids = [];

    loadMessages();             // run function "loadMessages"

    //console.log(ids);

    submitMessage();               // run function "submitMessage"


    let getBtn = document.querySelector('#get');
    getBtn.addEventListener('click', getMessages); // upon click of getBtn, run function "getMessages"

});

function loadMessages() {       // let's make the function "loadMessages" that we're going to run when the page loads
    console.log('loadMessages running!');
    let chatter = new XMLHttpRequest();   // we'll call our new GET request "chatter"
    chatter.open('GET', 'http://api.queencityiron.com/chats');    // go ahead and open chats: here's what we're doing
    // and where we're getting it. Now we need it to go
    // somewhere...
    chatter.addEventListener('load', function () {         // add an event listener for "chatter" that occurs on load and
        // run an anonymous function...
        let response = JSON.parse(chatter.responseText);    // create "response" which will contain a parsed (for
        // readability) object of the response of the GET request "chatter"
        console.log(response);
        let main = document.querySelector('main'); // main = our chat field
        let parent = document.createElement('ul'); // create a <ul> and call it "parent"
        main.appendChild(parent);                   // add parent to the chat field
        for (let i = 0; i < response.chats.length; i++) {   // run a for loop over what we get from the API
            let from = document.createElement('li');        // create an <li> and call it "from"" in JS
            from.textContent = 'From: ' + response.chats[i].from; // here is what "from" will say inside the <li></li>
            parent.appendChild(from);                               // add <li> "from" to our <ul> "parent"

            let msg = document.createElement('li');         // ALSO create an <li> and call it "msg" in JS
            msg.textContent = "Message: " + response.chats[i].message;  // here is what "msg" will say inside
            parent.appendChild(msg);                            // add <li> "msg" to our <ul> "parent"

            // let count = response.chats.length;
            // console.log(count);
        }                            // end for loop
    });                             // end eventListener function for our GET request
    chatter.send();                                             // DO IT!
};

// NEXT STEPS:
// We have the current messages from the server. Next, we would like to be able to do 2 things:
// 1. Accept the username for the chat app independent of the post request.
// How will we do this? Maybe we could create a POST request that ONLY submits the name.
// Potential problem: will this cause a blank message with only the name to occur?
// MAYBE we create the function soley to return the value of the "submit" box. Then we can append it to the
// POST request before we send?

// UPDATED 1. Create a function to send a POST request to the server that includes both our message and username.

// a. Create new function
function submitMessage() { // here, we're going to create a function that will contain our POST request
    console.log("submitMessage running!");
    let sendBtn = document.querySelector('#send'); // we want it to run only when we click, so let's ID the button
    sendBtn.addEventListener('click', function () {  // and set up an eventListener for clicks
        console.log('send button works!');
        // b. Create a post request
        let push = new XMLHttpRequest();    // start a new AJAX request called "push"
        push.open('POST', 'http://api.queencityiron.com/chats');  // this time, we will push to the URL
        let body = JSON.stringify({                        // create a string for the server to recognize
            from: document.querySelector('#user').value,    // this will be the contents of the "from" property
            message: document.querySelector('#msg').value,  // this will be the contents of the "message" property
        });                                                 // close the "stringify" object
        document.querySelector('#msg').value = '';          // once the above has been "stringified", clear the message box
        // we're going to leave the username box for future msgs
        // c. Send that mess
        push.send(body);                            // send the AJAX POST request
    });
    loadMessages();
};

function getMessages() {
    console.log('getMessages is running!');
        let newMsg = new XMLHttpRequest();
        newMsg.open('GET', 'http://api.queencityiron.com/chats');
        newMsg.addEventListener('load', function() {
        let response = JSON.parse(newMsg.responseText);
        // let count = response.chats.length;
        // console.log(count);
        let main = document.querySelector('main'); // main = our chat field
        let parent = document.createElement('ul'); // create a <ul> and call it "parent"
        main.appendChild(parent);                   // add parent to the chat field
        for (let i = 0; i < response.chats.length; i++) {   // run a for loop over what we get from the API
            let from = document.createElement('li');        // every time it runs, create an <li> and call it "from"
            // in JS
            from.textContent = 'From: ' + response.chats[i].from; // here is what "from" will say inside the <li></li>
            parent.appendChild(from);                               // add <li> "from" to our <ul> "parent"

            let msg = document.createElement('li');         // ALSO create an <li> and call it "msg" in JS
            msg.textContent = "Message: " + response.chats[i].message;  // here is what "msg" will say inside
            parent.appendChild(msg);
        }
    });
            newMsg.send();
};




// -- THE FOLLOWING IS A MISGUIDED ATTEMPT TO CREATE A FUNCTION THAT STORED A USER NAME FOR FUTURE USE--
// function submitMessage() {
//     let submit = document.querySelector('#submit'); // let submit refer to the "submit" button on our HTML page
//     submit.addEventListener('click', function() {   // take submit and add an eventListener for a click;
//                                                     // when that click is heard, run the following function...
//         console.log('button works!');               // (make sure our button is working)...
//         let user = document.querySelector('#user').value; // let user = whatever is in the "user" text box
//         console.log(user);                                // (what is user?)
//         //return user;
//     });
//     console.log(user);
// };
// -- END MISGUIDED ATTEMPT --

// 2. Take the user name and the message and package it into one POST request to submit.


//     let request = new XMLHttpRequest ();
//     request.open('GET', 'http://api.queencityiron/chats');
//     request.addEventListener('load', function() {
//         let response = JSON.parse(request.responseText)
//     });