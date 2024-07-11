const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;

// Predefined set of user questions and corresponding answers
const predefinedQA = [
    {
        question: "What is your name?",
        answer: "My name is ChatBot."
    },
    {
        question: "How are you?",
        answer: "I'm doing well, thank you!"
    },
    {
        question: "Can you help me?",
        answer: "Sure, I can help you with that!"
    },
    // Add more predefined questions and answers as needed
];

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    chatLi.innerHTML = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-icons-outlined">smart_toy</span><p>${message}</p>`;
    return chatLi; // return chat <li> element
}

const generateResponse = (userMessage) => {
    // Find a matching predefined answer for the user's message
    const foundQA = predefinedQA.find(qa => qa.question.toLowerCase() === userMessage.toLowerCase());
    if (foundQA) {
        return foundQA.answer;
    } else {
        // If no predefined answer found, generate a default response
        return "I'm sorry, I don't have an answer for that right now.";
    }
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if (!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const response = generateResponse(userMessage);
        const incomingChatLi = createChatLi(response, "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
    }, 600);
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
