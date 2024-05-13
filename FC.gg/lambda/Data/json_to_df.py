import pandas as pd
import json

with open('C:/Users/PC/OneDrive/바탕 화면/my-project/FC.GG_Forked/FC.gg/lambda/Data/player.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

df = pd.DataFrame(data)
print(df)

df.to_csv('C:/Users/PC/OneDrive/바탕 화면/my-project/FC.GG_Forked/FC.gg/lambda/Data/player.csv', index=False)


with open('C:/Users/PC/OneDrive/바탕 화면/my-project/FC.GG_Forked/FC.gg/lambda/Data/spid.json', 'r', encoding='utf-8') as file:
    data1 = json.load(file)

df1 = pd.DataFrame(data1)
print(df1)

df1.to_csv('C:/Users/PC/OneDrive/바탕 화면/my-project/FC.GG_Forked/FC.gg/lambda/Data/player_pid.csv', index=False)