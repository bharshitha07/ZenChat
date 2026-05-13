// ======================
// FIREBASE CONFIG
// ======================

const firebaseConfig = {

  apiKey:
  "AIzaSyAxhtyGpNyRGFG1hXWfMhfI8G7FLi15FWE",

  authDomain:
  "zenchat-0707.firebaseapp.com",

  projectId:
  "zenchat-0707",

  storageBucket:
  "zenchat-0707.firebasestorage.app",

  messagingSenderId:
  "851286825689",

  appId:
  "1:851286825689:web:0a810a61bd3e89fa27bcc8"

};


// ======================
// INITIALIZE FIREBASE
// ======================

firebase.initializeApp(
  firebaseConfig
);

const auth =
firebase.auth();


// ======================
// ELEMENTS
// ======================

const authPage =
document.getElementById(
  "authPage"
);

const mainApp =
document.getElementById(
  "mainApp"
);

const username =
document.getElementById(
  "username"
);

const password =
document.getElementById(
  "password"
);

const loginBtn =
document.getElementById(
  "loginBtn"
);

const signupBtn =
document.getElementById(
  "signupBtn"
);

const googleLoginBtn =
document.getElementById(
  "googleLoginBtn"
);

const logoutBtn =
document.getElementById(
  "logoutBtn"
);

const chatBox =
document.getElementById(
  "chatBox"
);

const userInput =
document.getElementById(
  "userInput"
);

const sendBtn =
document.getElementById(
  "sendBtn"
);

const micBtn =
document.getElementById(
  "micBtn"
);

const historyList =
document.getElementById(
  "historyList"
);

const clearHistoryBtn =
document.getElementById(
  "clearHistoryBtn"
);

const toggleHistoryBtn =
document.getElementById(
  "toggleHistoryBtn"
);

const historyPanel =
document.getElementById(
  "historyPanel"
);

const shareBtn =
document.getElementById(
  "shareBtn"
);

const galleryBtn =
document.getElementById(
  "galleryBtn"
);

const uploadMenu =
document.getElementById(
  "uploadMenu"
);

const imageUpload =
document.getElementById(
  "imageUpload"
);

const videoUpload =
document.getElementById(
  "videoUpload"
);

const fileUpload =
document.getElementById(
  "fileUpload"
);


// ======================
// API
// ======================

const API_KEY =
"YOUR_API_KEY";


// ======================
// CHAT STORAGE
// ======================

let currentChat = [];

let savedChats =

JSON.parse(
  localStorage.getItem(
    "savedChats"
  )
) || [];


// ======================
// GOOGLE LOGIN
// ======================

googleLoginBtn.onclick =
async () => {

  const provider =

  new firebase.auth
  .GoogleAuthProvider();

  provider.setCustomParameters({

    prompt:"select_account"

  });

  try{

    await auth
    .signInWithPopup(
      provider
    );

  }

  catch(error){

    alert(
      error.message
    );

  }

};


// ======================
// AUTH STATE
// ======================

auth.onAuthStateChanged(
  user => {

    if(user){

      authPage.style.display =
      "none";

      mainApp.style.display =
      "flex";

    }

    else{

      authPage.style.display =
      "flex";

      mainApp.style.display =
      "none";

    }

  }
);


// ======================
// SIGNUP
// ======================
// ======================
// AUTH BOXES
// ======================

const loginBox =
document.getElementById(
  "loginBox"
);

const signupBox =
document.getElementById(
  "signupBox"
);

const openSignup =
document.getElementById(
  "openSignup"
);

const openLogin =
document.getElementById(
  "openLogin"
);


// ======================
// SWITCH AUTH
// ======================

openSignup.onclick = () => {

  loginBox.style.display =
  "none";

  signupBox.style.display =
  "flex";

};


openLogin.onclick = () => {

  signupBox.style.display =
  "none";

  loginBox.style.display =
  "flex";

};


// ======================
// GOOGLE LOGIN
// ======================

