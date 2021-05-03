let c = document.getElementById("mycanvas");
let ctx = c.getContext("2d");

let loadImage = (src, callback) => {
    let img = document.createElement("img");
    img.onload = () => callback(img);
    img.src = src;
};


let imagePath = (frameNumber,animation) => {
    return "images/"+ animation+ "/"+ frameNumber +".png";
}

let frames = {
    idle: [1,2,3,4,5,6,7,8],
    kick: [1,2,3,4,5,6,7],
    punch: [1,2,3,4,5,6,7],
    forward: [1,2,3,4,5,6],
    backward: [1,2,3,4,5,6],
    block: [1,2,3,4,5,6,7,8,9]
};

let LoadImages = (callback) => {
    // callbacks with an array of loaded images.
    let images = {idle: [], kick: [], punch: [], forward: [], backward: [], block: []};
    let imagesToLoad = 0;
    
    ["idle", "kick", "punch", "forward", "backward", "block"].forEach((animation) => {
        let animationframes = frames[animation];
        imagesToLoad = imagesToLoad+animationframes.length;
        animationframes.forEach((frameNumber) => {
            let path = imagePath(frameNumber,animation);

            loadImage(path, (image) => {
                images[animation][frameNumber-1]=image;
                imagesToLoad -= 1;

                if(imagesToLoad===0)
                    callback(images);
        });
        
        });
    });
};

let animate = (ctx, images,animation, callback) => {
    images[animation].forEach((image,index) => {
        setTimeout(()=>{
            ctx.clearRect(0,0,500,500);
            ctx.drawImage(image,0,0,500,500);
        }, index*100);
    });

    setTimeout(callback, images[animation].length*100);
};
LoadImages((images) => {
    let queuedAnim = [];

    let aux = () => {
        let selectedAnim;
        if(queuedAnim.length===0)
            selectedAnim="idle";
        else
            selectedAnim = queuedAnim.shift();
        animate(ctx, images, selectedAnim, aux);
    };
    aux();

    document.getElementById("kick").onclick = () => {
        queuedAnim.push("kick");
    };

    document.getElementById("punch").onclick = () => {
        queuedAnim.push("punch");
    };

    document.getElementById("forward").onclick = () => {
        queuedAnim.push("forward");
    };

    document.getElementById("backward").onclick = () => {
        queuedAnim.push("backward");
    };

    document.getElementById("block").onclick = () => {
        queuedAnim.push("block");
    };

    document.addEventListener("keyup", (event)=>{
        const key = event.key;
        if(key==="ArrowLeft")
            queuedAnim.push("kick");
        else if(key==="ArrowRight")
            queuedAnim.push("punch");
        else if(key==="ArrowUp")
            queuedAnim.push("forward");
        else if(key==="ArrowDown")
            queuedAnim.push("backward");
        else
            queuedAnim.push("block");
    });

    document.addEventListener("")
});