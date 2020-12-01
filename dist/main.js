
let expense = new ExpenseManger()
let renderer = new Renderer()

$('#render').on('click', async function () {
    let data = await expense.getExpenses()
    console.log(data)
    renderer.renderExpenses(data)
})

$('#add').on('click', async function () {
    const item = $('#item').val()
    const amount = $('#amount').val()
    const group = $('#group').val()
    let data = {
        item: item,
        amount: amount,
        date: new Date(),
        group: group
    }
   let somthing = await expense.addExpense(data)
    console.log(item)
    console.log(data)
    return somthing
})
