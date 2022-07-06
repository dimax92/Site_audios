import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Navigation from "../components/Navigation";

const Contenu = () => {
    const[nomFichier, setNomFichier] = useState();
    const[nom, setNom] = useState();
    const[description, setDescription] = useState();

    let { id } = useParams();

    function recevoirDonnees(id){
        axios.get("https://musicoll.com/backend/public/api/fichiers/"+id)
        .then((result)=>{
            setNomFichier(result.data.nomfichier);
            setNom(result.data.nom);
            setDescription(result.data.description);
        })
        .catch((error)=>{})
    }

    useEffect(()=>{
        recevoirDonnees(id);
    },[]);
    
    return (
        <div className="divContenu">
            <Navigation/>
            <h1>{nom}</h1>
            <div class='divAudio'>
                <audio>
                    <source src={"https://musicoll.com/backend/storage/app/fichiers/"+nomFichier} type="audio/mp3"></source>
                </audio>
                <div class='controles'>
                    <i class='boutonPlay fas fa-play'></i>
                    <div class="divVolume">
                        <i class="boutonVolume fas fa-volume-up"></i>
                        <input class="inputRangeVolume" type="range"/>
                        <div class="cacheVolume"></div>
                    </div>
                    <p class="temps"></p>
                    <input class='inputRange' id="inputrange" type='range'/>
                </div>
            </div>
            <h2>Description</h2>
            <p>{description}</p>
            <button onClick={()=>{
                document.location.href="https://musicoll.com/backend/public/api/download/"+id;
            }}>Telecharger</button>
        </div>
    )
}

export default Contenu;