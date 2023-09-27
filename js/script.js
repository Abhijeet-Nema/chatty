// Grabbing the elements
const inputMessage = document.getElementById("inputMessage");
const sendButtonDiv = document.getElementById("sendButtonDiv");
const joinBtn = document.getElementById("joinBtn");
const searchbar = document.getElementById("searchbar");
const chatsContainer = document.getElementById("chatsContainer");
const contactTiles = document.getElementById("contactTiles");
const groupTime = document.getElementById("groupTime");
const mobileSlider = document.getElementById("mobileSlider");
const arrow = document.getElementById("arrow");
const contacts = document.querySelector(".contacts")

let user;
let usersOnline = [];
let isSliderOpened = true;
const socket = io("http://localhost:3000")

const getCurrentTime = ()=>{
  let today = new Date()
    let hour = today.getHours()
    let minutes = today.getMinutes()

    hour = (hour<9)?"0"+hour:hour
    minutes = (minutes<9)?"0"+minutes:minutes

    return `${hour}:${minutes}`;
}

groupTime.innerText = getCurrentTime()

const toggleSlider = ()=>{
  if (isSliderOpened){
    mobileSlider.classList.remove("arrowOpened")
    mobileSlider.classList.add("arrowClosed")
    contacts.style.top = "-75%";
    arrow.style.transform = "rotateZ(180deg)";
  }
  else {
    mobileSlider.classList.remove("arrowClosed")
    mobileSlider.classList.add("arrowOpened")
    contacts.style.top = "0%";
    arrow.style.transform = "rotateZ(0deg)";
  }
  isSliderOpened = !isSliderOpened
}

const addNewUser = (user)=>{
    // console.log(hour, minutes)

    contactTiles.innerHTML += `
        <div class="contactTile">
            <div class="contactDp">
                <img src="https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg" alt="">
            </div>
            <div class="contactsDetail">
                <div class="name">${user}</div>
                <div class="status">Online</div>
            </div>
            <div class="lastTime">${getCurrentTime()}</div>
        </div>
    `
}

const notifyOthers = (username, status)=>{
  chatsContainer.innerHTML += `
  <div class="messageDivW100 js-start">
      <div class="message notif segoeText">
          ${username} has ${status} the chat! 
      </div>
  </div> 
  `
}

const showUsers = (onlineList)=>{
  contactTiles.innerHTML = ""
  onlineList.forEach(e=>{
    addNewUser(e)
  })
}

