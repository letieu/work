window.onload = init;
let searchBtn;
let searchInput;
let searchResult;
let res = document.getElementById('res')

function init() {
    searchBtn = document.getElementById('search-btn');
    searchInput = document.getElementById('search-input');
    searchResult = document.getElementById('search-result');

    searchInput.addEventListener('change', () => {
        res.innerHTML = ''
        let words = searchInput.value.split(' ')

        words.forEach((word, i) => {
            res.innerHTML += `<span id=${i}>` + word + '</span>'
        })

        let spans = [...res.getElementsByTagName('span')]
        spans.forEach(span => span.addEventListener('click', point))
    })
}

function search(w1, w2) {
    let word1, word2;
    searchWord(w1)
        .then(res => {
            word1 = res.data.types
            searchWord(w2)
                .then(res => {
                    word2 = res.data.types
                    let numOfResult = (word1.length < word2.length) ? word1.length : word2.length
                    let result = []
                    for (let i = 0; i < numOfResult; i++) {
                        result.push(`${word1[i]} - ${word2[i]}`)
                    }
                    console.log(word1, word2)
                    showResult(collapse(result))
                })
        })
}

function collapse(result) {
    let newResult = []
    let count = []
    result.forEach((item) => {
        if (!newResult.includes(item)) {
            newResult.push(item)
            count.push(1)
        } else {
            let index = newResult.indexOf(item)
            count[index] ++
        }
    })

    newResult.forEach((item, index) => {
        newResult[index] = `${item} ${count[index] > 1 ?('(' + count[index] + ')'): ''}`
    })

    return newResult
}

function searchWord(word) {
    return new Promise((resolve, reject) => {
        axios.get('server.php', {
            params: {
                word: word
            }
        }).then(res => {
            resolve(res)
        })
    })

}

function showResult(result) {

    searchResult.innerHTML = '';
    let resultTitle = document.createElement('li');

    resultTitle.classList.add('list-group-item');
    resultTitle.classList.add('list-group-item-warning');
    resultTitle.textContent = `( số ket qua: ${result.length} )`;

    searchResult.append(resultTitle)
    result.forEach(res => {
        let li = document.createElement('li');
        li.classList.add('list-group-item');
        li.classList.add('list-group-item-success');

        li.textContent =`${res}`;
        searchResult.append(li)
    })
}




function point() {
    let points = [...res.getElementsByClassName('point')]
    points.forEach(span => span.classList.remove('point'))

    let nextSpan = document.getElementById(parseInt(this.id) + 1)
    this.classList.add('point')
    search(this.innerText, nextSpan.innerText)
}