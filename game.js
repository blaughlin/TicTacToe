const canvas = document.getElementById('myCanvas')

function collides(rects, x, y){
    let isCollision = false;
    for(let i=0; i < rects.length; i++){
        const left = rects[i].x, right = rects[i].x + rects[i].width
        const top = rects[i].y, bottom = rects[i].y + rects[i].height
        if (right >= x && left <=x && bottom >=y && top <=y ){
            isCollision = rects[i]
        }
    }
    return isCollision
}

// check if context exists
if (canvas && canvas.getContext){
    const rects=[{x:0, y:0, width:50, height:50}, {x:60, y:0, width:50, height:50}, {x:120, y:0, width:50, height:50},
                 {x:0, y:60, width:50, height:50}, {x:60, y:60, width:50, height:50}, {x:120, y:60, width:50, height:50},
                 {x:0, y:120, width:50, height:50}, {x:60, y:120, width:50, height:50}, {x:120, y:120, width:50, height:50}]
    const context = canvas.getContext('2d')
    if (context){
        for(let i=0; i < rects.length; i++){
            context.fillStyle = 'white'
            context.fillRect(rects[i].x, rects[i].y, rects[i].width, rects[i].height)
        } 
        context.fillStyle = 'black'
        context.fillRect(0, 50, 170, 10)
        context.fillRect(0, 110, 170, 10)
        context.fillRect(50, 0, 10, 170)
        context.fillRect(110, 0, 10, 170)
    }

    // listener
    canvas.addEventListener('click', function(e) {
        const rect = collides(rects, e.offsetX, e.offsetY)
        if (rect){
            console.log(rects.indexOf(rect))
        } else {
            console.log('no collision')
        }
    }, false)
}