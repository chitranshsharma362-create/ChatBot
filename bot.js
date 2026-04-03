function openfile() {
    document.getElementById("fileinput").click();
}

document.getElementById("fileinput").addEventListener("change", function () {
    const preview = document.getElementById("preview");
    preview.innerHTML = "";

    const files = this.files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.type.startsWith("image/")) {
            const img = document.createElement("img");
            img.src = URL.createObjectURL(file);

            img.style.width = "80px";
            img.style.height = "80px";
            img.style.objectFit = "cover";
            img.style.borderRadius = "10px";
            img.style.margin = "5px";

            preview.appendChild(img);
        }
    }
});

const input = document.querySelector(".input-box");
const mic = document.getElementById("mic");
const voco = document.getElementById("voco");
const send = document.getElementById("send");
const chatContainer = document.getElementById("chat-container");

input.addEventListener("input", function () {
    if (this.value.trim() !== "") {
        mic.style.display = "none";
        voco.style.display = "none";
        send.style.display = "block";
    } else {
        mic.style.display = "block";
        voco.style.display = "block";
        send.style.display = "none";
    }
});

function sendMessage() {
    const text = input.value.trim();
    if (text === "") return;

    const msg = document.createElement("div");
    msg.classList.add("message", "user");
    msg.innerText = text;

    chatContainer.appendChild(msg);

    input.value = "";

    mic.style.display = "block";
    voco.style.display = "block";
    send.style.display = "none";


    chatContainer.scrollTop = chatContainer.scrollHeight;

    botReply(text);
}

send.addEventListener("click", sendMessage);

input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

function botReply(userText) {
    setTimeout(() => {
        const reply = document.createElement("div");
        reply.classList.add("message", "bot");

        userText = userText.toLowerCase();

        let response;

        if (userText.includes("hi") || userText.includes("hello")) {
            response = "Hello , How may i help you?";
        } else if (
            userText.includes("kaise ho") ||
            userText.includes("how are you")
        ) {
            response = "I'm good , What about you?.";

        } else if (userText.toLowerCase().includes("time")) {
            response = "Abhi time hua hai : " + new Date().toLocaleTimeString();
        } else if (userText.toLowerCase().includes("date")) {
            response = "Aaj ki Date hai : " + new Date().toLocaleDateString();
        } else if (userText.includes("mausam") || userText.includes("weather")) {
            response = "Aaj mausam kaafi acha  hai 😄";
        } else if (
            userText.includes("aaj ka din") ||
            userText.includes("din kaisa") ||
            userText.includes("day kaisa")
        ) {
            const replies = [
                "Mera ek dmm thik , apna batao 😄",
                "Thoda busy raha 🤔\n Tumhara din kaisa rhaa? ",
                "Mast productive day raha🔥 \n Tumhara din kaida rha?",
                "Thoda tiring but theek tha 😅 \n Tumhara din kaisa rha? ",
                "Aaj ka din interesting raha hai 😎 \n Tumhara din kaisa rha?"
            ];

            response = replies[Math.floor(Math.random() * replies.length)];
        } else if (
            userText.includes("joke") ||
            userText.includes("funny") ||
            userText.includes("joke sunao")
        ) {
            const jokes = [
                "Teacher: Homework kyu nahi kiya?\nStudent: Sir light chali gayi thi.\nTeacher: To din me kar lete!\nStudent: Sir din me to light thi 😄",

                "Programmer ka breakup kyu hua?\nKyuki usne kaha: 'You deserve better version' 😂",

                "Doctor: Aapko kya problem hai?\nPatient: Sir neend nahi aati.\nDoctor: Mobile side me rakh do.\nPatient: Sir ye bhi koi solution hai 😅",

                "WiFi slow ho to insaan kya karta hai?\nRouter ko ghurta hai jaise wo sharma ke fast ho jayega 😂"
            ];

            response = jokes[Math.floor(Math.random() * jokes.length)];
        } else if (/^[0-9+\-*/(). ]+$/.test(userText)) {
            try {
                let result = eval(userText);
                response = "Answer: " + result;
            } catch {
                response = "Galat expression hai 😅";
            }
        } else if (
            userText.includes("tum kon ho") ||
            userText.includes("who are you?")
        ) {
            response = "Main ek smart chatbot hu 😎 apna friend bhi keh sakta hai";
        }

        else if (
            userText.includes("tum kya krr sakte ho")
        ) {
            response = "Main jokes suna sakta hu 😂, maths solve kar sakta hu 🧮, aur tere sawaal ka jawab de sakta hu 😎";
        }

        else if (
            userText.includes("tum insaan ho") ||
            userText.includes("are you human")
        ) {
            response = "Nahi 😄 main AI hu, par feel bilkul human wali deta hu";
        }

        else if (
            userText.includes("tumhara naam kya hai") ||
            userText.includes("your name?")
        ) {
            response = "Mera naam abhi aapne decide nahi kiya 😏 ";
        }

        else if (
            userText.includes("kya kar rahe ho") ||
            userText.includes("you doing?")
        ) {
            response = "Im waiting to help you 😎";
        }

        else if (
            userText.includes("bore ho raha hu") ||
            userText.includes("Im getting bore?")
        ) {
            response = "Chal ek joke sunata hu 😂 ya game khelenge?";
        }

        else if (
            userText.includes("love you")
        ) {
            response = "Arey 😄 main bhi tumhe pasand karta hu ❤️";
        }

        else if (
            userText.includes("thank you") ||
            userText.includes("thanks")
        ) {
            response = "Welcome bhai 😎 kabhi bhi puch lena";
        }

        else if (
            userText.includes("bye")
        ) {
            response = "Bye👋 fir milte hain 😄";
        }

        reply.innerText = response;

        chatContainer.appendChild(reply);
        chatContainer.scrollTop = chatContainer.scrollHeight;

    }, 1000);
}

const micBtn = document.getElementById("mic");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    micBtn.addEventListener("click", () => {
        recognition.start();
    });

    recognition.onresult = function (event) {
        const speechText = event.results[0][0].transcript;

        input.value = speechText;

        input.dispatchEvent(new Event("input"));
    };

    recognition.onerror = function (event) {
        console.log("Error:", event.error);
    };

} else {
    alert("Speech Recognition supported nahi hai browser me ❌");
}

function speakText(text) {

    text = text.replace(/[^\p{L}\p{N}\p{P}\p{Z}]/gu, "");

    const speech = new SpeechSynthesisUtterance(text);

    const voices = window.speechSynthesis.getVoices();

    const selectedVoice =
        
        voices.find(v => v.lang.includes("hi-IN")) ||   
        voices.find(v => v.name.includes("Hindi")) ||
        voices.find(v => v.name.includes("India")) ||   
        voices[0];

    speech.voice = selectedVoice;

    speech.lang = "en-US";
    speech.rate = 1.2;   // thoda slow = natural
    speech.pitch = 1.5;   // thoda expressive

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
}

voco.addEventListener("click", () => {

    const messages = document.querySelectorAll(".bot");
    if (messages.length === 0) return;

    const lastMsg = messages[messages.length - 1].innerText;

    speakText(lastMsg);
});
