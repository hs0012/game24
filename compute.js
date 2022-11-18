// 数字值
let arr = []
// 答案值
let answers = []
// 用户算式值
let expression = []
// 记录历史记录
let record = 0
// 答对的数量
let right = 0
// 答错的题
let err = 0
// 计时
// let time = "00:00:00"
// 答案展示区 对象
let answerText = document.querySelector('#answer-text')
// 用户作答 展示区对象
let takeText = document.querySelector("#take-text")

// 获取 不会、确定、无解 按钮对象
let btns = document.querySelectorAll(".btn-box button");

// 不会 按钮功能
btns[0].addEventListener("click", function () {
    if (answers.length) {
        createRecord(false)
        answerText.innerText = answers[0].text
        setTimeout(() => createNum(), 5000);
    }
    else {
        alert("此题无解！！！！")
        record += 1
        document.querySelector('.count').innerText = record
        createNum()
    }
})
// 确定按钮函数  答题
btns[1].addEventListener("click", function () {
    console.log(expression);
    // 若表达式不完整，不允许答题
    if (expression.length < 3) return alert("请正确答题！！！")
    // 将数组拼接成表达式
    let str = expression.join("")
    // 调用验证答案的函数，并传入拼接的表达式
    checkAnswer(str)
})
// 无解按钮  无解
btns[2].addEventListener("click", () => {
    if (answers.length === 0 && expression.length < 3) {
        alert("恭喜您，答对了！！！")
        createRecord(true)
    } else {
        alert("回答错误！！！1")
        answerText.innerText = answers[0].text
        createRecord(false)
        console.log(answers);
    }
    setTimeout(() => createNum(), 3000);
})
// 游戏初始化
createNum()

// 寻找可计算出 24 的方法
function findRes(arr = [], exp = '') {
    // 声明一个变量数组，用来接收传入的数组的每两项做计算后的所有可能结果
    let result = []
    // 开始从数组中选取两项进行计算
    for (let i = 0; i < arr.length - 1; i++) {
        // 声明一个变量数组，用来接收选出的两个数计算后的结果
        let res = []
        // 开始选出第二个数
        for (let j = i + 1; j < arr.length; j++) {
            // 声明一个临时的数组，用存储未被选中的数组项
            let arrInner = [...arr]
            // 开始计算
            res = cpt(arr[i], arr[j])
            // 记录选中的第二个数
            let num = arr[j]
            // 从临时数组中，删除最先选出来的第一个数
            arrInner.splice(i, 1)
            // 从已删除最先选中的数后剩余的项中，找出第二个数对应的索引值
            let index = arrInner.findIndex(item => item === arr[j])
            // 删除第二个数
            if (index >= 0) arrInner.splice(index, 1)
            // 将两个数计算出来的结果遍历，与剩下来的各项，即arrInner组成新的数组
            res.forEach(item => {
                // 运用递归算法遍历新生成的数组，直至算完所有可能的值
                if (arrInner.length) {
                    // 存储上一次的算式
                    item.text = exp + item.exp
                    // 递归至所有数的计算结果
                    item.children = item.children.concat(findRes([item.value, ...arrInner], (item.text + ",")))
                } else {
                    // 跳出递归后，最后一次的结果，此处记录各层的算式
                    item.text = exp + item.exp
                    // 找出能算出 24 的方法
                    if (item.value === 24) {
                        // 将对应的方法添加进答案的集合中
                        answers.push(item)
                    }
                }
            })
            // 将各个可能值放入 开始声明的接收结果的数组中
            result.push(res)
        }
    }
    // 返回真个 结果数组
    return result
}

//计算两个数值的加减乘除
function cpt(a, b) {
    return [
        {
            exp: `${a}+${b}=${a + b}`,
            value: a + b,
            children: []
        },
        {
            exp: `${a}-${b}=${a - b}`,
            value: a - b,
            children: []
        }, {
            exp: `${a}*${b}=${a * b}`,
            value: a * b,
            children: []
        }, {
            exp: `${a}/${b}=${a / b}`,
            value: a / b,
            children: []
        }, {
            exp: `${b}-${a}=${b - a}`,
            value: b - a,
            children: []
        }, {
            exp: `${b}/${a}=${b / a}`,
            value: b / a,
            children: []
        }
    ]
}

// 创建 随机数
function createNum(num = 4) {
    // 清空数字列表和答案列表两个数组
    arr = []
    answers = []
    expression = []
    answerText.innerText = "";
    takeText.innerText = ""
    // 开始生成随机数
    for (let index = 0; index < num; index++) {
        // 生成一个随机整数
        let num = parseInt(Math.random() * 10)
        // 不允许生成为 0 的数字
        num = num === 0 ? 1 : num
        // 将生成的数字存入数字列表里
        arr.push(num)
    }
    // 将生成的数字集合逐一放入 HTML 中
    let div = document.querySelector('.number-box');
    div.innerHTML = arr.map(item => `<button>${item}</button>`).join('')
    let btnList = document.querySelectorAll(".container button");
    btnList.forEach(item=>item.disabled = false)
    // 调用寻找解题答案的函数
    findRes(arr)
    lisClick()
}
// 验证答案是否正确 
function checkAnswer(str) {
    // 若此题无解，返回相应的提示
    if (!answers.length) return alert("此题无解！！！")
    // 查询是否有此答案
    let strrev = expression.reverse().join("")
    let res = answers.find(item => item.text.includes(str) || item.text.includes(strrev))
    // 判定最终结果
    if (res) {
        alert("恭喜您，答对了!");
        answerText.innerText = res.text
        createRecord(true)
    }
    else {
        alert("对不起，您答错了!")
        console.log(answers);
        answerText.innerText = answers[0].text
        createRecord(false)
    }
    setTimeout(() => createNum(), 3000);

}

// 数字与符号的点击事件
function lisClick(params) {
    // 获取所有的 +、-、*、/ 对象
    let btnList = document.querySelectorAll(".container button");
    // 各个 li 对象的点击函数
    for (let i = 0; i < btnList.length; i++) {
        btnList[i].onclick = function () {
            this.disabled = !this.disabled
            // 若表达式数组完成，可继续添加项进入数组中
            if (expression.length < 3) {
                expression.push(this.innerText)
            } else {
                // 若 expression 已完整后，需要清空再重新加入 表达式各项
                expression = [];
                expression.push(this.innerText)
                btnList.forEach(item => item.disabled = false)
                this.disabled = true
            }
            takeText.innerText = expression.join('')
        }
    }
}
// 创建答题记录
function createRecord(status) {
    record += 1
    status ? right += 1 : err += 1
    document.querySelector('.count').innerText = record
    document.querySelector('.right').innerText = right
    document.querySelector('.err').innerText = err
}


