function setup(){
canvas=createCanvas(600,500);
Video=createCapture(VIDEO);
canvas.center();
Video.hide()
}
status="";objects=[];
function draw(){
image (Video,0,0,600,500);
if(status !=""){
garvit.detect(Video,gotResult);
for(i=0;i<objects.length;i++)
    {
    document.getElementById("status").innerHTML="DETECTED!";
    stroke("green");
    percent=floor(objects[i].confidence*100);
    text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
    noFill ();
    stroke("red");
    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    if(objects[i].label==onme){
        Video.stop;
        garvit.detect(gotResult);
        document.getElementById("status").innerHTML=onme+"found";
        sync=window.speechSynthesis;
        utterthis=new SpeechSynthesisUtterance(onme+"found");
        sync.speak(utterthis);
        
            } 
            else{
            document.getElementById("status").innerHTML=onme+"not found"
            }       
    }
    }
}
function on(){
garvit=ml5.objectDetector("cocossd",modelLoaded);
onme=document.getElementById("objectname").value; 
document.getElementById("status").innerHTML="detecting";
}
function modelLoaded(){
console.log("model has loaded");
status=true;
}
function gotResult(error,results){
    if(error){console.log(error);}
    else{console.log(results);objects=results;}
    }
