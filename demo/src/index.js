$(function () {
  let arr = []

  $('#handelSubmit').click(() => {
    let propertyItem = $('.action-group .property-item')
    propertyItem.each(item => {
      traverseTree(propertyItem.eq(item))
    })
    console.log(arr)
  })

  function traverseTree (node) {
    let top = node.children('.property-top'),
      child = node.children('.property-children')

    if (top.length !== 0) {
      arr.push({
        name: top.children('label').text(),
        select: top.children('select').val(),
        input: top.children('input').val()
      })
    }
    if (child.length !== 0) {
      child.each(item => {
        arr.push({
          name: child.eq(item).children('label').text(),
          select: child.eq(item).children('select').val(),
          input: child.eq(item).children('input').val()
        })
        traverseTree(child.eq(item))
      })
    }
  }
})