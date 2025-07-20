function countComment(data) {

    let count = 0
    for( arr of data) {
        let queue = [arr]
        while(queue.length) {
            let node = queue.shift()
    
            if (node.comment) count++
      
            if(node.reply && node.reply.length > 0) {
                queue.push(...node.reply)
            } 
        }  
    }
    console.log(count)


}

countComment([
    {
        "comment": "1",
        "reply": [
        {
            "comment": "1.1",
            "reply": [{
                "comment": "1.1.1",
            }]
        }
        ]
    },
    {
        "comment": "2",
        "reply": [
        {
            "comment": "2.1",
            "reply": [{
                "comment": "2.1.1",
            }]
        }
        ]
    }
]
)