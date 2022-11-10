let a = 6, b = 4, c = 2, d = 1;
let arr = [8, 5, 8, 6]

let val = findRes(arr)
console.log("val:", val);

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
                    // console.log(item.value);
                    item.text = exp + item.exp
                    if(item.value === 24) {
                        result.push(item)
                        console.log(result)
                    }
                }
            })
            // result.push(res)
        }
    }
    return result
}


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
