let num = [6, 4, 2]

function findRes(array) {
    for (let i = 0; i < array.length-1; i++) {
        for (let j = i+1; j < array.length; j++) {
            let arr = [...array]
        arr.splice(i)
        console.log(array[i],array[i+1]);
        }
        

    }
}

function cpt(a, b) {
    return [
        {
            exp: `${a}+${b}`,
            value: a + b,
            children: []
        }, {
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
console.log(cpt(1, 2)); 