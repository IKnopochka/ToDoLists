import {ActionType, div, mult, salaryReducer, StateType, sub, sum} from "./tasks";


test('summary of salary', ()=> {
    //1. Data for test
    const salary: number = 800
    const n: number = 200

    //2. Do test code
    const result = sum(salary, n)

    //3. Check results
    expect(result).toBe(1000)
})

test('minus', () => {
    expect(sub(1200, 200)).toBe(1000)
})
test('divide', () => {
    expect(div(1000, 2)).toBe(500)
    expect(div(0, 0)).toBe(NaN)
})
test('multiply', () => {
    expect(mult(200, 200)).toBe(40000)
    expect(mult(0, 0)).toBe(0)
})

test("reducer case sum", () => {
    const salary: StateType = 800
    const action: ActionType = {
        type: 'SUM',
        n: 200
    }
    expect(salaryReducer(salary, action)).toBe(1000)
    expect(salaryReducer(salary, {type: 'TEST', n: 1000})).toBe(800)
})
test("reducer case sub", () => {
    const salary: StateType = 800
    const action: ActionType = {
        type: 'SUB',
        n: 200
    }
    expect(salaryReducer(salary, action)).toBe(600)
})
test("reducer case div", () => {
    const salary: StateType = 800
    const action: ActionType = {
        type: 'DIV',
        n: 2
    }
    expect(salaryReducer(salary, action)).toBe(400)
})
test("reducer case mult", () => {
    const salary: StateType = 800
    const action: ActionType = {
        type: 'MULT',
        n: 2
    }
    expect(salaryReducer(salary, action)).toBe(1600)
})