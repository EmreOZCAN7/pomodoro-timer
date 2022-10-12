import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Vibration, ToastAndroid, Modal, TouchableWithoutFeedback } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from '../config/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const WindowWidth = Dimensions.get("window").width
const WindowHeight = Dimensions.get("window").height

const Homescreen = () => {
    const navigation = useNavigation();
    const timer = useRef(null);
    const [minutes, setMinutes] = useState(25)
    const [seconds, setSeconds] = useState(0)
    const [counterSwitch, setCounterSwitch] = useState(false)
    const [isFullScreen, setIsFullScreen] = useState(false)

    var time;
    useEffect(() => {
        if (counterSwitch == true) {
            time = setInterval(() => {
                setSeconds(seconds - 1);
                if (seconds === 0) {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
                if (minutes == 0 & seconds == 3) {
                    Vibration.vibrate(100);
                }
                if (minutes == 0 & seconds == 2) {
                    Vibration.vibrate(100);
                }
                if (minutes == 0 & seconds == 1) {
                    Vibration.vibrate(100);
                }
                if (minutes == 0 & seconds == 0) {
                    setMinutes(0);
                    setSeconds(0);
                    Vibration.vibrate(2000);
                    setCounterSwitch(false)
                }
            }, 1000)
            return () => clearInterval(time);
        } else if (counterSwitch == false) {
            null
        }
    });
    const showToast = () => {
        ToastAndroid.show('Minutes must be higher than zero!', ToastAndroid.SHORT);
    }
    const startCount = () => {
        if (minutes > 0 || seconds > 0) {
            setCounterSwitch(!counterSwitch)
        } else if (minutes == 0 & seconds == 0) {
            { showToast }
        }
    }
    const incrementMinute = () => {
        if (counterSwitch == false) {
            setMinutes((prevValue) => prevValue + 1)
            timer.current = setTimeout(incrementMinute, 150);
            setSeconds(0)
        }
    }
    const stopTimer = () => {
        clearTimeout(timer.current);
    }
    const decrementMinute = () => {
        if (counterSwitch == false & minutes > 0) {
            setMinutes((prevValue) => prevValue - 1)
            timer.current = setTimeout(decrementMinute, 200);
            setSeconds(0)
        } else if (counterSwitch == false & minutes <= 0) {

            setMinutes(0)
        }
    }

    const reset = () => {
        setMinutes(25),
            setSeconds(0),
            setCounterSwitch(false)
    }
    const showSeconds = () => {
        if (seconds < 10) {
            return (
                <Text>0{seconds}</Text>
            )
        } else {
            return (
                <Text>{seconds}</Text>
            )
        }
    }
    const showMinutes = () => {
        if (minutes < 10) {
            return (
                <Text>0{minutes}</Text>
            )
        } else {
            return (
                <Text>{minutes}</Text>
            )
        }
    }
    const goFullScreen = () => {
        setIsFullScreen(!isFullScreen)
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.timercontainer}>
                <TouchableOpacity style={styles.setbuttons} onPressIn={incrementMinute} onPressOut={stopTimer} >
                    <Ionicons name="caret-up" size={WindowWidth / 7} color={colors.fourth} />
                </TouchableOpacity>

                <Text style={styles.timertext}>{showMinutes()}:{showSeconds()}</Text>
                <TouchableOpacity style={styles.setbuttons} onPressIn={decrementMinute} onPressOut={stopTimer}>
                    <Ionicons name="caret-down" size={WindowWidth / 7} color={colors.fourth} />
                </TouchableOpacity>
            </View>

            <View style={styles.buttoncontainer}>
                <TouchableOpacity style={styles.button} onPress={startCount} activeOpacity={0.6}>
                    <Ionicons name={counterSwitch ? "pause-circle-outline" : "play-circle-outline"} size={WindowWidth / 9} color={colors.fourth} />
                    <Text style={styles.buttontext}> {counterSwitch ? "Stop Timer" : "Start Timer"}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.resetbuttoncontainer}>
                <TouchableOpacity style={styles.resetbutton} onPress={() => reset()}>
                    <Ionicons name="refresh" size={WindowWidth / 10} color={colors.fourth} />
                </TouchableOpacity>
              
                <TouchableOpacity style={styles.resetbutton} onPress={() => goFullScreen()}>
                    <Ionicons name="resize" size={WindowWidth / 7} color={colors.fourth} />
                </TouchableOpacity>
            </View>
            <Modal visible={isFullScreen}>
                <View style={styles.fscontainer}>
                    <View style={styles.fstimercontainer}>
                        <Text style={styles.fstimertext}>{showMinutes()}:{showSeconds()}</Text>
                        <TouchableOpacity style={styles.fsresetbutton} onPress={() => goFullScreen()}>
                            <Ionicons name="resize" size={WindowWidth / 7} color={colors.fourth} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fsbutton} onPress={startCount} activeOpacity={0.6}>
                            <Ionicons name={counterSwitch ? "pause-circle-outline" : "play-circle-outline"} size={WindowWidth / 7} color={colors.fourth} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    timercontainer: {
        alignItems: "center",
        marginVertical: WindowHeight / 11,
    },
    timertext: {
        fontSize: WindowWidth / 5.5,
        backgroundColor: colors.third,
        width: "80%",
        textAlign: "center",
        borderRadius: 900,
    },
    timertextfullscreen: {
        fontSize: WindowWidth / 3,
        backgroundColor: colors.third,
        textAlign: "center",
        borderRadius: 90,
        top: 330,
        paddingVertical: 10,
        transform: [{ rotate: '90deg' }]
    },
    resetbuttoncontainer: {
        alignItems: "center",
    },
    buttoncontainer: {
        alignItems: "center",
    },
    button: {
        backgroundColor: colors.secondary,
        padding: WindowWidth / 15,
        borderRadius: 20,
        alignItems: "baseline",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    buttontext: {
        fontSize: WindowWidth / 26,
        alignSelf: 'center',
    },
    setbuttons: {
        marginVertical: WindowHeight / 50,
        padding: WindowWidth / 36,
    },
    resetbutton: {
        marginVertical: WindowWidth / 15,
        padding: WindowWidth / 40,
    },
    fscontainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.primary,
    },
    fstimercontainer: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: WindowWidth / 5,
    },
    fstimertext: {
        fontSize: WindowWidth / 3,
        backgroundColor: colors.third,
        width: WindowWidth / 0.8,
        height: WindowHeight / 4,
        textAlign: "center",
        borderRadius: 900,
        transform: [{ rotate: '90deg' }]
    },
    fsresetbutton: {
        position: "absolute",
        top: WindowWidth / 1,
    },
    fsbutton: {
        transform: [{ rotate: '90deg' }],

        position: "absolute",
        top: WindowWidth / 1,
        left: WindowWidth / 3,
        borderRadius: 20,
        alignItems: "baseline",
        flexDirection: "row",
        justifyContent: "space-between",
    }
})

export default Homescreen