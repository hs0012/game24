
let a = 6, b = 4, c = 2, d = 1;
let arr = [6,4,2,1]

findRes(arr)

function findRes(arr) {
    let arrInner = [...arr]
    let result = []
    for (let i = 0; i < arr.length-1; i++) {
        let res = []
        arrInner.splice(i,1)
        for (let j = i+1; j < arr.length; j++) {
            arrInner.splice(j,1)
            res = cpt(arr[i],arr[j])
            if(arrInner.length){
            res.forEach(item=> {
                // item.children = item.children.concat(findRes([item.value,...arrInner]))
                item.children.forEach(list=> list.children = list.children.concat(cpt(list.value,b)))
            })
            }
            result.push(res)
        }
    }
    console.log( result );
    return result
}


function cpt(a,b) {
    return [
        {
            exp: `${a}+${b}`,
            value: a+b,
            children: []
        },
        {
            exp: `${a}-${b}`,
            value: a-b,
            children: []
        },{
            exp: `${a}*${b}`,
            value: a*b,
            children: []
        },{
            exp: `${a}/${b}`,
            value: a/b,
            children: []
        },{
            exp: `${b}-${a}`,
            value: b-a,
            children: []
        },{
            exp: `${b}/${a}`,
            value: b/a,
            children: []
        }
    ]
}
