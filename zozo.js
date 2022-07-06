let audio=document.querySelector("audio");
let bouton=document.querySelector(".boutonPlay"); 
let boutonGrandEcran=document.querySelector(".boutonGrandEcran");
let boutonVolume=document.querySelector(".boutonVolume");
let temps=document.querySelector(".temps"); 
let inputRange=document.querySelector(".inputRange"); 
let inputRangeVolume=document.querySelector(".inputRangeVolume"); 

function minutesSecondes(resultatTemps){
    let temps=resultatTemps/60;
    let minutes=Math.trunc(temps);
    let secondes=Math.trunc((temps-minutes)*60);
    if(minutes<10){
        affichageMinutes="0"+minutes+":";
    }else{
        affichageMinutes=minutes+":";
    };
    if(secondes<10){
        affichageSecondes="0"+secondes;
    }else{
        affichageSecondes=secondes;
    };
    return affichageMinutes+affichageSecondes;
};

function gradientInputRange(inputRange){
    let valeurGradient=(inputRange.value/inputRange.max)*100;
    inputRange.style.background="linear-gradient(90deg, #03a9f4 "+valeurGradient+"%, white 0%)";
};
    
    setTimeout(function() {
        inputRange.min=0;
        inputRange.max=Math.round(audio.duration);
        temps.textContent=minutesSecondes(audio.currentTime)+"/"+minutesSecondes(audio.duration);
        inputRange.value=0;
    }, 2000);
    inputRange.step=1;
    inputRange.addEventListener("input", ()=>{
        audio.currentTime=inputRange.value;
        gradientInputRange(inputRange);
    });
    
    function playPauseAudio(boutonControle){
        boutonControle.addEventListener("click",()=>{
            if(audio.paused){
                audio.play();
                bouton.className="boutonPlay fas fa-pause";
            }else{
                audio.pause();
                bouton.className="boutonPlay fas fa-play";
            }
        });
    };
    
    playPauseAudio(bouton);
    playPauseAudio(audio);
    
    function volumeAudio(){
        inputRangeVolume.step=0.1;
        inputRangeVolume.min=0;
        inputRangeVolume.max=1;
        gradientInputRange(inputRangeVolume);
        inputRangeVolume.addEventListener("input", ()=>{
            gradientInputRange(inputRangeVolume);
            if(boutonVolume.className==="boutonVolume fas fa-volume-up"){
                audio.volume=parseFloat(inputRangeVolume.value);
            }
        });
        boutonVolume.addEventListener("click",()=>{
            if(audio.volume > 0){
                audio.volume=0;
                boutonVolume.className="boutonVolume fas fa-volume-mute";
            }else{
                audio.volume=parseFloat(inputRangeVolume.value);
                boutonVolume.className="boutonVolume fas fa-volume-up";
            }
        });
    };
    
    volumeAudio();
    
    audio.addEventListener('timeupdate',()=>{
        inputRange.value=audio.currentTime;
        gradientInputRange(inputRange);
        if(audio.currentTime===audio.duration){
        audio.currentTime=0;
        bouton.className="fas fa-play";
        };
        temps.textContent=minutesSecondes(audio.currentTime)+"/"+minutesSecondes(audio.duration);
    });