const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");
const chatMessages = document.getElementById("chatMessages");
const contacts = document.querySelectorAll(".contact");
const chatName = document.getElementById("chatName");

let currentContact = "John";

sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", function(e){
if(e.key==="Enter"){
sendMessage();
}
});

/* Load saved chat */
function loadChat(){
chatMessages.innerHTML = localStorage.getItem(currentContact) || "";
scrollBottom();
}

function saveChat(){
localStorage.setItem(currentContact, chatMessages.innerHTML);
}

/* Switch contacts */
contacts.forEach(contact=>{
contact.addEventListener("click",()=>{
document.querySelector(".active").classList.remove("active");
contact.classList.add("active");
chatName.textContent = contact.textContent;
currentContact = contact.textContent;
loadChat();
});
});

function sendMessage(){
const text = messageInput.value.trim();
if(text==="") return;

addMessage(text,"sent");
messageInput.value="";

showTyping();

setTimeout(()=>{
autoReply(text);
},1000);
}

function addMessage(text,type){
const msg = document.createElement("div");
msg.classList.add("message",type);

const time = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});

msg.innerHTML = `
${text}
<div class="time">${time}</div>
`;

msg.ondblclick = ()=> msg.remove();

chatMessages.appendChild(msg);
saveChat();
scrollBottom();
}

/* Typing indicator */
function showTyping(){
const typing = document.createElement("div");
typing.classList.add("message","received","typing");
typing.id="typingIndicator";
typing.textContent="Typing...";
chatMessages.appendChild(typing);
scrollBottom();
}

/* Smart reply */
function autoReply(userText){

const typing = document.getElementById("typingIndicator");
if(typing) typing.remove();

const text = userText.toLowerCase();
let reply = "I didn't understand that 🤔";

if(text.includes("hi") || text.includes("hello")){
reply="Hi! How are you? 😊";
}
else if(text.includes("how are you")){
reply="I'm doing great! What about you?";
}
else if(text.includes("good")){
reply="That's nice to hear 😄";
}
else if(text.includes("bad") || text.includes("sad")){
reply="Oh no 😔 I'm here for you.";
}
else if(text.includes("name")){
reply="I'm your advanced chat bot 🤖";
}
else if(text.includes("time")){
reply="Current time is " + new Date().toLocaleTimeString();
}
else if(text.includes("date")){
reply="Today is " + new Date().toDateString();
}
else if(text.includes("joke")){
reply="Why do programmers prefer dark mode? Because light attracts bugs 😄";
}
else if(text.includes("bye")){
reply="Goodbye! Take care 👋";
}
else if(text.includes("thank")){
reply="You're welcome 😊";
}
else if(text.includes("love")){
reply="That's sweet ❤️";
}

addMessage(reply,"received");
}

/* Scroll */
function scrollBottom(){
chatMessages.scrollTop = chatMessages.scrollHeight;
}

loadChat();
