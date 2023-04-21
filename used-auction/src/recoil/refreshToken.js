import {atom} from 'recoil'
import {recoilPersist} from "recoil-persist"

const {persistAtom} = recoilPersist();

export const refreshToken=atom({
    key:'refreshToken',
    default:null,
    effects_UNSTABLE: [persistAtom],
});