googleLoginBtn.onclick =
async () => {

  const provider =

  new firebase.auth
  .GoogleAuthProvider();

  provider.setCustomParameters({

    prompt:"select_account"

  });

  try{

    await auth
    .signInWithPopup(
      provider
    );

  }

  catch(error){

    alert(error.message);

  }

};


// ======================
// SIGNUP
// ======================

signupBtn.onclick =
async () => {

  const email =

  document.getElementById(
    "signupEmail"
  ).value.trim();

  const password =

  document.getElementById(
    "signupPassword"
  ).value.trim();


  if(email === "" || password === ""){

    alert(
      "Fill all fields"
    );

    return;

  }


  try{

    const userCredential =

    await auth
    .createUserWithEmailAndPassword(
      email,
      password
    );


    // SEND VERIFY MAIL

    await userCredential.user
    .sendEmailVerification();


    alert(

      "Verification email sent. Check inbox/spam."

    );


    // LOGOUT AFTER SIGNUP

    await auth.signOut();


    signupBox.style.display =
    "none";

    loginBox.style.display =
    "flex";

  }

  catch(error){

    alert(error.message);

  }

};


// ======================
// LOGIN
// ======================

loginBtn.onclick =
async () => {

  const email =

  document.getElementById(
    "loginEmail"
  ).value.trim();

  const password =

  document.getElementById(
    "loginPassword"
  ).value.trim();


  if(email === "" || password === ""){

    alert(
      "Fill all fields"
    );

    return;

  }


  try{

    const userCredential =

    await auth
    .signInWithEmailAndPassword(
      email,
      password
    );


    // REFRESH USER

    await userCredential.user
    .reload();


    const user =
    auth.currentUser;


    // EMAIL CHECK

    if(!user.emailVerified){

      alert(
        "Please verify your email before login"
      );

      await auth.signOut();

      return;

    }


    authPage.style.display =
    "none";

    mainApp.style.display =
    "flex";

  }

  catch(error){

    alert(error.message);

  }

};


// ======================
// AUTH STATE
// ======================

auth.onAuthStateChanged(
  user => {

    if(user){

      authPage.style.display =
      "none";

      mainApp.style.display =
      "flex";

    }

    else{

      authPage.style.display =
      "flex";

      mainApp.style.display =
      "none";

    }

  }
);


// ======================
// LOGOUT
// ======================

logoutBtn.onclick =
async () => {

  await auth.signOut();

};
// ======================
// SHARE BUTTON
// ======================

shareBtn.onclick =
async () => {

  try{

    await navigator.share({

      title:"ZenChat",

      text:
      "Try ZenChat AI",

      url:
      window.location.href

    });

  }

  catch(error){

    navigator.clipboard
    .writeText(
      window.location.href
    );

    alert("Link copied");

  }

};


// ======================
// MESSAGE FUNCTION
// ======================

function addMessage(
  text,
  className
){

  const div =
  document.createElement("div");

  div.classList.add(
    className
  );

  div.innerHTML = text;


  // BUTTON BOX

  const buttonBox =
  document.createElement("div");

  buttonBox.classList.add(
    "message-buttons"
  );


  // COPY

  const copyBtn =
  document.createElement("button");

  copyBtn.innerHTML = "⎘";

  copyBtn.classList.add(
    "copy-btn"
  );

  copyBtn.onclick = () => {

    navigator.clipboard
    .writeText(text);

  };


  // SPEAK

  const speakBtn =
  document.createElement("button");

  speakBtn.innerHTML = "◉";

  speakBtn.classList.add(
    "speak-btn"
  );

  speakBtn.onclick = () => {

    const speech =

    new SpeechSynthesisUtterance(
      text
    );

    speech.lang = "en-US";

    window.speechSynthesis
    .speak(speech);

  };


  buttonBox.appendChild(
    copyBtn
  );

  buttonBox.appendChild(
    speakBtn
  );

  div.appendChild(
    buttonBox
  );

  chatBox.appendChild(div);

  chatBox.scrollTop =
  chatBox.scrollHeight;

}


