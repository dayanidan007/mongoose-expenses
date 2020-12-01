
class Renderer {

    renderExpenses(data) {
        $('#posts').empty()
        const source = $('#expenses-template').html();
        const template = Handlebars.compile(source)
        let newHtml = template({ data })
        $('#posts').append(newHtml)
    }
    renderAdd() {
        const source = $('#newExpenses-template').html();
        const template = Handlebars.compile(source)
        let newHtml = template({ data })
        $('#newPost').append(newHtml)
    }
}