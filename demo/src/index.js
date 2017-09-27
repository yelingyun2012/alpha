// $(function () {
//   $('#handelSubmit').click(() => {
//     let a = $('.action-group .property-item')
//     let treeData = []
//     let treeData1 = []
//     a.each(item => {
//       let b = a.eq(item).find('.property-top')
//       treeData.push({
//         name: b.find('label').text(),
//         select: b.find('select').val(),
//         input: b.find('input').val()
//       })
//       let c = a.eq(item).children('.property-children')
//       if (c.length !== 0) {
//         c.map(item => {
//           console.log(c.eq(item).children('label').text())
//           treeData1.push({
//             name: c.eq(item).children('label').text(),
//             select: c.eq(item).children('select').val(),
//             input: c.eq(item).children('input').val()
//           })
//         })
//       } else {
//         console.log('2')
//       }
//       let d = a.eq(item).children('.property-children').children('.property-children')
//       if (d.length !== 0) {
//         // console.log(d)
//       } else {
//         console.log('2')
//       }
//     })
//     // console.log(treeData)
//     console.log(treeData1)
//   })
// })

var tree = {
  name: 'root',
  children: [{
    name: 'child1',
    children: [{
      name: 'child1_1',
      children: [{
        name: 'child1_1_1'
      }]
    }]
  }, {
    name: 'child2',
    children: [{
      name: 'child2_1'
    }]
  }, {
    name: 'child3'
  }]
}

function traverseTree (node) {
  let child = node.children,
    arr = []

  arr.push({name: node.name})
  if (child) {
    child.forEach(function (node) {
      arr = arr.concat(traverseTree(node))
    })
  }
  console.log(arr)
  return arr
}

traverseTree(tree)