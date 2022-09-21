import { React, useState } from "react";
import { KudosCustom } from "../components/KudosCustom";
import { KudosWizard } from "../components/KudosWizard";
import { KudosPoints } from "../components/KudosPoints";
import { KudosGif } from "../components/KudosGif";
import { KudosFont } from "../components/KudosFont";
import { KudosResult } from "../components/KudosResult";
import { KudosShare } from "../components/KudosShare";

const kudosStateOptions = {
    Custom : 'custom',
    Wizard : 'wizard',
    Points : 'points',
    Gif : 'gif',
    Font : 'font',
    Result : 'result',
    Share : 'share'
}

export function KudosPage () {
    const [kudosState] = useState(kudosStateOptions.Custom);

    return (
        <main>
            { kudosState === kudosStateOptions.Custom &&
                <KudosCustom/>
            }
            { kudosState === kudosStateOptions.Wizard &&
                <KudosWizard/>
            }
            { kudosState === kudosStateOptions.Points &&
                <KudosPoints/>
            }
            { kudosState === kudosStateOptions.Gif &&
                <KudosGif/>
            }
            { kudosState === kudosStateOptions.Font &&
                <KudosFont/>
            }
            { kudosState === kudosStateOptions.Result &&
                <KudosResult/>
            }
            { kudosState === kudosStateOptions.Share &&
                <KudosShare/>
            }         
        </main>
    )
}