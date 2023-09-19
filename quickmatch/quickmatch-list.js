window.onload = function() {
    // 미팅 전체 목록 가져오기
    // localhost
    axios.get('http://localhost/quickmatch/list/')
        .then(response => populateMeetingList(response.data))
        .catch(error => console.error('Error fetching meetings:', error));

    // 검색 버튼에 이벤트 리스너 추가
    document.getElementById('searchBtn').addEventListener('click', function() {
        const searchTerm = document.getElementById('searchInput').value;
        axios.get('http://localhost/quickmatch/search/', { params: { search: searchTerm } })
            .then(response => populateMeetingList(response.data))
            .catch(error => console.error('Error fetching meetings:', error));
    });
}

function populateMeetingList(data) {
    const meetingList = document.getElementById('meetingList');
<<<<<<< HEAD
    meetingList.innerHTML = '';  // 기존 목록을 초기화합니다.
=======
    meetingList.innerHTML = ''; 
>>>>>>> 41429e95211cb546d4c582d090dac8dfcf96837d
    data.forEach(meeting => {
        const meetingItem = document.createElement('div');
        meetingItem.className = 'meeting-item';

<<<<<<< HEAD
        const title = document.createElement('h2');
        title.textContent = meeting.title;

        const description = document.createElement('p');
        description.textContent = meeting.description;

        const joinBtn = document.createElement('button');
        joinBtn.className = 'join-btn';
        joinBtn.textContent = '참석하기';
        joinBtn.onclick = function() {
            axios.post('http://localhost/quickmatch/join/', { meeting_id: meeting.id })
            .then(response => {
                if(response.data.success) {
                    // 참석 버튼을 "참석중"으로 변경
                    joinBtn.textContent = '참석중';
                    joinBtn.disabled = true;

                    // 모든 다른 "참석하기" 버튼 숨기기
                    const allJoinButtons = document.querySelectorAll('.join-btn');
                    allJoinButtons.forEach(btn => {
                        if (btn !== joinBtn) btn.style.display = 'none';
                    });
                }
            })
            .catch(error => console.error('Error joining meeting:', error));
        }
        const detailBtn = document.createElement('button');
        detailBtn.className = 'detail-btn';
        detailBtn.textContent = '상세보기';
        detailBtn.onclick = function() {
            // 상세보기 로직 구현
            window.location.href = 'quickmatch-detail.html?meeting_id='+ encodeURIComponent(meeting.id)
        }

        meetingItem.appendChild(title);
        meetingItem.appendChild(description);
        meetingItem.appendChild(joinBtn);
        meetingItem.appendChild(detailBtn);
=======
        // Header: Created_at과 Status
        const meetingHeader = document.createElement('div');
        meetingHeader.className = 'meeting-header';
        const createdAt = document.createElement('span');
        createdAt.className = 'careated'
        createdAt.textContent = meeting.created_at.split("T")[0];  
        const status = document.createElement('span');
        status.className = 'status'
        status.textContent = meeting.status;  
        meetingHeader.appendChild(createdAt);
        meetingHeader.appendChild(status);

        // 제목
        const title = document.createElement('h2');
        title.textContent = meeting.title;

        // 태그: Category, Location 및 Details 버튼
        const meetingTags = document.createElement('div');
        meetingTags.className = 'meeting-tags';
        const category = document.createElement('span');
        category.className = 'category';
        category.textContent = meeting.category;

        const location = document.createElement('span');
        location.className = 'location';
        location.textContent = meeting.location;

        const detailBtn = document.createElement('button');
        detailBtn.className = 'detail-btn';
        detailBtn.textContent = '세부 사항 보기';
        detailBtn.onclick = function() {
            window.location.href = 'quickmatch-detail.html?meeting_id='+ encodeURIComponent(meeting.id);
        }
        meetingTags.appendChild(category);
        meetingTags.appendChild(location);
        meetingTags.appendChild(detailBtn);

        // // 참가 버튼
        // const joinBtn = document.createElement('button');
        // joinBtn.className = 'join-btn';
        // joinBtn.textContent = '참석하기';
        // joinBtn.onclick = function() {
        //     axios.post('http://localhost/quickmatch/join/', { meeting_id: meeting.id })
        //     .then(response => {
        //         if(response.data.success) {
        //             joinBtn.textContent = '참석 중';
        //             joinBtn.disabled = true;

        //             const allJoinButtons = document.querySelectorAll('.join-btn');
        //             allJoinButtons.forEach(btn => {
        //                 if (btn !== joinBtn) btn.style.display = 'none';
        //             });
        //         }
        //     })
        //     .catch(error => console.error('미팅 참석 오류:', error));
        // }
        // meetingItem.appendChild(joinBtn);

        meetingItem.appendChild(meetingHeader);
        meetingItem.appendChild(title);
        meetingItem.appendChild(meetingTags);
>>>>>>> 41429e95211cb546d4c582d090dac8dfcf96837d

        meetingList.appendChild(meetingItem);
    });
}
