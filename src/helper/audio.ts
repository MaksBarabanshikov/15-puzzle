import {IPosTile} from '../types/initial';

export const swapAudio = () => {
    const audio = document.querySelector<HTMLAudioElement>('#fifteenMusicSwap')!.play();
}

export const currentTileAudio = () => {
    const audio = document.querySelector<HTMLAudioElement>('#fifteenMusicCurrent')!.play();
    audio.then().catch((error) => console.log(error))
}

export const currentPlayAudio = (oldCurrentTile: any, newCurrentTile: any) => {
    newCurrentTile.forEach((newTile: HTMLElement) => {
        if (!oldCurrentTile.includes(newTile)) {
            currentTileAudio()
        }
    })
}
