import {
  Alert,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import ThemedText from "@/components/ThemedText";

let size = 5;

let angelX: number = Math.floor(Math.random() * size);
let angelY: number = Math.floor(Math.random() * size);

export default function index() {
  const initialGround = Array.from({ length: size }, () => Array(size).fill(0));
  const [ground, setGround] = useState<number[][]>(initialGround);

  let [player, setPlayer] = useState(false);

  function angelMove() {
    let prevX: number = angelX;
    let prevY: number = angelY;

    const steps = [-1, 1, -1, 1]; // [move right, move left, move up, move down]
    let turns = 8;

    let hasMove = true;

    while (hasMove) {
      if (turns === 0) {
        break;
      }

      let step = Math.floor(Math.random() * steps.length);

      switch (step) {
        case 0:
          angelX += steps[0];
          console.log("Move left");
          break;
        case 1:
          angelX += steps[1];
          console.log("Move right");
          break;
        case 2:
          angelY += steps[2];
          console.log("Move top");
          break;
        case 3:
          angelY += steps[3];
          console.log("Move down");
          break;
      }
      if (!(angelX == size || angelY == size || angelX == -1 || angelY == -1)) {
        if (ground[angelY][angelX] == 0) {
          break;
        }
      }

      turns--;

      angelX = prevX;
      angelY = prevY;
    }

    if (angelY === prevY && angelX === prevX) {
      Alert.alert("You Won", "Android Cannot Move.", [
        {
          text: "New Game",
          onPress: () => router.replace("/"),
        },
      ]);
    }

    const newGround = [...ground];
    newGround[prevY][prevX] = 0;
    newGround[angelY][angelX] = 2;
    setGround(newGround);
  }

  useEffect(() => {
    setTimeout(() => {
      if (!player) {
        angelMove();
        setPlayer(!player);
      }
    }, 600);
  }, [player]);

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}>
        <View style={styles.groundStyle}>
          {ground.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.rowStyle}>
              {row.map((cell, cellIndex) => (
                <TouchableOpacity
                  onPress={() => {
                    if (player) {
                      if (rowIndex === angelY && cellIndex === angelX) {
                        Alert.alert(
                          "Invalid Attck!",
                          "You Can't Attack the Android."
                        );
                      } else {
                        const newGround = [...ground];
                        newGround[rowIndex][cellIndex] = 1;
                        setGround(newGround);
                        setPlayer(!player);
                      }
                    } else {
                      const newGround = [...ground];
                      newGround[angelY][angelX] = 2;
                      setGround(newGround);
                    }
                  }}
                  key={cellIndex}
                  style={[
                    styles.cellStyle,
                    {
                      width:
                        Dimensions.get("screen").width / ground.length - 10,
                      height:
                        Dimensions.get("screen").width / ground.length - 10,
                    },
                  ]}
                >
                  {cell == 1 ? (
                    <FontAwesome
                      name="apple"
                      size={Dimensions.get("screen").width / ground.length - 30}
                    />
                  ) : cell == 2 ? (
                    <FontAwesome
                      name="android"
                      color={"green"}
                      size={Dimensions.get("screen").width / ground.length - 30}
                    />
                  ) : null}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
        <View
          style={{
            width: 200,
            position: "absolute",
            bottom: 50,
            gap: 20,
          }}
        >
          <ThemedText typo="header4" style={{ textAlign: "center" }}>
            {player ? "Player" : "Computer"}
          </ThemedText>
          <Button title="Reset" onPress={() => router.replace("/")} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  groundStyle: {
    flexDirection: "row",
    gap: 5,
  },

  rowStyle: {
    gap: 5,
  },

  cellStyle: {
    backgroundColor: "#D1D1D1",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
