import React, { useEffect, useState } from 'react';

import { Button, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from 'react-native';

import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import BarcodeMask from 'react-native-barcode-mask';
import { Center } from 'native-base';
import axios from "axios";
// import { BASE_URL } from '../config';
// import { AuthContext } from '../../components/context';

var qs = require('qs');

const finderWidth: number = 400;
const finderHeight: number = 400;

const width = Dimensions.get('window').width;

const height = Dimensions.get('window').height;

const viewMinX = (width - finderWidth) / 2;

const viewMinY = (height - finderHeight) / 2;



export default function BarCodeScanScreen() {

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const [type, setType] = useState<any>(BarCodeScanner.Constants.Type.back);

  const [scanned, setScanned] = useState<boolean>(false);

  const navigation = useNavigation();

  useEffect(() => {

    (async () => {

      const { status } = await BarCodeScanner.requestPermissionsAsync();

      setHasPermission(status === 'granted');

    })();

  }, []);

  const handleBarCodeScanned = (scanningResult: BarCodeScannerResult) => {

    if (!scanned) {

      const { type, data, bounds: { origin } = {} } = scanningResult;

      // @ts-ignore

      const { x, y } = origin;

      if (x >= viewMinX && y >= viewMinY && x <= (viewMinX + finderWidth / 2) && y <= (viewMinY + finderHeight / 2)) {

        setScanned(true);
        const data_qr = (JSON.parse(data));
        const location_id = data_qr.location_id
        axios.get(`http://bkompass.onrender.com/locations/${location_id}`)
            .then(res => {
              alert('Check-in thành công' );
              console.log(res.data);
              (navigation.navigate as any)("Home", { locationId: location_id });
            })
            .catch(e => {
              alert(`Ma QR khong hop le, vui long quet lai`);
              console.log(e);
            })
      }
    }

  };
  if (hasPermission === null) {
    // return <Text>Requesting for camera permission</Text>;
    return(null);
  }
  if (hasPermission === false) {
    return (
      <Center>
        <Text>No access to camera</Text>
        <Text>Please ReOpen your App and gain permission to use this scanQR feature</Text>
        <Text>Or open Setting -&gt; ZPPark -&gt; permission, and allow permission for using camera</Text>
      </Center>
    );
  }

  return (

    <View style={{ flex: 1 }}>

      <BarCodeScanner onBarCodeScanned={handleBarCodeScanned}

        type={type}

        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}

        style={[StyleSheet.absoluteFillObject, styles.container]}>

        <View

          style={{

            flex: 1,

            backgroundColor: 'transparent',

            flexDirection: 'row',

          }}>

          <TouchableOpacity

            style={{

              flex: 1,

              alignItems: 'center',

            }}

            onPress={() => {
              setType(
                type === BarCodeScanner.Constants.Type.back

                  ? BarCodeScanner.Constants.Type.front
                  : BarCodeScanner.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18,  color: 'white',fontWeight:'bold',marginTop:75}}> Quét mã QR tại địa điểm </Text>
          </TouchableOpacity>
        </View>
        <BarcodeMask width={250} height={250} edgeColor="#62B1F6" showAnimatedLine />
        {scanned && <Button title="Scan Again" onPress={() => setScanned(false)} />}
      </BarCodeScanner>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});