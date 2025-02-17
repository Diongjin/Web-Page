document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('#registerForm');

    // LocalStorage에 저장된 물품 목록 불러오기
    const loadItems = () => {
        return JSON.parse(localStorage.getItem('items')) || [];
    };

    // 물품 목록 저장
    const saveItems = (items) => {
        localStorage.setItem('items', JSON.stringify(items));
    };

    // 폼 제출 이벤트 처리
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(registerForm);
        const name = formData.get('name');
        const price = formData.get('price');
        const imageFile = formData.get('image');

        // 이미지 URL 생성
        const imageUrl = URL.createObjectURL(imageFile);

        // 새 물품 추가
        const items = loadItems();
        items.push({ name, price, imageUrl });
        saveItems(items);

        alert('물품이 등록되었습니다!');
        registerForm.reset();
    });
});
