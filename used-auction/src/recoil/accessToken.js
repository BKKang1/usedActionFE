import {atom} from 'recoil'
import {recoilPersist} from "recoil-persist"

const {persistAtom} = recoilPersist();
export const accessToken=atom({
    key:'accessToken',
    default:null,
    effects_UNSTABLE: [persistAtom],
});

