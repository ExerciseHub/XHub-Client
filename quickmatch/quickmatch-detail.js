<<<<<<< HEAD
// 페이지 로딩 시 accessToken이 존재하는지 확인하여 isLoggedIn 값을 설정
if (localStorage.getItem('accessToken')) {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }
=======
let UserId;
const statusDropdown = document.createElement('select');
const options = ["모집중", "모집완료", "취소"];

options.forEach(optionValue => {
    let option = document.createElement('option');
    option.value = optionValue;
    option.textContent = optionValue;
    statusDropdown.appendChild(option);
});

statusDropdown.onchange = statusChange; // 드롭다운 값이 변경될 때 statusChange 호출
document.querySelector('#button_group').appendChild(statusDropdown);


>>>>>>> 41429e95211cb546d4c582d090dac8dfcf96837d

window.addEventListener('load', function() {    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const value = urlParams.get('meeting_id');

<<<<<<< HEAD
    axios.get(`http://localhost/quickmatch/${value}/detail/`)
    .then(response => {
        const responsedata = response.data;

        console.log('내 사용자 ID: ', responsedata.id);
        render_details(responsedata); // 데이터를 가져온 후 세부 정보 렌더링

        const mc = document.getElementById('meeting_container');
        const mcul = mc.querySelector('ul');
        const liel = mcul.querySelectorAll('li');
        
        liel.forEach(function(li){
            let id_number = '';
            if (li.textContent.includes('organizer')) {
                id_number = li.textContent.split(' : ')[1];
                console.log('작성자 ID: ', id_number);
            }

            // 로그인 한 사용자와 작성자가 동일하면 삭제 버튼 표시.
            if (id_number === String(responsedata.id)){
=======
    // Promise 로 리턴됨 (email, id 정보 가지고있음)
    const userInfo = axios.get(`http://localhost/player/check/email/`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    .then(response =>{
        UserId = response.data.id;
        return response.data;
    })
    .catch(error=>{
        console.error('에러발생 : ', error)
        return error;
    })

    axios.get(`http://localhost/quickmatch/${value}/detail/`)
    .then(response => {
        const responsedata = response.data;
        const userId = UserId

        statusDropdown.value = responsedata.status;
        render_details(responsedata, userId); // 데이터를 가져온 후 세부 정보 렌더링

        // 로그인 한 사용자와 작성자가 동일하면 삭제 버튼 표시.
        userInfo.then(res =>{
            if (res.id === responsedata.organizer){
>>>>>>> 41429e95211cb546d4c582d090dac8dfcf96837d
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = '미팅 삭제';
                deleteBtn.type = 'button';
                deleteBtn.onclick = deleteMeeting;
                document.querySelector('#button_group').append(deleteBtn);
            }
<<<<<<< HEAD
        });

=======
        })
        
>>>>>>> 41429e95211cb546d4c582d090dac8dfcf96837d
        // 멤버십을 확인하여 어떤 버튼을 표시할지 결정
        return axios.get(`http://localhost/quickmatch/is_member/${value}/`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });

    })
    .then(response => {
<<<<<<< HEAD
        if(response.data.is_member) {
            document.getElementById('attend_btn').style.display = 'none';
            document.getElementById('leave_btn').style.display = 'block';
        } else {
            document.getElementById('attend_btn').style.display = 'block';
            document.getElementById('leave_btn').style.display = 'none';
=======
        const evaluateButton = document.querySelectorAll('.evaluate-btn')
        if(response.data.is_member) {
            document.getElementById('attend_btn').style.display = 'none';
            document.getElementById('leave_btn').style.display = 'block';
            document.getElementById('chat_btn').style.display = 'block';
            for (let button of evaluateButton) {
                button.style.display = 'block';
            }
        } else {
            document.getElementById('attend_btn').style.display = 'block';
            document.getElementById('leave_btn').style.display = 'none';
            document.getElementById('chat_btn').style.display = 'none';
            for (let button of evaluateButton) {
                button.style.display = 'none';
            }
>>>>>>> 41429e95211cb546d4c582d090dac8dfcf96837d
        }
    })
    .catch(error => {
        console.error('오류 발생', error);
    });
});

<<<<<<< HEAD
function render_details(data){
    const detail_container = document.getElementById('meeting_container');
    const unordered_li = document.createElement('ul');

    const list = ['title', 'organizer', 'description', 'age_limit', 'created_at', 'category', 'gender_limit', 'status', 'location', 'current_participants', 'max_participants', 'meeting_member']

    for (let key of list){
        const add = document.createElement('li');
        add.classList.add('group');

        if(data.hasOwnProperty(key)){
            let value = data[key];

            // meeting_member의 경우, 이메일 또는 닉네임을 표시합니다.
            if (key === 'meeting_member') {
                let temp = '';
                for (let member of value){
                    temp += member.email || member.nickname;
                    temp += ', ';
                }
                temp = temp.slice(0, -2); // 마지막 쉼표와 공백 제거
                add.textContent = `${key} : ${temp}`;
            } 
            // current_participants의 경우, 참여자 수를 표시합니다.
            else if (key === 'current_participants' && Array.isArray(value)) {
                add.textContent = `${key} : ${value.length}`;
            } 
            else {
                add.textContent = `${key} : ${value}`;
            }
            unordered_li.append(add);
        }
    }
    detail_container.append(unordered_li);
=======
function render_details(data, currentUserId){
    const detail_container = document.getElementById('meeting_container');

    // status와 created_at
    const statusCreatedAtDiv = document.createElement('div');
    statusCreatedAtDiv.textContent = `${data.status} ${data.created_at.split("T")[0]}`;
    detail_container.appendChild(statusCreatedAtDiv);

    // title, current_participants, max_participants 및 organizer
    const titleParticipantsDiv = document.createElement('div');
    titleParticipantsDiv.textContent = `${data.title} [${data.meeting_member.length || 0}/${data.max_participants}] ${data.organizer}`;
    detail_container.appendChild(titleParticipantsDiv);

    // description
    const descriptionDiv = document.createElement('div');
    descriptionDiv.textContent = data.description;
    detail_container.appendChild(descriptionDiv);

    // category, gender_limit 및 location
    const catGenderLocDiv = document.createElement('div');
    catGenderLocDiv.classList.add('category-location');

    const categorySpan = document.createElement('span');
    categorySpan.className = 'category-btn';
    categorySpan.textContent = data.category;
    catGenderLocDiv.appendChild(categorySpan);

    const genderLimitSpan = document.createElement('span');
    genderLimitSpan.className = 'gender-limit-btn';
    genderLimitSpan.textContent = data.gender_limit;
    catGenderLocDiv.appendChild(genderLimitSpan);

    const locationSpan = document.createElement('span');
    locationSpan.className = 'location-btn';
    locationSpan.textContent = data.location;
    catGenderLocDiv.appendChild(locationSpan);

    const evaluationSpan = document.createElement('span');
    evaluationSpan.className = 'evaluation-btn';
    evaluationSpan.textContent = data.can_evaluate;
    catGenderLocDiv.appendChild(evaluationSpan);

    detail_container.appendChild(catGenderLocDiv);


    // 회의 참석자
    const membersDiv = document.createElement('div');
    membersDiv.textContent='<퀵매치 멤버 목록>'
    for (let member of data.meeting_member) {
        const memberSpan = document.createElement('span');
        const displayName = member.nickname || member.email;
        memberSpan.textContent = `${displayName} : (${member.position_display}) (${member.activity_point})`;
        
        membersDiv.appendChild(memberSpan);


        // 각 회원에 대한 평가 버튼 추가
        if (member.id !== currentUserId) {
            const evaluateButton = document.createElement('button');
            evaluateButton.textContent = '평가하기';
            evaluateButton.classList.add('evaluate-btn');
            evaluateButton.addEventListener('click', function() {
                evaluateMember(member.id, data.id);
            });
            membersDiv.appendChild(evaluateButton);
        }
    }
    detail_container.appendChild(membersDiv);
>>>>>>> 41429e95211cb546d4c582d090dac8dfcf96837d
}


// 모임 삭제 함수
async function deleteMeeting() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const value = urlParams.get('meeting_id');
    console.log('delete로 들어왔다! meeting_id : ', value);

    // 삭제 요청
    try {
        const response = await axios.post(`http://localhost/quickmatch/${value}/delete/`, {}, {
            headers : {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });

        if (response.status === 200) {
<<<<<<< HEAD
        alert('모임이 성공적으로 삭제되었습니다.');
        window.location.href='meeting-list.html';
        // UI 업데이트 또는 추가 작업
        } else {
        alert('모임 삭제에 실패하였습니다.');
=======
            alert('모임이 성공적으로 삭제되었습니다.');
            window.location.href='quickmatch-list.html';
        // UI 업데이트 또는 추가 작업
        } else {
            alert('모임 삭제에 실패하였습니다.');
>>>>>>> 41429e95211cb546d4c582d090dac8dfcf96837d
        }
    } catch (error) {
        alert('모임 삭제에 실패하였습니다.');
        console.error('에러발생했습니다.', error)
    }
}

<<<<<<< HEAD
=======

// 모임 상태 변경 함수
async function statusChange() {
    const newStatus = this.value;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const value = urlParams.get('meeting_id');

    if (!value) {
        alert('Failed to retrieve meeting ID from the URL.');
        return;
    }

    try {
        const response = await axios.post(`http://localhost/quickmatch/${value}/status/`, {status: newStatus}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });

        if (response.status === 200) {
            alert('모임의 상태가 성공적으로 변경되었습니다.');
            
            // 상태 변경 후 미팅의 세부 정보를 다시 가져옵니다.
            const detailResponse = await axios.get(`http://localhost/quickmatch/${value}/detail/`);
            const responsedata = detailResponse.data;
            render_details(responsedata, UserId);
        } else {
            alert('상태변경에 실패하였습니다.');
        }
    } catch (error) {
        alert('상태변경에 실패하였습니다.');
        console.error('에러발생했습니다.', error)
    }
}


>>>>>>> 41429e95211cb546d4c582d090dac8dfcf96837d
// 모임 참석 함수
async function attendMeeting() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const value = urlParams.get('meeting_id'); // Get the meeting_id value from the URL

    if (!value) {
        alert('Failed to retrieve meeting ID from the URL.');
        return;
    }

    try {
        const response = await axios.post(`http://localhost/quickmatch/join/${value}/`, {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });

        if (response.status === 200) {
            document.getElementById('attend_btn').style.display = 'none';
            document.getElementById('leave_btn').style.display = 'block';
            alert('모임 참석에 성공하였습니다.');
            
            return axios.get(`http://localhost/quickmatch/${value}/detail/`);
        } else {
        alert('모임 참석에 실패하였습니다.');
        }
    } catch (error) {
        alert('모임 참석에 실패하였습니다.');
    }
}

<<<<<<< HEAD

=======
// 모임 떠나기
>>>>>>> 41429e95211cb546d4c582d090dac8dfcf96837d
async function leaveMeeting() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const value = urlParams.get('meeting_id');

    if (!value) {
        alert('URL에서 회의 ID를 가져오는 데 실패했습니다.');
        return;
    }

    try {
        const response = await axios.post(`http://localhost/quickmatch/leave/${value}/`, {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });

        if (response.status === 200) {
            alert('회의를 성공적으로 떠났습니다.');
            // 성공적으로 회의를 떠난 후 참가 버튼을 표시하고 나가기 버튼을 숨깁니다.
            document.getElementById('attend_btn').style.display = 'block';
            document.getElementById('leave_btn').style.display = 'none';

            return axios.get(`http://localhost/quickmatch/${value}/detail/`);
        } else {
            alert('회의를 떠나는 데 실패했습니다.');
        }
    } catch (error) {
        alert('회의를 떠나는 데 실패했습니다.');
    }
}


function updateMeetingMembers(memberData) {
    // 'meeting_member'를 포함하는 목록 항목을 찾습니다.
    const liElements = document.querySelectorAll('#meeting_container ul li');
    for (let li of liElements) {
        if (li.textContent.includes('meeting_member')) {
            let updatedMembers = '';
            for (let member of memberData) {
                updatedMembers += member.email || member.nickname;
                updatedMembers += ', ';
            }
            updatedMembers = updatedMembers.slice(0, -2); // 마지막 쉼표와 공백 제거
            li.textContent = `meeting_member : ${updatedMembers}`;
            break;
        }
    }
}
<<<<<<< HEAD
=======


// 회원평가 처리 함수
async function evaluateMember(memberId, meetingId) {
    try {
        const response = await axios.post(`http://localhost/quickmatch/evaluate_member/${memberId}/${meetingId}/`, {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });

        if (response.status === 200) {
            alert('회원 평가에 성공했습니다.');
        } else {
            alert(response.data.status);
        }
    } catch (error) {
        alert('회원 평가에 실패했습니다.');
        console.error('오류가 발생했습니다.', error);
    }
}

// 채팅 페이지 접속
function getChat(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const value = urlParams.get('meeting_id');

    console.log('chatting start!');
    window.location = '../quickmatch/quickmatch-chat.html?meeting_id=' + encodeURIComponent(value);
}
>>>>>>> 41429e95211cb546d4c582d090dac8dfcf96837d
