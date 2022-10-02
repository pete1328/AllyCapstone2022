import { React, useState } from "react";
import { KudosCustom } from "../components/KudosCustom";
import { KudosWizard } from "../components/KudosWizard";
import { KudosPoints } from "../components/KudosPoints";
import { KudosGif } from "../components/KudosGif";
import { KudosFont } from "../components/KudosFont";
import { KudosResult } from "../components/KudosResult";
import { KudosShare } from "../components/KudosShare";

export const kudosStateOptions = {
    Custom : 'custom',
    Wizard : 'wizard',
    Points : 'points',
    Gif : 'gif',
    Font : 'font',
    Result : 'result',
    Share : 'share'
}

export function KudosPage () {
    const [kudosState, setKudosState] = useState(kudosStateOptions.Custom);
    const [draft, setDraft] = useState("");
    const [gif, setGif] = useState("");
    const [font, setFont] = useState("font-poppins font-bold");
    const [points, setPoints] = useState(25);

    function updateParent(page, message, gif, font, points) {
        setKudosState(page);
        setDraft(message);
        setGif(gif)
        setFont(font);
        setPoints(points);
    }

    return (
        <main>
            { kudosState === kudosStateOptions.Custom &&
                <KudosCustom kudosState={kudosStateOptions.Custom} draft={draft} gif={gif} font={font} points={points} onChange={updateParent}/>
            }
            { kudosState === kudosStateOptions.Wizard &&
                <KudosWizard kudosState={kudosStateOptions.Wizard} draft={draft} gif={gif} font={font} points={points} onChange={updateParent}/>
            }
            { kudosState === kudosStateOptions.Gif &&
                <KudosGif kudosState={kudosStateOptions.Gif} draft={draft} gif={gif} font={font} points={points} onChange={updateParent}/>
            }
            { kudosState === kudosStateOptions.Points &&
                <KudosPoints kudosState={kudosStateOptions.Points} draft={draft} gif={gif} font={font} points={points} onChange={updateParent}/>
            }
            { kudosState === kudosStateOptions.Result &&
                <KudosResult kudosState={kudosStateOptions.Result} draft={draft} gif={gif} font={font} points={points} onChange={updateParent}/>
            }
            { kudosState === kudosStateOptions.Font &&
                <KudosFont kudosState={kudosStateOptions.Font} draft={draft} gif={gif} font={font} points={points} onChange={updateParent}/>
            }
            { kudosState === kudosStateOptions.Share &&
                <KudosShare kudosState={kudosStateOptions.Share} draft={draft} gif={gif} font={font}  points={points} onChange={updateParent}/>
            }         
        </main>
    )
}