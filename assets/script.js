window.onload = init;
let searchBtn;
let searchInput;
let searchResult;
let result = []

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
    clearResult()
    let input = searchInput.value;
    input.trim();
    if (!input) {
        return
    }

    let words = input.split(" ")
    if (words.length <2) {
        let res = searchWord(input)
        showResults([res])
    }
    else {
        let w1 = Math.floor(Math.random() * (words.length - 1))
        let w2 = w1;
        while (w2 === w1 ) {
            w2 =  Math.floor(Math.random() * (words.length))
        }

        searchWord(words[w1])
        searchWord(words[w2])

        showResults(result)
    }
}

function searchWord(word) {
    axios.get('server.php',{
        params: {
            word: word
        }
    }).then(res => {
        result.push(res.data)
        if (result.length == 2) showResults(result)
    })
        .catch(res => console.log(res))
}

function showResults(datas)
{
    datas.forEach(data => {
        showResult(data)
    })

}

function clearResult()
{
    result = []
    searchResult.innerHTML = '';
}

function showResult(data)
{
    let resultTitle = document.createElement('li');

    resultTitle.classList.add('list-group-item');
    resultTitle.classList.add('list-group-item-warning');
    resultTitle.textContent = `${data.name} ( số từ tìm thấy: ${data.time} ) `;

    searchResult.append(resultTitle)

    for(let type in data.types) {
        let li = document.createElement('li');
        li.classList.add('list-group-item');
        li.classList.add('list-group-item-success');

        li.textContent = type + ` (${data.types[type]})`;
        searchResult.append(li)
    }
}