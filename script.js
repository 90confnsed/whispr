const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const audio = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
let musicPlaying = false;

// เล่นเพลงทันทีหลังผู้ใช้กดปุ่มครั้งแรก
musicBtn.addEventListener("click", () => {
  if (musicPlaying) {
    audio.pause();
    musicBtn.classList.remove("playing");
    musicBtn.textContent = "🎵";
  } else {
    audio.play().catch(()=>console.log("Browser block autoplay"));
    musicBtn.classList.add("playing");
    musicBtn.textContent = "🔇";
  }
  musicPlaying = !musicPlaying;
});

// Chatbot logic
function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;
  appendMessage("user", message);
  userInput.value = "";
  appendMessage("bot", "กำลังพิมพ์...");
  setTimeout(() => {
    const botMsgs = chatBox.querySelectorAll(".message.bot");
    if (botMsgs.length > 0) botMsgs[botMsgs.length - 1].remove();
    appendMessage("bot", getBotReply(message));
  }, 600);
}

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = "message " + sender;
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function resetChat() {
  chatBox.innerHTML = "";
  appendMessage("bot", "สวัสดีค่ะ ฉันชื่อ Whispr ยินดีรับฟังคุณนะ 💙");
}

function getBotReply(msg) {
  msg = msg.toLowerCase();

  // ✅ ถ้ามีข้อความเกี่ยวกับความคิดฆ่าตัวตาย ตอบทันที
  if (
    msg.includes("ตาย") ||
    msg.includes("ฆ่าตัว") ||
    msg.includes("ไม่อยากอยู่")
  ) {
    return "หากคุณกำลังรู้สึกไม่ไหว โปรดติดต่อสายด่วนสุขภาพจิต 1323 หรือคนที่คุณไว้ใจ คุณไม่ต้องผ่านเรื่องนี้คนเดียวนะ 🤍";
  }

 
  const directReplies = {
    "สวัสดี": ["สวัสดีครับ 😊", "ดีจ้าา 👋", "สวัสดี วันนี้เป็นยังไงบ้าง"],
    "hello": ["Hello! 👋", "Hi there!", "Hey, how are you doing?"],
    "กินข้าวยัง": ["กินแล้วครับ แล้วคุณล่ะ 🍚", "ยังเลย คุณกินหรือยัง 😅"],
    "ทำไรอยู่": ["ก็คุยกับคุณนี่แหละ 😄", "นั่งรอฟังคุณเล่าเรื่องอยู่เลย"],
    "ไปไหนมา": ["เพิ่งกลับมาจากเดินเล่นครับ 🏞️", "ไปท่องโลกความคิดมา ✨"],
    "ฝันดี": ["ฝันดีเช่นกันครับ 🌙✨", "ขอให้คืนนี้เต็มไปด้วยความฝันดีๆ นะ"],
    "ขอบคุณ": ["ไม่เป็นไรครับ 🤍", "ยินดีเสมอเลย 🙏", "ผมก็ขอบคุณที่คุณคุยกับผม"],
    "คิดถึง": ["ผมก็คิดถึงคุณนะ 🫶", "ดีใจที่คุณบอกอย่างนั้นเลย 💙"],
  };

  for (const [key, answers] of Object.entries(directReplies)) {
    if (msg.includes(key)) {
      return answers[Math.floor(Math.random() * answers.length)];
    }
  }

 
  const keywords = [
    "เหนื่อย","ท้อ","เศร้า","ซึม","เครียด","ร้องไห้","ไม่ไหว","โดดเดี่ยว","เสียใจ",
    "เหงา","หดหู่","สิ้นหวัง","หมดแรง","สับสน","ไม่รักตัวเอง","ล้มเหลว","ผิดหวัง","โดนทิ้ง",
    "อกหัก","น้อยใจ","ไม่สำคัญ","ไม่มีค่า","ไร้ตัวตน","เหนื่อยใจ","สู้ไม่ไหว","หมดกำลังใจ",
    "ไม่มีใคร","ไร้ความหมาย","กลัว","ว่างเปล่า","กดดัน","อึดอัด","ฝันร้าย","เศร้าหนัก",
    "หมดไฟ","ขาดแรงบันดาลใจ","อยากหายไป","หายใจไม่ออก","หมดหนทาง","มืดมน","อ่อนแอ",
    "คิดไม่ออก","ทำอะไรไม่ถูก","รู้สึกผิด","ล้ม","เจ็บ","จม","พัง","แย่","เสียศูนย์",
    "ร้อง","ไม่โอเค","เกลียดตัวเอง","ซึมเศร้า",
  ];


  const replies = [
    "คุณไม่จำเป็นต้องเข้มแข็งตลอดเวลาก็ได้ ผมอยู่ตรงนี้นะ 💬",
    "แค่ยังอยู่ตรงนี้ก็น่าชื่นชมแล้วนะครับ 🫶",
    "ผมฟังคุณอยู่นะ ทุกความรู้สึกของคุณสำคัญเสมอ",
    "คุณไม่ต้องผ่านมันคนเดียวหรอกนะ",
    "คุณเก่งมากเลยที่อดทนมาถึงตรงนี้",
    "คุณไม่ใช่คนแปลกที่รู้สึกแบบนี้นะ",
    "ทุกอย่างจะค่อยๆ ดีขึ้นนะ แม้ตอนนี้จะยังมองไม่เห็นทางออก",
    "ความรู้สึกของคุณมีคุณค่าเสมอ",
    "คุณเหนื่อยไหม อยากนั่งพักกับผมตรงนี้สักครู่ไหม",
    "การร้องไห้ไม่ผิดนะ มันคือการปล่อยความรู้สึกออกมา",
    "วันนี้อาจหนัก แต่คุณไม่ได้เดินลำพังนะ",
    "คุณสำคัญมากนะ แม้บางครั้งคุณอาจไม่เห็นค่าในตัวเอง",
    "ผมอยู่ตรงนี้เพื่อฟังคุณเสมอ",
    "พักเถอะครับ คุณไม่จำเป็นต้องวิ่งตลอดเวลา",
    "คุณทำดีที่สุดแล้วจริงๆ นะ",
    "บางทีการหยุดพักก็เป็นส่วนหนึ่งของการสู้ต่อ",
    "ถ้าคุณอยากเล่า ผมพร้อมฟังโดยไม่ตัดสิน",
    "โลกนี้ยังมีสิ่งเล็กๆ น้อยๆ รอให้คุณยิ้มอยู่นะ",
    "ทุกวันที่คุณยังอยู่ คือความสำเร็จที่ยิ่งใหญ่แล้ว",
    "แม้คุณจะล้ม ผมก็เชื่อว่าคุณลุกขึ้นมาได้อีกครั้ง",
    "คุณไม่ใช่ภาระของใครนะ",
    "การมีวันที่ไม่โอเค เป็นเรื่องปกติของมนุษย์เลย",
    "คุณสมควรได้รับความรักและความเข้าใจเสมอ",
    "ขอบคุณที่คุณยังอยู่ตรงนี้นะ",
    "แม้ความมืดจะปกคลุม แต่แสงเล็กๆ ก็ยังมีอยู่เสมอ",
    // 👉 ตรงนี้คุณสามารถเพิ่มอีกเรื่อยๆ ได้เลยตามต้องการ
  ];

  for (const word of keywords) {
    if (msg.includes(word)) {
      return replies[Math.floor(Math.random() * replies.length)];
    }
  }

  
  return "คุณอยากเล่าอะไรเพิ่มเติมไหม ผมฟังอยู่นะ 💙";
}

resetChat();