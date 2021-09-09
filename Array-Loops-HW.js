#!Rosh Hashannah hw  Loops and arrays

// 1. Write a function that gets an array of numbers, the function will calculate and return the sum of numbers in the array.

// unit testing:
let nums = [1, 4, 6, 3]
let res = sum(nums)
console.log(`${nums} - Expecting: 14, Got: ${res}`)


// naive iterative loop solution:
function sum(arr) {
    let total = 0
    for (let i = 0; i < arr.length; i++) {
        total += arr[i]
    }
    return total
}

function sum(arr) {
    let total = 0;
    for (let val of arr) {
        total += val
    }
    return total
}

function sum(arr) {
    let total = 0
    let i = 0
    while (i < arr.length) {
        total += arr[i++]
    }
    return total
}


// reduce iterative solution:

nums.reduce((accumulator, currValue) => accumulator + currValue, 0)

nums.reduce(function(accumulator, currValue) {
    return accumulator + currValue
}, 0)

function sum(nums) {
    return nums.reduce((accumulator, currVal) => {
        return accumulator + currVal
    }, 0)
}

// recursive solution:
function sum(arr) {
    if (arr.length === 0) return 0
    return arr[0] + sum(arr.slice(1))
}


//#################################################################################################################################################
// 2. Write a function that gets an array of grades. The function will calculate and return an average of grades
// unit testing
let grades = [80, 55, 90, 100]
let res = average(grades)
console.log(`${grades} - Expecting: 81.25, Got: ${res}`)


//Naive iterative loop O(n)
function average(arr) {
    let count = 0
    let total = 0
    for (let i = 0; i < arr.length; i++) {
        total += arr[i]
        count++
    }
    return total / count
}

function average(arr) {
    // let count = arr.length
    let total = 0
    for (let val of arr) {
        total += val
    }
    return total / arr.length //return total / count
}



// reduce iterative:
function average(arr) {
    let count = arr.length
    let sum = arr.reduce((acc, currVal) => acc + currVal)
    return sum / count
}

// recursive non-iterative  HOW To TURN this into a CLOSURE???????????????????????????????
function average(arr) {
    let count = arr.length
        //recursive helper function
    function sumRecursive(arr) {
        if (!arr.length) return 0
        return arr[0] + sumRecursive(arr.slice(1))
    }
    let total = sumRecursive(arr)
    console.log('total', total)
    return total / count
}

//same recursive but with function expression instead of function definition:
function average(arr) {
    let count = arr.length //4
        //recursive helper function
    const sum = (arr) => { //returns function reference if you don't call it
        if (!arr.length) return 0
        return arr[0] + sum(arr.slice(1)) //pay attention! use sum not average for recursive call
    }
    let total = sum(arr)
    console.log('total', total)
    return total / count
}

//another option:
function average(arr) {
    let total = sum(arr) //just call the function from exercise one
    return total / arr.length
}

//#################################################################################################################################################
// 3. write a function that takes in an array. ומספר לאי שיוון?, 
// The function will calculate and return the sum of numbers in the array that are biggger than the number we sent

// unit testing
let nums = [1, 4, 6, 3]
let n = 3
let res = sumBigger(nums, n)
console.log(`${nums} and ${n} - Expecting 10, Got: ${res}`)

// Naive iterative solution
function sumBigger(arr, number) {
    let finalTotal = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > number) {
            finalTotal += arr[i]
        }
    }
    return finalTotal
}

// again using for..of 
function sumBigger(arr, number) {
    let finalTotal = 0;
    for (let val of arr) {
        if (val > number) {
            finalTotal += val
        }
    }
    return finalTotal
}


// Naive iterative solution extract function + add function:  SAME LIKE above but in two steps instead of one.
function sumBigger(arr, number) {
    let toSum = []
    let finalTotal = 0
        //1. first- extract numbers bigger than number
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > number) {
            toSum.push(arr[i])
        }
    }
    //2. second- add numbers in new arr created toSum
    // setTimeout()  - does the first loop finish first and fill up toSum before second loop runs? otherwise it wont work. (but it works)
    //Does js read the first for loop and only when finished goes on to the second for loop? single threaded and syncrhonous
    //how to wrap a setTimout() around a for loop?
    for (let i = 0; i < toSum.length; i++) {
        finalTotal += toSum[i]
    }


    return finalTotal
}

// Do keep in mind that single threaded is not the same as synchronous. Single threaded means “one thing at a time.” Synchronous means “finish before moving on.” Without the help of asynchronous APIs, core JavaScript is both single threaded and synchronous.



//HOW TO COMBINE - both finding the numbers that are bigger than num and adding them up - all into ONE recursive function or reduce function???????
//again using reduce:

function sumBigger(arr, number) {

    let toSum = []

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > number) {
            toSum.push(arr[i])
        }
    }
    let total = toSum.reduce((acc, currVal) => acc + currVal)
    return total
}




// again using recursion
function sumBigger(arr, number) {
    let toSum = []

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > number) {
            toSum.push(arr[i])
        }
    }

    function recursiveAdd(arr) {
        if (arr.length === 0) return 0
        return arr[0] + recursiveAdd(arr.slice(1))
    }
    let total = recursiveAdd(toSum)
    return total
}



//#################################################################################################################################################
// 4. Write a function that gets an array of numbers, and a number to find. The function will calculate and return the number of times that the number appeared in the array 

