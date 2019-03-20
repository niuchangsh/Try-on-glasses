let imgObj = document.getElementById('preview-pic'); 
let pArea = document.querySelector(".preview");
let model_boy = document.getElementById('model_boy');
let model_girl = document.getElementById('model_girl');


model_boy.onclick = function(){
    imgObj.src="imgs/model_boy.jpg";
    calcPicPosition(imgObj,'imgs/model_boy.jpg');
};
model_girl.onclick = function(){
    imgObj.src="imgs/model_girl.jpg";
    calcPicPosition(imgObj,'imgs/model_girl.jpg');
};


function addGlasses(){
    let goods = document.querySelector('.goods');
    let lastNode;
    goods.addEventListener('click',function(e){
        let classArr = e.target.className.split(' ');
        if(classArr.indexOf('glasses') >= 0){
            let glasses = document.createElement('div');
            pArea.appendChild(glasses);
            glasses.style.position = 'absolute';
            glasses.className = classArr[1] + ' adjustment';
            if(lastNode){          
                glasses.style.top = lastNode.style.top;
                glasses.style.left = lastNode.style.left;
                glasses.style.width = lastNode.style.width;
                glasses.style.height = lastNode.style.height;
                pArea.removeChild(lastNode);
            }else{
                glasses.style.top = 33 + '%';
                glasses.style.left = 31 + '%';
                glasses.style.right = 0 + 'px';
            }
            lastNode = glasses;
            let isDrag = false;
            let bx,by;
            let bounding;
            glasses.onmousedown = function(e){
                bounding = glasses.getBoundingClientRect()
                bx = e.pageX - bounding.left;
                by = e.pageY - bounding.top;
                if(bx < bounding.width-10 && by < bounding.height-10){
                    isDrag = true;     
                }                 
            };
            pArea.addEventListener('mousemove',function(e){
                let top,left;
                if(isDrag === true){
                    top = e.pageY - pArea.getBoundingClientRect().top -by;
                    left = e.pageX - pArea.getBoundingClientRect().left-bx;
                    glasses.style.top = Math.max(0,Math.min(top,pArea.offsetHeight-bounding.height)) + 'px';
                    glasses.style.left = Math.max(0,Math.min(left,pArea.offsetWidth-bounding.width)) + 'px';
                }
            });
            glasses.onmouseup = function(e){
                isDrag = false;
                lastNode = this;
            };
        }
    });
}


window.onload = function(){
    addGlasses();
};