// ======================
// IMAGE PREVIEW
// ======================

// ======================
// MULTIPLE IMAGE PREVIEW
// ======================

// ======================
// MULTIPLE IMAGE PREVIEW
// ======================

let pastedImages = [];

// ADD THIS
let pastedImage = null;


// ======================
// IMAGE PASTE
// ======================

document.addEventListener(

  "paste",

  (event) => {

    const items =
    event.clipboardData.items;


    for(let item of items){

      if(

        item.type.indexOf(
          "image"
        ) !== -1

      ){

        const file =
        item.getAsFile();

        pastedImages.push(file);


        let previewContainer =

        document.querySelector(
          ".paste-preview"
        );


        // CREATE PREVIEW BOX

        if(!previewContainer){

          previewContainer =

          document.createElement(
            "div"
          );

          previewContainer.className =
          "paste-preview";


          document
          .querySelector(
            ".input-area"
          )
          .prepend(
            previewContainer
          );

        }


        // IMAGE BOX

        const imageBox =

        document.createElement(
          "div"
        );

        imageBox.className =
        "preview-image-box";


        // IMAGE

        const img =
        document.createElement("img");

        img.src =
        URL.createObjectURL(file);


        // REMOVE BUTTON

        const removeBtn =

        document.createElement(
          "button"
        );

        removeBtn.innerHTML = "✖";

        removeBtn.className =
        "remove-preview";


        removeBtn.onclick = () => {

          imageBox.remove();

          pastedImages =
          pastedImages.filter(
            img => img !== file
          );

        };


        imageBox.appendChild(img);

        imageBox.appendChild(
          removeBtn
        );

        previewContainer.appendChild(
          imageBox
        );

      }

    }

  }

);
async function buyPlan(plan){

  const response =

  await fetch(

    "http://localhost:5000/create-payment",

    {

      method:"POST",

      headers:{

        "Content-Type":"application/json"

      },

      body:JSON.stringify({

        plan:plan

      })

    }

  );


  const data =
  await response.json();


  // REDIRECT TO PHONEPE

  window.location.href =
  data.redirectUrl;

}

// ======================
// SEND MESSAGE
// ======================

sendBtn.addEventListener(
  "click",
  sendMessage
);


userInput.addEventListener("keypress", (e) => {

  if(e.key === "Enter" && !e.shiftKey){

    e.preventDefault();

    sendMessage();

  }

});

  (e) => {

    if(

      e.key === "Enter" &&

      !e.shiftKey

    ){

      e.preventDefault();

      sendMessage();

    }

  }



async function sendMessage(){

  const message =
  userInput.value.trim();


  if(

    message === "" &&

    !pastedImage

  ) return;


  const userDiv =
  document.createElement("div");

  userDiv.classList.add(
    "user-message"
  );


  // IMAGE

  if(pastedImage){

    userDiv.innerHTML += `

      <img
        src="${URL.createObjectURL(
          pastedImage
        )}"
        style="
          max-width:220px;
          border-radius:12px;
          margin-bottom:8px;
        "
      >

    `;

  }


  // TEXT

  if(message !== ""){

    userDiv.innerHTML +=
    message;

  }


  chatBox.appendChild(
    userDiv
  );

  chatBox.scrollTop =
  chatBox.scrollHeight;


  currentChat.push({

    role:"user",

    content:message

  });


  userInput.value = "";


  document.querySelector(
    ".paste-preview"
  )?.remove();

  pastedImage = null;


  // TYPING

  const typing =
  document.createElement("div");

  typing.classList.add(
    "bot-message"
  );

  typing.id = "typing";

  typing.innerHTML =
  "Typing...";

  chatBox.appendChild(
    typing
  );


  try{

    const response =
    await fetch(

      "https://api.groq.com/openai/v1/chat/completions",

      {

        method:"POST",

        headers:{

          "Content-Type":
          "application/json",

          "Authorization":
          `Bearer ${API_KEY}`

        },

        body:JSON.stringify({

          model:
          "llama-3.1-8b-instant",

          messages:[

            {

              role:"system",

              content:`

You are ZenChat AI.

Always answer:
- clearly
- step-by-step
- beginner friendly
- clean format

`

            },

            ...currentChat

          ]

        })

      }

    );

    const data =
    await response.json();

    document.getElementById(
      "typing"
    )?.remove();

    const botReply =

    data.choices[0]
    .message.content;

    addMessage(
      botReply,
      "bot-message"
    );

    currentChat.push({

      role:"assistant",

      content:botReply

    });

  }

  catch(error){

    document.getElementById(
      "typing"
    )?.remove();

    addMessage(

      "Error connecting AI",

      "bot-message"

    );

  }

}


