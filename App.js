import React, { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MyScreenSelector = () => {


    const [previousNumber, setPreviousNumber] = useState('');
    const [previousOperator, setPreviousOperator] = useState('');
    const [currentNumber, setCurrentNumber] = useState('');
    const [displayValue, setDisplayValue] = useState('0');


    const handleNumberPress = (number) => {
        setCurrentNumber(currentNumber + number);
        setDisplayValue(currentNumber + number);
    };
    
    const handleClearPress = () => {
        setCurrentNumber("");
        setDisplayValue("");
    }

    const handleEqualsPress = () => {
        let myStack = [];
        let sign = '+';
        let res = 0, tmp = 0;

        for (let i = 0; i < currentNumber.length; i++) {
            if (!isNaN(parseInt(currentNumber[i]))) {
                tmp = 10 * tmp + parseInt(currentNumber[i]);
            }

            if ((!isNaN(parseInt(currentNumber[i])) && i === currentNumber.length - 1) || (!isNaN(parseInt(currentNumber[i])) && isNaN(parseInt(currentNumber[i + 1])))) {
                if (sign === '-')
                    myStack.push(-tmp);
                else if (sign === '+')
                    myStack.push(tmp);
                else {
                    let num;
                    if (sign === '*')
                        num = myStack[myStack.length - 1] * tmp;
                    else
                        num = Math.trunc(myStack[myStack.length - 1] / tmp);
                    myStack.pop();
                    myStack.push(num);
                }
                sign = currentNumber[i];
                tmp = 0;
            } else if (!isNaN(parseInt(currentNumber[i])) || currentNumber[i] === ' ') {
                continue;
            } else {
                sign = currentNumber[i];
            }
        }

        while (myStack.length > 0) {
            res += myStack[myStack.length - 1];
            myStack.pop();
        }
        setDisplayValue(res);
    }


    return (
        <View style={styles.container}>
            <Text style={styles.display}>{displayValue}</Text>
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNumberPress(7)}
                >
                    <Text style={styles.buttonText}>7</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNumberPress(8)}
                >
                    <Text style={styles.buttonText}>8</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNumberPress(9)}
                >
                    <Text style={styles.buttonText}>9</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNumberPress('/')}
                >
                    <Text style={styles.buttonText}>/</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNumberPress(4)}
                >
                    <Text style={styles.buttonText}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNumberPress(5)}
                >
                    <Text style={styles.buttonText}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNumberPress(6)}
                >
                    <Text style={styles.buttonText}>6</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNumberPress('*')}
                >
                    <Text style={styles.buttonText}>*</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNumberPress(1)}
                >
                    <Text style={styles.buttonText}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNumberPress(2)}
                >
                    <Text style={styles.buttonText}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNumberPress(3)}
                >
                    <Text style={styles.buttonText}>3</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNumberPress('-')}
                >
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNumberPress(0)}
                >
                    <Text style={styles.buttonText}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNumberPress('.')}
                >
                    <Text style={styles.buttonText}>.</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleEqualsPress}
                >
                    <Text style={styles.buttonText}>=</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNumberPress('+')}
                >
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.clearButton} onPress={handleClearPress}>
                <Text style={styles.clearButtonText}>C</Text>
            </TouchableOpacity>
        </View>
        )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 10,
    },
    display: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'right',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        width: '100%',
    },
    button: {
        backgroundColor: '#ddd',
        borderRadius: 10,
        padding: 20,
        width: '23%',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    clearButton: {
        backgroundColor: '#ff0000',
        borderRadius: 10,
        padding: 20,
        marginTop: 10,
        width: '23%',
        alignItems: 'center',
    },
    clearButtonText: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
});

export default MyScreenSelector;
