document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.main_slide');
    const prevBtn = document.querySelector('.slidePrevBtn');
    const nextBtn = document.querySelector('.slideNextBtn');
    let currentIndex = 0;
    const slideCount = slides.length;
    const intervalTime = 3000; // 5초마다 자동 슬라이드
    let autoSlideInterval;
  
    // 슬라이드 표시 함수
    function showSlide(index) {
      const offset = -index * 100; // 슬라이드를 왼쪽으로 이동
      document.querySelector('.main_slides').style.transform = `translateX(${offset}%)`;
    }
  
    // 다음 슬라이드
    function nextSlide() {
      currentIndex = (currentIndex + 1) % slideCount; // 마지막에서 처음으로 돌아감
      showSlide(currentIndex);
    }
  
    // 이전 슬라이드
    function prevSlide() {
      currentIndex = (currentIndex - 1 + slideCount) % slideCount; // 처음에서 마지막으로 돌아감
      showSlide(currentIndex);
    }
  
    // 자동 슬라이드 시작
    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, intervalTime);
    }
  
    // 자동 슬라이드 멈춤
    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }
  
    // 버튼 클릭 이벤트
    nextBtn.addEventListener('click', function () {
      stopAutoSlide(); // 버튼 클릭 시 자동 슬라이드 멈춤
      nextSlide();
      startAutoSlide(); // 다시 자동 슬라이드 시작
    });
  
    prevBtn.addEventListener('click', function () {
      stopAutoSlide();
      prevSlide();
      startAutoSlide();
    });
  
    // 초기 자동 슬라이드 시작
    startAutoSlide();

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
  