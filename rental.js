document.addEventListener('DOMContentLoaded', () => {
    const itemsContainer = document.querySelector('.items');

    // LocalStorage에서 물품 데이터 불러오기
    const loadItems = () => {
        return JSON.parse(localStorage.getItem('items')) || [];
    };

    // 물품 목록을 화면에 표시
    const displayItems = () => {
        const items = loadItems();

        if (items.length === 0) {
            itemsContainer.innerHTML = '<p>등록된 물품이 없습니다.</p>';
            return;
        }

        itemsContainer.innerHTML = items.map(item => `
            <div class="item">
                <img src="${item.imageUrl}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>1일 대여료: ${item.price}원</p>
                <button>대여하기</button>
            </div>
        `).join('');
    };

    displayItems();
});