let nums = [1, 4, 7, 9, 7, 55, 7, 6, 3]
let n = 7
let res = numberOfTimes(nums, n)
console.log(`${nums} and ${n} - Expecting: 3, Got: ${res}`)

//לא טוב  כי אם יש לך גם מלא 2 מלא 3 מלא 1 זה יוריד ל123 והגודל יהיה 3 אז לא תוכל לחשב כמה ירדו רק של ה3 xxxxx
// let lengthBefore = nums.length 
// let set = new Set(nums)
// let lengthAfter = set.size


function numberOfTimes(arr, number) {
    let count = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === number) {
            count++
        }
    }
    return count
}

//#################################################################################################################################################
// 5. Write a function that gets an array of numbers, the function will calculate and return a new array that containes all the even numbers

let nums = [9, 2, 13, 7, 6, 3, 4]
let res = evenNumbers(nums)
console.log(nums, 'Expecting: [2,6,4], Got:', res)

//Using array.prototype.filter() - The filter() method creates a new array with all elements that pass the test implemented by the provided function.
nums.filter(x => x % 2 === 0) // [2,6,4]

// is this a good use of forEach() method or not??????????
function evenNumbers(arr) {
    let evens = []
    nums.forEach(x => {
        if (x % 2 === 0) {
            evens.push(x)
        }
    })
    return evens
}


//Naive iterative solution:
function evenNumbers(arr) {
    let evens = []
    for (let i = 0; i === i % arr.length; i++) {
        let val = arr[i]
        if (val % 2 === 0) {
            evens.push(val)
        }
    }
    return evens
}

function evenNumbers(arr) {
    let evens = []
    for (let val of arr) {
        if (val % 2 === 0) evens.push(val)
    }
    return evens
}

function evenNumbers(arr) {
    let evens = []
    let i = 0
    while (i < arr.length) {
        if (arr[i] % 2 === 0) {
            evens.push(arr[i])

        }
        i++
    }
    return evens
}

// useless: don't do
// function evenNumbers(arr) {
// let evens = []
// arr.filter(even =>{

//  if(even%2 === 0) {
//      evens.push(even)
//  }
// })
// return evens
// }

//#################################################################################################################################################
// 6. Write a function that gets an array of objects describing students. The function will calculate and return a new Array of objects that contain the average grades of the students.

let objArr = [{ firstName: 'Jack', grades: [90, 80, 60] },
    { firstName: 'David', grades: [95, 100, 78] }
]
let res = students(objArr)
console.log(objArr, 'Expecting: [{firstName:"Jack", avg: 76.66},{firstName: "David", avg: 91}]', res)

function students(objArr) {
    let entry = []
    for (let i = 0; i < objArr.length; i++) {
        entry.push({ firstName: objArr[i].firstName, avg: average(objArr[i].grades) }) //toFixed(2) turns into a string I want a number
    }
    return entry
}
//Taken from previous exercise: call this from inside the loop:
function average(arr) {
    let total = 0
    for (let val of arr) {
        total += val
    }
    return total / arr.length
}







// AGAIN worse solution:
function students(objArr) {
    // for (let i = 0; i < objArr.length; i++) {

    //     let avg1 = average(objArr[i].grades)    //[90, 80, 60]
    //     let avg2 = average(obj.Arr[i].grades)  //[95, 100, 78]
    // }
    return [{
        firstName: objArr[0].firstName, //'Jack'
        avg: average(objArr[0].grades) //call function average()
    }, {
        firstName: objArr[1].firstName, //'David'
        avg: average(objArr[1].grades) //call function average() 
    }]

}
//Taken from previous exercise:
function average(arr) {
    let total = 0
    for (let val of arr) {
        total += val
    }
    return total / arr.length
}


// Another way using O(n^2) with 2 loops:
let students = [{
    firstName: "Joe",
    lastName: "Sun",
    grades: [78, 65, 78, 55, 66]
}, {
    firstName: "Eti",
    lastName: "Amir",
    grades: [30, 80, 75, 95, 100]
}]


function getGrades(arr) {
    let studentGrades = []
    let sum;


    for (let i = 0; i < arr.length; i++) { //ROWS
        sum = 0; //second loop מאפס sum so can be used again
        console.log('arr', arr)
        for (let j = 0; j < arr[i].grades.length; j++) { //COLUMNS
            // console.log('arr[i].grades',arr[i].grades[j])  //prints each grade in the arr.
            //arr[i].grades  gives you: (6) [100, 80, 60, 70, 95, 65]
            //arr[i].grades[j] gives you :  all 5 umbers one after another. 
            //arr[1].grades[j] (on second loop) gives you : all 5 numbers of second object. 
            let grade = arr[i].grades[j] //prints each grade in the arr.
                // console.log('grade',grade)
            sum += grade
        }
        // console.log('gradearrray length:' ,arr[i].grades.length)  //prints length: 5 of each array
        let gradeArrayLength = arr[i].grades.length
        avg = sum / gradeArrayLength
        console.log('avg', avg, 'sum', sum)
        studentGrades.push({ firstName: arr[i].firstName, lastName: arr[i].lastName, grades: avg })
    }
    return studentGrades
}



// destructuring: ?????? How to destructure an object in the parameter that's in an array plus when there is 2 or more objects???

// for...in:??????

//#################################################################################################################################################