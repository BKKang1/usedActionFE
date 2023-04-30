import {atom} from 'recoil'
import {recoilPersist} from "recoil-persist"

const {persistAtom} = recoilPersist();

export const loginId=atom({
    key:'loginId',
    default:null,
    effects_UNSTABLE: [persistAtom],
});
export const nicknameKey=atom({
    key:'nicknameKey',
    default:null,
    effects_UNSTABLE: [persistAtom],
});
