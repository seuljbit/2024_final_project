document.addEventListener("DOMContentLoaded", () => {
    const openModalBtns = document.querySelectorAll('.review_btn'); // 버튼들 모두 선택
    const closeModalBtn = document.getElementById("closeModal");
    const modalOverlay = document.querySelector('.modal_overlay');

    console.log(openModalBtns);

    // 모든 버튼에 클릭 이벤트 추가
    openModalBtns.forEach((btn, index) => {
        console.log(`Button ${index + 1} 이벤트 리스너 추가됨`); // 각 버튼에 리스너 추가 확인
        btn.addEventListener("click", () => {
            console.log(`Button ${index + 1} 클릭됨`);
            modalOverlay.style.display = "block"; // 모달 보이게
        });
    });
    
    console.log(modalOverlay);

    // 모달 닫기
    if (closeModalBtn) { // 닫기 버튼이 존재하는 경우만 추가
        closeModalBtn.addEventListener("click", () => {
            modalOverlay.style.display = "none"; // 모달 숨기기
        });
    }

    // 배경 클릭 시 모달 닫기
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.style.display = "none"; // 모달 숨기기
        }
    });
});