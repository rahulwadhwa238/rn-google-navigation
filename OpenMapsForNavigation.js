import { Linking, ActionSheetIOS } from 'react-native'

const openNavigation = (businessDetail) => {
    const label = businessDetail?.business_name;
    const latLng = `${businessDetail?.latitude},${businessDetail?.longitude}`

    const googleMapsUrl = `http://maps.google.com/maps?aaddr=0,0&daddr=${label}(${latLng})`
    const appleMapsScheme = `maps://0,0?q=${label}@${latLng}`
    const googleMapsScheme = `comgooglemaps://?aaddr=0,0&daddr=${label}@${latLng}`

    if (Platform.OS === 'ios') {
        Linking.canOpenURL(googleMapsScheme).then((response) => {
            if (response) {
                let mapOptions = ['Cancel', 'Maps', 'Google Maps']
                ActionSheetIOS.showActionSheetWithOptions(
                    {
                        options: mapOptions,
                        cancelButtonIndex: 0,
                        userInterfaceStyle: 'light'
                    },
                    buttonIndex => {
                        if (buttonIndex === 1) {
                            Linking.openURL(appleMapsScheme)
                        } else if (buttonIndex === 2) {
                            Linking.openURL(googleMapsScheme)
                        }
                    }
                )
            }
            else {
                Linking.openURL(appleMapsScheme)
            }
        }).catch(() => {
            Linking.openURL(appleMapsScheme)
        })
    }
    else {
        Linking.openURL(googleMapsUrl)
    }

}