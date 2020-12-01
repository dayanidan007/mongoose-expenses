
class ExpenseManger {

    getExpenses = async function () {
       let data = await $.get('/:expenses')
       return data
    }

    addExpense = async function (data) {
       let add = await $.post('/:expense',data)
       console.log(add) 
       return add
    }
}