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

    const svg = document.querySelector('.owl'); // SVG 요소
    const leftPath = document.querySelector('.left-eye'); // 왼쪽 눈 path
    const rightPath = document.querySelector('.right-eye'); // 오른쪽 눈 path
  
    // 경계 상자(Bounding Box)로 중심 좌표 계산
    const leftBBox = leftPath.getBBox();
    const leftEyeCenterX = leftBBox.x + leftBBox.width / 2;
    const leftEyeCenterY = leftBBox.y + leftBBox.height / 2;
  
    const rightBBox = rightPath.getBBox();
    const rightEyeCenterX = rightBBox.x + rightBBox.width / 2;
    const rightEyeCenterY = rightBBox.y + rightBBox.height / 2;
  
    // 눈동자 요소 가져오기
    const leftPupil = document.querySelector('.left-pupil');
    const rightPupil = document.querySelector('.right-pupil');
  
    let targetLeft = { x: leftEyeCenterX, y: leftEyeCenterY }; // 왼쪽 눈 목표 좌표
    let targetRight = { x: rightEyeCenterX, y: rightEyeCenterY }; // 오른쪽 눈 목표 좌표
  
    const updatePupilPosition = (pupil, currentX, currentY, targetX, targetY, eyeCenterX, eyeCenterY, maxDistance) => {
      const smoothingFactor = 0.2; // 부드러운 이동 비율
      const deltaX = targetX - eyeCenterX;
      const deltaY = targetY - eyeCenterY;
  
      // 목표 위치와 눈 중심 간의 거리 계산
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  
      // 최대 이동 거리 내로 제한
      const clampedDistance = Math.min(distance, maxDistance);
  
      // 제한된 거리와 각도를 기반으로 목표 좌표 조정
      const angle = Math.atan2(deltaY, deltaX);
      const adjustedTargetX = eyeCenterX + clampedDistance * Math.cos(angle);
      const adjustedTargetY = eyeCenterY + clampedDistance * Math.sin(angle);
  
      const nextX = currentX + (adjustedTargetX - currentX) * smoothingFactor;
      const nextY = currentY + (adjustedTargetY - currentY) * smoothingFactor;
  
      pupil.setAttribute('cx', nextX);
      pupil.setAttribute('cy', nextY);
  
      return { x: nextX, y: nextY }; // 다음 위치 반환
    };
  
    document.addEventListener('mousemove', (e) => {
      const point = svg.createSVGPoint();
      point.x = e.clientX;
      point.y = e.clientY;
  
      const svgPoint = point.matrixTransform(svg.getScreenCTM().inverse());
  
      targetLeft = { x: svgPoint.x, y: svgPoint.y }; // 왼쪽 눈 목표 위치
      targetRight = { x: svgPoint.x, y: svgPoint.y }; // 오른쪽 눈 목표 위치
    });
  
    const eyeRadius = 12; // 눈 반지름
    const pupilRadius = 4.5; // 눈동자 반지름
    const maxDistance = eyeRadius - pupilRadius; // 최대 이동 거리
  
    let currentLeft = { x: leftEyeCenterX, y: leftEyeCenterY }; // 왼쪽 눈 현재 위치
    let currentRight = { x: rightEyeCenterX, y: rightEyeCenterY }; // 오른쪽 눈 현재 위치
  
    const animate = () => {
      // 왼쪽 눈 업데이트
      currentLeft = updatePupilPosition(
        leftPupil,
        currentLeft.x,
        currentLeft.y,
        targetLeft.x,
        targetLeft.y,
        leftEyeCenterX,
        leftEyeCenterY,
        maxDistance
      );
  
      // 오른쪽 눈 업데이트
      currentRight = updatePupilPosition(
        rightPupil,
        currentRight.x,
        currentRight.y,
        targetRight.x,
        targetRight.y,
        rightEyeCenterX,
        rightEyeCenterY,
        maxDistance
      );
  
      requestAnimationFrame(animate);
    };
    animate();
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