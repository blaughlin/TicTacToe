const elem = document.getElementById('myCanvas')

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
if (elem && elem.getContext){
    const rects=[{x:0, y:0, width:50, height:50},
                 {x:0, y:75, width:50, height:50}]
    const context = elem.getContext('2d')
    if (context){
        for(let i=0; i < rects.length; i++){
            context.fillRect(rects[i].x, rects[i].y, rects[i].width, rects[i].height)
        } 
    }

    // listener
    elem.addEventListener('click', function(e) {
        console.log('click ' + e.offsetX + '/' + e.offsetY)
        const rect = collides(rects, e.offsetX, e.offsetY)
        if (rect){
            console.log('collision ' + rect.x + '/' + rect.y)
        } else {
            console.log('no collision')
        }
    }, false)
}