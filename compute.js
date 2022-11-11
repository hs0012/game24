let arr = []
let answers = []

createNum()


// 寻找可计算出 24 的方法
function findRes(arr = [], exp = '') {

    let result = []
    for (let i = 0; i < arr.length - 1; i++) {

        let res = []
        for (let j = i + 1; j < arr.length; j++) {
            let arrInner = [...arr]
            res = cpt(arr[i], arr[j])
            let num = arr[j]
            arrInner.splice(i, 1)
            let index = arrInner.findIndex(item => item === arr[j])
            if (index >= 0) arrInner.splice(index, 1)
            res.forEach(item => {
                if (arrInner.length) {
                    item.text = exp + item.exp
                    item.children = item.children.concat(findRes([item.value, ...arrInner], (item.text + ",")))
                } else {
                    item.text = exp + item.exp
                    if (item.value === 24) {
                        answers.push(item)
                    }
                }
            })
            result.push(res)
        }
    }
    return result
}

//计算两个数值的加减乘除
function cpt(a, b) {
    return [
        {
            exp: `${a}+${b}`,
            value: a + b,
            children: []
        },
        {
            exp: `${a}-${b}`,
            value: a - b,
            children: []
        }, {
            exp: `${a}*${b}`,
            value: a * b,
            children: []
        }, {
            exp: `${a}/${b}`,
            value: a / b,
            children: []
        }, {
            exp: `${b}-${a}`,
            value: b - a,
            children: []
        }, {
            exp: `${b}/${a}`,
            value: b / a,
            children: []
        }
    ]
}

// 创建 随机数
function createNum() {
    arr = []
    answers = []
    for (let index = 0; index < 4; index++) {
        let num = parseInt(Math.random() * 10)
        num = num === 0 ? 1 : num
        arr.push(num)
    }
    let div = document.querySelector('.container');
    div.innerHTML = arr.map(item => `<li>${item}</li>`).join('')
    findRes(arr)
    console.log("arr:", arr);
    console.log("answers:", answers);
}

document.querySelector("#btn").addEventListener("click", function () {
    createNum()

})