const addMessage = (sender="You", message, dir, jcDir)=>{
  console.log((sender!="You")?"":'<span aria-label=" Read " data-icon="msg-dblcheck" class="ajgik1ph"><svg viewBox="0 0 16 11" height="9" width="14" preserveAspectRatio="xMidYMid meet" class="" fill="none"><path d="M11.0714 0.652832C10.991 0.585124 10.8894 0.55127 10.7667 0.55127C10.6186 0.55127 10.4916 0.610514 10.3858 0.729004L4.19688 8.36523L1.79112 6.09277C1.7488 6.04622 1.69802 6.01025 1.63877 5.98486C1.57953 5.95947 1.51817 5.94678 1.45469 5.94678C1.32351 5.94678 1.20925 5.99544 1.11192 6.09277L0.800883 6.40381C0.707784 6.49268 0.661235 6.60482 0.661235 6.74023C0.661235 6.87565 0.707784 6.98991 0.800883 7.08301L3.79698 10.0791C3.94509 10.2145 4.11224 10.2822 4.29844 10.2822C4.40424 10.2822 4.5058 10.259 4.60313 10.2124C4.70046 10.1659 4.78086 10.1003 4.84434 10.0156L11.4903 1.59863C11.5623 1.5013 11.5982 1.40186 11.5982 1.30029C11.5982 1.14372 11.5348 1.01888 11.4078 0.925781L11.0714 0.652832ZM8.6212 8.32715C8.43077 8.20866 8.2488 8.09017 8.0753 7.97168C7.99489 7.89128 7.8891 7.85107 7.75791 7.85107C7.6098 7.85107 7.4892 7.90397 7.3961 8.00977L7.10411 8.33984C7.01947 8.43717 6.97715 8.54508 6.97715 8.66357C6.97715 8.79476 7.0237 8.90902 7.1168 9.00635L8.1959 10.0791C8.33132 10.2145 8.49636 10.2822 8.69102 10.2822C8.79681 10.2822 8.89838 10.259 8.99571 10.2124C9.09304 10.1659 9.17556 10.1003 9.24327 10.0156L15.8639 1.62402C15.9358 1.53939 15.9718 1.43994 15.9718 1.32568C15.9718 1.1818 15.9125 1.05697 15.794 0.951172L15.4386 0.678223C15.3582 0.610514 15.2587 0.57666 15.1402 0.57666C14.9964 0.57666 14.8715 0.635905 14.7657 0.754395L8.6212 8.32715Z" fill="currentColor"></path></svg></span>');
  chatsContainer.innerHTML += `
  <div class="messageDivW100 js-${jcDir}">
      <div class="message ${dir} segoeText">
          ${(sender=="You")?"":"<strong>"+sender+": </strong>"}${message} 
          <span data-icon="tail-out" class="tail-out tail-out-${dir}"><svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 8 13" xml:space="preserve"><path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path><path fill="currentColor" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path></svg></span>

          <div class="sentTime">${getCurrentTime()}
          ${(sender!="You")?"":'<span aria-label=" Read " data-icon="msg-dblcheck" class="ajgik1ph"><svg viewBox="0 0 16 11" height="9" width="14" preserveAspectRatio="xMidYMid meet" class="" fill="none"><path d="M11.0714 0.652832C10.991 0.585124 10.8894 0.55127 10.7667 0.55127C10.6186 0.55127 10.4916 0.610514 10.3858 0.729004L4.19688 8.36523L1.79112 6.09277C1.7488 6.04622 1.69802 6.01025 1.63877 5.98486C1.57953 5.95947 1.51817 5.94678 1.45469 5.94678C1.32351 5.94678 1.20925 5.99544 1.11192 6.09277L0.800883 6.40381C0.707784 6.49268 0.661235 6.60482 0.661235 6.74023C0.661235 6.87565 0.707784 6.98991 0.800883 7.08301L3.79698 10.0791C3.94509 10.2145 4.11224 10.2822 4.29844 10.2822C4.40424 10.2822 4.5058 10.259 4.60313 10.2124C4.70046 10.1659 4.78086 10.1003 4.84434 10.0156L11.4903 1.59863C11.5623 1.5013 11.5982 1.40186 11.5982 1.30029C11.5982 1.14372 11.5348 1.01888 11.4078 0.925781L11.0714 0.652832ZM8.6212 8.32715C8.43077 8.20866 8.2488 8.09017 8.0753 7.97168C7.99489 7.89128 7.8891 7.85107 7.75791 7.85107C7.6098 7.85107 7.4892 7.90397 7.3961 8.00977L7.10411 8.33984C7.01947 8.43717 6.97715 8.54508 6.97715 8.66357C6.97715 8.79476 7.0237 8.90902 7.1168 9.00635L8.1959 10.0791C8.33132 10.2145 8.49636 10.2822 8.69102 10.2822C8.79681 10.2822 8.89838 10.259 8.99571 10.2124C9.09304 10.1659 9.17556 10.1003 9.24327 10.0156L15.8639 1.62402C15.9358 1.53939 15.9718 1.43994 15.9718 1.32568C15.9718 1.1818 15.9125 1.05697 15.794 0.951172L15.4386 0.678223C15.3582 0.610514 15.2587 0.57666 15.1402 0.57666C14.9964 0.57666 14.8715 0.635905 14.7657 0.754395L8.6212 8.32715Z" fill="currentColor"></path></svg></span>'}

      </div>
      </div>
  </div>
  `
}

