

import * as RNLocalize from "react-native-localize";

function userLocation () {
console.log(RNLocalize.getCountry()); // -> 'UA'
}

export default userLocation;