console.log("Hello, polish caclculator!");

const operator = ["+", "-", "*", "/"]

calc("fffff")
calc("* + 1 2 + g 4")

// calc("+ 3 4") // Вывод 7
// calc("- 3 4") // Вывод -1
// calc("+ + * 3 5 - 2 6 + 3 5") // Вывод 19
// calc("- ( * 3 5 ) 7") // Вывод 8
// calc("*- 9 8 7") // Вывод 7
// calc(" - * / 15 - 7 + 1 1 3 + 2 + 1 1"); // Вывод 5
// calc("+ *(()()()()()()()()+ 6 7) 3      67") // Вывод 106

function calc(str: string) {
    const searcheExp = /\d+|[^0-9\s]/g;
    str = str.trim().replace(/[()]/g, ' ');
    const matches = str.match(searcheExp);
    let list: string[] = []

    if (matches !== null) {
        list = matches;
    }

    let result: string[]
    let isCalc = false

    while (isCalc == false) {
        let i = 0;
        let check = 0;
        let newOperand: string;
        result = []

        while (i < list.length) {

            if (operator.includes(list[i]) && !isNaN(Number(list[i + 1])) && !isNaN(Number(list[i + 2]))) {
                newOperand = OperatorSearch(list[i], list[i + 1], list[i + 2]);
                result.push(newOperand);
                check++
                i += 3;
            } else {
                result.push(list[i]);
                i++;
            }

        }

        if (result.length == 1) {
            console.log(result[0]);
            isCalc = true;
        } else if (check == 0) {
            console.log("Ошибка: данные введены неверно")
            isCalc = true;
        }

        list = result
    }

}

function OperatorSearch(a: string, b: string, c: string): string {
    switch (a) {
        case "+":
            return String(Number(b) + Number(c));
        case "-":
            return String(Number(b) - Number(c));
        case "*":
            return String(Number(b) * Number(c));
        case "/":
            if (c == "0") {
                throw new Error("Деление на ноль")
            }
            return String(Number(b) / Number(c));
        default:
            return c
    }

}

