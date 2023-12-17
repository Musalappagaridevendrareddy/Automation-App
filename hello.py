import sys
import json
import time
from itertools import chain
from turtle import pos, position
import keyboard
import pyautogui

def recPosition(count_):
    position=[]
    pyautogui.alert('--- Press esc to record each step ---')
    for i in range(count_):
        keyboard.wait('esc')
        # time.sleep(1)
        position.append([pyautogui.position().x, pyautogui.position().y])
    return position

def action(count_, Type, position):
    if Type:
        Type = [[int(l[0]), l[1]] for l in Type]
    else:
        Type = []
    position = position if position else recPosition(count_)

    time_input = pyautogui.prompt('Time to sleep', default='00:00:01')

    hour, min, sec = [int(i) for i in time_input.split(":")]
    time_input = hour * 3600 + min * 60 + sec
    time.sleep(time_input)
    c = 0
    for i in range(count_):
        pyautogui.moveTo(position[i][0], position[i][1])
        time.sleep(2)
        pyautogui.click()
        time.sleep(1)
        if i+1 in chain(*Type):
            keyboard.write(Type[c][1])
            time.sleep(1)
            c += 1
    print("Done")
    return position

def records(id):
    data = open('./asserts/data/input.json', 'r')
    # parse json file
    data = json.load(data)
    # print the record if the id in the file is "Joe"
    for record in data['table']:
        if record['id'] == id:
            
            pos = action(int(record['count']), record['record'],record['positions'])
            record['positions'] = pos
            break
    with open('./asserts/data/input.json', 'w') as outfile:
        json.dump(data, outfile)
        
records(sys.argv[1])
    

sys.stdout.flush()