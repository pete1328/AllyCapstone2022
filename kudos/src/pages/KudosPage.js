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

    function changePage(page) {
        setKudosState(page);
    }

    return (
        <main>
            { kudosState === kudosStateOptions.Custom &&
                <KudosCustom kudosState={kudosStateOptions.Custom} onChange={changePage}/>
            }
            { kudosState === kudosStateOptions.Wizard &&
                <KudosWizard kudosState={kudosStateOptions.Wizard} onChange={changePage}/>
            }
            { kudosState === kudosStateOptions.Points &&
                <KudosPoints kudosState={kudosStateOptions.Points} onChange={changePage}/>
            }
            { kudosState === kudosStateOptions.Gif &&
                <KudosGif kudosState={kudosStateOptions.Gif} onChange={changePage}/>
            }
            { kudosState === kudosStateOptions.Font &&
                <KudosFont kudosState={kudosStateOptions.Font} onChange={changePage}/>
            }
            { kudosState === kudosStateOptions.Result &&
                <KudosResult kudosState={kudosStateOptions.Result} onChange={changePage}/>
            }
            { kudosState === kudosStateOptions.Share &&
                <KudosShare kudosState={kudosStateOptions.Share} onChange={changePage}/>
            }         
        </main>
    )
}