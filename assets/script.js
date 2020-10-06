window.onload = init;
let searchBtn;
let searchInput;
let searchResult;


function init () {
    searchBtn = document.getElementById('search-btn');
    searchInput = document.getElementById('search-input');
    searchResult = document.getElementById('search-result');

    searchBtn.onclick = () => {
        search()
    }
    searchInput.onchange = () => {
        search()
    }
}

function search() {
    let input = searchInput.value;
    input.trim();
    if (!input) {
        return
    }

    axios.get('server.php',{
        params: {
            word: input
        }
    }).then(res => showResults(res))
        .catch(res => console.log(res))
}

function showResults(data)
{
    let resultTitle = document.createElement('li');

    resultTitle.classList.add('list-group-item');
    resultTitle.classList.add('list-group-item-warning');
    resultTitle.textContent = `Kết quả ( số từ tìm thấy: ${data.data.time} ) `;

    searchResult.innerHTML = '';
    searchResult.append(resultTitle)

    for(let type in data.data.types) {
        let li = document.createElement('li');
        li.classList.add('list-group-item');
        li.classList.add('list-group-item-success');

        li.textContent = type + ` (${data.data.types[type]})`;
        searchResult.append(li)
    }
}