const sendMessage = ()=>{
  let message = inputMessage.value;
  console.log(message);
  addMessage("You", message, "right", "end");
  socket.emit("newMessageSent", message)
  inputMessage.value = ""
  sendButtonDiv.innerHTML = `
        <span data-icon="ptt" class="icons"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24" xml:space="preserve"><path fill="currentColor" d="M11.999,14.942c2.001,0,3.531-1.53,3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531 S8.469,2.35,8.469,4.35v7.061C8.469,13.412,9.999,14.942,11.999,14.942z M18.237,11.412c0,3.531-2.942,6.002-6.237,6.002 s-6.237-2.471-6.237-6.002H3.761c0,4.001,3.178,7.297,7.061,7.885v3.884h2.354v-3.884c3.884-0.588,7.061-3.884,7.061-7.885 L18.237,11.412z"></path></svg></span>
        `;
}

// Adding messages to the chatbox
inputMessage.addEventListener("keydown", (e)=>{
  // console.log(e.key);
  if (e.key == "Enter"){
    if (inputMessage.value.trim() != "") {
      sendMessage()
    }
  }
})

// Replacing mic button with send btn
inputMessage.addEventListener("input", (e) => {
  // console.log(e)
  if (e.target.value.trim() != "") {
    sendButtonDiv.innerHTML = `
        <span data-icon="send" id="sendMessageButton" class="icons"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24" xml:space="preserve"><path fill="currentColor" d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path></svg></span>
        `;
        let sendMessageButton = document.getElementById("sendMessageButton");
        // console.log(sendMessageButton);
        sendMessageButton.addEventListener("click", sendMessage)
  } else {
    sendButtonDiv.innerHTML = `
        <span data-icon="ptt" class="icons"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24" xml:space="preserve"><path fill="currentColor" d="M11.999,14.942c2.001,0,3.531-1.53,3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531 S8.469,2.35,8.469,4.35v7.061C8.469,13.412,9.999,14.942,11.999,14.942z M18.237,11.412c0,3.531-2.942,6.002-6.237,6.002 s-6.237-2.471-6.237-6.002H3.761c0,4.001,3.178,7.297,7.061,7.885v3.884h2.354v-3.884c3.884-0.588,7.061-3.884,7.061-7.885 L18.237,11.412z"></path></svg></span>
        `;
  }
});

joinBtn.addEventListener("click", () => {
  if (searchbar.value.trim() == "") {
    searchbar.value = "";
    searchbar.placeholder = "Please enter a valid name to join!";
  } else {
    user = searchbar.value;
    searchbar.value = `You've joined the chat as "${user}".`;
    searchbar.disabled = true;
    searchbar.style.color = "rgb(8 183 151)";
    joinBtn.disabled = true;
    inputMessage.disabled = false;
    inputMessage.placeholder = "Type a message";

    // Emitting userJoined event to socket
    socket.emit("userJoined", user)
    // addNewUser(user + " (Me)")

    // Using js with media query
    let mobileWidth = window.matchMedia("(max-width: 768px)")
    if (mobileWidth.matches){
      toggleSlider()
    }
  }
});


socket.addEventListener("alertUserJoined", (data)=>{
    console.log(data);
    usersOnline = [...data.users];
    // chatsContainer.innerHTML = ""
    // data.users.forEach(e=>{
    //     addNewUser(e)
    // })
    if (user){
      showUsers(usersOnline)
      notifyOthers(data.name, "joined")  
    }
})

// When someone leaves the chat
socket.addEventListener("userDisconnected", ({name, id, users})=>{
  if (user){
    usersOnline = [...users];
    showUsers(users)
    notifyOthers(name, "left")
  }
})

// When a new message is recieved
socket.addEventListener("recieveMessage", ({message, name, users})=>{
  if (user){
    addMessage(name, message, "left", "start")
  }
})


mobileSlider.addEventListener("click", toggleSlider)