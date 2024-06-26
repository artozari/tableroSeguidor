import React, { useState, useEffect, useRef, useContext, createContext } from "react";
import { SafeAreaView, StyleSheet, Text, StatusBar, TextInput, TouchableOpacity, ScrollView, Alert, ToastAndroid as Toast, View } from "react-native";
import Util from "./src/Utils";
import Temporizador from "./src/components/Temporizador";
import Reloj from "./src/components/Reloj";


const Control = createContext({ tempo: null });
export default function App() {

  const [cantCiclos, setCantCiclos] = useState(0);
  const [tiempoCiclos, setTiempoCiclos] = useState("");
  const [tiempoIntervalo, setTiempoIntervalo] = useState("");
  const [tiempoDescanso, setTiempoDescanso] = useState("");
  const [cantPomodoros, setCantPomodoros] = useState("");
  const [Alarmas, setAlarmas] = useState([]);

  const [tiempoRestante, setTiempoRestante] = useState(`00:00:00`);
  const [horaFinalizacion, setHoraFinalizacion] = useState("");
  const [horasAlarmas, setHorasAlarmas] = useState("");
  const [tempo, setTempo] = useState(null);
  const [game, setGame] = useState(false);

  const Input2 = useRef(null);
  const Input3 = useRef(null);
  const Input4 = useRef(null);
  const Input5 = useRef(null);

  const comenzar = () => {
    setTiempoRestante(Util.minToMili((cantCiclos * tiempoCiclos - tiempoIntervalo) + parseInt(tiempoDescanso)));
    if (tiempoCiclos > 0) {
      setTempo(true);
    } else {
      Toast.show("Debe ingresar el tiempo de ciclos", Toast.SHORT);
    }
  };

  const setearTempo = () => {
    if (tempo === true) {
      Alert.alert("Temporizador", "el temporizador se cancelo");
    }
    setTempo(!tempo);
  };

  const listaAlarmas = () => {
    return (
      Alarmas.map((alarma, index) => (
        <View View key={index} >
          <Temporizador
            tempo={tempo}
            setTempo={setTempo}
            tiempoRestante={alarma} // Pasa el objeto 'alarma' como prop
          />
        </View >
      )));
  };

  useEffect(() => {
    setAlarmas(Util.calcularAlarmas(cantCiclos, tiempoCiclos, tiempoIntervalo, tiempoDescanso, cantPomodoros));

  }, [tempo]);

  return (
    <SafeAreaView style={styles.container}>
      <Control.Provider value={{ tempo, setTempo }}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <StatusBar backgroundColor="#D9183B" barStyle="default" />
          <Text style={styles.titleMain}>Pomodoro</Text>
          <Reloj />
          {tempo && <Text> {listaAlarmas()}</Text>}
          <Text style={styles.descriptionText}>
            {"* "}
            Manual corto para utilizar tu aplicación: Configuración Cantidad de ciclos: Configura el número de ciclos que deseas realizar
            en la sesión de Pomodoro. Tiempo de ciclo: Configura el tiempo de cada ciclo (por defecto es de 25 minutos). Tiempo de
            descanso: Configura el tiempo de descanso entre cada ciclo (por defecto es de 5 minutos). Iniciar sesión Presiona el botón
            "Iniciar" para comenzar la sesión de Pomodoro. El temporizador comenzará a contar hacia atrás desde el tiempo configurado para
            cada ciclo. Campos Hora: Muestra la hora actual. Cantidad de ciclos: Muestra el número de ciclos que has completado. Tiempo
            restante: Muestra el tiempo restante para completar el ciclo actual. Botones Iniciar: Comienza la sesión de Pomodoro. Centrar
            en mi ubicación: Centra el mapa en tu ubicación actual. Buscar: Busca lugares en el mapa. Espero que este manual sea más útil
            para ti.
          </Text>
          <TextInput
            returnKeyType="next"
            style={styles.textInput}
            placeholder="Cantidad de ciclos"
            keyboardType="numeric"
            onChangeText={setCantCiclos}
            onSubmitEditing={() => Input2.current.focus()}
          />
          <TextInput
            returnKeyType="next"
            style={styles.textInput}
            placeholder="Tiempo de ciclos"
            keyboardType="numeric"
            onChangeText={setTiempoCiclos}
            onSubmitEditing={() => Input3.current.focus()}
            ref={Input2}
          />
          <TextInput
            returnKeyType="next"
            style={styles.textInput}
            placeholder="Intervalos del ciclo"
            keyboardType="numeric"
            onChangeText={setTiempoIntervalo}
            onSubmitEditing={() => Input4.current.focus()}
            ref={Input3}
          />
          <TextInput
            returnKeyType="next"
            style={styles.textInput}
            placeholder="Tiempo de descanso"
            keyboardType="numeric"
            onChangeText={setTiempoDescanso}
            onSubmitEditing={() => Input5.current.focus()}
            ref={Input4}
          />
          <TextInput
            returnKeyLabel="fin"
            returnKeyType="done"
            style={styles.textInput}
            placeholder="Cantidad de Pomodoros"
            keyboardType="numeric"
            onChangeText={setCantPomodoros}
            ref={Input5}
          />
          {!tempo &&
            <TouchableOpacity style={styles.button} onPress={comenzar}>
              <Text>INICIAR MÉTODO POMODORO</Text>
            </TouchableOpacity>}
          {tempo &&
            <TouchableOpacity style={styles.button} onPress={setearTempo}>
              <Text>DETENER</Text>
            </TouchableOpacity>}
        </ScrollView>
      </Control.Provider>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#732929",
    alignItems: "center",
    justifyContent: "center",
  },
  titleMain: {
    marginVertical: 20,
    color: "#F2F2F2",
    fontSize: 40,
    fontStyle: "normal",
    fontWeight: "bold",
  },
  textInput: {
    height: 40,
    width: "80%", // 80% del ancho del contenedor
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#FFF",
    color: "#333",
  },
  button: {
    marginVertical: 20,
    backgroundColor: "#D9183B",
    padding: 10,
    borderRadius: 5,
    width: "60%",
    alignItems: "center", // Centra el texto dentro del botón
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  timeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#BF3F34",
    textAlign: "center",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  descriptionText: {
    fontSize: 16,
    color: "#F24738",
    textAlign: "justify",
    padding: 10,
    lineHeight: 24,
    marginBottom: 20,
    padding: 40,
  },
  scrollViewContent: {
    alignItems: "center",
    justifyContent: "center",
  },
});
