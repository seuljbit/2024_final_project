document.addEventListener('DOMContentLoaded', function () {
    const toggleChatBox = (isOpen) => { // 공통 함수: 채팅 박스 올리고 내리기
        const chatBtn = document.getElementById('chatBtn');
        const chatBox = document.querySelector(".chat-box");

        if (isOpen) {
            chatBtn.classList.add('open'); // open 클래스 추가
            chatBtn.style.animation = "none"; // 애니메이션 제거
            chatBox.style.bottom = "100px"; // 채팅 박스 올리기
        } else {
            chatBtn.classList.remove('open'); // open 클래스 제거
            chatBtn.style.animation = "bounce 1.7s infinite ease-in-out"; // 애니메이션 활성화
            chatBox.style.bottom = "-500px"; // 채팅 박스 내리기
        }
    };
    // closeChat 버튼 클릭 시
    document.getElementById("closeChat").addEventListener("click", () => { toggleChatBox(false); }); // 항상 닫기
    // 부엉이 버튼 클릭 시
    document.getElementById("chatBtn").addEventListener("click", () => {
        const isOpen = !document.getElementById('chatBtn').classList.contains('open');
        toggleChatBox(isOpen); // 상태에 따라 열거나 닫음
    });



    // input창 내의 글자 수에 따른 sendButton 속성 변경
    const userMessage = document.getElementById('userMessage');
    const sendButton = document.getElementById('sendButton');

    // 입력 필드에서 글자 수 확인
    userMessage.addEventListener('input', () => {
        if (userMessage.value.trim().length > 0) {
            // 한 글자 이상 입력된 경우 버튼 활성화
            sendButton.style.backgroundColor = '#E7B343';
            sendButton.disabled = false; // 버튼 활성화
        } else {
            // 글자가 없는 경우 버튼 비활성화
            sendButton.style.backgroundColor = '#e6cd9a';
            sendButton.disabled = true; // 버튼 비활성화
        }
    });

    sendButton.disabled = true; // 초기 상태 설정 (비활성화)
});

/*
// 봇 메시지 추가 함수
const addBotMessages = (messages) => {
    const chatContent = document.querySelector('.chat-content');

    // 봇 메시지 그룹 생성
    const botMessageGroup = document.createElement('div');
    botMessageGroup.classList.add('bot-message-group');

    // 프로필 이미지를 봇 메시지 그룹에 추가
    const botProfile = document.createElement('img');
    botProfile.src = 'bot-profile.png';
    botProfile.alt = 'Bot Profile';
    botProfile.classList.add('bot-profile');
    botMessageGroup.appendChild(botProfile);

    // 각 메시지를 그룹에 추가
    messages.forEach((message, index) => {
        const botMessage = document.createElement('div');
        botMessage.classList.add('bot-message');
        botMessage.textContent = message;

        // 첫 번째 메시지에만 프로필 사진을 추가
        if (index > 0) {
            botProfile.style.display = 'none'; // 첫 메시지 외에는 프로필 숨김
        }

        botMessageGroup.appendChild(botMessage);
    });

    // 봇 메시지 그룹을 채팅 영역에 추가
    chatContent.appendChild(botMessageGroup);
};

// 봇 메시지 추가 테스트
addBotMessages(["안녕하세요!", "무엇을 도와드릴까요?", "필요한 정보를 알려주세요."]);
 */