function preload(){
    alarm = loadSound("alarm.mp3");
}
status= "";
objects= [];

function setup(){
    canvas= createCanvas(380,380);
    canvas.center();
    video= createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectdetector= ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting objects";
}
function modelLoaded(){
    console.log("model is loaded");
    status= true;
    
}

function gotResults(){
    function gotResults(error,results){
        if(error){
            console.error(error);
        }
        console.log(results);
        objects=results;
    }
}

function draw(){
    image(video, 0,0,380,380);
    if(status!=""){
        objectdetector.detect(video,gotResults);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML= "Status: Object Detected";   
            fill(255,0,0);
            percent= floor(objects[i].confidence*100);
            textSize(20);
            text(objects[i].label+" "+ percent+ "%",objects[i].x+15,objects[i].y+20);
            noFill();
            stroke(255,0,0);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label=="person"){
                document.getElementById("status").innerHTML= "Status: Baby Found";  
                alarm.stop();
            }
            else{
                document.getElementById("status").innerHTML= "Status: Baby not Found";  
                alarm.play();
            }
        }
    }
}