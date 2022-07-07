function mauvaisNomDeDomaine(){
    if(location.host !== "musicoll.com" && location.host !== "www.musicoll.com"){
        document.querySelector("html").remove();
    }
};
mauvaisNomDeDomaine();

function mauvaisProtocol(){
    if(location.protocol !== "https:"){
        location.protocol="https:";
    }
};
mauvaisProtocol();