// ======================
// MIC
// ======================

const SpeechRecognition =

window.SpeechRecognition ||

window.webkitSpeechRecognition;

const recognition =
new SpeechRecognition();

recognition.lang = "en-US";

recognition.onresult =
(event) => {

  userInput.value =

  event.results[0][0]
  .transcript;

};

micBtn.onclick = () => {

  recognition.start();

};


// ======================
// UPLOAD MENU
// ======================

galleryBtn.onclick = (e) => {

  e.stopPropagation();

  uploadMenu.style.display =

  uploadMenu.style.display ===
  "flex"

  ? "none"

  : "flex";

};


document.addEventListener(
  "click",
  () => {

    uploadMenu.style.display =
    "none";

  }
);


// ======================
// IMAGE
// ======================

imageUpload.onchange = e => {

  const file =
  e.target.files[0];

  if(!file) return;

  pastedImage = file;

};


// ======================
// VIDEO
// ======================

videoUpload.onchange = e => {

  const file =
  e.target.files[0];

  if(!file) return;

  addMessage(

    `
    <video controls width="240">
      <source src="${URL.createObjectURL(file)}">
    </video>
    `,

    "user-message"

  );

};


// ======================
// FILE
// ======================

fileUpload.onchange = e => {

  const file =
  e.target.files[0];

  if(!file) return;

  addMessage(

    "📁 " + file.name,

    "user-message"

  );

};


// ======================
// HISTORY SAVE
// ======================

window.addEventListener(

  "beforeunload",

  () => {

    if(currentChat.length > 0){

      const userMessages =

      currentChat

      .filter(
        msg => msg.role === "user"
      )

      .map(
        msg => msg.content
      );

      let topic =

      userMessages[0]
      ?.split(" ")
      .slice(0,4)
      .join(" ")

      || "New Chat";

      savedChats.push({

        title:topic,

        messages:currentChat

      });

      localStorage.setItem(

        "savedChats",

        JSON.stringify(savedChats)

      );

    }

  }

);


// ======================
// DISPLAY HISTORY
// ======================

function displayHistory(){

  historyList.innerHTML = "";

  [...savedChats]

  .reverse()

  .forEach(chat => {

    const div =
    document.createElement("div");

    div.classList.add(
      "history-item"
    );

    div.innerHTML =
    chat.title;

    div.onclick = () => {

      chatBox.innerHTML = "";

      chat.messages.forEach(
        msg => {

          addMessage(

            msg.content,

            msg.role === "user"

            ? "user-message"

            : "bot-message"

          );

        }
      );

    };

    historyList.appendChild(
      div
    );

  });

}

displayHistory();


// ======================
// CLEAR HISTORY
// ======================

clearHistoryBtn.onclick = () => {

  localStorage.removeItem(
    "savedChats"
  );

  savedChats = [];

  historyList.innerHTML = "";

};


// ======================
// TOGGLE HISTORY
// ======================

toggleHistoryBtn.onclick = () => {

  historyPanel.classList.toggle(
    "hide"
  );

};


// ======================
// AUTO TEXTAREA HEIGHT
// ======================

userInput.addEventListener(

  "input",

  () => {

    userInput.style.height =
    "auto";

    userInput.style.height =

    userInput.scrollHeight +
    "px";

  }

);